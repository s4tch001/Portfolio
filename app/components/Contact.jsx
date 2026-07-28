import ContactForm from './ContactForm.jsx';

// Used as section 05 on the home page and as the body of the standalone
// /contact page (which passes its own eyebrow).
export default function Contact({
  eyebrow = '05 · Contact',
  eagerTurnstile = false,
}) {
  return (
    <section id='contact' className='section section--alt'>
      <div className='section__inner contact'>
        <p className='section__eyebrow reveal'>{eyebrow}</p>
        <h2 className='section__title contact__title reveal'>
          Let&apos;s build something
          <br />
          <span className='grad-text'>worth shipping.</span>
        </h2>
        <p className='section__lead contact__lead reveal'>
          Have a project or idea? Let's talk.
        </p>
        <ContactForm eagerTurnstile={eagerTurnstile} />
      </div>
    </section>
  );
}
