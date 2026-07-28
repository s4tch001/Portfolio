// Security headers for every response served by the Next server (Netlify's
// Next runtime). Mirrored in netlify.toml for CDN-served static assets.
// Turnstile needs script-src + frame-src on challenges.cloudflare.com.
// 'unsafe-eval' is dev-only: React's dev debugging tooling needs eval(),
// production bundles never do.
const isDev = process.env.NODE_ENV === 'development';

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is unavoidable here: the App Router emits ~17 inline
  // <script> blocks per page (RSC flight data, theme-init, JSON-LD). Inline
  // scripts can't carry an integrity attribute, so `experimental.sri` below
  // does NOT cover them — verified by build inspection. Dropping it blocks
  // hydration entirely. The only strict alternative is a per-request nonce,
  // which forces dynamic rendering and gives up static export + CDN caching.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adds integrity="sha256-..." to every emitted <script src>, so a tampered
  // or swapped CDN chunk fails to execute. Covers external chunks only — see
  // the script-src note above for why 'unsafe-inline' still has to stay.
  experimental: { sri: { algorithm: 'sha256' } },
  // No `output: 'export'` — the contact API route needs a server, so the site
  // now deploys through Netlify's Next.js runtime (pages stay pre-rendered;
  // /api/contact becomes a Netlify Function).
  // Netlify's current Next.js adapter serves next/image through its Image CDN.
  images: {
    qualities: [82],
    minimumCacheTTL: 14400,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Netlify already sends max-age=31536000; this adds subdomain
          // coverage. No `preload` — that needs manual submission at
          // hstspreload.org and is hard to reverse.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
