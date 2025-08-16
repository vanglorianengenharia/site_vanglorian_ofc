'use client'

import Image from "next/image";
import styles from "./BtnWhatsapp.module.css";

export function BtnWhatsapp() {
   const phoneNumber = '+554191459026'; 
  const handleClickTalkWithUs = () => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá!%20Acessei%20o%20%20site%20da%20Vanglorian%20e%20gostaria%20de%20mais%20informações.`;
    window.open(whatsappLink, '_blank'); 
  }
  return(
    <div className={styles.buttonWhatsappContainer}>
      <Image 
        src={"/assets/whatsappButton.png"} 
        onClick={handleClickTalkWithUs} 
        className={styles.whatsappIconFixed}
        width={417}
        height={417}
        alt={"Botão do WhatsApp azul e branco"}
        priority={true}
        />
    </div>
  )
};