<template>
  <div class="client-register">
    <h2>Client Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="client-email">Email:</label>
        <input type="email" id="client-email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="client-password">Password:</label>
        <div class="password-container">
          <input :type="passwordFieldType" id="client-password" v-model="password" required>
        </div>
      </div>
      <div class="form-group">
        <label for="client-confirm-password">Confirm Password:</label>
        <div class="password-container">
          <input :type="passwordFieldType" id="client-confirm-password" v-model="confirmPassword" required>
        </div>
      </div>
      <div class="form-group">
        <button type="button" @click="togglePasswordVisibility" class="toggle-password-button">
          {{ passwordFieldType === 'password' ? 'Show Passwords' : 'Hide Passwords' }}
        </button>
      </div>
      <div class="button-group">
        <button type="button" @click="$emit('set-view', 'client')" class="back-button">Back to Login</button>
        <button type="submit" class="register-button">Register</button>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientRegister',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      passwordFieldType: 'password',
      errorMessage: ''
    }
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage ='Passwords do not match!';
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/user/register', {
          email: this.email,
          password: this.password,
          admin: false
        });

        if (response.data && response.data.success) {
          this.$emit('set-view', 'clientInterface');
        } else {
          this.errorMessage = response.data.message || 'Registration failed';
        }
      } catch (error) {
        console.error('Error during registration:', error);
        this.errorMessage = 'This email already exists!';
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
</script>

<style scoped>
.client-register {
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
  margin-top: 10px;
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
button.register-button, button.back-button {
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 48%;
  transition: background-color 0.3s;
}
button.register-button:hover {
  background-color: #2196F3;
}
button.back-button:hover {
  background-color: #D32F2F;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
