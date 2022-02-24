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
      <b-button type="is-primary" :loading="loading" @click="refresh"
        >Rafraichir</b-button
      >
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
        @click="onItemClick"
        :columns="columns"
      >
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
        limit:`${this.perPage}`,
        sort: `${this.sortOrder == "desc" ? "-" : ""}${this.sortField}`,
        q: `${this.searchQuery}`
      }

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
    /*
     * Type style in relation to the value
     */
    type(value) {
      const number = parseFloat(value);
      if (number < 6) {
        return "is-danger";
      } else if (number >= 6 && number < 8) {
        return "is-warning";
      } else if (number >= 8) {
        return "is-success";
      }
    },
    refresh() {
      this.loadAsyncData();
    },
    onItemClick(row) {
      this.$router.push("/" + this.endpoint + "/" + row.id);
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