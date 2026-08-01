import ContactForm from './ContactForm.jsx';

// Used as section 05 on the home page and as the body of the standalone
// /contact page (which passes its own eyebrow).
export default function Contact({
  eyebrow = '05 · Contact',
  eagerTurnstile = false,
  heading,
  headingLevel = 'h2',
}) {
  const Heading = headingLevel;
  const title = heading ?? (
    <>
      Let&apos;s build something
      <br />
      <span className='grad-text'>worth shipping.</span>
    </>
  );

  return (
    <section id='contact' className='section section--alt'>
      <div className='section__inner contact'>
        <p className='section__eyebrow reveal'>{eyebrow}</p>
        <Heading className='section__title contact__title reveal'>{title}</Heading>
        <p className='section__lead contact__lead reveal'>
          Have a project or idea? Let's talk.
        </p>
        <ContactForm eagerTurnstile={eagerTurnstile} />
      </div>
    </section>
  );
}
