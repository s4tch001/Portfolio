import projects from '../data/projects';
import type { SectionHeadingProps } from '../types/ui';
import DeferredProjectGallery from './DeferredProjectGallery';
import ProjectGalleryStatic from './ProjectGalleryStatic';

interface DeployBadgeProps {
  name: string;
}

function DeployBadge({ name }: DeployBadgeProps) {
  return <span className="project__deploy">▲ {name}</span>;
}

interface GithubLinkProps {
  href: string;
  label: string;
}

function GithubLink({ href, label }: GithubLinkProps) {
  return (
    <a
      className="btn btn--small btn--ghost project__github"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} on GitHub`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .7Z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

export default function Projects({
  heading,
  headingLevel = 'h2',
  eyebrow = '03 · Portfolio',
}: SectionHeadingProps) {
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
          public or demo data).
        </p>

        <div className="projects">
          {projects.map((project, i) => (
            <article
              key={project.id}
              id={project.id}
              className={`project project--${project.accent} ${i % 2 ? 'project--flip' : ''}`}
            >
              <div className="project__media reveal">
                <DeferredProjectGallery projectId={project.id}>
                  <ProjectGalleryStatic
                    project={{
                      name: project.name,
                      images: project.images,
                    }}
                  />
                </DeferredProjectGallery>
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
                  {project.sources.map((source) => (
                    <GithubLink
                      key={source.url}
                      href={source.url}
                      label={source.label}
                    />
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
                    <div className="project__demo-actions">
                      {project.demo.github && (
                        <GithubLink
                          href={project.demo.github}
                          label="Demo source"
                        />
                      )}
                      <a
                        className="btn btn--small btn--primary"
                        href={project.demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
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
