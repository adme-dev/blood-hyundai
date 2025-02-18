<template>
  <div class="pagination-container">
    <uib-pagination
      v-model="pagination"
      class="uk-pagination uk-padding-small uk-flex uk-flex-center"
      @change="onCurrentChange"
      :total-items="total"
      :items-per-page="pageSize"
      :max-size="3"
      :boundary-links="false"
    >
    </uib-pagination>
    <br />
    <span>Total {{ total }} </span>
    <el-select placeholder="Select" v-model="size" @change="onSizeChange">
      <el-option v-for="variant in pageSizes" :key="variant" :label="variant + '/page'" :value="variant"> </el-option>
    </el-select>

    <span
      >Page
      <el-input style="width: 50px" v-model="pageToGo" @change="setPage"></el-input>
    </span>
    <span> / {{ pagination.numPages }}</span>
  </div>
</template>
<script>
export default {
  data() {
    const { sizes } = this.$store.state.priceBuilder.page;
    return {
      pagination: {
        currentPage: 1,
        numPages: 0,
      },
      size: sizes[0],
      pageToGo: 1,
    };
  },

  computed: {
    total() {
      return this.$store.getters["priceBuilder/total"];
    },

    pageSize() {
      return this.$store.state.priceBuilder.page.size;
    },

    pageSizes() {
      return this.$store.state.priceBuilder.page.sizes;
    },

    currentPage() {
      return this.$store.state.priceBuilder.page.current;
    },
  },

  watch: {
    currentPage(val) {
      this.pagination.currentPage = val;
    },
  },

  methods: {
    onCurrentChange() {
      const { currentPage } = this.pagination;
      this.$store.dispatch("priceBuilder/setCurrentPage", currentPage);
      this.pageToGo = currentPage;
      this.$emit("updateRouter");
      window.scrollTo(0, 0);
    },

    onSizeChange() {
      const { size } = this;
      this.$store.dispatch("priceBuilder/setCurrentPage", 1);
      this.$store.dispatch("priceBuilder/setPageSize", size);
    },

    setPage() {
      const { currentPage, numPages } = this.pagination;
      if (isNaN(this.pageToGo) || this.pageToGo > numPages || Math.round(this.pageToGo) < 0) {
        this.pageToGo = currentPage;
      } else {
        this.$store.dispatch("priceBuilder/setCurrentPage", +this.pageToGo);
      }
      this.$emit("updateRouter");
    },
  },
};
</script>
