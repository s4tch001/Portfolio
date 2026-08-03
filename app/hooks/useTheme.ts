import { useCallback, useEffect, useRef, useState } from 'react';
import type { Theme } from '../types/ui';

// Reads the theme that the inline <head> script already applied to <html>.
function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function useTheme() {
  // Start from the same value the server renders ('dark') so hydration matches,
  // then adopt the real theme (set by the inline script) right after mount.
  const [theme, setThemeState] = useState<Theme>('dark');
  const synced = useRef(false);

  useEffect(() => {
    setThemeState(currentTheme());
  }, []);

  // Persist + apply only on genuine changes (user toggling). The first run is
  // skipped so we never clobber the theme the inline script already applied.
  useEffect(() => {
    if (!synced.current) {
      synced.current = true;
      return;
    }
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [theme]);

  const toggle = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  );

  return { theme, toggle };
}
