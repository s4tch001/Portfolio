const QUESTIONS = [
  {
    question: 'Do you work with clients outside the Philippines?',
    answer:
      'Yes. I work remotely from the Philippines and build websites and web apps for local and international clients, with clear async updates and production-ready handoff.',
  },
  {
    question: 'What does a Filipino full-stack web developer handle?',
    answer:
      'I handle the interface, server logic, database, integrations, deployment, performance, technical SEO, and security—so a project can move from idea to a live product with one developer.',
  },
  {
    question: 'Do you build websites with Next.js?',
    answer:
      'Yes. As a Pinoy Next.js developer, I build fast, responsive sites and full-stack applications using React, Next.js, TypeScript, Node.js, and cloud platforms such as Cloudflare and Netlify.',
  },
  {
    question: 'Can I hire you for freelance web development?',
    answer:
      'Yes. I am available for freelance projects and full-time opportunities involving website development, web apps, redesigns, performance improvements, SEO, maintenance, and security work.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QUESTIONS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

export default function SeoContent() {
  return (
    <section id="filipino-web-developer" className="section section--alt">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="section__inner">
        <p className="section__eyebrow">Philippines · Web Development</p>
        <h2 className="section__title">
          A Filipino web developer for <span className="grad-text">modern products.</span>
        </h2>
        <p className="section__lead">
          Looking for a web developer in the Philippines? I&apos;m Pau, the Pinoy web
          developer behind P-Devs. I build custom Next.js websites and full-stack
          web apps that are responsive, accessible, search-friendly, and ready to
          grow—from landing pages to internal business platforms.
        </p>

        <div className="about__grid">
          {QUESTIONS.map(({ question, answer }) => (
            <article className="card about__card" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
