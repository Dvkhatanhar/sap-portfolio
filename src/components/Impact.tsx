import { Award, Gauge, Receipt, Rocket, ShieldCheck, Store, TrendingUp, type LucideIcon } from 'lucide-react';
import { portfolioData, type Achievement } from '../data/portfolio';
import SectionHeading from './SectionHeading';

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

const sizes = {
  lg: 'sm:col-span-2 lg:row-span-2',
  md: 'sm:col-span-1 lg:col-span-2',
  sm: 'sm:col-span-1',
};

export default function Impact() {
  const { achievements, certifications } = portfolioData;

  return (
    <section id="impact" className="py-20 sm:py-28" aria-label="Achievements and Impact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="03 · Achievements & Impact" title="Enterprise outcomes, by the numbers">
          Every figure below comes straight from delivered SAP S/4HANA work.
        </SectionHeading>

        <div className="grid auto-rows-[minmax(150px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => {
            const Icon = icons[a.icon];
            const tone = accents[a.accent ?? 'sapphire'];
            const big = a.size === 'lg';
            return (
              <article key={a.label} className={`glass glass-hover relative overflow-hidden p-6 ${sizes[a.size ?? 'sm']}`}>
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${tone.glow}`} aria-hidden />
                <span className={`relative grid h-10 w-10 place-items-center rounded-xl ${tone.icon}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className={`relative mt-5 font-display font-bold tracking-tight ${tone.value} ${big ? 'text-6xl sm:text-7xl' : 'text-3xl sm:text-4xl'}`}>
                  {a.value}
                </p>
                <h3 className={`relative mt-1 font-semibold text-slate-900 dark:text-white ${big ? 'text-xl' : 'text-base'}`}>{a.label}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{a.detail}</p>
                {big && (
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {['SAP S/4HANA', 'Retail', 'Greenfield', 'Big 4'].map((t) => (
                      <span key={t} className="rounded-full border border-sapphire-500/30 px-2.5 py-1 font-mono text-[11px] text-sapphire-700 dark:text-sapphire-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}

          <article className="glass glass-hover relative overflow-hidden p-6 sm:col-span-2 lg:col-span-4">
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
        </div>
      </div>
    </section>
  );
}
