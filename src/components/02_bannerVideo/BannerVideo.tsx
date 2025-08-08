'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BannerVideo.module.css';

const listWord = [
  'Se importa',
  'Sonha',
  'Constrói',
  'Realiza',
  'Detalhes pensados',
  'Versatilidade',
];

export function BannerVideo() {
  const [indexWordsState, setIndexWordsState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndexWordsState((prev) => (prev + 1) % listWord.length);
    }, 4000); // troca a cada 4 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.wrapperCompanyIntroVideo}>
      <div className={styles.content}>
        <div className={styles.videoBlock}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
          >
            <source src="/videos/teaser.webm" type="video/webm" />
          </video>
        </div>
        <div className={styles.backgrounGradient}></div>
        <div className={styles.textBlock}>
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
  );
}
