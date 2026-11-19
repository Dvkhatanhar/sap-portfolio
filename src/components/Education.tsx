import { BadgeCheck, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from './SectionHeading';

export default function Education() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="py-14 sm:py-24" aria-label="Education and Certifications">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="05 · Education & Certifications" title="Engineering foundation, SAP-certified delivery" />

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {education.map((ed) => (
            <article key={ed.degree} className="glass glass-hover relative overflow-hidden p-5 sm:p-7">
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-sapphire-500/15 blur-3xl" aria-hidden />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sapphire-600 to-cyan-400 text-white">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold sm:mt-5 sm:text-2xl text-slate-900 dark:text-white">{ed.degree}</h3>
              <p className="mt-2 text-base font-medium text-sapphire-700 dark:text-cyan-300">{ed.institution}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden />{ed.location}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden />{ed.start} – {ed.end}</span>
              </div>
              <p className="mt-5 inline-flex rounded-full bg-gold-400/15 px-3 py-1 font-mono text-xs text-gold-600 dark:text-gold-300">
                Graduated {ed.end.split(' ').pop()}
              </p>
            </article>
          ))}

          <div className="grid gap-3 sm:gap-4">
            {certifications.map((c) => (
              <article key={c.name} className="glass glass-hover flex items-center gap-4 p-4 sm:p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-600 dark:text-gold-300">
                  <BadgeCheck className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{c.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.issuer || 'Professional certification'}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
