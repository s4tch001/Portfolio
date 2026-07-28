import { useCallback, useEffect, useRef, useState } from 'react';

const ALTERNATE_STYLES = new Set([
  'graffiti',
  'oldschool',
  'pixels',
  'luxe',
  'hacker',
]);

let latestStyleRequest = 0;

function rememberStyle(style) {
  try {
    localStorage.setItem('site-style', style);
  } catch (e) {
    /* storage unavailable — non-fatal */
  }
}

function waitForStyleSheet(link) {
  if (link.dataset.loaded === 'true') return Promise.resolve(link);

  return new Promise((resolve, reject) => {
    let settled = false;
    let timeout;

    const cleanup = () => {
      window.clearTimeout(timeout);
      link.removeEventListener('load', succeed);
      link.removeEventListener('error', fail);
      link.removeEventListener('page-style-failed', fail);
    };
    const succeed = () => {
      if (settled) return;
      settled = true;
      cleanup();
      link.dataset.loaded = 'true';
      resolve(link);
    };
    const fail = () => {
      if (settled) return;
      settled = true;
      cleanup();
      link.remove();
      reject(new Error('Page style stylesheet failed to load.'));
    };

    link.addEventListener('load', succeed, { once: true });
    link.addEventListener('error', fail, { once: true });
    link.addEventListener('page-style-failed', fail, { once: true });
    timeout = window.setTimeout(fail, 3000);

    // Covers a cached stylesheet that completed between the initial lookup
    // and listener registration.
    if (link.sheet) succeed();
  });
}

function ensureStyleSheet(style) {
  if (!ALTERNATE_STYLES.has(style)) return Promise.resolve(null);

  const existing = document.querySelector(
    `link[data-page-style="${style}"]`,
  );
  if (existing) return waitForStyleSheet(existing);

  const link = document.createElement('link');
  link.id = `page-style-css-${style}`;
  link.rel = 'stylesheet';
  link.href = `/styles/${style}.css`;
  link.dataset.pageStyle = style;
  const loaded = waitForStyleSheet(link);
  document.head.appendChild(link);
  return loaded;
}

// Reads the page style that the inline <head> script already applied to
// <html data-style>, then keeps it + localStorage in sync when changed.
// Mirrors the hydration-safe pattern in useTheme.js.
function currentStyle() {
  if (typeof document === 'undefined') return 'default';
  return document.documentElement.dataset.style || 'default';
}

export default function useStyle() {
  // Start from the value the server renders ('default') so hydration matches,
  // then adopt the real style right after mount.
  const [style, setStyleState] = useState('default');
  const synced = useRef(false);

  useEffect(() => {
    setStyleState(currentStyle());
  }, []);

  // Persist + apply only on genuine changes (user picking a style); the first
  // run is skipped so we never clobber what the inline script applied.
  useEffect(() => {
    if (!synced.current) {
      synced.current = true;
      return;
    }

    const request = ++latestStyleRequest;
    let active = true;

    if (style === 'default') {
      delete document.documentElement.dataset.style;
      rememberStyle(style);
      return undefined;
    }

    ensureStyleSheet(style)
      .then(() => {
        if (!active || request !== latestStyleRequest) return;
        document.documentElement.dataset.style = style;
        rememberStyle(style);
      })
      .catch(() => {
        if (!active || request !== latestStyleRequest) return;
        setStyleState(currentStyle());
      });

    return () => {
      active = false;
    };
  }, [style]);

  const setStyle = useCallback((s) => setStyleState(s), []);

  return { style, setStyle };
}
