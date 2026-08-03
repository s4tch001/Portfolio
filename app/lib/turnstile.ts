import { z } from 'zod';

// Server-side Cloudflare Turnstile verification.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const turnstileResponseSchema = z.object({
  success: z.boolean(),
  action: z.string().optional(),
  hostname: z.string().optional(),
  'error-codes': z.array(z.string()).optional(),
});

// Returns true only when Cloudflare confirms the token. Throws if the secret
// key isn't configured (deployment error, not a visitor error).
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured');
  }
  if (typeof token !== 'string' || !token) return false;

  const form = new URLSearchParams();
  form.set('secret', secret);
  form.set('response', token);

  const res = await fetch(VERIFY_URL, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    console.error('[turnstile] siteverify request failed:', res.status);
    return false;
  }

  const rawData: unknown = await res.json();
  const parsed = turnstileResponseSchema.safeParse(rawData);
  if (!parsed.success) {
    console.error('[turnstile] invalid siteverify response shape');
    return false;
  }

  const data = parsed.data;
  if (data.success !== true) {
    console.error('[turnstile] verification failed:', {
      action: data.action,
      hostname: data.hostname,
      errors: data['error-codes'],
      ipKnown: Boolean(ip && ip !== 'unknown'),
    });
  }
  return data.success === true;
}
