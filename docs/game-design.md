# Game Design Document

**Slogan:** One life. Countless paths.

## Overview

The game is centered around one character throughout their entire lifespan. Gameplay lasts 14 hours in real time. The character's story begins at age 10 and continues until age 80 (70 in-game years = 25,550 in-game days over 50,400 real seconds).

Inspired by idle incremental games with RPG elements. The character starts with basic, randomly generated stats that influence their development throughout the game.

## Character

### Basic Info

- **Name**: Randomly generated at game start
- **Avatar**: Pixel art representation

### Stats

- **Strength**: Physical power. Affects ability to perform physical tasks and job requirements.
- **Dexterity**: Agility and precision. Influences evasion, delicate tasks, and job requirements.
- **Concentration / Intelligence / Wisdom**: Focus and mental endurance. Affects skill usage and learning.
- **Health**: Vitality and overall well-being.

### Money Tracker

A single general gold tracker represents the character's wealth.

### Condition System (Optional)

Tracks multiple simultaneous conditions — health, starvation, illness, wounds — that affect the character's overall state and stats.

## Gameplay

### UI Layout

- **Left panel (static)**: Player section visible across all tabs. Displays:
  - Current age and passing days (time flow)
  - Money tracker with total income and spending near the balance
  - Key character stats
- **Middle section**: Tabbed content area

### Tabs

#### Jobs

- Character can hold one job at a time
- Working a job slowly gains experience, improving effectiveness
- Base income scales with experience (geometric progression, capped)
- Specific jobs provide a static stat boost for learning particular skills (not affected by job experience)
- **Starting job**: Begging

#### Skills

- Player can practice one skill at a time
- Skills have levels; each level requires progressively more time
- Experience gain is static
- Skill levels affect base job income via a multiplier
- **Starting skills**: A basic set available from the start

#### Assets (Holdings)

- **Property**: Choose one housing option at a time. Starting option: Street Shelter.
- **Inventory**: Items the character owns.
- **Other Belongings**: Additional personal assets.

#### Active Events

Tracks ongoing events or activities requiring player attention.

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
