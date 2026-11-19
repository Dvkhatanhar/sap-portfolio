import { useState } from 'react';
import { Briefcase, Building2, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { skillName } from '../lib/skills';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const PREVIEW_COUNT = 2;
const TAG_PREVIEW = 6;

export default function Timeline() {
  const { experience } = portfolioData;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [allTags, setAllTags] = useState<Record<string, boolean>>({});

  return (
    <section id="experience" className="relative py-14 sm:py-24" aria-label="Career and Experience Timeline">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="02 · Career Timeline" title="Intern to Functional Analyst at Deloitte India">
          Expand a role for the full delivery detail.
        </SectionHeading>

        <ol className="relative space-y-6 border-l border-slate-200 pl-6 sm:space-y-8 sm:pl-10 dark:border-white/10">
          {experience.map((role, idx) => {
            const isOpen = !!expanded[role.id];
            const shown = isOpen ? role.highlights : role.highlights.slice(0, PREVIEW_COUNT);
            const hiddenCount = role.highlights.length - PREVIEW_COUNT;
            const listId = `role-${role.id}-details`;
            const tags = allTags[role.id] ? role.skills : role.skills.slice(0, TAG_PREVIEW);
            const moreTags = role.skills.length - TAG_PREVIEW;

            return (
              <Reveal as="li" key={role.id} className="relative" delay={idx * 120}>
                <span
                  className={`absolute -left-[33px] top-6 grid h-4 w-4 place-items-center rounded-full border-2 sm:-left-[49px] ${
                    role.current ? 'border-gold-400 bg-gold-400/30' : 'border-sapphire-500 bg-slate-50 dark:bg-obsidian-950'
                  }`}
                  aria-hidden
                >
                  {role.current && <span className="h-1.5 w-1.5 animate-ping rounded-full bg-gold-400" />}
                </span>

                <article className="glass glass-hover p-5 sm:p-7" aria-labelledby={`role-${role.id}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 id={`role-${role.id}`} className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900 sm:text-xl dark:text-white">
                        <Briefcase className="h-5 w-5 text-sapphire-500" aria-hidden />
                        {role.title}
                      </h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" aria-hidden />{role.company}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden />{role.location}</span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs ${
                        role.current
                          ? 'bg-gold-400/15 text-gold-600 dark:text-gold-300'
                          : 'bg-slate-900/5 text-slate-600 dark:bg-white/5 dark:text-slate-300'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" aria-hidden /> {role.start} – {role.end}
                    </span>
                  </div>

                  <p className="mt-4 hidden text-sm text-slate-600 sm:block dark:text-slate-300">{role.summary}</p>

                  <ul id={listId} className="mt-4 space-y-3">
                    {shown.map((h) => (
                      <li key={h.text} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sapphire-500" aria-hidden />
                        <span>
                          {h.text}
                          {h.metric && (
                            <span className="ml-2 inline-block rounded-md bg-gold-400/15 px-2 py-0.5 font-mono text-[11px] font-medium text-gold-600 dark:text-gold-300">
                              {h.metric}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {hiddenCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => ({ ...e, [role.id]: !isOpen }))}
                      aria-expanded={isOpen}
                      aria-controls={listId}
                      className="mt-4 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-sapphire-600 hover:text-sapphire-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 dark:text-cyan-300"
                    >
                      {isOpen ? 'Show less' : `Show ${hiddenCount} more delivery detail${hiddenCount === 1 ? '' : 's'}`}
                      <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                    </button>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-200 pt-4 dark:border-white/10" aria-label="Skills used in this role">
                    {tags.map((id) => (
                      <li key={id} className="rounded-md bg-slate-900/5 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-400">
                        {skillName(id)}
                      </li>
                    ))}
                    {moreTags > 0 && (
                      <li>
                        <button
                          type="button"
                          onClick={() => setAllTags((t) => ({ ...t, [role.id]: !t[role.id] }))}
                          aria-expanded={!!allTags[role.id]}
                          className="rounded-md px-2 py-0.5 font-mono text-[11px] font-medium text-sapphire-600 hover:bg-sapphire-500/10 dark:text-cyan-300"
                        >
                          {allTags[role.id] ? 'less' : `+${moreTags} more`}
                        </button>
                      </li>
                    )}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
