<!-- src/components/Header.vue -->
<template>
    <header>
      <h1>My E-Commerce Site</h1>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header'
  }
  </script>
  
  <style scoped>
  header {
    background-color: #4CAF50;
    padding: 20px;
    color: white;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  </style>
  