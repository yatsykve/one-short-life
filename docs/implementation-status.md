# Implementation Status

## What's Built

### Core Engine
- **Tick loop** — 100ms interval, processes time and XP each tick
- **Time system** — Day/age progression from age 10 to 80 (70 in-game years = 14 real hours)
- **Speed control** — Slow down (÷2) and speed up (×2) buttons, range 0.25x–64x
- **Persistence** — Auto-save to localStorage every 2s, load on startup, save on pause/close

### Progression System
- **XP formula** — Single smooth power curve: `totalXp = 93 × L^1.68`, no hard cap
- **Progress bars** — Reusable component showing XP toward next level

### Jobs
- 3 jobs defined: Beggar, Farmer, Apprentice
- Click to activate/deactivate (one active at a time)
- XP granted each tick while active
- Level and progress bar displayed

### Skills
- 3 skills defined: Strength Training, Reading, Crafting
- Same mechanics as jobs — click to activate, XP per tick, level + progress bar

### UI
- **Left panel** — Game title, character (name + avatar + reroll), age/day display, speed controls
- **Middle section** — Tabbed area with Jobs, Skills, Assets, Events tabs
- Assets and Events tabs are placeholders

### Character
- Random name from preset list
- Random avatar (pixel art)
- Persisted to localStorage separately

## Not Yet Built

- Character stats (Strength, Dexterity, Intelligence, Health)
- Money/economy system
- Conditions system
- Assets (inventory + world assets)
- Event system (the generic event processor — currently XP is granted directly by engine)
- Scenario data structure
- Offline progress
