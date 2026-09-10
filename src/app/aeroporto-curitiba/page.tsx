import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Compass,
  HardHat,
  Layers3,
  MapPin,
  Route,
  ShieldCheck,
  Shuffle,
  Undo2,
  UsersRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AirportGallery } from './AirportGallery';
import { TimelineProgress } from './TimelineProgress';
import styles from './airportCuritiba.module.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-airport-display',
});

export const metadata: Metadata = {
  title: 'Aeroporto de Curitiba | Projeto em andamento | Vanglorian',
  description:
    'Conheça a atuação da Vanglorian em projeto de infraestrutura aeroportuária em Curitiba, com execução, gestão técnica, segurança e conformidade.',
  openGraph: {
    title: 'Aeroporto de Curitiba | Vanglorian',
    description:
      'Execução e suporte técnico em obra estratégica de infraestrutura.',
    images: [
      {
        url: '/assets/banner-aeroporto-curitiba.webp',
        width: 1672,
        height: 940,
        alt: 'Aeroporto de Curitiba ao entardecer',
      },
    ],
  },
};

const facts = [
  { icon: Building2, label: 'Tipo de projeto', value: 'Infraestrutura aeroportuária' },
  { icon: HardHat, label: 'Atuação', value: 'Execução e gestão técnica' },
  { icon: Layers3, label: 'Área atendida', value: 'Áreas internas e externas' },
  { icon: MapPin, label: 'Localização', value: 'São José dos Pinhais – PR' },
  { icon: BadgeCheck, label: 'Status', value: 'Em andamento' },
];

const services = [
  {
    icon: Route,
    title: 'Planejamento e execução',
    text: 'Planejamento detalhado das etapas e alinhamento operacional para atuação em ambiente de alta exigência.',
  },
  {
    icon: ClipboardCheck,
    title: 'Coordenação e acompanhamento técnico',
    text: 'Supervisão contínua da execução com foco em qualidade, eficiência e cumprimento dos prazos.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e conformidade',
    text: 'Execução em conformidade com normas técnicas e critérios rigorosos de segurança.',
  },
  {
    icon: UsersRound,
    title: 'Gestão de frentes de serviço',
    text: 'Controle integrado de equipes, materiais e fornecedores, garantindo fluxo contínuo da obra.',
  },
];

const timeline = [
  {
    number: '01',
    title: 'Preparação inicial',
    text: 'Levantamento, organização das equipes e preparação do ambiente.',
    image: '/assets/timeline-01.webp',
    position: 'center',
  },
  {
    number: '02',
    title: 'Execução estrutural',
    text: 'Execução das estruturas e adequações conforme projeto técnico.',
    image: '/assets/timeline-02.webp',
    position: '30% center',
  },
  {
    number: '03',
    title: 'Infraestrutura e instalações',
    text: 'Desenvolvimento das instalações técnicas necessárias ao ambiente.',
    image: null,
    position: 'center',
  },
  {
    number: '04',
    title: 'Adequações finais',
    text: 'Acabamentos, ajustes, testes e validação dos sistemas.',
    image: null,
    position: '68% center',
  },
  {
    number: '05',
    title: 'Entrega do projeto',
    text: 'Finalização e entrega de acordo com os requisitos técnicos definidos.',
    image: null,
    position: '78% center',
  },
];

const operationalStrengths = [
  {
    icon: BadgeCheck,
    title: 'Credenciamento',
    text: 'Atendimento aos procedimentos necessários para atuação em ambiente aeroportuário.',
  },
  {
    icon: HardHat,
    title: 'Equipe habilitada',
    text: 'Profissionais preparados para cumprir os requisitos de acesso e execução.',
  },
  {
    icon: ShieldCheck,
    title: 'Conformidade operacional',
    text: 'Adequação da operação às normas e procedimentos estabelecidos pelo local.',
  },
  {
    icon: Shuffle,
    title: 'Capacidade de adaptação',
    text: 'Estrutura preparada para atuar em projetos com diferentes níveis de exigência.',
  },
];

function AirportHero() {
  return (
    <section className={styles.hero} aria-labelledby="airport-title">
      <Link href="/#empreendimentos" className={styles.backButton}>
        <Undo2 className={styles.backButtonIcon} aria-hidden="true" />
        <span>Voltar</span>
      </Link>
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        <span className={styles.badge}>PROJETO EM ANDAMENTO</span>
        <h1 id="airport-title">
          Aeroporto
          <br />
          <em>de Curitiba</em>
        </h1>
        <p className={styles.heroSubtitle}>
          Execução e suporte técnico em obra estratégica de infraestrutura
        </p>
        <p className={styles.heroLocation}>
          <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
          São José dos Pinhais – PR
        </p>
        <div className={styles.tags} aria-label="Características do projeto">
          {['Infraestrutura', 'Ambiente operacional', 'Execução técnica', 'Alta exigência'].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AirportProjectFacts() {
  return (
    <section className={styles.facts} aria-label="Informações do projeto">
      <div className={styles.factsGrid}>
        {facts.map(({ icon: Icon, label, value }) => (
          <div className={styles.fact} key={label}>
            <Icon size={21} strokeWidth={1.35} aria-hidden="true" />
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AirportServices() {
  return (
    <section className={`${styles.lightSection} ${styles.services}`} aria-labelledby="services-title">
      <div className={styles.sectionContainer}>
        <div className={styles.servicesHeader}>
          <p className={styles.eyebrow}>ENGENHARIA EM MOVIMENTO</p>
          <h2 id="services-title">NOSSA ATUAÇÃO<br />NESTE PROJETO</h2>
        </div>
        <div className={styles.servicesGrid}>
          {services.map(({ icon: Icon, title, text }, index) => (
            <article className={styles.service} key={title}>
              <div className={styles.serviceTopline}>
                <Icon size={27} strokeWidth={1.25} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AirportTimeline() {
  return (
    <section className={styles.timelineSection} aria-labelledby="timeline-title">
      <div className={styles.sectionContainer}>
        <header className={styles.darkHeading}>
          <div>
            <p className={styles.eyebrow}>PROCESSO CONTROLADO</p>
            <h2 id="timeline-title">EVOLUÇÃO<br />DA OBRA</h2>
          </div>
          <p>Acompanhamento de cada etapa com planejamento, organização e precisão.</p>
        </header>
        <TimelineProgress items={timeline} />
      </div>
    </section>
  );
}

function AirportChallenges() {
  return (
    <section className={`${styles.lightSection} ${styles.challenges}`} aria-labelledby="challenges-title">
      <div className={`${styles.sectionContainer} ${styles.challengesGrid}`}>
        <div className={styles.challengeVisual}>
          <Image
            src="/assets/capa-precisao-operacional.webp"
            alt="Vista externa de terminal aeroportuário em operação"
            fill
            sizes="(max-width: 850px) 100vw, 42vw"
            className={styles.challengeImage}
          />
        </div>
        <div className={styles.challengeCopy}>
          <p className={styles.eyebrow}>PRECISÃO OPERACIONAL</p>
          <h2 id="challenges-title">
            Preparação para<br />ambientes de <em>alta exigência.</em>
          </h2>
          <div className={styles.strengthsGrid}>
            {operationalStrengths.map(({ icon: Icon, title, text }) => (
              <article className={styles.strengthCard} key={title}>
                <Icon size={52} strokeWidth={1.35} aria-hidden="true" />
                <h3>{title}</h3>
                <i aria-hidden="true" />
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AirportFinalCTA() {
  const whatsappUrl =
    'https://wa.me/+554191459026?text=Ol%C3%A1!%20Acessei%20o%20site%20da%20Vanglorian%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.';

  return (
    <section className={styles.finalCta} aria-labelledby="final-cta-title">
      <Image
        src="/assets/logo-Dourado.webp"
        alt=""
        width={600}
        height={804}
        className={styles.ctaWatermark}
        aria-hidden="true"
      />
      <div className={`${styles.sectionContainer} ${styles.ctaGrid}`}>
        <div>
          <p className={styles.eyebrow}>COMPROMISSO VANGLORIAN</p>
          <h2 id="final-cta-title">EXCELÊNCIA QUE<br /><em>CONSTROI CONFIANÇA</em></h2>
          <p className={styles.ctaSupport}>
            Projetos que exigem mais do que técnica exigem compromisso, responsabilidade e experiência. É isso que entregamos.
          </p>
        </div>
        <div className={styles.ctaAction}>
          <Compass size={31} strokeWidth={1.2} aria-hidden="true" />
          <p>Seu projeto também pode contar com gestão e execução da Vanglorian.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>Fale com um consultor</span>
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function AirportCuritibaPage() {
  return (
    <main className={`${styles.page} ${playfair.variable}`}>
      <AirportHero />
      <AirportProjectFacts />
      <AirportServices />
      <AirportTimeline />
      <AirportChallenges />
      <AirportGallery />
      <AirportFinalCTA />
    </main>
  );
}
