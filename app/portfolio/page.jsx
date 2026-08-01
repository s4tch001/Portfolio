import Projects from '../components/Projects.jsx';
import StandalonePage from '../components/StandalonePage.jsx';
import projects from '../data/projects.js';
import { createPageMetadata, serializeJsonLd, SITE_URL } from '../lib/seo.js';

export const metadata = createPageMetadata({
  title: 'Web Development Portfolio — Pau',
  description:
    'Explore web apps and websites designed, built, and deployed by Pau, including class management, attendance, hours, payroll, and travel projects.',
  path: '/portfolio',
});

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/portfolio#page`,
  url: `${SITE_URL}/portfolio`,
  name: 'Web Development Portfolio — Pau',
  description: metadata.description,
  about: { '@id': `${SITE_URL}/#pau` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/portfolio#${project.id}`,
        name: project.name,
        description: project.description,
        url: `${SITE_URL}/portfolio#${project.id}`,
        image: project.images.map((image) => `${SITE_URL}${image.src}`),
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        creator: { '@id': `${SITE_URL}/#pau` },
      },
    })),
  },
};

export default function PortfolioPage() {
  return (
    <StandalonePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(portfolioJsonLd) }}
      />
      <Projects
        eyebrow="Portfolio"
        headingLevel="h1"
        heading={<>Web development <span className="grad-text">portfolio.</span></>}
      />
    </StandalonePage>
  );
}
