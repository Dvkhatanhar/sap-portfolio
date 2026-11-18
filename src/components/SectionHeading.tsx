import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, children }: Props) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {children && <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{children}</p>}
    </div>
  );
}
