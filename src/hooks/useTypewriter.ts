import { useEffect, useState } from 'react';

/** Types each phrase, holds, deletes, then moves to the next. */
export function useTypewriter(phrases: string[], typeMs = 70, holdMs = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index % phrases.length];
    let delay = deleting ? typeMs / 2 : typeMs;
    if (!deleting && text === full) delay = holdMs;

    const t = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, phrases, typeMs, holdMs]);

  return text;
}
