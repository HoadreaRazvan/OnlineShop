<template>
  <div class="favorite">
    <h1>Favorite</h1>
    <div v-if="favorites.length === 0">No favorite products.</div>
    <div v-else>
      <div v-for="product in favorites" :key="product.id" class="product">
        <img :src="product.image" :alt="product.title" />
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <p>Stock: {{ product.quantity }}</p>
        <button @click="$emit('remove-from-favorites', product)">Remove fraom Favorites</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Favorite',
  props: ['favorites']
}
</script>

<style scoped>
.favorite {
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
