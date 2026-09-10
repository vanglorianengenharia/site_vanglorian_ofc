'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, ClipboardCheck, Hammer, Handshake } from 'lucide-react';
import { useHomeSectionNavigation } from '@/hooks/useHomeSectionNavigation';
import styles from './CompanyIntroVideo.module.css';

const whatsappLink =
  'https://wa.me/+554191459026?text=Ol%C3%A1!%20Acessei%20o%20%20site%20da%20Vanglorian%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';

const pillars = [
  {
    title: 'Construções sob medida',
    description:
      'Obras próprias e terceirizadas com execução residencial, comercial e industrial.',
    Icon: Building2,
  },
  {
    title: 'Gestão completa de obras',
    description:
      'Projetos, responsabilidade técnica, acompanhamento e mão de obra especializada em cada etapa.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Reformas personalizadas',
    description:
      'Soluções pensadas para renovar e transformar espaços residenciais, comerciais e industriais.',
    Icon: Hammer,
  },
  {
    title: 'Parcerias de investimento',
    description:
      'Oportunidades para desenvolvimento de novos empreendimentos e projetos em parceria.',
    Icon: Handshake,
  },
];

export function CompanyIntroVideo() {
  const navigateToHomeSection = useHomeSectionNavigation();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <picture>
        <source media="(max-width: 900px)" srcSet="/assets/capa-hero-mobile.webp" />
        <Image
          src="/assets/hero-desktop.webp"
          alt="Residência contemporânea projetada pela Vanglorian"
          className={styles.heroImage}
          fill
          priority
          sizes="100vw"
        />
      </picture>

      <svg
        className={styles.translucentPanel}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={styles.panelFill}
          d="M -4000 0 L 687 0 L 994.835 482.5 Q 1006 500 993.19 517.5 L 640 1000 L -4000 1000 Z"
        />
        <path
          className={styles.panelOutline}
          d="M -4000 0 L 687 0 L 994.835 482.5 Q 1006 500 993.19 517.5 L 640 1000"
        />
      </svg>

      <div className={styles.contentContainer}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Construtora e Incorporadora</p>

          <h1 className={styles.title} id="hero-title">
            <span>Casas pensadas</span>
            <span>
              para <strong>viver bem</strong>
            </span>
            <span>
              em cada <strong>detalhe</strong>
            </span>
          </h1>

          <span className={styles.titleDetail} aria-hidden="true" />

          <p className={styles.subtitle}>
            Construção, gestão de obras e reformas com acompanhamento técnico especializado do projeto à entrega.
          </p>

          <div className={styles.actions}>
            <Link
              href="/#empreendimentos"
              className={`${styles.cta} ${styles.primaryCta}`}
              onClick={(event) => navigateToHomeSection('empreendimentos', event)}
            >
              <span>Projetos &amp; Atuações</span>
              <span className={styles.primaryIcon} aria-hidden="true">
                <ArrowRight size={17} strokeWidth={1.8} />
              </span>
            </Link>

            <a
              href={whatsappLink}
              className={`${styles.cta} ${styles.secondaryCta}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com um consultor pelo WhatsApp"
            >
              <span>Falar com um consultor</span>
              <span className={styles.secondaryIcon} aria-hidden="true">
                <ArrowRight size={17} strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </div>
      </div>

      <ul className={styles.pillars} aria-label="Pilares da Vanglorian">
        {pillars.map(({ title, description, Icon }) => (
          <li className={styles.pillar} key={title}>
            <span className={styles.pillarIcon} aria-hidden="true">
              <Icon size={22} strokeWidth={1.45} />
            </span>
            <div className={styles.pillarContent}>
              <h2 className={styles.pillarTitle}>{title}</h2>
              <p className={styles.pillarDescription}>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
