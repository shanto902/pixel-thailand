# Pixel Arcade

Marketing site for Pixel Arcade at Haven Community Shopping Complex in Chaweng, Koh Samui. The page is a dark, neon landing experience: full-screen video, attractions, arcade packages, a playable Pac-Man board, and a map to the venue.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home. Intro video, hero, attractions, game carousel, arcade bar, hours, Pac-Man, and the Find Us map. |
| `/packages` | Lane packages, from Starter through Boss Mode. |
| `/launch` | Opening-night page with the press kit and guest survey. |
| `*` | 404. |

The home nav links to packages and scrolls to the map. A WhatsApp button stays on screen.

## Stack

- React 19 and React Router
- Vite 7 and TypeScript
- Tailwind CSS and shadcn/ui
- Deployed as a single-page app (see `vercel.json`)

`@/*` imports map to `src/*`. That alias is set in `tsconfig.app.json` and again as a Vite alias in `vite.config.ts`.

## Getting started

Use a current Node.js LTS. Vite 7 needs Node.js 20.19+ or 22.12+. This repo uses pnpm.

```bash
pnpm install
pnpm dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build the production bundle into `dist/` |
| `pnpm build:dev` | Production build with the development Vite mode |
| `pnpm preview` | Serve the `dist/` build locally |
| `pnpm lint` | Run ESLint |

To typecheck without building:

```bash
pnpm exec tsc -p tsconfig.app.json --noEmit
```

## Project layout

```
src/
  pages/          Home, packages, launch, and 404
  components/     Navbar, map, Pac-Man, and page sections
  assets/         Images imported by the sections
public/           Videos, carousel photos, and icons served as-is
```

Venue copy, hours, and the map embed live in `src/components/section/LocationSection.tsx` and `src/components/GoogleMapEmbed.tsx`. The map iframe uses a CSS filter so it matches the dark page. Package prices live in `src/pages/Packages.tsx`.
