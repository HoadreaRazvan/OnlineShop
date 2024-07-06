<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-item">
      <img :src="product.image" alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }} $</p>
      <router-link :to="`/product/${product.id}`">View Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        { id: 1, name: 'Product 1', price: 10, image: '1.jpg' },
        { id: 2, name: 'Product 2', price: 20, image: '1.jpg' },
      ],
    };
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}

.product-item {
  flex: 1 1 calc(33.333% - 1rem);
  margin: 0.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: center;
}

.product-item img {
  max-width: 100%;
  height: auto;
}
</style>
