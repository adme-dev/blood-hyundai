<template>
  <div>
    <div class="uk-position-relative uk-visible-toggle uk-light CarSalesGallery v-slideshow" data-uk-slideshow="ratio: 494:245; finite:true;animation:fade">
      <div class="uk-position-relative">
        <ul class="uk-slideshow-items gallery-slider uk-background-cover" uk-lightbox="animation: slide">

            <li v-for="(image, index) in images" :key="index">
                <div class="uk-height-1-1">
                  <a :href="image">
                    <div class="uk-inline uk-width-1-1 uk-height-1-1 uk-background-cover" :data-src="image" data-uk-img>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
            <a class="uk-position-center-left uk-overlay uk-overlay-primary uk-hidden-hover uk-visible@s" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
            <a class="uk-position-center-right uk-overlay uk-overlay-primary uk-hidden-hover uk-visible@s" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
          </div>

          <div class="thumb-gallery-wrap uk-overflow-auto">
              <div class="thumb-gallery-wrap uk-width-1-1 uk-background-default">
                <ul class="uk-thumbnav thumb-gallery-items uk-slider-items uk-child-width-1-3 uk-child-width-1-5@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid"
                        :class="[Object.keys(images).length < 4 ? 'thumb-four-set' : '']"
                      >
                        <li
                          v-for="(image, index) in images"
                          :key="index"
                          :data-uk-slideshow-item="index"
                          class="uk-background-cover"
                          :data-src="image"
                          data-uk-img
                        >
                          <div>
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
props: {
  images: {
      type: Array,
      required: true,
        }
  },
  data: () => ({

  }),
  beforeMount() {

  },
  created() {
  },
  methods: {

  },
  watch: {

  }
}
</script>
<style scoped>
.thumb-gallery-items li div {
  width: 20px;
  height: 70px;
  overflow: hidden;
}
.uk-thumbnav.thumb-gallery-items > * > ::after {
  background: transparent;
}
.thumb-gallery-items li::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.4);
  -webkit-transition: background-color 0.1s ease-in-out;
  transition: background-color 0.1s ease-in-out;
}
.thumb-gallery-items li {
      max-width: 150px;
}
.thumb-gallery-items li.uk-active::after {
  background-color: transparent;
}
.thumb-gallery-items.uk-slider-items.uk-grid {
  margin-left: 0;
  flex-wrap: wrap;
}
@media (max-width: 1200px) {
  .thumb-gallery-items li div {
    height: 40px;
  }
}
@media (max-width: 960px) {
  .uk-container,
  .uk-slider.uk-slider-container,
  .uk-grid-column-small > *,
  .uk-grid-small > * {
    padding: 0;
  }
  .uk-grid-column-small,
  .uk-grid-small {
    margin-left: 0;
  }
  .thumb-gallery-items.uk-slider-items.uk-grid {
    display: inline-flex;
    flex-wrap: nowrap;
  }
  .cs-hero-slider .uk-thumbnav > * {
    width: 94px;
    max-width: 94px;
    height: 76px;
    touch-action: auto;
  }
  .cs-hero-slider .uk-thumbnav.thumb-four-set > * {
    width: 110px;
    max-width: 110px;
  }
}
@media (min-width: 960px) {
  .gallery-vehicle,
  .sidebar-card {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .cs-hero-slider .uk-thumbnav.thumb-four-set > * {
    max-width: 200px;
    min-height: 90px;
  }
}
</style>
