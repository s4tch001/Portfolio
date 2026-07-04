'use client';

import { useCallback, useRef } from 'react';
import useTypewriter from '../hooks/useTypewriter.js';

const ROLES = ['Web Developer', 'Musician', 'Gamer'];

const STATS = [
  { value: '4+', label: 'Apps shipped to production' },
  { value: '3', label: 'Cloud platforms deployed on' },
  { value: '100%', label: 'Built end to end, solo' },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const sectionRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef} onMouseMove={onMouseMove}>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__hand" aria-hidden="true">👋</span> Hi, I&apos;m
          </p>
          <h1 className="hero__name">Pau</h1>
          <p className="hero__role" aria-label="Web Developer, Musician, Gamer">
            <span className="hero__typed">{typed}</span>
            <span className="hero__caret" aria-hidden="true" />
          </p>
          <p className="hero__sub">
            I design, build, and ship full-stack web applications — from lightweight
            vanilla-JavaScript tools to full React platforms on the Cloudflare edge,
            with UI/UX, SEO, and security baked in. Off the clock, I&apos;m into music
            and gaming.
          </p>
          <div className="hero__cta">
            <a className="btn btn--gradient" href="#projects">
              View my work <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
          </div>
          <dl className="hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card">
            <div className="hero__card-bar">
              <span className="dot dot--r" />
              <span className="dot dot--y" />
              <span className="dot dot--g" />
              <span className="hero__card-title">pau.js</span>
            </div>
            <pre className="hero__code">
              <code>
                <span className="tk-kw">const</span> <span className="tk-var">pau</span> = {'{'}
                {'\n'}  role: <span className="tk-str">'Full-Stack Web Developer'</span>,
                {'\n'}  stack: [<span className="tk-str">'JavaScript'</span>, <span className="tk-str">'React'</span>, <span className="tk-str">'Vite'</span>, <span className="tk-str">'Supabase'</span>],
                {'\n'}  edge: [<span className="tk-str">'Workers'</span>, <span className="tk-str">'D1'</span>, <span className="tk-str">'R2'</span>],
                {'\n'}  shipsTo: [<span className="tk-str">'Netlify'</span>, <span className="tk-str">'Cloudflare'</span>],
                {'\n'}  afterHours: [<span className="tk-str">'🎸 music'</span>, <span className="tk-str">'🎮 games'</span>],
                {'\n'}  status: <span className="tk-str">'open to opportunities'</span>,
                {'\n'}{'}'};
              </code>
            </pre>
          </div>
          <span className="hero__chip hero__chip--1">💻 clean code</span>
          <span className="hero__chip hero__chip--2">🎸 riffs</span>
          <span className="hero__chip hero__chip--3">🎮 GG WP</span>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to about section">
        <span className="hero__scroll-wheel" />
      </a>
    </section>
  );
}
