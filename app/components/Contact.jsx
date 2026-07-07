'use client';

import useReveal from '../hooks/useReveal.js';
import ContactForm from './ContactForm.jsx';

// Used as section 05 on the home page and as the body of the standalone
// /contact page (which passes its own eyebrow).
export default function Contact({ eyebrow = '05 · Contact' }) {
  const ref = useReveal();

  return (
    <section id="contact" className="section section--alt" ref={ref}>
      <div className="section__inner contact">
        <p className="section__eyebrow reveal">{eyebrow}</p>
        <h2 className="section__title contact__title reveal">
          Let&apos;s build something
          <br />
          <span className="grad-text">worth shipping.</span>
        </h2>
        <p className="section__lead contact__lead reveal">
          Have a project, a role, or an idea worth building? Tell me about it
          below — it lands straight in my inbox.
        </p>
        <ContactForm />
        <p className="contact__note reveal">
          I usually reply within a day — faster if you mention a good riff or a ranked queue.
        </p>
      </div>
    </section>
  );
}
