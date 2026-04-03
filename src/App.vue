<template>
  <div id="app">
    <div class="player-panel">
      <h1>One Short Life</h1>
      <p class="slogan">One life. Countless paths.</p>
      <hr />

      <Character />

      <div class="time-display">
        <p class="age">Age: {{ gameState.time.age }}</p>
        <p class="day">Day {{ gameState.time.day }} of 365</p>
        <p class="speed" v-if="gameState.time.gameSpeed !== 1">
          Speed: {{ gameState.time.gameSpeed }}x
        </p>
      </div>

      <div class="controls">
        <button @click="togglePause">
          {{ gameState.time.paused ? 'Play' : 'Pause' }}
        </button>
        <button @click="toggleSpeed">
          {{ gameState.time.gameSpeed === 1 ? '2x' : '1x' }}
        </button>
        <button @click="skip10Days">+10 days</button>
      </div>
    </div>

    <GameTabs />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gameState, saveState } from './game/state'
import { startEngine, stopEngine, skipDays } from './game/engine'
import Character from './components/Character.vue'
import GameTabs from './ui/GameTabs.vue'

function togglePause() {
  gameState.time.paused = !gameState.time.paused
  saveState()
}

function toggleSpeed() {
  gameState.time.gameSpeed = gameState.time.gameSpeed === 1 ? 2 : 1
}

function skip10Days() {
  skipDays(10)
}

function onBeforeUnload() {
  saveState()
}

onMounted(() => {
  window.addEventListener('beforeunload', onBeforeUnload)
  startEngine()
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', onBeforeUnload)
  saveState()
  stopEngine()
})
</script>

<style scoped>
#app {
  background-color: #264653;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding: 15px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.player-panel {
  background-color: #ede0d4;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  flex-shrink: 0;
  text-align: center;
}

.player-panel h1 {
  color: #264653;
  margin: 0 0 4px 0;
  font-size: 1.4em;
}

.slogan {
  color: #6b6b6b;
  font-style: italic;
  margin: 0 0 10px 0;
}

.player-panel hr {
  border: none;
  border-top: 1px solid #7a5c3b;
  margin: 10px 0;
}

.time-display {
  margin: 16px 0;
}

.time-display .age {
  color: #3e3e3e;
  font-size: 1.2em;
  font-weight: bold;
  margin: 0 0 4px 0;
}

.time-display .day {
  color: #6b6b6b;
  margin: 0 0 4px 0;
}

.time-display .speed {
  color: #7a5c3b;
  font-weight: bold;
  margin: 0;
}

.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.controls button {
  background-color: #264653;
  color: #ede0d4;
  border: none;
  border-radius: 4px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 0.9em;
}

.controls button:hover {
  background-color: #1a3340;
}
</style>
