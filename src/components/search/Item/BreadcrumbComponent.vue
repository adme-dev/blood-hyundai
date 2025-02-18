<template>
  <nav aria-label="breadcrumb">
    <ol class="uk-breadcrumb uk-margin-small-bottom">
      <span uk-icon="icon: chevron-double-right"></span>
      <li class="breadcrumb-item" v-for="(crumb, index) in breadcrumbs" :key="index">
        <!-- Emit the custom event when All Cars breadcrumb is clicked -->
        <router-link
          :to="crumb.to"
          class="uk-button uk-button-default uk-border-pill text-red"
          @click.prevent="handleBreadcrumbClick(crumb.text)"
        >
          {{ crumb.text | capitalize }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "BreadcrumbComponent",
  computed: {
    breadcrumbs() {
      const { condition, make, model } = this.$route.params;
      let path = '/cars-for-sale';
      const breadcrumbs = [{ text: `All Cars`, to: path }];

      if (condition) {
        path += `/${condition}`;
        breadcrumbs.push({ text: condition, to: path });
      }
      if (make) {
        path += `/${make}`;
        breadcrumbs.push({ text: make, to: path });
      }
      if (model) {
        path += `/${model}`;
        breadcrumbs.push({ text: model, to: path });
      }

      return breadcrumbs;
    }
  },
  methods: {
    // Emit the custom event when the breadcrumb is clicked
    handleBreadcrumbClick(text) {
      // Check if the clicked breadcrumb is "All Cars"
      if (text === "All Cars") {
        // Emit the custom event to reset searchQuery
        this.$emit("reset-search");
      }
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      return value
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  }
};
</script>
