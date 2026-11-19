import { useEffect, useState } from 'react';
import { useInView } from './Reveal';

const NUMERIC = /^(\d[\d,]*)(\D*)$/;

/**
 * Counts up to values like "50,000+", "40%" or "4" when scrolled into view.
 * Anything that isn't a number ("Zero", "Intern → Analyst") is shown as-is.
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(NUMERIC);
  const target = match ? Number(match[1].replace(/,/g, '')) : 0;
  const suffix = match ? match[2] : '';
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, duration]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {n.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  );
}
