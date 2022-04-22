<template>
  <section class="section">
  <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/campaigns">Campagnes</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/campaigns/'+$route.params.idCampaign">Détail campagne</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/campaigns/'+$route.params.idCampaign+'/pak/'+$route.params.idPak">Détail pak</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' to="'/campaigns/'" active>Détail moa</b-breadcrumb-item>
    </b-breadcrumb>


    <h1 class="title">Détail Moa</h1>

     <DetailAPI
     endpoint="moas"
     :columns= "[
        {
          field: 'name',
          label: 'Nom',
          type: 'text'
        },
        {
          field: 'side',
          label: 'Camp',
          type: 'text'
        },
      ]"
      :customBody="{
        pak: this.$route.params.idPak
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
  components: { DetailAPI },
  name: "MoaDetails",
  methods: {
  },
};
</script>