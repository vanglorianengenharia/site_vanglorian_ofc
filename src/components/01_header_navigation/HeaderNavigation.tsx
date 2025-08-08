'use client'

import { Menu } from "lucide-react";
import styles from "./HeaderNavigation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function HeaderNavigation() {
  const[menuOpen, setMenuOpen] = useState(false)
  const phoneNumber = '+554191459026'; 
  const handleClickTalkWithUs = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20empreendimentos.`;
    window.open(whatsappLink, '_blank'); 
  }

  return(
    <header className={styles.wrapperHeaderNav} aria-label="Cabeçalho principal do site">
      <div className={styles.containerHeaderNav}>
        <div
          className={styles.menuSandwichBlock}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
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
                  <Link href="#execBlock">Em execução</Link>
                </li>
                <li className={`${styles.modalMenuItem} ${styles.modalMenuItem3}`}>
                  <Link href="#lancamentBlock">Lançamentos</Link>
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
              className={styles.logoIcon}
            />
          </Link>
        </div> 
        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.menu}>
            <li><Link href="#execBlock" className={`${styles.menuItem} ${styles.menuItem1}`}>Em execução</Link></li>
            <li><Link href="#lancamentBlock" className={`${styles.menuItem} ${styles.menuItem2}`}>Lançamentos</Link></li>
            <li><button className={`${styles.menuItem} ${styles.menuItem3}`} onClick={handleClickTalkWithUs}>Fale conosco</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}