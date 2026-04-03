<template>
  <div class="character">
    <h1>One Short Life</h1>
    <p class="slogan">One life. Countless paths.</p>
    <hr />
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
  border-radius: 8px;
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #ede0d4;
}

.character h1 {
  margin: 0 0 4px 0;
  font-size: 1.4em;
}

.slogan {
  font-style: italic;
  margin: 0 0 10px 0;
}

.character hr {
  border: none;
  border-top: 1px solid #7a5c3b;
  margin: 10px 0;
}

.character img {
  width: 150px;
  height: 150px;
  border-radius: 80%;
  margin-top: 10px;
}
</style>
