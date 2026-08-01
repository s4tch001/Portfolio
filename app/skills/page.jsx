import Skills from '../components/Skills.jsx';
import StandalonePage from '../components/StandalonePage.jsx';
import { createPageMetadata } from '../lib/seo.js';

export const metadata = createPageMetadata({
  title: 'Web Development Skills & Technology Stack',
  description:
    'Review Pau’s frontend, backend, cloud, database, UI/UX, SEO, performance, and web security skills across modern full-stack projects.',
  path: '/skills',
});

export default function SkillsPage() {
  return (
    <StandalonePage>
      <Skills
        eyebrow="Skills & technology"
        headingLevel="h1"
        heading={<>Web development <span className="grad-text">skills & tools.</span></>}
      />
    </StandalonePage>
  );
}
