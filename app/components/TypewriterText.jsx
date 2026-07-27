'use client';

import useTypewriter from '../hooks/useTypewriter.js';

export default function TypewriterText({ words }) {
  return useTypewriter(words);
}
