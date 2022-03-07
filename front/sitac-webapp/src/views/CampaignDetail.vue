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
import { ToastProgrammatic as Toast } from "buefy";
import ApiHandlerService from "../services/ApiHandlerService";

export default {
  components: {},
  name: "CampaignDetail",
  mounted() {
    // Récupérer les données au démarrage de la page
    if (this.id != "undefined") {
      ApiHandlerService.getById("campaigns", this.id, {}, ({ data }) => {
        this.data = data;
      });
    }
  },
  data() {
    return {
      id: `${this.$route.params.id}`,
      data: {},
    };
  },
  methods: {
    updateData() {
      // Mettre à jour les données
      var body = {
        name: this.data.name,
        description: this.data.description,
      };

      ApiHandlerService.put("campaigns", this.id, body, ({ data }) => {
        this.data = data;

        Toast.open({
          message: "Mise à jour réussi !",
          type: "is-success",
        });
      });
    },
  },
};
</script>