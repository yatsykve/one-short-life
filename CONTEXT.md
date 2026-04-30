# One Short Life

An idle incremental RPG about a single character's life from age 10 to 80. The player shapes their character's path by choosing what to work and practice over 14 real hours of play.

## Language

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

## Relationships

- A **Job** and a **Skill** both use **Progression**, but are otherwise independent concepts
- **Conditions** are applied and removed by **Events**
- At most one **Job** and one **Skill** can be active at a time

## Example dialogue

> **Dev:** "Should we share code between the Job and Skill tabs since they look the same?"
> **Domain expert:** "No — a Job is what you work for income, a Skill is what you practice for ability. They'll diverge. Keep them separate."
