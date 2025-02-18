<template>
  <div class="item-list">
    <item-base v-for="item in displayItems" :key="item.id" :item="item"> </item-base>
  </div>
</template>
<script>
import ItemBase from "./ItemBase";

export default {
  components: {
    "item-base": ItemBase,
  },

  computed: {
    items() {
      return this.$store.getters.matched;
    },

    total() {
      return this.$store.getters.totalVehiclesFound;
    },

    displayItems() {
      return this.$store.getters.displayItems;
    },
  },
};
</script>
