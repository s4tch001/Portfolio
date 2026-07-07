// Server-side Cloudflare Turnstile verification.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Returns true only when Cloudflare confirms the token. Throws if the secret
// key isn't configured (deployment error, not a visitor error).
export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured');
  }
  if (typeof token !== 'string' || !token) return false;

  const res = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      response: token,
      ...(ip && ip !== 'unknown' ? { remoteip: ip } : {}),
    }),
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data.success === true;
}
