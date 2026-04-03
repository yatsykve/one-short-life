<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: (percent * 100) + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ percent: number }>()
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #c4b3a3;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #264653;
  border-radius: 4px;
  transition: width 0.1s linear;
}
</style>
