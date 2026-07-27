const SERVICES = [
  {
    icon: '💻',
    title: 'Full-Stack Website Development',
    body: 'Websites and apps built end to end: UI, backend, database, and deploy.',
  },
  {
    icon: '🎨',
    title: 'Web Design (UI/UX)',
    body: 'Clean, responsive interfaces that feel good on every screen.',
  },
  {
    icon: '📈',
    title: 'SEO',
    body: 'Metadata, structure, speed, and content signals that help pages get found.',
  },
  {
    icon: '🔧',
    title: 'Maintenance & Support',
    body: 'Updates, fixes, backups, content changes, and quiet monitoring.',
  },
  {
    icon: '🛡️',
    title: 'Security Scanning & Patching',
    body: 'Find the weak spots, explain them clearly, then patch them.',
  },
  {
    icon: '📱',
    title: 'Windows & Android Web Apps',
    body: 'Package your web app for Windows or Android when a browser tab is not enough.',
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    body: 'Faster pages, cleaner queries, better caching, and Core Web Vitals cleanup.',
  },
  {
    icon: '🛒',
    title: 'E-Commerce & Shopify',
    body: 'Shopify setup, storefront design, products, payments, and polish.',
  },
  {
    icon: '🔌',
    title: 'APIs & Integrations',
    body: 'REST APIs, payments, email, analytics, and the tools you already use.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="section__inner">
        <p className="section__eyebrow reveal">02 · Services</p>
        <h2 className="section__title reveal">
          What I can <span className="grad-text">do for you.</span>
        </h2>
        <p className="section__lead reveal">
          From blank page to shipped product — then the fixes, speedups, and
          “can we add this?” moments after launch.
        </p>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <article
              key={service.title}
              className="card services__card reveal"
              style={{ '--d': `${(i % 3) * 0.1}s` }}
            >
              <span className="services__icon" aria-hidden="true">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
