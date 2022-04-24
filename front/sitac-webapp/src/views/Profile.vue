<template>
  <section class="section">
    <h1 class="title">Profile</h1>

    <DetailAPI
      endpoint="users"
      :columns="[
        {
          field: 'name',
          label: 'Nom',
          type: 'text',
        },
        {
          field: 'picture',
          label: 'Image',
          type: 'text',
        },
      ]"
      labelButtonEdit="Modifier"
      labelButtonCreate="Créer"
      :forceEdit="true"
      :callback="profileCallback"
    />
  </section>
</template>

<script>
import DetailAPI from "../components/DetailAPI.vue";

export default {
  components: { DetailAPI },
  name: "ProfileDetails",
  methods: {
    profileCallback(data) {
        localStorage.user = JSON.stringify(data);

      window.dispatchEvent(
        new CustomEvent("foo-key-localstorage-changed", {
          detail: {
            storage: localStorage.token,
          },
        })
      );
    },
  },
};
</script>