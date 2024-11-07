<template>
  <div class="character">
    <h2>{{ character.name }}</h2>
    <p>Age: {{ character.age }}</p>
    <img :src="character.avatar" alt="Avatar Image"/>
    <p></p>
    <button @click="resetCharacter">Generate New Character</button>
  </div>
</template>

<script>
export default {
  name: 'Character',
  data() {
    return {
      character: {
        name: '',
        age: null,
        avatar: '',
      },
    };
  },
  created() {
    this.initializeCharacter();
  },
  methods: {
    initializeCharacter() {
      const savedCharacter = localStorage.getItem('character');
      if (savedCharacter) {
        this.character = JSON.parse(savedCharacter);
      } else {
        this.generateCharacter();
      }
    },
    resetCharacter() {
      localStorage.removeItem('characterData');
      this.generateCharacter();
    },
    generateCharacter() {
      this.character.name = this.generateRandomName();
      this.character.age = 10;
      this.character.avatar = this.getRandomAvatar();
      localStorage.setItem('character', JSON.stringify(this.character));
    },
    generateRandomName() {
      const names = ['Liam', 'Emma', 'Noah', 'Olivia', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver'];
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
    },
    getRandomAvatar() {
      const avatarNumber = Math.floor(Math.random() * 1) + 1;
      return `${import.meta.env.BASE_URL}/avatars/avatar${avatarNumber}.webp`;
    },
  },
};
</script>

<style scoped>
.character {
  text-align: center;
  width: 250px;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 8px; /* Rounds the corners slightly */
  position: absolute; /* Positions it relative to the top-left of the screen */
  top: 15px; /* Adjusts the distance from the top */
  left: 15px; /* Adjusts the distance from the left */
  background-color: #ede0d4;
}

.character img {
  width: 150px;
  height: 150px;
  border-radius: 80%;
  margin-top: 10px;
}
</style>
