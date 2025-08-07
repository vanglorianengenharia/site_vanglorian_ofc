'use client'


import Image from "next/image"
import styles from "./DiferenciVanglorian.module.css";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const imageListDif1 = [
 "/assets/infra1.jpg",
 "/assets/infra2.jpg",
 "/assets/infra3.jpg",
];
const imageListDif2 = [
 "/assets/supra1.jpg",
 "/assets/supra2.jpg",
 "/assets/supra3.jpg",
];

export default function DiferenciVanglorian() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
   const interval = setInterval(() => {
     setCurrentIndex((prevIndex) =>
       prevIndex === imageListDif1.length - 1 ? 0 : prevIndex + 1
     );
   }, 2000); // 3 segundos por slide
   return () => clearInterval(interval);
    }, []);
  useEffect(() => {
   const interval = setInterval(() => {
     setCurrentIndex((prevIndex) =>
       prevIndex === imageListDif2.length - 1 ? 0 : prevIndex + 1
     );
   }, 2000); // 3 segundos por slide
   return () => clearInterval(interval);
    }, []);


 return(
   <div className={styles.constructionAdvantagesContainer}>
     <div className={styles.constructionAdvantagesContent}>
       <div className={styles.constructionAdvantagesTextBlock}>
         <h2 className={styles.constructionAdvantagesTitle}>Diferenciais da Vanglorian</h2>
         <p className={styles.constructionAdvantagesSubtitle}>Compromisso com a qualidade em cada detalhe</p>
       </div>
       <div className={styles.constructionAdvantagesImageDescription}>
         <div className={styles.constructionAdvantagesImageTitleDescription}
            onMouseEnter={() => setHoveredCardIndex(0)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageListDif1[currentIndex]}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className={styles.constructionAdvantagesImageTitleDescription}
                >
                  <Image
                    src={imageListDif1[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    width={1024}
                    height={1536}
                    className={styles.imageGif}
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            <div className={styles.titleSubtitle}>
              <div className={styles.divTitleAndIcon}><p className={styles.titleImage}>Infraestrutura e superestrutura robustas</p> <span className={hoveredCardIndex === 0 ? styles.chevronDown : styles.chevronUp}><ChevronDown className={styles.chevroDownIcon}/></span></div>
              <div className={hoveredCardIndex === 0 ? styles.mouseIconHide : styles.btnSaibaMaisBlock}><p className={styles.btnSaibaMais}>Saiba mais...</p></div>
              <p className={hoveredCardIndex === 0 ? styles.subtitleImage : styles.descriptionHide}>Vigas baldrames sobre estacas com mais de 3 metros de profundidade.</p>
            </div>
         </div>
         <div className={styles.constructionAdvantagesImageTitleDescription}
              onMouseEnter={() => setHoveredCardIndex(1)}
              onMouseLeave={() => setHoveredCardIndex(null)} 
           >
            <Image
             src={imageListDif2[currentIndex]}
             alt={`Slide ${currentIndex + 1}`}
             className={styles.imageGif}
             width={1600}
             height={900}
             unoptimized
           />
            <div className={styles.titleSubtitle} >
              <div className={`${styles.divTitleAndIcon} ${styles.divTitleAndIconSecondCard} `}><p className={styles.titleImage}>Estrutura que permite alteração e ampliação do layout</p> <span className={hoveredCardIndex === 1 ? styles.chevronDown : styles.chevronUp}><ChevronDown /></span></div>
              <div className={hoveredCardIndex === 1 ? styles.mouseIconHide : styles.btnSaibaMaisBlock}><p className={styles.btnSaibaMais}>Saiba mais...</p></div>
              <p className={hoveredCardIndex === 1 ? styles.subtitleImage : styles.descriptionHide}>Diferente de construções de alvenaria estrutural a nossa é construída com estrutura de concreto armado e paredes de vedação que permitem reformas e personalizações mesmo depois da entrega da obra.</p>
            </div>
         </div>
            <div  className={styles.constructionAdvantagesImageTitleDescription}
              onMouseEnter={() => setHoveredCardIndex(2)}
              onMouseLeave={() => setHoveredCardIndex(null)}>
              <Image
              src={'/assets/gifTransitionFac2.gif'}
              alt={'imagem ilustrativa casa Vanglorian'}
              className={styles.imageGif}
              width={1600}
              height={900}
              unoptimized
              />
              <div className={styles.titleSubtitle}>
              <div className={styles.divTitleAndIcon}><p className={styles.titleImage}> O lar dos seus sonhos com o estilo que é só seu</p> <span className={hoveredCardIndex === 2 ? styles.chevronDown : styles.chevronUp}><ChevronDown /></span></div>
              <div className={hoveredCardIndex === 2 ? styles.mouseIconHide : styles.btnSaibaMaisBlock}><p className={styles.btnSaibaMais}>Saiba mais...</p></div>
              <p className={hoveredCardIndex === 2 ? styles.subtitleImage : styles.descriptionHide}>Oferecemos a possibilidade de escolha do revestimento cerâmico, da pintura das paredes internas, externas, portão e grades.</p>
            </div>
          </div>
       </div>
     </div>
   </div>
 )
}