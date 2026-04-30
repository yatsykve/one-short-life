# Job and Skill logic belongs to their definitions, not to system modules

Income formulas, stat effects, and other per-Job or per-Skill calculations belong to the Job/Skill definition objects themselves — not to a separate `systems/jobs.ts` or `systems/skills.ts` module that calculates over them.

Jobs and Skills are designed to be data-driven and dynamically loaded: they appear and disappear in the game based on events, defined in a scenario format and loaded into the current game context at runtime. Each definition carries its own behaviour. A centralised system module would need to know about every job variant — that's the wrong direction.

Do not build a `systems/jobs.ts` or `systems/skills.ts` calculation layer. When income or stat formulas are needed, put them on the definition object, read by the event system.

## Considered options

- **System module** (`systems/jobs.ts`) owns income formula — rejected: centralises logic that belongs to individual definitions, fights the dynamic/data-driven design.
- **Logic on the definition** — accepted: each Job/Skill definition carries its own formula; the event system reads and executes it generically.
