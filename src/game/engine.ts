import { gameState, saveState } from './state'

const TICK_INTERVAL = 100 // ms
const REAL_SECONDS_TOTAL = 50_400 // 14 hours
const TOTAL_GAME_DAYS = 25_550 // 70 years × 365 days
const DAYS_PER_REAL_SECOND = TOTAL_GAME_DAYS / REAL_SECONDS_TOTAL // ~0.507

const SAVE_INTERVAL = 2000 // ms
const BASE_XP_PER_TICK = 1

let lastTimestamp = 0
let lastSaveTime = 0
let tickTimer: ReturnType<typeof setInterval> | null = null

function tick() {
  const now = performance.now()
  if (lastTimestamp === 0) {
    lastTimestamp = now
    lastSaveTime = now
    return
  }

  if (gameState.time.paused) {
    lastTimestamp = now
    return
  }

  const realElapsedMs = now - lastTimestamp
  lastTimestamp = now

  const realElapsedSec = realElapsedMs / 1000
  const daysDelta = realElapsedSec * DAYS_PER_REAL_SECOND * gameState.time.gameSpeed

  advanceTime(daysDelta)
  grantXp(gameState.time.gameSpeed)

  if (now - lastSaveTime >= SAVE_INTERVAL) {
    saveState()
    lastSaveTime = now
  }
}

function advanceTime(daysDelta: number) {
  gameState.time.totalDays += daysDelta

  const totalYears = gameState.time.totalDays / 365
  gameState.time.age = Math.floor(10 + totalYears)
  gameState.time.day = Math.floor((gameState.time.totalDays % 365) + 1)

  if (gameState.time.age >= 80) {
    gameState.time.age = 80
    gameState.time.day = 365
    gameState.time.paused = true
  }
}

function grantXp(speed: number) {
  const xp = BASE_XP_PER_TICK * speed

  const activeJob = gameState.jobs.current
  if (activeJob) {
    gameState.jobs.xp[activeJob] = (gameState.jobs.xp[activeJob] ?? 0) + xp
  }

  const activeSkill = gameState.skills.current
  if (activeSkill) {
    gameState.skills.xp[activeSkill] = (gameState.skills.xp[activeSkill] ?? 0) + xp
  }
}

export function startEngine() {
  if (tickTimer) return
  lastTimestamp = 0
  tickTimer = setInterval(tick, TICK_INTERVAL)
}

export function stopEngine() {
  if (tickTimer) {
    clearInterval(tickTimer)
    tickTimer = null
  }
}
