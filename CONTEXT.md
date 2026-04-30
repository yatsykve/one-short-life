# One Short Life

An idle incremental RPG about a single character's life from age 10 to 80. The player shapes their character's path by choosing what to work and practice over 14 real hours of play.

## Language

**Character**:
The player's avatar throughout a single life. Has a name, avatar, age, stats, and conditions. Fully owned by `gameState` — resetting `gameState` means starting a new life with a new Character.
_Avoid_: player, hero, entity

**Job**:
An occupation the character *works*. Earns income per tick while active; levels up through accumulated XP.
_Avoid_: skill, activity, discipline, trainable

**Skill**:
A personal ability the character *practices*. Levels up through accumulated XP; grants stat boosts and income multipliers.
_Avoid_: job, activity, discipline, trainable

**Progression**:
The shared XP/leveling mechanic used by both Jobs and Skills. A character accumulates XP while a Job or Skill is active; level is derived from total XP via a power curve.
_Avoid_: experience system, leveling system

**Condition**:
A named state active on the character (e.g. homeless, ill, wounded) that affects stats and gameplay. Applied and removed by events.
_Avoid_: status, effect, buff, debuff

**Event**:
A game-world occurrence defined as data. Has a probability of firing each tick while active. When it fires, it can update stats, conditions, money, jobs, skills, or other events.
_Avoid_: action, trigger, callback

**Scenario**:
The data definition of a game world — all possible Jobs, Skills, and Events. Loaded at game start; determines what the character can encounter. Jobs and Skills are dynamic: they appear and disappear in the game context based on Events, not as a static list.
_Avoid_: config, data file, world file

## Relationships

- A **Job** and a **Skill** both use **Progression**, but are otherwise independent concepts
- **Conditions** are applied and removed by **Events**
- **Events** load and unload **Jobs** and **Skills** into the game context
- At most one **Job** and one **Skill** can be active at a time
- A **Scenario** defines all possible **Jobs**, **Skills**, and **Events** for a game world

## Example dialogue

> **Dev:** "Should we share code between the Job and Skill tabs since they look the same?"
> **Domain expert:** "No — a Job is what you work for income, a Skill is what you practice for ability. They'll diverge. Keep them separate."
