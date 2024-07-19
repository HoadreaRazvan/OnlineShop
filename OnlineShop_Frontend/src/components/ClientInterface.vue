<template>
  <div class="client-interface">
    <nav>
      <button @click="setView('HomeClient')">Home</button>
      <button @click="setView('Favorite')">Favorite</button>
      <button @click="setView('Cos')">Cos</button>
      <button @click="logout">Logout</button>
    </nav>
    <component 
      :is="currentView" 
      @add-to-favorites="addToFavorites" 
      @add-to-cart="addToCart" 
      :favorites="favorites" 
      :cart="cart" 
      @remove-from-cart="removeFromCart" 
      @place-order="placeOrder"
      @remove-from-favorites="removeFromFavorites"
      @order-placed="clearCart"
    ></component>
  </div>
</template>

<script>
import HomeClient from './HomeClient.vue'
import Favorite from './Favorite.vue'
import Cos from './Cos.vue'

export default {
  name: 'ClientInterface',
  components: {
    HomeClient,
    Favorite,
    Cos
  },
  data() {
    return {
      currentView: 'HomeClient',
      favorites: [],
      cart: []
    }
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
    addToFavorites(product) {
      if (!this.favorites.includes(product)) {
        this.favorites.push(product);
      }
    },
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(product) {
      this.cart = this.cart.filter(p => p.id !== product.id);
    },
    removeFromFavorites(product) {
      this.favorites = this.favorites.filter(p => p.id !== product.id);
    },
    clearCart() {
      this.cart = [];
    },
    logout() {
      location.reload();
    }
  }
}
</script>

<style scoped>
.client-interface {
  text-align: center;
  margin-top: 100px;
}

nav {
  margin-bottom: 20px;
}

button {
  margin: 0 10px;
}
</style>
