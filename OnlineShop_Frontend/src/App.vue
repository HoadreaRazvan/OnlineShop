<template>
  <div id="app">
    <Header v-if="showHeaderAndFooter" />
    <div id="content">
      <component :is="currentView" @set-view="setView"></component>
    </div>
    <Footer v-if="showHeaderAndFooter" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './components/Home.vue'
import AdminLogin from './components/AdminLogin.vue'
import ClientLogin from './components/ClientLogin.vue'
import ClientRegister from './components/ClientRegister.vue'
import ClientInterface from './components/ClientInterface.vue'
import AdminInterface from './components/AdminInterface.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home,
    AdminLogin,
    ClientLogin,
    ClientRegister,
    ClientInterface,
    AdminInterface
  },
  data() {
    return {
      currentView: 'Home'
    }
  },
  computed: {
    showHeaderAndFooter() {
      return this.currentView !== 'ClientInterface' && this.currentView !== 'AdminInterface';
    }
  },
  methods: {
    setView(view) {
      if (view === 'home') {
        this.currentView = 'Home';
      } else if (view === 'register') {
        this.currentView = 'ClientRegister';
      } else if (view === 'clientInterface') {
        this.currentView = 'ClientInterface';
      } else if (view === 'adminInterface') {
        this.currentView = 'AdminInterface';
      } else {
        this.currentView = view.charAt(0).toUpperCase() + view.slice(1) + 'Login';
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
