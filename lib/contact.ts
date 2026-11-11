export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string; // honeypot
}
export type ContactErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.';
  const len = v.message.trim().length;
  if (len < 10) e.message = 'Write at least 10 characters so I know what you need.';
  else if (len > 4000) e.message = 'Keep the message under 4,000 characters.';
  return e;
}
