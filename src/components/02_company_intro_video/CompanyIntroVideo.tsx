'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CompanyIntroVideo.module.css';

const listWord = [
  'Se importa',
  'Constrói',
  'Realiza',
  'Versatilidade',
];

const images = [
  "/assets/slideVid1.webp",
  "/assets/slideVid2.webp",
  "/assets/slideVid3.webp",
  "/assets/slideVid4.webp",
  "/assets/slideVid5.webp",
  "/assets/slideVid5-1.webp",
  "/assets/slideVid6.webp",
  "/assets/slideVid7.webp",
  "/assets/slideVid8.webp",
];


export function CompanyIntroVideo() {
  const [indexWordsState, setIndexWordsState] = useState(0);
  const [index, setIndex] = useState(0);
  const [effect, setEffect] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndexWordsState((prev) => (prev + 1) % listWord.length);
    }, 4000); // troca a cada 4 segundos

    return () => clearInterval(timer);
  }, []);


  
   useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setEffect((prev) => (prev + 1) % 3); // alterna entre 3 efeitos
      }, 5000); // troca a cada 5s
      return () => clearInterval(timer);
    }, []);
  
    const getAnimation = (effectType: number) => {
      switch (effectType) {
        case 0: // Fade + Zoom
          return {
            initial: { opacity: 0, scale: 1.1 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 },
          };
        case 1: // Pan esquerda → direita
          return {
            initial: { x: "0%", scale: 1.1, opacity: 0 },
            animate: { x: "0%", scale: 1, opacity: 1 },
            exit: { opacity: 0 },
          };
        case 2: // Pan direita → esquerda
          return {
            initial: { x: "0%", scale: 1.1, opacity: 0 },
            animate: { x: "0%", scale: 1, opacity: 1 },
            exit: { opacity: 0 },
          };
        default:
          return {};
      }
    };











  return (
    <div className={styles.wrapperCompanyIntroVideo}>
      <div className={styles.content}>
        <div className={styles.videoBlock}>

          <AnimatePresence mode="wait">
                  <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt=""
                    className={styles.video}
                    {...getAnimation(effect)}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </AnimatePresence>
          
          {/* <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
          >
            <source src="/videos/teaser.webm" type="video/webm" />
          </video> */}
        </div>
        {/* <div className={styles.backgrounGradient}></div> */}
        <div className={styles.textBlock}>
          <div className={styles.newDiv}>
               <span className={styles.textTitle1}>Construtora e Incorporadora</span>
              <h1 className={styles.textH1}>Vanglorian</h1>

          <div className={styles.textSlider}>
            <AnimatePresence mode="wait">
              <motion.div
                key={listWord[indexWordsState]}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.words}
              >
                {listWord[indexWordsState]}
              </motion.div>
            </AnimatePresence>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
