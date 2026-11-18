import { useMemo, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowDown, Blocks, Cable, Database, Layers, TrendingUp, Workflow, type LucideIcon } from 'lucide-react';
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

  return (
    <section id="engagements" className="py-20 sm:py-28" aria-label="Enterprise SAP Work">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="01 · Enterprise SAP Work" title="SAP engagements, from business challenge to measurable impact">
          Each initiative from my Deloitte India delivery, framed the way a steering committee reads it: the business
          problem, the SAP solution, and the result.
        </SectionHeading>

        <div role="tablist" aria-label="Engagement categories" className="mb-8 flex gap-2 overflow-x-auto pb-1">
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

        <div id="engagement-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="grid gap-5 md:grid-cols-2">
          {visible.map((e) => {
            const meta = categoryMeta[e.category];
            const role = roleById(e.roleId);
            const matched = activeSkill ? e.skills.includes(activeSkill) : null;
            return (
              <article
                key={e.id}
                className={`glass glass-hover flex flex-col p-6 ${matched === true ? 'ring-2 ring-gold-400' : ''} ${
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

                <div className="mt-auto border-t border-slate-200 pt-5 dark:border-white/10">
                  <p className="font-display text-3xl font-bold text-gold-500 dark:text-gold-400">{e.metric.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{e.metric.label}</p>
                </div>
              </article>
            );
          })}
        </div>
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
