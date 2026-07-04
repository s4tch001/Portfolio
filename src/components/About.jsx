import useReveal from '../hooks/useReveal.js';

const FACETS = [
  {
    icon: '💻',
    title: 'Web Developer',
    body: 'I build complete products — UI, API, database, and deployment. From dependency-free vanilla JS tools to React platforms with serverless backends on Netlify and Cloudflare.',
  },
  {
    icon: '🎵',
    title: 'Musician',
    body: 'Music trained my ear for rhythm and detail — the same instincts I bring to UI motion, spacing, and flow. A good interface, like a good song, should feel effortless.',
  },
  {
    icon: '🎮',
    title: 'Gamer',
    body: 'Gaming taught me systems thinking, fast iteration, and grinding a problem until it breaks. Patch notes energy: ship, observe, balance, repeat.',
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">01 · About</p>
        <h2 className="section__title reveal">
          Builder by day,
          <br />
          <span className="grad-text">musician &amp; gamer by night.</span>
        </h2>
        <p className="section__lead reveal">
          I&apos;m Pau — a web developer from the Philippines who likes owning the whole
          stack. I take ideas from blank folder to deployed product: real apps, real
          users, real uptime. Every project below is live in production.
        </p>

        <div className="about__grid">
          {FACETS.map((facet, i) => (
            <article
              key={facet.title}
              className="card about__card reveal"
              style={{ '--d': `${i * 0.12}s` }}
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
