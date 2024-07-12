<!-- src/components/ClientLogin.vue -->
<template>
  <div class="client-login">
    <h2>Client Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="client-email">Email:</label>
        <input type="email" id="client-email" v-model="email" required>
      </div>
      <div>
        <label for="client-password">Password:</label>
        <input type="password" id="client-password" v-model="password" required>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <button @click="$emit('set-view', 'home')" class="back-button">Back</button>
  </div>
</template>

<script>
export default {
  name: 'ClientLogin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Implementare login client
      console.log('Client login', this.email, this.password);
    }
  }
}
</script>

<style scoped>
.client-login {
  max-width: 300px;
  margin: 100px auto;
  animation: slideIn 1s ease-in-out;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input {
  padding: 8px;
  margin-top: 5px;
}
button.login-button, button.back-button {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
button.login-button:hover, button.back-button:hover {
  background-color: #45a049;
}
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
</style>
