<template>
  <div id="app">
    <h1>Cat Information</h1>
    <button @click="fetchCats">Get Cats</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      message: '',
    };
  },
  methods: {
    async fetchCats() {
      try {
        const response = await axios.get('http://localhost:3000/cats');
        this.message = response.data;
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
