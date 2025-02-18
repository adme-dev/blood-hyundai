<template>

<div v-if="home_slides.length" class="uk-container uk-container-large uk-padding-remove uk-margin-small-top uk-margin-large-bottom uk-overflow-hidden">

  <div class="uk-position-relative" uk-slider="autoplay: true; autoplay-interval: 3000">

     <div class="uk-position-relative">

       <div class="uk-slider-container">

         <ul class="uk-slider-items uk-flex uk-flex-center@s uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-3@l uk-child-width-1-4@xl">

        <li v-for="(slide, index) in home_slides" :key="index" class="">
          <router-link :to="slide.link">
            <div class="uk-padding-small uk-width-1-1">
              <img
                :data-src="`${slide.image}?width=320&auto_optimize=medium`"
                width="320"
                height="320"
                class="uk-width-1-1 uk-position-relative"
                :alt="`${slide.button_text}`"
                loading="lazy"
                uk-img
              />
            </div>
          </router-link>

          <div class="uk-padding-small">
            <h2 class="uk-h5 uk-margin-small-bottom" v-html="slide.content"></h2>
          <div v-if="slide.link">
            <router-link class="uk-text-bold uk-margin-small-left view-more" :to="slide.link">{{
              slide.button_text
            }}</router-link> →
          </div>
        </div>

        </li>
      </ul>
    </div>

    <div class="uk-visible@m">
     <a class="uk-position-center-left uk-overlay-default uk-position-small" href="#" aria-label="previous" uk-slidenav-previous uk-slider-item="previous"></a>
     <a class="uk-position-center-right uk-overlay-default uk-position-small" href="#" aria-label="next" uk-slidenav-next uk-slider-item="next"></a>
    </div>

  </div>

  <div class="uk-flex uk-flex-center uk-margin-small-top">
  <a class="tm-slidenav" href="#" uk-slider-item="previous" aria-label="previous"uk-slidenav-previous></a>
  <a class="tm-slidenav" href="#" uk-slider-item="next" aria-label="next" uk-slidenav-next></a>
  </div>

 </div>
</div>
</template>
<script>
import { isDateInRange } from "@/utils";

export default {
  name: "front-slider",
  computed: {
    home_slides() {
      const slides = this.$store.state.site.promotional[0].thumbs;
      return slides.filter((comp) => isDateInRange(comp.start, comp.end));
    },
  },
};
</script>
