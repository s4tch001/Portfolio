'use client';

import type { ReactNode } from 'react';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';

interface MotionProviderProps {
  children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion='user'>{children}</MotionConfig>
    </LazyMotion>
  );
}
