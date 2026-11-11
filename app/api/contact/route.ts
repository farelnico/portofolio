import { NextResponse } from 'next/server';
import { validateContact, type ContactInput } from '@/lib/contact';

export const runtime = 'nodejs';

/**
 * Endpoint form kontak. Pengiriman memakai Resend (https://resend.com).
 * Jika env belum diisi, endpoint mengembalikan 501 dan UI TIDAK menampilkan "terkirim".
 */
export async function POST(req: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: 'bad_request' }, { status: 400 });
  }

  const input: ContactInput = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    subject: String(body.subject ?? ''),
    message: String(body.message ?? ''),
    company: String(body.company ?? ''),
  };

  if (input.company) return NextResponse.json({ ok: true }); // honeypot: bot, abaikan diam-diam

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: 'invalid', errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ ok: false, code: 'not_configured' }, { status: 501 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email.trim(),
        subject: `[Portfolio] ${input.subject.trim()}`,
        text: `From: ${input.name.trim()} <${input.email.trim()}>\n\n${input.message.trim()}`,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, code: 'provider_error' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: 'provider_error' }, { status: 502 });
  }
}
