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

The engine uses a `gameSpeed` multiplier applied to delta time. This affects everything — all systems consume the same delta.

Speed control is needed for:
- **Development/testing** (10x, 50x, etc.)
- **Game events** (an event could slow or speed time as a mechanic)
- **User settings** (1x, 1.5x, 2x exposed in UI)

The speed multiplier is part of game state so it can be saved/restored.

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
    state.ts              # Reactive game state definition + initialization
    engine.ts             # Tick loop: advance time, process active events
    actions.ts            # Player actions (start job, practice skill, respond to event)
    events/
      processor.ts        # Generic event processor (reads event definitions, applies effects)
      types.ts            # Event type definitions
    systems/
      time.ts             # Advance day/age based on delta
      jobs.ts             # Job XP gain, income calculation
      skills.ts           # Skill XP gain, level calculation
      conditions.ts       # Condition checks and effects
    persistence.ts        # Save/load to localStorage (backlog — not yet implemented)
  data/
    scenario.ts           # The world definition: all potential events, jobs, skills, properties
    jobs.ts               # Job definitions (id, name, base income, stat requirements)
    skills.ts             # Skill definitions (id, name, XP curve)
    events.ts             # Event definitions (id, probability, effects, conditions)
    properties.ts         # Housing definitions
  ui/
    components/
      PlayerPanel.vue     # Left side: character info, age, day counter, gold
      GameTabs.vue        # Tab container for middle section
      JobsTab.vue         # Jobs tab content
      SkillsTab.vue       # Skills tab content
      AssetsTab.vue       # Assets tab content
      EventsTab.vue       # Active events tab content
      SpeedControl.vue    # Pause / speed adjustment controls
  App.vue                 # Root layout: PlayerPanel + GameTabs
  main.ts                 # Bootstrap: init state, start engine, mount app
  style.css               # Global styles
```

## Engine Loop (tick)

Each tick (100ms real time):

```
1. Calculate delta = real elapsed time × gameSpeed
2. Advance time (convert delta to in-game days)
3. For each active event:
   a. Roll probability against random number
   b. If triggered: apply effects (modify state, add/remove events, push log message)
4. Vue reactivity automatically updates UI
```

Systems like jobs, skills, and conditions don't have their own tick functions — they are driven entirely by events. The engine is a generic event processor.

## Data Flow

```
Player clicks "Start Begging"
  → actions.ts: activate job-related events
    → state.events.active gets new entries
      → next tick: engine processes them
        → state.economy.gold increases
        → state.jobs.experience updates
          → Vue re-renders UI
```

## Technology

- **Vue 3** with Composition API (`<script setup>`)
- **TypeScript** with strict mode
- **Vite** for dev server and builds
- **Vue `reactive()`** for state (no Pinia/Vuex — single reactive object is sufficient)
- **No backend** — fully client-side, static deployment to GitHub Pages
