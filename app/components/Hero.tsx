import TypewriterText from './TypewriterText';
import {
  HeroVisualCard,
  HeroVisualChip,
  HeroVisualMotion,
  HeroMotionBackground,
  MotionLink,
  MotionScrollWheel,
} from './MotionElements';

const ROLES = ['Web Developer', 'Musician', 'Gamer'];

export default function Hero() {
  return (
    <section id='home' className='hero'>
      <HeroMotionBackground />
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
            <span className='hero__name-detail'>
              Full-stack Web Developer in the Philippines
            </span>
          </h1>
          <p className='hero__role' aria-label='Web Developer, Musician, Gamer'>
            <span className='hero__typewriter'>
              <span className='hero__typed'>
                <TypewriterText words={ROLES} />
              </span>
              <span className='hero__caret' aria-hidden='true' />
            </span>
          </p>
          <p className='hero__sub'>
            I design, build, and ship full-stack web applications with a Next.js
            and TypeScript-first workflow, plus React interfaces,
            database-backed features, cloud deployments, UI/UX, SEO, and
            security baked in. Off the clock, I&apos;m into music and gaming.
          </p>
          <div className='hero__cta'>
            <MotionLink className='btn btn--gradient' href='#portfolio'>
              View my work <span aria-hidden='true'>→</span>
            </MotionLink>
            <MotionLink className='btn btn--ghost' href='#contact'>
              Get in touch
            </MotionLink>
          </div>
        </div>

        <HeroVisualMotion>
          <HeroVisualCard>
            <div className='hero__card-bar'>
              <span className='dot dot--r' />
              <span className='dot dot--y' />
              <span className='dot dot--g' />
              <span className='hero__card-title'>pau.ts</span>
            </div>
            <pre className='hero__code'>
              <code>
                <span className='tk-kw'>const</span>{' '}
                <span className='tk-var'>pau</span> = {'{'}
                {'\n'} role:{' '}
                <span className='tk-str'>'Full-Stack Web Developer'</span>,
                {'\n'} stack: [<span className='tk-str'>'Next'</span>,{' '}
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
          </HeroVisualCard>
          <HeroVisualChip className='hero__chip hero__chip--1' index={0}>
            💻 clean code
          </HeroVisualChip>
          <HeroVisualChip className='hero__chip hero__chip--2' index={1}>
            ⚡ fast & responsive
          </HeroVisualChip>
          <HeroVisualChip className='hero__chip hero__chip--3' index={2}>
            🚀 ship to production
          </HeroVisualChip>
        </HeroVisualMotion>
      </div>

      <a
        className='hero__scroll'
        href='#about'
        aria-label='Scroll to about section'
      >
        <MotionScrollWheel />
      </a>
    </section>
  );
}
