<template>
  <router-link class="text-no-underline" to="/">
      <logo-typeface/>
  </router-link>
</template>
<script>
  import PrimaryNav from "../menus/PrimaryNav";
  import LogoTypeface from "./Logo";
  export default {
    name: 'page-navigation',
    components: {LogoTypeface, PrimaryNav},
    computed: {
      logoWidth() {
        //return this.$vuetify.breakpoint.mdAndUp ? '200px' : '140px';
      },
      height() {
        //return this.$vuetify.breakpoint.mdAndUp ? '88' : '64';
      }
    }
  }
</script>
