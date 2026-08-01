import Footer from './Footer.jsx';
import Nav from './Nav.jsx';
import StyleSwitcher from './StyleSwitcher.jsx';

export default function StandalonePage({ children }) {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <main className="page-offset">{children}</main>
      <Footer />
      <StyleSwitcher />
    </>
  );
}
