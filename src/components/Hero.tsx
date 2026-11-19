import { useEffect, useState } from 'react';
import {
  ArrowRight, BarChart3, Building2, Copy, Download, Github, Linkedin, Mail, MapPin, Pause, Play, Receipt, Scale, ShoppingCart, Truck,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useTypewriter } from '../hooks/useTypewriter';
import CountUp from './CountUp';

/** Profile photo lives in /public. Replace the file to update it. */
const PHOTO_SRC = '/dev-khatanhar.jpg';

const o2cFlow = [
  { icon: ShoppingCart, label: 'Sales Order', code: 'SAP SD', detail: 'SD order processing on SAP S/4HANA for a Retail Greenfield rollout supporting 1,000+ stores across India.' },
  { icon: Truck, label: 'Delivery', code: 'SD ⇄ MM', detail: 'Downstream SD–MM integration validated through SIT and UAT workshops with enterprise end-users.' },
  { icon: Receipt, label: 'Billing', code: 'Pricing', detail: 'Pricing and Billing within the Order-to-Cash design, delivered across 4 major Greenfield Go-Lives.' },
  { icon: Scale, label: 'Settlement', code: 'Chargeback', detail: 'Settlement Management configured for Chargeback sales, processing 50,000+ invoices and POs.' },
  { icon: BarChart3, label: 'Insights', code: 'SAP Reporting', detail: 'Custom SD reports with zero critical post-launch defects, plus executive dashboards on sales data and defect lifecycles.' },
];

const STEP_MS = 3800;

export default function Hero({ onCopyEmail }: { onCopyEmail: () => void }) {
  const { profile } = portfolioData;
  const typed = useTypewriter(profile.rotatingRoles);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [photoOk, setPhotoOk] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % o2cFlow.length), STEP_MS);
    return () => window.clearInterval(t);
  }, [playing]);

  // A render helper (not a component) so the <img> isn't remounted on every typewriter tick.
  const photo = (className: string) =>
    photoOk ? (
      <img
        src={PHOTO_SRC}
        alt={`Portrait of ${profile.name}`}
        className={`${className} object-cover object-top`}
        onError={() => setPhotoOk(false)}
        loading="eager"
      />
    ) : (
      <span className={`${className} grid place-items-center bg-obsidian-800 font-display text-3xl font-bold text-gold-400`}>
        {profile.initials}
      </span>
    );

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20" aria-labelledby="hero-title">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-sapphire-500/20 blur-[120px] dark:bg-sapphire-600/25" aria-hidden />
      <div className="pointer-events-none absolute top-40 -right-20 h-72 w-72 rounded-full bg-gold-400/15 blur-[100px]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div className="animate-fade-up">
          {/* Mobile: photo beside the status badge */}
          <div className="flex items-center gap-4 lg:block">
            <span className="photo-ring shrink-0 rounded-full p-[3px] lg:hidden">
              {photo('h-20 w-20 rounded-full border-2 border-slate-50 dark:border-obsidian-950')}
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-sapphire-500/30 bg-sapphire-500/10 px-3 py-1.5 font-mono text-[11px] text-sapphire-700 sm:text-xs dark:text-cyan-300">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.title} · {profile.company}
            </div>
          </div>

          <h1 id="hero-title" className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:mt-6 sm:text-6xl dark:text-white">
            {profile.name}
          </h1>
          <p className="mt-3 min-h-[2.25rem] font-display text-xl font-semibold sm:mt-4 sm:min-h-[2.5rem] sm:text-3xl" aria-live="off">
            <span className="sr-only">{profile.rotatingRoles.join(', ')}</span>
            <span aria-hidden className="bg-gradient-to-r from-sapphire-600 via-sapphire-500 to-cyan-400 bg-clip-text text-transparent dark:from-sapphire-400 dark:via-cyan-300 dark:to-cyan-400">
              {typed}
            </span>
            <span aria-hidden className="ml-0.5 inline-block h-6 w-[3px] translate-y-1 animate-blink bg-gold-400 sm:h-8" />
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:mt-6 sm:text-lg dark:text-slate-400">
            Big 4 SAP SD professional delivering Retail Greenfield implementations on SAP S/4HANA — Order-to-Cash, Pricing,
            Billing and Settlement Management, from design through go-live support.
          </p>

          <p className="mt-3 hidden items-center gap-1.5 text-sm text-slate-500 sm:flex dark:text-slate-400">
            <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <a href="#engagements" className="btn-primary px-3 sm:px-5">
              <span className="sm:hidden">SAP Work</span>
              <span className="hidden sm:inline">Explore SAP Experience</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={profile.resumeUrl} download="Dev_Khatanhar_Resume.docx" className="btn-gold px-3 sm:px-5">
              <Download className="h-4 w-4" aria-hidden /> Resume
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6">
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

          {/* Mobile stats row */}
          <dl className="mt-7 grid grid-cols-3 gap-2 lg:hidden">
            {profile.heroStats.map((s) => (
              <div key={s.label} className="glass px-3 py-3 text-center">
                <dd className="font-display text-xl font-bold text-gold-500 dark:text-gold-400"><CountUp value={s.value} /></dd>
                <dt className="mt-0.5 text-[10px] leading-tight text-slate-500 dark:text-slate-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Desktop: portrait with floating stat chips */}
        <div className="relative hidden justify-center lg:flex animate-fade-up [animation-delay:150ms]">
          <div className="relative">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-sapphire-500/25 blur-3xl" aria-hidden />
            <span className="photo-ring block rounded-full p-1">
              {photo('h-72 w-72 rounded-full border-4 border-slate-50 xl:h-80 xl:w-80 dark:border-obsidian-950')}
            </span>
            {profile.heroStats.map((s, i) => (
              <div
                key={s.label}
                className={`glass absolute flex items-center gap-2.5 !bg-white/95 px-3.5 py-2.5 shadow-xl animate-[float_6s_ease-in-out_infinite] dark:!bg-obsidian-900/95 ${
                  // Corners of the square frame sit outside the circular photo, so the chips never cover the face.
                  ['-left-14 top-0', '-right-14 top-10', '-left-14 bottom-10'][i]
                }`}
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                <span className="font-display text-xl font-bold text-gold-500 dark:text-gold-400"><CountUp value={s.value} /></span>
                <span className="max-w-[90px] text-[11px] leading-tight text-slate-600 dark:text-slate-300">{s.label}</span>
              </div>
            ))}
            <div className="glass absolute -bottom-2 -right-6 flex items-center gap-2 !bg-white/95 px-3 py-2 text-xs font-medium text-slate-700 shadow-xl dark:!bg-obsidian-900/95 dark:text-slate-200">
              <Building2 className="h-4 w-4 text-sapphire-500" aria-hidden /> {profile.company}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Order-to-Cash stepper */}
      <div className="relative mx-auto mt-10 max-w-6xl px-4 sm:mt-16 sm:px-6">
        <div
          className="glass p-4 sm:p-6"
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="eyebrow">Order-to-Cash · what I deliver</p>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-900/5 dark:text-slate-400 dark:hover:bg-white/5"
              aria-label={playing ? 'Pause the process walkthrough' : 'Play the process walkthrough'}
            >
              {playing ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
              <span className="hidden sm:inline">{playing ? 'Pause' : 'Play'}</span>
            </button>
          </div>

          <div role="tablist" aria-label="Order-to-Cash steps" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 sm:grid sm:grid-cols-5">
            {o2cFlow.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="o2c-detail"
                  onClick={() => {
                    setStep(i);
                    setPlaying(false);
                  }}
                  className={`group relative flex shrink-0 items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 ${
                    active
                      ? 'border-sapphire-500 bg-sapphire-500/10'
                      : 'border-slate-200 hover:border-sapphire-500/50 dark:border-white/10'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                      active ? 'bg-sapphire-500 text-white' : done ? 'bg-sapphire-500/15 text-sapphire-600 dark:text-cyan-300' : 'bg-slate-900/5 text-slate-500 dark:bg-white/5 dark:text-slate-400'
                    }`}
                  >
                    <s.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{s.label}</span>
                    <span className="block font-mono text-[10px] text-slate-500 dark:text-slate-400">{s.code}</span>
                  </span>
                  {active && playing && (
                    <span
                      key={step}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sapphire-500 to-cyan-400"
                      style={{ animation: `progress ${STEP_MS}ms linear forwards` }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          <p id="o2c-detail" role="tabpanel" aria-live="polite" key={step} className="mt-4 min-h-[3rem] animate-fade-up text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            <span className="mr-2 font-mono text-xs text-gold-600 dark:text-gold-400">0{step + 1}/0{o2cFlow.length}</span>
            {o2cFlow[step].detail}
          </p>
        </div>
      </div>
    </section>
  );
}
