'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useTheme from '../hooks/useTheme.js';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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
            <a
              key={link.id}
              href={pathname === '/' ? `#${link.id}` : `/#${link.id}`}
              onClick={() => setOpen(false)}
            >
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
