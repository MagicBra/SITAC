<template>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/campaigns">Campagnes</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/campaigns/'+$route.params.id" active>Détail campagne</b-breadcrumb-item>
    </b-breadcrumb>

    <h1 class="title">Détail Campagne</h1>

     <DetailAPI
     endpoint="campaigns"
     :columns= "[
        {
          field: 'name',
          label: 'Nom',
          type: 'text'
        },
        {
          field: 'description',
          label: 'Description',
          type: 'textarea'
        },
      ]"
      labelButtonEdit="Sauvegarder"
      labelButtonCreate="Créer"
      />

      <div v-if="$route.params.id!='create'">
      <h2 class="title">Liste des PAKs de la campagne</h2>

      <TableAPI
     endpoint="paks"
     :customParams="{ campaign: this.$route.params.id }"
     labelSearch="Recherche"
     labelButtonSearch="Rechercher"
     placeholderSearch="Nom du PAK"
     labelButtonNew="Nouveau PAK"
      :columns= "[
        {
          field: 'name',
          label: 'Nom',
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
      :redirectURL= "this.$route.path + '/paks'"
      />
      </div>
  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { DetailAPI, TableAPI },
  name: "CampaignDetails",
  methods: {
  },
};
</script>