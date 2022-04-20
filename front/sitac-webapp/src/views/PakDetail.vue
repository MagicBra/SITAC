<template>
  <section class="section">
    <h1 class="title">Détail Pak</h1>

     <DetailAPI
     endpoint="paks"
     :columns= "[
        {
          field: 'name',
          label: 'Nom',
          type: 'text'
        },
      ]"
      :customBody="{
        campaign: this.$route.params.idCampaign
      }"
      labelButtonEdit="Sauvegarder"
      labelButtonCreate="Créer"
      />

  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';
//import TableAPI from '../components/TableAPI.vue';

export default {
  components: { DetailAPI},
  name: "PakDetails",
  methods: {
  },
};
</script>