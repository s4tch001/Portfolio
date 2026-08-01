import About from '../components/About.jsx';
import StandalonePage from '../components/StandalonePage.jsx';
import { createPageMetadata } from '../lib/seo.js';

export const metadata = createPageMetadata({
  title: 'About Pau — Filipino Full-Stack Web Developer',
  description:
    'Meet Pau, the Filipino full-stack web developer behind P-Devs, building secure, responsive websites and web apps from the Philippines.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <StandalonePage>
      <About
        eyebrow="About Pau"
        headingLevel="h1"
        heading={<>About Pau, a <span className="grad-text">Filipino web developer.</span></>}
      />
    </StandalonePage>
  );
}
