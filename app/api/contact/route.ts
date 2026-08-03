import { validateContact } from '../../lib/validation';
import { isRateLimited, recordSubmission } from '../../lib/rate-limit';
import { verifyTurnstile } from '../../lib/turnstile';
import { sendContactEmail } from '../../lib/brevo';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 20_000;

const json = <T,>(body: T, status = 200): Response =>
  Response.json(body, { status });

function clientIp(request: Request): string {
  // Netlify sets the real client IP on this header; x-forwarded-for is the
  // fallback for local dev and other hosts.
  return (
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for')?.split(',').at(0)?.trim() ||
    'unknown'
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const ip = clientIp(request);

    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return json({ message: 'Request body is too large.' }, 413);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ message: 'Invalid request body.' }, 400);
    }
    if (!isRecord(body)) {
      return json({ message: 'Invalid request body.' }, 400);
    }

    // Honeypot — real visitors never see this field. Pretend success so
    // simple bots don't learn they were caught.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return json({ ok: true, message: 'Message sent.' });
    }

    const validation = validateContact(body);
    if (!validation.success) {
      return json(
        { message: 'Please fix the highlighted fields.', errors: validation.errors },
        400,
      );
    }

    if (await isRateLimited(ip)) {
      return json(
        {
          message:
            'You’ve reached the hourly limit for messages. Please try again a bit later.',
        },
        429,
      );
    }

    const turnstileToken =
      typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
    const human = await verifyTurnstile(turnstileToken, ip);
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
      ...validation.values,
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      submittedAt: new Date().toISOString(),
    });

    await recordSubmission(ip);
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
