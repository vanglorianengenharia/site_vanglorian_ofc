'use client'

import styles from "./residVFalatianCasa1e2.module.css"
import { Bed, BedDoubleIcon, Bubbles, Building2, Car, ChefHat, ChevronLeft, ChevronRight, Flame, Flower2Icon, GraduationCap, HeartPulse, Leaf, MapPin, MoveUpRight, Pause, PawPrint, Play, ShoppingCart, ShowerHead, SoapDispenserDroplet, Sofa, SparklesIcon, Square, Sun, Toilet, Undo2, UtensilsCrossed, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"


type SlideItem = {
  image: string;
  icon: React.ElementType;
  title: string;
  topics: string[];
};

type TourStop = SlideItem & {
  room: string;
  roomDetail: string;
  roomIndex: number;
  slideIndex: number;
  slidesInRoom: number;
};
 const slideFachada: SlideItem[] = [
    {
      image: "/assets/entrada-garagem-01.webp",
      icon:  Car,
      title: "2 Vagas de Garagem",
      topics: [
        "2 vagas de garagem exclusiva",
        "Acesso fácil e privativo",
        "Entrada com arquitetura moderna, iluminação precisa e acolhimento pensado nos detalhes"
      ]
    },
    {
      image: "/assets/entrada-jardim-02.webp",
      icon:  Leaf,
      title: "Beleza que Acolhe", 
      topics: [
        "2 vagas de garagem exclusiva",
        "Acesso fácil e privativo",
        "Entrada com arquitetura moderna, iluminação precisa e acolhimento pensado nos detalhes"
      ]
    }
  ];

   const slideSala: SlideItem[]  = [
    {
      image: "/assets/salaCasa.webp",
      icon:  Sofa,
      title:"2 Salas que Conectam",

      topics: [
        "2 salas integradas (estar e jantar)",
        "Luz natural abundante",
        "Amplitude e conforto",    
]
    },
    {
      image: "/assets/sala-visao-interna-02.webp",
      icon:  SparklesIcon,
      title: "Ambiente que Inspira",
      topics: [
        "Design elegante e moderno",
        "Detalhes pensados para o seu bem-estar"
]
    }
  ];

     const slideQuartos: SlideItem[]  = [
    {
      image: "/assets/quartos-visao-sala-01.webp",
      icon:  BedDoubleIcon,
      title:"2 Quartos Aconchegantes",
      topics: [
        "2 quartos aconchegantes",
        "Conforto, privacidade e tranquilidade",
        "Iluminação natural abundante",
    ]
    },
    {
      image: "/assets/quartos-visao-interna-03.webp",
      icon:  Bed,
      title:"Refúgio Convidativo",
     topics: [
        "Janela ampla com vista valorizada",
        "Ideal para descanso, estudo ou home office",
        "Amplo espaço para personalização"
      ]
    },
    {
      image: "/assets/quartos-visao-geral-02.webp",
      icon:  Bed,
      title:"Refúgio Convidativo",
      topics: [
      "Espaço versátil e multifuncional",
      "Piso laminado de alto padrão",
      "Vista para área verde pela janela",
    ]
    },
    {
      image: "/assets/quartos-iluminacao-04.webp",
      icon:  Bed,
      title: "Espaço Versátil e Iluminado",
      topics: [
      "2 quartos aconchegantes",
      "Vista para área verde pela janela",
      "Iluminação natural abundante",
]
    }
  ];
     const slideBanheiro: SlideItem[]  = [
    {
      image: "/assets/banheiro-visao-geral-01.webp",
      icon:  Toilet,
      title:"1 Banheiro Planejado",
      topics: [
      "Box com prateleira nicho, em Quartzo Branco",
      "Lavatório em mármore branco Paraná",
      "Revestimento premium retificado nas paredes",
  ]
    },
    {
      image: "/assets/banheiro-vista-porta-02.webp",
      icon:  ShowerHead,
      title: "Design Sofisticado",
      topics: [
      "Janela para ventilação natural",
      "Detalhes em gesso no teto",
      "Layout planejado para conforto e funcionalidade"
  ]
    }
  ];
   const slideCozinha: SlideItem[]  = [
    {
      image: "/assets/cozinha-completa-01.webp",
      icon:  ChefHat,
      title:"Elegância Funcional no Dia a Dia",
      topics: [
        "Cozinha independente",
        "Fácil integração à sala de jantar",
        "Com revestimento premium",
        "Porta de vidro com acesso ao quintal"
      ]
    },
    {
      image: "/assets/cozinha-iluminada-02.webp",
      icon:  Sun,
      title: "Cozinha que Inspira Bem-Estar",
      topics: [
        "Janela ampla com iluminação natural",
        "Integração com área externa",
        "Piso acetinado extra-grande",
        "Acabamentos de qualidade em cada detalhe"
      ]
    }
  ];
     const slideAreaGourmet: SlideItem[]  = [
    {
      image: "/assets/espaco-gourmet-completa-01.webp",
      icon:  Flame,
      title:"Área Gourmet Completa",
      topics: [
        "Churrasqueira em alvenaria com acabamento premium",
        "Cuba em inox embutida com torneira cromada instalada",
        "Bancada em granito escuro"
      ]
    },
    {
      image: "/assets/espaco-gourmet-visao-frente-02.webp",
      icon:  UtensilsCrossed,
      title: "Praticidade e Convivência",
      topics: [
        "Acabamento de alto padrão",
        "Ambiente externo com céu aberto",
        "Gramado integrado ao espaço"
      ]
    }
  ];
   const slideLavanderia: SlideItem[]  = [
    {
      image: "/assets/lavanderia-visao-geral-01.webp",
      icon:  SoapDispenserDroplet,
      title:"Área de Serviço",
       topics: [
        "Área de serviço privativa",
        "Espaço amplo e de fácil manutenção",
        "Tanque instalado com torneira"
      ]
    },
    {
      image: "/assets/lavanderia-visao-interna-02.webp",
      icon:  Bubbles,
      title: "Privacidade e Comodidade",
       topics: [
        "Área de serviço privativa",
        "Espaço amplo e de fácil manutenção",
        "Tanque instalado com torneira"
      ]
    }
  ];

const tourRooms = [
  { room: "Entrada", roomDetail: "do lar", slides: slideFachada },
  { room: "Sala", roomDetail: "de estar e jantar", slides: slideSala },
  { room: "Quartos", roomDetail: "área íntima", slides: slideQuartos },
  { room: "Banheiro", roomDetail: "social", slides: slideBanheiro },
  { room: "Cozinha", roomDetail: "funcional", slides: slideCozinha },
  { room: "Espaço", roomDetail: "gourmet", slides: slideAreaGourmet },
  { room: "Lavanderia", roomDetail: "separada", slides: slideLavanderia },
];

const tourStops: TourStop[] = tourRooms.flatMap((room, roomIndex) =>
  room.slides.map((slide, slideIndex) => ({
    ...slide,
    room: room.room,
    roomDetail: room.roomDetail,
    roomIndex,
    slideIndex,
    slidesInRoom: room.slides.length,
  }))
);

const tourRoomMarkers = tourRooms.map((room, roomIndex) => {
  const previousRoomSlides = tourRooms
    .slice(0, roomIndex)
    .reduce((total, previousRoom) => total + previousRoom.slides.length, 0);

  return {
    label: room.room === "Espaço" ? "Espaço gourmet" : room.room,
    startIndex: previousRoomSlides,
    startPosition: (previousRoomSlides / tourStops.length) * 100,
    size: (room.slides.length / tourStops.length) * 100,
  };
});

const TOUR_SLIDE_DURATION = 4500;
const MOBILE_TIMELINE_ENTRY_OFFSET = 96;


export default function ResidVFalatianCasa1e2(){
function useSlide<T>(slides: T[]) {
  const [index, setIndex] = useState<number>(0);
  const next = () => setIndex(i => (i + 1) % slides.length);
  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const reset = () => setIndex(0);
  const current = slides[index];
  return { current, next, prev, reset, index };
}

const { current: currentFachada, next: nextFachada, prev: prevFachada, reset: resetFachada, index: indexFachada } = useSlide<SlideItem>(slideFachada);
const { current: currentSala, next: nextSala, prev: prevSala, reset: resetSala, index: indexSala } = useSlide<SlideItem>(slideSala);
const { current: currentQuartos, next: nextQuartos, prev: prevQuartos, reset: resetQuartos, index: indexQuartos } = useSlide<SlideItem>(slideQuartos);
const { current: currentBanheiro, next: nextBanheiro, prev: prevBanheiro, reset: resetBanheiro, index: indexBanheiro } = useSlide<SlideItem>(slideBanheiro);
const { current: currentCozinha, next: nextCozinha, prev: prevCozinha, reset: resetCozinha, index: indexCozinha } = useSlide<SlideItem>(slideCozinha);
const { current: currentAreaGourmet, next: nextAreaGourmet, prev: prevAreaGourmet, reset: resetAreaGourmet, index: indexAreaGourmet } = useSlide<SlideItem>(slideAreaGourmet);
const { current: currentLavanderia, next: nextLavanderia, prev: prevLavanderia, reset: resetLavanderia, index: indexLavanderia } = useSlide<SlideItem>(slideLavanderia);

const IconFachada = currentFachada.icon;
const IconSala = currentSala.icon;
const IconQuartos = currentQuartos.icon
const IconBanheiro = currentBanheiro.icon
const IconCozinha = currentCozinha.icon
const IconAreaGourmet = currentAreaGourmet.icon
const IconLavanderia = currentLavanderia.icon

const [isTourOpen, setIsTourOpen] = useState(false);
const [tourIndex, setTourIndex] = useState(0);
const [isTourPlaying, setIsTourPlaying] = useState(true);
const [activeRoomIndex, setActiveRoomIndex] = useState(0);
const [isRoomTimelineVisible, setIsRoomTimelineVisible] = useState(false);
const [hasReachedSectionAfterRooms, setHasReachedSectionAfterRooms] = useState(false);
const tourElapsedTime = useRef(0);
const tourPlaybackStartedAt = useRef(0);
const roomBlocks = useRef<Array<HTMLDivElement | null>>([]);
const roomsSectionBlock = useRef<HTMLDivElement | null>(null);
const roomsTimelineTrigger = useRef<HTMLDivElement | null>(null);
const propertyDetailsBlock = useRef<HTMLDivElement | null>(null);
const isManualScrollTransitioning = useRef(false);
const currentTourStop = tourStops[tourIndex];
const isLastTourStop = tourIndex === tourStops.length - 1;
const hasTourFinished = isLastTourStop
  && !isTourPlaying
  && tourElapsedTime.current >= TOUR_SLIDE_DURATION;

const goToTourStop = (nextIndex: number) => {
  tourElapsedTime.current = 0;
  setTourIndex(Math.max(0, Math.min(tourStops.length - 1, nextIndex)));
};

const startTour = () => {
  goToTourStop(0);
  setIsTourPlaying(true);
  setIsTourOpen(true);
};

const closeTour = () => {
  tourElapsedTime.current = 0;
  setIsTourOpen(false);
  setIsTourPlaying(false);
};

const nextTourStop = () => {
  if (isLastTourStop) {
    closeTour();
    return;
  }

  goToTourStop(tourIndex + 1);
};

const previousTourStop = () => {
  goToTourStop(tourIndex - 1);
};

const toggleTourPlayback = () => {
  if (hasTourFinished) {
    goToTourStop(0);
    setIsTourPlaying(true);
    return;
  }

  if (isTourPlaying) {
    const currentPlaybackTime = performance.now() - tourPlaybackStartedAt.current;
    tourElapsedTime.current = Math.min(
      TOUR_SLIDE_DURATION,
      tourElapsedTime.current + currentPlaybackTime
    );
    setIsTourPlaying(false);
    return;
  }

  setIsTourPlaying(true);
};

const handleManualNext = (
  nextSlide: () => void,
  currentIndex: number,
  slideCount: number,
  nextRoomIndex: number,
  resetSlides: () => void
) => {
  if (currentIndex < slideCount - 1) {
    nextSlide();
    return;
  }

  if (isManualScrollTransitioning.current) return;
  isManualScrollTransitioning.current = true;

  const nextBlock = roomBlocks.current[nextRoomIndex] ?? propertyDetailsBlock.current;
  nextBlock?.scrollIntoView({ behavior: "smooth", block: "center" });

  window.setTimeout(() => {
    resetSlides();
    isManualScrollTransitioning.current = false;
  }, 650);
};

const handleManualNextKeyDown = (
  event: React.KeyboardEvent<SVGSVGElement>,
  nextSlide: () => void,
  currentIndex: number,
  slideCount: number,
  nextRoomIndex: number,
  resetSlides: () => void
) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  handleManualNext(nextSlide, currentIndex, slideCount, nextRoomIndex, resetSlides);
};

const handleManualPrevious = (
  previousSlide: () => void,
  currentIndex: number,
  previousRoomIndex: number,
  resetSlides: () => void
) => {
  if (currentIndex > 0) {
    previousSlide();
    return;
  }

  if (previousRoomIndex < 0 || isManualScrollTransitioning.current) return;
  isManualScrollTransitioning.current = true;

  roomBlocks.current[previousRoomIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });

  window.setTimeout(() => {
    resetSlides();
    isManualScrollTransitioning.current = false;
  }, 650);
};

const handleManualPreviousKeyDown = (
  event: React.KeyboardEvent<SVGSVGElement>,
  previousSlide: () => void,
  currentIndex: number,
  previousRoomIndex: number,
  resetSlides: () => void
) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  handleManualPrevious(previousSlide, currentIndex, previousRoomIndex, resetSlides);
};

const navigateToRoom = (roomIndex: number) => {
  roomBlocks.current[roomIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
};

useEffect(() => {
  let animationFrame = 0;

  const updateActiveRoom = () => {
    const viewportReference = window.innerHeight * 0.48;
    let closestRoom = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    roomBlocks.current.forEach((room, index) => {
      if (!room) return;
      const bounds = room.getBoundingClientRect();
      const roomCenter = bounds.top + bounds.height / 2;
      const distance = Math.abs(roomCenter - viewportReference);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestRoom = index;
      }
    });

    const timelineTriggerBounds = roomsTimelineTrigger.current?.getBoundingClientRect();
    const roomsSectionBounds = roomsSectionBlock.current?.getBoundingClientRect();
    const sectionAfterRoomsBounds = propertyDetailsBlock.current?.getBoundingClientRect();
    const timelineEntryLine = Math.min(window.innerHeight * 0.88, MOBILE_TIMELINE_ENTRY_OFFSET);
    setIsRoomTimelineVisible(Boolean(
      timelineTriggerBounds
      && roomsSectionBounds
      && timelineTriggerBounds.top < timelineEntryLine
      && roomsSectionBounds.bottom > 0
    ));
    setHasReachedSectionAfterRooms(Boolean(
      roomsSectionBounds
      && sectionAfterRoomsBounds
      && roomsSectionBounds.bottom <= window.innerHeight * 0.3
      && sectionAfterRoomsBounds.top < window.innerHeight
    ));

    setActiveRoomIndex(closestRoom);
    animationFrame = 0;
  };

  const requestRoomUpdate = () => {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(updateActiveRoom);
  };

  updateActiveRoom();
  window.addEventListener("scroll", requestRoomUpdate, { passive: true });
  window.addEventListener("resize", requestRoomUpdate);

  return () => {
    window.removeEventListener("scroll", requestRoomUpdate);
    window.removeEventListener("resize", requestRoomUpdate);
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
  };
}, []);

useEffect(() => {
  if (!isTourOpen) return;

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") closeTour();
    if (event.key === "ArrowRight") {
      if (!isLastTourStop) goToTourStop(tourIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      if (tourIndex > 0) goToTourStop(tourIndex - 1);
    }
    if (event.key === " ") {
      event.preventDefault();
      toggleTourPlayback();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow = previousOverflow;
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isTourOpen, isTourPlaying, isLastTourStop, tourIndex]);

useEffect(() => {
  if (!isTourOpen || !isTourPlaying) return;

  tourPlaybackStartedAt.current = performance.now();
  const remainingPlaybackTime = Math.max(
    0,
    TOUR_SLIDE_DURATION - tourElapsedTime.current
  );

  const timer = window.setTimeout(() => {
    if (isLastTourStop) {
      tourElapsedTime.current = TOUR_SLIDE_DURATION;
      setIsTourPlaying(false);
      return;
    }

    goToTourStop(tourIndex + 1);
  }, remainingPlaybackTime);

  return () => window.clearTimeout(timer);
}, [isTourOpen, isTourPlaying, isLastTourStop, tourIndex]);

  const router = useRouter();
    const handleVoltarExec = () => {
      router.push("/");
  };

    const phoneNumber = '+554191459026'; 
    const handleClickTalkWithUs = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá!%20Gostei%20do%20residencial%20V-Falatian%20e%20gostaria%20de%20agendar%20uma%20visita.`;
    window.open(whatsappLink, '_blank'); 
  }
  return (
    <div className={styles.containerResidVFalatian}>
    <nav
      className={`${styles.roomTimeline} ${isRoomTimelineVisible ? styles.roomTimelineVisible : ""} ${hasReachedSectionAfterRooms ? styles.roomTimelineDesktopHidden : ""}`}
      aria-label="Navegação pelos cômodos"
    >
      <span className={styles.roomTimelineLine} aria-hidden="true" />
      {tourRooms.map((room, index) => {
        const RoomIcon = room.slides[0].icon;
        const roomLabel = room.room === "Espaço" ? "Espaço gourmet" : room.room;
        const isActive = activeRoomIndex === index;

        return (
          <button
            key={roomLabel}
            type="button"
            className={`${styles.roomTimelineItem} ${isActive ? styles.roomTimelineItemActive : ""}`}
            onClick={() => navigateToRoom(index)}
            aria-label={`Ir para ${roomLabel.toLowerCase()}`}
            aria-current={isActive ? "location" : undefined}
          >
            <span className={styles.roomTimelineIcon}><RoomIcon aria-hidden="true" /></span>
            <span className={styles.roomTimelineLabel}>{roomLabel}</span>
          </button>
        );
      })}
    </nav>
    <div className={styles.content}>
      <div className={styles.divBtnsMenu2}>
        <button className={styles.divBtnUndoV} onClick={() => handleVoltarExec()}>
          <Undo2 className={styles.btnUndoV}/>
          <span className={styles.textBtnUndoV}>Voltar</span>
        </button>
      </div>
          <div className={styles.divTitleBlocksComodos}>
            <h3 className={styles.titleBlocksComodos}>Um Passeio Pelo<br />Seu novo Lar</h3>
            <p className={styles.tourIntroText}>Conheça cada ambiente e todos os detalhes desta casa em uma apresentação guiada.</p>
            <button className={styles.startTourButton} onClick={startTour}>
              <span className={styles.startTourIcon}><Play aria-hidden="true" /></span>
              <span className={styles.startTourLabel}>
                <strong>Assistir ao passeio</strong>
                <small>{tourRooms.length} ambientes • {tourStops.length} imagens</small>
              </span>
            </button>
          </div> 
          <div className={styles.containerComodos} ref={roomsSectionBlock}>

           <div className={styles.imageAndText} ref={(element) => { roomBlocks.current[0] = element; }}>
            <div className={styles.secondGridLeft} ref={roomsTimelineTrigger}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Entrada</p><p className={styles.tituloLocal2}>do lar</p></div>
              <div className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconFachada  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentFachada.title}</p></div>
                <ul className={styles.descriptionImageFormatText}>
                  {currentFachada.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>             
            </div>
            <Image src={currentFachada.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft
              className={styles.arrowIconRLeft}
              onClick={() => handleManualPrevious(prevFachada, indexFachada, -1, resetFachada)}
              onKeyDown={(event) => handleManualPreviousKeyDown(event, prevFachada, indexFachada, -1, resetFachada)}
              role="button"
              tabIndex={0}
              aria-label={indexFachada === 0 ? "Primeira imagem da entrada" : "Ver imagem anterior da entrada"}
            />
            <ChevronRight
              className={styles.arrowIconRRight}
              onClick={() => handleManualNext(nextFachada, indexFachada, slideFachada.length, 1, resetFachada)}
              onKeyDown={(event) => handleManualNextKeyDown(event, nextFachada, indexFachada, slideFachada.length, 1, resetFachada)}
              role="button"
              tabIndex={0}
              aria-label={indexFachada === slideFachada.length - 1 ? "Ir para a sala" : "Ver próxima imagem da entrada"}
            />
          </div>  
          <div className={`${styles.imageAndText} ${styles.imageAndTextImageRight}`} ref={(element) => { roomBlocks.current[1] = element; }}>
            <Image src={currentSala.image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
                <div className={styles.tituloLocalLeft}><p className={styles.tituloLocal1}>Sala de</p><p className={styles.tituloLocal2}>Estar e Jantar</p></div>      
                  <div className={styles.grupoTexto2}>
                    <div className={styles.iconAndTextright}><div className={styles.iconsSala}><IconSala className={styles.icon}/></div><p className={styles.titleBlock}>{currentSala.title}</p></div>
                      <ul className={styles.descriptionImageFormatText}>
                        {currentSala.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>   
                  </div>         
               </div>   
            </div>
              <ChevronLeft
                className={styles.arrowIconLLeft}
                onClick={() => handleManualPrevious(prevSala, indexSala, 0, resetSala)}
                onKeyDown={(event) => handleManualPreviousKeyDown(event, prevSala, indexSala, 0, resetSala)}
                role="button"
                tabIndex={0}
                aria-label={indexSala === 0 ? "Ir para a entrada" : "Ver imagem anterior da sala"}
              />
              <ChevronRight
                className={styles.arrowIconLRight}
                onClick={() => handleManualNext(nextSala, indexSala, slideSala.length, 2, resetSala)}
                onKeyDown={(event) => handleManualNextKeyDown(event, nextSala, indexSala, slideSala.length, 2, resetSala)}
                role="button"
                tabIndex={0}
                aria-label={indexSala === slideSala.length - 1 ? "Ir para os quartos" : "Ver próxima imagem da sala"}
              />
          </div>  
           <div className={styles.imageAndText} ref={(element) => { roomBlocks.current[2] = element; }}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Quartos</p><p className={styles.tituloLocal2}>Área íntima</p></div>
              <div  className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconQuartos  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentQuartos.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentQuartos.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>

            </div>
            <Image src={currentQuartos.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft
              className={styles.arrowIconRLeft}
              onClick={() => handleManualPrevious(prevQuartos, indexQuartos, 1, resetQuartos)}
              onKeyDown={(event) => handleManualPreviousKeyDown(event, prevQuartos, indexQuartos, 1, resetQuartos)}
              role="button"
              tabIndex={0}
              aria-label={indexQuartos === 0 ? "Ir para a sala" : "Ver imagem anterior dos quartos"}
            />
            <ChevronRight
              className={styles.arrowIconRRight}
              onClick={() => handleManualNext(nextQuartos, indexQuartos, slideQuartos.length, 3, resetQuartos)}
              onKeyDown={(event) => handleManualNextKeyDown(event, nextQuartos, indexQuartos, slideQuartos.length, 3, resetQuartos)}
              role="button"
              tabIndex={0}
              aria-label={indexQuartos === slideQuartos.length - 1 ? "Ir para o banheiro" : "Ver próxima imagem dos quartos"}
            />
          </div>  
          <div className={styles.imageAndText} ref={(element) => { roomBlocks.current[3] = element; }}>
            <Image src={currentBanheiro.image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
              <div className={styles.tituloLocalLeft}><p className={styles.tituloLocal1}>Banheiro</p><p className={styles.tituloLocal2}>Social</p></div>

                <div className={styles.iconAndTextright}><div className={styles.iconsBanheiro}><IconBanheiro className={styles.icon}/></div><p className={styles.titleBlock}>{currentBanheiro.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentBanheiro.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>   
            </div>
              <ChevronLeft
                className={styles.arrowIconLLeft}
                onClick={() => handleManualPrevious(prevBanheiro, indexBanheiro, 2, resetBanheiro)}
                onKeyDown={(event) => handleManualPreviousKeyDown(event, prevBanheiro, indexBanheiro, 2, resetBanheiro)}
                role="button"
                tabIndex={0}
                aria-label={indexBanheiro === 0 ? "Ir para os quartos" : "Ver imagem anterior do banheiro"}
              />
              <ChevronRight
                className={styles.arrowIconLRight}
                onClick={() => handleManualNext(nextBanheiro, indexBanheiro, slideBanheiro.length, 4, resetBanheiro)}
                onKeyDown={(event) => handleManualNextKeyDown(event, nextBanheiro, indexBanheiro, slideBanheiro.length, 4, resetBanheiro)}
                role="button"
                tabIndex={0}
                aria-label={indexBanheiro === slideBanheiro.length - 1 ? "Ir para a cozinha" : "Ver próxima imagem do banheiro"}
              />
          </div>  
           <div className={styles.imageAndText} ref={(element) => { roomBlocks.current[4] = element; }}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Cozinha</p><p className={styles.tituloLocal2}>Funcional</p></div>
              <div  className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconCozinha  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentCozinha.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentCozinha.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Image src={currentCozinha.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft
              className={styles.arrowIconRLeft}
              onClick={() => handleManualPrevious(prevCozinha, indexCozinha, 3, resetCozinha)}
              onKeyDown={(event) => handleManualPreviousKeyDown(event, prevCozinha, indexCozinha, 3, resetCozinha)}
              role="button"
              tabIndex={0}
              aria-label={indexCozinha === 0 ? "Ir para o banheiro" : "Ver imagem anterior da cozinha"}
            />
            <ChevronRight
              className={styles.arrowIconRRight}
              onClick={() => handleManualNext(nextCozinha, indexCozinha, slideCozinha.length, 5, resetCozinha)}
              onKeyDown={(event) => handleManualNextKeyDown(event, nextCozinha, indexCozinha, slideCozinha.length, 5, resetCozinha)}
              role="button"
              tabIndex={0}
              aria-label={indexCozinha === slideCozinha.length - 1 ? "Ir para o espaço gourmet" : "Ver próxima imagem da cozinha"}
            />
          </div>  
          <div className={styles.imageAndText} ref={(element) => { roomBlocks.current[5] = element; }}>
            <Image src={currentAreaGourmet .image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
              <div className={styles.tituloLocalLeft}><p className={styles.tituloLocal1}>Espaço</p><p className={styles.tituloLocal2}>gourmet</p></div>

                <div className={styles.iconAndTextright}><div className={styles.iconsAreaGourmet }><IconAreaGourmet  className={styles.icon}/></div><p className={styles.titleBlock}>{currentAreaGourmet .title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentAreaGourmet.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>   
            </div>
              <ChevronLeft
                className={styles.arrowIconLLeft}
                onClick={() => handleManualPrevious(prevAreaGourmet, indexAreaGourmet, 4, resetAreaGourmet)}
                onKeyDown={(event) => handleManualPreviousKeyDown(event, prevAreaGourmet, indexAreaGourmet, 4, resetAreaGourmet)}
                role="button"
                tabIndex={0}
                aria-label={indexAreaGourmet === 0 ? "Ir para a cozinha" : "Ver imagem anterior do espaço gourmet"}
              />
              <ChevronRight
                className={styles.arrowIconLRight}
                onClick={() => handleManualNext(nextAreaGourmet, indexAreaGourmet, slideAreaGourmet.length, 6, resetAreaGourmet)}
                onKeyDown={(event) => handleManualNextKeyDown(event, nextAreaGourmet, indexAreaGourmet, slideAreaGourmet.length, 6, resetAreaGourmet)}
                role="button"
                tabIndex={0}
                aria-label={indexAreaGourmet === slideAreaGourmet.length - 1 ? "Ir para a lavanderia" : "Ver próxima imagem do espaço gourmet"}
              />
          </div>  
           <div className={styles.imageAndText} ref={(element) => { roomBlocks.current[6] = element; }}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Lavanderia</p><p className={styles.tituloLocal2}>Separada</p></div>
              <div  className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconLavanderia  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentLavanderia.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentLavanderia.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Image src={currentLavanderia.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft
              className={styles.arrowIconRLeft}
              onClick={() => handleManualPrevious(prevLavanderia, indexLavanderia, 5, resetLavanderia)}
              onKeyDown={(event) => handleManualPreviousKeyDown(event, prevLavanderia, indexLavanderia, 5, resetLavanderia)}
              role="button"
              tabIndex={0}
              aria-label={indexLavanderia === 0 ? "Ir para o espaço gourmet" : "Ver imagem anterior da lavanderia"}
            />
            <ChevronRight
              className={styles.arrowIconRRight}
              onClick={() => handleManualNext(nextLavanderia, indexLavanderia, slideLavanderia.length, 7, resetLavanderia)}
              onKeyDown={(event) => handleManualNextKeyDown(event, nextLavanderia, indexLavanderia, slideLavanderia.length, 7, resetLavanderia)}
              role="button"
              tabIndex={0}
              aria-label={indexLavanderia === slideLavanderia.length - 1 ? "Continuar para os detalhes do imóvel" : "Ver próxima imagem da lavanderia"}
            />
          </div>  
          </div> 
        </div>
    <div className={styles.divIntroInfoContent} ref={propertyDetailsBlock}>
        <div className={styles.divIntroInfo}>
          <div className={styles.listIntroInfo}><Square  className={styles.iconIntro}/> <h5 className={styles.listIntroInfoText}>126 m<sup className={styles.numberTwoSup}>2</sup> de área total</h5></div>
          <div className={styles.listIntroInfo}><Building2 className={styles.icon}/> <h5 className={styles.listIntroInfoText}>57 m<sup className={styles.numberTwoSup}>2</sup> de área construída</h5></div>
          <div className={styles.listIntroInfo}><BedDoubleIcon className={styles.icon}/> <h5 className={styles.listIntroInfoText}>2 quartos</h5></div>
          <div className={styles.listIntroInfo}><Toilet className={styles.icon}/> <h5 className={styles.listIntroInfoText}>1 banheiro</h5></div>
          <div className={styles.listIntroInfo}><Car className={styles.icon}/> <h5 className={styles.listIntroInfoText}>2 vagas</h5></div>
          <div className={styles.listIntroInfo}><Flower2Icon className={styles.icon}/> <h5 className={styles.listIntroInfoText}>Jardim</h5></div>
       </div>
    </div>
    <div className={styles.containerEmExec}>  
      <div className={styles.containerInfoCasa}>
        <div className={ styles.imagesVFalatian}>  
          <div  className={styles.locationContainer}>
            <div className={styles.divLocation}>
              <div className={styles.locationText}>
                <h3 className={`${styles.locationTitle} ${styles.localizacaoTextTitle}`}>Localização</h3>
                <div className={styles.iconAndTextLocation}>
                  <p className={styles.detailsTextBLocation}>Bairro Veneza - Fazenda Rio Grande / PR</p>
                </div>
                <div className={styles.iconAndTextLocation}>
                  <MapPin className={styles.iconMap}/> 
                  <p className={styles.detailsTextLocation}>Tudo o que você precisa no dia a dia, a poucos minutos.</p>
                </div>
                <div className={styles.iconAndTextLocationBtn}>
                  <div className={styles.btnRotas}>
                    <Link className={styles.detailsTextLocationBtn} href={"https://www.google.com/maps/dir//R.+Osvaldo+Falat+Fazenda+Rio+Grande+-+PR/@-25.6927642,-49.2952732,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x94dc55cd3a812f9f:0x5440fe1d096e06e2"} target="_blank">Ver rotas no Google Maps</Link>
                    <MoveUpRight className={styles.iconArrow}/> 
                  </div>
              </div>
            </div>
            <iframe className={styles.locGoogleMaps}src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2181.554781446294!2d-49.295972139349296!3d-25.69276419833446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dc55cd3a812f9f%3A0x5440fe1d096e06e2!2sR.%20Osvaldo%20Falat%2C%20Fazenda%20Rio%20Grande%20-%20PR!5e1!3m2!1spt-BR!2sbr!4v1767741140698!5m2!1spt-BR!2sbr" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>  
          <div  className={styles.comodProxContainer}>
            <h3 className={`${styles.locationTitle} ${styles.comodidadesProxTitle}`}>Comodidades Próximas</h3>
            <div className={styles.comodidadesContainer}>
              <div className={styles.comodidadesCategorias}>
                <span  className={styles.comodidadesCategoriasSpan}><ShoppingCart />Compras & Serviços</span>
                <p className={styles.comodidadesCategoriasText}>Supermercado Condor -  3 km</p>
                <p className={styles.comodidadesCategoriasText}>Mercados e lanchonetes - 1,6 km</p>
              </div>
              <div className={styles.comodidadesCategorias}>
                <span className={styles.comodidadesCategoriasSpan}><GraduationCap/>Educação</span>
                <p className={styles.comodidadesCategoriasText}>Escolas - Aprox. 2,4 km</p>
              </div>
              <div className={styles.comodidadesCategorias}>
                <span className={styles.comodidadesCategoriasSpan}><HeartPulse />Saúde</span>
                <p className={styles.comodidadesCategoriasText}>UBS -  3km</p>
                <p className={styles.comodidadesCategoriasText}>Farmácia - 2,3 km</p>
              </div>
              <div className={styles.comodidadesCategorias}>
                <span className={styles.comodidadesCategoriasSpan}><PawPrint/>Pet</span>
                <p className={styles.comodidadesCategoriasText}>Pet shop - 1,6 km</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div> 
      </div> 
          <div className={styles.divTextCtaEBtn}>
            <div className={styles.divText}>
              <p className={styles.textCta1}>Gostou do que viu?</p>
              <p className={styles.textCta2}>Agende uma visita exclusiva e conheça seu novo lar.</p>
            </div>
            <div className={styles.divBtn}>
              <button className={styles.btnCta} onClick={handleClickTalkWithUs}>Agendar Visita</button>
            </div>
          </div> 
<div>
</div>

{isTourOpen && (
  <div className={styles.tourBackdrop} role="dialog" aria-modal="true" aria-label="Passeio guiado pelo imóvel">
    <header className={styles.tourHeader}>
      <div className={styles.tourBrand}>
        <span className={styles.tourEyebrow}>Passeio guiado</span>
      </div>

      <div className={styles.tourHeaderActions}>
        <span className={`${styles.tourStatus} ${isTourPlaying ? styles.tourStatusPlaying : ""}`}>
          <span /> {isTourPlaying ? "Reproduzindo" : "Pausado"}
        </span>
        <button className={styles.closeTourButton} onClick={closeTour} aria-label="Sair do passeio" autoFocus>
          <span>Sair</span>
          <X aria-hidden="true" />
        </button>
      </div>
    </header>

    <nav className={styles.tourProgress} aria-label="Navegar pelos ambientes do passeio">
      <span
        className={styles.tourProgressFill}
        aria-hidden="true"
        key={tourIndex}
        style={{
          "--tour-progress-start": `${(tourIndex / tourStops.length) * 100}%`,
          "--tour-progress-end": `${((tourIndex + 1) / tourStops.length) * 100}%`,
          animationDuration: `${TOUR_SLIDE_DURATION}ms`,
          animationPlayState: isTourPlaying ? "running" : "paused",
        } as React.CSSProperties}
      />
      <div className={styles.tourChapterMarkers}>
        {tourRoomMarkers.map((marker, roomIndex) => {
          const isCurrentRoom = roomIndex === currentTourStop.roomIndex;
          const isCompletedRoom = roomIndex < currentTourStop.roomIndex;

          return (
            <button
              type="button"
              key={marker.label}
              className={`${styles.tourChapterMarker} ${isCompletedRoom ? styles.tourChapterMarkerCompleted : ""} ${isCurrentRoom ? styles.tourChapterMarkerActive : ""}`}
              style={{
                "--tour-room-start": `${marker.startPosition}%`,
                "--tour-room-size": `${marker.size}%`,
              } as React.CSSProperties}
              onClick={() => goToTourStop(marker.startIndex)}
              aria-label={`Ir para a primeira imagem de ${marker.label}`}
              aria-current={isCurrentRoom ? "step" : undefined}
            >
              <span className={styles.tourChapterDot} aria-hidden="true" />
              <span className={styles.tourChapterLabel}>{marker.label}</span>
            </button>
          );
        })}
      </div>
    </nav>

    <main className={styles.tourStage} aria-live="polite">
      <div className={styles.tourImagePanel}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentTourStop.image}
            className={styles.tourImageFrame}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.82, ease: "easeInOut" }}
          >
            <div
              className={styles.tourKenBurns}
              style={{
                "--tour-pan-start-x": tourIndex % 2 === 0 ? "-0.65%" : "0.65%",
                "--tour-pan-end-x": tourIndex % 2 === 0 ? "0.65%" : "-0.65%",
                "--tour-pan-start-y": tourIndex % 3 === 0 ? "-0.35%" : "0.35%",
                "--tour-pan-end-y": tourIndex % 3 === 0 ? "0.35%" : "-0.35%",
                animationDuration: `${TOUR_SLIDE_DURATION + 820}ms`,
                animationPlayState: isTourPlaying ? "running" : "paused",
              } as React.CSSProperties}
            >
              <Image
                src={currentTourStop.image}
                className={styles.tourImage}
                alt={`${currentTourStop.room}: ${currentTourStop.title}`}
                width={1536}
                height={1024}
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className={styles.tourImageShade} />
        <div className={styles.tourRoomLabel}>
          <h2>{currentTourStop.room}</h2>
          <p>{currentTourStop.roomDetail}</p>
        </div>
      </div>

      <section key={`${currentTourStop.room}-${currentTourStop.slideIndex}`} className={styles.tourDetails}>
        <div>
          <span className={styles.tourDetailRoomName}>
            {currentTourStop.room === "Espaço" ? "Espaço gourmet" : currentTourStop.room}
          </span>
          <span className={styles.tourDetailKicker}>Detalhes deste ambiente</span>
          <div className={styles.tourDetailTitle}>
            <h3>{currentTourStop.title}</h3>
          </div>
          <ul className={styles.tourTopics}>
            {currentTourStop.topics.map((topic, index) => (
              <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{topic}</p></li>
            ))}
          </ul>
        </div>

      </section>
    </main>

    <footer className={styles.tourControls}>
      <button onClick={previousTourStop} disabled={tourIndex === 0} className={styles.tourSecondaryButton}>
        <ChevronLeft aria-hidden="true" />
        <span>Anterior</span>
      </button>

      <button
        onClick={toggleTourPlayback}
        className={styles.tourPlayButton}
        aria-label={hasTourFinished ? "Reiniciar passeio" : isTourPlaying ? "Pausar passeio" : "Continuar passeio"}
      >
        {isTourPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>

      <button onClick={nextTourStop} className={styles.tourPrimaryButton}>
        <span>{isLastTourStop ? "Concluir passeio" : currentTourStop.slideIndex + 1 === currentTourStop.slidesInRoom ? "Próximo ambiente" : "Próxima foto"}</span>
        {isLastTourStop ? <X aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
      </button>
    </footer>
  </div>
)}
</div>
  )
}
