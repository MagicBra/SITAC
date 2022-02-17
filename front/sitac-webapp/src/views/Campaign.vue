<template>
  <section class="section">
    <h1 class="title">Campaigns list</h1>
     <TableAPI url="http://localhost:9000" :accessToken="token" />
  </section>
</template>

<script>
import TableAPI from '../components/TableAPI.vue';

export default {
  components: { TableAPI },
  name: "Campaign",
  data() {
        return {
      token: `${window.token}`,
    };
  },
  methods: {

  },
};
</script>