<template>
  <nav aria-label="Breadcrumb" class="uk-hidden">
    <ul class="uk-breadcrumb">
      <li>
        <router-link :to="{ path: '/car-sales' }">
          <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <span itemprop="name">Home</span>
            <meta itemprop="position" content="1" />
          </span>
        </router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <a :href="crumb.to" @click.prevent="handleBreadcrumbClick(index)">
          <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <span itemprop="name">{{ crumb.text }}</span>
            <meta itemprop="position" :content="index + 2" />
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { formatNumber } from "@/utils"; // Import your utility function

Vue.use(VueRouter);

export default {
  name: "breadcrumb",
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    $route: "updateBreadcrumbs", // Watch for route changes
  },
  created() {
    // Initialize breadcrumbs on component creation
    this.updateBreadcrumbs();
  },
  methods: {
    updateBreadcrumbs() {
      const { format } = this.$store.state;
      const { selected, filters } = this.$store.state.search;
      const breadcrumbItems = [];

      // Create a copy of the current route's query parameters
      const currentQuery = { ...this.$route.query };

      this.vLodash.each(selected, (value, key) => {
        const filterItem = this.vLodash.find(filters, (f) => f.name === key);
        if (filterItem) {
          const { displayName, type, name } = filterItem;
          if (type === "text") {
            breadcrumbItems.push({
              text: value,
              to: { ...currentQuery, [key]: value }, // Update the query
            });
          }

          if (type === "slider") {
            const [min, max] = value;
            const formatedMin = formatNumber(min, key, format);
            const formatedMax = formatNumber(max, key, format);
            breadcrumbItems.push({
              text: `$${formatedMin} - $${formatedMax}`,
              to: { ...currentQuery, [key]: value }, // Update the query
            });
          }

          if (type === "date") {
            const [start, end] = value;
            breadcrumbItems.push({
              text: `From ${start} to ${end}`,
              to: { ...currentQuery, [key]: value }, // Update the query
            });
          }

          if (type === "radio" || type === "select") {
            const { data } = filterItem;
            const { displayValue } = this.vLodash.find(data, (i) => i.value === value);
            breadcrumbItems.push({
              text: displayValue,
              to: { ...currentQuery, [key]: value }, // Update the query
            });
          }

          if (type === "checkbox" || type === "multiselect") {
            const { data } = filterItem;
            this.vLodash.each(value, (val) => {
              const filterData = this.vLodash.find(data, (i) => i.value === val);
              if (!this.vLodash.isEmpty(filterData)) {
                const { displayValue, displayMake } = this.vLodash.find(data, (i) => i.value === val);
                breadcrumbItems.push({
                  text: displayValue,
                  to: { ...currentQuery, [key]: val }, // Update the query
                });
              }
            });
          }
        }
      });

      this.breadcrumbs = breadcrumbItems;
    },
    handleBreadcrumbClick(index) {
    // Create a new query object based on the clicked breadcrumb's query
    const newQuery = this.breadcrumbs[index].to;

    // Check if the new query is different from the current query
    if (!this.isSameQuery(newQuery, this.$route.query)) {
      // Use $router to navigate with the new query
      this.$router.push({ query: newQuery });
    }
  },

  isSameQuery(query1, query2) {
    // Check if two query objects have the same keys and values
    const keys1 = Object.keys(query1);
    const keys2 = Object.keys(query2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (query1[key] !== query2[key]) {
        return false;
      }
    }

    return true;
  },
  },
};
</script>
