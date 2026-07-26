'use client';

import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import useSlideshow from '../hooks/useSlideshow.js';
import projects from '../data/projects.js';
import Lightbox from './Lightbox.jsx';

function DeployBadge({ name }) {
  return <span className="project__deploy">▲ {name}</span>;
}

// Browser-framed slideshow: auto-advances, loops, and pauses 30s on any
// manual interaction. Click the image (or zoom) to open the lightbox.
function Gallery({ project, onOpen }) {
  const images = project.images;
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Hold autoplay until the card has scrolled into view, then let it pause
  // again whenever it leaves — the slideshow "starts" on first sight.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { index, setIndex, next, prev, pause } = useSlideshow(images.length, {
    enabled: inView,
    interval: 3000,
  });

  // Decode-gate: the visible slide only swaps once the incoming image is fully
  // decoded, so the slide/blur animation never plays over a blank or
  // half-loaded picture (which used to read as a plain fade). `dir: 0` marks
  // the initial slide — it renders without any animation.
  const [shown, setShown] = useState({ i: 0, dir: 0 });
  useEffect(() => {
    if (index === shown.i) return undefined;
    let done = false;
    let timer;
    const commit = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      setShown((s) => {
        const steppedBack =
          (s.i - 1 + images.length) % images.length === index;
        return { i: index, dir: steppedBack ? -1 : 1 };
      });
    };
    const im = new Image();
    im.onload = commit;
    im.onerror = commit;
    im.src = images[index].src;
    if (im.complete) commit(); // already cached — swap immediately
    // Safety net: a slow or stalled load must never freeze the slideshow.
    timer = setTimeout(commit, 1500);
    return () => {
      done = true;
      clearTimeout(timer);
    };
  }, [index, images, shown.i]);

  // Warm the next slide's cache ahead of the autoplay tick so each 3s advance
  // is already decoded by the time it commits.
  useEffect(() => {
    if (!inView || images.length < 2) return;
    const im = new Image();
    im.src = images[(shown.i + 1) % images.length].src;
  }, [inView, shown.i, images]);

  const current = images[shown.i];

  const withPause = (fn) => () => {
    pause();
    fn();
  };

  return (
    <div className="browser" ref={rootRef}>
      <div className="browser__bar">
        <span className="dot dot--r" />
        <span className="dot dot--y" />
        <span className="dot dot--g" />
        {current.pov && <span className="browser__pov">{current.pov}</span>}
        <span className="browser__count">{shown.i + 1}/{images.length}</span>
      </div>

      <div className="gallery">
        <button
          type="button"
          className="gallery__view"
          aria-label={`Open ${project.name} screenshots in fullscreen`}
          onClick={() => { pause(); onOpen(project, shown.i); }}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading="lazy"
            width="1600"
            height="1000"
            className={shown.dir !== 0 ? 'gallery__animate' : undefined}
            style={{ '--slide-from': `${(shown.dir || 1) * 30}px` }}
          />
          {shown.dir !== 0 && (
            <img
              key={`smear-${current.src}`}
              src={current.src}
              alt=""
              aria-hidden="true"
              className="gallery__smear"
              style={{ '--slide-from': `${shown.dir * 30}px` }}
            />
          )}
          <span className="gallery__caption">{current.caption}</span>
          <span className="gallery__zoom" aria-hidden="true">
            <i className="fa-solid fa-expand" aria-hidden="true" />
          </span>
        </button>

        {images.length > 1 && (
          <>
            <button type="button" className="gallery__arrow gallery__arrow--prev" aria-label="Previous screenshot" onClick={withPause(prev)}>
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            <button type="button" className="gallery__arrow gallery__arrow--next" aria-label="Next screenshot" onClick={withPause(next)}>
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
            <div className="gallery__dots">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className={i === index ? 'active' : ''}
                  aria-label={`Go to screenshot ${i + 1}`}
                  onClick={withPause(() => setIndex(i))}
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
    <section id="portfolio" className="section section--alt" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">03 · Portfolio</p>
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
                <p className="project__solo reveal">Solo developer: designed, built, and shipped by me.</p>
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
                {project.demo && (
                  <div className="project__demo reveal">
                    <div>
                      <span className="project__demo-kicker">Portfolio demo preview</span>
                      <p>{project.demo.note}</p>
                      <div className="project__demo-stack">
                        {project.demo.deploy.map((platform) => (
                          <DeployBadge key={`demo-${platform}`} name={platform} />
                        ))}
                      </div>
                    </div>
                    <a
                      className="btn btn--small btn--primary"
                      href={project.demo.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Open demo preview</span>
                      <span className="project__demo-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                          <path d="M7 17 17 7" />
                          <path d="M9 7h8v8" />
                        </svg>
                      </span>
                    </a>
                  </div>
                )}
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
