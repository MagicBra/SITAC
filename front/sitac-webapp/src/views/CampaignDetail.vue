<template>
  <section class="section">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <b-field label="Name">
          <b-input v-model="data.name"></b-input>
        </b-field>

        <b-field label="Description">
          <b-input type="textarea" v-model="data.description"></b-input>
        </b-field>

        <b-field>
          <b-button type="is-primary" @click="updateData()">
            Sauvegarder
          </b-button>
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
    this.isEdit = this.$route.params.id != "create";
    if (this.isEdit) {
      // Récupérer les données au démarrage de la page
      ApiHandlerService.getById("campaigns", this.id, {}, ({ data }) => {
        this.data = data;
      });
    }
  },
  data() {
    return {
      id: `${this.$route.params.id}`,
      data: {},
      isEdit: true,
    };
  },
  methods: {
    updateData() {
      var body = {
        name: this.data.name,
        description: this.data.description,
      };

      if (this.isEdit) {
        // Mettre à jour les données
        ApiHandlerService.put("campaigns", this.id, body, ({ data }) => {
          this.data = data;

          Toast.open({
            message: "Mise à jour réussi !",
            type: "is-success",
          });
        });

      } else {
        // Créer la nouvelle entitée
        ApiHandlerService.post("campaigns", body, ({ data }) => {
          this.data = data;

          Toast.open({
            message: "Création réussi !",
            type: "is-success",
          });
        });
      }
      this.$router.push("/campaigns/");
    },
  },
};
</script>