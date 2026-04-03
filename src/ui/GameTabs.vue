<template>
  <div class="game-tabs">
    <nav class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
    <div class="tab-content">
      <JobsTab v-if="activeTab === 'jobs'" />
      <SkillsTab v-if="activeTab === 'skills'" />
      <AssetsTab v-if="activeTab === 'assets'" />
      <EventsTab v-if="activeTab === 'events'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JobsTab from './JobsTab.vue'
import SkillsTab from './SkillsTab.vue'
import AssetsTab from './AssetsTab.vue'
import EventsTab from './EventsTab.vue'

const tabs = [
  { id: 'jobs', label: 'Jobs' },
  { id: 'skills', label: 'Skills' },
  { id: 'assets', label: 'Assets' },
  { id: 'events', label: 'Events' },
]

const activeTab = ref('jobs')
</script>

<style scoped>
.game-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tab-bar {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.tab-btn {
  background-color: #c4b3a3;
  color: #3e3e3e;
  border: none;
  border-radius: 4px 4px 0 0;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: bold;
}

.tab-btn.active {
  background-color: #ede0d4;
  color: #264653;
}

.tab-btn:hover:not(.active) {
  background-color: #d5c7b8;
}

.tab-content {
  background-color: #ede0d4;
  border-radius: 0 8px 8px 8px;
  padding: 20px;
  flex: 1;
}
</style>
