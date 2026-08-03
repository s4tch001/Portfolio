// Sends the contact-form inquiry through the Brevo transactional email REST
// API (https://developers.brevo.com/reference/sendtransacemail). No SMTP —
// plain HTTPS, so it works fine inside Netlify Functions.

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

const SENDER = { name: 'P-Devs Website', email: 'client-inquiry@pauuu.dev' };
const RECIPIENT = { name: 'Pau', email: 'admin@pauuu.dev' };

interface ContactEmailInput {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
  submittedAt: string;
}

// All user input is HTML-escaped before it touches the email body, so a
// visitor can't inject markup into the inbox view.
function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:#111827;font-size:14px;">${value}</td>
  </tr>`;
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const formatted = new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);

  return `${formatted} (Asia/Manila)`;
}

export async function sendContactEmail({
  name,
  email,
  company,
  subject,
  message,
  ip,
  userAgent,
  submittedAt,
}: ContactEmailInput): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured');
  }

  const displayTimestamp = formatTimestamp(submittedAt);
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company || '—'),
    subject: escapeHtml(subject || '—'),
    message: escapeHtml(message).replace(/\n/g, '<br />'),
    ip: escapeHtml(ip),
    userAgent: escapeHtml(userAgent),
    submittedAt: escapeHtml(displayTimestamp),
  };

  const htmlContent = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 4px;font-size:18px;color:#111827;">New client inquiry</h2>
    <p style="margin:0 0 20px;color:#6b7280;font-size:13px;">Sent from the pauuu.dev contact form</p>
    <table style="border-collapse:collapse;width:100%;">
      ${row('Name', safe.name)}
      ${row('Email', `<a href="mailto:${safe.email}">${safe.email}</a>`)}
      ${row('Company', safe.company)}
      ${row('Subject', safe.subject)}
    </table>
    <div style="margin:18px 0;padding:16px;border:1px solid #e5e7eb;border-radius:10px;color:#111827;font-size:14px;line-height:1.6;">${safe.message}</div>
    <table style="border-collapse:collapse;width:100%;border-top:1px solid #e5e7eb;padding-top:8px;">
      ${row('Timestamp', safe.submittedAt)}
      ${row('Visitor IP', safe.ip)}
      ${row('User agent', safe.userAgent)}
    </table>
  </div>`;

  const textContent = [
    'New client inquiry — pauuu.dev contact form',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '—'}`,
    `Subject: ${subject || '—'}`,
    '',
    'Message:',
    message,
    '',
    `Timestamp: ${displayTimestamp}`,
    `Visitor IP: ${ip}`,
    `User agent: ${userAgent}`,
  ].join('\n');

  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [RECIPIENT],
      replyTo: { email, name },
      subject: `New Client Inquiry - ${subject || 'Website Contact Form'}`,
      htmlContent,
      textContent,
    }),
  });

  if (!res.ok) {
    // Log the detail server-side only; callers surface a generic message.
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo API responded ${res.status}: ${detail.slice(0, 500)}`);
  }
}
