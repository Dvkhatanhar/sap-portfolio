import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Thin reading-progress bar pinned under the navbar, plus a back-to-top button. */
export default function ScrollExtras() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-16 z-50 h-0.5" aria-hidden>
        <div
          className="h-full origin-left bg-gradient-to-r from-sapphire-500 via-cyan-400 to-gold-400"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <a
        href="#home"
        aria-label="Back to top"
        className={`fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-sapphire-600 text-white shadow-lg shadow-sapphire-600/30 transition-all duration-300 hover:bg-sapphire-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:right-6 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </a>
    </>
  );
}
