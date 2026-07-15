'use client';

import useReveal from '../hooks/useReveal.js';

const FACETS = [
  {
    icon: '💻',
    title: 'Full-Stack Development',
    body: 'One person across every layer, so nothing gets lost in the handoff between them — and when something breaks, I already know where to look.',
  },
  {
    icon: '🎨',
    title: 'Design & Media',
    body: 'Years of UI/UX work alongside video, photo, and audio editing. I care about the detail most devs skip: how a thing feels to use, not just whether it runs.',
  },
  {
    icon: '🛡️',
    title: 'SEO & Security',
    body: 'I build to be found and to hold up — search structure planned from day one, and a pen-tester’s habit of asking how each feature could be abused.',
  },
  {
    icon: '🎸',
    title: 'Beyond the Code',
    body: 'I write and produce my own music. Same instincts either way: find the pattern, get the timing right, keep reworking it until it lands.',
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">01 · About</p>
        <h2 className="section__title reveal">
          More than just <span className="grad-text">code.</span>
        </h2>
        <p className="section__lead reveal">
          I&apos;m Pau — a full-stack web developer from the Philippines, working under
          the name <strong>P-Devs</strong>. No team behind me and no agency in
          between: everything below was built solo, is live in production, and has
          real people using it today.
        </p>

        <div className="about__grid">
          {FACETS.map((facet, i) => (
            <article
              key={facet.title}
              className="card about__card reveal"
              style={{ '--d': `${i * 0.1}s` }}
            >
              <span className="about__icon" aria-hidden="true">{facet.icon}</span>
              <h3>{facet.title}</h3>
              <p>{facet.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
