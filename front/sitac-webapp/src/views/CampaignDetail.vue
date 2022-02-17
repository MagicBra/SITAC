<template>
  <section class="section">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <b-field label="Name">
          <b-input v-model="data.name" @blur="updateData"></b-input>
        </b-field>

        <b-field label="Description">
          <b-input
            type="textarea"
            v-model="data.description"
            @blur="updateData"
          ></b-input>
        </b-field>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  name: "CampaignDetail",
  mounted() {
    console.log("test: " + this.id);
    this.$http
      .get(`http://localhost:9000/campaigns/${this.id}`, this.config)
      .then(({ data }) => {
        this.data = data;
      });
  },
  data() {
    return {
      token: `${window.token}`,
      id: `${this.$route.params.id}`,
      data: {},
      config: {
        headers: { Authorization: `Bearer ${window.token}` },
      },
    };
  },
  methods: {
    updateData() {
      console.log("blur");

      this.$http
        .put(
          `http://localhost:9000/campaigns/${this.id}`,
          {
            access_token: this.token,
            name: this.data.name,
            description: this.data.description,
          },
          this.config
        )
        .then(({ data }) => {
          this.data = data;
        });
    },
  },
};
</script>