'use client';

import useReveal from '../hooks/useReveal.js';

export default function Contact() {
  const ref = useReveal();

  return (
    <section id="contact" className="section section--alt" ref={ref}>
      <div className="section__inner contact">
        <p className="section__eyebrow reveal">04 · Contact</p>
        <h2 className="section__title contact__title reveal">
          Let&apos;s build something
          <br />
          <span className="grad-text">worth shipping.</span>
        </h2>
        <p className="section__lead contact__lead reveal">
          Have a project, a role, or an idea worth building? Let&apos;s make it
          happen — my inbox is always open.
        </p>
        <div className="contact__actions reveal">
          <a className="btn btn--gradient btn--big" href="mailto:admin@pauuu.dev">
            ✉️ admin@pauuu.dev
          </a>
        </div>
        <p className="contact__note reveal">
          I usually reply within a day — faster if you mention a good riff or a ranked queue.
        </p>
      </div>
    </section>
  );
}
