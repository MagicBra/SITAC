<template>
  <section class="section">
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
      />
  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';

export default {
  components: { DetailAPI },
  name: "CampaignDetails",
  methods: {
  },
};
</script>