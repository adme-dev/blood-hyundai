<template>

  <li v-if="savedItemslocalStorage.length">
    <router-link to="/compare-vehicles-for-sale" title="Vehicle comparison">
        <div class="uk-badge" style="margin-top: -15px">{{savedItemslocalStorage.length}}</div>
        <svg class="ic-heart" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"></path></svg>
    </router-link>
  </li>

</template>
<script>
export default {
  name: "compare-links",
  props:['strokeColor'],
  computed: {
    savedItemslocalStorage: function() {
      return this.$store.state.savedVehicles;
    }
  },
};
</script>
<style>
.tm-toolbar-container .uk-background-default .ic-heart path{
  stroke: #000
}
</style>
