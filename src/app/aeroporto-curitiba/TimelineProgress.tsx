'use client';

import { Camera, Plane } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './airportCuritiba.module.css';
import { TimelineZoomImage } from './TimelineZoomImage';

type TimelineItem = {
  number: string;
  title: string;
  text: string;
  image: string | null;
  position: string;
};

type TimelineProgressProps = {
  items: TimelineItem[];
};

type TimelineStyle = CSSProperties & {
  '--timeline-progress': number;
  '--timeline-plane-y': string;
  '--timeline-progress-start': string;
};

const MOBILE_TIMELINE_QUERY = '(max-width: 599px)';
const DESKTOP_TIMELINE_QUERY = '(min-width: 1051px)';

export function TimelineProgress({ items }: TimelineProgressProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [mobilePoints, setMobilePoints] = useState<number[]>([]);
  const previousStepRef = useRef(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const activateStep = (nextStep: number) => {
    if (nextStep === previousStepRef.current) return;

    const nextDirection = nextStep > previousStepRef.current ? 'forward' : 'backward';
    setDirection(nextDirection);
    previousStepRef.current = nextStep;
    setActiveIndex(nextStep);
  };

  const progress = items.length > 1 ? activeIndex / (items.length - 1) : 0;
  const mobileStart = mobilePoints[0] ?? 0;
  const mobilePlanePosition = mobilePoints[activeIndex] ?? mobileStart;
  const timelineStyle: TimelineStyle = {
    '--timeline-progress': progress,
    '--timeline-plane-y': `${mobilePlanePosition}px`,
    '--timeline-progress-start': `${mobileStart}px`,
  };

  useLayoutEffect(() => {
    const mobileMedia = window.matchMedia(MOBILE_TIMELINE_QUERY);
    let resizeObserver: ResizeObserver | null = null;

    const measureMobilePoints = () => {
      if (!mobileMedia.matches || !timelineRef.current) {
        setMobilePoints([]);
        return;
      }

      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const points = itemRefs.current.map((item) => {
        const marker = item?.querySelector<HTMLElement>(`.${styles.timelineMarker}`);
        if (!marker) return 0;

        const markerRect = marker.getBoundingClientRect();
        return markerRect.bottom - timelineTop + 4;
      });

      setMobilePoints(points);
    };

    const configureMeasurements = () => {
      resizeObserver?.disconnect();
      resizeObserver = null;

      if (mobileMedia.matches && timelineRef.current) {
        resizeObserver = new ResizeObserver(measureMobilePoints);
        resizeObserver.observe(timelineRef.current);
        itemRefs.current.forEach((item) => item && resizeObserver?.observe(item));
      }

      measureMobilePoints();
    };

    configureMeasurements();
    mobileMedia.addEventListener('change', configureMeasurements);

    return () => {
      resizeObserver?.disconnect();
      mobileMedia.removeEventListener('change', configureMeasurements);
    };
  }, [items.length]);

  useEffect(() => {
    const mobileMedia = window.matchMedia(MOBILE_TIMELINE_QUERY);
    let observer: IntersectionObserver | null = null;

    const configureObserver = () => {
      observer?.disconnect();
      observer = null;

      if (!mobileMedia.matches) return;

      const visibleRatios = new Map<Element, number>();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          let predominantIndex = -1;
          let predominantRatio = 0;

          itemRefs.current.forEach((item, index) => {
            if (!item) return;
            const ratio = visibleRatios.get(item) ?? 0;
            if (ratio > predominantRatio) {
              predominantRatio = ratio;
              predominantIndex = index;
            }
          });

          if (predominantIndex >= 0) activateStep(predominantIndex);
        },
        {
          root: null,
          rootMargin: '-12% 0px -18%',
          threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        },
      );

      itemRefs.current.forEach((item) => item && observer?.observe(item));
    };

    configureObserver();
    mobileMedia.addEventListener('change', configureObserver);

    return () => {
      observer?.disconnect();
      mobileMedia.removeEventListener('change', configureObserver);
    };
  }, [items.length]);

  const activateOnDesktop = (index: number) => {
    if (window.matchMedia(DESKTOP_TIMELINE_QUERY).matches) activateStep(index);
  };

  return (
    <div
      ref={timelineRef}
      className={styles.timeline}
      style={timelineStyle}
      data-direction={direction}
      data-mobile-positioned={mobilePoints.length === items.length}
    >
      <span className={styles.timelineTrackProgress} aria-hidden="true" />
      <span className={styles.timelinePlane} aria-hidden="true">
        <Plane strokeWidth={1.45} fill='#021e13'/>
      </span>

      {items.map((item, index) => {
        const state = index < activeIndex ? 'complete' : index === activeIndex ? 'active' : 'upcoming';

        return (
          <article
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className={styles.timelineItem}
            key={item.number}
            data-timeline-state={state}
            aria-current={state === 'active' ? 'step' : undefined}
            onMouseEnter={() => activateOnDesktop(index)}
            onFocusCapture={() => activateOnDesktop(index)}
          >
            <div className={styles.timelineMarker}>
              <span>{item.number}</span>
              <i aria-hidden="true" />
            </div>
            {item.image ? (
              <TimelineZoomImage items={items} index={index} />
            ) : (
              <div
                className={`${styles.timelineImageWrap} ${styles.timelineImagePlaceholder}`}
                role="img"
                aria-label="Registro em breve"
              >
                <Camera aria-hidden="true" strokeWidth={1.35} />
                <span>Registro em breve</span>
              </div>
            )}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}
