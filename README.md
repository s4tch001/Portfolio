# Pau — Portfolio

Personal portfolio of **Pau** — web developer, musician, and gamer. Showcases four
production apps deployed across Netlify, Cloudflare, and Supabase.

Built with **React 19 + Vite**, deployed on **Netlify**.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Production build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the build locally
```

## Deploying to Netlify

`netlify.toml` is already configured (build command, publish dir, SPA redirect).
Connect this repo to Netlify and every push to `main` deploys automatically.

## Editing content

- **Projects** — `src/data/projects.js`. Add a `live: 'https://…'` field to any
  project to show a "Visit site" button.
- **Screenshots** — `src/assets/projects/*.webp` (1600px-wide WebP).
- **Skills / About / Contact copy** — the matching component in `src/components/`.
