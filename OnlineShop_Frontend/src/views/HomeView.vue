<template>
    <div class="home">
      <h1>Welcome to Our Store</h1>
      <product-list />
    </div>
  </template>
  
  <script>
  import ProductList from '../components/ProductList.vue';
  
  export default {
    name: 'HomeView',
    components: {
      ProductList,
    },
  };
  </script>
  