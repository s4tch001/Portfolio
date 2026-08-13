'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const ProjectGalleryById = dynamic(() => import('./ProjectGalleryById'), {
  ssr: false,
});

type ActivateGallery = () => void;

const galleryTargets = new Map<Element, ActivateGallery>();
let galleryObserver: IntersectionObserver | null = null;

function observeGallery(root: Element, activate: ActivateGallery): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    activate();
    return () => undefined;
  }

  if (!galleryObserver) {
    galleryObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const activateTarget = galleryTargets.get(entry.target);
          if (!activateTarget) continue;

          galleryTargets.delete(entry.target);
          galleryObserver?.unobserve(entry.target);
          activateTarget();
        }
      },
      { rootMargin: '1400px 0px', threshold: 0 },
    );
  }

  galleryTargets.set(root, activate);
  galleryObserver.observe(root);

  return () => {
    galleryObserver?.unobserve(root);
    galleryTargets.delete(root);

    if (galleryTargets.size === 0) {
      galleryObserver?.disconnect();
      galleryObserver = null;
    }
  };
}

interface DeferredProjectGalleryProps {
  children: ReactNode;
  projectId: string;
}

export default function DeferredProjectGallery({
  children,
  projectId,
}: DeferredProjectGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || ready) return undefined;

    return observeGallery(root, () => setReady(true));
  }, [ready]);

  return (
    <div className='deferred-gallery' ref={rootRef}>
      {ready ? <ProjectGalleryById projectId={projectId} /> : children}
    </div>
  );
}
