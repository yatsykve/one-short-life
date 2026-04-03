/**
 * Shared progression system for jobs and skills.
 *
 * Single smooth power curve: totalXp = 93 × L^1.68
 *
 * Targets (at 1 XP/tick, ~7,200 ticks/year):
 *   Level 20  by ~2 years  (~14,400 XP)
 *   Level 100 by ~30 years (~213,000 XP)
 *   No hard cap — levels continue indefinitely.
 */

const A = 93
const B = 1.68

export function totalXpForLevel(level: number): number {
  if (level <= 0) return 0
  return A * Math.pow(level, B)
}

export function levelFromXp(xp: number): number {
  if (xp <= 0) return 0
  return Math.floor(Math.pow(xp / A, 1 / B))
}

export function progressToNextLevel(xp: number): number {
  const level = levelFromXp(xp)
  const currentThreshold = totalXpForLevel(level)
  const nextThreshold = totalXpForLevel(level + 1)
  return (xp - currentThreshold) / (nextThreshold - currentThreshold)
}
