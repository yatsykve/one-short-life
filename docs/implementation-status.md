# Implementation Status

## What's Built

### Core Engine
- **Tick loop** — 100ms interval, calls mutations to advance time and grant XP each tick
- **Time system** — Day/age progression from age 10 to 80 (70 in-game years = 14 real hours)
- **Speed control** — Slow down (÷2) and speed up (×2) buttons, range 0.25x–64x
- **Persistence** — Auto-save to localStorage every 2s, load on startup, save on pause/speed change/close

### State & Mutations
- **`gameState`** — single `Readonly<GameState>` reactive object, single source of truth
  ```
  gameState
  ├── character { name, avatar }
  ├── time      { day, age, totalDays, gameSpeed, paused }
  ├── jobs      { current, xp }
  └── skills    { current, xp }
  ```
- **`mutations.ts`** — sole legal writer of `gameState`. Engine and UI components use it for all writes. See ADR-0001.
- **`resetState()`** — full reset including character (equals starting a new game/life)

### Progression System
- **XP formula** — Single smooth power curve: `totalXp = 93 × L^1.68`, no hard cap
- **Progress bars** — Reusable component showing XP toward next level

### Character
- Random name from preset list, single avatar (`avatar1.webp`)
- Lives in `gameState.character` — saved and reset with the rest of game state
- `Character.vue` is a pure display component (no local state, no localStorage)
- No Reroll button — a New Game / menu flow is planned (backlog #1)

### Jobs
- 3 jobs defined: Beggar, Farmer, Apprentice
- Click to activate/deactivate (one active at a time)
- XP granted each tick while active via `mutations.grantJobXp`
- Level and progress bar displayed

### Skills
- 3 skills defined: Strength Training, Reading, Crafting
- Same mechanics as Jobs — click to activate, XP per tick via `mutations.grantSkillXp`, level + progress bar
- Jobs and Skills are intentionally kept separate (no shared abstraction) — see ADR-0002

### UI
- **Left panel** — Game title, character (name + avatar), age/day display, speed controls
- **Middle section** — Tabbed area with Jobs, Skills, Assets, Events tabs
- Assets and Events tabs are placeholders

## Not Yet Built

- **Main menu / New Game flow** — pre-game character setup, locked during play (backlog #1)
- Character stats (Strength, Dexterity, Intelligence, Health)
- Money/economy system — `baseIncome` field on jobs is defined but unused
- Conditions system
- Assets (inventory + world assets)
- Event system — the generic event processor; currently XP is granted directly by engine
- Scenario data structure — Jobs and Skills will be dynamically loaded from a Scenario by the event system (ADR-0003)
- Offline progress

## Key Decisions (see `docs/adr/`)

- **ADR-0001** — `mutations.ts` is the sole writer of `gameState`
- **ADR-0002** — Jobs and Skills must not share abstractions; duplication is intentional
- **ADR-0003** — Job/Skill logic belongs to their definitions, not system modules; they will be dynamically loaded from a Scenario
