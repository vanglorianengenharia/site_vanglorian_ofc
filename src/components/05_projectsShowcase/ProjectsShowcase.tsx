'use client'

import { useEffect, useState } from "react";
import styles from "./ProjectsShowcase.module.css";
import Image from "next/image";
import Link from "next/link";

const imageList = [
  "/assets/imageTesteNovoExec.png",
  "/assets/imageTesteNovoExec1.png",
  "/assets/imageTesteNovoExec2.png",
  "/assets/imageTesteNovoExec03.png",
];
const imageList2 = [
  "/assets/slideLan1.webp",
  "/assets/slideLan2.webp",
  "/assets/slideLan3.webp",
  "/assets/slideLan4.webp",
  "/assets/slideLan5.webp",
  "/assets/slideLan6.webp",
  "/assets/slideLan7.webp",
  "/assets/slideLan8.webp",
  "/assets/slideLan9.webp",
];

export function ProjectsShowcase(){
    const [currentIndexExec, setCurrentIndexExec] = useState(0);
    const [currentIndexLanc, setCurrentIndexLanc] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
      setCurrentIndexExec((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 3 segundos por slide
    return () => clearInterval(interval);
  }, []);

     useEffect(() => {
      const interval = setInterval(() => {
      setCurrentIndexLanc((prevIndex) =>
        prevIndex === imageList2.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 3 segundos por slide
    return () => clearInterval(interval);
  }, []);

  return(
    <div className={styles.projectsShowcaseContainer}>
      <div className={styles.projectsShowcaseContent} id="empreendimentos" >
        <div className={styles.emExecContainer}>
        <div className={styles.divTitleSection}>
            <h2 className={styles.lancamTitle}>Empreendimentos</h2>
            <div className={styles.divBlocksSection}>
                <Link href={"/residencial-v-falatian-casas-3-4"} target="_self" className={styles.linkEmExecImgTextResidenciaVFalatian}>                  
                  <Image 
                    src={imageList[currentIndexExec]}
                    alt={`Slide ${currentIndexExec + 1}`}
                    width={1024}
                    height={1536}
                    className={styles.imageCapaCard}
                    />
                  <div className={styles.divEmExecImgTextResidenciaVFalatian} >
                    <Image src={"/assets/logo_icon.webp"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={styles.imageTextResidencial}/>
                    <span className={styles.textResidenciaVFalatian}>Residencial V-Falatian - Casas 3 e 4</span>
                  </div>
              </Link>
             <div className={`${styles.linkEmExecImgTextResidenciaVFalatian} ${styles.linkEmExecImgTextResidenciaVFalatianCasa1e2}`}>
              <Image src={"/assets/cardImage.png"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={`${styles.imageCapaCard} ${styles.imageCapaCard2}`}/>
              <div className={styles.divEmExecImgTextResidenciaVFalatian} >
                <Image src={"/assets/logo_icon.webp"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={styles.imageTextResidencial}/>
                <span className={styles.textResidenciaVFalatian}>Residencial V-Falatian - Casas 1 e 2</span>
              </div>
            </div>
        </div>
     </div>  
   </div>
   </div>
      <div className={styles.projectsShowcaseContentLanc} id="obras-em-lancamento" >
        <h2 className={styles.lancamTitle}>Lançamentos</h2>
        <div className={styles.lancamContent}>
          <div className={styles.slideImageContent}>
              <Image 
                src={imageList2[currentIndexLanc]}
                alt={`Slide ${currentIndexLanc + 1}`}
                width={1024}
                height={1536}
                className={styles.imageLancam}
                />
          </div>
          <div className={styles.paragraphContent}>
            <h2 className={styles.paragraphText}>Conheça os lançamentos da Vanglorian: casas recém-apresentadas ao mercado, com condições exclusivas de compra.</h2>
          </div>
        </div>
      </div>
    </div>
  )
}