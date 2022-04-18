<template>
  <section class="section">
    <h1 class="title">Le prout</h1>
    <h2 class="subtitle">Prooooooooooooout ! (c rigolo)</h2>

    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <form class="box">
          <b-field label="Email">
            <b-input
              type="email"
              value=""
              maxlength="50"
              v-model="email"
              @keyup.native.enter="connexion"
            >
            </b-input>
          </b-field>

          <b-field label="Password" @keyup.native.enter="connexion">
            <b-input value="" type="password" v-model="password"></b-input>
          </b-field>

          <b-button type="is-primary" :loading="loading" @click="connexion"
            >Connexion</b-button
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";
import ApiHandlerService from "../services/ApiHandlerService";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  mounted() {
    if (localStorage.token) {
      this.$router.push("/campaigns");
      Toast.open({
        message: "Vous êtes déjà connecté",
      });
    }
  },
  methods: {
    connexion() {
      this.loading = true;

      var msgs = [];
      msgs[401] = "Mauvais login et/ou mot de passe !";

      ApiHandlerService.auth(
        this.email,
        this.password,
        this.successConnexion,
        msgs,
        this.errorConnexion
      );
    },
    successConnexion({ data }) {
      this.loading = false;
      this.$router.push("/campaigns");
      Toast.open({
        message: "Connexion réussie",
        type: "is-success",
      });
      localStorage.token = data.token;
      localStorage.user = JSON.stringify(data.user);

      window.dispatchEvent(
        new CustomEvent("foo-key-localstorage-changed", {
          detail: {
            storage: localStorage.token,
          },
        })
      );
    },
    errorConnexion() {
      this.loading = false;
    },
  },
};
</script>