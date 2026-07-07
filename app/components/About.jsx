'use client';

import useReveal from '../hooks/useReveal.js';

const FACETS = [
  {
    icon: '💻',
    title: 'Full-Stack Development',
    body: 'From database to deployment — React, Next.js, and vanilla JavaScript on the front, Node and serverless APIs on the back. I own the whole pipeline.',
  },
  {
    icon: '🎨',
    title: 'Design & Media',
    body: 'UI/UX design with a real eye for detail, plus years of video and photo editing — so products don’t just work, they look and feel right.',
  },
  {
    icon: '🛡️',
    title: 'SEO & Security',
    body: 'Search-optimized builds that actually rank, hardened with a cybersecurity and penetration-testing mindset baked into how I build.',
  },
  {
    icon: '🎸',
    title: 'Beyond the Code',
    body: 'A musician and gamer at heart — off the clock I write and produce my own music. The same rhythm, focus, and problem-solving goes into every project I ship.',
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
          the name <strong>P-Devs</strong>. I take products from an empty folder to a
          live deployment: design, build, ship, and maintain. Everything below is
          running in production with real users.
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
