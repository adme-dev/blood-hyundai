<template>

    <li v-if="savedItemslocalStorage.length > 1">
      <router-link to="/compare-vehicles-for-sale" title="Vehicle compare"
        class="compare-a">

          <div class="uk-badge">{{savedItemslocalStorage.length}}</div>   <b class="uk-button uk-button-text">Saved Vehicles</b>
          </router-link
      >
    </li>
    <li v-else-if="savedItemslocalStorage.length == 1">
      <router-link to="/compare-vehicles-for-sale" title="Vehicle compare"
          class="compare-a">

          <div class="uk-badge">{{savedItemslocalStorage.length}}</div> <b class="uk-button uk-button-text">Saved Vehicle</b>
          </router-link
      >
    </li>

</template>
<script>
export default {
  name: "compare-links",
  computed: {
    savedItemslocalStorage: function() {
      return this.$store.state.savedVehicles;
    }
  },
};
</script>
<style scoped>
.compare-a{
    height: 40px;
    min-height: 40px;
}
</style>
