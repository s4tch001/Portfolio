import Image from 'next/image';
import type { ProjectGalleryData } from '../types/project';

const GALLERY_SIZES = '(max-width: 1024px) calc(100vw - 3rem), 628px';
const IMAGE_QUALITY = 82;

interface ProjectGalleryStaticProps {
  project: ProjectGalleryData;
}

// Accessible, no-JS first frame. The interactive slideshow replaces this
// shortly before the gallery reaches the viewport, with identical dimensions.
export default function ProjectGalleryStatic({
  project,
}: ProjectGalleryStaticProps) {
  const current = project.images[0];
  if (!current) return null;

  return (
    <div className='browser'>
      <div className='browser__bar'>
        <span className='dot dot--r' />
        <span className='dot dot--y' />
        <span className='dot dot--g' />
        {current.pov && <span className='browser__pov'>{current.pov}</span>}
        <span className='gallery__caption' title={current.caption}>
          {current.caption}
        </span>
        <span className='browser__count'>1/{project.images.length}</span>
      </div>

      <div className='gallery'>
        <div className='gallery__view'>
          <Image
            src={current.src}
            sizes={GALLERY_SIZES}
            alt={current.alt}
            loading='lazy'
            width={1600}
            height={1000}
            quality={IMAGE_QUALITY}
          />
        </div>
      </div>
    </div>
  );
}
