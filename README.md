# Kiezblock Alt-Lichtenberg

Website for the Bürger:innen Initiative Kiezblock Alt-Lichtenberg. Built with [Astro](https://astro.build/) and [Tailwind CSS v4](https://tailwindcss.com/).

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at **http://localhost:4321**.

## Available commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
├── components/   # Astro components (Header, Hero, Footer, etc.)
├── layouts/      # Base HTML layout
├── pages/        # File-based routing (index, impressum, datenschutz)
└── styles/       # Global CSS and Tailwind theme
public/
├── fonts/        # Self-hosted Lato font files
├── files/        # Downloadable documents (PDF)
└── images/       # All images, logos, gallery photos
```

## License

This repository uses a **dual-license** model:

- **Code** (components, layouts, styles, config) — [AGPL-3.0-or-later](LICENSE-AGPL-3.0). You may use, modify, and redistribute the code as long as you publish your modifications under the same license. The Affero clause means this also applies when running a modified version as a network service.
- **Content & brand** (text, images, logo, name, colors, PDFs) — **All Rights Reserved** by Buerger:innen Initiative Kiezblock Alt-Lichtenberg. Not for use without explicit permission.
- **Fonts** (Lato) — [SIL Open Font License 1.1](https://scripts.sil.org/OFL).

See [LICENSE](LICENSE) for full details.