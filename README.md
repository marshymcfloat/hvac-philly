# Climaro HVAC template

Responsive Vue 3 HVAC website using GSAP and Lenis. Shared routing and deployment infrastructure follows `template-1`.

## Requirements

- Node.js 24.15.0 (`.nvmrc`)
- npm 11.6 or newer

## Development

```sh
npm ci
npm run dev
```

Runs on port 3000 with strict port selection and network access. Copy `.env.example` to `.env` for API configuration. `/v1` requests proxy to `API_PROXY_TARGET` (default `http://127.0.0.1:18080`).

## Production

```sh
npm run build
npm run preview
```

Output: `dist/`. Tailwind utilities are available without Preflight so the existing design styles remain intact.

## Routing

- `/`: Climaro marketing website.
- `/login` and `/admin/*`: redirect to `VITE_CENTRAL_ADMIN_URL` (default `https://admin.anhelm.com`).
- `src/siteConfig.js` and `VITE_HAS_ARTICLES`: article feature defaults.
- `src/utils/deployRecovery.js`: stale deployment asset recovery.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-bunny.yml`. Configure repository Actions secrets before deploying:

- `VITE_API_URL`
- `VITE_WEBSITE_HANDLE`
- `VITE_PUBLIC_API_KEY`
- `BUNNY_ACCESS_KEY`
- `BUNNY_STORAGE_ZONE`
- `BUNNY_PULL_ZONE`

The workflow installs locked dependencies, builds, and publishes `dist/` to Bunny. The API URL secret is required by the workflow.

## Forms

Contact and quote forms currently download local request drafts. They do not send requests to an API. Newsletter interest is stored on the current device only. Adding environment configuration does not connect these forms automatically.

## Assets

Public images and fonts live in `public/`; image generation prompts live in `design/`. Local browser artifacts, builds, dependencies, and environment files are excluded from Git.
