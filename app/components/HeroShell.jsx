'use client';

import { useCallback, useRef } from 'react';

export default function HeroShell({ children }) {
  const sectionRef = useRef(null);

  const onMouseMove = useCallback((event) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <section
      id='home'
      className='hero'
      ref={sectionRef}
      onMouseMove={onMouseMove}
    >
      {children}
    </section>
  );
}
