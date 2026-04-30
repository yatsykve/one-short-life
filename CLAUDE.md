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

**Engine loop** (`src/game/engine.ts`) — ticks every 100ms, advances time and grants XP via mutations:
```
1. Calculate daysDelta = realElapsedMs × DAYS_PER_REAL_SECOND × gameSpeed
2. Call mutations.advanceTime(daysDelta) — updates age/day, pauses at age 80
3. Call mutations.grantJobXp / mutations.grantSkillXp for active job/skill
4. Auto-save to localStorage every 2 seconds
```

**Game state** (`src/game/state.ts`) — single Vue `reactive()` exported as `Readonly<GameState>`, persisted under key `oneShortLife_gameState`:
```
gameState
├── character { name, avatar }
├── time      { day, age, totalDays, gameSpeed, paused }
├── jobs      { current: string|null, xp: Record<string, number> }
└── skills    { current: string|null, xp: Record<string, number> }
```

**Mutations** (`src/game/mutations.ts`) — the only legal writer of `gameState`. All engine and UI writes go through here. See ADR-0001.

**Character** — part of `gameState.character`. `Character.vue` is a pure display component; it calls `mutations.setCharacter()` on first load if name is empty. `resetState()` resets character along with everything else (new game = new character).

**Progression formula** (`src/game/systems/progression.ts`): `totalXp = 93 × L^1.68`. No level cap. Pure math — no knowledge of entities.

**Data definitions** — `src/data/jobs.ts` and `src/data/skills.ts` are plain arrays. Placeholder until the event/scenario system is built. See ADR-0003.

### Planned but not yet built

The event-driven architecture described in `docs/architecture.md` (generic event processor, conditions, assets, character stats, dynamic job/skill loading) is on the backlog. Currently XP is granted directly by the engine, not via events.

### Project layout

- `src/game/` — Engine, state, mutations, progression system
- `src/data/` — Job and skill definitions (static placeholder)
- `src/ui/` — Vue tab components (Assets and Events tabs are placeholders)
- `src/components/` — Character display component
- `public/` — Static assets (WebP avatars)
- `CONTEXT.md` — Domain glossary (Job, Skill, Progression, Character, Event, Scenario, Condition)
- `docs/adr/` — Architecture decision records
- **Base path**: `/one-short-life/` (configured in `vite.config.ts` for GitHub Pages)

## TypeScript

Strict mode enabled. The tsconfig enforces `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `noUncheckedSideEffectImports`. Target is ES2020 with bundler module resolution.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Uses Node.js 22.

## Workflow

Always commit and push to git at the end of each task.

### State mutation rule

`gameState` is read-only. All writes to game state go through `src/game/mutations.ts` — never write to `gameState` properties directly. This is enforced by the `Readonly<GameState>` export (shallow) and by ADR-0001. The only exception is `_mutableState` in `state.ts` itself, which is the internal reference `mutations.ts` imports.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: `CONTEXT.md` at root + `docs/adr/`. See `docs/agents/domain.md`.
