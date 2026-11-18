import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { Theme } from '../hooks/useTheme';

interface Props {
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ active, theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const { nav, profile } = portfolioData;

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-slate-50/75 backdrop-blur-xl dark:border-white/5 dark:bg-obsidian-950/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
        <a href="#home" className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500" aria-label={`${profile.name} — back to top`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-sapphire-600 to-cyan-400 font-display text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold text-slate-900 sm:block dark:text-white">
            {profile.name}
            <span className="block font-mono text-[10px] font-normal uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {profile.positioning}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 ${
                    isActive
                      ? 'text-sapphire-600 dark:text-cyan-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-sapphire-500 to-cyan-400 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="icon-btn h-10 w-10"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <ThemeIcon className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            className="icon-btn h-10 w-10 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200/70 px-4 pb-4 lg:hidden dark:border-white/5">
          <ul className="grid gap-1 pt-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active === item.id
                      ? 'bg-sapphire-500/10 text-sapphire-700 dark:text-cyan-300'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
