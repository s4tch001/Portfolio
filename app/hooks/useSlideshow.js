import { useCallback, useEffect, useRef, useState } from 'react';

// Auto-advancing slideshow index. Loops last -> first. Any manual interaction
// (next/prev/dot/image/zoom) should call `pause()` to freeze autoplay for
// `pauseMs`, after which it resumes on its own.
export default function useSlideshow(
  length,
  { interval = 4500, pauseMs = 20000, startIndex = 0, enabled = true } = {},
) {
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);
  const goTo = useCallback((i) => setIndex(((i % length) + length) % length), [length]);

  const pause = useCallback(() => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), pauseMs);
  }, [pauseMs]);

  // Autoplay ticker — only runs when enabled, not paused, and there's >1 slide.
  useEffect(() => {
    if (!enabled || paused || length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [enabled, paused, length, interval]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  return { index, setIndex, next, prev, goTo, pause, paused };
}
