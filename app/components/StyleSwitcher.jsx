'use client';

import { useEffect, useRef, useState } from 'react';
import useStyle from '../hooks/useStyle.js';

// Add new page styles here — each needs a matching [data-style='<id>']
// stylesheet (see app/styles/graffiti.css) and a swatch class in globals.css.
const STYLES = [
  { id: 'default', label: 'Default', desc: 'Clean & modern' },
  { id: 'graffiti', label: 'Graffiti', desc: 'Street art vibes' },
  { id: 'oldschool', label: 'Old School', desc: "90's web vibes" },
];

// Small floating button (bottom-right) that opens a page-style picker.
// The chosen style is applied as <html data-style> and saved to localStorage.
export default function StyleSwitcher() {
  const { style, setStyle } = useStyle();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
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
      {open && (
        <div className="style-switch__menu" role="menu" aria-label="Page style">
          <p className="style-switch__label">Page style</p>
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="menuitemradio"
              aria-checked={style === s.id}
              className={`style-switch__option ${style === s.id ? 'is-active' : ''}`}
              onClick={() => {
                setStyle(s.id);
                setOpen(false);
              }}
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
                <span className="style-switch__check" aria-hidden="true">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="style-switch__fab"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change page style"
        title="Page style"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">🎨</span>
      </button>
    </div>
  );
}
