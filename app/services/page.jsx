import Services from '../components/Services.jsx';
import StandalonePage from '../components/StandalonePage.jsx';
import { createPageMetadata } from '../lib/seo.js';

export const metadata = createPageMetadata({
  title: 'Web Development Services in the Philippines',
  description:
    'Explore full-stack web development, UI/UX design, technical SEO, security, maintenance, performance, e-commerce, and API services from Pau.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <StandalonePage>
      <Services
        eyebrow="Services"
        headingLevel="h1"
        heading={<>Web development <span className="grad-text">services.</span></>}
      />
    </StandalonePage>
  );
}
