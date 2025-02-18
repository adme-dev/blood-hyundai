<template>
  <div class="uk-position-relative v-slideshow uk-grid-collapse uk-overflow-hidden uk-background-cover uk-grid"
    tabindex="-1" uk-slideshow="ratio: 479:348; finite:true;animation:pull"
    :style="{ backgroundImage: showPlaceholder ? `url('https://driveagent.b-cdn.net/files/shared/comingsoon.jpg')` : '' }">
    <div class="uk-position-relative uk-width-expand">
      <span class="uk-position-bottom-left uk-position-small uk-position-z-index uk-light">
        <span uk-icon="camera"></span>
        <span class="camera-count">{{ photoCount }}</span>
      </span>

      <div v-if="item.tag?.specialnote"
        class="uk-width-auto uk-width-max-medium message-container uk-position-top-right uk-position-z-index uk-light">
        <div class="message sent uk-text-break" v-html="item.tag.specialnote" :class="`uk-text-${item.tag.textalign}`"
          :style="{ backgroundColor: item.tag.colour, '--bubble-color': item.tag.colour }"></div>
      </div>

      <div class="uk-slideshow-items uk-height-1-1">
        <div v-if="youtubeAvailable">
          <iframe class="uk-height-1-1" width="100%" height="100%" :src="youtubeLink" frameborder="0"
            allowfullscreen></iframe>
        </div>

        <div v-if="photosAvailable" v-for="(image, index) in photosAvailable" :key="index"
          :class="index === 0 ? `uk-active` : ``">
          <div class="uk-height-1-1">
            <a href="#" @click.prevent="showEnquiryModalGallery(item)">
              <div class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover" :data-src="image" uk-img></div>
            </a>
          </div>
        </div>

        <!-- <div v-if="showPlaceholder" class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover"
          :class="index === 0 ? `uk-active` : ``"
          style="background-image: url('https://driveagent.b-cdn.net/files/shared/comingsoon.jpg')">
          <div class="uk-height-1-1">
            <div>
            </div>

          </div>

        </div> -->
      </div>
      <a class="uk-position-center-left uk-overlay uk-overlay-default uk-text-secondary uk-hidden-hover uk-visible@s"
        href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-overlay uk-overlay-default uk-text-secondary uk-hidden-hover uk-visible@s"
        href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      <div class="uk-position-bottom-right v-slideshow-nav uk-light uk-hidden@s">
        <a href="#" uk-slideshow-item="previous"><span uk-icon="icon: arrow-left"></span></a>
        <a href="#" uk-slideshow-item="next"><span uk-icon="icon: arrow-right"></span></a>
      </div>
    </div>

    <div class="uk-width-1-4 v-slideshow-thumbs uk-visible@s">
      <li v-if="showThumbnails" v-for="(image, index) in item.photos.slice(0, 3)" :key="index"
        :uk-slideshow-item="index">
        <a href="#">
          <div class="uk-position-relative uk-background-cover uk-height-1-1" :data-src="image"
            uk-img></div>
        </a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarSalesGalleryList",
  props: ['item'],
  computed: {
    // item() {
    //   return this.$store.getters.vehicleById(this.itemStock);
    // },
    photoCount() {
      return Object.keys(this.item.photos).length;
    },
    youtubeAvailable() {
      return this.item.youtube.displayValue[0];
    },
    youtubeLink() {
      return 'https://www.youtube-nocookie.com/embed/' + this.item.youtube.displayValue[0] + '?autoplay=0&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&wmode=transparent&playsinline=0';
    },
    photosAvailable() {
      return this.item.photos;
    },
    showPlaceholder() {
      return this.photoCount < 1 && !this.youtubeAvailable;
    },
    showThumbnails() {
      return this.photoCount > 4;
    },
  },
  methods: {
    getThumbnailUrl(imageUrl) {
      return imageUrl.replace('1920_1080', '420_580');
    },
    showEnquiryModalGallery(item) {
      this.$store.dispatch("vehicleEnquiryGallery", { show: true, item });
    },
  },
};
</script>