'use client';

import useReveal from '../hooks/useReveal.js';

const SERVICES = [
  {
    icon: '💻',
    title: 'Full-Stack Website Development',
    body: 'Complete websites and web apps built end to end — polished front end, solid back end, and a properly designed database underneath.',
  },
  {
    icon: '🎨',
    title: 'Web Design (UI/UX)',
    body: 'Modern, responsive interfaces designed around your brand — clean layouts, smooth interactions, and a look that works on any screen.',
  },
  {
    icon: '📈',
    title: 'SEO',
    body: 'Search-engine optimization from the ground up: metadata, structured data, performance, and content structure that helps you actually rank.',
  },
  {
    icon: '🔧',
    title: 'Maintenance & Support',
    body: 'Ongoing care for your site — updates, fixes, backups, content changes, and monitoring so everything keeps running smoothly.',
  },
  {
    icon: '🛡️',
    title: 'Security Scanning & Patching',
    body: 'Vulnerability scans on your website with clear reports, then the actual patching — closing holes before someone else finds them.',
  },
  {
    icon: '📱',
    title: 'Windows & Android Web Apps',
    body: 'Your website packaged as a real app — Windows desktop apps with Electron and Android apps via WebView or Capacitor.',
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    body: 'Faster load times and snappier pages — website and database tuning, query optimization, caching, and Core Web Vitals cleanup.',
  },
  {
    icon: '🛒',
    title: 'E-Commerce & Shopify',
    body: 'Online stores that convert — Shopify setup and customization, product catalogs, payments, and storefront design.',
  },
  {
    icon: '🔌',
    title: 'APIs & Integrations',
    body: 'Custom REST APIs and third-party integrations — payment gateways, email services, analytics, or connecting the tools you already use.',
  },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="section" ref={ref}>
      <div className="section__inner">
        <p className="section__eyebrow reveal">02 · Services</p>
        <h2 className="section__title reveal">
          What I can <span className="grad-text">do for you.</span>
        </h2>
        <p className="section__lead reveal">
          From a blank page to a live, secure, fast product — and everything it
          needs after launch. Pick one service or the whole stack.
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
