'use client';

import projects from '../data/projects';
import ProjectGallery from './ProjectGallery';

interface ProjectGalleryByIdProps {
  projectId: string;
}

export default function ProjectGalleryById({
  projectId,
}: ProjectGalleryByIdProps) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;

  return (
    <ProjectGallery
      project={{
        name: project.name,
        images: project.images,
      }}
    />
  );
}
