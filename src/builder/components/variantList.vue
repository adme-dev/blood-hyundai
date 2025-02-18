<template>
  <div class="uk-height-1-1 variant-list uk-child-width-1-1 uk-grid">
    <variant-base v-for="variant in displayvariants" :key="variant.id" :variant="variant" :footerVehicelImage="footerVehicelImage" :selectedColourName="selectedColourName" @colorchange="buttonColorChange"> </variant-base>
  </div>
</template>
<script>
import variantBase from "./variantBase.vue";
export default {
  props:["footerVehicelImage","selectedColourName"],
  components: {
    "variant-base": variantBase,
  },
methods:{
  buttonColorChange(data){
      this.$emit('colorchange',data)
  }
},
  computed: {
    variants() {
      return this.$store.getters["priceBuilder/matched"];
    },

    total() {
      return this.$store.getters["priceBuilder/total"];
    },

    displayvariants() {
      return this.$store.getters["priceBuilder/displayvariants"];
    },
  },
};
</script>
