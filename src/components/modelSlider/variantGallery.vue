<template>
  <div>


<div class="uk-text-center">
  <img
   :src="colours[currentIndex].images"
   class="uk-width-1-1" width="1200" height="732" lazyload="lazy"
   />

    {{colours[currentIndex].colour_name}}

    <div class="uk-flex uk-flex-center">
      <ul class="uk-width-3-4 uk-grid-collapse uk-child-width-auto select-variant-colours variant-colours-items uk-flex-center uk-grid">
        <li v-for="(colours, i) in colours" :key="i" :class="{ 'uk-active': (currentIndex==i) }">
          <a href="#" @click.prevent="onThumbClick(i)">
            <div
            class="uk-border-circle uk-background-cover" :style="{ 'background-image': 'url(' + colours.swatch_colour_ + ')' }"></div>
          </a>
        </li>
      </ul>
    </div>

</div>

<div class="uk-padding-small">
    <h3 class="uk-h5 uk-text-left uk-text-bold">
      {{ title }}
    </h3>

    <div v-if="driveaway" class="uk-margin-small-top">
      <div class="uk-text-light space15">DRIVEAWAY FROM</div>
      <h3 class="uk-h2 uk-text-bold uk-margin-remove">
        ${{ parseInt(driveaway) + paintPrice(colours[currentIndex].paint_price) | formatPrice }}<sup>*</sup>
      </h3>
    </div>
</div>

   </div>
</template>
<script>
export default {
  name: "variant-gallery",
  props: ['colours', 'driveaway', 'title'],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    onThumbClick (_index) {
      this.currentIndex = _index;
    },
    paintPrice(value) {
      if (value) {
        return parseInt(value)
      } else {
        return parseInt(0)
      }
    },
  },
  filters: {
    formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style>
.select-variant-colours.variant-colours-items li.uk-active::after{
  margin: -19px 0 0 -5px;
}
</style>
