'use client';

import { useEffect, useRef } from 'react';

const TYPE_MS = 70;
const DELETE_MS = 38;
const HOLD_MS = 1700;

interface TypewriterTextProps {
  words: readonly string[];
}

export default function TypewriterText({ words }: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const firstWord = words[0] ?? '';

  useEffect(() => {
    const element = textRef.current;
    if (!element || words.length === 0) return undefined;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    if (reducedMotion.matches) return undefined;

    let index = 0;
    let text = firstWord;
    let deleting = true;
    let timer = 0;

    const update = () => {
      const word = words[index % words.length] ?? '';

      if (deleting && text === '') {
        deleting = false;
        index = (index + 1) % words.length;
      } else if (!deleting && text === word) {
        deleting = true;
      } else {
        const nextLength = text.length + (deleting ? -1 : 1);
        text = word.slice(0, nextLength);
        element.textContent = text;
      }

      const nextWord = words[index % words.length] ?? '';
      const delay = !deleting && text === nextWord
        ? HOLD_MS
        : deleting
          ? DELETE_MS
          : TYPE_MS;
      timer = window.setTimeout(update, delay);
    };

    // The complete first role is present in the initial HTML and remains
    // stable through the critical paint. The typewriter starts after its
    // normal hold period, outside the LCP-sensitive startup window.
    timer = window.setTimeout(update, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [firstWord, words]);

  return <span ref={textRef}>{firstWord}</span>;
}
