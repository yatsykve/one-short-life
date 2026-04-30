<template>
  <div class="character">
    <h2>{{ gameState.character.name }}</h2>
    <img :src="gameState.character.avatar" alt="Avatar" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gameState } from '../game/state'
import { setCharacter } from '../game/mutations'

const names = ['Liam', 'Emma', 'Noah', 'Olivia', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver']

function generate() {
  const name = names[Math.floor(Math.random() * names.length)]
  const avatar = `${import.meta.env.BASE_URL}avatars/avatar1.webp`
  setCharacter(name, avatar)
}

onMounted(() => {
  if (!gameState.character.name) generate()
})
</script>

<style scoped>
.character h2 {
  color: #264653;
  margin: 0 0 8px 0;
}

.character img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>
