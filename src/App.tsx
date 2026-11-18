import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { portfolioData } from './data/portfolio';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Engagements from './components/Engagements';
import Timeline from './components/Timeline';
import Impact from './components/Impact';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Toast from './components/Toast';

export default function App() {
  const { theme, toggle } = useTheme();
  const sectionIds = useMemo(() => portfolioData.nav.map((n) => n.id), []);
  const active = useActiveSection(sectionIds);

  // Shared cross-highlight state: selecting a skill anywhere highlights matching roles and engagements everywhere.
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>();
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const copyEmail = useCallback(async () => {
    const email = portfolioData.profile.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    showToast(`Email copied: ${email}`);
  }, [showToast]);

  return (
    <>
      <a href="#engagements" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-sapphire-600 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar active={active} theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero onCopyEmail={copyEmail} />
        <Engagements activeSkill={activeSkill} onClearSkill={() => setActiveSkill(null)} />
        <Timeline activeSkill={activeSkill} onSelectSkill={setActiveSkill} />
        <Impact />
        <Skills activeSkill={activeSkill} onSelectSkill={setActiveSkill} />
        <Education />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <footer className="border-t border-slate-200 py-8 dark:border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 dark:text-slate-500">
          <p>© {new Date().getFullYear()} {portfolioData.profile.name} · {portfolioData.profile.positioning}</p>
          <p className="font-mono">SAP S/4HANA · SD · Order-to-Cash</p>
        </div>
      </footer>
      <Toast message={toast} />
    </>
  );
}
