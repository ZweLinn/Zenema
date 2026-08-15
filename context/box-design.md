# Zenema — Movie Box (Card) Design

> **Purpose:** The canonical movie-card ("movie box") design used across Zenema.
> Read this whenever you add, modify, or restyle a movie/TV poster grid so the
> boxes stay visually consistent.

---

## 1. Where this design is used

The **canonical "movie box"** lives in `app/home/page.tsx` ("Featured Movies") and is applied **identically** in:

- `app/home/page.tsx` — Featured Movies (first 10 top-rated)
- `app/movies/topRated/topRateMovieLists.tsx`
- `app/movies/nowPlaying/nowPlayingMovieLists.tsx`

> All three movie grids use the exact same box markup — treat them as one source of truth.

---

## 2. Grid container

```
grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-center m-auto max-w-7xl
```

- Responsive: 2 columns (mobile) → 5 columns (xl)
- `gap-6`, centered (`m-auto`), capped at `max-w-7xl`

---

## 3. Single card anatomy (top → bottom)

```tsx
<div className="rounded-lg flex flex-col items-center justify-center h-fit cursor-pointer group"
     onClick={() => handleClick(movie.id)}>
  <div className="relative overflow-hidden rounded-lg border-2 border-zinc-800">
    <Image src={ImgPath + movie.poster_path} alt={movie.title}
           width={150} height={225}
           className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]" />
    <div className="absolute top-2 right-2 bg-mainText text-base-300 text-xs font-bold px-2 py-1 rounded-full">
      {movie.vote_average.toFixed(1)}
    </div>
  </div>
  <h3 className="text-sm md:text-base font-semibold mt-2 text-secondText group-hover:text-mainText transition-colors duration-200">
    {movie.title}
  </h3>
</div>
```

| Part | Classes / role |
| --- | --- |
| **Card container** | `group ... cursor-pointer` — `group` enables `group-hover:*` on children; the whole card navigates (`router.push('/movie/{id}')`), no per-element handlers |
| **Poster wrapper** | `relative overflow-hidden rounded-lg border-2 border-zinc-800` — carries the border + radius; `overflow-hidden` clips the image |
| **Poster image** | `width={150} height={225}`, classes `object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]` — smooth scale 1.05 + blur on card hover |
| **Rating badge** | absolute top-right gold pill: `bg-mainText text-base-300 text-xs font-bold px-2 py-1 rounded-full`, value `movie.vote_average.toFixed(1)` |
| **Title** | `h3` — `text-sm md:text-base font-semibold mt-2 text-secondText group-hover:text-mainText transition-colors duration-200` (white → gold on card hover) |

---

## 4. Hover effects (the important part)

- Are all **`group-hover:*`** on the card → hover works anywhere on the box, not just the image.
- Poster: `scale(1.05)` + `blur(2px)` with `transition-transform duration-300`.
- Title: color shifts white → `mainText` with `transition-colors duration-200`.

### Why `group`?

The `group` class on the card container lets child elements react to hover anywhere on the box (`group-hover:scale-105`, `group-hover:text-mainText`, …). Without it you'd fall back to `hover:*` per element, which only fires when the pointer is directly over that specific element.

---

## 5. Referring design tokens

From `app/styles/globals.css` `@theme`:

- `mainText` — gold/amber: rating badge background, title hover color
- `secondText` — `#ffffff`: default title color
- daisyUI `base-300` — dark: badge text/element color

---

## 6. Rules & gotchas

- **Never** put `border-2 border-zinc-800` / `rounded-lg` directly on `<Image>` — the old markup had duplicate borders; always put the border + radius on the wrapper and let `overflow-hidden` clip the image.
- Use **`group-hover:*`**, not **`hover:*`** (the old lists used `hover:blur-[2px]` on the image, so the effect only fired on the image itself).
- Poster sources: `ImgPath + movie.poster_path` where `ImgPath = https://image.tmdb.org/t/p/w780` (see `util/imgPath.ts`).
- **No null guard** on `poster_path` in these grids — a `null` produces a broken URL. The cast carousels (`MovieCastSection` / `SerieCastSection`) already use a fallback (`https://randomavatar.com/avatar/172651974`) — copy that pattern when adding new grids with nullable posters.
- `text-1xl` (used elsewhere in the codebase) is **not a real Tailwind class** in v4 and gets ignored — prefer `text-sm md:text-base` as in the title.
- Rating badge assumes `movie.vote_average` exists — it does on `TopRatedMovieResult` (`type/movies/topRated/topRatedResult.ts`) and `NowPlayingResult` (`type/movies/nowPlaying/nowPlayingResult.ts`).

---

## 7. History (why this pattern)

- Previously `topRateMovieLists.tsx` and `nowPlayingMovieLists.tsx` had: separate `onClick` on image/title, `hover:blur-[2px]` (image-only, no scale/transition), duplicate borders, missing rating badge on the now-playing grid, and a looser grid (`gap-10`, no `max-w-7xl`).
- They were unified with the home-page card design. The key changes:
  - Whole-card `group` + click
  - `transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]`
  - Border only on the wrapper
  - Rating badge added to now-playing cards
  - Title → `h3 text-sm md:text-base … group-hover:text-mainText transition-colors duration-200`
  - Image height 200 → **225**; grid container → `gap-6 max-w-7xl`
