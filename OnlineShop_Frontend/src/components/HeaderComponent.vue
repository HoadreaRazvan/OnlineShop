<template>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/cart">Cart</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  };
  </script>
  
  <style scoped>
  header {
    background: #333;
    color: white;
    padding: 1rem;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
  }
  
  nav ul li {
    margin: 0 1rem;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  </style>
  