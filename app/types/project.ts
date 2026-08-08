export type ProjectAccent = 'amber' | 'blue' | 'green' | 'violet';

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  pov?: string;
}

export interface ProjectDemo {
  url: string;
  deploy: readonly string[];
  note: string;
  github?: string;
}

export interface ProjectSource {
  url: string;
  label: string;
}

export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  url: string;
  description: string;
  features: readonly string[];
  stack: readonly string[];
  deploy: readonly string[];
  sources: readonly [ProjectSource, ...ProjectSource[]];
  images: readonly [ProjectImage, ...ProjectImage[]];
  accent: ProjectAccent;
  live?: string;
  demo?: ProjectDemo;
}

export type ProjectGalleryData = Pick<Project, 'name' | 'images'>;
