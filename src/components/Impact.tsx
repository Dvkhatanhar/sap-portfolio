import { Award, Gauge, Receipt, Rocket, ShieldCheck, Store, TrendingUp, type LucideIcon } from 'lucide-react';
import { portfolioData, type Achievement } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import CountUp from './CountUp';
import Reveal from './Reveal';

const icons: Record<Achievement['icon'], LucideIcon> = {
  rocket: Rocket,
  store: Store,
  receipt: Receipt,
  shield: ShieldCheck,
  gauge: Gauge,
  award: Award,
  trending: TrendingUp,
};

const accents = {
  sapphire: { icon: 'bg-sapphire-500/15 text-sapphire-600 dark:text-sapphire-300', glow: 'bg-sapphire-500/20', value: 'text-sapphire-600 dark:text-sapphire-300' },
  gold: { icon: 'bg-gold-400/15 text-gold-600 dark:text-gold-300', glow: 'bg-gold-400/20', value: 'text-gold-500 dark:text-gold-400' },
  cyan: { icon: 'bg-cyan-400/15 text-cyan-700 dark:text-cyan-300', glow: 'bg-cyan-400/20', value: 'text-cyan-700 dark:text-cyan-300' },
};

// Phones: 2-column grid (large tiles span both). Desktop: 4-column bento.
const sizes = {
  lg: 'col-span-2 lg:row-span-2',
  md: 'col-span-1 lg:col-span-2',
  sm: 'col-span-1',
};

export default function Impact() {
  const { achievements, certifications } = portfolioData;

  return (
    <section id="impact" className="py-14 sm:py-24" aria-label="Achievements and Impact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="03 · Achievements & Impact" title="Enterprise outcomes, by the numbers">
          Every figure below comes straight from delivered SAP S/4HANA work.
        </SectionHeading>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(150px,auto)] lg:grid-cols-4">
          {achievements.map((a, i) => {
            const Icon = icons[a.icon];
            const tone = accents[a.accent ?? 'sapphire'];
            const big = a.size === 'lg';
            const longValue = a.value.length > 8;
            return (
              <Reveal key={a.label} delay={i * 70} className={sizes[a.size ?? 'sm']}>
                <article className="glass glass-hover group relative h-full overflow-hidden p-4 sm:p-6">
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150 ${tone.glow}`} aria-hidden />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className={`grid h-9 w-9 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-10 sm:w-10 ${tone.icon}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    </span>
                  </div>
                  <p
                    className={`relative mt-3 font-display font-bold tracking-tight sm:mt-5 ${tone.value} ${
                      big ? 'text-5xl sm:text-7xl' : longValue ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-4xl'
                    }`}
                  >
                    <CountUp value={a.value} />
                  </p>
                  <h3 className={`relative mt-1 font-semibold text-slate-900 dark:text-white ${big ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>{a.label}</h3>
                  <p className={`relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 ${big ? '' : 'hidden sm:block'}`}>{a.detail}</p>
                  {big && (
                    <div className="relative mt-4 flex flex-wrap gap-2 sm:mt-6">
                      {['SAP S/4HANA', 'Retail', 'Greenfield', 'Big 4'].map((t) => (
                        <span key={t} className="rounded-full border border-sapphire-500/30 px-2.5 py-1 font-mono text-[11px] text-sapphire-700 dark:text-sapphire-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}

          {/* Certifications are listed in full in the Education section, so this tile is desktop-only. */}
          <Reveal className="col-span-2 hidden sm:block lg:col-span-4" delay={achievements.length * 70}>
            <article className="glass glass-hover relative overflow-hidden p-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-400/15 text-gold-600 dark:text-gold-300">
                  <Award className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{certifications.length} Professional Certifications</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">SAP SD, AI and consulting credentials</p>
                </div>
                <ul className="flex flex-wrap gap-2 sm:ml-auto">
                  {certifications.map((c) => (
                    <li key={c.name} className="rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
