# Game Design Document

**Slogan:** One life. Countless paths.

## Overview

The game is centered around one character throughout their entire lifespan. Gameplay lasts 14 hours in real time. The character's story begins at age 10 and continues until age 80 (70 in-game years = 25,550 in-game days over 50,400 real seconds).

Inspired by idle incremental games with RPG elements. The character starts with basic, randomly generated stats that influence their development throughout the game.

## Global Entities

The game has five top-level entities. Each maps to a tab in the UI (except Character, which lives in the left panel).

### 1. Character

The player's avatar and core identity. Always visible in the left panel.

- **Name**: Randomly generated at game start
- **Avatar**: Pixel art representation
- **Stats**: Strength, Dexterity, Intelligence, Health
- **Money**: Single gold tracker (balance, lifetime income, lifetime spending)
- **Conditions**: Part of the character. Tracks multiple simultaneous states — health, starvation, illness, wounds — that affect stats and gameplay. Conditions are applied/removed by events.

### 2. Jobs

All possible jobs the character can work. Displayed as a full list; one job can be active at a time.

- Working a job slowly gains experience, improving effectiveness
- Base income scales with experience (geometric progression, capped)
- Specific jobs provide a static stat boost for learning particular skills (not affected by job experience)
- Jobs use the same progression system as skills (see Progression System below)
- **Starting job**: Begging

### 3. Skills

All possible skills the character can practice. Displayed as a full list; one skill can be active at a time.

- Skills use the same progression system as jobs (see Progression System below)
- Skill levels affect base job income via a multiplier
- **Starting skills**: A basic set available from the start

## Progression System

Jobs and skills share the same XP/leveling mechanic. Each tick while active, the entity gains XP. The level is derived from accumulated XP via a single smooth formula.

### XP Per Tick

Each active job or skill gains a base amount of XP per tick (currently 1 XP/tick). Future modifiers (stats, items, events) can scale this.

### Level Formula

Single smooth power curve — no phases, no discontinuities, no hard cap:

`totalXp = 93 × L^1.68`

**Target pacing** (at 1 XP/tick, ~7,200 ticks/year):
- Level 20 by ~2 in-game years (~14,400 XP)
- Level 100 by ~30 in-game years (~213,000 XP)
- Levels continue indefinitely beyond 100

Each next level costs slightly more XP than the last (sub-quadratic growth). The curve is smooth everywhere — no jumps or boundary effects.

### Progress Bar

Each job/skill displays a progress bar showing XP progress toward the next level. The bar fills from 0% to 100% as XP accumulates between the current and next level thresholds.

### 4. Assets

Things the character owns. Divided into two categories:

- **Carry-on (Inventory)**: Items the character carries — tools, clothing, consumables. Portable and personal.
- **World assets**: Things that exist in the world — property, housing, land. Starting option: Street Shelter.

*Not yet implemented.*

### 5. Events

A list of events waiting for the player's input or attention. These are active events that have triggered and require a decision or acknowledgement.

*Not yet implemented.*

### Future: Places

Locations the character can visit or inhabit. Not yet designed — placeholder for future expansion.

## Gameplay

### UI Layout

- **Left panel (static)**: Character section visible across all tabs. Displays:
  - Current age and passing days (time flow)
  - Money tracker with total income and spending near the balance
  - Key character stats and conditions
- **Middle section**: Tabbed content area (Jobs, Skills, Assets, Events)

## Events System

**Everything in the game is an event.** Without events, the character exists in an empty world — time passes but nothing happens. No jobs, no skills, no income, no death. Death itself is an event with a small editable probability.

The game world is described as:
- A list of **potential events** (the scenario definition)
- A list of **active events** (currently running, checked each tick)

Each active event has a probability of firing each tick. When it fires, it can update anything: stats, conditions, money, available jobs, unlock new content, add/remove other events.

### Examples

**Working a job:**
1. Player clicks "Start working as Beggar"
2. Two events activate: one for earning income (100% per tick), one for gaining job skill XP (100% per tick)
3. Player stops working → both events deactivate

**Random encounter:**
- 2% chance per tick: "You found a coin" → +1 gold
- Only active when character has condition "homeless"

### Scenario

All events are defined as data in a single scenario (the "world"). The engine reads event definitions and processes them generically. In the future, a scenario builder will let anyone create their own world.

### Event Administration

Events are defined as structured data (JSON-like) with unique IDs. For now, defined in code as TypeScript data files. Future: loaded from backend or user-created scenario files.
