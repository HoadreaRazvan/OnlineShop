<template>
  <div id="app">
    <Header />
    <div id="content">
      <component :is="currentView" @set-view="setView"></component>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './components/Home.vue'
import AdminLogin from './components/AdminLogin.vue'
import ClientLogin from './components/ClientLogin.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home,
    AdminLogin,
    ClientLogin
  },
  data() {
    return {
      currentView: 'Home'
    }
  },
  methods: {
    setView(view) {
      this.currentView = view.charAt(0).toUpperCase() + view.slice(1) + 'Login';
      if (view === 'home') {
        this.currentView = 'Home';
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#content {
  padding-top: 80px; /* To make space for the fixed header */
  padding-bottom: 40px; /* To make space for the fixed footer */
}
</style>
