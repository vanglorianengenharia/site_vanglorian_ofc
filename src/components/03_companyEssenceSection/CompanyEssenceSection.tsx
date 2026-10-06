'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './CompanyEssenceSection.module.css';

type VideoFeedbackType = 'play' | 'pause';
type VideoFeedbackTarget = 'card' | 'modal';
type VideoFeedbackState = { type: VideoFeedbackType; id: number } | null;

function formatVideoTime(value: number, roundUp = false) {
  if (!Number.isFinite(value) || value < 0) return '0:00';

  const totalSeconds = roundUp ? Math.ceil(value) : Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function VideoFeedback({ feedback }: { feedback: VideoFeedbackState }) {
  if (!feedback) return null;

  return (
    <span key={feedback.id} className={styles.videoFeedbackOverlay} aria-hidden="true">
      <span className={styles.videoFeedbackIcon}>
        {feedback.type === 'play' ? (
          <svg className={styles.videoFeedbackPlayIcon} viewBox="0 0 24 24">
            <path d="m8 5 11 7-11 7Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
          </svg>
        )}
      </span>
    </span>
  );
}

export function CompanyEssenceSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardPlaying, setIsCardPlaying] = useState(false);
  const [isCardMuted, setIsCardMuted] = useState(false);
  const [cardCurrentTime, setCardCurrentTime] = useState(0);
  const [cardDuration, setCardDuration] = useState(0);
  const [cardVideoFeedback, setCardVideoFeedback] = useState<VideoFeedbackState>(null);
  const [modalVideoFeedback, setModalVideoFeedback] = useState<VideoFeedbackState>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const hasInteractedWithCardPlaybackRef = useRef(false);
  const modalPlaybackAppliedRef = useRef(false);
  const videoFeedbackIdRef = useRef(0);
  const videoFeedbackTimeoutsRef = useRef<Record<VideoFeedbackTarget, ReturnType<typeof setTimeout> | null>>({
    card: null,
    modal: null,
  });
  const modalPlaybackStateRef = useRef({
    currentTime: 0,
    shouldPlay: false,
    muted: false,
    volume: 1,
  });

  const openVideoModal = useCallback(() => {
    const video = cardVideoRef.current;

    if (video) {
      modalPlaybackStateRef.current = hasInteractedWithCardPlaybackRef.current
        ? {
            currentTime: video.currentTime,
            shouldPlay: !video.paused && !video.ended,
            muted: video.muted,
            volume: video.volume,
          }
        : {
            currentTime: 0,
            shouldPlay: true,
            muted: video.muted,
            volume: video.volume,
          };

      video.pause();
    } else {
      modalPlaybackStateRef.current = {
        currentTime: 0,
        shouldPlay: true,
        muted: false,
        volume: 1,
      };
    }

    modalPlaybackAppliedRef.current = false;
    setIsModalOpen(true);
  }, []);

  const applyCardPlaybackToModal = useCallback((video: HTMLVideoElement) => {
    if (
      modalPlaybackAppliedRef.current
      || video.readyState < HTMLMediaElement.HAVE_METADATA
    ) {
      return;
    }

    const playbackState = modalPlaybackStateRef.current;
    const duration = Number.isFinite(video.duration) ? video.duration : playbackState.currentTime;

    modalPlaybackAppliedRef.current = true;
    video.currentTime = Math.min(playbackState.currentTime, duration);
    video.muted = playbackState.muted;
    video.volume = playbackState.volume;

    if (playbackState.shouldPlay) {
      void video.play().catch(() => {
        // Os controles nativos permanecem disponíveis caso o navegador bloqueie a reprodução.
      });
    } else {
      video.pause();
    }
  }, []);

  const showVideoFeedback = useCallback((target: VideoFeedbackTarget, type: VideoFeedbackType) => {
    const activeTimeout = videoFeedbackTimeoutsRef.current[target];
    if (activeTimeout) clearTimeout(activeTimeout);

    const feedback = { type, id: ++videoFeedbackIdRef.current };
    const setFeedback = target === 'card' ? setCardVideoFeedback : setModalVideoFeedback;

    setFeedback(feedback);
    videoFeedbackTimeoutsRef.current[target] = setTimeout(() => {
      setFeedback(null);
      videoFeedbackTimeoutsRef.current[target] = null;
    }, 1250);
  }, []);

  const toggleCardPlayback = () => {
    const video = cardVideoRef.current;
    if (!video) return;

    hasInteractedWithCardPlaybackRef.current = true;

    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      void video.play()
        .then(() => showVideoFeedback('card', 'play'))
        .catch(() => {
          // O estado permanece sincronizado pelos eventos nativos do elemento.
        });
    } else {
      video.pause();
      showVideoFeedback('card', 'pause');
    }
  };

  const seekCardVideo = (time: number) => {
    const video = cardVideoRef.current;
    if (!video || !Number.isFinite(time)) return;

    hasInteractedWithCardPlaybackRef.current = true;
    video.currentTime = time;
    setCardCurrentTime(time);
  };

  const toggleCardMute = () => {
    const video = cardVideoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsCardMuted(video.muted);
  };

  const cardProgress = cardDuration > 0
    ? Math.min((cardCurrentTime / cardDuration) * 100, 100)
    : 0;

  const closeModal = useCallback(() => {
    const video = modalVideoRef.current;

    if (video) {
      video.pause();
      video.muted = true;
      video.currentTime = 0;
    }

    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const feedbackTimeouts = videoFeedbackTimeoutsRef.current;

    return () => {
      if (feedbackTimeouts.card) clearTimeout(feedbackTimeouts.card);
      if (feedbackTimeouts.modal) clearTimeout(feedbackTimeouts.modal);
    };
  }, []);

  useEffect(() => {
    const video = cardVideoRef.current;
    if (!video) return;

    setIsCardPlaying(!video.paused && !video.ended);
    setIsCardMuted(video.muted);
    setCardCurrentTime(video.currentTime);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      setCardDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const body = document.body;
    const savedScrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY}px`;
    body.style.width = '100%';

    const video = modalVideoRef.current;
    if (video) applyCardPlaybackToModal(video);

    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, video[controls], [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, savedScrollY);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      playButtonRef.current?.focus({ preventScroll: true });
    };
  }, [applyCardPlaybackToModal, closeModal, isModalOpen]);

  return (
    <>
      <section
        className={styles.section}
        id="essencia-vanglorian"
        aria-labelledby="company-essence-title"
      >
        <span className={`${styles.architecturalShadow} ${styles.shadowLeft}`} aria-hidden="true" />
        <span className={`${styles.architecturalShadow} ${styles.shadowRight}`} aria-hidden="true" />

        <div className={styles.container}>
          <header className={styles.heading}>
            <p className={styles.sectionEyebrow}>
              <span aria-hidden="true" />
              Nossa atuação
              <span aria-hidden="true" />
            </p>
            <h2 className={styles.mainTitle} id="company-essence-title">
              Construímos para diferentes formas de viver, trabalhar e evoluir.
            </h2>
          </header>

          <div className={styles.composition}>
            <p className={styles.sideNote}>
              <span aria-hidden="true" />
              Lugares<br />
              que inspiram<br />
              novas<br />
              histórias
            </p>

            <article className={styles.videoCard} aria-label="Conheça a Vanglorian em vídeo">
              <video
                ref={cardVideoRef}
                className={styles.video}
                muted={isCardMuted}
                playsInline
                preload="metadata"
                controls={false}
                tabIndex={-1}
                aria-hidden="true"
                onLoadedMetadata={(event) => setCardDuration(event.currentTarget.duration)}
                onDurationChange={(event) => setCardDuration(event.currentTarget.duration)}
                onTimeUpdate={(event) => setCardCurrentTime(event.currentTarget.currentTime)}
                onPlay={() => setIsCardPlaying(true)}
                onPause={() => setIsCardPlaying(false)}
                onEnded={() => setIsCardPlaying(false)}
                onVolumeChange={(event) => setIsCardMuted(event.currentTarget.muted)}
              >
                <source src="/videos/videoCompanyIdentify.webm" type="video/webm" />
              </video>
              <span className={styles.videoShade} aria-hidden="true" />
              <VideoFeedback feedback={cardVideoFeedback} />

              <button
                ref={playButtonRef}
                className={styles.cardOpenButton}
                type="button"
                onClick={openVideoModal}
                aria-label="Abrir vídeo institucional da Vanglorian"
                aria-haspopup="dialog"
              >
                <span
                  className={`${styles.watchLabel} ${isCardPlaying ? styles.watchLabelHidden : ''}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="m9 7 8 5-8 5Z" />
                  </svg>
                  Assistir vídeo
                </span>
              </button>

              <div className={styles.videoControls} role="group" aria-label="Controles do vídeo">
                <button
                  className={styles.controlButton}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleCardPlayback();
                  }}
                  aria-label={isCardPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                >
                  {isCardPlaying ? (
                    <svg className={`${styles.controlIcon} ${styles.controlPlay}`} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg className={`${styles.controlIcon} ${styles.controlPlay}`} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m8 5 11 7-11 7Z" />
                    </svg>
                  )}
                </button>

                <span className={styles.controlTime}>{formatVideoTime(cardCurrentTime)}</span>

                <input
                  className={styles.progressTrack}
                  type="range"
                  min="0"
                  max={Math.max(cardDuration, 0.01)}
                  step="0.01"
                  value={Math.min(cardCurrentTime, cardDuration || 0)}
                  style={{ '--video-progress': `${cardProgress}%` } as CSSProperties}
                  onClick={(event) => event.stopPropagation()}
                  onPointerDown={(event) => event.stopPropagation()}
                  onChange={(event) => seekCardVideo(Number(event.currentTarget.value))}
                  aria-label="Progresso do vídeo"
                  aria-valuetext={`${formatVideoTime(cardCurrentTime)} de ${formatVideoTime(cardDuration, true)}`}
                />

                <span className={styles.controlTime}>{formatVideoTime(cardDuration, true)}</span>

                <button
                  className={styles.controlButton}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleCardMute();
                  }}
                  aria-label={isCardMuted ? 'Ativar som' : 'Silenciar vídeo'}
                >
                  <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 5 7 9H3v6h4l4 4V5Z" />
                    {isCardMuted ? (
                      <path d="m16 9 5 5M21 9l-5 5" />
                    ) : (
                      <path d="M15 9.2a4 4 0 0 1 0 5.6M17.8 6.5a8 8 0 0 1 0 11" />
                    )}
                  </svg>
                </button>

                <button
                  className={styles.controlButton}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openVideoModal();
                  }}
                  aria-label="Abrir vídeo"
                >
                  <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
                  </svg>
                </button>
              </div>
            </article>

            <article className={styles.essencePanel}>
              <Image
                src="/assets/capa-hero-mobile.webp"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
                className={styles.panelImage}
                aria-hidden="true"
              />
              <span className={styles.panelOverlay} aria-hidden="true" />

              <div className={styles.panelContent}>
                <p className={styles.panelEyebrow}>
                  <span aria-hidden="true" />
                  Nossa essência
                  <span aria-hidden="true" />
                </p>

                <h3 className={styles.panelTitle}>Cada projeto pede uma solução própria.</h3>

                <p className={styles.panelText}>
                  Na Vanglorian, cada obra é única e nasce a partir de um olhar atento às pessoas,
                  ao contexto e às possibilidades. Unimos experiência técnica e sensibilidade para
                  transformar necessidades reais em soluções adequadas a cada projeto.
                </p>

                <p className={styles.closingStatement}>
                  <span aria-hidden="true" />
                  Projetos diferentes pedem caminhos diferentes, mas o compromisso com cada entrega
                  permanece o mesmo.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {isModalOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              className={styles.modalBackdrop}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeModal();
              }}
            >
              <div
                ref={modalRef}
                className={styles.videoModal}
                role="dialog"
                aria-modal="true"
                aria-label="Vídeo institucional da Vanglorian"
              >
                <button
                  ref={closeButtonRef}
                  className={styles.closeButton}
                  type="button"
                  onClick={closeModal}
                  aria-label="Fechar vídeo"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>

                <video
                  ref={modalVideoRef}
                  className={styles.modalVideo}
                  controls
                  autoPlay={modalPlaybackStateRef.current.shouldPlay}
                  playsInline
                  preload="auto"
                  tabIndex={0}
                  aria-label="Vídeo institucional da Vanglorian"
                  onLoadedMetadata={(event) => applyCardPlaybackToModal(event.currentTarget)}
                  onClick={(event) => {
                    const videoBounds = event.currentTarget.getBoundingClientRect();
                    const nativeControlsHeight = Math.min(56, videoBounds.height * 0.14);

                    if (event.clientY < videoBounds.bottom - nativeControlsHeight) {
                      showVideoFeedback(
                        'modal',
                        event.currentTarget.paused ? 'play' : 'pause',
                      );
                    }
                  }}
                >
                  <source src="/videos/videoCompanyIdentify.webm" type="video/webm" />
                </video>
                <VideoFeedback feedback={modalVideoFeedback} />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
