<template>
  <div>
    <h3>Skills</h3>
    <div
      v-for="skill in skills"
      :key="skill.id"
      :class="['entity-row', { active: gameState.skills.current === skill.id }]"
      @click="toggle(skill.id)"
    >
      <div class="entity-header">
        <span class="entity-name">{{ skill.name }}</span>
        <span class="entity-level">Lv {{ getLevel(skill.id) }}</span>
      </div>
      <p class="entity-desc">{{ skill.description }}</p>
      <ProgressBar :percent="getProgress(skill.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { gameState, saveState } from '../game/state'
import { skills } from '../data/skills'
import { levelFromXp, progressToNextLevel } from '../game/systems/progression'
import ProgressBar from './ProgressBar.vue'

function getXp(id: string) {
  return gameState.skills.xp[id] ?? 0
}

function getLevel(id: string) {
  return levelFromXp(getXp(id))
}

function getProgress(id: string) {
  return progressToNextLevel(getXp(id))
}

function toggle(id: string) {
  gameState.skills.current = gameState.skills.current === id ? null : id
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
