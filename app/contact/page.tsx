import Contact from '../components/Contact';
import StandalonePage from '../components/StandalonePage';
import { createPageMetadata } from '../lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact — Hire a Filipino Web Developer',
  description:
    'Get in touch with Pau (P-Devs) — full-stack web development, web design, SEO, security, and app builds. Send a message and get a reply within a day.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <StandalonePage>
      <Contact
        eyebrow='Contact'
        eagerTurnstile
        headingLevel='h1'
        heading={
          <>
            Let&apos;s build something
            <br />
            <span className='grad-text'>worth shipping.</span>
          </>
        }
      />
    </StandalonePage>
  );
}
