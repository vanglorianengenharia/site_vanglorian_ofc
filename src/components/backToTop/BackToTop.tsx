"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import styles from "./BackToTop.module.css";

const SHOW_SCROLL_POSITION = 800;
const HIDE_SCROLL_POSITION = 700;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateVisibility = () => {
      setIsVisible((currentlyVisible) =>
        currentlyVisible
          ? window.scrollY > HIDE_SCROLL_POSITION
          : window.scrollY > SHOW_SCROLL_POSITION,
      );
      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateVisibility);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={handleClick}
      aria-label="Voltar ao topo"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp aria-hidden="true" strokeWidth={1.8} />
    </button>
  );
}
