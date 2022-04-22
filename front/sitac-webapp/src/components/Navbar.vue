<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="SITAC"
                >
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
              <a v-if="isToken" class="button is-danger is-light" @click="deconnection">Déconnexion</a>
              <a v-if="!isToken" class="button is-primary is-light" @click="connection">Connexion</a>
            </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>

import { ToastProgrammatic as Toast } from "buefy";

export default {
  components: { },
  name: "Navbar",
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