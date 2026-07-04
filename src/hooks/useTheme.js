import { useCallback, useEffect, useState } from 'react';

// Reads the theme that the inline <head> script already applied to <html>,
// then keeps <html data-theme> + localStorage in sync when toggled.
function currentTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function useTheme() {
  const [theme, setThemeState] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* storage unavailable — non-fatal */
    }
  }, [theme]);

  const toggle = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  );

  return { theme, toggle };
}
