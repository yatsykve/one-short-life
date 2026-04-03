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

export const gameState = reactive<GameState>({
  time: {
    day: 1,
    age: 10,
    totalDays: 0,
    gameSpeed: 1,
    paused: true,
  },
})

export function resetState() {
  gameState.time.day = 1
  gameState.time.age = 10
  gameState.time.totalDays = 0
  gameState.time.gameSpeed = 1
  gameState.time.paused = true
}
