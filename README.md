# Realtime Market Dashboard

A cryptocurrency market dashboard built with React and TypeScript, focused on keeping the UI responsive while prices update several times a second.

**[Live demo →](https://realtime-market-dashboard-eta.vercel.app/)**

![Coins list](./screenshots/image.png)

---

I build real-time trading interfaces professionally, mostly in Vue. This project is the same class of problem in React: a list that updates constantly, a search box that has to stay responsive while it does, and an order panel that shouldn't re-render every time an unrelated price ticks.

The feature set is small on purpose. The interesting part is what happens when the data starts moving.

---

## The performance problem

<!-- FILL IN AFTER STAGE 5A — what you observed in the "deliberately bad" version:
     where prices lived, what the console showed on each tick, how the search
     input felt, and a Profiler number if you captured one. -->

_TODO_

## What fixed it

<!-- FILL IN AFTER STAGE 5B — the three changes and what each one bought you.
     Before/after numbers if you have them. -->

_TODO_

---

## Notes on the build

### Data fetching and cleanup

The coin request runs in an effect with an `AbortController` wired into the cleanup function, so an in-flight request is cancelled when the component unmounts or the effect re-runs. That covers two things at once: no state updates against an unmounted component, and no chance of a slow earlier response landing after a newer one.

Retry works by bumping a `reloadKey` held in state, which is in the effect's dependency array — a small trick that avoids duplicating the fetch logic in an event handler.

### Debounced search

The input is controlled, but filtering runs off a debounced value so typing stays smooth. The debounce lives in a `useDebounce` hook rather than inline, and clears its timer on cleanup — without that, fast typing leaves a trail of pending timeouts that all eventually fire.

Filtering itself is memoised, so it doesn't recompute on unrelated renders.

### Design tokens

Colour, spacing, and typography are defined once as Tailwind v4 `@theme` tokens in `index.css`, using `oklch` for perceptually even lightness steps. Components reference token names — `bg-bg-1`, `text-pos` — never raw hex.

The point is a single source of truth: changing the palette means editing one block, not hunting through components. This is a small version of the design system work I do at my day job.

### Component variants as unions

`Button` takes `variant` and `size` as union types mapped through a `Record<Variant, string>`. Adding a variant to the union without adding its class is a compile error rather than a silently unstyled button.

### Number formatting

Prices span five orders of magnitude — a coin at \$78,000 and one at \$0.016 sit in the same column — so `formatPrice` picks precision by magnitude instead of using one fixed setting. Percentages round to two decimals, and a missing 24h change renders an em dash rather than a bare `%`.

### Responsive behaviour

Desktop shows the order panel as a fixed sidebar. Mobile moves it into a native `<dialog>`, which brings focus trapping and escape-to-close for free instead of reimplementing them.

The dialog animates with `@starting-style` and `allow-discrete`, so it transitions in and out without JavaScript, and respects `prefers-reduced-motion`.

---

## Tech stack

| | |
|---|---|
| Framework | React 19, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| State | Zustand |
| Data source | CoinGecko public API |
| Tooling | ESLint, Prettier |

---

## Structure

```
src/
  api/          CoinGecko client and shared types
  components/   CoinsList, CoinsTable, OrderForm, Modal, Button, SearchInput
  hooks/        useDebounce, useMediaQuery
  store/        order state and price state (Zustand)
  utils/        number formatting
  index.css     design tokens
```

Server data is fetched where it's consumed; selection and order state live in a Zustand store, since both the table and the order panel need them.

---

## Running locally

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build
npm run lint
npm run format
```

---

## What I'd do differently

<!-- EXPAND AT STAGE 6 -->

- **No tests.** `formatPrice` and the order total calculation are pure functions with real edge cases, and are exactly what unit tests are for.
- **Orders are mock only.** The form calculates a total and fee but doesn't submit anywhere.
- **The list isn't virtualised.** Fine at 20 rows; a full market listing would need windowing.
- **No caching layer.** Every mount refetches — there's no stale-while-revalidate behaviour.

---

## License

MIT
