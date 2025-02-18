<template>
  <div class="item-grid">
    <item-base-grid v-for="item in displayItems" :key="item.id" :item="item"> </item-base-grid>
  </div>
</template>
<script>
import ItemBaseGrid from "./ItemBaseGrid";

export default {
  components: {
    "item-base-grid": ItemBaseGrid,
  },

  computed: {
    items() {
      return this.$store.getters.matched;
    },

    total() {
      return this.$store.getters.total;
    },

    displayItems() {
      return this.$store.getters.displayItems;
    },
  },
};
</script>
