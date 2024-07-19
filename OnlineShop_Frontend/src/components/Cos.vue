<template>
  <div class="cos">
    <h1>Cos</h1>
    <div v-if="cart.length === 0">No products in the cart.</div>
    <div v-else>
      <div v-for="(product, index) in cart" :key="product.id" class="product">
        <img :src="product.image" :alt="product.title" />
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <p>Stock: {{ product.quantity }}</p>
        <label for="quantity">Quantity:</label>
        <input 
          type="number" 
          :min="1" 
          :max="product.quantity" 
          v-model.number="productQuantities[index]" 
          @input="updateTotal"
        />
        <button @click="$emit('remove-from-cart', product)">Remove from Cart</button>
      </div>
      <div class="total">
        <h2>Total: {{ total }}</h2>
        <button @click="placeOrder">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cos',
  props: ['cart'],
  data() {
    return {
      productQuantities: this.cart.map(product => 1) 
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, product, index) => sum + product.price * this.productQuantities[index], 0);
    }
  },
  methods: {
    updateTotal() {
      this.$forceUpdate();
    },
    placeOrder() {
      const orderItems = this.cart.map((product, index) => ({
        id: product.id,
        quantity: this.productQuantities[index]
      }));

      fetch('http://localhost:3000/product/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderItems })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        this.$emit('order-placed');
      })
      .catch(error => {
        alert(error.message);
      });
    }
  }
}
</script>

<style scoped>
.cos {
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

.total {
  margin-top: 20px;
}
</style>
