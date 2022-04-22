<template>
  <section class="section">
  <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/campaigns">Campagnes</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/campaigns/'+$route.params.idCampaign">Détail campagne</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' to="/paks" active>Détail pak</b-breadcrumb-item>
    </b-breadcrumb>


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


  <div v-if="$route.params.id!='create'">
      <h2 class="title">Liste des MOAs du pak</h2>

      <TableAPI
     endpoint="moas"
     :customParams="{ campaign: this.$route.params.id }"
     labelSearch="Recherche"
     labelButtonSearch="Rechercher"
     placeholderSearch="Nom du MOA"
     labelButtonNew="Nouveau MOA"
      :columns= "[
        {
          field: 'name',
          label: 'Nom',
          sortable: true
        },
        {
          field: 'side',
          label: 'Camp',
          sortable: true
        },
        {
          field: 'author.name',
          label: 'Auteur',
          sortable: true
        },
        {
          field: 'createdAt',
          label: 'Date de création',
          sortable: true
        }, 
      ]" 
      :customBody="{}"
      :redirectURL= "this.$route.path + '/moas'"
      />
      </div>
  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { DetailAPI, TableAPI },
  name: "PakDetails",
  methods: {
  },
};
</script>