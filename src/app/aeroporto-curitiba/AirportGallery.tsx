'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './airportCuritiba.module.css';

const galleryImages = [
  {
    src: '/assets/aeroporto-galeria-01.webp',
    alt: 'Terminal aeroportuário e aeronave ao entardecer',
  },
  {
    src: '/assets/aeroporto-galeria-02.webp',
    alt: 'Vista aérea de complexo aeroportuário',
  },
  {
    src: '/assets/aeroporto-galeria-03.webp',
    alt: 'Terminal aeroportuário em operação noturna',
  },
  {
    src: '/assets/aeroporto-galeria-04.webp',
    alt: 'Aeroporto iluminado durante operação noturna',
  },
];

const slides = [
  { ...galleryImages.at(-1)!, originalIndex: galleryImages.length - 1, clone: 'start' },
  ...galleryImages.map((image, originalIndex) => ({ ...image, originalIndex, clone: null })),
  { ...galleryImages[0], originalIndex: 0, clone: 'end' },
];

const formatNumber = (value: number) => String(value).padStart(2, '0');

export function AirportGallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentSlideRef = useRef(1);
  const scrollTimerRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, startScroll: 0, startX: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getClosestSlide = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return currentSlideRef.current;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closestIndex = currentSlideRef.current;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - railCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  const scrollToSlide = useCallback((slideIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const rail = railRef.current;
    const slide = slideRefs.current[slideIndex];
    if (!rail || !slide) return;

    rail.scrollTo({
      left: slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : behavior,
    });
  }, []);

  const settleInfiniteLoop = useCallback(() => {
    const closestIndex = getClosestSlide();
    currentSlideRef.current = closestIndex;

    if (closestIndex === 0) {
      currentSlideRef.current = galleryImages.length;
      scrollToSlide(galleryImages.length, 'auto');
    } else if (closestIndex === slides.length - 1) {
      currentSlideRef.current = 1;
      scrollToSlide(1, 'auto');
    }
  }, [getClosestSlide, scrollToSlide]);

  const handleScroll = () => {
    const closestIndex = getClosestSlide();
    const slide = slides[closestIndex];

    currentSlideRef.current = closestIndex;
    if (slide) setActiveIndex(slide.originalIndex);

    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(settleInfiniteLoop, 140);
  };

  const goToImage = (imageIndex: number) => {
    let slideIndex = imageIndex + 1;

    if (currentSlideRef.current === 1 && imageIndex === galleryImages.length - 1) {
      slideIndex = 0;
    } else if (currentSlideRef.current === galleryImages.length && imageIndex === 0) {
      slideIndex = slides.length - 1;
    }

    setActiveIndex(imageIndex);
    currentSlideRef.current = slideIndex;
    scrollToSlide(slideIndex);
  };

  const navigate = (direction: -1 | 1) => {
    const currentSlide = getClosestSlide();
    const targetSlide = Math.max(0, Math.min(slides.length - 1, currentSlide + direction));
    currentSlideRef.current = targetSlide;
    scrollToSlide(targetSlide);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;

    dragRef.current = {
      active: true,
      startScroll: rail.scrollLeft,
      startX: event.clientX,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;

    rail.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
    event.preventDefault();
  };

  const finishPointerDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const closestIndex = getClosestSlide();
    currentSlideRef.current = closestIndex;
    scrollToSlide(closestIndex);
  };

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => scrollToSlide(1, 'auto'));
    return () => window.cancelAnimationFrame(frame);
  }, [scrollToSlide]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const resizeObserver = new ResizeObserver(() => {
      scrollToSlide(currentSlideRef.current, 'auto');
    });
    resizeObserver.observe(rail);
    slideRefs.current.forEach((slide) => {
      if (slide) resizeObserver.observe(slide);
    });

    return () => {
      resizeObserver.disconnect();
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, [scrollToSlide]);

  useEffect(() => {
    const thumbnails = thumbnailsRef.current;
    const thumbnail = thumbnailRefs.current[activeIndex];
    if (!thumbnails || !thumbnail) return;

    thumbnails.scrollTo({
      left: thumbnail.offsetLeft - (thumbnails.clientWidth - thumbnail.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [activeIndex]);

  return (
    <section className={styles.gallerySection} aria-labelledby="gallery-title">
      <header className={styles.galleryHeader}>
        <div>
          <p className={styles.eyebrow}>REGISTROS DO PROJETO</p>
          <h2 id="gallery-title">GALERIA DO PROJETO</h2>
          <p className={styles.galleryDescription}>
            Confira os registros reais do projeto em cada etapa e todos os detalhes que tornam este empreendimento único.
          </p>
        </div>
      </header>

      <div
        className={styles.galleryThumbnails}
        ref={thumbnailsRef}
        aria-label="Selecionar imagem da galeria"
      >
        {galleryImages.map((image, index) => (
          <button
            className={styles.galleryThumbnail}
            data-active={activeIndex === index}
            key={image.src}
            onClick={() => goToImage(index)}
            ref={(element) => { thumbnailRefs.current[index] = element; }}
            type="button"
            aria-current={activeIndex === index ? 'true' : undefined}
            aria-label={`Ver imagem ${index + 1}: ${image.alt}`}
          >
            <Image src={image.src} alt="" width={64} height={64} sizes="64px" />
          </button>
        ))}
      </div>

      <div className={styles.galleryCarousel}>
        <div className={styles.galleryViewport}>
          <div
            className={`${styles.galleryRail} ${isDragging ? styles.galleryRailDragging : ''}`}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                navigate(-1);
              } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                navigate(1);
              }
            }}
            onPointerCancel={finishPointerDrag}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onScroll={handleScroll}
            ref={railRef}
            role="region"
            tabIndex={0}
            aria-label="Imagens do projeto. Use as setas do teclado para navegar."
          >
            {slides.map((image, slideIndex) => {
              const isActive = image.originalIndex === activeIndex;

              return (
                <figure
                  className={styles.galleryCard}
                  data-active={isActive}
                  key={`${image.src}-${image.clone ?? image.originalIndex}`}
                  ref={(element) => { slideRefs.current[slideIndex] = element; }}
                  aria-hidden={image.clone !== null}
                >
                  <Image
                    src={image.src}
                    alt={image.clone === null ? image.alt : ''}
                    fill
                    sizes="(max-width: 760px) 86vw, 68vw"
                    className={styles.galleryImage}
                    draggable={false}
                    priority={slideIndex === 1}
                  />
                </figure>
              );
            })}
          </div>
        </div>

        <button
          className={`${styles.galleryControl} ${styles.galleryControlPrevious}`}
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Ver imagem anterior"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          className={`${styles.galleryControl} ${styles.galleryControlNext}`}
          type="button"
          onClick={() => navigate(1)}
          aria-label="Ver próxima imagem"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className={styles.galleryNavigation}>
        <p className={styles.galleryCounter} aria-live="polite" aria-atomic="true">
          <span>{formatNumber(activeIndex + 1)}</span>
          <span aria-hidden="true">/</span>
          <span>{formatNumber(galleryImages.length)}</span>
        </p>
      </div>
    </section>
  );
}
