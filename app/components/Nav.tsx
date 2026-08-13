'use client';

import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import useTheme from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

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
  const { theme, toggle } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const hoverTransition = { type: 'spring', stiffness: 420, damping: 28 } as const;

  useEffect(() => {
    let lastScrolled = window.scrollY > 24;
    const onScroll = () => {
      const nextScrolled = window.scrollY > 24;
      if (nextScrolled === lastScrolled) return;
      lastScrolled = nextScrolled;
      setScrolled(nextScrolled);
    };

    setScrolled(lastScrolled);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className='nav__inner'>
        <m.a
          className='nav__logo'
          href='https://pauuu.dev'
          onClick={() => setOpen(false)}
          whileHover={shouldReduceMotion ? {} : { scale: 1.025 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
          transition={hoverTransition}
        >
          <m.span
            className='nav__logo-mark'
            whileHover={shouldReduceMotion ? {} : { rotate: -8, scale: 1.08 }}
            transition={hoverTransition}
          >
            P
            <img
              className='nav__logo-img'
              src='/p-devs-logo-64.png'
              alt='P-Devs logo'
              width='64'
              height='64'
            />
          </m.span>
          <span className='nav__logo-text'>
            pauuu<span className='accent'>.dev</span>
          </span>
        </m.a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <m.a
              key={link.id}
              href={`/#${link.id}`}
              onClick={() => setOpen(false)}
              initial='idle'
              animate='idle'
              whileHover='hover'
              whileFocus='hover'
              variants={{
                idle: { y: 0 },
                hover: shouldReduceMotion ? {} : { y: -2 },
              }}
              transition={hoverTransition}
            >
              {link.label}
              <m.span
                className='nav__link-line'
                aria-hidden='true'
                variants={{
                  idle: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
              />
            </m.a>
          ))}
          <m.a
            className='btn btn--small btn--gradient'
            href='/contact'
            onClick={() => setOpen(false)}
            whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.015 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
            transition={hoverTransition}
          >
            Hire me
          </m.a>
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
