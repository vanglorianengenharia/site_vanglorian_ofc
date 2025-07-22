'use client'

import { useEffect, useState } from "react";
import styles from "./CompanyIntroVideo.module.css";

const listWord1 = ["Você sonha", "Você imagina", "Cada detalhe pensado", "Versatilidade"];
const listWord2 = ["Realiza", "Constrói", "Se importa", "Tem"];


export function CompanyIntroVideo(){
   const [indexWordsState, setIndexWordsState] = useState(0);
   
   useEffect(() => {
    const timer = setInterval(() => {
      setIndexWordsState((prev) => (prev + 1) % listWord1.length);
    }, 3000); // troca a cada 2 segundos

    return () => clearInterval(timer);
  }, []);

  return(
    <div className={styles.wrapperCompanyIntroVideo}>
      <div className={styles.content}>
        <div className={styles.backgrounGradient}>
          <div>
            <video 
              autoPlay
              muted
              loop
              playsInline
              className={styles.video}>
              <source src="/videos/teaser.webm" type="video/webm" />
            </video>
          </div>
          <div className={styles.textBlock}>
            <span className={styles.textTitle1}>Construtora e Incorporadora</span>
            <span className={styles.words1}>{listWord1[indexWordsState]}</span>
            <h1 className={styles.textH1}>Vanglorian</h1>
              <span className={styles.words2}>{listWord2[indexWordsState]}</span>
          </div>
        </div>
      </div>
    </div>

  )
}