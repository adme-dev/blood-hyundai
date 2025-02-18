<template>

  <div class="hero-slider uk-position-relative uk-overflow-hidden uk-visible-toggle uk-transition-toggle" tabindex="-1" uk-slideshow="animation:push; ratio: 7:3; autoplay:true; autoplay-interval:3500; min-height:900">

    <ul class="uk-slideshow-items uk-child-width-1-1">

      <li v-for="(slide, index) in home_slides" :key="index" class="uk-background-secondary">
        <div v-if="slide.desktop">
          <img
            :src="`${slide.desktop}?width=2200`"
            class="uk-visible@m"
            uk-cover
            loading="lazy"
            :alt="slide.heading_content"
          />

          <img
            :src="`${slide.mobile}?width=960`"
            class="uk-width-1-1 uk-hidden@m"
            uk-cover
            loading="lazy"
            :alt="slide.heading_content"
          />

          <div :class="slide.postion"
               class="leader-board uk-flex uk-flex-left uk-flex-middle uk-container uk-container-xlarge"
               >
            <div
              class="uk-panel uk-padding uk-text-left uk-width-1-1 uk-width-xlarge"
              uk-slideshow-parallax="x: -1570,0,0"
            >
              <h4
                v-bind:class="'' + slide.contrast + ''"
                class="el-meta uk-margin-remove uk-h1 uk-text-bold uk-margin-remove-adjacent"
                uk-slideshow-parallax="x: 320,0,-250"
                v-html="slide.heading_content"
              >
              </h4>
              <div v-bind:class="'' + slide.contrast + ''" class="sub-txt-slider uk-text-bold" uk-slideshow-parallax="x: 120,0,-250"
                v-html="slide.sub_heading">
              </div>
                <div v-if="slide.button_text" class="uk-animation-fade">
                  <div class="uk-margin-small-top">
                    <router-link
                    v-if="slide.link"
                    class="sl-btn uk-button uk-button-primary uk-text-bold border-radius-50 uk-light uk-width-auto"
                    uk-slideshow-parallax="x: 1940,-1940"
                    :to="slide.link"
                    >{{ slide.button_text }} <span class="uk-margin-small-left">→</span></router-link
                  >
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div v-else class="uk-height-1-1 uk-background-cover" :data-src="slide.video_poster" uk-img>
          <video
            :src="slide.video"
            loop
            muted
            playsinline
            uk-video="autoplay: inview"
            :poster="slide.video_poster"
            uk-cover
          ></video>

          <div class="leader-board uk-position-cover uk-flex uk-flex-left uk-flex-middle uk-container uk-container-xlarge">
            <div
              class="uk-panel uk-padding uk-text-left uk-width-1-1 uk-width-xlarge"
              uk-slideshow-parallax="x: -1570,0,0"
            >
            <h4
              :class="slide.contrast"
              class="el-meta uk-margin-remove uk-h1 uk-text-bold uk-margin-remove-adjacent"
              uk-slideshow-parallax="x: 320,0,-250"
              v-html="slide.heading_content"
            >
            </h4>
            <div v-bind:class="'' + slide.contrast + ''" class="sub-txt-slider uk-text-bold" uk-slideshow-parallax="x: 120,0,-250"
              v-html="slide.sub_heading">
            </div>
                <div v-if="slide.button_text" class="uk-animation-fade">
                  <div class="uk-margin-medium-top">
                    <router-link
                    v-if="slide.link"
                    class="sl-btn uk-button uk-background-default uk-text-bold uk-width-auto"
                    uk-slideshow-parallax="x: 1940,-1940"
                    :to="slide.link"
                    >{{ slide.button_text }} </router-link
                  >
                  </div>
                </div>
              </div>
          </div>
        </div>
      </li>
    </ul>



    <a class="uk-position-bottom-left uk-margin-large-left uk-padding-small uk-light uk-text-emphasis uk-transition-fade uk-hidden-hover uk-visible@m" href="#" aria-label="previous" uk-slideshow-item="previous"><svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#fff" points="10 14 5 9.5 10 5"></polyline><line fill="none" stroke="#fff" x1="16" y1="9.5" x2="5" y2="9.52"></line></svg></span></a>
    <a class="uk-position-bottom-right uk-hidden-hover uk-padding-small uk-light uk-text-emphasis uk-transition-fade uk-margin-large-right uk-visible@m" href="#" aria-label="next" uk-slideshow-item="next"><svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#fff" points="10 5 15 9.5 10 14"></polyline><line fill="none" stroke="#fff" x1="4" y1="9.5" x2="15" y2="9.5"></line></svg></a>


    <!-- <div class="uk-light"><ul class="uk-position-bottom-center uk-slideshow-nav uk-dotnav uk-flex-center uk-margin-medium uk-position-z-index"></ul></div> -->

    <!-- <div
      class="
        uk-grid-collapse
        uk-child-width-1-1
        uk-inline-clip
        uk-transition-toggle
        uk-transition-slide-right
        uk-hidden-hover
        uk-position-center-right
        uk-light
        uk-visible@m
      "
    >
      <a
        class="uk-padding-remove-right uk-background-secondary uk-padding-small"
        href="#"
        uk-slidenav-next
        uk-slideshow-item="next"
        ></a
      >
      <a
        class="uk-padding-remove-right uk-background-secondary uk-padding-small"
        href="#"
        uk-slidenav-previous
        uk-slideshow-item="previous"
        ></a
      >
    </div> -->




  </div>
</template>
<script>
import { isDateInRange } from "@/utils";
export default {
  name: "front-slider",
  computed: {
    home_slides() {
      const slides = this.$store.state.site.promotional[0].slides;
      return slides.filter((comp) => isDateInRange(comp.start, comp.end));
    },
  },
};
</script>
<style>
.hero-slider h2, .hero-slider h1, .hero-slider h3, .hero-slider h4{
  margin: 0
}
.hero-slider .uk-thumbnav>* {
padding-left: 0;
}
.hero-slider .hero-thumbnav {
  width: 190px;
  height: 120px;
}

.item-progress{
  background: #c3002f;
  width: 0;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2
}

.hero-slider .sl-btn.uk-button-default, .hero-slider .sl-btn.uk-button-default:hover {
color: #fff;
border-color: #920023;
background-color: #920023;
}
.hero-slider .uk-light{
  color: #fff
}
.hero-slider .uk-button.uk-button-text.uk-light:before {
border-bottom: 2px solid #fff;
}
@media (max-width: 960px) {
.hero-slider .uk-slideshow-items{
  min-height: 100vh!important;
}
.hero-slider .leader-board.uk-flex-middle {
  margin-top: 120px;
  align-items: start;
 }
 .flex-slider-items{
   margin-bottom: 40px;
 }
 .flex-slider-items .uk-slider-items > * {
    touch-action: auto;
 }
}
</style>
