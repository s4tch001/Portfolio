import useReveal from '../hooks/useReveal.js';

const GROUPS = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Responsive Design',
      'UI Animation',
    ],
  },
  {
    title: 'Backend & Data',
    icon: '⚙️',
    skills: [
      'Node.js',
      'Python',
      'Cloudflare Workers',
      'Netlify Functions',
      'Supabase (PostgreSQL)',
      'Cloudflare D1 (SQLite)',
      'R2 Object Storage',
      'Durable Objects',
      'REST APIs',
    ],
  },
  {
    title: 'Platforms & Tools',
    icon: '🚀',
    skills: [
      'Netlify',
      'Vercel',
      'Cloudflare',
      'Shopify',
      'Git & GitHub',
      'Google Cloud Console',
      'Google Sites / Sheets / Forms',
      'Wrangler CLI',
      'Android WebView apps',
    ],
  },
  {
    title: 'Design & Security',
    icon: '🛡️',
    skills: [
      'UI/UX Design',
      'Video Editing',
      'Photo Editing',
      'SEO',
      'Cybersecurity',
      'Penetration Testing',
    ],
  },
];

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">03 · Skills</p>
        <h2 className="section__title reveal">
          My <span className="grad-text">toolbox.</span>
        </h2>
        <p className="section__lead reveal">
          The full stack behind everything above — frontend to database, design to
          deployment, plus the security mindset to keep it safe.
        </p>

        <div className="skills__grid">
          {GROUPS.map((group, i) => (
            <article
              key={group.title}
              className="card skills__card reveal"
              style={{ '--d': `${i * 0.1}s` }}
            >
              <h3>
                <span aria-hidden="true">{group.icon}</span> {group.title}
              </h3>
              <div className="skills__chips">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
