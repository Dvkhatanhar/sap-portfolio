import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Copy, Download, Github, Linkedin, Loader2, Mail, MapPin, RotateCcw, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionHeading from './SectionHeading';

const inquiryTypes = ['Recruiter / Hiring', 'Client / SAP Project', 'Networking'] as const;

interface FormState {
  name: string;
  email: string;
  company: string;
  type: (typeof inquiryTypes)[number];
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = { name: '', email: '', company: '', type: 'Recruiter / Hiring', message: '' };

/** Must match the name of the hidden static form in index.html (Netlify Forms detection). */
const NETLIFY_FORM_NAME = 'contact';
/** Real people take more than a few seconds to fill the form; instant submissions are almost always bots. */
const MIN_FILL_MS = 3000;
const MAX_LINKS = 3;
const REQUEST_TIMEOUT_MS = 15000;

type Status = 'idle' | 'sending' | 'sent' | 'error';

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  else if (/https?:\/\/|www\./i.test(f.name)) e.name = 'Please enter your name without links.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 20) e.message = 'Please write at least 20 characters so I can respond properly.';
  else if ((f.message.match(/https?:\/\/|www\./gi) ?? []).length > MAX_LINKS)
    e.message = `Please include no more than ${MAX_LINKS} links.`;
  return e;
}

async function submitToNetlify(fields: Record<string, string>) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': NETLIFY_FORM_NAME, ...fields }).toString(),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`The form service responded with status ${res.status}.`);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw new Error('The request timed out.');
    if (!navigator.onLine) throw new Error('You appear to be offline.');
    throw err instanceof Error ? err : new Error('Network error.');
  } finally {
    window.clearTimeout(timer);
  }
}

export default function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  const { profile } = portfolioData;
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorDetail, setErrorDetail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const shownAt = useRef(Date.now());

  // Restart the time trap whenever a fresh form is shown.
  useEffect(() => {
    if (status === 'idle') shownAt.current = Date.now();
  }, [status]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof FormState) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return; // guard against double submits
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(`field-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    // Honeypot filled → a bot. Pretend success so it learns nothing, but send nothing.
    if (honeypot) {
      setStatus('sent');
      return;
    }
    if (Date.now() - shownAt.current < MIN_FILL_MS) {
      setErrorDetail('That was faster than a person can type. Please wait a moment and try again.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await submitToNetlify({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        type: form.type,
        message: form.message.trim(),
        'bot-field': honeypot,
      });
      setStatus('sent');
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const reset = () => {
    setForm(empty);
    setErrors({});
    setTouched({});
    setHoneypot('');
    setErrorDetail('');
    setStatus('idle');
  };

  // Keep what the visitor typed so they can retry without re-entering it.
  const backToForm = () => {
    setErrorDetail('');
    setStatus('idle');
  };

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    `${form.type} inquiry from ${form.name.trim() || 'your portfolio'}`,
  )}&body=${encodeURIComponent(form.message.trim())}`;

  const fieldError = (k: keyof FormState) => (touched[k] ? errors[k] : undefined);

  return (
    <section id="contact" className="relative overflow-hidden py-14 sm:py-24" aria-label="Contact">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-sapphire-600/15 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="06 · Let's Talk" title="Planning an S/4HANA rollout or hiring for SAP SD?">
          Whether you're a recruiter, a client team scoping an Order-to-Cash initiative, or a fellow consultant —
          send a note and I'll get back to you.
        </SectionHeading>

        {/* Phones: one compact row of contact actions instead of the full sidebar */}
        <div className="mb-4 grid grid-cols-4 gap-2 lg:hidden">
          <a href={`mailto:${profile.email}`} className="glass flex flex-col items-center gap-1 py-3 text-[11px] font-medium text-slate-700 dark:text-slate-200">
            <Mail className="h-4 w-4 text-sapphire-500" aria-hidden /> Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="glass flex flex-col items-center gap-1 py-3 text-[11px] font-medium text-slate-700 dark:text-slate-200" aria-label="LinkedIn profile (opens in new tab)">
            <Linkedin className="h-4 w-4 text-sapphire-500" aria-hidden /> LinkedIn
          </a>
          <button type="button" onClick={onCopyEmail} className="glass flex flex-col items-center gap-1 py-3 text-[11px] font-medium text-slate-700 dark:text-slate-200">
            <Copy className="h-4 w-4 text-sapphire-500" aria-hidden /> Copy
          </button>
          <a href={profile.resumeUrl} download="Dev_Khatanhar_Resume.docx" className="glass flex flex-col items-center gap-1 py-3 text-[11px] font-medium text-slate-700 dark:text-slate-200">
            <Download className="h-4 w-4 text-gold-500" aria-hidden /> Resume
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="glass hidden flex-col gap-4 p-6 lg:flex">
            <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 rounded-xl p-2 -m-2 transition hover:bg-slate-900/5 dark:hover:bg-white/5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sapphire-500/10 text-sapphire-600 dark:text-cyan-300"><Mail className="h-5 w-5" aria-hidden /></span>
              <span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">Email</span>
                <span className="block break-all text-sm font-medium text-slate-800 group-hover:text-sapphire-600 dark:text-slate-100 dark:group-hover:text-cyan-300">{profile.email}</span>
              </span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl p-2 -m-2 transition hover:bg-slate-900/5 dark:hover:bg-white/5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sapphire-500/10 text-sapphire-600 dark:text-cyan-300"><Linkedin className="h-5 w-5" aria-hidden /></span>
              <span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">LinkedIn</span>
                <span className="block text-sm font-medium text-slate-800 group-hover:text-sapphire-600 dark:text-slate-100 dark:group-hover:text-cyan-300">in/dvkhatanhar</span>
              </span>
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl p-2 -m-2 transition hover:bg-slate-900/5 dark:hover:bg-white/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sapphire-500/10 text-sapphire-600 dark:text-cyan-300"><Github className="h-5 w-5" aria-hidden /></span>
                <span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">GitHub</span>
                  <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">{profile.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </span>
              </a>
            )}
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sapphire-500/10 text-sapphire-600 dark:text-cyan-300"><MapPin className="h-5 w-5" aria-hidden /></span>
              <span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">Based in</span>
                <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">{profile.location}</span>
              </span>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10">
              <button type="button" onClick={onCopyEmail} className="btn-ghost py-2.5 text-xs">
                <Copy className="h-3.5 w-3.5" aria-hidden /> Copy Email
              </button>
              <a href={profile.resumeUrl} download="Dev_Khatanhar_Resume.docx" className="btn-gold py-2.5 text-xs">
                <Download className="h-3.5 w-3.5" aria-hidden /> Resume
              </a>
            </div>
          </aside>

          <div className="glass p-5 sm:p-8">
            {status === 'sent' ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-slate-900 dark:text-white">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
                  Thanks, {form.name.trim().split(' ')[0]} — your {form.type.toLowerCase()} inquiry is on its way. I'll reply to {form.email.trim()} soon.
                </p>
                <button type="button" onClick={reset} className="btn-ghost mt-6">Send another message</button>
              </div>
            ) : status === 'error' ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center" role="alert">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-rose-500/15 text-rose-500">
                  <AlertCircle className="h-8 w-8" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-slate-900 dark:text-white">Message not sent</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
                  {errorDetail} Your message is still here — try again, or email me directly instead.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={backToForm} className="btn-primary">
                    <RotateCcw className="h-4 w-4" aria-hidden /> Back to form
                  </button>
                  <a href={mailtoFallback} className="btn-ghost">
                    <Mail className="h-4 w-4" aria-hidden /> Email instead
                  </a>
                </div>
              </div>
            ) : (
              <form
                name={NETLIFY_FORM_NAME}
                onSubmit={submit}
                noValidate
                className="grid gap-5"
                aria-label="Contact form"
              >
                {/* Honeypot: hidden from people and assistive tech; bots that fill every field get filtered out. */}
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="field-bot">Leave this field empty</label>
                  <input
                    id="field-bot"
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">I'm reaching out as a</legend>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map((t) => (
                      <label key={t} className={`chip cursor-pointer py-2 text-sm ${form.type === t ? 'chip-active' : 'chip-idle'}`}>
                        <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => update('type', t)} className="sr-only" />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" required error={fieldError('name')}>
                    <input id="field-name" className="input" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} onBlur={() => blur('name')} aria-invalid={!!fieldError('name')} aria-describedby={fieldError('name') ? 'err-name' : undefined} />
                  </Field>
                  <Field id="email" label="Email" required error={fieldError('email')}>
                    <input id="field-email" type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} onBlur={() => blur('email')} aria-invalid={!!fieldError('email')} aria-describedby={fieldError('email') ? 'err-email' : undefined} />
                  </Field>
                </div>
                <Field id="company" label="Company / Organisation" hint="Optional">
                  <input id="field-company" className="input" autoComplete="organization" value={form.company} onChange={(e) => update('company', e.target.value)} />
                </Field>
                <Field id="message" label="Message" required error={fieldError('message')}>
                  <textarea id="field-message" rows={5} className="input resize-y" value={form.message} onChange={(e) => update('message', e.target.value)} onBlur={() => blur('message')} aria-invalid={!!fieldError('message')} aria-describedby={fieldError('message') ? 'err-message' : 'msg-count'} />
                  <span id="msg-count" className="mt-1 block text-right font-mono text-[11px] text-slate-400">{form.message.trim().length} / 20 min</span>
                </Field>

                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:justify-self-start">
                  {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</> : <><Send className="h-4 w-4" aria-hidden /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, required, hint, error, children }: { id: string; label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>
          {label} {required && <span className="text-rose-500" aria-hidden>*</span>}
        </span>
        {hint && <span className="text-xs font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-1.5 text-xs font-medium text-rose-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
