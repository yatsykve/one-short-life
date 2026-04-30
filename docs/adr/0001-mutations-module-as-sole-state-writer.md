# mutations.ts is the only legal writer of gameState

`state.ts` is a pure serializable data contract — it owns the shape and persistence of `gameState` but no mutation logic. All writes to `gameState` go through `src/game/mutations.ts`. `gameState` is exported as `Readonly<GameState>` (shallow) to document this intent at the type level.

We chose this over putting mutations in `state.ts` because `state.ts` needs to remain a clean serializable data contract — making save/load trivial and keeping the module focused. A separate `mutations.ts` gives the event system (planned) a single seam to attach side effects (level-ups, income ticks, condition changes) without touching the engine or UI.

## Considered options

- **Mutations in `state.ts`** — rejected: entangles behaviour with the data contract, complicates save/load reasoning.
- **No mutations module, direct writes everywhere** — rejected: engine and UI both knowing the state shape makes refactoring and future event hooks impossible to add cleanly.

## Consequences

All future code (engine, UI components, event system) must import write operations from `mutations.ts`, never write to `gameState` directly. This rule is enforced by the `Readonly<GameState>` export (shallow — prevents slice reassignment) and by instruction in CLAUDE.md.
