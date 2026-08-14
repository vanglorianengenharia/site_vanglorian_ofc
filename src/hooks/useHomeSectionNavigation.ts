'use client'

import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';

export function useHomeSectionNavigation() {
  const pathname = usePathname();

  return (sectionId: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
}
