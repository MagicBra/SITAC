<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="SITAC"
        />
      </b-navbar-item>
    </template>

    <template #end>
      <div class="navbar-menu">
        <b-navbar-item tag="div">
                <div class="buttons" v-if="!isToken" >
                    <a class="button is-primary is-light" @click="connection">Connexion</a>
                </div>
            </b-navbar-item>

        <div class="navbar-end" v-if="isToken">
          <b-dropdown
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
          >
            <template #trigger>
              <a class="navbar-item" role="button">
                <b-image
                  :src="imageUser"
                  :rounded="true"
                  custom-class="image is-32x32"
                ></b-image>
                <span> &ensp; {{ nameUser }}</span>
                <b-icon icon="menu-down"></b-icon>
              </a>
            </template>
            <b-dropdown-item has-link>
              <router-link :to="'/profile/me'" exact>
              <b-icon icon="account"></b-icon>
              Profile
              </router-link>
            </b-dropdown-item>
            <hr class="dropdown-divider" aria-role="menuitem">
            <b-dropdown-item @click="deconnection" class="dropdown-item has-text-danger">
              <b-icon icon="logout"></b-icon>
              <strong>Déconnexion</strong>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </template>
  </b-navbar>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";

export default {
  components: {},
  name: "Navbar",
  mounted() {
    window.addEventListener("foo-key-localstorage-changed", () => {
      this.isToken = localStorage.token ? true : false;
      this.nameUser = localStorage.token ? JSON.parse(localStorage.user).name : "";
      this.imageUser = localStorage.token ? JSON.parse(localStorage.user).picture : ""
    });
    console.log(JSON.parse(localStorage.user).picture);
  },
  data() {
    return {
      isToken: localStorage.token ? true : false,
      nameUser: localStorage.token ? JSON.parse(localStorage.user).name : "",
      imageUser: localStorage.token ? JSON.parse(localStorage.user).picture : "",
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
  },
};
</script>