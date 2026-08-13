import type { ReactNode } from 'react';
import type { SectionHeadingProps } from '../types/ui';
import { MotionReveal } from './MotionElements';

interface ContactProps extends SectionHeadingProps {
  form: ReactNode;
}

// Used as section 05 on the home page and as the body of the standalone
// /contact page (which passes its own heading and eyebrow).
export default function Contact({
  eyebrow = '05 · Contact',
  form,
  heading,
  headingLevel = 'h2',
}: ContactProps) {
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
        <MotionReveal>
          <p className='section__eyebrow'>{eyebrow}</p>
          <Heading className='section__title contact__title'>{title}</Heading>
          <p className='section__lead contact__lead'>
            Have a project or idea? Let's talk.
          </p>
        </MotionReveal>
        <MotionReveal delay={0.08}>{form}</MotionReveal>
      </div>
    </section>
  );
}
