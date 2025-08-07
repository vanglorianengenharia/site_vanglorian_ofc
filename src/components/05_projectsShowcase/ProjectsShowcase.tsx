'use client'

import { useEffect, useState } from "react";
import styles from "./ProjectsShowcase.module.css";
import Image from "next/image";

const imageList = [
  "/assets/slide1.png",
  "/assets/slide4.png",
  "/assets/slide5.png",
  "/assets/slide6.png",
];
const imageList2 = [
  "/assets/slideLan1.png",
  "/assets/slideLan2.png",
  "/assets/slideLan3.png",
  "/assets/slideLan4.png",
  "/assets/slideLan5.png",
  "/assets/slideLan6.png",
  "/assets/slideLan7.png",
  "/assets/slideLan8.png",
  "/assets/slideLan9.png",
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
      <div className={styles.projectsShowcaseContent} id="execBlock" >
        <h2 className={styles.emExecucaoTitle}>Em execução</h2>
        <div className={styles.emExecucaoContent}>
          <div className={styles.slideImageContent}>
              <Image 
                src={imageList[currentIndexExec]}
                alt={`Slide ${currentIndexExec + 1}`}
                width={1024}
                height={1536}
                className={styles.imageEmExec}
                />
                <Image 
                src={"/assets/v-falatian-quadrado-logo-esquerda.png"}
                alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"}
                width={1024}
                height={1536}
                className={styles.imageIconeNomeResidencial}
                />
                
          </div>
          <div className={styles.paragraphContent}>
            <h2 className={styles.paragraphText}>Acompanhe de perto a evolução das obras das futuras casas Vanglorian. Projetos em andamento que unem qualidade, design e conforto, com a garantia de um lar pensado nos mínimos detalhes.</h2>
          </div>
        </div>
      </div>


      <div className={styles.projectsShowcaseContentLanc} id="lancamentBlock" >
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