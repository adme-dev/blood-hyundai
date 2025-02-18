<template>
  <div v-if="variants && variants.length > 0" class="relatedOffers uk-width-1-1 uk-width-expand@m uk-grid-collapse uk-grid">

    <div class="uk-width-1-1 uk-padding-small uk-grid-collapse uk-grid">
      <div class="uk-width-expand">
        <h6 class="uk-h3">
          <span class="uk-text-bold uk-text-capitalize">{{ model }} </span>/ {{itemsCount}} Offers
        </h6>
     </div>

      <div class="uk-width-auto uk-visible@s">
        <router-link
          to="/special-offers"
          class="
            uk-button
            uk-button-secondary
            tm-button-default
          "
          >View all offers</router-link
        >
      </div>
    </div>

    <ul class="uk-list uk-grid-collapse uk-width-1-1 uk-margin-small-bottom" uk-grid>
      <li
        v-for="(variant, index) in variants.slice('', 6)"
        :key="index"
        class="box-shadow_wrap uk-margin-remove-top uk-width-1-1 uk-width-1-1@m uk-width-1-2@l uk-flex uk-flex-middle "
      >


          <div class="uk-width-small">
              <div>
                <img :data-src="'' + variant.vehicle_image[0] + '?width=150'" width="150" height="84" class="uk-width-1-1 uk-padding-small" loading="lazy" data-uk-img />
              </div>
          </div>

          <div class="uk-width-expand uk-text-left">
              <div>
                <div class="uk-text-xsmall">{{ variant.title }}</div>
                <div class="uk-text-xsmall">{{ variant.offer_title }}</div>
              </div>
          </div>



          <div class="uk-width-auto uk-margin-auto-left uk-margin-small-right">
            <router-link
              :to="'/special-offer/' + variant.id + '/' + variant.slug + ''"
              class="
                uk-button
                  uk-button-default
                tm-button-default
              "

              >View</router-link
            >
          </div>



      </li>

      <li class="uk-width-1-1 uk-hidden@s">

        <div class="uk-padding-small uk-width-1-1">
          <router-link
            to="/special-offers"
            class="
              uk-button
              uk-button-secondary
              tm-button-default
              uk-width-1-1
            "
            >View all offers</router-link
          >
        </div>
      </li>
    </ul>
    <div class="uk-padding"></div>
</div>
</template>
<script>
import { VariantService } from "@/services";
//console.log(VariantService)
export default {
  name: "related-offers",
  props: ['model'],
  data() {
    return {
      gmodel:this.model,
      variants: [],
    };
  },
  mounted() {
    // console.log(this.gmodel);
    VariantService.getBuilderOffers(this.gmodel).then((data) => {
        this.variants = data;
      });
  },
  computed: {
    itemsCount() {
      return this.variants.length;
    },
    // itemName(model) {
    //   if (!this.vLodash.isEmpty(this.$store.state.brand))
    //     return this.$store.state.brand.filter((item) => item.modelid === this.model);
    // }
  }
};
</script>

<style scoped>
.relatedOffers .offer_price.uk-h1 {
  font-size: 1.625rem;
}

@media (max-width: 1400px) {
  .scroll-card-wrap li {
    min-width: 300px;
  }
}
</style>
