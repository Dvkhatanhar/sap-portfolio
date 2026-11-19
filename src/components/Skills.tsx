import { useState } from 'react';
import { Boxes, Code2, MousePointerClick, Wrench, type LucideIcon } from 'lucide-react';
import { portfolioData, type SkillCategory } from '../data/portfolio';
import { skillName, skillUsage } from '../lib/skills';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  functional: Boxes,
  technical: Code2,
  tools: Wrench,
};

interface Props {
  activeSkill: string | null;
  onSelectSkill: (id: string | null) => void;
}

export default function Skills({ activeSkill, onSelectSkill }: Props) {
  const { skills, skillCategories, experience, engagements } = portfolioData;

  const matchedRoles = activeSkill ? experience.filter((r) => r.skills.includes(activeSkill)) : [];
  const matchedEngagements = activeSkill ? engagements.filter((e) => e.skills.includes(activeSkill)) : [];
  // Phones show one category at a time; desktop shows all three side by side.
  const [mobileCat, setMobileCat] = useState<SkillCategory>(skillCategories[0].id);

  return (
    <section id="skills" className="py-14 sm:py-24" aria-label="SAP Ecosystem and Technical Skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="04 · SAP Ecosystem & Skills" title="Skills matrix, linked to real delivery" showTextOnMobile>
          Tap any capability to see the roles and SAP engagements where it was applied.
        </SectionHeading>

        <div role="tablist" aria-label="Skill categories" className="mb-4 grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white/60 p-1 lg:hidden dark:border-white/10 dark:bg-white/5">
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const selected = mobileCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setMobileCat(cat.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition ${
                  selected ? 'bg-sapphire-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {{ functional: 'Functional', technical: 'Technical', tools: 'Tools' }[cat.id]}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = categoryIcons[cat.id];
            return (
              <Reveal key={cat.id} delay={i * 100} className={`${mobileCat === cat.id ? '' : 'hidden'} lg:block`}>
              <div className="glass h-full p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-sapphire-500/10 text-sapphire-600 dark:text-cyan-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{cat.title}</h3>
                </div>
                <p className="mt-2 hidden text-sm text-slate-500 sm:block dark:text-slate-400">{cat.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                  {skills
                    .filter((s) => s.category === cat.id)
                    .map((s) => {
                      const usage = skillUsage(s.id);
                      const selected = activeSkill === s.id;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => onSelectSkill(selected ? null : s.id)}
                            aria-pressed={selected}
                            title={`${usage.roles} role(s), ${usage.engagements} engagement(s)`}
                            className={`chip py-1.5 ${selected ? 'border-gold-400 bg-gold-400 text-obsidian-950 shadow-md shadow-gold-500/20' : 'chip-idle'}`}
                          >
                            {s.name}
                            <span
                              className={`rounded-full px-1.5 font-mono text-[10px] ${
                                selected ? 'bg-obsidian-950/15' : 'bg-slate-900/5 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                              }`}
                              aria-label={`used in ${usage.roles + usage.engagements} places`}
                            >
                              {usage.roles + usage.engagements}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
              </Reveal>
            );
          })}
        </div>

        <div className="glass mt-4 p-5 sm:mt-5 sm:p-6" aria-live="polite">
          {activeSkill ? (
            <div className="grid gap-6 md:grid-cols-[auto_1fr_1fr] md:items-start">
              <div>
                <p className="eyebrow">Applied in</p>
                <p className="mt-2 font-display text-lg font-semibold text-gold-600 dark:text-gold-300">{skillName(activeSkill)}</p>
                <button type="button" onClick={() => onSelectSkill(null)} className="mt-2 text-xs font-medium text-slate-500 underline-offset-2 hover:underline dark:text-slate-400">
                  Clear selection
                </button>
              </div>
              <LinkList title="Roles" href="#experience" items={matchedRoles.map((r) => `${r.title} · ${r.company}`)} />
              <LinkList title="SAP Engagements" href="#engagements" items={matchedEngagements.map((e) => e.title)} />
            </div>
          ) : (
            <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MousePointerClick className="h-4 w-4 text-sapphire-500" aria-hidden />
              Select a skill above to see exactly where it was used.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function LinkList({ title, href, items }: { title: string; href: string; items: string[] }) {
  return (
    <div>
      <a href={href} className="text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-sapphire-600 dark:text-slate-400 dark:hover:text-cyan-300">
        {title} ({items.length}) →
      </a>
      {items.length ? (
        <ul className="mt-2 space-y-1.5">
          {items.map((i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-200">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Listed in the profile summary; not tied to a specific {title === 'Roles' ? 'role' : 'engagement'} yet.</p>
      )}
    </div>
  );
}
