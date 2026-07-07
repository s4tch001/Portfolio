import { validateContact } from '../../lib/validation.js';
import { isRateLimited, recordSubmission } from '../../lib/rate-limit.js';
import { verifyTurnstile } from '../../lib/turnstile.js';
import { sendContactEmail } from '../../lib/brevo.js';

export const runtime = 'nodejs';

const json = (body, status = 200) => Response.json(body, { status });

function clientIp(request) {
  // Netlify sets the real client IP on this header; x-forwarded-for is the
  // fallback for local dev and other hosts.
  return (
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}

export async function POST(request) {
  try {
    const ip = clientIp(request);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ message: 'Invalid request body.' }, 400);
    }
    if (!body || typeof body !== 'object') {
      return json({ message: 'Invalid request body.' }, 400);
    }

    // Honeypot — real visitors never see this field. Pretend success so
    // simple bots don't learn they were caught.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return json({ ok: true, message: 'Message sent.' });
    }

    const { values, errors } = validateContact(body);
    if (Object.keys(errors).length > 0) {
      return json(
        { message: 'Please fix the highlighted fields.', errors },
        400,
      );
    }

    if (isRateLimited(ip)) {
      return json(
        {
          message:
            'You’ve reached the hourly limit for messages. Please try again a bit later.',
        },
        429,
      );
    }

    const human = await verifyTurnstile(body.turnstileToken, ip);
    if (!human) {
      return json(
        {
          message:
            'Verification failed. Please complete the challenge and try again.',
        },
        403,
      );
    }

    await sendContactEmail({
      ...values,
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      submittedAt: new Date().toISOString(),
    });

    recordSubmission(ip);
    return json({ ok: true, message: 'Message sent.' });
  } catch (err) {
    // Full detail stays in the function logs; the client gets a generic note.
    console.error('[contact] unhandled error:', err);
    return json(
      { message: 'Something went wrong on our end. Please try again later.' },
      500,
    );
  }
}
