# Backlog

Prioritized list of ideas and future work. Keep this list ordered by priority — higher items are closer to implementation.

## Near-term

1. **Main menu / New Game flow** — Replace the prototype Reroll button with a proper pre-game menu. Player sets name and avatar before starting. Once the game is in progress, the character is locked — no rerolling. The menu also houses the New Game action (full reset). The in-game Reroll button in `Character.vue` should be removed as part of this work.
2. **Economy system** — Jobs earn gold based on baseIncome × level. Display balance in left panel.
2. **Offline progress** — When player returns, calculate what happened while away based on elapsed real time. Core idle game feature.
3. **More jobs and skills** — Expand beyond the initial 3 of each. Add unlock requirements (level, stats).

## Medium-term

4. **Character stats** — Strength, Dexterity, Intelligence, Health. Derived from skills, conditions, and events.
5. **Condition system** — Health, starvation, illness, wounds. Multiple simultaneous conditions affecting stats and gameplay. Applied/removed by events.
6. **Assets: Inventory** — Carry-on items (tools, clothing, consumables) acquired through events.
7. **Assets: World** — Property/housing options with effects on character. Starting: Street Shelter.
8. **Event system** — Generic event processor. Events as data with probability, effects, conditions. Everything driven by events instead of direct engine logic.

## Long-term

9. **Places** — Locations the character can visit or inhabit.
10. **Scenario builder** — Let anyone create their own world by defining events, jobs, skills.
11. **Backend sync** — Cloud saves and scenario sharing via full state snapshots.
12. **Multiple scenarios** — Load different worlds/scenarios.
