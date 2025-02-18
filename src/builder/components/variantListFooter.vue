<template>
  <div class="uk-height-1-1 variant-list uk-child-width-1-1 uk-grid">
    <variant-footer v-for="variant in displayvariants" :key="variant.id" :variant="variant" :footerVehicelImage="footerVehicelImage" :selectedColourName="selectedColourName"> </variant-footer>
  </div>
</template>
<script>
import variantBaseFooter from "./variantBaseFooter.vue";
export default {
  props:["footerVehicelImage","selectedColourName"],
  components: {
    "variant-footer": variantBaseFooter,
  },
  computed: {
    variants() {
      return this.$store.getters["priceBuilder/matched"];
    },
    displayvariants() {
      return this.$store.getters["priceBuilder/displayvariants"];
    },
  },
};
</script>
