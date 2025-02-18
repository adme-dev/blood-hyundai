<template>
  <div class="uk-position-relative uk-visible-toggle uk-light CarSalesGallery v-slideshow" data-uk-slideshow="ratio: 494:325; finite:true;animation:pull">
    <div class="uk-position-relative">
      <span class="uk-position-bottom-left uk-position-small uk-position-z-index uk-visible@s"
        ><span uk-icon="camera"></span> <span class="camera-count">{{ Object.keys(item.photos).length }}</span></span
      >
      <ul class="uk-slideshow-items gallery-slider uk-background-cover">
        <li v-if="item.youtube.displayValue[0]">
          <iframe
            class="uk-height-1-1"
            width="100%"
            height="100%"
            :src="'https://www.youtube-nocookie.com/embed/' + item.youtube.displayValue[0] + '?autoplay=0&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&wmode=transparent&playsinline=0'"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </li>

        <li v-if="item.photos" v-for="(image, index) in item.photos" :key="index">
          <div class="uk-height-1-1">
            <a href="#" @click.prevent="showEnquiryModalGallery(item)">
              <div class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover" :data-src="image" data-uk-img>
                <!-- <img :data-src="image.Url" width="525" height="394" lazy="load" class="uk-width-1-1" data-uk-img> -->
              </div>
            </a>
          </div>
        </li>

        <li v-if="Object.keys(item.photos).length < 1 && !item.youtube.displayValue[0]">
          <div>
            <img data-src="/comingsoon.jpg" width="525" height="394" lazy="load" class="uk-width-1-1" data-uk-img />
          </div>
        </li>
      </ul>
      <a class="uk-position-center-left uk-overlay uk-overlay-primary uk-hidden-hover uk-visible@s" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-overlay uk-overlay-primary uk-hidden-hover uk-visible@s" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "CarSalesGallery",
  props: {
    itemStock: {
      type: [Number, String],
      default: 0,
    },
    itemCondition: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      post: {},
      image_count: "",
      vehicle_condtion: this.itemCondition,
      //itemStock
    };
  },
  computed: {
    item() {
      return this.$store.getters.vehicleById(this.itemStock);
    },
  },
  methods: {
    showEnquiryModalGallery(item) {
      this.$store.dispatch("vehicleEnquiryGallery", {
        show: true,
        item
      });
    },
  },
};
</script>
