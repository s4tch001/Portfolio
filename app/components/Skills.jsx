const GROUPS = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Responsive Design',
      'UI Animation',
      'Axios',
      'TanStack',
      'shadcn',
    ],
  },
  {
    title: 'Backend & Data',
    icon: '⚙️',
    skills: [
      'Node.js',
      'Python',
      'Django',
      'Flask',
      'Lua',
      'Cloudflare Workers',
      'Netlify Functions',
      'Supabase',
      'PostgreSQL',
      'Cloudflare D1',
      'SQLite',
      'R2 Object Storage',
      'Durable Objects',
      'REST APIs',
      'Prisma ORM',
      'Zod',
    ],
  },
  {
    title: 'Platforms & Development Tools',
    icon: '🚀',
    skills: [
      'Netlify',
      'Vercel',
      'Cloudflare',
      'Alibaba Cloud',
      'GitHub Pages',
      'AWS',
      'VPS (Hostinger, OVH, etc)',
      'Shopify',
      'Git',
      'GitHub',
      'Google Cloud Console',
      'Wrangler CLI',
      'Electron',
      'Kotlin',
      'Capacitor',
    ],
  },
  {
    title: 'Design & Creative',
    icon: '✨',
    skills: [
      'UI/UX Design',
      'Video Editing',
      'Photo Editing',
      'Audio Editing',
    ],
  },
  {
    title: 'SEO & Optimization',
    icon: '🔍',
    skills: [
      'Technical SEO',
      'On-Page SEO',
      'Performance Optimization',
      'Responsive Optimization',
    ],
  },
  {
    title: 'Security',
    icon: '🛡️',
    skills: [
      'Web Security',
      'Cybersecurity',
      'Penetration Testing',
      'Secure API Development',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section__inner">
        <p className="section__eyebrow reveal">04 · Skills</p>
        <h2 className="section__title reveal">
          My <span className="grad-text">toolbox.</span>
        </h2>
        <p className="section__lead reveal">
          The technologies, platforms, and disciplines I use across the full
          development lifecycle.
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
