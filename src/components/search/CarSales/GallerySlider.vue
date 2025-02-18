<template>
  <div class="uk-position-relative uk-width-1-1 cs-hero-slider" id="hd-slider"
    data-uk-slideshow="ratio: 1720:1080;finite:true;animation:pull">


    <div class="uk-position-relative uk-width-1-1 p-4">
      <div class="uk-position-relative hd-slider p-4">
        <span class="uk-flex uk-flex-middle uk-light uk-position-bottom-right uk-position-small uk-position-z-index">
          <span class="uk-margin-small-right" uk-icon="camera"></span>
          {{ Object.keys(item.photos).length }}
        </span>

        <ul class="uk-slideshow-items uk-border-rounded" uk-lightbox="animation: slide">
          <li v-if="item.youtube.displayValue[0]">
            <iframe class="uk-height-1-1" width="100%" height="100%" :src="'https://www.youtube-nocookie.com/embed/' +
            item.youtube.displayValue[0] +
            '?autoplay=0&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&wmode=transparent&playsinline=0'
            " frameborder="0" allowfullscreen></iframe>
          </li>

          <li v-if="Object.keys(item.photos).length > 0" v-for="(image, index) in item.photos" :key="index">
            <div class="uk-height-1-1">
              <a :href="`${image}?pxc_size=1920,1080`">
                <span class="uk-light uk-position-bottom-left uk-position-small uk-position-z-index">
                  <span uk-icon="search"></span>
                </span>
                <div class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover" :data-src="`${image}?pxc_size=1920,1080`"
                  data-uk-img="target: !* -*">
                  <!-- <img :data-src="image.Url" width="525" height="394" lazy="load" class="uk-width-1-1" data-uk-img> -->
                </div>
              </a>
            </div>
          </li>

          <li v-if="Object.keys(item.photos).length < 1 && !item.youtube.displayValue[0]">
            <div>
              <img data-src="/comingsoon.jpg" width="2500" height="2500" lazy="load" class="uk-width-1-1" data-uk-img />
            </div>
          </li>
        </ul>
        <a class="uk-text-secondary uk-position-center-left uk-overlay uk-overlay-default uk-padding-small" href="#"
          aria-label="previous" uk-slidenav-previous uk-slideshow-item="previous"></a>
        <a class="uk-text-secondary uk-position-center-right uk-overlay uk-overlay-default uk-padding-small" href="#"
          aria-label="next" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>

      <div>
        <div class="uk-width-1-1">
          <ul class="uk-grid-collapse uk-child-width-1-2 uk-grid"
            :class="[Object.keys(item.photos).length < 4 ? 'thumb-four-set' : '']" uk-lightbox>
            <li v-if="item.youtube.displayValue[0]" class="uk-overflow-hidden">
              <a :href="'https://www.youtube-nocookie.com/embed/' +
            item.youtube.displayValue[0] +
            '?autoplay=0&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&wmode=transparent&playsinline=0'">
                <span class="uk-position-center uk-position-z-index uk-display-block uk-light uk-icon"
                  uk-icon="youtube"></span>
                <img :data-src="'https://img.youtube.com/vi/' + item.youtube.displayValue[0] + '/mqdefault.jpg'"
                  class="responsive-width" uk-cover uk-img>
              </a>
            </li>
            <li class="uk-width-1-1 uk-grid-collapse uk-child-width-1-2@s uk-child-width-1-3@l" uk-grid="masonry: true">
              <div v-for="(image, index) in item.photos" :key="index">
                <a :href="`${image}?pxc_size=1920,1080`" class="index-2 uk-height-1-1">
                  <img :data-src="image" width="525" height="394" lazyload="lazy" class="uk-width-1-1 p-4"
                    data-uk-img>
                </a>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarSalesGalleryList",
  props: ['itemStock'],
  data() {
    return {
      image_count: "",
      youtube_id: this.itemYouTube,
      item: this.itemStock
    };
  },
  mounted: function () {
    //this.getData();
    //alert(this.$store.state.stockurls.site_url)
  },
  // computed: {
  //   item() {
  //     return this.itemStock;
  //   },
  // },
  methods: {
    youtubeVehicle() {
      if (this.item.youtube.displayValue[0]) return 1
      else return 0
    }
  },
};
</script>
<style>
.p-4 {
  padding: 4px;
  border-radius: 10px;
}
</style>
