import { useCallback, useEffect, useRef, useState } from 'react';

interface SlideshowOptions {
  interval?: number;
  pauseMs?: number;
  startIndex?: number;
  enabled?: boolean;
}

// Auto-advancing slideshow index. Loops last -> first. Any manual interaction
// (next/prev/dot/image/zoom) should call `pause()` to freeze autoplay for
// `pauseMs`, after which it resumes on its own.
export default function useSlideshow(
  length: number,
  {
    interval = 4500,
    pauseMs = 20000,
    startIndex = 0,
    enabled = true,
  }: SlideshowOptions = {},
) {
  const safeLength = Math.max(length, 1);
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % safeLength), [safeLength]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + safeLength) % safeLength),
    [safeLength],
  );
  const goTo = useCallback(
    (nextIndex: number) =>
      setIndex(((nextIndex % safeLength) + safeLength) % safeLength),
    [safeLength],
  );

  const pause = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current !== null) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), pauseMs);
  }, [pauseMs]);

  // Autoplay ticker — only runs when enabled, not paused, and there's >1 slide.
  useEffect(() => {
    if (!enabled || paused || safeLength < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % safeLength), interval);
    return () => clearInterval(id);
  }, [enabled, paused, safeLength, interval]);

  useEffect(
    () => () => {
      if (resumeTimer.current !== null) clearTimeout(resumeTimer.current);
    },
    [],
  );

  return { index, setIndex, next, prev, goTo, pause, paused };
}
