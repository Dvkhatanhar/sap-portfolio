import { ArrowRight, BarChart3, Copy, Download, FileText, Github, Linkedin, Mail, MapPin, Receipt, Scale, ShoppingCart, Truck } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useTypewriter } from '../hooks/useTypewriter';

const o2cFlow = [
  { icon: ShoppingCart, label: 'Sales Order', code: 'SD' },
  { icon: Truck, label: 'Delivery', code: 'SD ⇄ MM' },
  { icon: Receipt, label: 'Billing', code: 'SD' },
  { icon: Scale, label: 'Settlement', code: 'Chargeback' },
  { icon: BarChart3, label: 'Insights', code: 'Power BI' },
];

export default function Hero({ onCopyEmail }: { onCopyEmail: () => void }) {
  const { profile } = portfolioData;
  const typed = useTypewriter(profile.rotatingRoles);

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28" aria-labelledby="hero-title">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-sapphire-500/20 blur-[120px] dark:bg-sapphire-600/25" aria-hidden />
      <div className="pointer-events-none absolute top-40 -right-20 h-72 w-72 rounded-full bg-gold-400/15 blur-[100px]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-sapphire-500/30 bg-sapphire-500/10 px-3 py-1.5 font-mono text-xs text-sapphire-700 dark:text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.title} · {profile.company}
          </div>

          <h1 id="hero-title" className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            {profile.name}
          </h1>
          <p className="mt-4 min-h-[2.5rem] font-display text-2xl font-semibold sm:text-3xl" aria-live="off">
            <span className="sr-only">{profile.rotatingRoles.join(', ')}</span>
            <span aria-hidden className="bg-gradient-to-r from-sapphire-600 via-sapphire-500 to-cyan-400 bg-clip-text text-transparent dark:from-sapphire-400 dark:via-cyan-300 dark:to-cyan-400">
              {typed}
            </span>
            <span aria-hidden className="ml-0.5 inline-block h-7 w-[3px] translate-y-1 animate-blink bg-gold-400 sm:h-8" />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Big 4 SAP SD consultant delivering Retail Greenfield implementations on SAP S/4HANA — from
            Order-to-Cash, Pricing and Billing design to Settlement Management, integration testing and
            post go-live support.
          </p>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#engagements" className="btn-primary">
              Explore SAP Experience <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={profile.resumeUrl} download="Dev_Khatanhar_Resume.docx" className="btn-gold">
              <Download className="h-4 w-4" aria-hidden /> Download Resume
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile (opens in new tab)">
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile (opens in new tab)">
                <Github className="h-4 w-4" aria-hidden />
              </a>
            )}
            <a href={`mailto:${profile.email}`} className="icon-btn" aria-label={`Send email to ${profile.email}`}>
              <Mail className="h-4 w-4" aria-hidden />
            </a>
            <button type="button" onClick={onCopyEmail} className="btn-ghost h-11 py-0 text-xs" aria-label={`Copy email address ${profile.email}`}>
              <Copy className="h-3.5 w-3.5" aria-hidden /> Copy Email
            </button>
          </div>
        </div>

        {/* O2C process card */}
        <div className="animate-fade-up [animation-delay:150ms]">
          <div className="glass relative p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Order-to-Cash · S/4HANA</p>
              <FileText className="h-4 w-4 text-slate-400" aria-hidden />
            </div>
            <ol className="mt-6 space-y-3" aria-label="Order-to-Cash process flow">
              {o2cFlow.map((step, i) => (
                <li key={step.label} className="group relative flex items-center gap-4">
                  {i < o2cFlow.length - 1 && (
                    <span className="absolute left-5 top-11 h-3 w-px bg-gradient-to-b from-sapphire-500/60 to-transparent" aria-hidden />
                  )}
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sapphire-500/30 bg-sapphire-500/10 text-sapphire-600 transition group-hover:bg-sapphire-500 group-hover:text-white dark:text-cyan-300">
                    <step.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{step.label}</span>
                  <span className="rounded-md bg-slate-900/5 px-2 py-0.5 font-mono text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    {step.code}
                  </span>
                </li>
              ))}
            </ol>
            <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
              {profile.heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-xl font-bold text-gold-500 sm:text-2xl dark:text-gold-400">{s.value}</dd>
                  <dd className="mt-1 text-[11px] leading-tight text-slate-500 dark:text-slate-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
