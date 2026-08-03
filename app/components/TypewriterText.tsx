'use client';

import useTypewriter from '../hooks/useTypewriter';

interface TypewriterTextProps {
  words: readonly string[];
}

export default function TypewriterText({ words }: TypewriterTextProps) {
  return useTypewriter(words);
}
