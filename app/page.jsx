import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import StyleSwitcher from './components/StyleSwitcher.jsx';

export default function Page() {
  return (
    <>
      {/* Fixed chrome stays OUTSIDE the scroller so it pins to the viewport */}
      <div className="bg-glow" aria-hidden="true" />
      <Nav />

      {/* The single scroll container — see .app-scroll in globals.css */}
      <div className="app-scroll" id="app-scroll">
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>

      <StyleSwitcher />
    </>
  );
}
