'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './airportCuritiba.module.css';

type TimelineItem = {
  number: string;
  image: string | null;
  title: string;
  text: string;
  position: string;
};

type TimelineZoomImageProps = {
  items: TimelineItem[];
  index: number;
};

function getAdjacentImageIndex(items: TimelineItem[], current: number, direction: -1 | 1) {
  const imageIndexes = items.reduce<number[]>((indexes, candidate, candidateIndex) => {
    if (candidate.image) indexes.push(candidateIndex);
    return indexes;
  }, []);
  const currentPosition = imageIndexes.indexOf(current);

  if (currentPosition < 0) return current;
  return imageIndexes[(currentPosition + direction + imageIndexes.length) % imageIndexes.length];
}

export function TimelineZoomImage({ items, index }: TimelineZoomImageProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;
  const item = items[index];
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => current === null ? null : getAdjacentImageIndex(items, current, -1));
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => current === null ? null : getAdjacentImageIndex(items, current, 1));
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyboard);
      trigger?.focus();
    };
  }, [isOpen, items.length]);

  const showPrevious = () => {
    setActiveIndex((current) => current === null ? null : getAdjacentImageIndex(items, current, -1));
  };

  const showNext = () => {
    setActiveIndex((current) => current === null ? null : getAdjacentImageIndex(items, current, 1));
  };

  if (!item.image) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.timelineImageWrap}
        aria-label={`Ampliar imagem: ${item.title}`}
        onClick={() => setActiveIndex(index)}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 760px) 88vw, 20vw"
          className={styles.timelineImage}
          style={{ objectPosition: item.position }}
        />
      </button>

      {activeItem?.image &&
        createPortal(
          <div
            className={styles.timelineLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Imagem ampliada: ${activeItem.title}`}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setActiveIndex(null);
            }}
          >
            <figure className={styles.timelineLightboxFrame}>
              <div className={styles.timelineLightboxMedia}>
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 760px) 94vw, 55vw"
                  className={styles.timelineLightboxImage}
                  style={{ objectPosition: activeItem.position }}
                />
              </div>
              <figcaption>
                <span className={styles.timelineLightboxStep}>{activeItem.number}</span>
                <strong className={styles.timelineLightboxTitle}>{activeItem.title}</strong>
                <p className={styles.timelineLightboxText}>{activeItem.text}</p>
                <div className={styles.timelineLightboxControls}>
                  <button
                    type="button"
                    className={`${styles.timelineLightboxNav} ${styles.timelineLightboxPrevious}`}
                    aria-label="Ver imagem anterior"
                    onClick={showPrevious}
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`${styles.timelineLightboxNav} ${styles.timelineLightboxNext}`}
                    aria-label="Ver próxima imagem"
                    onClick={showNext}
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </figcaption>
              <button
                ref={closeRef}
                type="button"
                className={styles.timelineLightboxClose}
                aria-label="Fechar imagem ampliada"
                onClick={() => setActiveIndex(null)}
              >
                <X aria-hidden="true" />
              </button>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}
