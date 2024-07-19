<template>
    <div class="home">
      <h1>Home</h1>
      <div v-if="loading">Loading products...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="products.length === 0 && !loading && !error">No products available.</div>
      <div v-else>
        <div v-for="product in products" :key="product.id" class="product">
          <img :src="product.image" :alt="product.title" />
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <p>Price: {{ product.price }}</p>
          <p>Stock: {{ product.quantity }}</p>
          <button @click="$emit('add-to-favorites', product)">Add to Favorites</button>
          <button @click="$emit('add-to-cart', product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeClient',
    data() {
      return {
        products: [],
        loading: true,
        error: null
      }
    },
    mounted() {
      fetch('http://localhost:3000/product')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          return response.json();
        })
        .then(data => {
          this.products = data;
          this.loading = false;
        })
        .catch(error => {
          this.error = error.message;
          this.loading = false;
        });
    }
  }
  </script>
  
  <style scoped>
  .home {
    text-align: center;
  }
  
  .product {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
    display: inline-block;
    width: 200px;
  }
  
  .product img {
    max-width: 100%;
  }
  </style>
  