import Contact from '../components/Contact.jsx';
import StandalonePage from '../components/StandalonePage.jsx';
import { createPageMetadata } from '../lib/seo.js';

export const metadata = createPageMetadata({
  title: 'Contact Pau — Hire a Filipino Web Developer',
  description:
    'Get in touch with Pau (P-Devs) — full-stack web development, web design, SEO, security, and app builds. Send a message and get a reply within a day.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <StandalonePage>
      <Contact
        eyebrow="Contact Pau"
        eagerTurnstile
        headingLevel="h1"
        heading={<>Contact Pau about <span className="grad-text">your project.</span></>}
      />
    </StandalonePage>
  );
}
