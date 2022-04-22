<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
    />
    <Navbar />
    <Header />
    <router-view />
  </div>
</template>


<style>
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
import Header from "./components/Header.vue";
import Navbar from './components/Navbar.vue';

export default {
  name: "App",
  components: {
    Header,
    Navbar,
  },
  data() {
    return {
      token: localStorage.token,
    };
  },
};
</script>