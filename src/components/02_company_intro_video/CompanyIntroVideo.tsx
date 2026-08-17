'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useHomeSectionNavigation } from '@/hooks/useHomeSectionNavigation';
import styles from './CompanyIntroVideo.module.css';

const whatsappLink =
  'https://wa.me/+554191459026?text=Ol%C3%A1!%20Acessei%20o%20%20site%20da%20Vanglorian%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';

export function CompanyIntroVideo() {
  const navigateToHomeSection = useHomeSectionNavigation();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/assets/imagemHero.webp"
        alt="Residência contemporânea projetada pela Vanglorian"
        className={styles.heroImage}
        fill
        priority
        sizes="100vw"
      />

      <div className={styles.translucentPanel} aria-hidden="true" />
      <svg
        className={styles.goldLine}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 33 0 L 55.25 49.8 Q 57 53 55.25 56.2 L 36 100"
          vectorEffect="non-scaling-stroke"
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
            Soluções completas em construção civil<br className={styles.desktopBreak} />{' '}
            com alto padrão de qualidade, inovação<br className={styles.desktopBreak} />{' '}
            e compromisso em cada etapa.
          </p>

          <div className={styles.actions}>
            <Link
              href="/#empreendimentos"
              className={`${styles.cta} ${styles.primaryCta}`}
              onClick={(event) => navigateToHomeSection('empreendimentos', event)}
            >
              <span>Ver empreendimentos</span>
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
    </section>
  );
}
