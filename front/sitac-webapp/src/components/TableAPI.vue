<template>
  <div>
    <b-field :label="labelSearch" label-position="on-border">
      <b-input
        :placeholder="placeholderSearch"
        type="search"
        v-model="searchQuery"
        @keyup.native.enter="refresh"
        expanded
      ></b-input>
      <p class="control">
        <b-button class="button is-primary" @click="refresh"
          >{{labelButtonSearch}}</b-button
        >
      </p>
    </b-field>
    <section>
      <b-button type="is-success" @click="create">{{labelButtonNew}}</b-button>
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
          {{ getValueField(props.row,column.field) }}
        </b-table-column>

        <b-table-column 
        field="actions" label="Actions" width="200" v-slot="props">
          <div class="buttons">
                <b-button type="is-primary" @click="edit(props.row)" > 
                  <b-icon  v-if="!props.row.readOnly" icon="pencil"></b-icon> 
                  <b-icon  v-if="props.row.readOnly" icon="eye-outline"></b-icon> 
                  </b-button>
                <b-button 
                v-if="!props.row.readOnly"
                type="is-danger" @click="remove(props.row)" > <b-icon icon="delete"></b-icon> </b-button>
                </div>
            </b-table-column>

      </b-table>
    </section>
  </div>
</template>



<script>
import ApiHandlerService from "../services/ApiHandlerService";

export default {
  props: ["endpoint", "columns", 
  "labelSearch", "labelButtonSearch", "placeholderSearch"
  ,"labelButtonNew"
  , "customParams",
  "redirectURL"],
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
      readOnly: true
    };
  },
  methods: {

    getValueField(row,field){

      var fields = field.split(".");

      var node = row[fields[0]];

      for(var i=1;i<fields.length;i++){
        console.log("field "+field);
        node = node[fields[i]];
      }

      return node;

    },
    /*
     * Load async data
     */
    loadAsyncData() {
      var params = {
        page: `${this.page}`,
        limit: `${this.perPage}`,
        sort: `${this.sortOrder == "desc" ? "-" : ""}${this.sortField}`,
        q: `${this.searchQuery}`,
      };

      // Concat parameters with custom parameters
      Object.assign(params,this.customParams);

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
      this.total = data.count;

      data.rows.forEach((item) => {
        // Parse createdAt to date
        item.createdAt
          ? (item.createdAt =
              new Date(item.createdAt).toLocaleDateString() +
              " " +
              new Date(item.createdAt).toLocaleTimeString())
          : (item.createdAt = "unknown");

        // For each item, is user authorized to modify ?
        item.readOnly = !(ApiHandlerService.isCurrentUserAdmin() || JSON.parse(localStorage.user).id == item.author.id);

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
      this.sortField = field.split(".")[0];
      this.sortOrder = order;
      this.total = 0;
      this.loadAsyncData();
    },
    refresh() {
      this.loadAsyncData();
    },
    edit(row) {
      this.$router.push(this.redirectURL + "/"+ row.id);
    },
    remove(row) {
      ApiHandlerService.delete(
        this.endpoint,
        row.id,
        this.loadAsyncData
      );
    },
    create() {
      this.$router.push(this.redirectURL + "/create");
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