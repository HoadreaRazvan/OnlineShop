<template>
  <div class="client-login">
    <h2>Client Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="client-email">Email:</label>
        <input type="email" id="client-email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="client-password">Password:</label>
        <div class="password-container">
          <input :type="passwordFieldType" id="client-password" v-model="password" required>
          <button type="button" @click="togglePasswordVisibility" class="toggle-password-button">
            {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
          </button>
        </div>
      </div>
      <div class="button-group">
        <button type="button" @click="$emit('set-view', 'home')" class="back-button">Back</button>
        <button type="submit" class="login-button">Login</button>
      </div>
      <button type="button" @click="$emit('set-view', 'register')" class="register-button">Register</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientLogin',
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/user/login/client', {
          email: this.email,
          password: this.password
        });

        if (response.data && response.data.success) {
          this.$emit('set-view', 'clientInterface');
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'Invalid email or password';
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
</script>

<style scoped>
.client-login {
  max-width: 300px;
  margin: 100px auto;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.password-container {
  display: flex;
  align-items: center;
}
label {
  margin-bottom: 5px;
}
input {
  padding: 8px;
  font-size: 14px;
  flex: 1;
}
.toggle-password-button {
  margin-left: 5px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  transition: background-color 0.3s;
}
.toggle-password-button:hover {
  background-color: #388E3C;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button.login-button, button.back-button {
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 48%;
  transition: background-color 0.3s;
}
button.login-button:hover {
  background-color: #00ff0d;
}
button.back-button:hover {
  background-color: #D32F2F;
}
.register-button {
  margin-top: 15px;
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}
.register-button:hover {
  background-color: #2196F3;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
