<template>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/campaigns" active>Campagnes</b-breadcrumb-item>
    </b-breadcrumb>

    <h1 class="title">Liste des campagnes</h1>

     <TableAPI
     endpoint="campaigns"
     :customParams="[]"
     labelSearch="Recherche"
     labelButtonSearch="Rechercher"
     placeholderSearch="Nom de la campagne"
     labelButtonNew="Nouvelle campagne"
      :columns= "[
        {
          field: 'name',
          label: 'Nom',
          sortable: true
        },
        {
          field: 'description',
          label: 'Description',
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
      redirectURL="/campaigns" />
  </section>
</template>

<script>
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { TableAPI },
  name: "Campaign",
  methods: {

  },
};
</script>