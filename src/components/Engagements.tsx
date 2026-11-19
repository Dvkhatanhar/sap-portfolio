import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowDown, Blocks, Cable, ChevronLeft, ChevronRight, Database, Layers, TrendingUp, Workflow, type LucideIcon } from 'lucide-react';
import CountUp from './CountUp';
import { portfolioData, type EngagementCategory } from '../data/portfolio';
import { roleById } from '../lib/skills';
import SectionHeading from './SectionHeading';
import SkillFilterBanner from './SkillFilterBanner';

const categoryMeta: Record<EngagementCategory, { label: string; icon: LucideIcon; tone: string }> = {
  functional: { label: 'Functional / Process', icon: Workflow, tone: 'text-sapphire-700 bg-sapphire-500/10 dark:text-sapphire-300' },
  technical: { label: 'Technical / Data', icon: Database, tone: 'text-cyan-700 bg-cyan-400/10 dark:text-cyan-300' },
  integration: { label: 'Integration', icon: Cable, tone: 'text-gold-600 bg-gold-400/15 dark:text-gold-300' },
};

type TabId = (typeof portfolioData.engagementTabs)[number]['id'];

interface Props {
  activeSkill: string | null;
  onClearSkill: () => void;
}

export default function Engagements({ activeSkill, onClearSkill }: Props) {
  const { engagements, engagementTabs } = portfolioData;
  const [tab, setTab] = useState<TabId>('all');

  const visible = useMemo(
    () => (tab === 'all' ? engagements : engagements.filter((e) => e.category === tab)),
    [tab, engagements],
  );
  const matchCount = activeSkill ? engagements.filter((e) => e.skills.includes(activeSkill)).length : 0;

  // Mobile carousel: track which card is centred, and jump back to the start when the tab changes.
  const panelRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    panelRef.current?.scrollTo({ left: 0 });
    setSlide(0);
  }, [tab]);

  // When a skill is picked elsewhere, bring the first matching card into view in the carousel.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !activeSkill) return;
    const idx = visible.findIndex((e) => e.skills.includes(activeSkill));
    const card = panel.children[idx] as HTMLElement | undefined;
    if (card) panel.scrollTo({ left: card.offsetLeft - panel.offsetLeft - 16, behavior: 'smooth' });
  }, [activeSkill, visible]);

  const onScroll = () => {
    const panel = panelRef.current;
    if (!panel) return;
    const cards = Array.from(panel.children) as HTMLElement[];
    const centre = panel.scrollLeft + panel.clientWidth / 2;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - panel.offsetLeft + c.clientWidth / 2 - centre) < Math.abs(cards[best].offsetLeft - panel.offsetLeft + cards[best].clientWidth / 2 - centre)) best = i;
    });
    setSlide(best);
  };

  const goTo = (i: number) => {
    const panel = panelRef.current;
    const card = panel?.children[i] as HTMLElement | undefined;
    if (panel && card) panel.scrollTo({ left: card.offsetLeft - panel.offsetLeft - 16, behavior: 'smooth' });
  };

  return (
    <section id="engagements" className="py-14 sm:py-24" aria-label="Enterprise SAP Work">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="01 · Enterprise SAP Work" title="SAP engagements, from business challenge to measurable impact">
          Each initiative from my Deloitte India delivery, framed the way a steering committee reads it: the business
          problem, the SAP solution, and the result.
        </SectionHeading>

        <div role="tablist" aria-label="Engagement categories" className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mb-8 sm:px-0">
          {engagementTabs.map((t) => {
            const count = t.id === 'all' ? engagements.length : engagements.filter((e) => e.category === t.id).length;
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                type="button"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls="engagement-panel"
                onClick={() => setTab(t.id)}
                className={`chip shrink-0 py-2 text-sm ${selected ? 'chip-active' : 'chip-idle'}`}
              >
                {t.label}
                <span className={`rounded-full px-1.5 text-[10px] ${selected ? 'bg-white/25' : 'bg-slate-900/5 dark:bg-white/10'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <SkillFilterBanner activeSkill={activeSkill} onClear={onClearSkill} matches={matchCount} noun="engagement" />

        <div
          id="engagement-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          ref={panelRef}
          onScroll={onScroll}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-1 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          {visible.map((e, i) => {
            const meta = categoryMeta[e.category];
            const role = roleById(e.roleId);
            const matched = activeSkill ? e.skills.includes(activeSkill) : null;
            return (
              <article
                key={e.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${visible.length}`}
                className={`glass glass-hover flex w-[86%] shrink-0 snap-center flex-col p-5 sm:p-6 md:w-auto ${matched === true ? 'ring-2 ring-gold-400' : ''} ${
                  matched === false ? 'opacity-40 saturate-50' : ''
                }`}
                aria-labelledby={`eng-${e.id}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.tone}`}>
                    <meta.icon className="h-3.5 w-3.5" aria-hidden /> {meta.label}
                  </span>
                  {role && (
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {role.title} · {role.start} – {role.end}
                    </span>
                  )}
                </div>

                <h3 id={`eng-${e.id}`} className="mt-4 font-display text-xl font-semibold text-slate-900 dark:text-white">
                  {e.title}
                </h3>

                <ol className="mt-5 mb-6 space-y-1">
                  <Step icon={AlertTriangle} label="Business Challenge" tone="text-rose-500">
                    {e.challenge}
                  </Step>
                  <Arrow />
                  <Step icon={Blocks} label="SAP Solution / Module" tone="text-sapphire-500 dark:text-sapphire-300">
                    {e.solution}
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {e.modules.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white/70 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          <Layers className="h-3 w-3" aria-hidden /> {m}
                        </span>
                      ))}
                    </span>
                  </Step>
                  <Arrow />
                  <Step icon={TrendingUp} label="Business Impact" tone="text-emerald-500">
                    {e.impact}
                  </Step>
                </ol>

                <div className="mt-auto border-t border-slate-200 pt-4 sm:pt-5 dark:border-white/10">
                  <p className="font-display text-2xl font-bold text-gold-500 sm:text-3xl dark:text-gold-400">
                    <CountUp value={e.metric.value} />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{e.metric.label}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile carousel controls */}
        {visible.length > 1 && (
          <div className="mt-4 flex items-center justify-between md:hidden">
            <div className="flex gap-1.5" role="group" aria-label="Choose engagement">
              {visible.map((e, i) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show engagement ${i + 1}: ${e.title}`}
                  aria-current={slide === i}
                  className={`h-2 rounded-full transition-all ${slide === i ? 'w-6 bg-sapphire-500' : 'w-2 bg-slate-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => goTo(Math.max(0, slide - 1))} disabled={slide === 0} className="icon-btn h-9 w-9 disabled:opacity-40" aria-label="Previous engagement">
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => goTo(Math.min(visible.length - 1, slide + 1))} disabled={slide === visible.length - 1} className="icon-btn h-9 w-9 disabled:opacity-40" aria-label="Next engagement">
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Step({ icon: Icon, label, tone, children }: { icon: LucideIcon; label: string; tone: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} aria-hidden />
      <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {label}
        </span>
        {children}
      </div>
    </li>
  );
}

function Arrow() {
  return (
    <li aria-hidden className="pl-0.5 text-slate-300 dark:text-slate-600">
      <ArrowDown className="h-3.5 w-3.5" />
    </li>
  );
}
