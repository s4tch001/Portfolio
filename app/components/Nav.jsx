'use client';

import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme.js';
import ThemeToggle from './ThemeToggle.jsx';

// Root-anchored hrefs so the links work from any page (e.g. /contact):
// on the home page they smooth-scroll, elsewhere they navigate home first.
const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className='nav__inner'>
        <a
          className='nav__logo'
          href='https://pauuu.dev'
          onClick={() => setOpen(false)}
        >
          <span className='nav__logo-mark'>
            P
            <img
              className='nav__logo-img'
              src='/p-devs-logo-64.png'
              alt='P-Devs logo'
              width='64'
              height='64'
            />
          </span>
          <span className='nav__logo-text'>
            pauuu<span className='accent'>.dev</span>
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className='btn btn--small btn--gradient'
            href='/contact'
            onClick={() => setOpen(false)}
          >
            Hire me
          </a>
        </nav>

        <div className='nav__actions'>
          <ThemeToggle theme={theme} onToggle={toggle} />
          <button
            type='button'
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
