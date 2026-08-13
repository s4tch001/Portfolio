'use client';

import { m, useReducedMotion } from 'motion/react';

const ITEMS = [
  'React',
  'Motion',
  'Next',
  'JavaScript',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'HTML5',
  'CSS3',
  'Node',
  'Python',
  'Django',
  'Flask',
  'Lua',
  'Supabase',
  'PostgreSQL',
  'Cloudflare Workers',
  'D1',
  'R2',
  'Durable Objects',
  'Netlify',
  'Vercel',
  'Shopify',
  'UI/UX',
  'SEO',
  'Git',
];

// Non-breaking spaces remain visible around every separator in rendered HTML.
const MARQUEE_SEPARATOR = '\u00a0\u00a0\u00a0✦\u00a0\u00a0\u00a0';
const MARQUEE_TEXT = `${ITEMS.join(MARQUEE_SEPARATOR)}${MARQUEE_SEPARATOR}`;

// Two identical rows inside a track animated -50% => seamless infinite loop.
export default function Marquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="marquee" aria-hidden="true">
      <m.div
        className="marquee__track"
        animate={shouldReduceMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 36, ease: 'linear', repeat: Infinity }
        }
      >
        <div className="marquee__row">{MARQUEE_TEXT}</div>
        <div className="marquee__row">{MARQUEE_TEXT}</div>
      </m.div>
    </div>
  );
}
