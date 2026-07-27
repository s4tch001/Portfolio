'use client';

import { useEffect } from 'react';

export default function RevealController() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal:not(.in)'));

    if (nodes.length === 0) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
