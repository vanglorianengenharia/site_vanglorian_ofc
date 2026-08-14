'use client'

import { Menu } from "lucide-react";
import styles from "./HeaderNavigation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useHomeSectionNavigation } from "@/hooks/useHomeSectionNavigation";

export function HeaderNavigation() {
  const[menuOpen, setMenuOpen] = useState(false)
  const navigateToHomeSection = useHomeSectionNavigation();
  const phoneNumber = '+554191459026'; 
  const handleClickTalkWithUs = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá!%20Acessei%20o%20%20site%20da%20Vanglorian%20e%20gostaria%20de%20mais%20informações.`;
    window.open(whatsappLink, '_blank'); 
  }
  
  return(
    <header className={styles.wrapperHeaderNav} aria-label="Cabeçalho principal do site">
      <div className={styles.containerHeaderNav}>
        <div
          className={styles.menuSandwichBlock}
          onMouseEnter={() => !menuOpen && setMenuOpen(true)}
          onMouseLeave={() => menuOpen && setMenuOpen(false)}
          onClick={() => {setMenuOpen(!menuOpen)}}
        >
          <button className={styles.menuSandwichBtn}>
            <Menu color="#002100" size={19} />
            <span className={styles.menuSandwichText}>Menu</span>
          </button>
          {menuOpen && (
            <div>
              <ul className={styles.modalMenuOpen}>
                <li className={`${styles.modalMenuItem} ${styles.modalMenuItem1}`}>
                  <Link href="/">Página Inicial</Link>
                </li>
                <li className={`${styles.modalMenuItem} ${styles.modalMenuItem2}`}>
                  <Link href="/#empreendimentos" onClick={(event) => navigateToHomeSection('empreendimentos', event)}>Empreendimentos</Link>
                </li>

                <li className={`${styles.modalMenuItem} ${styles.modalMenuItem3}`}>
                  <Link href="/#lancamentos" onClick={(event) => navigateToHomeSection('lancamentos', event)}>Lançamentos</Link>
                </li>
                <li className={`${styles.modalMenuItem} ${styles.modalMenuItem4}`}>
                  <button onClick={handleClickTalkWithUs}>Fale conosco</button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className={styles.logoIconBlock}> 
         <Link href={"/"}>
            <Image
              src={"/assets/logo_icon.webp"}
              width={500}
              height={386}
              alt="Logo da Vanglorian"
              loading="eager"
              className={styles.logoIcon}
            />
          </Link>
        </div> 
        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.menu}>
            <li><Link href="/#empreendimentos" className={`${styles.menuItem} ${styles.menuItem1}`} onClick={(event) => navigateToHomeSection('empreendimentos', event)}>Empreendimentos</Link></li>
            <li><Link href="/#lancamentos" className={`${styles.menuItem} ${styles.menuItem2}`} onClick={(event) => navigateToHomeSection('lancamentos', event)}>Lançamentos</Link></li>
            <li><button className={`${styles.menuItem} ${styles.menuItem3}`} onClick={handleClickTalkWithUs}>Fale conosco</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
