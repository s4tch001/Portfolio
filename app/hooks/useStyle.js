import { useCallback, useEffect, useRef, useState } from 'react';

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
    if (style === 'default') delete document.documentElement.dataset.style;
    else document.documentElement.dataset.style = style;
    try {
      localStorage.setItem('site-style', style);
    } catch (e) {
      /* storage unavailable — non-fatal */
    }
  }, [style]);

  const setStyle = useCallback((s) => setStyleState(s), []);

  return { style, setStyle };
}
