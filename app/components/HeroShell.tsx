'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';

interface HeroShellProps {
  children: ReactNode;
}

interface PointerPosition {
  x: number;
  y: number;
}

export default function HeroShell({ children }: HeroShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<PointerPosition | null>(null);
  const finePointerRef = useRef(false);

  const cacheBounds = useCallback(() => {
    const el = sectionRef.current;
    if (el) boundsRef.current = el.getBoundingClientRect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    finePointerRef.current = finePointer.matches;
    if (!el || !finePointer.matches) return undefined;

    cacheBounds();
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(cacheBounds);
    resizeObserver?.observe(el);
    window.addEventListener('resize', cacheBounds, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', cacheBounds);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [cacheBounds]);

  const onPointerEnter = useCallback(() => {
    if (finePointerRef.current) cacheBounds();
  }, [cacheBounds]);

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (!finePointerRef.current) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const el = sectionRef.current;
      const rect = boundsRef.current;
      const pointer = pointerRef.current;
      if (!el || !rect || !pointer) return;
      el.style.setProperty('--mx', `${pointer.x - rect.left}px`);
      el.style.setProperty('--my', `${pointer.y - rect.top}px`);
    });
  }, []);

  return (
    <section
      id='home'
      className='hero'
      ref={sectionRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
    >
      {children}
    </section>
  );
}
