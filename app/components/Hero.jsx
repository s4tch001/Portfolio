'use client';

import { useCallback, useRef } from 'react';
import useTypewriter from '../hooks/useTypewriter.js';

const ROLES = ['Web Developer', 'Musician', 'Gamer'];


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
    <section
      id='home'
      className='hero'
      ref={sectionRef}
      onMouseMove={onMouseMove}
    >
      <div className='hero__inner'>
        <div className='hero__copy'>
          <p className='hero__eyebrow'>
            <span className='hero__hand' aria-hidden='true'>
              👋
            </span>{' '}
            Hi, I&apos;m
          </p>
          <h1 className='hero__name'>
            Pau
            <span className='hero__name-detail'>Filipino Web Developer in the Philippines</span>
          </h1>
          <p className='hero__role' aria-label='Web Developer, Musician, Gamer'>
            <span className='hero__typed'>{typed}</span>
            <span className='hero__caret' aria-hidden='true' />
          </p>
          <p className='hero__sub'>
            I&apos;m a Filipino web developer based in the Philippines. I design,
            build, and ship full-stack web applications with a Next.js and
            TypeScript-first workflow, plus React interfaces, database-backed
            features, cloud deployments, UI/UX, SEO, and security baked in. Off
            the clock, I&apos;m into music and gaming.
          </p>
          <div className='hero__cta'>
            <a className='btn btn--gradient' href='#portfolio'>
              View my work <span aria-hidden='true'>→</span>
            </a>
            <a className='btn btn--ghost' href='#contact'>
              Get in touch
            </a>
          </div>
        </div>

        <div className='hero__visual' aria-hidden='true'>
          <div className='hero__card'>
            <div className='hero__card-bar'>
              <span className='dot dot--r' />
              <span className='dot dot--y' />
              <span className='dot dot--g' />
              <span className='hero__card-title'>pau.js</span>
            </div>
            <pre className='hero__code'>
              <code>
                <span className='tk-kw'>const</span>{' '}
                <span className='tk-var'>pau</span> = {'{'}
                {'\n'} role:{' '}
                <span className='tk-str'>'Full-Stack Web Developer'</span>,
                {'\n'} stack: [<span className='tk-str'>'Next.js'</span>,{' '}
                <span className='tk-str'>'TypeScript'</span>,{' '}
                <span className='tk-str'>'React'</span>,{' '}
                <span className='tk-str'>'Prisma'</span>,{' '}
                <span className='tk-str'>'PostgreSQL'</span>],
                {'\n'} cloud: [<span className='tk-str'>'Alibaba Cloud'</span>,{' '}
                <span className='tk-str'>'Netlify'</span>,{' '}
                <span className='tk-str'>'Cloudflare'</span>,{' '}
                <span className='tk-str'>'Vercel'</span>,{' '}
                <span className='tk-str'>'Supabase'</span>],
                {'\n'} afterHours: [<span className='tk-str'>'🎸 music'</span>,{' '}
                <span className='tk-str'>'🎮 games'</span>],
                {'\n'} status:{' '}
                <span className='tk-str'>'open to opportunities'</span>,{'\n'}
                {'}'};
              </code>
            </pre>
          </div>
          <span className='hero__chip hero__chip--1'>💻 clean code</span>
          <span className='hero__chip hero__chip--2'>⚡ fast & responsive</span>
          <span className='hero__chip hero__chip--3'>
            🚀 ship to production
          </span>
        </div>
      </div>

      <a
        className='hero__scroll'
        href='#about'
        aria-label='Scroll to about section'
      >
        <span className='hero__scroll-wheel' />
      </a>
    </section>
  );
}
