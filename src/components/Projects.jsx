import { useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import projects from '../data/projects.js';
import Lightbox from './Lightbox.jsx';

function DeployBadge({ name }) {
  return <span className="project__deploy">▲ {name}</span>;
}

// Browser-framed slideshow: arrows + dots, click to open the lightbox.
function Gallery({ project, onOpen }) {
  const [index, setIndex] = useState(0);
  const images = project.images;
  const move = (dir) => setIndex((i) => (i + dir + images.length) % images.length);
  const current = images[index];

  return (
    <div className="browser">
      <div className="browser__bar">
        <span className="dot dot--r" />
        <span className="dot dot--y" />
        <span className="dot dot--g" />
        <span className="browser__url">{project.url}</span>
        <span className="browser__count">{index + 1}/{images.length}</span>
      </div>

      <div className="gallery">
        <button
          type="button"
          className="gallery__view"
          aria-label={`Open ${project.name} screenshots in fullscreen`}
          onClick={() => onOpen(project, index)}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading="lazy"
            width="1600"
            height="1000"
          />
          <span className="gallery__caption">{current.caption}</span>
          <span className="gallery__zoom" aria-hidden="true">⤢</span>
        </button>

        {images.length > 1 && (
          <>
            <button type="button" className="gallery__arrow gallery__arrow--prev" aria-label="Previous screenshot" onClick={() => move(-1)}>
              ‹
            </button>
            <button type="button" className="gallery__arrow gallery__arrow--next" aria-label="Next screenshot" onClick={() => move(1)}>
              ›
            </button>
            <div className="gallery__dots">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className={i === index ? 'active' : ''}
                  aria-label={`Go to screenshot ${i + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();
  const [viewer, setViewer] = useState(null); // { project, index }

  return (
    <section id="projects" className="section section--alt" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">02 · Projects</p>
        <h2 className="section__title reveal">
          Things I&apos;ve <span className="grad-text">shipped.</span>
        </h2>
        <p className="section__lead reveal">
          Four production apps, three cloud platforms, zero templates — designed,
          coded, and deployed end to end. Browse the galleries (screenshots use
          demo data).
        </p>

        <div className="projects">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`project project--${project.accent} ${i % 2 ? 'project--flip' : ''}`}
            >
              <div className="project__media reveal">
                <Gallery
                  project={project}
                  onOpen={(p, idx) => setViewer({ project: p, index: idx })}
                />
              </div>

              <div className="project__info">
                <p className="project__num reveal">{project.num}</p>
                <h3 className="project__name reveal">{project.name}</h3>
                <p className="project__tagline reveal">{project.tagline}</p>
                <p className="project__desc reveal">{project.description}</p>
                <ul className="project__features reveal">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="project__stack reveal">
                  {project.stack.map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
                </div>
                <div className="project__meta reveal">
                  <span className="project__live">
                    <span className="project__pulse" aria-hidden="true" /> Live in production
                  </span>
                  {project.deploy.map((platform) => (
                    <DeployBadge key={platform} name={platform} />
                  ))}
                  {project.live && (
                    <a
                      className="btn btn--small btn--ghost"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit site ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {viewer && (
        <Lightbox
          project={viewer.project}
          startIndex={viewer.index}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
