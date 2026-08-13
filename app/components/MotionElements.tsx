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
  social: { scale: 1.1 },
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

interface MotionBadgeProps extends HTMLMotionProps<'span'> {
  children: ReactNode;
  kind: 'deploy' | 'solo';
}

export function MotionBadge({ children, kind, ...props }: MotionBadgeProps) {
  const shouldReduceMotion = useReducedMotion();
  const hoverTarget =
    kind === 'deploy'
      ? { y: -3, scale: 1.045 }
      : { x: 4, scale: 1.012 };

  return (
    <m.span
      {...props}
      whileHover={shouldReduceMotion ? {} : hoverTarget}
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

  return (
    <m.div
      className='hero__visual'
      aria-hidden='true'
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
    >
      <m.span
        className='hero__visual-aura'
        animate={
          shouldReduceMotion
            ? { opacity: 0.45 }
            : {
                x: [0, 18, -10, 0],
                y: [0, -12, 8, 0],
                scale: [1, 1.1, 0.96, 1],
                opacity: [0.4, 0.62, 0.46, 0.4],
              }
        }
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      <m.div
        className='hero__visual-stage'
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, rotate: 0 }
            : {
                x: [0, 5, -3, 0],
                y: [0, -10, 2, 0],
                rotate: [0, -0.7, 0.4, 0],
              }
        }
        whileHover={
          shouldReduceMotion
            ? {}
            : { y: -6, scale: 1.022, rotate: 0, transition: HOVER_TRANSITION }
        }
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

interface HeroVisualCardProps {
  children: ReactNode;
}

export function HeroVisualCard({ children }: HeroVisualCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className='hero__card'
      animate={
        shouldReduceMotion
          ? { rotateX: 0, rotateY: 0 }
          : {
              rotateX: [0, -1.4, 0.8, 0],
              rotateY: [0, 1.8, -1.1, 0],
            }
      }
      transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </m.div>
  );
}

interface HeroVisualChipProps extends HTMLMotionProps<'span'> {
  children: ReactNode;
  index: 0 | 1 | 2;
}

interface HeroChipMotion {
  x: number[];
  y: number[];
  rotate: number[];
  duration: number;
}

const HERO_CHIP_MOTION: readonly [
  HeroChipMotion,
  HeroChipMotion,
  HeroChipMotion,
] = [
  { x: [0, 5, -2, 0], y: [0, -8, 3, 0], rotate: [0, -2, 1, 0], duration: 6.2 },
  { x: [0, -5, 2, 0], y: [0, 6, -3, 0], rotate: [0, 1.5, -0.8, 0], duration: 7 },
  { x: [0, -3, 4, 0], y: [0, -6, 4, 0], rotate: [0, 1, -1.2, 0], duration: 7.6 },
];

export function HeroVisualChip({
  children,
  index,
  ...props
}: HeroVisualChipProps) {
  const shouldReduceMotion = useReducedMotion();
  const motion = HERO_CHIP_MOTION[index];

  return (
    <m.span
      {...props}
      animate={
        shouldReduceMotion
          ? { x: 0, y: 0, rotate: 0 }
          : { x: motion.x, y: motion.y, rotate: motion.rotate }
      }
      transition={{ duration: motion.duration, ease: 'easeInOut', repeat: Infinity }}
    >
      {children}
    </m.span>
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
