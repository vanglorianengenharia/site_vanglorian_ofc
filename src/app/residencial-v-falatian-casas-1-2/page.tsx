"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Car,
  Flame,
  GraduationCap,
  HeartPulse,
  MapPin,
  MoveUpRight,
  Pause,
  PawPrint,
  Play,
  RotateCcw,
  ShoppingCart,
  SoapDispenserDroplet,
  X,
  ArrowLeftIcon,
  ArrowRightIcon,
  Undo2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { ProjectStatusFlag } from "@/components/projectStatusFlag/ProjectStatusFlag";
import sharedStyles from "../residencial-v-falatian-casas-3-4/residVFalatianCasa1e2.module.css";
import ZoomableTourImage from "../residencial-v-falatian-casas-3-4/ZoomableTourImage";
import localStyles from "./construction.module.css";
import { constructionRooms, constructionStages } from "./residentialData";

const TOUR_DURATION = 4500;
const PREVIEW_DURATION = 3800;
const ROOM_TIMELINE_REVEAL_RATIO = 0.95;

type TourStop = (typeof constructionRooms)[number]["slides"][number] & {
  room: string;
  detail: string;
  displayName: string;
  roomIndex: number;
  slideIndex: number;
  slidesInRoom: number;
};

const tourStops: TourStop[] = constructionRooms.flatMap((room, roomIndex) =>
  room.slides.map((slide, slideIndex) => ({
    ...slide,
    room: room.room,
    detail: room.detail,
    displayName: room.displayName,
    roomIndex,
    slideIndex,
    slidesInRoom: room.slides.length,
  })),
);

const roomMarkers = constructionRooms.map((room, roomIndex) => ({
  label: room.displayName,
  startIndex: constructionRooms
    .slice(0, roomIndex)
    .reduce((total, item) => total + item.slides.length, 0),
}));

export default function ResidencialVFalatianCasas1e2() {
  const [roomSlideIndexes, setRoomSlideIndexes] = useState(() => constructionRooms.map(() => 0));
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isRoomTimelineVisible, setIsRoomTimelineVisible] = useState(false);
  const [isTourPhotoOverlayHidden, setIsTourPhotoOverlayHidden] = useState(false);
  const roomBlocks = useRef<Array<HTMLElement | null>>([]);
  const roomsSection = useRef<HTMLDivElement | null>(null);
  const afterRoomsSection = useRef<HTMLElement | null>(null);
  const overlayTimer = useRef<number | null>(null);

  const previewSlides = useMemo(() => constructionRooms.map((room) => room.slides[0]), []);
  const currentTourStop = tourStops[tourIndex];
  const isLastTourStop = tourIndex === tourStops.length - 1;
  const currentRoomMarkerPosition = ((currentTourStop.roomIndex + 0.5) / constructionRooms.length) * 100;
  const nextRoomMarkerPosition = currentTourStop.roomIndex === constructionRooms.length - 1
    ? 100
    : ((currentTourStop.roomIndex + 1.5) / constructionRooms.length) * 100;
  const roomProgressLength = nextRoomMarkerPosition - currentRoomMarkerPosition;
  const tourProgressStart = currentRoomMarkerPosition
    + (currentTourStop.slideIndex / currentTourStop.slidesInRoom) * roomProgressLength;
  const tourProgressEnd = currentRoomMarkerPosition
    + ((currentTourStop.slideIndex + 1) / currentTourStop.slidesInRoom) * roomProgressLength;

  const showOverlay = useCallback(() => {
    if (overlayTimer.current !== null) window.clearTimeout(overlayTimer.current);
    overlayTimer.current = null;
    setIsTourPhotoOverlayHidden(false);
  }, []);

  const goToTourStop = useCallback((nextIndex: number) => {
    showOverlay();
    setTourIndex(Math.max(0, Math.min(tourStops.length - 1, nextIndex)));
  }, [showOverlay]);

  const startTour = () => {
    goToTourStop(0);
    setIsTourPlaying(true);
    setIsTourOpen(true);
  };

  const closeTour = useCallback(() => {
    showOverlay();
    setIsTourOpen(false);
    setIsTourPlaying(false);
  }, [showOverlay]);

  const handleDraggingChange = useCallback((isDragging: boolean) => {
    if (overlayTimer.current !== null) window.clearTimeout(overlayTimer.current);
    if (isDragging) {
      setIsTourPhotoOverlayHidden(true);
      return;
    }
    overlayTimer.current = window.setTimeout(() => {
      setIsTourPhotoOverlayHidden(false);
      overlayTimer.current = null;
    }, 300);
  }, []);

  useEffect(() => {
    if (isTourOpen) return;
    const timer = window.setTimeout(
      () => setPreviewIndex((current) => (current + 1) % previewSlides.length),
      PREVIEW_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [isTourOpen, previewIndex, previewSlides.length]);

  useEffect(() => {
    if (!isTourOpen || !isTourPlaying) return;
    const timer = window.setTimeout(() => {
      if (isLastTourStop) {
        setIsTourPlaying(false);
        return;
      }
      goToTourStop(tourIndex + 1);
    }, TOUR_DURATION);
    return () => window.clearTimeout(timer);
  }, [goToTourStop, isLastTourStop, isTourOpen, isTourPlaying, tourIndex]);

  useEffect(() => {
    if (!isTourOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTour();
      if (event.key === "ArrowRight" && !isLastTourStop) goToTourStop(tourIndex + 1);
      if (event.key === "ArrowLeft" && tourIndex > 0) goToTourStop(tourIndex - 1);
      if (event.key === " " && !(event.target instanceof HTMLElement && event.target.closest("button, a"))) {
        event.preventDefault();
        setIsTourPlaying((value) => !value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeTour, goToTourStop, isLastTourStop, isTourOpen, tourIndex]);

  useEffect(() => {
    let animationFrame = 0;
    const updateRoomNavigation = () => {
      const viewportCenter = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      roomBlocks.current.forEach((room, index) => {
        if (!room) return;
        const bounds = room.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const sectionBounds = roomsSection.current?.getBoundingClientRect();
      const firstRoomBounds = roomBlocks.current[0]?.getBoundingClientRect();
      const visibleRoomHeight = firstRoomBounds
        ? Math.min(firstRoomBounds.height, window.innerHeight)
        : 0;
      const firstRoomRevealPoint = firstRoomBounds
        ? firstRoomBounds.top + visibleRoomHeight * ROOM_TIMELINE_REVEAL_RATIO
        : Number.POSITIVE_INFINITY;
      setActiveRoomIndex(closestIndex);
      setIsRoomTimelineVisible(Boolean(
        sectionBounds
        && sectionBounds.bottom > window.innerHeight * 0.08
        && firstRoomRevealPoint <= window.innerHeight
      ));
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateRoomNavigation);
    };

    updateRoomNavigation();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => () => {
    if (overlayTimer.current !== null) window.clearTimeout(overlayTimer.current);
  }, []);

  const changeRoomSlide = (roomIndex: number, direction: -1 | 1) => {
    const current = roomSlideIndexes[roomIndex];
    const slideCount = constructionRooms[roomIndex].slides.length;

    if (direction === 1 && current === slideCount - 1) {
      const nextTarget = roomBlocks.current[roomIndex + 1] ?? afterRoomsSection.current;
      nextTarget?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (direction === -1 && current === 0) {
      roomBlocks.current[roomIndex - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setRoomSlideIndexes((indexes) => indexes.map((index, position) => (
      position === roomIndex ? (index + direction + slideCount) % slideCount : index
    )));
  };

  const handleRoomArrowKey = (
    event: ReactKeyboardEvent<SVGSVGElement>,
    roomIndex: number,
    direction: -1 | 1,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    changeRoomSlide(roomIndex, direction);
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/554191459026?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Residencial%20V-Falatian%20-%20Casas%201%20e%202.",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className={sharedStyles.containerResidVFalatian}>
      <nav
        className={`${sharedStyles.roomTimeline} ${isRoomTimelineVisible ? sharedStyles.roomTimelineVisible : ""}`}
        aria-label="Navegação pelos ambientes"
      >
        <span className={sharedStyles.roomTimelineLine} aria-hidden="true" />
        {constructionRooms.map((room, index) => {
          const RoomIcon = room.slides[0].icon;
          return (
            <button
              key={room.displayName}
              type="button"
              className={`${sharedStyles.roomTimelineItem} ${activeRoomIndex === index ? sharedStyles.roomTimelineItemActive : ""}`}
              onClick={() => roomBlocks.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
              aria-current={activeRoomIndex === index ? "location" : undefined}
            >
              <span className={sharedStyles.roomTimelineIcon}><RoomIcon aria-hidden="true" /></span>
              <span className={sharedStyles.roomTimelineLabel}>{room.displayName}</span>
            </button>
          );
        })}
      </nav>

      <div className={sharedStyles.content}>
        <div className={sharedStyles.divBtnsMenu2}>
          <Link href="/#empreendimentos" className={sharedStyles.divBtnUndoV}>
            <Undo2 className={sharedStyles.btnUndoV} />
            <span className={sharedStyles.textBtnUndoV}>Voltar</span>
          </Link>
        </div>

        <section className={sharedStyles.divTitleBlocksComodos} aria-labelledby="construction-tour-title">
          <ProjectStatusFlag status="construction" goldBody />
          <div className={sharedStyles.tourPreviewComposition}>
            <div className={sharedStyles.tourPreviewVisual}>
              <div className={sharedStyles.tourPreviewCircle} aria-hidden="true" onClick={startTour}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={previewSlides[previewIndex].image}
                    className={sharedStyles.tourPreviewFrame}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  >
                    <Image
                      src={previewSlides[previewIndex].image}
                      className={sharedStyles.tourPreviewImage}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 78vw, 38vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <svg className={sharedStyles.tourPreviewProgress} viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id="tour-preview-gradient" x1="10%" y1="10%" x2="90%" y2="90%">
                    <stop offset="0%" stopColor="#b48724" />
                    <stop offset="52%" stopColor="#d8be66" />
                    <stop offset="100%" stopColor="#075139" />
                  </linearGradient>
                </defs>
                <circle className={sharedStyles.tourPreviewProgressTrack} cx="50" cy="50" r="47" pathLength="100" />
                <circle
                  key={previewIndex}
                  className={sharedStyles.tourPreviewProgressValue}
                  cx="50"
                  cy="50"
                  r="47"
                  pathLength="100"
                  style={{ animationDuration: `${PREVIEW_DURATION}ms` }}
                />
              </svg>
              <button
                type="button"
                className={sharedStyles.tourPreviewPlayButton}
                onClick={startTour}
                aria-label="Acompanhar evolução guiada da obra"
              >
                <span className={sharedStyles.tourPreviewPlayLabel} aria-hidden="true">Ver evolução</span>
                <span className={sharedStyles.tourPreviewPlayDisc} aria-hidden="true"><Play /></span>
              </button>
            </div>

            <div className={`${sharedStyles.tourIntroContent} ${localStyles.introContent}`}>
              <h1 id="construction-tour-title" className={`${sharedStyles.titleBlocksComodos} ${localStyles.introTitle}`}>
                Acompanhe a<br />construção<br />do seu novo lar
              </h1>
              <span className={sharedStyles.tourIntroAccent} aria-hidden="true" />
              <p className={sharedStyles.tourIntroText}>Veja a residência ganhar forma em um percurso pelos ambientes do projeto.</p>
              <div className={sharedStyles.tourIntroInfoCapsule}>
                <span className={sharedStyles.tourIntroInfoDot} aria-hidden="true" />
                <span>7 ambientes • evolução guiada</span>
              </div>
              <p className={localStyles.temporaryNotice}>Imagens temporárias para visualização do layout.</p>
            </div>
          </div>
        </section>

        <section className={sharedStyles.manualExploreIntro} aria-labelledby="explore-title">
          <h2 id="explore-title" className={sharedStyles.manualExploreTitle}>Explore cada ambiente</h2>
          <p className={sharedStyles.manualExploreSubtitle}>Veja como seu novo lar está ganhando forma, etapa por etapa.</p>
        </section>

        <div className={sharedStyles.containerComodos} ref={roomsSection}>
          {constructionRooms.map((room, roomIndex) => {
            const slide = room.slides[roomSlideIndexes[roomIndex]];
            const RoomIcon = slide.icon;
            const imageOnLeft = roomIndex % 2 === 1;
            const image = (
              <Image
                src={slide.image}
                className={imageOnLeft ? sharedStyles.imageApresentationResidSideLeft : sharedStyles.imageApresentationResidSideRight}
                alt={`Imagem ilustrativa temporária para ${room.displayName.toLowerCase()}`}
                width={1536}
                height={1024}
              />
            );
            const details = imageOnLeft ? (
              <div className={sharedStyles.secondGrid}>
                <div className={sharedStyles.divThirdGridText}>
                  <div className={sharedStyles.tituloLocalLeft}>
                    <p className={sharedStyles.tituloLocal1}>{room.room}</p>
                    <p className={sharedStyles.tituloLocal2}>{room.detail}</p>
                  </div>
                  <div className={sharedStyles.iconAndTextright}><RoomIcon className={sharedStyles.icon} /><p className={sharedStyles.titleBlock}>{slide.title}</p></div>
                  <ul className={sharedStyles.descriptionImageFormatText}>
                    {slide.topics.map((topic) => <li key={topic} className={sharedStyles.dotTextLi}><span className={sharedStyles.dotIconSpan}>•</span>{topic}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <div className={sharedStyles.secondGridLeft}>
                <div className={sharedStyles.tituloLocal}>
                  <p className={sharedStyles.tituloLocal1}>{room.room}</p>
                  <p className={sharedStyles.tituloLocal2}>{room.detail}</p>
                </div>
                <div className={sharedStyles.grupoTexto}>
                  <div className={sharedStyles.iconAndTextLeft}><RoomIcon className={sharedStyles.icon} /><p className={sharedStyles.titleCaracteristica}>{slide.title}</p></div>
                  <ul className={sharedStyles.descriptionImageFormatText}>
                    {slide.topics.map((topic) => <li key={topic} className={sharedStyles.dotTextLi}><span className={sharedStyles.dotIconSpan}>•</span>{topic}</li>)}
                  </ul>
                </div>
              </div>
            );

            return (
              <article
                key={room.displayName}
                data-room-index={roomIndex}
                ref={(element) => { roomBlocks.current[roomIndex] = element; }}
                className={sharedStyles.imageAndText}
              >
                {imageOnLeft ? image : details}
                {imageOnLeft ? details : image}
                <ArrowLeftIcon
                  className={imageOnLeft ? sharedStyles.arrowIconLLeft : sharedStyles.arrowIconRLeft}
                  onClick={() => changeRoomSlide(roomIndex, -1)}
                  onKeyDown={(event) => handleRoomArrowKey(event, roomIndex, -1)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver etapa anterior de ${room.displayName.toLowerCase()}`}
                />
                <ArrowRightIcon
                  className={imageOnLeft ? sharedStyles.arrowIconLRight : sharedStyles.arrowIconRRight}
                  onClick={() => changeRoomSlide(roomIndex, 1)}
                  onKeyDown={(event) => handleRoomArrowKey(event, roomIndex, 1)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver próxima etapa de ${room.displayName.toLowerCase()}`}
                />
              </article>
            );
          })}
        </div>

        <section className={localStyles.evolutionSection} ref={afterRoomsSection} aria-labelledby="evolution-title">
          <div className={localStyles.evolutionHeading}>
            <span>Acompanhamento</span>
            <h2 id="evolution-title">Evolução da obra</h2>
            <p>As etapas abaixo apresentam a estrutura de acompanhamento. Os status serão atualizados quando os dados oficiais da obra estiverem disponíveis.</p>
          </div>
          <ol className={localStyles.evolutionTimeline}>
            {constructionStages.map((stage, index) => (
              <li key={stage}>
                <span className={localStyles.stageNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{stage}</h3><p>Status a confirmar</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={sharedStyles.divIntroInfoContent} aria-label="Informações gerais do imóvel">
          <div className={`${sharedStyles.divIntroInfo} ${localStyles.propertyFacts}`}>
            <div className={sharedStyles.listIntroInfo}><BedDouble className={sharedStyles.iconIntro} /><h3 className={sharedStyles.listIntroInfoText}>3 quartos</h3></div>
            <div className={sharedStyles.listIntroInfo}><ChefHat className={sharedStyles.iconIntro} /><h3 className={sharedStyles.listIntroInfoText}>Cozinha com passa-prato</h3></div>
            <div className={sharedStyles.listIntroInfo}><Flame className={sharedStyles.iconIntro} /><h3 className={sharedStyles.listIntroInfoText}>Área gourmet</h3></div>
            <div className={sharedStyles.listIntroInfo}><SoapDispenserDroplet className={sharedStyles.iconIntro} /><h3 className={sharedStyles.listIntroInfoText}>Lavanderia</h3></div>
            <div className={sharedStyles.listIntroInfo}><Car className={sharedStyles.iconIntro} /><h3 className={sharedStyles.listIntroInfoText}>Garagem</h3></div>
          </div>
        </section>

        <div className={sharedStyles.containerEmExec}>
          <div className={sharedStyles.containerInfoCasa}>
            <div className={sharedStyles.imagesVFalatian}>
              <section className={sharedStyles.locationContainer} aria-labelledby="location-title">
                <div className={sharedStyles.divLocation}>
                  <div className={sharedStyles.locationText}>
                    <h2 id="location-title" className={`${sharedStyles.locationTitle} ${sharedStyles.localizacaoTextTitle}`}>Localização</h2>
                    <div className={sharedStyles.iconAndTextLocation}><p className={sharedStyles.detailsTextBLocation}>Bairro Veneza - Fazenda Rio Grande / PR</p></div>
                    <div className={sharedStyles.iconAndTextLocation}><MapPin className={sharedStyles.iconMap} /><p className={sharedStyles.detailsTextLocation}>Tudo o que você precisa no dia a dia, a poucos minutos.</p></div>
                    <div className={sharedStyles.iconAndTextLocationBtn}>
                      <Link className={sharedStyles.btnRotas} href="https://www.google.com/maps/dir//R.+Osvaldo+Falat+Fazenda+Rio+Grande+-+PR/@-25.6927642,-49.2952732,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x94dc55cd3a812f9f:0x5440fe1d096e06e2" target="_blank">
                        <span className={sharedStyles.detailsTextLocationBtn}>Ver rotas no Google Maps</span><MoveUpRight className={sharedStyles.iconArrow} />
                      </Link>
                    </div>
                  </div>
                  <iframe
                    title="Localização do Residencial V-Falatian"
                    className={sharedStyles.locGoogleMaps}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2181.554781446294!2d-49.295972139349296!3d-25.69276419833446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dc55cd3a812f9f%3A0x5440fe1d096e06e2!2sR.%20Osvaldo%20Falat%2C%20Fazenda%20Rio%20Grande%20-%20PR!5e1!3m2!1spt-BR!2sbr!4v1767741140698!5m2!1spt-BR!2sbr"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </section>

              <section className={sharedStyles.comodProxContainer} aria-labelledby="amenities-title">
                <h2 id="amenities-title" className={`${sharedStyles.locationTitle} ${sharedStyles.comodidadesProxTitle}`}>Comodidades Próximas</h2>
                <div className={sharedStyles.comodidadesContainer}>
                  <div className={sharedStyles.comodidadesCategorias}><span className={sharedStyles.comodidadesCategoriasSpan}><ShoppingCart />Compras &amp; Serviços</span><p className={sharedStyles.comodidadesCategoriasText}>Supermercado Condor - 3 km</p><p className={sharedStyles.comodidadesCategoriasText}>Mercados e lanchonetes - 1,6 km</p></div>
                  <div className={sharedStyles.comodidadesCategorias}><span className={sharedStyles.comodidadesCategoriasSpan}><GraduationCap />Educação</span><p className={sharedStyles.comodidadesCategoriasText}>Escolas - Aprox. 2,4 km</p></div>
                  <div className={sharedStyles.comodidadesCategorias}><span className={sharedStyles.comodidadesCategoriasSpan}><HeartPulse />Saúde</span><p className={sharedStyles.comodidadesCategoriasText}>UBS - 3 km</p><p className={sharedStyles.comodidadesCategoriasText}>Farmácia - 2,3 km</p></div>
                  <div className={sharedStyles.comodidadesCategorias}><span className={sharedStyles.comodidadesCategoriasSpan}><PawPrint />Pet</span><p className={sharedStyles.comodidadesCategoriasText}>Pet shop - 1,6 km</p></div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <section className={sharedStyles.divTextCtaEBtn} aria-label="Fale com a Vanglorian">
          <div className={sharedStyles.divText}>
            <p className={sharedStyles.textCta1}>Quer acompanhar este projeto?</p>
            <p className={sharedStyles.textCta2}>Converse com a Vanglorian e saiba mais sobre as Casas 1 e 2.</p>
          </div>
          <div className={sharedStyles.divBtn}><button className={sharedStyles.btnCta} onClick={openWhatsApp}>Fale conosco</button></div>
        </section>
      </div>

      {isTourOpen && (
        <div className={sharedStyles.tourBackdrop} role="dialog" aria-modal="true" aria-label="Evolução guiada da obra">
          <header className={sharedStyles.tourHeader}>
            <div className={sharedStyles.tourBrand}><span className={sharedStyles.tourEyebrow}>Evolução guiada da obra</span></div>
            <div className={sharedStyles.tourHeaderActions}>
              <span className={`${sharedStyles.tourStatus} ${isTourPlaying ? sharedStyles.tourStatusPlaying : ""}`}><span />{isTourPlaying ? "Reproduzindo" : "Pausado"}</span>
              <button className={sharedStyles.closeTourButton} onClick={closeTour} aria-label="Sair da evolução guiada" autoFocus><span>Sair</span><X aria-hidden="true" /></button>
            </div>
          </header>

          <nav className={sharedStyles.tourProgress} aria-label="Navegar pelos ambientes">
            <span
              key={tourIndex}
              className={sharedStyles.tourProgressFill}
              aria-hidden="true"
              style={{
                "--tour-progress-start": `${tourProgressStart}%`,
                "--tour-progress-end": `${tourProgressEnd}%`,
                animationDuration: `${TOUR_DURATION}ms`,
                animationPlayState: isTourPlaying ? "running" : "paused",
              } as CSSProperties}
            />
            <div className={sharedStyles.tourChapterMarkers}>
              {roomMarkers.map((marker, roomIndex) => (
                <button
                  type="button"
                  key={marker.label}
                  className={`${sharedStyles.tourChapterMarker} ${roomIndex < currentTourStop.roomIndex ? sharedStyles.tourChapterMarkerCompleted : ""} ${roomIndex === currentTourStop.roomIndex ? sharedStyles.tourChapterMarkerActive : ""}`}
                  onClick={() => goToTourStop(marker.startIndex)}
                  aria-current={roomIndex === currentTourStop.roomIndex ? "step" : undefined}
                >
                  <span className={sharedStyles.tourChapterDot} aria-hidden="true" />
                  <span className={`${sharedStyles.tourChapterLabel} ${marker.label === "Espaço gourmet" ? sharedStyles.tourChapterLabelGourmet : ""}`}>{marker.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <main className={sharedStyles.tourStage} aria-live="polite">
            <div className={sharedStyles.tourImagePanel}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${tourIndex}-${currentTourStop.image}`}
                  className={sharedStyles.tourImageFrame}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.82, ease: "easeInOut" }}
                >
                  <ZoomableTourImage
                    onInteractionStart={() => isTourPlaying && setIsTourPlaying(false)}
                    onDraggingChange={handleDraggingChange}
                  >
                    <div
                      className={sharedStyles.tourKenBurns}
                      style={{
                        "--tour-pan-start-x": tourIndex % 2 === 0 ? "-0.65%" : "0.65%",
                        "--tour-pan-end-x": tourIndex % 2 === 0 ? "0.65%" : "-0.65%",
                        "--tour-pan-start-y": tourIndex % 3 === 0 ? "-0.35%" : "0.35%",
                        "--tour-pan-end-y": tourIndex % 3 === 0 ? "0.35%" : "-0.35%",
                        animationDuration: `${TOUR_DURATION + 820}ms`,
                        animationPlayState: isTourPlaying ? "running" : "paused",
                      } as CSSProperties}
                    >
                      <Image src={currentTourStop.image} className={sharedStyles.tourImage} alt={`Imagem ilustrativa temporária: ${currentTourStop.displayName}`} width={1536} height={1024} priority draggable={false} />
                    </div>
                  </ZoomableTourImage>
                </motion.div>
              </AnimatePresence>
              <div className={`${sharedStyles.tourContentOverlay} ${isTourPhotoOverlayHidden ? sharedStyles.tourContentOverlayHidden : ""}`}>
                <div className={sharedStyles.tourImageShade} />
                <div className={sharedStyles.tourRoomLabel}><h2>{currentTourStop.displayName}</h2><p>{currentTourStop.title}</p></div>
              </div>
            </div>

            <section key={`${currentTourStop.room}-${currentTourStop.slideIndex}`} className={sharedStyles.tourDetails}>
              <div className={sharedStyles.tourDetailsInner}>
                <h3 className={sharedStyles.tourDetailHeading}><span className={sharedStyles.tourDetailHeadingPrimary}>Detalhes</span><span className={sharedStyles.tourDetailHeadingSecondary}>Da execução</span></h3>
                <span className={sharedStyles.tourDetailAccent} aria-hidden="true" />
                <ul className={sharedStyles.tourTopics}>
                  {currentTourStop.topics.map((topic, index) => <li key={topic}><span>{String(index + 1).padStart(2, "0")}</span><p>{topic}</p></li>)}
                </ul>
              </div>
            </section>
          </main>

          <footer className={sharedStyles.tourControls}>
            <button onClick={() => goToTourStop(tourIndex - 1)} disabled={tourIndex === 0} className={sharedStyles.tourSecondaryButton}><ChevronLeft aria-hidden="true" /><span>Anterior</span></button>
            <button onClick={() => setIsTourPlaying((value) => !value)} className={sharedStyles.tourPlayButton} aria-label={isTourPlaying ? "Pausar evolução" : "Continuar evolução"}>{isTourPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>
            <button onClick={() => isLastTourStop ? startTour() : goToTourStop(tourIndex + 1)} className={`${sharedStyles.tourPrimaryButton} ${isLastTourStop ? sharedStyles.tourPrimaryButtonRestart : ""}`}>
              <span>{isLastTourStop ? "Reiniciar evolução" : currentTourStop.slideIndex + 1 === currentTourStop.slidesInRoom ? "Próximo ambiente" : "Próxima foto"}</span>
              {isLastTourStop ? <RotateCcw aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
