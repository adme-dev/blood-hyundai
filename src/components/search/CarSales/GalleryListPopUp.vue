<template>
  <div id="pop-slider"
    class="uk-position-relative v-slideshow uk-grid-collapse uk-border-rounded uk-overflow-hidden uk-grid"
    uk-slideshow="ratio: 440:300; finite:true;animation:pull">
    <div class="uk-position-relative uk-width-1-1 uk-width-expand@m uk-light">

      <div v-if="stockSpecial" class="uk-position-bottom-right uk-position-small uk-position-z-index">
        <div class="uk-h6 uk-text-bold uk-margin-remove special-badge">
          <svg viewBox="0 0 16 16" width="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <g fill="#fff" fill-rule="nonzero">
                <path
                  d="M9.4 5.727l-4.88 4.886L3.893 10l4.88-4.887.627.614zM5.567 11.66l.626.627 3.627-3.62-.627-.627-3.626 3.62zM15.2 6.373c-.185.26-.16.616.06.847.25.258.25.668 0 .927L7.847 15.56c-.588.586-1.54.586-2.127 0L.44 10.28c-.586-.588-.586-1.539 0-2.127L7.853.74c.125-.123.292-.193.467-.193.173.002.337.071.46.193.124.12.288.186.46.187.139-.001.274-.046.387-.127 1.43-1.084 3.411-1.065 4.82.047L15.293 0H16v.547l-.913.92c1.154 1.417 1.201 3.437.113 4.906zm-.74-4.28L13.447 3.1c.35.607.249 1.373-.247 1.868-.496.495-1.263.595-1.869.243-.606-.351-.9-1.066-.717-1.742.184-.677.799-1.145 1.5-1.142.231.006.459.063.666.166l1.02-1.02c-1.088-.803-2.572-.803-3.66 0-.265.2-.588.307-.92.307-.326.003-.644-.1-.907-.293L1.067 8.78c-.24.242-.24.632 0 .873l5.28 5.28c.241.24.631.24.873 0l7.26-7.266c-.402-.543-.402-1.285 0-1.827.832-1.113.824-2.643-.02-3.747zm-2.347 1.12c-.368 0-.666.299-.666.667 0 .368.298.667.666.667.369 0 .667-.299.667-.667 0-.368-.298-.667-.667-.667z" />
              </g>
            </g>
          </svg>
          {{ item.stock_special.displayValue[0] }}<sup>~</sup>
        </div>
      </div>

      <span class="uk-position-bottom-left uk-position-small uk-position-z-index uk-light">
        <span uk-icon="camera"></span>
        <span class="camera-count">{{ photoCount }}</span>
      </span>


      <ul class="uk-slideshow-items uk-height-1-1" uk-lightbox>
        <li v-if="youtubeAvailable">
          <iframe class="uk-height-1-1" width="100%" height="100%" :src="youtubeLink" frameborder="0"
            allowfullscreen></iframe>
        </li>

        <li v-if="photoCount > 0" v-for="(image, index) in extendedPhotos" :key="index">
          <div class="uk-height-1-1">
            <a :href="`${image}?pxc_size=1920,1080`">
              <div class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover" :data-src="image" uk-img></div>
            </a>
          </div>
        </li>


        <li v-if="showPlaceholder">
          <div>
            <img data-src="/comingsoon.jpg" width="525" height="394" lazy="load" class="uk-width-1-1" uk-img />
          </div>
        </li>
      </ul>
      <a class="uk-position-center-left uk-overlay uk-overlay-default uk-text-secondary uk-hidden-hover uk-visible@s"
        href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-overlay uk-overlay-default uk-text-secondary uk-hidden-hover uk-visible@s"
        href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      <div class="uk-position-bottom-right v-slideshow-nav uk-light uk-hidden@s">
        <a href="#" uk-slideshow-item="previous"><span uk-icon="icon: arrow-left"></span></a>
        <a href="#" uk-slideshow-item="next"><span uk-icon="icon: arrow-right"></span></a>
      </div>
    </div>

    <div class="uk-width-1-4 v-slideshow-thumbs uk-visible@l">
      <li v-for="(image, index) in extendedPhotos.slice(0, 3)" :key="index" :uk-slideshow-item="index">
        <a href="#">
          <div class="uk-position-relative uk-background-cover uk-height-1-1" :data-src="image" uk-img></div>
        </a>
      </li>
    </div>

    <div class="cs-hero-slider uk-width-1-1 thumb-gallery-wrap uk-overflow-auto">
      <div class="thumb-gallery-wrap uk-width-1-1 uk-background-seconary">
        <ul
          class="uk-thumbnav thumb-gallery-items uk-slider-items uk-child-width-1-3 uk-child-width-1-5@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid"
          :class="[extendedPhotos.length < 4 ? 'thumb-four-set' : '']">

          <li v-for="(image, index) in extendedPhotos" :key="index" class="uk-height-1-1">
            <a :uk-slideshow-item="index" class="index-2 uk-height-1-1">
              <div class="uk-background-cover uk-height-small" :data-src="image"
                data-uk-img>

              </div>
            </a>

          </li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "CarSalesGalleryList",
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
  computed: {
    photoCount() {
      return this.item && this.item.photos ? this.item.photos.length : 0;
    },

    extendedPhotos() {
      const originalPhotos = this.item && this.item.photos ? [...this.item.photos] : [];
      const numNeeded = 3 - originalPhotos.length;

      if (originalPhotos.length > 0) {
        for (let i = 0; i < numNeeded; i++) {
          originalPhotos.push(originalPhotos[0]);
        }
      }

      return originalPhotos;
    },
    stockSpecial() {
      return this.item.stock_special;
    },
    item() {
      return this.$store.getters.vehicleById(this.itemStock);
    },
    youtubeAvailable() {
      return this.item.youtube.displayValue[0];
    },
    youtubeLink() {
      return 'https://www.youtube-nocookie.com/embed/' + this.item.youtube.displayValue[0] + '?autoplay=0&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&wmode=transparent&playsinline=0';
    },
    showPlaceholder() {
      return this.photoCount < 1 && !this.youtubeAvailable;
    },
    showThumbnails() {
      return this.photoCount > 4;
    }
  },
  methods: {
    getThumbnailUrl(imageUrl) {
      return imageUrl.replace('1920_1080', '220_180');
    },
    showEnquiryModalGallery(item) {
      this.$store.dispatch("vehicleEnquiryGallery", { show: true, item });
    },
  },
};
</script>
<style scoped>
.special-badge {
  font-size: 12px;
  letter-spacing: 1px;
  padding: 5px 8px;
  background-color: #c00;
  color: #fff;
  border-radius: 10px;
}

.thumb-gallery-items li a.uk-active,
.thumb-gallery-items a:hover {
  opacity: 0.2;
}

.cs-hero-slider {
  padding-top: 5px;
  background: #000;
  position: relative;
  z-index: 999;
}

.cs-hero-slider .uk-thumbnav>* {
  max-width: 10%;
  padding-left: 0;
  margin-top: 0;
}

.thumb-gallery-items li div {
  width: 100%;
  height: 70px;
  overflow: hidden;
}

.uk-thumbnav>*>*::after {
  background-image: none;
}

.thumb-gallery-items.uk-slider-items.uk-grid {
  padding: 4px;
  margin-left: 0;
  flex-wrap: wrap;
}

.v-slideshow-thumbs>li:after {
  border-bottom: solid 2px #101013;
  border-left: solid 2px #101013;
}

.v-slideshow-thumbs li {
  border-bottom: solid 2px #101013;
}

.cs-hero-slider .uk-thumbnav a,
.cs-hero-slider .uk-thumbnav img {
  padding: 0 5px;
  border-radius: 10px;
}

@media (max-width: 960px) {
  .thumb-gallery-items.uk-slider-items.uk-grid {
    display: inline-flex;
    flex-wrap: nowrap;
    touch-action: auto !important;
  }

  .cs-hero-slider .uk-thumbnav>* {
    width: 94px;
    max-width: 94px;
    touch-action: auto;
  }

  .thumb-gallery-items.uk-slider-items.uk-grid {
    display: inline-flex;
    flex-wrap: nowrap;
    touch-action: auto !important;
  }
}

@media (max-width: 1200px) {
  .thumb-gallery-items li div {
    height: 80px;
  }
}

@media (max-width: 1360px) {
  .v-slideshow-thumbs{
    display: none;
  }
}
</style>