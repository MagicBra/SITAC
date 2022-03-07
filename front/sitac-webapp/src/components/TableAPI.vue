<template>
  <div>
    <b-field label="Recherche" label-position="on-border">
      <b-input
        placeholder="Nom"
        type="search"
        v-model="searchQuery"
        @keyup.native.enter="refresh"
        expanded
      ></b-input>
      <p class="control">
        <b-button class="button is-primary" @click="refresh"
          >Rechercher</b-button
        >
      </p>
    </b-field>
    <section>
      <b-field label="">
        <b-button type="is-primary" :loading="loading" @click="refresh"
          >Rafraichir</b-button
        >
      </b-field>
      <b-button type="is-success" @click="create">New campaign</b-button>
    </section>

    <section>
      <b-table
        :data="data"
        :loading="loading"
        paginated
        paginationPosition="top"
        backend-pagination
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"
      >
        <b-table-column
          v-for="(column, index) in columns"
          :key="index"
          :label="column.label"
          :field="column.field"
          v-slot="props"
          :sortable="column.sortable"
        >
          {{ props.row[column.field] }}
        </b-table-column>

        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
                <b-button type="is-primary" @click="edit(props.row)" > edit </b-button>
            </b-table-column>

      </b-table>
    </section>
  </div>
</template>



<script>
import ApiHandlerService from "../services/ApiHandlerService";

export default {
  props: ["endpoint", "columns"],
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      sortField: "createdAt",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      page: 1,
      perPage: 10,
      searchQuery: "",
    };
  },
  methods: {
    /*
     * Load async data
     */
    loadAsyncData() {
      const params = {
        page: `${this.page}`,
        limit: `${this.perPage}`,
        sort: `${this.sortOrder == "desc" ? "-" : ""}${this.sortField}`,
        q: `${this.searchQuery}`,
      };

      this.loading = true;

      ApiHandlerService.getList(
        this.endpoint,
        params,
        this.successLoadData,
        null,
        this.errorLoadData
      );
    },

    /*
     * Sucessfully get data from the API
     */
    successLoadData({ data }) {
      this.data = [];
      let oneMorePage = 10 * this.page + 10;
      let fullPage = 10 * this.page;
      let currentItems = data.length * this.page;
      console.log("fullPage: " + fullPage);
      console.log("currentItems: " + currentItems);
      if (this.total < oneMorePage && currentItems == fullPage) {
        this.total = oneMorePage;
      }
      data.forEach((item) => {
        // Parse createdAt to date
        item.createdAt
          ? (item.createdAt =
              new Date(item.createdAt).toLocaleDateString() +
              " " +
              new Date(item.createdAt).toLocaleTimeString())
          : (item.createdAt = "unknown");

        // Push to the table data
        this.data.push(item);
      });
      this.loading = false;
    },

    /*
     * Failed to get data from the API
     */
    errorLoadData() {
      this.data = [];
      this.total = 0;
      this.loading = false;
    },

    /*
     * Handle page-change event
     */
    onPageChange(page) {
      this.page = page;
      this.loadAsyncData();
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.total = 0;
      this.loadAsyncData();
    },
    refresh() {
      this.loadAsyncData();
    },
    edit(row) {
      this.$router.push("/" + this.endpoint + "/" + row.id);
    },
    create() {
      this.$router.push("/create/" + this.endpoint);
    },
  },
  filters: {
    /**
     * Filter to truncate string, accepts a length parameter
     */
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    },
  },

  /**
   * On page loading
   */
  mounted() {
    this.loadAsyncData();
  },
};
</script>