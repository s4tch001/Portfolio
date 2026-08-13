import type { SectionHeadingProps } from '../types/ui';
import { MotionCard, MotionChip, MotionReveal } from './MotionElements';

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
      'Motion',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Responsive Design',
      'UI Animation',
      'Axios',
      'TanStack Query',
      'Shadcn',
    ],
  },
  {
    title: 'Backend & Data',
    icon: '⚙️',
    skills: [
      'Node.js',
      'Python',
      'Lua',
      'Cloudflare Workers',
      'Cloudflare D1',
      'Cloudflare R2',
      'Cloudflare DO',
      'Netlify Functions',
      'Supabase',
      'PostgreSQL',
      'SQLite',
      'REST APIs',
      'JWT',
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
    skills: ['UI/UX Design', 'Video Editing', 'Photo Editing', 'Audio Editing'],
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

export default function Skills({
  heading,
  headingLevel = 'h2',
  eyebrow = '04 · Skills',
}: SectionHeadingProps) {
  const Heading = headingLevel;
  const title = heading ?? (
    <>
      My <span className='grad-text'>toolbox.</span>
    </>
  );

  return (
    <section id='skills' className='section'>
      <div className='section__inner'>
        <MotionReveal>
          <p className='section__eyebrow'>{eyebrow}</p>
          <Heading className='section__title'>{title}</Heading>
          <p className='section__lead'>
            The technologies, platforms, and disciplines I use across the full
            development lifecycle.
          </p>
        </MotionReveal>

        <div className='skills__grid'>
          {GROUPS.map((group, i) => (
            <MotionCard
              key={group.title}
              className='card skills__card'
              delay={(i % 3) * 0.06}
            >
              <h3>
                <span aria-hidden='true'>{group.icon}</span> {group.title}
              </h3>
              <div className='skills__chips'>
                {group.skills.map((skill) => (
                  <MotionChip key={skill} className='chip'>
                    {skill}
                  </MotionChip>
                ))}
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
