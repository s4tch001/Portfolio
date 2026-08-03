import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import StyleSwitcher from './components/StyleSwitcher.jsx';
import projects from './data/projects.js';
import { serializeJsonLd, SITE_URL } from './lib/seo.js';

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#portfolio-list`,
  url: `${SITE_URL}/#portfolio`,
  name: 'Web Development Portfolio â€” Pau',
  description:
    'Web apps and websites designed, built, and deployed by Pau, including class management, attendance, hours, payroll, and travel projects.',
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#${project.id}`,
      name: project.name,
      description: project.description,
      url: `${SITE_URL}/#${project.id}`,
      image: project.images.map((image) => `${SITE_URL}${image.src}`),
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      creator: { '@id': `${SITE_URL}/#pau` },
    },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(portfolioJsonLd) }}
      />
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <StyleSwitcher />
    </>
  );
}
