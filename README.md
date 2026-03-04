# Star City Group

Official website for [Star City Group](https://www.starcitygroup.us), a consultancy helping cities, non-profits, and companies navigate emerging urban technologies.

## About

Star City Group is led by **Dr. Anthony Townsend**, an internationally recognized expert on urban technology and innovation. We work globally with industry, government, and philanthropy on urban tech foresight, policy, and planning studies.

### Expertise

- **Foresight & Research** — Emerging urban technologies and their societal impacts
- **Strategic Advisory** — Guidance for cities, companies, and organizations
- **Policy Development** — Smart city governance and regulatory frameworks
- **Planning Studies** — Automation, urban data, and civic technology

### Publications

Dr. Townsend is the author of influential books on urban technology:
- *Smart Cities: Big Data, Civic Hackers, and the Quest for a New Utopia* (2013)
- *Ghost Road: Beyond the Driverless Car* (2020)

## Technical Stack

This website is built with [Astro](https://astro.build), a modern static site generator optimized for content-rich websites.

### Project Structure

```text
├── public/             # Static assets (images, fonts, etc.)
├── src/
│   ├── assets/        # Project assets processed by Astro
│   ├── components/    # Reusable Astro/UI components
│   ├── content/       # Markdown/MDX content collections
│   ├── layouts/       # Page layout templates
│   ├── pages/         # File-based routing
│   └── styles/        # Global styles and CSS
├── astro.config.mjs   # Astro configuration
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

### Content Organization

- **Pages** — `.astro` and `.md` files in `src/pages/` are automatically routed
- **Collections** — Blog posts and project case studies in `src/content/`
- **Static Assets** — Files in `public/` are served as-is at the root path

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) package manager

### Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start development server at `localhost:4321` |
| `pnpm run build` | Build production site to `./dist/` |
| `pnpm run preview` | Preview production build locally |
| `pnpm run astro ...` | Run Astro CLI commands |
| `pnpm run astro check` | Type-check and validate project |

### Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start dev server: `pnpm run dev`
4. Open [http://localhost:4321](http://localhost:4321)

## Deployment

The site is deployed on **Netlify** via the `anthony@starcitygroup.us` account.

- **Netlify Site**: [starcitygroup.netlify.app](https://starcitygroup.netlify.app)
- **Production URL**: [www.starcitygroup.us](https://www.starcitygroup.us)
- **Dashboard**: [app.netlify.com/sites/starcitygroup](https://app.netlify.com/sites/starcitygroup)

Netlify automatically deploys from the `main` branch of this repository. The build configuration uses:
- **Build command**: `pnpm run build`
- **Publish directory**: `dist/`

To build the production site locally:

```bash
pnpm run build
```

The optimized static files will be generated in `./dist/`.

## License

© Star City Group. All rights reserved.

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Star City Group Website](https://www.starcitygroup.us)
- [Dr. Anthony Townsend](https://www.starcitygroup.us/about)
