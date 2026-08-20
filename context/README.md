# Zenema — Development Context

> **Purpose of this file:** A living context document for resuming work on Zenema.
> Read this first before making changes so you understand the architecture,
> conventions, design system, and what was recently done.

---

## 1. What is Zenema?

A movie & TV series browsing web app built with **Next.js (App Router) + Redux Toolkit (RTK Query) + Tailwind CSS v4 + daisyUI v5**. Data comes from the **TMDB API**. Deployed to **Cloudflare Workers** via OpenNext.

- Stack: Next.js (App Router, "use client" components), TypeScript, Redux Toolkit + RTK Query, Tailwind v4, daisyUI v5 (`luxury` dark theme), React Icons, OpenNext→Cloudflare.
- All pages/components are **client components** (`'use client'`) and fetch data client-side via RTK Query hooks.

---

## 2. Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server on <http://localhost:3000> |
| `pnpm type` | **Typecheck only** (`tsc --noEmit`) — fastest validation |
| `pnpm build` | Production build (`next build`) |
| `pnpm start` | Serve production build |
| `pnpm preview` | OpenNext Cloudflare build + preview |
| `pnpm deploy` | OpenNext Cloudflare build + **deploy to Cloudflare Workers** |

**Validation workflow:** after any code change, run `pnpm type`, then optionally `pnpm build`.

---

## 3. Environment Variables (`.env` — gitignored, exists locally)

```
NEXT_PUBLIC_API_KEY=<tmdb-read-access-token>
NEXT_PUBLIC_API_URL=https://api.themoviedb.org
```

Every RTK Query slice reads these via `process.env.NEXT_PUBLIC_*`.

---

## 4. Project Structure (actual, verified)

```
Zenema/
├── app/
│   ├── layout.tsx              # Root layout: StoreProvider + Nav + global styles
│   ├── StoreProvider.tsx       # Redux provider
│   ├── page.tsx                # "/" → renders HomePage
│   ├── home/page.tsx           # Home / Featured Movies grid (design "reference")
│   ├── components/             # Nav, Pagination, VideoModal, WelcomeHero, Loading, Error
│   ├── movies/
│   │   ├── topRated/           # + topRateMovieLists.tsx (movie card grid) + loading.tsx
│   │   └── nowPlaying/         # + nowPlayingMovieLists.tsx (movie card grid) + loading.tsx
│   ├── tv/
│   │   ├── topRated/           # + loading.tsx (shares app/components/TvLists.tsx grid)
│   │   ├── popular/            # + loading.tsx
│   │   └── onAir/              # + loading.tsx
│   ├── movie/[id]/             # Movie detail: page, MovieHeroSection, MovieOverviewSection, MovieCastSection, loading.tsx
│   ├── serie/[id]/             # Serie detail: page, SerieHeroSection, SerieOverviewSection, SerieCastSection, loading.tsx
│   └── credit/[id]/            # Person detail: creditOverview, creditMovie, creditSerie, creditPhoto + page with tabs
├── lib/
│   ├── store.ts                # All RTK slices registered here (combineSlices + middlewares)
│   ├── hooks.ts
│   └── features/
│       ├── movie/              # topRatedMovieApiSlice, nowPlayingMovieApiSlice
│       ├── movieDetail/        # movieDetailApiSlice
│       ├── serieDetail/        # serieDetailApiSlice (detail + getSerieCredits)
│       ├── tv/                 # tvListApiSlice (top_rated + popular + on_the_air)
│       ├── credits/            # creditsApiSlice, creditsDetailApiSlice, creditsMovieApiSlice, creditsSeriesApiSlice, creditExternalIdApiSlice, creditsImageApiSlice
│ └── video/              # videoApiSlice (movie), serieVideoApiSlice
├── type/                       # TS types mirroring TMDB responses (per-domain)
├── util/
│   ├── imgPath.ts              # `ImgPath = "https://image.tmdb.org/t/p/w780"`
│   ├── ImdbPath.ts
│   └── externalIdsPath.ts
├── public/                     # Static assets
├── wrangler.jsonc              # Cloudflare config
├── open-next.config.ts         # OpenNext adapter
└── next.config.mjs
```

---

## 5. Routes & Pages

| Route | File | Description |
| --- | --- | --- |
| `/` and `/home` | `app/page.tsx` → `HomePage` | "Featured Movies" grid (top 10 top-rated) + WelcomeHero |
| `/movies/topRated` | `app/movies/topRated/` | Top rated movies, paginated |
| `/movies/nowPlaying` | `app/movies/nowPlaying/` | Now playing movies, paginated |
| `/movie/[id]` | `app/movie/[id]/` | Movie detail: hero + overview + cast |
| `/serie/[id]` | `app/serie/[id]/` | Serie detail: hero + overview + cast |
| `/tv/topRated` | `app/tv/topRated/` | Top rated TV shows, paginated |
| `/tv/popular` | `app/tv/popular/` | Popular TV shows, paginated |
| `/tv/onAir` | `app/tv/onAir/` | On-air TV shows, paginated |
| `/credit/[id]` | `app/credit/[id]/` | Person page with Movies / TV Shows / Photos tabs |

> Nav menu items point to entries → many are placeholders (`#`): Genres, Trending, Upcoming, Popular. `Search` input and the avatar dropdown in the Nav are not functional.

---

## 6. Architecture & Conventions

- **RTK Query slices** live in `lib/features/<domain>/<domain>ApiSlice.ts`. Each slice:
  - uses `createApi` + `fetchBaseQuery` with `baseUrl: process.env.NEXT_PUBLIC_API_URL` and `Authorization: Bearer <key>` in `prepareHeaders`
  - is registered in `lib/store.ts` **both** in `combineSlices(...)` **and** the `middleware` `.concat(...)` list — remember to do **both**, or add an endpoint to an already-registered slice.
- React components live next to their route in `app/…/`. A page is a client component that calls query hooks, handles loading/error, and renders "Section" components.
- Types: `type/<domain>/…`, PascalCase filenames, mirroring TMDB fields 1:1. Many serie types are intentionally loose (`any[]`).

---

## 7. Design Tokens (in `app/styles/globals.css` @theme)

- `--color-mainText` = gold/amber (`oklch(0.769 0.188 70.08)`) — accent headings, rating badges, `group-hover:text-mainText`
- `--color-secondText` = `#ffffff` — main body text
- `--color-thirdColor` = green (`oklch(0.792 0.209 151.711)`) — numeric ratings/values, clickable accent links
- daisyUI theme: `luxury` (dark). Fonts: **SUSE** (Google Fonts import). `classes`: `bg-mainText`, `text-thirdColor`, etc.

## 8. TMDB Endpoints used

| Slice: `useGet…Query` | Endpoint |
| --- | --- |
| `topRatedMovieApiSlice` | `GET /3/movie/top_rated?page={page}` |
| `nowPlayingMovieApiSlice` | `GET /3/movie/now_playing?page={page}` |
| `movieDetailApiSlice` | `GET /3/movie/{id}` |
| `serieDetailApiSlice: getSerieDetail` | `GET /3/tv/{id}` |
| `serieDetailApiSlice: getSerieCredits` | `GET /3/tv/{id}/credits` |
| `creditsApiSlice` | `GET /3/movie/{id}/credits` |
| `creditsDetailApiSlice` | `GET /3/person/{id}` |
| `creditsMovieApiSlice` | `GET /3/person/{id}/movie_credits` |
| `creditsSeriesApiSlice` | `GET /3/person/{id}/tv_credits` |
| `creditExternalIdApiSlice` | `GET /3/person/{id}/external_ids` |
| `creditsImageApiSlice` | `GET /3/person/{id}/images` |
| `videoApiSlice` | `GET /3/movie/{id}/videos` |
| `serieVideoApiSlice` | `GET /3/tv/{id}/videos` |
| `tvListApiSlice: getTopRatedTv` | `GET /3/tv/top_rated?page={page}` |
| `tvListApiSlice: getPopularTv` | `GET /3/tv/popular?page={page}` |
| `tvListApiSlice: getOnTheAirTv` | `GET /3/tv/on_the_air?page={page}` |

> ⚠️ `creditsSeriesApiSlice` = a **person**'s TV credits (credit page). For a **serie's cast** use `serieDetailApiSlice.getSerieCredits` (`/3/tv/{id}/credits`).

---

## 9. Session Work Log (most recent first)

### 9.3 TV series lists — Top Rated, Popular, On Air ✅

Mirrors the movie list pages (`app/movies/…`); cards follow `context/box-design.md`.

- **Created** `type/tv/tvResult.ts` + `type/tv/tvList.ts` — **one shared shape** for all three endpoints (they return identical responses). `TvResult` uses the correct `genre_ids` spelling (unlike the inherited movie `genere_ids` typo) and types `poster_path`/`backdrop_path` as `string | null`.
- **Created** `lib/features/tv/tvListApiSlice.ts` — a single multi-endpoint slice (pattern from `serieDetailApiSlice`): `getTopRatedTv` → `/3/tv/top_rated`, `getPopularTv` → `/3/tv/popular`, `getOnTheAirTv` → `/3/tv/on_the_air` (all `?page={page}`). Exports `useGetTopRatedTvQuery`, `useGetPopularTvQuery`, `useGetOnTheAirTvQuery`.
- **Modified** `lib/store.ts` — registered `tvListApiSlice` in `combineSlices(...)` **and** the `.concat(...)` middleware list.
- **Created** `app/components/TvLists.tsx` — one shared card grid for all three lists: whole-card `group` click → `/serie/{id}`, border on wrapper only, `group-hover:scale-105 group-hover:blur-[2px]`, gold rating badge, `h3` title from `name`. Uses the `randomavatar.com` poster fallback when `poster_path` is null (box-design §6 recommendation for new grids).
- **Created** pages `app/tv/topRated/`, `app/tv/popular/`, `app/tv/onAir/` (each `page.tsx` + `loading.tsx`) — cloned from `app/movies/popular/page.tsx`: `fetchPage` state, smooth scroll-to-top on page change, `LoadingEffect`/`ErrorEffect`, centered `text-mainText` h1, `Pagination`.
- **Modified** `app/components/Nav.tsx` — TV Shows dropdown hrefs `#` → `/tv/topRated`, `/tv/onAir`, `/tv/popular`.
- **Decisions:** shared `TvList`/`TvResult` types, single multi-endpoint slice, and one shared `TvLists` grid instead of per-endpoint duplicates (the three lists are identical in shape/markup). Route naming `/tv/…` mirrors `/movies/…` (camelCase, matching the existing `/serie/[id]` and the "TV Shows" Nav label).
- **Status:** ✅ `pnpm type` passes; `pnpm build` verified next.

Mirrors the movie detail page (`app/movie/[id]/`).

- **Created** `app/serie/[id]/SerieOverviewSection.tsx` — "Overview" heading, poster (`hidden md:block`), overview text, and 2-col grid: **Created By** (clickable → `/credit/{id}`, from `serieDetail.created_by`, falls back to "N/A"), Status, First Air Date, Last Air Date, Original Language, Number of Seasons, Number of Episodes.
- **Created** `app/serie/[id]/SerieCastSection.tsx` — identical daisyUI carousel to `MovieCastSection` (cast `profile_path`/name/character, click → `/credit/{id}`, `randomavatar.com` fallback).
- **Created** `app/serie/[id]/loading.tsx` (same as movie route's).
- **Modified** `lib/features/serieDetail/serieDetailApiSlice.ts` — added `getSerieCredits` → `/3/tv/{id}/credits`; exported `useGetSerieCreditsQuery`. No store change needed (slice already registered).
- **Modified** `app/serie/[id]/page.tsx` — calls `useGetSerieCreditsQuery(id)`, added `creditsIsLoading`/`videoIsLoading` to loading guard, renders `SerieOverviewSection` + `SerieCastSection`.
- **Decisions:** "Created By" from `serieDetail.created_by` (canonical TMDB field), not from credits crew. Did **not** create a new slice (avoided clashing name with `creditsSeriesApiSlice`); reused the existing serie detail slice instead.
- **Status:** ✅ `pnpm type` + `pnpm build` pass.

### 9.2 Movie list card design — unified with home page

- The full card pattern (structure + classes) is documented in **`context/box-design.md`**.
- **Modified** `app/movies/topRated/topRateMovieLists.tsx` and `app/movies/nowPlaying/nowPlayingMovieLists.tsx` to match the card design in `app/home/page.tsx`:
  - Whole card = `group` with click handler on the card (not per-element)
  - Poster: `object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]` (scale + blur on card hover)
  - Single `relative overflow-hidden rounded-lg border-2 border-zinc-800` container (old markup had double borders — border on both wrapper and `<Image>`)
  - Rating `vote_average.toFixed(1)` badge top-right (**added** to now-playing; top-rated already had it)
  - Title: now `h3` with `text-sm md:text-base text-secondText group-hover:text-mainText transition-colors duration-200`
  - Image height 200 → **225**
  - Grid container aligned to home: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-auto max-w-7xl` (was `gap-10`)
- **Status:** `pnpm type` passes.

---

## 10. Gotchas & Conventions to keep

- **Tailwind classes are loosely written** across the codebase: `text-1xl` (not a real scale class → ignored in v4), `gap-2 sm:gap-10` inside odd places, `ps-2/`-style prefixes (`ps-10`). Copy existing patterns rather than "fixing" them unless asked. Also `className` values like `"text..."` after `ps-` etc. are arbitrary.
- **`Credits` type reuse:** `type/credits/credits.ts` (`{ id, cast: Cast[], crew: Crew[] }`) matches both movie and TV credits responses — reuse it. Note `Cast.cast_id` is movie-only (absent in TV credits) but unused in UI, so harmless.
- **`SerieDetail` type is loose:** many fields are `any[]` (`created_by`, `seasons`, `networks`, …). Cast to the needed shape at the usage site.
- **Type typo inherited from TMDB mapping:** `genere_ids` is misspelled in both movie result types (`TopRatedMovieResult`, `NowPlayingResult`); fields are unused in the UI so it hasn't bitten yet.
- **Not all Nav links work yet** (see §5). Genres, Trending, search, and the Upcoming/Popular movie pages are planned/unimplemented (TV lists now work: `/tv/topRated`, `/tv/popular`, `/tv/onAir`).
- `.env` exists locally (needed for runtime data). `.next/`, `.open-next/`, `.wrangler/` are gitignored build artifacts.
- Current branch is `refactor/clean-up`; the previous README at repo root lists the older folder names `movieDetail/[id]`/`serieDetail/[id]` — the **real** folders are `app/movie/[id]` and `app/serie/[id]`.

---

## 11. Current Repository State (as of last update)

- **Branch:** `feature/movies`
- **Latest commit:** `a00c761` — "Fix name".
- **Uncommitted (working tree):**
  - TV series lists work (§9.3): `app/components/TvLists.tsx`, `app/tv/` (topRated, popular, onAir), `lib/features/tv/tvListApiSlice.ts`, `type/tv/`
  - `lib/store.ts` (tvListApiSlice registration), `app/components/Nav.tsx` (TV dropdown routes)
  - `context/` — untracked: this `README.md` + `box-design.md` (movie card pattern)
- **Validation:** `pnpm type` passes on this state; `pnpm build` to be re-run.
