# Pau / P-Devs Portfolio

Personal portfolio for [pauuu.dev](https://pauuu.dev), showcasing Pau's work as a Filipino full-stack web developer under the P-Devs brand.

The site is a type-safe, style-switchable Next.js portfolio with project case studies, demo previews, technical focus areas, skills, a validated contact flow, SEO metadata, and machine-readable context for search and AI systems.

## Live site

- Website: [https://pauuu.dev](https://pauuu.dev)
- Source repository: [github.com/s4tch001/Portfolio](https://github.com/s4tch001/Portfolio)

The canonical host is `pauuu.dev`. `www.pauuu.dev` redirects to the canonical non-`www` host.

## Public routes

| Route      | Purpose                                                                                |
| ---------- | -------------------------------------------------------------------------------------- |
| `/`        | Homepage with the hero, profile, focus areas, featured work, skills, and contact sections |
| `/contact` | General contact form                                                                     |

## Stack

- Next.js 16.3 App Router with Turbopack
- React 19 and strict TypeScript 7 using the native CLI integration
- Motion for React 13 for hero animation, reveal effects, and interaction feedback
- Zod and React Hook Form for shared client/server contact validation
- Vercel Next.js runtime
- Brevo for contact email delivery
- Cloudflare Turnstile for contact form protection
- IndexNow support for search update notifications

## Features

- Static metadata per route: title, description, canonical, Open Graph, and Twitter cards
- `Person`, `ProfilePage`, `WebSite`, and portfolio `ItemList` JSON-LD
- Image-aware `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, and detailed `public/llms-full.txt`
- Six visual styles with persistent style switching
- Dark and light themes without a first-paint flash
- Motion-powered hero visuals, section reveals, marquee movement, and hover/tap feedback
- User-preference-aware reduced-motion behavior through a shared `MotionConfig`
- Responsive project galleries and fullscreen image lightbox
- A self-referential P-Devs Portfolio case study showcasing every page style
- Production project links and isolated portfolio demo previews
- Zod-validated contact forms powered by React Hook Form on both `/` and `/contact`
- Server-side validation, rate limiting, honeypot filtering, and Cloudflare Turnstile protection
- Content Security Policy configured for the production environment
- Brevo contact email delivery
- Custom 404 page that follows the active portfolio style
- Mobile-aware motion startup, contained typewriter layout, and deferred gallery hydration

## Requirements

- Git
- Node.js 20.9 or newer
- npm

## Local setup

```powershell
git clone https://github.com/s4tch001/Portfolio.git
cd Portfolio
npm install
```

Create an ignored `.env.local` file when working with the contact form or the protected IndexNow API route:

```text
BREVO_API_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
INDEXNOW_SUBMIT_TOKEN=
```

Never commit `.env.local`, API keys, tokens, service keys, database passwords, or provider credentials.

## Run locally

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Build and run production locally

```powershell
npm run build
npm start
```

Run the type checker and contact validation tests before shipping changes:

```powershell
npm run typecheck
npm run test:validation
```

TypeScript 7 is the native Go-based compiler. The project enables Next.js
16.3's `experimental.useTypeScriptCli` integration so both the standalone
typecheck and the production build use the project-local TypeScript 7 CLI.

## Performance verification

The homepage keeps its initial mobile work focused on the hero:

- Motion uses the tree-shakable `LazyMotion` and `m` APIs with the `domAnimation` feature bundle
- Continuous visual motion is limited to small transform-based movements, with static fallbacks for reduced-motion users
- Decorative mobile motion starts after the startup window or first interaction
- The typewriter retains its effect inside a fixed, layout-contained text slot
- The marquee uses two text tracks instead of 50 individual item elements
- Project galleries share one intersection observer and hydrate only near the viewport
- Contact form code and Cloudflare Turnstile remain deferred until needed on the homepage

Local production Lighthouse results on August 13, 2026 (`next start`, latest
Lighthouse CLI, simulated mobile; mobile values are the median of five runs):

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 98 | 100 |
| First Contentful Paint | 0.92 s | 0.28 s |
| Largest Contentful Paint | 2.41 s | 0.50 s |
| Total Blocking Time | 10 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 1.04 s | 0.32 s |

These are reproducible lab measurements, not field Core Web Vitals. Production
results can vary with the device, connection, Vercel region, browser
state, and selected visual style.

## Search and AI discovery

- Route metadata and global identity JSON-LD: `app/layout.tsx`
- Shared route metadata and JSON-LD serialization: `app/lib/seo.ts`
- Portfolio project structured data: `app/page.tsx`
- Crawl policy and sitemap: `public/robots.txt` and `public/sitemap.xml`
- AI-readable site context: `public/llms.txt` and `public/llms-full.txt`
- IndexNow submission script: `scripts/submit-indexnow.ts`

After a production deployment, submit the existing sitemap in Google Search Console and run `npm run indexnow` when search update notifications are needed. The IndexNow script reads the canonical URLs from `public/sitemap.xml`.

## Deploy to Vercel

The repository is connected to the `pau-portfolio` Vercel project. Vercel detects the Next.js App Router and uses `npm run build`; security and cache headers are defined in `next.config.ts`. Set Brevo and Turnstile credentials in Vercel project environment variables before deploying.

### Vercel Analytics and Speed Insights

`<Analytics />` and `<SpeedInsights />` are mounted once in `app/layout.tsx`. After a production deployment, enable **Web Analytics** and **Speed Insights** in the Vercel project dashboard. They do not collect data during local development and require no application environment variables.

## Editing guide

- Homepage composition: `app/page.tsx`
- Public route pages: `app/page.tsx` and `app/contact/page.tsx`
- Projects and gallery data: `app/data/projects.ts`
- Project screenshots: `public/assets/projects/`
- Shared content sections: `app/components/`
- Global styles: `app/globals.css`
- Alternate visual styles: `public/styles/`
- Style switcher: `app/components/StyleSwitcher.tsx`
- Contact and IndexNow server routes: `app/api/`

## Public repository safety

This repository is intended to be safe for public viewing. Commit application code, public assets, documentation, `package.json`, and `package-lock.json`. Keep secrets in Vercel environment variables or ignored local files only.

Generated folders such as `node_modules/`, `.next/`, `out/`, `.netlify/`, and `.vercel/` are ignored and should not be committed.
