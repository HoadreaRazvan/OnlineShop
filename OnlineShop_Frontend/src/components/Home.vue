<!-- src/components/Home.vue -->
<template>
  <div class="home">
    <h1>Welcome to Our E-Commerce Site</h1>
    <p>Please choose an option to login:</p>
    <button @click="$emit('set-view', 'admin')" class="login-button">Admin Login</button>
    <button @click="$emit('set-view', 'client')" class="login-button">Client Login</button>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 100px;
  animation: fadeIn 2s ease-in;
}
button.login-button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
button.login-button:hover {
  background-color: #45a049;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
