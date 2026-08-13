'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import useStyle from '../hooks/useStyle';
import type { PageStyle } from '../types/ui';

// Add new page styles here — each needs a matching [data-style='<id>']
// stylesheet (see app/styles/graffiti.css) and a swatch class in globals.css.
const STYLES = [
  { id: 'default', label: 'Default', desc: 'Clean & modern' },
  { id: 'graffiti', label: 'Graffiti', desc: 'Street art vibes' },
  { id: 'oldschool', label: 'Old School', desc: "'90s web vibes" },
  { id: 'pixels', label: 'Pixels', desc: '8-bit retro' },
  { id: 'luxe', label: 'Luxe', desc: 'Minimalist luxury' },
  { id: 'hacker', label: 'Hacker', desc: 'Code & terminal' },
] satisfies readonly { id: PageStyle; label: string; desc: string }[];

// Small floating button (bottom-right) that opens a page-style picker.
// The chosen style is applied as <html data-style> and saved to localStorage.
export default function StyleSwitcher() {
  const { style, setStyle } = useStyle();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const fabAmbientMotion = shouldReduceMotion
    ? {}
    : { animate: { y: [0, -4, 0] } };

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="style-switch" ref={rootRef}>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            className="style-switch__menu"
            role="menu"
            aria-label="Page style"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="style-switch__label">Page style</p>
            {STYLES.map((s) => (
              <m.button
                key={s.id}
                type="button"
                role="menuitemradio"
                aria-checked={style === s.id}
                className={`style-switch__option ${style === s.id ? 'is-active' : ''}`}
                onClick={() => {
                  setStyle(s.id);
                  setOpen(false);
                }}
                whileHover={shouldReduceMotion ? {} : { x: 3 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 440, damping: 30 }}
              >
                <span
                  className={`style-switch__swatch style-switch__swatch--${s.id}`}
                  aria-hidden="true"
                />
                <span className="style-switch__text">
                  <strong>{s.label}</strong>
                  <small>{s.desc}</small>
                </span>
                {style === s.id && (
                  <span className="style-switch__check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </m.button>
            ))}
          </m.div>
        )}
      </AnimatePresence>

      <m.button
        type="button"
        className="style-switch__fab"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change page style"
        title="Page style"
        onClick={() => setOpen((o) => !o)}
        {...fabAmbientMotion}
        whileHover={
          shouldReduceMotion ? {} : { y: -3, rotate: -10, scale: 1.04 }
        }
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                y: { duration: 2.8, ease: 'easeInOut', repeat: Infinity },
                rotate: { type: 'spring', stiffness: 430, damping: 27 },
                scale: { type: 'spring', stiffness: 430, damping: 27 },
              }
        }
      >
        <span aria-hidden="true">🎨</span>
      </m.button>
    </div>
  );
}
