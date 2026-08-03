import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const DELETE_MS = 38;
const HOLD_MS = 1700;

// Cycles through `words`, typing then deleting each one.
export default function useTypewriter(words: readonly string[]): string {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? '';
    let delay = deleting ? DELETE_MS : TYPE_MS;

    if (!deleting && text === word) delay = HOLD_MS;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}
