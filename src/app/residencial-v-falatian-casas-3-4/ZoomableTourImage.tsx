'use client'

import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./ZoomableTourImage.module.css";

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.25;
const DOUBLE_CLICK_STEP = 0.75;

type Point = {
  x: number;
  y: number;
};

type ViewTransform = Point & {
  scale: number;
};

type ZoomableTourImageProps = {
  children: ReactNode;
  onInteractionStart?: () => void;
  onDraggingChange?: (isDragging: boolean) => void;
};

const clamp = (value: number, minimum: number, maximum: number) => (
  Math.min(maximum, Math.max(minimum, value))
);

const distanceBetween = (first: Point, second: Point) => (
  Math.hypot(second.x - first.x, second.y - first.y)
);

const midpointBetween = (first: Point, second: Point): Point => ({
  x: (first.x + second.x) / 2,
  y: (first.y + second.y) / 2,
});

export default function ZoomableTourImage({
  children,
  onInteractionStart,
  onDraggingChange,
}: ZoomableTourImageProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const transformLayerRef = useRef<HTMLDivElement | null>(null);
  const transformRef = useRef<ViewTransform>({ scale: MIN_SCALE, x: 0, y: 0 });
  const pointersRef = useRef(new Map<number, Point>());
  const pinchRef = useRef<{ distance: number; midpoint: Point } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pendingTransformRef = useRef<{ transform: ViewTransform; animate: boolean } | null>(null);
  const clickTimerRef = useRef<number | null>(null);
  const interactionNotifiedRef = useRef(false);
  const pointerMovedRef = useRef(false);
  const lastPointerTypeRef = useRef("");
  const draggingChangeCallbackRef = useRef(onDraggingChange);
  const reportedDraggingRef = useRef(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [isDragging, setIsDragging] = useState(false);

  draggingChangeCallbackRef.current = onDraggingChange;

  const constrainTransform = useCallback((nextTransform: ViewTransform): ViewTransform => {
    const viewport = viewportRef.current;
    const nextScale = clamp(nextTransform.scale, MIN_SCALE, MAX_SCALE);

    if (!viewport || nextScale <= MIN_SCALE) {
      return { scale: MIN_SCALE, x: 0, y: 0 };
    }

    const horizontalLimit = (viewport.clientWidth * (nextScale - MIN_SCALE)) / 2;
    const verticalLimit = (viewport.clientHeight * (nextScale - MIN_SCALE)) / 2;

    return {
      scale: nextScale,
      x: clamp(nextTransform.x, -horizontalLimit, horizontalLimit),
      y: clamp(nextTransform.y, -verticalLimit, verticalLimit),
    };
  }, []);

  const renderTransform = useCallback((nextTransform: ViewTransform, animate: boolean) => {
    pendingTransformRef.current = { transform: nextTransform, animate };

    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      const pending = pendingTransformRef.current;
      const layer = transformLayerRef.current;

      if (pending && layer) {
        layer.style.transition = pending.animate ? "transform 250ms ease" : "none";
        layer.style.transform = `translate3d(${pending.transform.x}px, ${pending.transform.y}px, 0) scale(${pending.transform.scale})`;
      }

      animationFrameRef.current = null;
      pendingTransformRef.current = null;
    });
  }, []);

  const updateTransform = useCallback((nextTransform: ViewTransform, animate = false) => {
    const constrainedTransform = constrainTransform(nextTransform);
    transformRef.current = constrainedTransform;
    setScale((currentScale) => (
      Math.abs(currentScale - constrainedTransform.scale) > 0.001
        ? constrainedTransform.scale
        : currentScale
    ));
    renderTransform(constrainedTransform, animate);
  }, [constrainTransform, renderTransform]);

  const notifyInteractionStart = useCallback(() => {
    if (interactionNotifiedRef.current) return;
    interactionNotifiedRef.current = true;
    onInteractionStart?.();
  }, [onInteractionStart]);

  const zoomAtPoint = useCallback((nextScale: number, point: Point, animate = true) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const currentTransform = transformRef.current;
    const boundedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

    if (boundedScale > MIN_SCALE) notifyInteractionStart();
    if (boundedScale === MIN_SCALE) interactionNotifiedRef.current = false;

    const bounds = viewport.getBoundingClientRect();
    const pointFromCenter = {
      x: point.x - bounds.left - bounds.width / 2,
      y: point.y - bounds.top - bounds.height / 2,
    };
    const scaleRatio = boundedScale / currentTransform.scale;

    updateTransform({
      scale: boundedScale,
      x: pointFromCenter.x - (pointFromCenter.x - currentTransform.x) * scaleRatio,
      y: pointFromCenter.y - (pointFromCenter.y - currentTransform.y) * scaleRatio,
    }, animate);
  }, [notifyInteractionStart, updateTransform]);

  const zoomFromCenter = useCallback((scaleDelta: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const bounds = viewport.getBoundingClientRect();
    zoomAtPoint(transformRef.current.scale + scaleDelta, {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    });
  }, [zoomAtPoint]);

  const resetZoom = useCallback(() => {
    interactionNotifiedRef.current = false;
    pointersRef.current.clear();
    pinchRef.current = null;
    setIsDragging(false);
    updateTransform({ scale: MIN_SCALE, x: 0, y: 0 }, true);
  }, [updateTransform]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const wheelDelta = clamp(-event.deltaY * 0.002, -ZOOM_STEP, ZOOM_STEP);
      zoomAtPoint(transformRef.current.scale + wheelDelta, {
        x: event.clientX,
        y: event.clientY,
      }, true);
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [zoomAtPoint]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resizeObserver = new ResizeObserver(() => {
      updateTransform(transformRef.current, false);
    });

    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, [updateTransform]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    if (clickTimerRef.current !== null) {
      window.clearTimeout(clickTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const isDraggingZoomedImage = isDragging && scale > MIN_SCALE + 0.001;
    if (reportedDraggingRef.current === isDraggingZoomedImage) return;

    reportedDraggingRef.current = isDraggingZoomedImage;
    draggingChangeCallbackRef.current?.(isDraggingZoomedImage);
  }, [isDragging, scale]);

  useEffect(() => () => {
    if (reportedDraggingRef.current) {
      draggingChangeCallbackRef.current?.(false);
    }
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;
    pointerMovedRef.current = false;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const activePointers = Array.from(pointersRef.current.entries());
    if (activePointers.length >= 2) {
      event.preventDefault();
      activePointers.slice(0, 2).forEach(([pointerId]) => {
        try {
          event.currentTarget.setPointerCapture(pointerId);
        } catch {
          // A browser can release the first touch before the second one is captured.
        }
      });

      const first = activePointers[0][1];
      const second = activePointers[1][1];
      pinchRef.current = {
        distance: distanceBetween(first, second),
        midpoint: midpointBetween(first, second),
      };
      setIsDragging(true);
      return;
    }

    if (transformRef.current.scale > MIN_SCALE) {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const previousPoint = pointersRef.current.get(event.pointerId);
    if (!previousPoint) return;

    const currentPoint = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, currentPoint);
    const activePointers = Array.from(pointersRef.current.values());

    if (activePointers.length >= 2) {
      event.preventDefault();
      const first = activePointers[0];
      const second = activePointers[1];
      const nextDistance = distanceBetween(first, second);
      const nextMidpoint = midpointBetween(first, second);
      const previousPinch = pinchRef.current;

      if (previousPinch && previousPinch.distance > 0) {
        pointerMovedRef.current = true;
        const currentTransform = transformRef.current;
        const nextScale = currentTransform.scale * (nextDistance / previousPinch.distance);
        zoomAtPoint(nextScale, nextMidpoint, false);

        const zoomedTransform = transformRef.current;
        updateTransform({
          ...zoomedTransform,
          x: zoomedTransform.x + nextMidpoint.x - previousPinch.midpoint.x,
          y: zoomedTransform.y + nextMidpoint.y - previousPinch.midpoint.y,
        }, false);
      }

      pinchRef.current = { distance: nextDistance, midpoint: nextMidpoint };
      return;
    }

    if (transformRef.current.scale > MIN_SCALE) {
      event.preventDefault();
      const deltaX = currentPoint.x - previousPoint.x;
      const deltaY = currentPoint.y - previousPoint.y;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 1) pointerMovedRef.current = true;

      const currentTransform = transformRef.current;
      updateTransform({
        ...currentTransform,
        x: currentTransform.x + deltaX,
        y: currentTransform.y + deltaY,
      }, false);
    }
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const remainingPointers = Array.from(pointersRef.current.values());
    if (remainingPointers.length < 2) pinchRef.current = null;
    if (remainingPointers.length === 0) setIsDragging(false);
  };

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (lastPointerTypeRef.current === "touch" || pointerMovedRef.current) {
      pointerMovedRef.current = false;
      return;
    }

    if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current);
    const point = { x: event.clientX, y: event.clientY };

    clickTimerRef.current = window.setTimeout(() => {
      zoomAtPoint(transformRef.current.scale + ZOOM_STEP, point, true);
      clickTimerRef.current = null;
    }, 220);
  };

  const handleDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (clickTimerRef.current !== null) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }

    zoomAtPoint(transformRef.current.scale + DOUBLE_CLICK_STEP, {
      x: event.clientX,
      y: event.clientY,
    }, true);
  };

  const isZoomed = scale > MIN_SCALE + 0.001;
  const viewportClassName = [
    styles.viewport,
    isZoomed ? styles.viewportZoomed : styles.viewportAtRest,
    isDragging ? styles.viewportDragging : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={viewportRef}
      className={viewportClassName}
      style={{ touchAction: isZoomed ? "none" : "pan-y" } as CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div ref={transformLayerRef} className={styles.transformLayer}>
        {children}
      </div>

      <div
        className={styles.zoomControls}
        role="group"
        aria-label="Controles da imagem"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        onDoubleClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => zoomFromCenter(ZOOM_STEP)}
          disabled={scale >= MAX_SCALE - 0.001}
          aria-label="Aumentar zoom"
          title="Aumentar zoom"
        >
          <Plus aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => zoomFromCenter(-ZOOM_STEP)}
          disabled={!isZoomed}
          aria-label="Diminuir zoom"
          title="Diminuir zoom"
        >
          <Minus aria-hidden="true" />
        </button>
        <span className={styles.controlDivider} aria-hidden="true" />
        <button
          type="button"
          onClick={resetZoom}
          disabled={!isZoomed}
          aria-label="Restaurar zoom"
          title="Restaurar zoom"
        >
          <RotateCcw aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
