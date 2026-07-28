# Pau - Portfolio

Personal portfolio for [pauuu.dev](https://pauuu.dev), built to showcase Pau's
work as a full-stack web developer under P-Devs.

The site is a polished, style-switchable Next.js portfolio with production
project case studies, demo links, skills, services, contact flow, SEO metadata,
and public repository hygiene.

## Live Site

- Portfolio: [https://pauuu.dev](https://pauuu.dev)
- GitHub repository: [https://github.com/s4tch001/Portfolio](https://github.com/s4tch001/Portfolio)

## Stack

- Next.js 16 App Router
- React 19
- TypeScript-ready project structure
- Netlify Next.js runtime
- Brevo for contact email delivery
- Cloudflare Turnstile for contact form protection
- IndexNow support for search update pings

## Features

- Pre-rendered portfolio pages with SEO metadata, Open Graph, and JSON-LD
- `llms.txt` for AI crawler guidance
- Six visual styles with persistent style switching
- Dark and light themes without a first-paint flash
- Responsive project galleries and fullscreen image lightbox
- Production project links plus isolated portfolio demo links
- Contact API protected by Turnstile and backed by Brevo
- Custom 404 page that follows the active portfolio style

## Requirements

- Git
- Node.js 20 or newer
- npm

## Local Setup

```powershell
git clone https://github.com/s4tch001/Portfolio.git
cd Portfolio
npm install
```

Create an ignored `.env.local` file when working with the contact form or
IndexNow endpoint.

```text
BREVO_API_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
INDEXNOW_SUBMIT_TOKEN
```

Never commit `.env.local`, API keys, tokens, service keys, database passwords,
or provider credentials.

## Run Locally

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Build and Run Production Locally

```powershell
npm run build
npm start
```

## Deploy to Netlify

`netlify.toml` configures the build command, `.next` output, and Netlify's
Next.js runtime. Connect the repository to Netlify and set the server-side
environment variables in the site's environment settings.

## Editing Guide

- Projects and gallery data: `app/data/projects.js`
- Project screenshots: `public/assets/projects/`
- About, skills, services, contact, and project sections: `app/components/`
- Global styles: `app/globals.css`
- Alternate visual styles: `app/styles/`
- Style switcher: `app/components/StyleSwitcher.jsx`
- SEO metadata and JSON-LD: `app/layout.jsx`
- AI crawler guidance: `public/llms.txt`

## Public Repository Safety

This repository is intended to be safe for public viewing. Commit application
code, public assets, documentation, `package.json`, and `package-lock.json`.
Keep secrets in Netlify environment variables or ignored local files only.

Generated folders such as `node_modules/`, `.next/`, `out/`, and `.netlify/`
are ignored and should not be committed.
