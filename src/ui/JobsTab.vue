<template>
  <div>
    <h3>Jobs</h3>
    <div
      v-for="job in jobs"
      :key="job.id"
      :class="['entity-row', { active: gameState.jobs.current === job.id }]"
      @click="toggle(job.id)"
    >
      <div class="entity-header">
        <span class="entity-name">{{ job.name }}</span>
        <span class="entity-level">Lv {{ getLevel(job.id) }}</span>
      </div>
      <p class="entity-desc">{{ job.description }}</p>
      <ProgressBar :percent="getProgress(job.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { gameState, saveState } from '../game/state'
import { jobs } from '../data/jobs'
import { levelFromXp, progressToNextLevel } from '../game/systems/progression'
import ProgressBar from './ProgressBar.vue'

function getXp(id: string) {
  return gameState.jobs.xp[id] ?? 0
}

function getLevel(id: string) {
  return levelFromXp(getXp(id))
}

function getProgress(id: string) {
  return progressToNextLevel(getXp(id))
}

function toggle(id: string) {
  gameState.jobs.current = gameState.jobs.current === id ? null : id
  saveState()
}
</script>

<style scoped>
h3 { color: #264653; margin: 0 0 12px 0; }

.entity-row {
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ddd0c0;
}

.entity-row:hover {
  border-color: #7a5c3b;
}

.entity-row.active {
  border-color: #264653;
  background-color: #d5c7b0;
}

.entity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.entity-name {
  color: #3e3e3e;
  font-weight: bold;
}

.entity-level {
  color: #7a5c3b;
  font-weight: bold;
  font-size: 0.9em;
}

.entity-desc {
  color: #6b6b6b;
  font-size: 0.85em;
  margin: 0 0 8px 0;
}
</style>
