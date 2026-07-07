// Sliding-window rate limiter keyed by IP, held in module memory.
//
// On Netlify this state lives per warm function instance: it resets on cold
// starts and isn't shared across instances, so it's a soft cap rather than a
// hard guarantee. Combined with Turnstile it's plenty for a contact form; if
// a hard cap is ever needed, swap this module for a Netlify Blobs or Upstash
// backed store — the API route only uses these two functions.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 10_000; // memory guard

const hits = new Map(); // ip → [timestamps of successful submissions]

function prune(ip) {
  const cutoff = Date.now() - WINDOW_MS;
  const recent = (hits.get(ip) || []).filter((t) => t > cutoff);
  if (recent.length) hits.set(ip, recent);
  else hits.delete(ip);
  return recent;
}

// True when this IP already used up its submissions for the current window.
export function isRateLimited(ip) {
  return prune(ip).length >= MAX_PER_WINDOW;
}

// Call only after a submission fully succeeds — the limit counts successful
// sends, not attempts.
export function recordSubmission(ip) {
  if (hits.size >= MAX_TRACKED_IPS && !hits.has(ip)) {
    // Drop the oldest entry rather than growing unbounded.
    const oldest = hits.keys().next().value;
    hits.delete(oldest);
  }
  hits.set(ip, [...prune(ip), Date.now()]);
}
