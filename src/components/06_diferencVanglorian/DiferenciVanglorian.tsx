'use client'

import Image from "next/image"
import styles from "./DiferenciVanglorian.module.css";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const imageListDif1 = [
 "/assets/infra11.webp",
 "/assets/infra22.webp",
 "/assets/infra33.webp",
];
const imageListDif2 = [
 "/assets/supra1.webp",
 "/assets/supra22.webp",
 "/assets/supra33.webp",
];

export default function DiferenciVanglorian() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);


    const [openCards, setOpenCards] = useState([false, false, false]);
      const toggleCard = (index: number) => {
    setOpenCards((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  

  useEffect(() => {
   const interval = setInterval(() => {
     setCurrentIndex((prevIndex) =>
       prevIndex === imageListDif1.length - 1 ? 0 : prevIndex + 1
     );
   }, 3000); // 3 segundos por slide
   return () => clearInterval(interval);
    }, []);
  useEffect(() => {
   const interval2 = setInterval(() => {
     setCurrentIndex2((prevIndex2) =>
       prevIndex2 === imageListDif2.length - 1 ? 0 : prevIndex2 + 1
     );
   }, 3000); // 3 segundos por slide
   return () => clearInterval(interval2);
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
            onClick={() => toggleCard(0)}
            
          >
            <Image
              src={imageListDif1[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              width={1024}
              height={1536} 
              className={styles.imageGif}
              unoptimized
            />    
            <div className={styles.titleSubtitle}>
              <div className={styles.divTitleAndIcon}><p className={styles.titleImage}>Infraestrutura e superestrutura robustas</p> <span className={openCards[0] ? styles.chevronDown : styles.chevronUp}><ChevronDown className={styles.chevroDownIcon}/></span></div>
              <div className={openCards[0] ?  styles.mouseIconHide : styles.btnSaibaMaisBlock}><p className={styles.btnSaibaMais}>Saiba mais</p></div>
              <p className={openCards[0] ? styles.subtitleImage : styles.descriptionHide}>Vigas baldrames sobre estacas com mais de 3 metros de profundidade.</p>
            </div>
          </div>
         <div className={styles.constructionAdvantagesImageTitleDescription}
              onClick={() => toggleCard(1)}
           >
            <Image
             src={imageListDif2[currentIndex2]}
             alt={`Slide ${currentIndex2 + 1}`}
             className={styles.imageGif}
             width={1600}
             height={900}
             unoptimized
           />
            <div className={styles.titleSubtitle} >
              <div className={`${styles.divTitleAndIcon} ${styles.divTitleAndIconSecondCard} `}><p className={styles.titleImage}>Estrutura que permite alteração e ampliação do layout</p> <span className={openCards[1] ? styles.chevronDown : styles.chevronUp}><ChevronDown /></span></div>
              <div className={openCards[1] ? styles.mouseIconHide : styles.btnSaibaMaisBlock}><p className={styles.btnSaibaMais}>Saiba mais</p></div>
              <p className={openCards[1] ? styles.subtitleImage : styles.descriptionHide}>Diferente de construções de alvenaria estrutural a nossa é construída com estrutura de concreto armado e paredes de vedação que permitem reformas e personalizações mesmo depois da entrega da obra.</p>
            </div>
         </div>
            <div  className={styles.constructionAdvantagesImageTitleDescription}
              onClick={() => toggleCard(2)}>
              <Image
              src={'/assets/gifTransitionFac.gif'}
              alt={'imagem ilustrativa casa Vanglorian'}
              className={styles.imageGif}
              width={1600}
              height={900}
              unoptimized
              />
              <div className={styles.titleSubtitle}>
              <div className={styles.divTitleAndIcon}><p className={styles.titleImage}> O lar dos seus sonhos com o estilo que é só seu</p> <span className={openCards[2] ? styles.chevronDown : styles.chevronUp}><ChevronDown /></span></div>
              <div className={openCards[2] ? styles.mouseIconHide : styles.btnSaibaMaisBlock}><p className={styles.btnSaibaMais}>Saiba mais</p></div>
              <p className={openCards[2] ? styles.subtitleImage : styles.descriptionHide}>A fachada é o cartão de visitas do seu imóvel, por isso, oferecemos a possibilidade de escolher a cor que melhor expressa sua identidade.</p>
            </div>
          </div>
       </div>
     </div>
   </div>
 )
}