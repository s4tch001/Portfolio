# Pau — Portfolio

Personal portfolio of **Pau** — web developer, musician, and gamer. Showcases four
production apps deployed across Netlify, Cloudflare, and Supabase.

Built with **Next.js 16 (App Router, static export) + React 19**, deployed on
**Netlify**. Fully pre-rendered HTML with SEO metadata, Open Graph tags, and
JSON-LD structured data.

## Features

- **Static export** (`output: 'export'`) — every section ships in the initial
  HTML, great for SEO.
- **Style switcher** — a floating 🎨 button lets visitors pick a page style:
  Default, Graffiti, Old School ('90s), Pixels (8-bit), Luxe (minimalist
  luxury), or Hacker (code & terminal). The choice persists in `localStorage`.
- **Dark / light theme** — every style has both modes; applied before first
  paint (no flash).
- **Project galleries** — auto-advancing slideshows in a browser frame with
  load-gated slide + blur transitions, motion-blur trails, and a fullscreen
  lightbox.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build    # static export → out/
npx serve out    # serve the build locally
```

## Deploying to Netlify

`netlify.toml` is already configured (build command + `out` publish dir).
Connect this repo to Netlify and every push to `main` deploys automatically.

## Editing content

- **Projects** — `app/data/projects.js`. Add a `live: 'https://…'` field to any
  project to show a "Visit site" button.
- **Screenshots** — `public/assets/projects/*.webp` (1600px-wide WebP).
- **Skills / About / Contact copy** — the matching component in `app/components/`.
- **Page styles** — add an entry to `STYLES` in
  `app/components/StyleSwitcher.jsx`, create a `[data-style='<id>']` stylesheet
  in `app/styles/`, import it in `app/layout.jsx`, and add a swatch class in
  `app/globals.css`.
- **SEO metadata** — `app/layout.jsx` (Metadata API + JSON-LD).
