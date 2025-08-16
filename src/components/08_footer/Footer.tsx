
'use client'

import Link from "next/link"
import styles from "./Footer.module.css"
import Image from "next/image"
import { CopyrightIcon } from "lucide-react";

export function Footer(){
  const phoneNumber = '+554191459026'; 
  const handleClickTalkWithUs = () => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá!%20Acessei%20o%20%20site%20da%20Vanglorian%20e%20gostaria%20de%20mais%20informações.`;
    window.open(whatsappLink, '_blank'); 
  }
  const handleRedirectInstagram = () => {
    window.open("https://www.instagram.com/vanglorianengenharia/", "_blank");
  };
  const handleRedirectFacebook = () => {
    window.open("https://www.facebook.com/vanglorian", "_blank");
  };
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.internalLinks}>
          <Link className={`${styles.linksText} ${styles.linksTextGridUm}`} href={"#aboutUsComponent"}>Sobre nós</Link>
          <Link className={`${styles.linksText} ${styles.linksTextGridUm}`} href={"#execBlock"}>Em execução</Link>
          <Link className={`${styles.linksText} ${styles.linksTextGridUm}`} href={"#lancamentBlock"}>Lançamentos</Link>
        </div>
        <Link href={"/"} className={styles.logoWithSlogan}>
          <Image 
            src="/assets/logoOficial.webp"
            alt="Logo da empresa Vanglorian representada por um leão"
            width={11182}
            height={9295}
            className={styles.imageLogo}
          />
        </Link>
        <div className={styles.socialLinks}>
          <button className={`${styles.linksText} ${styles.linksTextGridDois}`}  onClick={handleClickTalkWithUs}><Image  src={"/assets/logoWhatsapp.webp"} alt="simbolo whatsapp" width={100} height={93} className={styles.iconSty}/>Whatsapp</button>
          <button className={`${styles.linksText} ${styles.linksTextGridDois}`}  onClick={handleRedirectInstagram}><Image  src={"/assets/logoInstagram.webp"} alt="simbolo instagram" width={100} height={93} className={styles.iconSty}/>Instagram</button>
          <button className={`${styles.linksText} ${styles.linksTextGridDois}`}  onClick={handleRedirectFacebook}><Image  src={"/assets/logoFacebook.webp"} alt="simbolo facebook" width={100} height={93} className={styles.iconSty}/>Facebook</button>
        </div>
      </div>
      <div className={styles.copyBlock}><CopyrightIcon className={styles.copyIcon}/><p className={styles.textCopy}>{currentYear} Vanglorian Incorporadora e Construtora Ltda. <span className={styles.spanTextCopy}>Curitiba – PR.Todos os direitos reservados.</span></p></div>
    </footer>
  ) 
}