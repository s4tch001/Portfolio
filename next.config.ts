import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // TypeScript 7 is the native Go compiler and no longer exposes the legacy
    // JavaScript Compiler API. Next.js 16.3 can invoke its project-local CLI
    // directly so both `next build` and `npm run typecheck` use TypeScript 7.
    useTypeScriptCli: true,
  },
  // No `output: 'export'`: the contact route runs as a Vercel Function while
  // the public pages remain eligible for static prerendering.
  images: {
    qualities: [82],
    minimumCacheTTL: 14400,
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/services', destination: '/#focus', permanent: true },
      { source: '/portfolio', destination: '/#portfolio', permanent: true },
      { source: '/skills', destination: '/#skills', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:; connect-src 'self'; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
