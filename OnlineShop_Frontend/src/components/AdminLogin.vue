<!-- src/components/AdminLogin.vue -->
<template>
  <div class="admin-login">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="admin-email">Email:</label>
        <input type="email" id="admin-email" v-model="email" required>
      </div>
      <div>
        <label for="admin-password">Password:</label>
        <input type="password" id="admin-password" v-model="password" required>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <button @click="$emit('set-view', 'home')" class="back-button">Back</button>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Implementare login admin
      console.log('Admin login', this.email, this.password);
    }
  }
}
</script>

<style scoped>
.admin-login {
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
