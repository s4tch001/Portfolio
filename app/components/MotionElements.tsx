'use client';

import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

function revealMotion(delay: number, distance: number) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16, margin: '0px 0px -8%' },
    transition: { duration: 0.55, delay, ease: EASE },
  } as const;
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  distance = 14,
}: RevealProps) {
  return (
    <m.div className={className} {...revealMotion(delay, distance)}>
      {children}
    </m.div>
  );
}

type MotionCardProps = RevealProps;

export function MotionCard({
  children,
  className,
  delay = 0,
  distance = 14,
}: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const hoverMotion = shouldReduceMotion ? {} : { whileHover: { y: -6 } };

  return (
    <m.article
      className={className}
      {...hoverMotion}
      {...revealMotion(delay, distance)}
    >
      {children}
    </m.article>
  );
}

interface MotionFloatProps {
  as?: 'div' | 'span';
  children: ReactNode;
  className: string;
  delay?: number;
  distance?: number;
  duration?: number;
}

export function MotionFloat({
  as = 'div',
  children,
  className,
  delay = 0,
  distance = 6,
  duration = 8,
}: MotionFloatProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { y: 0 },
        whileInView: { y: [-distance, distance, -distance] },
        viewport: { amount: 0.1 },
        transition: {
          duration,
          delay,
          ease: 'easeInOut' as const,
          repeat: Infinity,
        },
      };

  if (as === 'span') {
    return (
      <m.span className={className} {...motionProps}>
        {children}
      </m.span>
    );
  }

  return (
    <m.div className={className} {...motionProps}>
      {children}
    </m.div>
  );
}

export function HeroMotionBackground() {
  const shouldReduceMotion = useReducedMotion();

  const firstOrbMotion = shouldReduceMotion
    ? {}
    : {
        whileInView: {
          x: [0, 22, -8, 0],
          y: [0, -14, 10, 0],
          scale: [1, 1.04, 0.99, 1],
        },
        viewport: { amount: 0.1 },
        transition: {
          duration: 22,
          ease: 'easeInOut' as const,
          repeat: Infinity,
        },
      };

  const secondOrbMotion = shouldReduceMotion
    ? {}
    : {
        whileInView: {
          x: [0, -16, 12, 0],
          y: [0, 12, -10, 0],
          scale: [1, 0.98, 1.03, 1],
        },
        viewport: { amount: 0.1 },
        transition: {
          duration: 26,
          ease: 'easeInOut' as const,
          repeat: Infinity,
        },
      };

  return (
    <div className='hero__motion-bg' aria-hidden='true'>
      <m.span
        className='hero__motion-orb hero__motion-orb--violet'
        {...firstOrbMotion}
      />
      <m.span
        className='hero__motion-orb hero__motion-orb--cyan'
        {...secondOrbMotion}
      />
    </div>
  );
}

export function MotionScrollWheel() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className='hero__scroll-wheel' />;
  }

  return (
    <m.span
      className='hero__scroll-wheel'
      animate={{ y: [0, 12, 0], opacity: [1, 0, 0] }}
      transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
    />
  );
}
