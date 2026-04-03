import { reactive } from 'vue'

export interface TimeState {
  day: number
  age: number
  totalDays: number
  gameSpeed: number
  paused: boolean
}

export interface JobsState {
  current: string | null
  xp: Record<string, number>
}

export interface SkillsState {
  current: string | null
  xp: Record<string, number>
}

export interface GameState {
  time: TimeState
  jobs: JobsState
  skills: SkillsState
}

const STORAGE_KEY = 'oneShortLife_gameState'

const defaults: GameState = {
  time: {
    day: 1,
    age: 10,
    totalDays: 0,
    gameSpeed: 1,
    paused: true,
  },
  jobs: {
    current: null,
    xp: {},
  },
  skills: {
    current: null,
    xp: {},
  },
}

export const gameState = reactive<GameState>(loadState())

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as GameState
      return {
        time: { ...defaults.time, ...saved.time },
        jobs: { ...defaults.jobs, ...saved.jobs },
        skills: { ...defaults.skills, ...saved.skills },
      }
    }
  } catch {
    // corrupted save — start fresh
  }
  return structuredClone(defaults)
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
}

export function resetState() {
  Object.assign(gameState.time, structuredClone(defaults.time))
  Object.assign(gameState.jobs, structuredClone(defaults.jobs))
  Object.assign(gameState.skills, structuredClone(defaults.skills))
  saveState()
}
