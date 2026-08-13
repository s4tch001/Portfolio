import type { ReactNode } from 'react';

export type HeadingLevel = 'h1' | 'h2';

export interface SectionHeadingProps {
  heading?: ReactNode;
  headingLevel?: HeadingLevel;
  eyebrow?: string;
}

export type Theme = 'dark' | 'light';

export const PAGE_STYLES = [
  'default',
  'graffiti',
  'oldschool',
  'pixels',
  'luxe',
  'hacker',
] as const;

export type PageStyle = (typeof PAGE_STYLES)[number];

export function isPageStyle(value: string): value is PageStyle {
  return PAGE_STYLES.some((style) => style === value);
}
