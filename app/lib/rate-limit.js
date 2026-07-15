// Sliding-window rate limiter keyed by IP, backed by Netlify Blobs.
//
// Blobs is shared across every function instance and survives cold starts, so
// unlike the previous in-memory Map this is a real cap rather than a per-
// instance soft one. Outside Netlify (local `next dev`, tests) the Blobs env
// isn't configured, so we transparently fall back to an in-memory Map — dev
// keeps working, production gets the durable store.

import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;
const STORE_NAME = 'contact-rate-limit';

// In-memory fallback for local dev only.
const memory = new Map();
const MAX_TRACKED_IPS = 10_000; // memory guard for the fallback path

// IPs are hashed before use as a blob key: keeps raw addresses out of storage
// keys, and sidesteps the key charset rules (IPv6 contains colons).
function keyFor(ip) {
  return createHash('sha256').update(String(ip)).digest('hex').slice(0, 32);
}

// Returns the Blobs store, or null when the environment isn't available.
// `strong` consistency means a read always reflects the last write, which the
// read-modify-write below depends on.
function store() {
  try {
    return getStore({ name: STORE_NAME, consistency: 'strong' });
  } catch {
    return null;
  }
}

function fresh(timestamps) {
  const cutoff = Date.now() - WINDOW_MS;
  return (timestamps || []).filter((t) => t > cutoff);
}

async function read(ip) {
  const s = store();
  if (!s) return fresh(memory.get(ip));
  try {
    return fresh(await s.get(keyFor(ip), { type: 'json' }));
  } catch {
    // A Blobs outage must not take the contact form down with it; fall back to
    // the local Map so the limiter degrades instead of throwing.
    return fresh(memory.get(ip));
  }
}

async function write(ip, timestamps) {
  const s = store();
  if (!s) {
    if (memory.size >= MAX_TRACKED_IPS && !memory.has(ip)) {
      memory.delete(memory.keys().next().value);
    }
    memory.set(ip, timestamps);
    return;
  }
  try {
    await s.setJSON(keyFor(ip), timestamps);
  } catch {
    memory.set(ip, timestamps);
  }
}

// True when this IP already used up its submissions for the current window.
export async function isRateLimited(ip) {
  return (await read(ip)).length >= MAX_PER_WINDOW;
}

// Call only after a submission fully succeeds — the limit counts successful
// sends, not attempts.
//
// Note: this is a read-modify-write, not an atomic increment (Blobs has no
// compare-and-swap), so two requests racing from the same IP at the exact same
// moment can each read the same count and both write. Worst case that lets a
// single extra message through per race; Turnstile gates each attempt, so
// mounting that deliberately means solving a fresh challenge for every
// concurrent request.
export async function recordSubmission(ip) {
  await write(ip, [...(await read(ip)), Date.now()]);
}
