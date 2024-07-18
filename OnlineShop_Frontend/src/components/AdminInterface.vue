<template>
  <div class="admin-interface">
    <h1>Welcome to the Admin Interface</h1>

    <div>
      <button @click="showSection('users')">Manage Users</button>
      <button @click="showSection('products')">Manage Products</button>
      <button @click="refreshPage">Disconnect</button>
    </div>

    <div v-if="currentSection === 'users'">
      <h2>Users</h2>
      <button @click="fetchUsers">Refresh Users</button>
      <ul>
        <li v-for="user in users" :key="user.id">
          ID: {{ user.id }} - Email: {{ user.email }} - Password: {{ user.password }} - Role: {{ user.admin ? 'Admin' : 'Client' }}
          <div><br><br></div>
        </li>
      </ul>

      <h3>Create User</h3>
      <form @submit.prevent="createUser">
        <input type="email" v-model="newUser.email" placeholder="Email" />
        <input v-model="newUser.password" placeholder="Password" />
        <label>
          <input type="checkbox" v-model="newUser.admin" /> Admin
        </label>
        <button type="submit">Create User</button>
      </form>

      <h3>Update User</h3>
      <form @submit.prevent="updateUserById">
        <input v-model="updateUser.id" placeholder="User ID" />
        <input type="email" v-model="updateUser.newEmail" placeholder="New Email" />
        <input v-model="updateUser.newPassword" placeholder="New Password" />
        <label>
          <input type="checkbox" v-model="updateUser.newAdmin" /> Admin
        </label>
        <button type="submit">Update User</button>
      </form>

      <h3>Delete User</h3>
      <form @submit.prevent="deleteUserById">
        <input v-model="deleteUser.id" placeholder="User ID" />
        <button type="submit">Delete User</button>
      </form>
    </div>

    <div v-if="currentSection === 'products'">
      <h2>Products</h2>
      <button @click="fetchProducts">Refresh Products</button>
      <ul>
        <li v-for="product in products" :key="product.id">
          <div>ID: {{ product.id }}</div>
          <div>Title: {{ product.title }}</div>
          <div>Description: {{ product.description }}</div>
          <div>Price: ${{ product.price }}</div>
          <div>Quantity: {{ product.quantity }}</div>
          <div>Image: {{ product.image }}</div>
          <div><br><br></div>
        </li>
      </ul>

      <h3>Create Product</h3>
      <form @submit.prevent="createProduct">
        <input v-model="newProduct.image" placeholder="Image URL" />
        <input v-model="newProduct.title" placeholder="Title" />
        <input v-model="newProduct.description" placeholder="Description" />
        <input v-model="newProduct.price" placeholder="Price" type="number" />
        <input v-model="newProduct.quantity" placeholder="Quantity" type="number" />
        <button type="submit">Create Product</button>
      </form>

      <h3>Update Product</h3>
      <form @submit.prevent="updateProductById">
        <input v-model="updateProduct.id" placeholder="Product ID" />
        <input v-model="updateProduct.image" placeholder="Image URL" />
        <input v-model="updateProduct.title" placeholder="Title" />
        <input v-model="updateProduct.description" placeholder="Description" />
        <input v-model="updateProduct.price" placeholder="Price" type="number" />
        <input v-model="updateProduct.quantity" placeholder="Quantity" type="number" />
        <button type="submit">Update Product</button>
      </form>

      <h3>Delete Product</h3>
      <form @submit.prevent="deleteProductById">
        <input v-model="deleteProduct.id" placeholder="Product ID" />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminInterface',
  data() {
    return {
      currentSection: '',
      users: [],
      products: [],
      newUser: {
        email: '',
        password: '',
        admin: false,
      },
      updateUser: {
        id: '',
        newEmail: '',
        newPassword: '',
        newAdmin: false,
      },
      deleteUser: {
        id: '',
      },
      newProduct: {
        image: '',
        title: '',
        description: '',
        price: 0,
        quantity: 0,
      },
      updateProduct: {
        id: '',
        image: '',
        title: '',
        description: '',
        price: 0,
        quantity: 0,
      },
      deleteProduct: {
        id: '',
      },
    };
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
    },
    refreshPage() {
      window.location.reload();
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/user');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/product');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async createUser() {
      try {
        const response = await axios.post('http://localhost:3000/user/register', this.newUser);
        console.log('User created:', response.data);
        this.fetchUsers();
        this.resetNewUserForm();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async updateUserById() {
      try {
        const updateData = { id: this.updateUser.id };
        if (this.updateUser.newEmail) updateData.newEmail = this.updateUser.newEmail;
        if (this.updateUser.newPassword) updateData.newPassword = this.updateUser.newPassword;
        updateData.newAdmin = this.updateUser.newAdmin;

        const response = await axios.post('http://localhost:3000/user/update', updateData);
        console.log('User updated:', response.data);
        this.fetchUsers();
        this.resetUpdateUserForm();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUserById() {
      try {
        const response = await axios.post('http://localhost:3000/user/delete', this.deleteUser);
        console.log('User deleted:', response.data);
        this.fetchUsers();
        this.resetDeleteUserForm();
      } catch (error) {
        console.error('Error deleting user:', error.response.data.message || error.message);
      }
    },
    async createProduct() {
      try {
        const response = await axios.post('http://localhost:3000/product/create', this.newProduct);
        console.log('Product created:', response.data);
        this.fetchProducts();
        this.resetNewProductForm();
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },
    async updateProductById() {
      try {
        const response = await axios.post('http://localhost:3000/product/update', this.updateProduct);
        console.log('Product updated:', response.data);
        this.fetchProducts();
        this.resetUpdateProductForm();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async deleteProductById() {
      try {
        const response = await axios.post('http://localhost:3000/product/delete', this.deleteProduct);
        console.log('Product deleted:', response.data);
        this.fetchProducts();
        this.resetDeleteProductForm();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    resetNewUserForm() {
      this.newUser.email = '';
      this.newUser.password = '';
      this.newUser.admin = false;
    },
    resetUpdateUserForm() {
      this.updateUser.id = '';
      this.updateUser.newEmail = '';
      this.updateUser.newPassword = '';
      this.updateUser.newAdmin = false;
    },
    resetDeleteUserForm() {
      this.deleteUser.id = '';
    },
    resetNewProductForm() {
      this.newProduct.image = '';
      this.newProduct.title = '';
      this.newProduct.description = '';
      this.newProduct.price = 0;
      this.newProduct.quantity = 0;
    },
    resetUpdateProductForm() {
      this.updateProduct.id = '';
      this.updateProduct.image = '';
      this.updateProduct.title = '';
      this.updateProduct.description = '';
      this.updateProduct.price = 0;
      this.updateProduct.quantity = 0;
    },
    resetDeleteProductForm() {
      this.deleteProduct.id = '';
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchProducts();
  },
};
</script>

<style scoped>
.admin-interface {
  text-align: center;
  margin-top: 20px;
}
</style>
