
'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./IntroVanglorian.module.css";

export default function IntroVanglorian() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // dispara só uma vez
        }
      },
      { threshold: 0.2 } // 30% visível já ativa
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.introVanglorianComponent}>
      <div className={styles.introVanglorianContent}>
        <p ref={sectionRef} className={isVisible ? styles.introVanglorianParagraph1 : ""}>Somos uma construtora e incorporadora especializada na construção e venda de casas.</p>
        <p className={isVisible ? styles.introVanglorianParagraph2 : ""}>Entregamos imóveis com qualidade, segurança e compromisso com o seu novo lar.</p>
      </div>
    </section>
  );
}