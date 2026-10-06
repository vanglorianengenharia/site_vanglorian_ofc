'use client';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Variants } from 'framer-motion';
import styles from './ConstructionJourney.module.css';

type ConstructionStage = {
  id: number;
  step: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

const constructionStages: ConstructionStage[] = [
  {
    id: 1,
    step: '01',
    label: 'Terreno',
    title: 'Onde tudo começa',
    description:
      'Com o terreno preparado e a implantação definida, começam os primeiros passos para transformar o projeto em realidade.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/jornada-casas-3-4-img-01.png',
  },
  {
    id: 2,
    step: '02',
    label: 'Fundação',
    title: 'A base de toda a construção',
    description:
      'A execução das fundações estabelece a sustentação da residência, respeitando o projeto e as características do terreno.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/infra1.webp',
  },
  {
    id: 3,
    step: '03',
    label: 'Estrutura',
    title: 'O projeto começa a ganhar forma',
    description:
      'Nesta etapa, a estrutura da residência é executada e os primeiros volumes da construção passam a definir os espaços.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/timeline-01.webp',
  },
  {
    id: 4,
    step: '04',
    label: 'Alvenaria',
    title: 'Os ambientes começam a surgir',
    description:
      'Paredes e divisões dão forma aos ambientes planejados, tornando cada espaço da residência cada vez mais perceptível.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/imgemMedidaConstrução.png',
  },
  {
    id: 5,
    step: '05',
    label: 'Revestimentos',
    title: 'Detalhes que transformam os ambientes',
    description:
      'Com a aplicação dos revestimentos e acabamentos, materiais, texturas e escolhas do projeto começam a aparecer.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/cozinha-completa-01.webp',
  },
  {
    id: 6,
    step: '06',
    label: 'Acabamentos',
    title: 'A construção entra na fase final',
    description:
      'Pintura, instalações e últimos acabamentos dão personalidade aos ambientes e preparam a residência para sua conclusão.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/banheiro-visao-geral-01.webp',
  },
  {
    id: 7,
    step: '07',
    label: 'O lar',
    title: 'Do projeto à entrega',
    description:
      'A conclusão de uma jornada construída etapa por etapa, com atenção aos detalhes até o momento de transformar a obra em lar.',
    // Substitua apenas este caminho quando a fotografia definitiva estiver disponível.
    image: '/assets/fachadaCasa.webp',
  },
];

const imageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.018,
    x: direction * 18,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.995,
    x: direction * -12,
  }),
};

const copyVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 10,
    y: 4,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -6,
    y: -2,
    transition: {
      duration: 0.18,
      ease: 'easeIn',
    },
  }),
};

export function ConstructionJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentStage = constructionStages[activeStage];
  const isFirstStage = activeStage === 0;
  const isLastStage = activeStage === constructionStages.length - 1;
  const progress = (activeStage / (constructionStages.length - 1)) * 100;

  const goToStage = (index: number) => {
    if (index === activeStage) return;

    setDirection(index > activeStage ? 1 : -1);
    setActiveStage(index);
  };

  const previousStage = () => {
    goToStage(Math.max(0, activeStage - 1));
  };

  const nextStage = () => {
    goToStage(Math.min(constructionStages.length - 1, activeStage + 1));
  };

  return (
    <section id="construction-journey" className={styles.section} aria-labelledby="construction-journey-title">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Nosso processo</p>
        <h2 id="construction-journey-title" className={styles.title}>
          A jornada da <span>construção</span>
        </h2>
        <p className={styles.subtitle}>
          Cada etapa executada com planejamento, responsabilidade e atenção aos detalhes para transformar projeto em lar.
        </p>
      </header>

      <div className={styles.composition}>
        <div className={styles.greenBackdrop} aria-hidden="true" />

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`copy-${currentStage.id}`}
            className={styles.stageCopy}
            custom={direction}
            variants={copyVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            aria-live="polite"
          >
            {/* <div className={styles.stageKicker}>
              <span>{currentStage.step}</span>
              <span>{currentStage.label}</span>
            </div> */}
            <h3>{currentStage.title}</h3>
            <span className={styles.copyAccent} aria-hidden="true" />
            <p>{currentStage.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.imageFrame}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={`image-${currentStage.id}`}
              className={styles.imageLayer}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={currentStage.image}
                alt={`Etapa ${currentStage.step} — ${currentStage.label}: ${currentStage.title}`}
                fill
                sizes="(max-width: 820px) calc(100vw - 2rem), (max-width: 1200px) 72vw, 1120px"
                className={styles.image}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <nav
          className={styles.timeline}
          aria-label="Etapas da construção"
          style={{ '--journey-progress': `${progress}%` } as CSSProperties}
        >
          <span className={styles.timelineTrack} aria-hidden="true">
            <span />
          </span>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrevious}`}
            onClick={previousStage}
            disabled={isFirstStage}
            aria-label="Etapa anterior"
          >
            <ArrowLeftIcon aria-hidden="true" />
          </button>

          <ol className={styles.timelineItems}>
            {constructionStages.map((stage, index) => {
              const isActive = index === activeStage;
              const isCompleted = index < activeStage;

              return (
                <li key={stage.id}>
                  <button
                    type="button"
                    className={`${styles.timelineButton} ${isActive ? styles.timelineButtonActive : ''} ${isCompleted ? styles.timelineButtonCompleted : ''}`}
                    onClick={() => goToStage(index)}
                    aria-label={`Ir para etapa ${stage.step} — ${stage.label}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className={styles.timelineNumber}>{stage.step}</span>
                    <span className={styles.timelineLabel}>{stage.label}</span>
                    <span className={styles.timelineDot} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={nextStage}
            disabled={isLastStage}
            aria-label="Próxima etapa"
          >
            <ArrowRightIcon aria-hidden="true" />
          </button>
        </nav>
      </div>
    </section>
  );
}
