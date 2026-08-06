# Zenema

A movie and TV series browsing web application built with Next.js, Redux Toolkit, and Tailwind CSS. Browse top-rated movies, explore detailed cast and crew information, and watch trailers — all powered by the [TMDB API](https://www.themoviedb.org/).

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| State / Data Fetching | [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI v5](https://daisyui.com/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Data Source | [TMDB API](https://developers.themoviedb.org/) |
| Deployment | [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext](https://opennext.js.org/) |

## Features

- **Featured Movies** — Grid of top-rated movies on the home page with hover effects and ratings
- **Top Rated Movies** — Paginated list of the highest-rated movies
- **Movie Details** — Full details including genres, production companies, cast, crew, and trailers
- **TV Series Details** — Series overview, seasons, cast, and related videos
- **Cast & Crew** — Individual person pages with biography and filmography
- **Video Trailers** — Modal player for movie and series trailers
- **Responsive Navigation** — Dropdown menus for Movies, TV Shows, and Genres on desktop and mobile
- **Loading & Error States** — Skeleton loading and error messaging for all data-fetching views

## Project Structure

```
Zenema/
├── app/                    # Next.js App Router pages & components
│   ├── components/         # Shared UI components (Nav, Pagination, etc.)
│   ├── home/               # Home page (featured movies grid)
│   ├── topRatedMovie/      # Top rated movies with pagination
│   ├── movieDetail/[id]/   # Movie detail page (dynamic route)
│   ├── serieDetail/[id]/   # TV series detail page (dynamic route)
│   ├── creditDetail/[id]/  # Person detail page (dynamic route)
│   └── styles/             # Global CSS & CSS modules
├── lib/                    # Redux store, slices, API slices
│   ├── features/           # RTK Query API slices per domain
│   │   ├── topRatedMovie/
│   │   ├── movieDetail/
│   │   ├── serieDetail/
│   │   ├── credits/
│   │   └── video/
│   ├── store.ts
│   └── hooks.ts
├── type/                   # TypeScript type definitions (aligned with TMDB responses)
├── util/                   # Utility helpers (image paths, IMDb links, etc.)
├── public/                 # Static assets
├── wrangler.jsonc          # Cloudflare Workers configuration
├── open-next.config.ts     # OpenNext Cloudflare adapter config
└── next.config.mjs         # Next.js configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io/) (preferred package manager)
- A TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Environment Variables

Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_API_KEY=<your-tmdb-api-read-access-token>
NEXT_PUBLIC_API_URL=https://api.themoviedb.org
```

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Deploy to Cloudflare

```bash
pnpm deploy
```

This builds the Next.js app with the OpenNext Cloudflare adapter and deploys the worker via Wrangler.

## License

[MIT](LICENSE)
