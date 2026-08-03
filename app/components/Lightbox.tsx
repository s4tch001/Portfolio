import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import type { TouchEvent } from 'react';
import useSlideshow from '../hooks/useSlideshow';
import type { ProjectGalleryData } from '../types/project';

export interface LightboxProps {
  project: ProjectGalleryData;
  startIndex: number;
  onClose: () => void;
}

// Fullscreen photo viewer: auto-advances, loops, and pauses 30s on manual
// navigation. Arrows + keyboard + swipe, dots, caption, and POV badge.
function LightboxDialog({ project, startIndex, onClose }: LightboxProps) {
  const images = project.images;
  const { index, setIndex, next, prev, pause } = useSlideshow(images.length, {
    startIndex,
  });
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') { pause(); next(); }
      else if (event.key === 'ArrowLeft') { pause(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [next, prev, pause, onClose]);

  const current = images[index] ?? images[0];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} screenshots`}
      onClick={onClose}
      onTouchStart={(event: TouchEvent<HTMLDivElement>) => {
        touchX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event: TouchEvent<HTMLDivElement>) => {
        if (touchX.current === null) return;
        const endX = event.changedTouches[0]?.clientX;
        if (endX === undefined) return;
        const dx = endX - touchX.current;
        if (Math.abs(dx) > 48) { pause(); if (dx < 0) next(); else prev(); }
        touchX.current = null;
      }}
    >
      <button type="button" className="lightbox__close" aria-label="Close viewer" onClick={onClose}>
        ✕
      </button>

      <button
        type="button"
        className="gallery__arrow gallery__arrow--prev lightbox__arrow lightbox__arrow--prev"
        aria-label="Previous screenshot"
        onClick={(e) => { e.stopPropagation(); pause(); prev(); }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m14.5 5-7 7 7 7" />
        </svg>
      </button>

      <figure className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <Image
          src={current.src}
          alt={current.alt}
          width={1600}
          height={1000}
          quality={82}
          sizes="(max-width: 720px) calc(100vw - 2rem), (max-width: 1304px) 92vw, 1200px"
        />
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
        className="gallery__arrow gallery__arrow--next lightbox__arrow lightbox__arrow--next"
        aria-label="Next screenshot"
        onClick={(e) => { e.stopPropagation(); pause(); next(); }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m9.5 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function Lightbox(props: LightboxProps) {
  return createPortal(<LightboxDialog {...props} />, document.body);
}
