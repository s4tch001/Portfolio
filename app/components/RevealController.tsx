'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.in)')
        .forEach((node) => node.classList.add('in'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const observeSectionReveals = (section: Element): void => {
      section
        .querySelectorAll<HTMLElement>('.reveal:not(.in)')
        .forEach((node) => revealObserver.observe(node));
    };

    // Register only nearby sections. Observing every portfolio child during
    // hydration forces mobile browsers to style/layout a large off-screen DOM
    // and works against the sections' content-visibility optimization.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observeSectionReveals(entry.target);
          sectionObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '600px 0px', threshold: 0 },
    );

    const sections = document.querySelectorAll<HTMLElement>('.section');
    sections.forEach((section) => sectionObserver.observe(section));

    // Preserve support for a reveal element that is not owned by a section.
    document
      .querySelectorAll<HTMLElement>('.reveal:not(.section .reveal)')
      .forEach((node) => revealObserver.observe(node));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
