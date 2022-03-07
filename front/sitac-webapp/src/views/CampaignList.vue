<template>
  <section class="section">
    <h1 class="title">Campaigns list</h1>

     <TableAPI
     endpoint="campaigns"
      :columns= "[
        {
          field: 'name',
          label: 'Name',
          sortable: true
        },
        {
          field: 'description',
          label: 'Description',
          sortable: true
        },
        {
          field: 'createdAt',
          label: 'Created at',
          sortable: true
        }, 
      ]" />
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