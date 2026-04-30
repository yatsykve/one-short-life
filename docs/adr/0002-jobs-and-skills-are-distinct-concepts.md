# Jobs and Skills are distinct concepts — do not abstract over both

Jobs and Skills share the same XP/leveling mechanics today and their tab components look nearly identical. We deliberately chose not to extract a shared composable or helper library over them.

Jobs are things you *work* (occupation, income). Skills are things you *practice* (personal ability, stat boosts). They will diverge as the game grows: jobs will gain income logic, skills will gain stat multipliers and condition effects. Abstracting now would either constrain that divergence or be ripped out when it arrives.

Duplicate code in `JobsTab.vue` and `SkillsTab.vue` is intentional. Let each evolve independently.

## Considered options

- **`useProgression(domain)` composable** — rejected: conflates two distinct domain concepts at the code level.
- **Shared helper functions in `progression.ts`** — rejected: same problem, just smaller. The duplication is not accidental — it reflects real domain separation.
