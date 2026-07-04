import { useCallback, useEffect, useRef, useState } from 'react';

// Fullscreen photo viewer: arrows + keyboard + swipe, dots, caption.
export default function Lightbox({ project, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const touchX = useRef(null);
  const images = project.images;

  const move = useCallback(
    (dir) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [move, onClose]);

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
        if (Math.abs(dx) > 48) move(dx < 0 ? 1 : -1);
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
        onClick={(e) => { e.stopPropagation(); move(-1); }}
      >
        ‹
      </button>

      <figure className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.alt} />
        <figcaption>
          <strong>{project.name}</strong>
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
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </figure>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--next"
        aria-label="Next screenshot"
        onClick={(e) => { e.stopPropagation(); move(1); }}
      >
        ›
      </button>
    </div>
  );
}
