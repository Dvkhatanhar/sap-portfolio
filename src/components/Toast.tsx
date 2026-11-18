import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }: { message: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
        message ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {message && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-xl dark:bg-obsidian-800 dark:text-slate-100">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />
          {message}
        </div>
      )}
    </div>
  );
}
