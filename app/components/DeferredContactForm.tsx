'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
});

interface DeferredContactFormProps {
  eagerTurnstile?: boolean;
}

export default function DeferredContactForm({
  eagerTurnstile = false,
}: DeferredContactFormProps) {
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
      // Start the download well before a normal scroll reaches the form.
      { rootMargin: '1200px 0px', threshold: 0 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div
      ref={rootRef}
      className={`contact-form-loader${ready ? ' contact-form-loader--ready' : ''}`}
      aria-busy={!ready}
    >
      {ready ? <ContactForm eagerTurnstile={eagerTurnstile} /> : null}
    </div>
  );
}
