<template>
  <div class="home">
    <h1>Welcome to Hoadrea's E-Commerce Site</h1>
    <div class="image-container">
      <img src="@/assets/cart.png" alt="Sample" class="square-image">
    </div>
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
}
.image-container {
  margin: 20px auto;
  width: 150px; 
  height: 150px; 
  overflow: hidden;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
}
.square-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}
.image-container:hover {
  width: 200px; 
  height: 200px; 
}
.image-container:hover .square-image {
  transform: scale(1.1); 
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
  background-color: #388E3C; 
}
</style>
