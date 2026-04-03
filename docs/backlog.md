# Backlog

Prioritized list of ideas and future work. Keep this list ordered by priority — higher items are closer to implementation.

## Near-term

1. **Persistence (save/load)** — Auto-save to localStorage every few seconds. Load on startup. Essential for any real playtesting since a 14-hour game can't be played in one sitting.
2. **Offline progress** — When player returns, calculate what happened while away based on elapsed real time. Core idle game feature, depends on persistence.

## Medium-term

3. **Condition system** — Health, starvation, illness, wounds. Multiple simultaneous conditions affecting stats and gameplay. Events will apply/remove conditions.
4. **Property system** — Housing options with effects on character. Starting: Street Shelter.
5. **Inventory system** — Items that the character owns, acquired through events.

## Long-term

6. **Scenario builder** — Let anyone create their own world by defining events, jobs, skills. The architecture supports this since the world is entirely data-driven.
7. **Backend sync** — Send full gameState snapshot to server. Enables cloud saves and scenario sharing. Keep sync simple: full state snapshots, no partial sync.
8. **Multiple scenarios** — Load different worlds/scenarios. Depends on scenario builder and backend.
