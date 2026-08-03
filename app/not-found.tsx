import Link from 'next/link';
import Footer from './components/Footer';
import Nav from './components/Nav';
import StyleSwitcher from './components/StyleSwitcher';

export default function NotFound() {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <main className="page-offset not-found">
        <section className="not-found__shell" aria-labelledby="not-found-title">
          <div className="not-found__copy">
            <p className="section__eyebrow">Route not found</p>
            <h1 id="not-found-title" className="not-found__code">
              404
            </h1>
            <p className="not-found__title">This page drifted out of orbit.</p>
            <p className="not-found__lead">
              The link may have moved, expired, or never existed. No worries — the portfolio is
              still alive and shipping.
            </p>
            <div className="not-found__actions">
              <Link className="btn btn--gradient" href="/">
                Back to home
                <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn--ghost" href="/contact">
                Contact Pau
              </Link>
            </div>
          </div>

          <div className="hero__card not-found__card" aria-hidden="true">
            <div className="hero__card-bar">
              <span className="dot dot--r"></span>
              <span className="dot dot--y"></span>
              <span className="dot dot--g"></span>
              <span className="hero__card-title">missing-route.js</span>
            </div>
            <pre className="hero__code not-found__code-card">
{`const route = {
  status: 404,
  found: false,
  nextStep: 'return home',
};`}
            </pre>
          </div>
        </section>
      </main>
      <Footer />
      <StyleSwitcher />
    </>
  );
}
