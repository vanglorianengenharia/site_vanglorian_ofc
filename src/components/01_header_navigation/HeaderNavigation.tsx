'use client'

import { ArrowRight, Menu } from "lucide-react";
import styles from "./HeaderNavigation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useHomeSectionNavigation } from "@/hooks/useHomeSectionNavigation";

export function HeaderNavigation() {
  const[menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname();
  const navigateToHomeSection = useHomeSectionNavigation();
  const phoneNumber = '+554191459026'; 
  const handleClickTalkWithUs = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá!%20Acessei%20o%20%20site%20da%20Vanglorian%20e%20gostaria%20de%20mais%20informações.`;
    window.open(whatsappLink, '_blank'); 
  }
  
  return(
    <header
      className={`${styles.wrapperHeaderNav} ${pathname !== '/' ? styles.internalPageHeader : ''}`}
      aria-label="Cabeçalho principal do site"
    >
      <div className={styles.containerHeaderNav}>
        <nav className={styles.leftNavigation} aria-label="Navegação institucional">
          <Link
            href="/#sobre-nos"
            className={styles.menuItem}
            onClick={(event) => navigateToHomeSection('sobre-nos', event)}
          >
            Empresa
          </Link>
          <Link
            href="/#diferenciais"
            className={styles.menuItem}
            onClick={(event) => navigateToHomeSection('diferenciais', event)}
          >
            Diferenciais
          </Link>
          <Link
            href="/#empreendimentos"
            className={styles.menuItem}
            onClick={(event) => navigateToHomeSection('empreendimentos', event)}
          >
            Empreendimentos
          </Link>
        </nav>

        <div className={styles.logoBlock}>
          <Link href="/" className={styles.logoLink} aria-label="Vanglorian — Página inicial">
            <Image
              src="/assets/logo_icon.webp"
              width={500}
              height={386}
              alt=""
              priority
              className={styles.logoIcon}
            />
            <Image
              src="/assets/logoSloganTemporaria.webp"
              width={1010}
              height={247}
              alt="Vanglorian Construtora e Incorporadora"
              priority
              unoptimized
              className={styles.logoSlogan}
            />
          </Link>
        </div>

        <nav className={styles.rightNavigation} aria-label="Navegação principal">
          <Link
            href="/#lancamentos"
            className={styles.menuItem}
            onClick={(event) => navigateToHomeSection('lancamentos', event)}
          >
            Lançamentos
          </Link>
          <button
            className={styles.consultantButton}
            onClick={handleClickTalkWithUs}
            aria-label="Falar com um consultor pelo WhatsApp"
          >
            <span className={styles.consultantButtonText}>
              <span>Falar com um</span>{' '}
              <span>consultor</span>
            </span>
            <span className={styles.consultantButtonIcon} aria-hidden="true">
              <ArrowRight size={13} strokeWidth={1.8} />
            </span>
          </button>
        </nav>

        <div
          className={styles.menuSandwichBlock}
          onMouseEnter={() => !menuOpen && setMenuOpen(true)}
          onMouseLeave={() => menuOpen && setMenuOpen(false)}
          onClick={() => {setMenuOpen(!menuOpen)}}
        >
          <button
            className={styles.menuSandwichBtn}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu color="#002d18" size={19} />
            <span className={styles.menuSandwichText}>Menu</span>
          </button>
          {menuOpen && (
            <div>
              <ul className={styles.modalMenuOpen} id="mobile-navigation">
                <li className={styles.modalMenuItem}>
                  <Link href="/">Página Inicial</Link>
                </li>
                <li className={styles.modalMenuItem}>
                  <Link href="/#sobre-nos" onClick={(event) => navigateToHomeSection('sobre-nos', event)}>Empresa</Link>
                </li>
                <li className={styles.modalMenuItem}>
                  <Link href="/#diferenciais" onClick={(event) => navigateToHomeSection('diferenciais', event)}>Diferenciais</Link>
                </li>
                <li className={styles.modalMenuItem}>
                  <Link href="/#empreendimentos" onClick={(event) => navigateToHomeSection('empreendimentos', event)}>Empreendimentos</Link>
                </li>
                <li className={styles.modalMenuItem}>
                  <Link href="/#lancamentos" onClick={(event) => navigateToHomeSection('lancamentos', event)}>Lançamentos</Link>
                </li>
                <li className={styles.modalMenuItem}>
                  <button onClick={handleClickTalkWithUs}>Falar com um consultor</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
