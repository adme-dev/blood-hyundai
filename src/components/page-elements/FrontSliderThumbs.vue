<template>
  <div v-if="home_slides.length" class="uk-width-1-1 uk-inline"
    uk-slider="sets: true; autoplay: true; autoplay-interval:4500">
    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
      <ul class="
          uk-slider-items
          uk-child-width-1-2
          uk-child-width-1-3@s
          uk-child-width-1-4@m

          uk-light
        ">
        <li v-for="(slide, index) in home_slides" :key="index"
          class="thumb-hover-wrp uk-transition-toggle uk-overflow-hidden">

          <component :is="linkComponent(slide.link)" :href="isLinkExternal(slide.link) ? slide.link : undefined"
            :to="!isLinkExternal(slide.link) ? slide.link : undefined"
            :target="isLinkExternal(slide.link) ? '_blank' : undefined" class="uk-text-light" rel="nofollow">

            <div class="uk-inline uk-width-1-1">
              <img :src="`${slide.image}`" width="300" height="300"
                :alt="`${slide.button_text || siteName}`" class="uk-width-1-1 uk-position-relative" loading="lazy" />
            </div>

            <div v-if="slide.content"
              class="uk-padding uk-overlay-primary uk-position-cover uk-transition-slide-top uk-flex uk-flex-center uk-flex-middle"
              style="z-index: 1">
              <div>
                <h2 class="uk-h5 uk-margin-small-bottom uk-text-uppercase">{{ slide.content }}</h2>
                <!-- Conditional rendering for internal links as router-link for button text -->
                <router-link v-if="slide.link && !isLinkExternal(slide.link)"
                  class="uk-h5 uk-text-bold uk-margin-remove view-more" :to="slide.link">
                  {{ slide.button_text }}
                </router-link>
                <!-- Optionally handle external link button text here, similar to the content above -->
              </div>
            </div>

            <div class="uk-height-1-1 uk-width-1-1 uk-background-cover uk-transition-slide-bottom uk-position-cover"
              :style="`background-image: url('${slide.image}?width=422&auto_optimize=medium');`"></div>
          </component>

        </li>
      </ul>
      <a class="uk-flex uk-flex-middle uk-height-1-1 uk-position-bottom-left uk-overlay-primary uk-hidden-hover uk-visible@m"
        href="#" aria-label="previous" uk-slidenav-previous uk-slider-item="previous"></a>
      <a class="uk-flex uk-flex-middle uk-height-1-1 uk-position-bottom-right uk-overlay-primary uk-hidden-hover uk-visible@m"
        href="#" aria-label="next" uk-slidenav-next uk-slider-item="next"></a>
    </div>
  </div>
</template>
<script>
import { isDateInRange } from "@/utils";

export default {
  name: "front-slider",
  data() {
    return {
      siteName: this.$store.state.site.name,
    };
  },
  methods: {
    isLinkExternal(link) {
      return /^(http|https):\/\//.test(link);
    },
    linkComponent(link) {
      // Determine the component based on the link type
      return this.isLinkExternal(link) ? 'a' : 'router-link';
    },
    formatLink(link) {
      // Check if the link already starts with http:// or https://
      if (/^https?:\/\//.test(link)) {
        return link; // Return the link as is
      } else {
        // If not, prepend 'https://' to the link (or apply any other needed logic)
        return 'https://' + link;
      }
    }
  },
  computed: {
    home_slides() {
      const slides = this.$store.state.site.promotional[0].thumbs;
      return slides.filter((comp) => isDateInRange(comp.start, comp.end));
    },
  },
};
</script>
<style lang="css" scoped>
.thumb-hover-wrp img {
  padding: 20px;
  border-radius: 20px;
  -webkit-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  -webkit-transition-property: opacity, -webkit-transform, -webkit-filter;
  transition-property: opacity, -webkit-transform, -webkit-filter;
  transition-property: opacity, transform, filter;
  transition-property: opacity, transform, filter, -webkit-transform, -webkit-filter;
}

.thumb-hover-wrp:hover img {
  -webkit-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  transform: translateY(-100%);
}
</style>
