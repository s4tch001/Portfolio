import type { SectionHeadingProps } from '../types/ui';
import { MotionCard, MotionReveal } from './MotionElements';

const FOCUS_AREAS = [
  {
    icon: '💻',
    title: 'Full-Stack Architecture',
    body: 'How interfaces, APIs, data, and deployments fit together in complete applications.',
  },
  {
    icon: '🎨',
    title: 'Interface Design',
    body: 'Responsive, accessible interfaces with clear structure and thoughtful interaction.',
  },
  {
    icon: '📈',
    title: 'Search & Semantics',
    body: 'Metadata, structured content, performance, and crawl-friendly page architecture.',
  },
  {
    icon: '🔧',
    title: 'Reliability',
    body: 'Updates, diagnostics, backups, observability, and maintainable code paths.',
  },
  {
    icon: '🛡️',
    title: 'Application Security',
    body: 'Threat-aware design, boundary validation, secure defaults, and focused testing.',
  },
  {
    icon: '📱',
    title: 'Cross-Platform Packaging',
    body: 'Exploring how web applications can run across browsers, Windows, and Android.',
  },
  {
    icon: '⚡',
    title: 'Performance Engineering',
    body: 'Rendering, queries, caching, and Core Web Vitals across different devices.',
  },
  {
    icon: '🛒',
    title: 'Commerce Platforms',
    body: 'Storefront architecture, catalog interfaces, content modeling, and platform tooling.',
  },
  {
    icon: '🔌',
    title: 'APIs & Integrations',
    body: 'REST APIs, email delivery, analytics, automation, and third-party platforms.',
  },
];

export default function Services({
  heading,
  headingLevel = 'h2',
  eyebrow = '02 · Focus',
}: SectionHeadingProps) {
  const Heading = headingLevel;
  const title = heading ?? (
    <>Areas I explore <span className="grad-text">through code.</span></>
  );

  return (
    <section id="focus" className="section">
      <div className="section__inner">
        <MotionReveal>
          <p className="section__eyebrow">{eyebrow}</p>
          <Heading className="section__title">{title}</Heading>
          <p className="section__lead">
            A snapshot of the technical areas represented across my projects,
            experiments, and ongoing learning.
          </p>
        </MotionReveal>

        <div className="services__grid">
          {FOCUS_AREAS.map((area, i) => (
            <MotionCard
              key={area.title}
              className="card services__card"
              delay={(i % 3) * 0.06}
            >
              <span className="services__icon" aria-hidden="true">{area.icon}</span>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
