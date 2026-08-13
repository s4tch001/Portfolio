'use client';

import type { ReactNode } from 'react';
import type { HTMLMotionProps, TargetAndTransition } from 'motion/react';
import { m, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  hover?: 'media';
}

const HOVER_TRANSITION = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
  mass: 0.55,
} as const;

const HOVER_TARGETS = {
  button: { y: -2, scale: 1.015 },
  chip: { y: -2, scale: 1.025 },
  control: { scale: 1.06 },
  link: { x: 2 },
  logo: { scale: 1.025 },
  option: { x: 3 },
  social: { y: -4, scale: 1.04 },
} satisfies Record<string, TargetAndTransition>;

type HoverPreset = keyof typeof HOVER_TARGETS;

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
  hover,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const hoverMotion =
    !shouldReduceMotion && hover === 'media'
      ? {
          whileHover: {
            y: -7,
            scale: 1.012,
            transition: HOVER_TRANSITION,
          },
        }
      : {};

  return (
    <m.div
      className={className}
      {...revealMotion(delay, distance)}
      {...hoverMotion}
    >
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
  const hoverMotion = shouldReduceMotion
    ? {}
    : {
        whileHover: {
          y: -6,
          scale: 1.008,
          transition: HOVER_TRANSITION,
        },
      };

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

interface MotionLinkProps extends HTMLMotionProps<'a'> {
  hoverPreset?: HoverPreset;
}

export function MotionLink({
  children,
  hoverPreset = 'button',
  ...props
}: MotionLinkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.a
      {...props}
      whileHover={shouldReduceMotion ? {} : HOVER_TARGETS[hoverPreset]}
      whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
      transition={HOVER_TRANSITION}
    >
      {children}
    </m.a>
  );
}

interface MotionChipProps extends HTMLMotionProps<'span'> {
  children: ReactNode;
}

export function MotionChip({ children, ...props }: MotionChipProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.span
      {...props}
      whileHover={shouldReduceMotion ? {} : HOVER_TARGETS.chip}
      transition={HOVER_TRANSITION}
    >
      {children}
    </m.span>
  );
}

interface HeroVisualMotionProps {
  children: ReactNode;
}

export function HeroVisualMotion({ children }: HeroVisualMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const ambientMotion = shouldReduceMotion
    ? {}
    : {
        whileInView: {
          y: [0, -5, 0],
          rotate: [0, 0.35, 0],
        },
        viewport: { amount: 0.12 },
        transition: {
          duration: 10.5,
          ease: 'easeInOut' as const,
          repeat: Infinity,
        },
      };

  return (
    <m.div
      className='hero__visual'
      aria-hidden='true'
      {...ambientMotion}
      whileHover={
        shouldReduceMotion
          ? {}
          : { scale: 1.012, rotate: 0, transition: HOVER_TRANSITION }
      }
    >
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
