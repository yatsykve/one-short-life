import { reactive } from 'vue'

export interface TimeState {
  day: number
  age: number
  totalDays: number
  gameSpeed: number
  paused: boolean
}

export interface CharacterState {
  name: string
  avatar: string
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
  character: CharacterState
  time: TimeState
  jobs: JobsState
  skills: SkillsState
}

const STORAGE_KEY = 'oneShortLife_gameState'

const defaults: GameState = {
  character: {
    name: '',
    avatar: '',
  },
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

export const gameState: Readonly<GameState> = reactive<GameState>(loadState())

// Internal mutable reference for mutations.ts only
export const _mutableState = gameState as GameState

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as GameState
      return {
        character: { ...defaults.character, ...saved.character },
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
  Object.assign(_mutableState.character, structuredClone(defaults.character))
  Object.assign(_mutableState.time, structuredClone(defaults.time))
  Object.assign(_mutableState.jobs, structuredClone(defaults.jobs))
  Object.assign(_mutableState.skills, structuredClone(defaults.skills))
  saveState()
}
