'use client'

import styles from "./emExec.module.css";
import Image from "next/image"
import Link from "next/link";

export default function EmExecucao(){
  return (
    <div className={styles.emExecContainer}>
  
     <div className={styles.divTitleSection}>
        <h2 className={styles.titleSection}>Obras próprias</h2>
        <div className={styles.divBlocksSection}>
         
            <Link href={"/residencial-v-falatian-casas-3-4"} target="_self" className={styles.linkEmExecImgTextResidenciaVFalatian}>
              <Image src={"/assets/residVfalatianCapa.png"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={styles.imageCapaCard}/>
              <div className={styles.divEmExecImgTextResidenciaVFalatian} >
                <Image src={"/assets/logo_icon.webp"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={styles.imageTextResidencial}/>
                <span className={styles.textResidenciaVFalatian}>Residencial V-Falatian - Casa 1 e 2</span>
              </div>
           </Link>
             <Link  href={"/residencial-v-falatian-casas-3-4"} className={styles.linkEmExecImgTextResidenciaVFalatian}>
              <Image src={"/assets/cardImage.png"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={styles.imageCapaCard}/>
              <div className={styles.divEmExecImgTextResidenciaVFalatian} >
                <Image src={"/assets/logo_icon.webp"} alt={"Ìcone Vanglorian com o nome do residencial que se chama v-falatian"} width={1536} height={1024} className={styles.imageTextResidencial}/>
                <span className={styles.textResidenciaVFalatian}>Residencial V-Falatian - Casa 3 e 4</span>
              </div>
            </Link>

        </div>
     </div>  
   </div>
  )
}