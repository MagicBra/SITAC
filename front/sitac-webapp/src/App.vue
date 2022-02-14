<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
    />
    <Header/>
    <div id="nav">
      <router-link to="/">Connexion</router-link>
    </div>
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
import Header from './components/Header.vue';
//import AdminHeader from "./components/AdminHeader.vue";
//import SideMenu from "./components/SideMenu.vue";
export default {
  name: "App",
  components: {
    Header
    // SideMenu,
  },
};
</script>