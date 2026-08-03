# Pau / P-Devs Portfolio

Personal portfolio for [pauuu.dev](https://pauuu.dev), showcasing Pau's work as a Filipino full-stack web developer under the P-Devs brand.

The site is a type-safe, style-switchable Next.js portfolio with project case studies, demo previews, services, skills, a validated contact flow, SEO metadata, and machine-readable context for search and AI systems.

## Live site

- Website: [https://pauuu.dev](https://pauuu.dev)
- Source repository: [github.com/s4tch001/Portfolio](https://github.com/s4tch001/Portfolio)

The canonical host is `pauuu.dev`. `www.pauuu.dev` redirects to the canonical non-`www` host.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with the hero, profile, services, featured work, skills, and contact sections |
| `/contact` | Professional project inquiry form |

## Stack

- Next.js 16 App Router
- React 19 and strict TypeScript
- Zod and React Hook Form for shared client/server contact validation
- Netlify Next.js runtime
- Brevo for contact email delivery
- Cloudflare Turnstile for contact form protection
- IndexNow support for search update notifications

## Features

- Static metadata per route: title, description, canonical, Open Graph, and Twitter cards
- `Person`, `ProfilePage`, `WebSite`, and portfolio `ItemList` JSON-LD
- Image-aware `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, and detailed `public/llms-full.txt`
- Six visual styles with persistent style switching
- Dark and light themes without a first-paint flash
- Responsive project galleries and fullscreen image lightbox
- A self-referential P-Devs Portfolio case study showcasing every page style
- Production project links and isolated portfolio demo previews
- Zod-validated contact forms powered by React Hook Form on both `/` and `/contact`
- Server-side validation, rate limiting, honeypot filtering, and Cloudflare Turnstile protection
- Per-request nonce-based Content Security Policy with CSP-safe Zod validation
- Brevo contact email delivery
- Custom 404 page that follows the active portfolio style

## Requirements

- Git
- Node.js 20 or newer
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

## Search and AI discovery

- Route metadata and global identity JSON-LD: `app/layout.tsx`
- Shared route metadata and JSON-LD serialization: `app/lib/seo.ts`
- Portfolio project structured data: `app/page.tsx`
- Crawl policy and sitemap: `public/robots.txt` and `public/sitemap.xml`
- AI-readable site context: `public/llms.txt` and `public/llms-full.txt`
- IndexNow submission script: `scripts/submit-indexnow.ts`

After a production deployment, submit the existing sitemap in Google Search Console and run `npm run indexnow` when search update notifications are needed. The IndexNow script reads the canonical URLs from `public/sitemap.xml`.

## Deploy to Netlify

`netlify.toml` configures the `npm run build` command, `.next` publish output, security headers, asset caching, and the Netlify Next.js runtime. Connect the repository to Netlify and set the server-side environment variables in the site's environment settings.

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

This repository is intended to be safe for public viewing. Commit application code, public assets, documentation, `package.json`, and `package-lock.json`. Keep secrets in Netlify environment variables or ignored local files only.

Generated folders such as `node_modules/`, `.next/`, `out/`, and `.netlify/` are ignored and should not be committed.
