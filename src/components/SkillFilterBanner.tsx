import { Filter, X } from 'lucide-react';
import { skillName } from '../lib/skills';

interface Props {
  activeSkill: string | null;
  onClear: () => void;
  matches: number;
  noun: string;
}

export default function SkillFilterBanner({ activeSkill, onClear, matches, noun }: Props) {
  if (!activeSkill) return null;
  return (
    <div
      className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-gold-400/40 bg-gold-400/10 px-4 py-3 text-sm"
      role="status"
    >
      <Filter className="h-4 w-4 text-gold-500" aria-hidden />
      <span className="text-slate-700 dark:text-slate-200">
        {matches === 0 ? (
          <>
            No {noun}s are tagged with{' '}
            <strong className="font-semibold text-gold-600 dark:text-gold-300">{skillName(activeSkill)}</strong> yet — it comes
            from the profile summary.
          </>
        ) : (
          <>
            Highlighting <strong className="font-semibold">{matches}</strong> {noun}
            {matches === 1 ? ' that uses' : 's that use'}{' '}
            <strong className="font-semibold text-gold-600 dark:text-gold-300">{skillName(activeSkill)}</strong>
          </>
        )}
      </span>
      <button
        type="button"
        onClick={onClear}
        className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10"
      >
        <X className="h-3.5 w-3.5" aria-hidden /> Clear filter
      </button>
    </div>
  );
}
