import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface Props {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /** The intro line is hidden on phones to keep the page short, unless it carries an instruction. */
  showTextOnMobile?: boolean;
}

export default function SectionHeading({ eyebrow, title, children, showTextOnMobile = false }: Props) {
  return (
    <Reveal className="mb-7 max-w-3xl sm:mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:mt-3 sm:text-4xl dark:text-white">{title}</h2>
      {children && (
        <p
          className={`mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:block sm:text-base dark:text-slate-400 ${
            showTextOnMobile ? '' : 'hidden'
          }`}
        >
          {children}
        </p>
      )}
    </Reveal>
  );
}
