# Pau - Portfolio

Personal portfolio of Pau: web developer, musician, and gamer. Built with Next.js
16 App Router and React 19, then deployed through the Netlify Next.js runtime.

> **Private backup repository:** `.env.local` is intentionally included for
> disaster recovery. Never make this repository public.

## Features

- Pre-rendered pages with SEO metadata, Open Graph, and JSON-LD
- Six visual styles with a persistent style switcher
- Dark and light themes without a first-paint flash
- Project slideshows and fullscreen image lightbox
- Contact API backed by Brevo and protected by Cloudflare Turnstile

## Requirements

- Git
- Node.js 20 or newer

## Restore and install

```powershell
git clone https://github.com/s4tch001/Portfolio.git
cd Portfolio
npm install
```

The contact form uses these values from the backed-up `.env.local`:

```text
BREVO_API_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

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

## Deploy to Netlify

`netlify.toml` configures `npm run build`, the `.next` publish output, and the
Netlify Next.js plugin. Connect the repository to Netlify and copy the three
environment variables above into the site's environment settings.

## Editing content

- Projects: `app/data/projects.js`
- Screenshots: `public/assets/projects/`
- About, skills, and contact content: `app/components/`
- Styles: `app/styles/`, `app/globals.css`, and `StyleSwitcher.jsx`
- SEO metadata and JSON-LD: `app/layout.jsx`

## Backup notes

Commit application files, `package-lock.json`, public assets, and `.env.local`.
`node_modules/`, `.next/`, `out/`, and `.netlify/` are generated and ignored.
