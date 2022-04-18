<template>
  <section class="hero is-primary">
    <div class="hero-head">
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a v-if="isToken" class="button is-danger is-light" @click="deconnection">Déconnexion</a>
              <a v-if="!isToken" class="button is-primary is-light" @click="connection">Connexion</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-body">
      <p class="title">SITAC</p>
      <p class="subtitle">Situation Tactique</p>
    </div>
  </section>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";

export default {
  name: "Header",
  mounted() {
  window.addEventListener('foo-key-localstorage-changed', () => {
    this.isToken = localStorage.token ? true : false;
  });
  console.log(localStorage.token);
},
  data() {
    return {
      isToken: localStorage.token ? true : false,
    };
  },
  methods: {
    connection() {
      this.$router.push("/");
    },
    deconnection() {
      localStorage.removeItem("token");

      window.dispatchEvent(
        new CustomEvent("foo-key-localstorage-changed", {
          detail: {
            storage: localStorage.token,
          },
        })
      );

      Toast.open({
        message: "Vous avez été déconnecté",
      });

      this.$router.push("/");
    },
  }
};
</script>