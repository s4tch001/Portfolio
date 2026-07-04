import useReveal from '../hooks/useReveal.js';
import projects from '../data/projects.js';

function DeployBadge({ name }) {
  return <span className="project__deploy">▲ {name}</span>;
}

export default function Projects() {
  const ref = useReveal();

  return (
    <section id="projects" className="section section--alt" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">02 · Projects</p>
        <h2 className="section__title reveal">
          Things I&apos;ve <span className="grad-text">shipped.</span>
        </h2>
        <p className="section__lead reveal">
          Four production apps, three cloud platforms, zero templates — designed,
          coded, and deployed end to end.
        </p>

        <div className="projects">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`project project--${project.accent} ${i % 2 ? 'project--flip' : ''}`}
            >
              <div className="project__media reveal">
                <div className="browser">
                  <div className="browser__bar">
                    <span className="dot dot--r" />
                    <span className="dot dot--y" />
                    <span className="dot dot--g" />
                    <span className="browser__url">{project.url}</span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    width="1600"
                    height="1000"
                  />
                </div>
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
    </section>
  );
}
