import { useEffect, useRef } from 'react';
import useSlideshow from '../hooks/useSlideshow.js';

// Fullscreen photo viewer: auto-advances, loops, and pauses 30s on manual
// navigation. Arrows + keyboard + swipe, dots, caption, and POV badge.
export default function Lightbox({ project, startIndex, onClose }) {
  const images = project.images;
  const { index, setIndex, next, prev, pause } = useSlideshow(images.length, {
    startIndex,
  });
  const touchX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') { pause(); next(); }
      else if (e.key === 'ArrowLeft') { pause(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [next, prev, pause, onClose]);

  const current = images[index];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} screenshots`}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) { pause(); if (dx < 0) next(); else prev(); }
        touchX.current = null;
      }}
    >
      <button type="button" className="lightbox__close" aria-label="Close viewer" onClick={onClose}>
        ✕
      </button>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--prev"
        aria-label="Previous screenshot"
        onClick={(e) => { e.stopPropagation(); pause(); prev(); }}
      >
        ‹
      </button>

      <figure className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.alt} width="1600" height="1000" />
        <figcaption>
          <strong>{project.name}</strong>
          {current.pov && <span className="lightbox__pov">{current.pov}</span>}
          <span>{current.caption}</span>
          <span className="lightbox__counter">{index + 1} / {images.length}</span>
        </figcaption>
        <div className="lightbox__dots">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={i === index ? 'active' : ''}
              aria-label={`Go to screenshot ${i + 1}`}
              onClick={() => { pause(); setIndex(i); }}
            />
          ))}
        </div>
      </figure>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--next"
        aria-label="Next screenshot"
        onClick={(e) => { e.stopPropagation(); pause(); next(); }}
      >
        ›
      </button>
    </div>
  );
}
