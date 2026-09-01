# Realtime Market Dashboard

A cryptocurrency market dashboard built with React and TypeScript, focused on keeping the UI responsive while prices update several times a second.

**[Live demo →](ADD_LINK_AFTER_DEPLOY)**

> _Add a screenshot here once stage 1 renders._

---

## Why I built this

I build real-time trading interfaces professionally, mostly in Vue. This project is the same class of problem in React: a list that updates constantly, a search box that has to stay responsive while it does, and a detail panel that shouldn't re-render every time an unrelated price ticks.

The feature set is small on purpose. The interesting part is what happens when the data starts moving.

---

## The performance problem

<!-- ============================================================
     FILL IN AFTER STAGE 5A ("deliberately bad" version).
     Describe what you actually observed. Suggested shape:

     - where prices lived in the first version
     - what the console showed on every tick
     - what the search input felt like while prices updated
     - a Profiler number if you captured one
     ============================================================ -->

_TODO_

## What fixed it

<!-- ============================================================
     FILL IN AFTER STAGE 5B. Three changes, in the order you made
     them, and what each one bought you:

     1. prices moved into a store, each row subscribing via selector
     2. rows wrapped in React.memo
     3. updates batched into ~100ms windows instead of applied per tick

     Include before/after numbers if you have them.
     ============================================================ -->

_TODO_

---

## Notes on the build

### Data fetching and cleanup

<!-- FILL IN AFTER STAGE 2 -->
Requests are aborted through `AbortController` in the effect's cleanup function. This covers two things at once: no state updates against an unmounted component, and no chance of a slow earlier response overwriting a newer one when the request key changes.

### Debounced search

<!-- FILL IN AFTER STAGE 3 -->
Search input is controlled, but filtering runs off a debounced value so typing stays smooth. The debounce lives in a `useDebounce` hook rather than inline in the component — the timer is cleared on cleanup, so rapid typing doesn't leave a trail of pending timeouts.

### State boundaries

<!-- FILL IN AFTER STAGE 4 -->
Live prices live in a Zustand store, read through selectors so a row only re-renders when its own price changes. Selection state is separate from price state, so a price tick never touches the detail panel.

---

## Tech stack

| | |
|---|---|
| Framework | React 19, TypeScript |
| Build | Vite |
| State | Zustand |
| Data source | CoinGecko public API |
| Tooling | ESLint |

---

## Structure

```
src/
  components/     CoinList, CoinRow, SearchInput, DetailPanel
  hooks/          useDebounce, usePriceFeed
  store/          price and selection stores
  api/            CoinGecko client
  types.ts        shared types
```

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build
npm run lint
```

---

## What I'd do differently

<!-- FILL IN AT STAGE 6. Be honest — this section is worth more than
     the feature list. Candidates depending on what you skip:
     - no tests / partial tests
     - simulated price feed rather than a real WebSocket
     - no error retry beyond a single button
     - list isn't virtualized, so very long lists would still grow the DOM
     - no caching layer, so remounting refetches
     ============================================================ -->

_TODO_

---

## License

MIT
