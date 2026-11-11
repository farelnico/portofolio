'use client';

import { Send } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { validateContact, type ContactErrors, type ContactInput } from '@/lib/contact';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; message: string };
type FieldName = 'name' | 'email' | 'subject' | 'message';

const empty: Required<ContactInput> = { name: '', email: '', subject: '', message: '', company: '' };

const inputClass =
  'w-full border-b border-white/20 bg-transparent py-3 text-bone placeholder:text-mist/60 transition-colors focus:border-electric focus:outline-none aria-[invalid=true]:border-rose-400';

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validateContact(next));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const data: { ok?: boolean; code?: string; errors?: ContactErrors } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ state: 'sent' });
        setValues(empty);
        setAttempted(false);
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ state: 'idle' });
        return;
      }
      if (res.status === 501 || data.code === 'not_configured') {
        setStatus({ state: 'error', message: `Your message was not sent: the email service isn't set up on this site yet. Please email ${site.email} directly.` });
        return;
      }
      setStatus({ state: 'error', message: `Your message was not sent because of a server problem. Please try again, or email ${site.email}.` });
    } catch {
      setStatus({ state: 'error', message: 'Your message was not sent. Check your connection and try again.' });
    }
  };

  const field = (name: FieldName, label: string, props: { type?: string; autoComplete?: string } = {}) => (
    <div>
      <label htmlFor={`contact-${name}`} className="text-sm text-mist">{label}</label>
      <input
        id={`contact-${name}`}
        name={name}
        value={values[name]}
        onChange={onChange}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        className={inputClass}
        {...props}
      />
      {errors[name] && <p id={`contact-${name}-error`} className="mt-2 text-sm text-rose-300">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {field('name', 'Name', { autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
      </div>
      {field('subject', 'Subject')}
      <div>
        <label htmlFor="contact-message" className="text-sm text-mist">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputClass, 'resize-none')}
        />
        {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-rose-300">{errors.message}</p>}
      </div>

      {/* Honeypot: disembunyikan dari pengguna, dibaca bot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} /></label>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status.state === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-electric hover:text-white disabled:opacity-60"
        >
          {status.state === 'sending' ? 'Sending...' : 'Send Message'} <Send size={16} aria-hidden />
        </button>
        <p role="status" aria-live="polite" className={cn('max-w-sm text-sm', status.state === 'error' ? 'text-rose-300' : 'text-electric-soft')}>
          {status.state === 'sent' && 'Message sent. I will reply to your email soon.'}
          {status.state === 'error' && status.message}
        </p>
      </div>
    </form>
  );
}
