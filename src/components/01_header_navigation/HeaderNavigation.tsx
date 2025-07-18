'use client'

import { Menu } from "lucide-react";
import styles from "./HeaderNavigation.module.css";
import Link from "next/link";
import Image from "next/image";

export function HeaderNavigation() {
  return(
    <header className={styles.wrapperHeaderNav} aria-label="Cabeçalho principal do site">
      <div className={styles.containerHeaderNav}>
        <div className={styles.menuSandwichBlock}>
          <button  className={styles.menuSandwichBtn}>
            <Menu color="#002100"/>
            <span>Menu</span>
          </button>
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
            <li><Link href="#execBlock" className={styles.menuItem}>Em execução</Link></li>
            <li><Link href="#lancamentBlock" className={styles.menuItem}>Lançamentos</Link></li>
            <li><Link href=" " className={styles.menuItem}>Fale conosco</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}