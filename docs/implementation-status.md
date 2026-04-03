# Implementation Status

## Current State

The codebase has a basic Vue 3 scaffold with a single Character component that generates a random name/avatar and stores it in localStorage. **This will be fully rewritten** to match the new architecture (see architecture.md).

### What exists (to be rewritten)

- `src/main.ts` — Vue app bootstrap
- `src/App.vue` — Root component (Options API)
- `src/components/Character.vue` — Random character generation with localStorage

### What needs to be built

The new architecture (documented in architecture.md) requires building:

1. **Game engine** — Tick loop with speed control, event processing
2. **State** — Single reactive state object
3. **Event system** — Generic event processor, event type definitions
4. **Scenario data** — Job, skill, and event definitions (the "world")
5. **Actions** — Player input handlers (start job, practice skill, respond to events)
6. **UI** — PlayerPanel, GameTabs, and tab components (Jobs, Skills, Assets, Events)
7. **Time system** — Day/age advancement based on tick delta
