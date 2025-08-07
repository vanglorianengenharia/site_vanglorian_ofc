
import Link from "next/link";
import styles from "./AboutUs.module.css";
import Image from "next/image";

export function AboutUs(){
  return(
    <div className={styles.aboutUsContainer} id="aboutUsComponent">
      <div className={styles.aboutUsGridOne}>
        <Image
              src={"/assets/backgroundAboutUs2.png"}
              width={500}
              height={386}
              alt={"Logo da Vanglorian representado por um leão com uma coroa"}
              className={styles.imageBackground}
            />
      </div>
      <div className={styles.aboutUsGridTwo}>
          <Link href={"/"}>
            <Image
              src={"/assets/logoOficial.webp"}
              width={1000}
              height={900}
              alt={"Logo da Vanglorian representado por um leão com uma coroa"}
              className={styles.brandLogo}
            />
          </Link>
        <div className={styles.aboutUsTextBlock}>
          <p  className={styles.aboutUs}>Nosso nome carrega nossa identidade e missão: “Van”, de vanguarda, representa inovação, visão e liderança. “Glorian”, de glória, simboliza o esplendor que dedicamos a Deus - cada projeto, cada conquista, é para glorificar Aquele que nos guia.</p>
        </div>
      </div>
    </div>
  )
}