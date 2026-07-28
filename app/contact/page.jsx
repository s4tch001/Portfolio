import Nav from '../components/Nav.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import StyleSwitcher from '../components/StyleSwitcher.jsx';

export const metadata = {
  title: 'Contact Pau — Hire a Filipino Web Developer',
  description:
    'Get in touch with Pau (P-Devs) — full-stack web development, web design, SEO, security, and app builds. Send a message and get a reply within a day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: 'https://pauuu.dev/contact',
    title: 'Contact Pau — Hire a Filipino Web Developer',
    description:
      'Contact Pau for Next.js websites, full-stack web apps, web design, SEO, security, and ongoing support.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <main className="page-offset">
        <Contact eyebrow="Contact" eagerTurnstile />
      </main>
      <Footer />
      <StyleSwitcher />
    </>
  );
}
