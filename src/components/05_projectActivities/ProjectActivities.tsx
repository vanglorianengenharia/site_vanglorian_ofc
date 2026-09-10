'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Lock, MapPin, Plane, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ProjectActivities.module.css';

type PortfolioItem = {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  imageAlt: string;
  cta: string;
  location?: string;
  details?: string[];
  href?: string;
};

const developments: PortfolioItem[] = [
    {
    title: 'Residencial V-Falatian',
    subtitle: 'CASAS 3 E 4',
    badge: 'CONCLUÍDAS',
    image: '/assets/entrada-garagem-01.webp',
    imageAlt: 'Obra do Residencial V-Falatian, Casas 3 e 4',
    location: 'Fazenda Rio Grande - PR',
    details: ['7 ambientes', 'Passeio disponível'],
    cta: 'Conhecer o projeto',
    href: '/residencial-v-falatian-casas-3-4',
  },
  {
    title: 'Residencial V-Falatian',
    subtitle: 'CASAS 1 E 2',
    badge: 'EM EXECUÇÃO',
    image: '/assets/cardImage.png',
    imageAlt: 'Residencial V-Falatian, Casas 1 e 2',
    location: 'Fazenda Rio Grande - PR',
    cta: 'Conhecer o projeto',
  },

];

// Estes registros ficam centralizados para a troca simples por imagens e rotas
// definitivas quando o material das obras Marcondes estiver disponível.
const managedWorks: PortfolioItem[] = [
  {
    title: 'Marcondes',
    subtitle: 'OBRA 01',
    badge: 'GESTÃO DE OBRAS',
    image: '/assets/capa-gestao-marcondes-01.webp',
    imageAlt: 'Registro de obra em fase de fundação',
    location: 'Fazenda Rio Grande - PR',
    cta: 'Ver atuação',
  },
  {
    title: 'Marcondes',
    subtitle: 'OBRA 02',
    badge: 'GESTÃO DE OBRAS',
    image: '/assets/capa-gestao-marcondes-02.webp',
    imageAlt: 'Registro de obra em fase de alvenaria',
    location: 'Fazenda Rio Grande - PR',
    cta: 'Ver atuação',
  },
];

type HorizontalRailProps = {
  children: ReactNode;
  label: string;
  compact?: boolean;
};

function HorizontalRail({ children, label, compact = false }: HorizontalRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const updateControls = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const remainingScroll = rail.scrollWidth - rail.clientWidth - rail.scrollLeft;
    setCanScrollBack(rail.scrollLeft > 2);
    setCanScrollForward(remainingScroll > 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateControls();
    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(rail);

    return () => resizeObserver.disconnect();
  }, [children, updateControls]);

  const scroll = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.86,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className={styles.railShell}>
      <div
        ref={railRef}
        className={`${styles.rail} ${compact ? styles.compactRail : ''}`}
        onScroll={updateControls}
        aria-label={label}
      >
        {children}
      </div>

      {canScrollBack && (
        <button
          type="button"
          className={`${styles.railControl} ${styles.railControlBack}`}
          onClick={() => scroll(-1)}
          aria-label={`Ver itens anteriores de ${label}`}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
      )}

      {canScrollForward && (
        <button
          type="button"
          className={`${styles.railControl} ${styles.railControlForward}`}
          onClick={() => scroll(1)}
          aria-label={`Ver próximos itens de ${label}`}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

type ProjectCardProps = {
  item: PortfolioItem;
  compact?: boolean;
};

function ProjectCard({ item, compact = false }: ProjectCardProps) {
  const content = (
    <>
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes={compact ? '(max-width: 700px) 84vw, 50vw' : '(max-width: 700px) 86vw, 50vw'}
        className={styles.cardImage}
      />
      <div className={styles.cardShade} aria-hidden="true" />
      <span className={styles.cardBadge}>{item.badge}</span>

      <div className={styles.cardContent}>
        <div className={styles.cardIdentity}>
          <Image
            src="/assets/logo-Dourado.webp"
            alt=""
            width={1189}
            height={1596}
            className={styles.cardLogo}
            aria-hidden="true"
          />
          <div className={styles.cardHeadingText}>
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardSubtitle}>{item.subtitle}</p>
          </div>
        </div>

        <div className={styles.cardMeta}>
          {item.location && (
            <span>
              <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
              {item.location}
            </span>
          )}
          {item.details?.map((detail) => (
            <span key={detail}>
              <Sparkles size={14} strokeWidth={1.5} aria-hidden="true" />
              {detail}
            </span>
          ))}
        </div>

        <span className={`${styles.cardCta} ${!item.href ? styles.cardCtaInactive : ''}`}>
          {item.href ? item.cta : 'Em breve'}
          {item.href ? (
            <ArrowRight size={18} strokeWidth={1.35} aria-hidden="true" />
          ) : (
            <Lock size={15} strokeWidth={1.45} aria-hidden="true" />
          )}
        </span>
      </div>
    </>
  );

  const cardClassName = `${styles.projectCard} ${compact ? styles.compactCard : ''} ${item.href ? styles.interactiveCard : ''}`;

  if (item.href) {
    return (
      <Link href={item.href} target="_self" className={cardClassName} aria-label={`${item.cta}: ${item.title}, ${item.subtitle}`}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

type GroupHeadingProps = {
  title: string;
  description: string;
};

function GroupHeading({ title, description }: GroupHeadingProps) {
  return (
    <header className={styles.groupHeading}>
      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}

export function ProjectActivities() {
  return (
    <section className={styles.section} id="empreendimentos" aria-labelledby="project-activities-title">
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>PROJETOS &amp; ATUAÇÕES</p>
          <h2 id="project-activities-title">
            Construímos, gerimos
            <br />
            e transformamos projetos.
          </h2>
          <p className={styles.supportingText}>
            Atuamos em diferentes frentes com responsabilidade técnica, planejamento e acompanhamento especializado em cada etapa.
          </p>
        </header>

        <div className={styles.portfolioGroups}>
          <section className={styles.portfolioGroup} id="lancamentos" aria-labelledby="developments-title">
            <GroupHeading
              title="EMPREENDIMENTOS VANGLORIAN"
              description="Projetos próprios desenvolvidos e executados pela Vanglorian."
            />
            <span id="developments-title" className={styles.visuallyHidden}>Empreendimentos Vanglorian</span>
            <HorizontalRail label="Empreendimentos Vanglorian">
              {developments.map((item) => (
                <ProjectCard key={item.subtitle} item={item} />
              ))}
            </HorizontalRail>
          </section>

          <section className={styles.portfolioGroup} aria-labelledby="specialized-services-title">
            <GroupHeading
              title="SERVIÇOS ESPECIALIZADOS"
              description="Execuções técnicas realizadas para empresas e instituições."
            />
            <Link
              href="/aeroporto-curitiba"
              target="_self"
              className={`${styles.serviceCard} ${styles.interactiveServiceCard}`}
              aria-label="Conhecer o projeto Aeroporto de Curitiba"
            >
              <Image
                src="/assets/banner-capa-aeroporto-aviao-baixo.png"
                alt=""
                fill
                sizes="(max-width: 1360px) 100vw, 1280px"
                className={styles.serviceImage}
              />
              <div className={styles.serviceShade} aria-hidden="true" />

              <div className={styles.serviceContent}>
                <div className={styles.serviceCopy}>
                  <span className={styles.serviceBadge}>SERVIÇO ESPECIALIZADO</span>
                  <h3 id="specialized-services-title">Aeroporto de Curitiba</h3>
                  <p className={styles.serviceSubtitle}>EXECUÇÃO DE SERVIÇO TÉCNICO</p>

                  <div className={styles.serviceRole}>
                    <span className={styles.serviceRoleIcon} aria-hidden="true">
                      <Image
                        src="/assets/logo-Dourado.webp"
                        alt=""
                        width={30}
                        height={30}
                        className={styles.serviceRoleLogo}
                      />
                    </span>
                    <span>
                      <strong>ATUAÇÃO VANGLORIAN</strong>
                      Execução especializada
                    </span>
                  </div>

                  <p className={styles.serviceLocation}>
                    <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                    São José dos Pinhais
                  </p>
                </div>

                <span className={styles.serviceCta}>
                  Conhecer o projeto
                  <Plane size={18} strokeWidth={1.45} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </section>

          <section className={styles.portfolioGroup} aria-labelledby="managed-works-title">
            <GroupHeading
              title="GESTÃO DE OBRAS"
              description="Obras de terceiros geridas e acompanhadas tecnicamente pela Vanglorian."
            />
            <span id="managed-works-title" className={styles.visuallyHidden}>Gestão de Obras</span>
            <HorizontalRail label="Obras sob gestão" compact>
              {managedWorks.map((item) => (
                <ProjectCard key={item.subtitle} item={item} compact />
              ))}
            </HorizontalRail>
          </section>
        </div>
      </div>
    </section>
  );
}
