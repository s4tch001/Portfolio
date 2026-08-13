'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const ProjectGalleryById = dynamic(() => import('./ProjectGalleryById'), {
  ssr: false,
});

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

    if (typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: '1400px 0px', threshold: 0 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div className='deferred-gallery' ref={rootRef}>
      {ready ? <ProjectGalleryById projectId={projectId} /> : children}
    </div>
  );
}
