import { _mutableState as s, saveState } from './state'

const TOTAL_GAME_DAYS = 25_550
const MAX_AGE = 80

export function setCharacter(name: string, avatar: string): void {
  s.character.name = name
  s.character.avatar = avatar
  saveState()
}

export function advanceTime(daysDelta: number): void {
  s.time.totalDays += daysDelta

  const totalYears = s.time.totalDays / 365
  s.time.age = Math.floor(10 + totalYears)
  s.time.day = Math.floor((s.time.totalDays % 365) + 1)

  if (s.time.age >= MAX_AGE) {
    s.time.age = MAX_AGE
    s.time.day = 365
    s.time.totalDays = TOTAL_GAME_DAYS
    s.time.paused = true
  }
}

export function grantJobXp(id: string, amount: number): void {
  s.jobs.xp[id] = (s.jobs.xp[id] ?? 0) + amount
}

export function grantSkillXp(id: string, amount: number): void {
  s.skills.xp[id] = (s.skills.xp[id] ?? 0) + amount
}

export function pauseGame(): void {
  s.time.paused = true
  saveState()
}

export function togglePause(): void {
  s.time.paused = !s.time.paused
  saveState()
}

export function setSpeed(speed: number): void {
  s.time.gameSpeed = speed
  saveState()
}

export function selectJob(id: string | null): void {
  s.jobs.current = id
  saveState()
}

export function selectSkill(id: string | null): void {
  s.skills.current = id
  saveState()
}
