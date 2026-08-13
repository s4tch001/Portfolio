import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // No `output: 'export'`: the contact API route still needs Netlify's Next.js
  // runtime. Pages remain eligible for static prerendering, while /api/contact
  // deploys as a Netlify Function.
  // Netlify's current Next.js adapter serves next/image through its Image CDN.
  images: {
    qualities: [82],
    minimumCacheTTL: 14400,
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/portfolio', destination: '/#portfolio', permanent: true },
      { source: '/skills', destination: '/#skills', permanent: true },
    ];
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
        ],
      },
    ];
  },
};

export default nextConfig;
