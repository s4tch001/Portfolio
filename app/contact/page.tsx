import Contact from '../components/Contact';
import ContactForm from '../components/ContactForm';
import StandalonePage from '../components/StandalonePage';
import { createPageMetadata } from '../lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact Pau',
  description:
    'Send Pau a general message about the portfolio, featured projects, technology, music, gaming, or another shared interest.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <StandalonePage>
      <Contact
        eyebrow='Contact'
        form={<ContactForm eagerTurnstile />}
        headingLevel='h1'
        heading={
          <>
            Say hello or share
            <br />
            <span className='grad-text'>what&apos;s on your mind.</span>
          </>
        }
      />
    </StandalonePage>
  );
}
