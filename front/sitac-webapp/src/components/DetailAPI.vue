<template>
  <section class="section">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">

        <b-field
        v-for="(column, index) in columns"
        :key="index"
        :label="column.label">
            <b-input :type="column.type" v-model="data[column.field]" :readonly="readOnly"></b-input>
        </b-field>

        <b-field>
          <b-button 
          v-if="!readOnly"
          type="is-primary" 
          @click="updateData()"
          :loading="loading" >
            {{ isEdit ? labelButtonEdit : labelButtonCreate }}
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
    props: ["endpoint","columns","redirect","labelButtonEdit","labelButtonCreate"],
  components: {},
  mounted() {
    this.loading = false;
    this.isEdit = this.$route.params.id != "create";

    if (this.isEdit) {
      // Récupérer les données au démarrage de la page
      ApiHandlerService.getById(this.endpoint, this.id, {}, ({ data }) => {
        this.data = data;

        this.readOnly = !(ApiHandlerService.isCurrentUserAdmin() || JSON.parse(localStorage.user).id == data.author.id);
      });
    } else {
        this.readOnly = false;
    }
  },
  data() {
    return {
      id: `${this.$route.params.id}`,
      data: {},
      isEdit: true,
      readOnly : true,
      loading : false
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
        this.loading = true;
        ApiHandlerService.put(this.endpoint, this.id, body, ({ data }) => {
          this.data = data;
          this.loading = false;

          Toast.open({
            message: "Mise à jour réussi !",
            type: "is-success",
          });

           this.$router.push(this.redirect);
        });

      } else {
        // Créer la nouvelle entitée
        ApiHandlerService.post(this.endpoint, body, ({ data }) => {
          this.data = data;

          Toast.open({
            message: "Création réussi !",
            type: "is-success",
          });

          this.$router.push(this.redirect);
        });
      }
    },
  },
};
</script>