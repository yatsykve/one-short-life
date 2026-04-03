# Architecture

## Core Principle

```
State machine + tick loop + UI projection
```

- **State** = single reactive object, single source of truth
- **Engine** = tick loop that advances time and processes events
- **UI** = reads state, renders it
- **Player actions** = mutate state (by activating/deactivating events)

## The Event-Driven World

This is the most important architectural concept: **everything in the game is an event**.

Without events, the character exists in an empty world — time passes but nothing happens. No jobs, no skills, no income, no death. Death itself is an event with a small (editable) probability.

The entire game world is described as:
- A list of **potential events** (the scenario/world definition)
- A list of **active events** (currently running, checked each tick)

### How events work

Each active event has a **probability** of firing each tick. When it fires, it can update anything: stats, conditions, money, available jobs, unlock new content, add/remove other events.

**Example — working a job:**
1. Player clicks "Start working as Beggar"
2. This activates two events:
   - Event A: 100% chance per tick → earn X bronze
   - Event B: 100% chance per tick → gain skill XP for begging
3. Player clicks "Stop working" → both events deactivated

**Example — random encounter:**
- Event: 2% chance per tick → "You found a coin on the street" → +1 gold
- Only active when character has condition "homeless"

### Scenario

All events are defined in one place as a single static scenario (the "world"). In the future, a scenario builder will let anyone create their own world. For now, one hardcoded scenario.

Events are defined as data (JSON-like structures), not code. The engine reads event definitions and executes them generically.

## Time System

| Metric | Value |
|---|---|
| Game lifespan | Age 10 to 80 (70 years) |
| Real-time duration | 14 hours (50,400 seconds) |
| In-game days per year | 365 |
| Total in-game days | 25,550 |
| Real seconds per in-game day | ~1.97s |
| Tick interval | 100ms |
| Ticks per in-game day | ~19.7 |
| Ticks per in-game year | ~7,196 |

### Speed control

The engine uses a `gameSpeed` multiplier applied to delta time. This affects everything — time progression, XP gain.

UI exposes two buttons: slow down (÷2) and speed up (×2). Range: 0.25x to 64x. The speed multiplier is part of game state so it persists across sessions.

## Game State Structure

Single reactive object. This is the complete source of truth.

```
gameState
├── time
│   ├── day (current day within year, 1-365)
│   ├── age (current age, starts at 10)
│   ├── totalDays (total elapsed days)
│   ├── gameSpeed (multiplier, default 1.0)
│   └── paused (boolean)
├── character
│   ├── name
│   ├── avatar
│   ├── stats (strength, dexterity, intelligence, health)
│   ├── gold (current balance)
│   ├── totalIncome (lifetime)
│   ├── totalSpending (lifetime)
│   └── conditions (list of active condition IDs — health, starvation, illness, wounds)
├── jobs
│   ├── current (active job ID or null)
│   ├── available (list of unlocked job IDs)
│   └── experience (map: jobId → XP)
├── skills
│   ├── current (active skill ID or null)
│   ├── available (list of unlocked skill IDs)
│   └── experience (map: skillId → XP)
├── assets
│   ├── inventory (list of item IDs — carry-on items)
│   └── world (list of world asset IDs — property, housing, land)
├── events
│   ├── active (list of active event instances)
│   └── log (history of recent event messages)
└── ui
    └── activeTab (current tab selection)
```

## Project Structure

```
src/
  game/
    state.ts              # Reactive game state + save/load to localStorage
    engine.ts             # Tick loop: advance time, grant XP, auto-save
    systems/
      progression.ts      # Shared XP/level formula: totalXp = 93 × L^1.68
  data/
    jobs.ts               # Job definitions (id, name, description, baseIncome)
    skills.ts             # Skill definitions (id, name, description)
  ui/
    GameTabs.vue          # Tab container for middle section
    JobsTab.vue           # Jobs list with levels and progress bars
    SkillsTab.vue         # Skills list with levels and progress bars
    AssetsTab.vue         # Assets tab (placeholder)
    EventsTab.vue         # Events tab (placeholder)
    ProgressBar.vue       # Reusable XP progress bar component
  components/
    Character.vue         # Character name, avatar, reroll button
  App.vue                 # Root layout: left panel + GameTabs
  main.ts                 # Bootstrap: init state, start engine, mount app
  style.css               # Global reset styles
```

## Engine Loop (tick)

Each tick (100ms real time):

```
1. Calculate delta = real elapsed time × gameSpeed
2. Advance time (convert delta to in-game days)
3. Grant XP to active job and active skill (base × gameSpeed)
4. Auto-save to localStorage every 2 seconds
5. Vue reactivity automatically updates UI
```

## Data Flow

```
Player clicks a job → gameState.jobs.current = jobId
  → next tick: engine grants XP to that job
    → gameState.jobs.xp[jobId] increases
      → Vue re-renders level + progress bar
```

## Persistence

Game state auto-saves to localStorage every 2 seconds while running. Also saves immediately on pause, speed change, and tab close (`beforeunload`). On startup, loads saved state and merges with defaults (handles new fields gracefully). Corrupted saves fall back to defaults.

## Technology

- **Vue 3** with Composition API (`<script setup>`)
- **TypeScript** with strict mode
- **Vite** for dev server and builds
- **Vue `reactive()`** for state (no Pinia/Vuex — single reactive object is sufficient)
- **No backend** — fully client-side, static deployment to GitHub Pages
