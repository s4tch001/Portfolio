import projects from '../data/projects.js';
import ProjectGallery from './ProjectGallery.jsx';

function DeployBadge({ name }) {
  return <span className="project__deploy">▲ {name}</span>;
}

export default function Projects({ heading, headingLevel = 'h2', eyebrow = '03 · Portfolio' }) {
  const Heading = headingLevel;
  const title = heading ?? (
    <>Things I&apos;ve <span className="grad-text">shipped.</span></>
  );

  return (
    <section id="portfolio" className="section section--alt">
      <div className="section__inner">
        <p className="section__eyebrow reveal">{eyebrow}</p>
        <Heading className="section__title reveal">{title}</Heading>
        <p className="section__lead reveal">
          Production apps, cloud platforms, zero templates — designed,
          coded, and deployed end to end. Browse the galleries (screenshots use
          demo data).
        </p>

        <div className="projects">
          {projects.map((project, i) => (
            <article
              key={project.id}
              id={project.id}
              className={`project project--${project.accent} ${i % 2 ? 'project--flip' : ''}`}
            >
              <div className="project__media reveal">
                <ProjectGallery
                  project={{
                    name: project.name,
                    images: project.images,
                  }}
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

    </section>
  );
}
