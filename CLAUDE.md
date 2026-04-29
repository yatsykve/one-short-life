# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

One Short Life is an idle incremental RPG browser game built with Vue 3 + TypeScript + Vite. Deployed to GitHub Pages at https://yatsykve.github.io/one-short-life/.

The user does not know JS/Vue — AI writes all the code. Maintain good documentation in `docs/` so future sessions can pick up where the last left off.

## Documentation

Read these docs before making changes — they are the source of truth for design and architecture decisions.

- `docs/game-design.md` — Full game design document (character, stats, gameplay, events)
- `docs/architecture.md` — Technical architecture: state, engine, event system, project structure
- `docs/style-guide.md` — Color palette
- `docs/implementation-status.md` — What's built vs. planned (**read this first** — the architecture docs describe the target design, not the current state)
- `docs/references.md` — Inspiration games (Progress Knight is the primary reference)
- `docs/backlog.md` — Prioritized list of future work. Keep it updated and prioritized when adding ideas.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check with vue-tsc then build with Vite
- `npm run preview` — Preview production build locally

No test runner or linter is configured.

## Architecture

The docs describe the *target* architecture. The current implementation is simpler — read `docs/implementation-status.md` to know what's actually built.

### What's actually built

**Engine loop** (`src/game/engine.ts`) — ticks every 100ms, advances time and grants XP directly:
```
1. Calculate daysDelta = realElapsedMs × DAYS_PER_REAL_SECOND × gameSpeed
2. Advance age/day from daysDelta (game ends at age 80)
3. Grant XP to gameState.jobs.current and gameState.skills.current
4. Auto-save to localStorage every 2 seconds
```

**Game state** (`src/game/state.ts`) — single Vue `reactive()` object, persisted under key `oneShortLife_gameState`:
```
gameState
├── time  { day, age, totalDays, gameSpeed, paused }
├── jobs  { current: string|null, xp: Record<string, number> }
└── skills { current: string|null, xp: Record<string, number> }
```

**Character state** — intentionally outside `gameState`. `Character.vue` has its own local `reactive()` and saves independently to localStorage under key `'character'`. It is not included in `saveState()` / `resetState()`.

**Progression formula** (`src/game/systems/progression.ts`): `totalXp = 93 × L^1.68`. No level cap. Shared by both jobs and skills.

**Data definitions** — `src/data/jobs.ts` and `src/data/skills.ts` are plain arrays of `JobDefinition` / `SkillDefinition`. Not yet a scenario system.

### Planned but not yet built

The event-driven architecture described in `docs/architecture.md` (generic event processor, conditions, assets, character stats) is on the backlog. Currently XP is granted directly by the engine, not via events.

### Project layout

- `src/game/` — Engine, state, progression system
- `src/data/` — Job and skill definitions
- `src/ui/` — Vue tab components (Assets and Events tabs are placeholders)
- `src/components/` — Character component (name, avatar, reroll)
- `public/` — Static assets (WebP avatars)
- **Base path**: `/one-short-life/` (configured in `vite.config.ts` for GitHub Pages)

## TypeScript

Strict mode enabled. The tsconfig enforces `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `noUncheckedSideEffectImports`. Target is ES2020 with bundler module resolution.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Uses Node.js 22.

## Workflow

Always commit and push to git at the end of each task.
