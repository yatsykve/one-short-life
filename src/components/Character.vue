<template>
  <div class="character">
    <h2>{{ character.name }}</h2>
    <img :src="character.avatar" alt="Avatar" />
    <button class="reroll" @click="regenerate">Reroll</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const character = reactive({
  name: '',
  avatar: '',
})

const names = ['Liam', 'Emma', 'Noah', 'Olivia', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver']

function generate() {
  character.name = names[Math.floor(Math.random() * names.length)]
  const avatarNumber = Math.floor(Math.random() * 1) + 1
  character.avatar = `${import.meta.env.BASE_URL}avatars/avatar${avatarNumber}.webp`
  localStorage.setItem('character', JSON.stringify(character))
}

function load(): boolean {
  const saved = localStorage.getItem('character')
  if (saved) {
    const parsed = JSON.parse(saved)
    character.name = parsed.name
    character.avatar = parsed.avatar
    return true
  }
  return false
}

function regenerate() {
  generate()
}

onMounted(() => {
  if (!load()) generate()
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

.reroll {
  display: block;
  margin: 8px auto 0;
  background: none;
  border: 1px solid #7a5c3b;
  color: #7a5c3b;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 0.8em;
}

.reroll:hover {
  background-color: #7a5c3b;
  color: #ede0d4;
}
</style>
