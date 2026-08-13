import type { SectionHeadingProps } from '../types/ui';
import { MotionCard, MotionReveal } from './MotionElements';

const FACETS = [
  {
    icon: '💻',
    title: 'Full-Stack Development',
    body: 'UI, backend, database, and deploys. Fewer handoffs, fewer mysteries.',
  },
  {
    icon: '🎨',
    title: 'Design & Media',
    body: 'UI/UX plus video, photo, and audio work. I care how things feel, not just how they run.',
  },
  {
    icon: '🛡️',
    title: 'SEO & Security',
    body: 'Search structure from day one, with a pen-tester habit of asking what could break.',
  },
  {
    icon: '🎸',
    title: 'Beyond the Code',
    body: 'I write and produce music too. Same loop: find the pattern, tune the timing, make it land.',
  },
];

export default function About({
  heading,
  headingLevel = 'h2',
  eyebrow = '01 · About',
}: SectionHeadingProps) {
  const Heading = headingLevel;
  const title = heading ?? (
    <>More than just <span className="grad-text">code.</span></>
  );

  return (
    <section id="about" className="section">
      <div className="section__inner">
        <MotionReveal>
          <p className="section__eyebrow">{eyebrow}</p>
          <Heading className="section__title">{title}</Heading>
          <p className="section__lead">
            I&apos;m Pau, the solo dev behind <strong>P-Devs</strong>. I design,
            build, deploy, and maintain the work you see here.
          </p>
        </MotionReveal>

        <div className="about__grid">
          {FACETS.map((facet, i) => (
            <MotionCard
              key={facet.title}
              className="card about__card"
              delay={(i % 4) * 0.06}
            >
              <span className="about__icon" aria-hidden="true">{facet.icon}</span>
              <h3>{facet.title}</h3>
              <p>{facet.body}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
