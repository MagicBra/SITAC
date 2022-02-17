<template>
  <section class="section">
    <h1 class="title">Le prout</h1>
    <h2 class="subtitle">Prooooooooooooout ! (c rigolo)</h2>

    <div class="columns is-mobile is-centered">
      <div class="column is-one-quarter">
        <form class="box">
          <b-field label="Email">
            <b-input type="email" value="" maxlength="50"  v-model="email"> </b-input>
          </b-field>

          <b-field label="Password">
            <b-input value="" type="password"  v-model="password"></b-input>
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

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    connexion() {
      console.log("connexion");
      this.loading = true;
      this.$http
        .post(
          `http://localhost:9000/auth`,
          "",
          {
            auth: {
              username: this.email,
              password: this.password,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.$router.push("/campaigns");
          Toast.open({
            message: "Connexion réussie",
            type: "is-success",
            // position: "is-bottom",
          });
          window.token = data.token;
          console.log(window.token);
        })
        .catch((error) => {
          this.loading = false;
          Toast.open({
            message: "Mauvais email et/ou mot de passe",
            type: "is-danger",
            //position: "is-bottom",
          });
          throw error;
        });
    },
  },
};
</script>