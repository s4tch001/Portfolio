import Nav from '../components/Nav.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import StyleSwitcher from '../components/StyleSwitcher.jsx';

export const metadata = {
  title: 'Contact · P-Devs — Hire a Full-Stack Web Developer',
  description:
    'Get in touch with Pau (P-Devs) — full-stack web development, web design, SEO, security, and app builds. Send a message and get a reply within a day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <main className="page-offset">
        <Contact eyebrow="Contact" />
      </main>
      <Footer />
      <StyleSwitcher />
    </>
  );
}
