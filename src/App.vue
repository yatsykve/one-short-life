<template>
  <div id="app">
    <Character/>
  </div>
</template>

<script>
import Character from './components/Character.vue';

export default {
  name: 'App',
  components: {
    Character,
  },
};
</script>

<style scoped>
#app {
  background-color: #264653; /* Page background color */
  color: #3e3e3e; /* Text color */
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: -1vh;
}

h1, h2, h3 {
  color: #264653; /* Title color */
}

h4, h5, h6 {
  color: #7a5c3b; /* Secondary title color */
}

p, span {
  color: #6b6b6b; /* Secondary text color */
}

</style>