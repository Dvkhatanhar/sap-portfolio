import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

/** Fades/slides its children in the first time they scroll into view. */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, inView]);

  return { ref, inView };
}

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
