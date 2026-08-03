'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import useSlideshow from '../hooks/useSlideshow';
import type { ProjectGalleryData, ProjectImage } from '../types/project';

const Lightbox = dynamic(() => import('./Lightbox'));
const GALLERY_SIZES = '(max-width: 1024px) calc(100vw - 3rem), 628px';
const IMAGE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_QUALITY = 82;
const MAX_IMAGE_WIDTH = 3840;

type SlideStyle = CSSProperties & { '--slide-from': string };

interface OptimizedSource {
  src: string;
  srcSet: string;
  sizes: string;
}

function optimizedSource(src: string): OptimizedSource {
  const url = (width: number): string =>
    `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${IMAGE_QUALITY}`;

  return {
    src: url(MAX_IMAGE_WIDTH),
    srcSet: IMAGE_WIDTHS.map((width) => `${url(width)} ${width}w`).join(', '),
    sizes: GALLERY_SIZES,
  };
}

function getImage(images: ProjectGalleryData['images'], index: number): ProjectImage {
  return images[index] ?? images[0];
}

interface GalleryProps {
  project: ProjectGalleryData;
  onOpen: (index: number) => void;
}

// Browser-framed slideshow: auto-advances, loops, and pauses after any manual
// interaction. Incoming slides are decoded before the visible image swaps.
function Gallery({ project, onOpen }: GalleryProps) {
  const images = project.images;
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { index, setIndex, next, prev, pause } = useSlideshow(images.length, {
    enabled: inView,
    interval: 3000,
  });

  const [shown, setShown] = useState({ i: 0, dir: 0 });
  useEffect(() => {
    if (index === shown.i) return undefined;
    let done = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const commit = (): void => {
      if (done) return;
      done = true;
      if (timer !== undefined) clearTimeout(timer);
      setShown((current) => {
        const steppedBack =
          (current.i - 1 + images.length) % images.length === index;
        return { i: index, dir: steppedBack ? -1 : 1 };
      });
    };

    const props = optimizedSource(getImage(images, index).src);
    const image = new window.Image();
    image.onload = commit;
    image.onerror = commit;
    image.decoding = 'async';
    image.sizes = props.sizes;
    image.srcset = props.srcSet;
    image.src = props.src;
    if (image.complete) commit();
    timer = setTimeout(commit, 1500);

    return () => {
      done = true;
      if (timer !== undefined) clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
    };
  }, [index, images, shown.i]);

  // Warm the next optimized slide only while this gallery is visible.
  useEffect(() => {
    if (!inView || images.length < 2) return undefined;
    const props = optimizedSource(getImage(images, (shown.i + 1) % images.length).src);
    const image = new window.Image();
    image.decoding = 'async';
    image.sizes = props.sizes;
    image.srcset = props.srcSet;
    image.src = props.src;
    return undefined;
  }, [inView, shown.i, images]);

  const current = getImage(images, shown.i);
  const withPause = (fn: () => void): (() => void) => () => {
    pause();
    fn();
  };

  return (
    <div className="browser" ref={rootRef}>
      <div className="browser__bar">
        <span className="dot dot--r" />
        <span className="dot dot--y" />
        <span className="dot dot--g" />
        {current.pov && <span className="browser__pov">{current.pov}</span>}
        <span className="gallery__caption" title={current.caption}>
          {current.caption}
        </span>
        <span className="browser__count">{shown.i + 1}/{images.length}</span>
      </div>

      <div className="gallery">
        <button
          type="button"
          className="gallery__view"
          aria-label={`Open ${project.name} screenshots in fullscreen`}
          onClick={() => {
            pause();
            onOpen(shown.i);
          }}
        >
          <Image
            key={current.src}
            src={current.src}
            sizes={GALLERY_SIZES}
            alt={current.alt}
            loading="lazy"
            width={1600}
            height={1000}
            quality={IMAGE_QUALITY}
            className={shown.dir !== 0 ? 'gallery__animate' : undefined}
            style={{ '--slide-from': `${(shown.dir || 1) * 30}px` } as SlideStyle}
          />
          {shown.dir !== 0 && (
            <Image
              key={`smear-${current.src}`}
              src={current.src}
              sizes={GALLERY_SIZES}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={1600}
              height={1000}
              quality={IMAGE_QUALITY}
              className="gallery__smear"
              style={{ '--slide-from': `${shown.dir * 30}px` } as SlideStyle}
            />
          )}
          <span className="gallery__zoom" aria-hidden="true">
            ↗
          </span>
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery__arrow gallery__arrow--prev"
              aria-label="Previous screenshot"
              onClick={withPause(prev)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="m14.5 5-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="gallery__arrow gallery__arrow--next"
              aria-label="Next screenshot"
              onClick={withPause(next)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="m9.5 5 7 7-7 7" />
              </svg>
            </button>
            <div className="gallery__dots">
              {images.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  className={imageIndex === index ? 'active' : ''}
                  aria-label={`Go to screenshot ${imageIndex + 1}`}
                  onClick={withPause(() => setIndex(imageIndex))}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface ProjectGalleryProps {
  project: ProjectGalleryData;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      <Gallery project={project} onOpen={setViewerIndex} />
      {viewerIndex !== null && (
        <Lightbox
          project={project}
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
