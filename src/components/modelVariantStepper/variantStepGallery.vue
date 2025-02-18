<template>

  <div class="uk-width-1-1 uk-text-center uk-position-relative" :class="textColor">

<div class="uk-position-relative position-z-index-2">

    <img
      :src="`${colours.images[currentIndex].images}?width=1200&aspect_ratio=6:4&auto_optimize`"
      class="uk-width-1-1"
      width="1000"
      height="666"
      lazyload="lazy"
    />


  <div class="uk-width-3-4 uk-margin-auto uk-padding-small uk-border-rounded">
    <p><b>Choose your colour: {{colours.images[currentIndex].colour_name || colours.images[0].colour_name }}</b></p>
      <ul class="uk-grid-collapse uk-child-width-1-3 uk-child-width-1-4@m uk-child-width-1-4@l vehicle-colrs-items uk-flex-center uk-grid">
        <li v-for="(colours, i) in colours.images" :key="i" :class="{ 'uk-active': (currentIndex==i) }"
            class="uk-text-center uk-text-xsmall"
            @click.prevent="onThumbClick(i), changeColor(colours.swatch_colour_)">
          <a href="#">
            <div class="uk-border-circle uk-margin-auto uk-background-cover" :style="{ 'background-image': 'url(' + colours.swatch_colour_ + ')' }"></div>
          </a>
          <div>{{colours.colour_name}}</div>
          <div v-if="colours.paint_price.length > 1">+${{colours.paint_price}}</div>
          <div v-else>+$0</div>
        </li>
      </ul>

  </div>
</div>
  <span :class="{ lineargrad: disabled }" class="linear-grad-over uk-width-1-1 uk-height-1-1 uk-position-cover"></span>
  <span
  :style="`z-index:2;background:linear-gradient(180deg , ${bgColor} 10%, ${bgColor} 100%`"
  class="linear-grad uk-width-1-1 uk-height-1-1 uk-position-cover"
  :class="{ lineargrad: disabled }"
  ></span>
  <span class="linear-grad uk-width-1-1 uk-height-1-1 uk-position-cover lineargrad" :style="`background:${baseBgColor}`"></span>

  </div>

</template>
<script>
export default {
  name: "variant-gallery",
  props: ['colours', 'driveaway', 'title'],
  data() {
    return {
      currentIndex: 0,
      paint_price: "",
      vehicle_image: "",
      bgColor: this.colours.swatch_colour_,
      baseBgColor: '',
      textColor:'',
      // Set light and dark text classes
      textLight: 'uk-light',
      textDark: 'uk-dark',
      disabled: false
    };
  },
  mounted: function() {
    this.$emit('handle-driveaway-data', {
      paint_price: this.colours.images[0].paint_price,
      vehicle_image: this.colours.images[0]
    });
  },
  watch: {
    bgColor(){
      if(this.bgColor === '#000000'){
        this.bgColor = '#333333';
      }
   }
  },
  computed: {
    // textColor: function () {
    //   // Get background color hex value. '#' is optional.
    //   let hex = (this.bgColor.charAt(0) === '#') ? this.bgColor.substring(1, 7) : this.bgColor;
    //
    //   let r = parseInt(hex.slice(0, 2), 16),
    //       g = parseInt(hex.slice(2, 4), 16),
    //       b = parseInt(hex.slice(4, 6), 16);
    //
    //   // Return light or dark class based on contrast calculation
    //   return ((r * 0.299 + g * 0.587 + b * 0.114) > 186) ? this.textDark : this.textLight;
    // }
  },
  methods: {
    changeColor(i) {
      this.disabled = false
      setTimeout(() => {
        this.disabled = true
        this.bgColor = i
      }, 500)
      setTimeout(() => {
        this.baseBgColor = i
      }, 1500)
    },
    onColorClick(_index) {
      this.currentIndex = _index;
    },
    onThumbClick(_index) {
      this.currentIndex = _index;

      this.$emit('handle-driveaway-data', {
        paint_price: this.colours.images[this.currentIndex].paint_price,
        vehicle_image: this.colours.images[this.currentIndex].images
      });

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
.select-variant-colours.variant-colours-items li.uk-active::after {
  margin: -19px 0 0 -5px;
}
.vehicle-colrs-items li{
  margin: 10px 0;
}
.vehicle-colrs-items .uk-border-circle {
    width: 35px;
    height: 35px;
    padding: 2px;
    margin-bottom: 10px;
    border-radius: 50px;
    box-shadow: 0.02234px 0.01563px 1px black;
    transition: all 0.2s ease-in-out;
}
.vehicle-colrs-items .uk-border-circle:hover, .vehicle-colrs-items li.uk-active .uk-border-circle {
  transform: scale(1.15);
  display: block;
  box-shadow: 0 6px 17px -2px rgb(0 0 0 / 50%);
}
.vehicle-colrs-items li.uk-active a::after {
    content: "";
    position: absolute;
    border: 2px solid #e9e9e9;
    border-top: 0;
    border-right: 0;
    width: 8px;
    height: 4px;
    transform: rotate(-55deg);
    -webkit-transform: rotate(-55deg);
    margin: -32px 0 0 -5px;
    z-index: 1;
}
.colourtitle {
  position: relative;
  bottom: -20px;
}
.uk-light {
    color: rgb(255 255 255 / 92%);
}
.position-z-index-2{
  z-index: 3;
}
.lineargrad{
  transform: translate(0)!important;
}
.linear-grad, .linear-grad-over{
  -webkit-clip-path: polygon(30% 0,100% 0,100% 100%,0 100%);
    clip-path: polygon(30% 0,100% 0,100% 100%,0 100%);
    transform: translate(100vw);
    transition: transform .4s linear;
    z-index: 0;
}
.linear-grad-over{
  z-index: 1;
  background: linear-gradient(201deg, rgb(255 255 255 / 24%) 0%, rgb(255 255 255 / 0%) 100%)
}
</style>
