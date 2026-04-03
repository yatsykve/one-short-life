import { reactive } from 'vue'

export interface TimeState {
  day: number        // current day within year, 1-365
  age: number        // current age, starts at 10
  totalDays: number  // total elapsed in-game days
  gameSpeed: number  // multiplier, default 1.0
  paused: boolean
}

export interface GameState {
  time: TimeState
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
}

export const gameState = reactive<GameState>(loadState())

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as GameState
      return { time: { ...defaults.time, ...saved.time } }
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
  saveState()
}
