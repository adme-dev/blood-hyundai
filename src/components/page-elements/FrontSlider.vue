/* Custom styling for the subheading */
.uk-text-large {
  font-size: 1.4rem;
  line-height: 1.4;
}<template>
  <div class="hero-slider uk-margin-small-top uk-position-relative uk-overflow-hidden uk-visible-toggle" tabindex="-1"
    uk-slider="finite: true; autoplay:true; autoplay-interval:3500" ref="slider">

    <div class="uk-position-relative uk-visible-toggle">
      <div class="uk-slider-items uk-grid uk-grid-small">
        <div class="uk-width-4-5@s" 
             v-for="(slide, index) in home_slides" 
             :key="index" 
             :data-index="index">
          <div class="uk-panel">
            <!-- Overlay for inactive slides - uses UIkit's native slider navigation -->
            <a href="#" 
               class="slide-overlay uk-position-cover" 
               :uk-slider-item="index"
               aria-label="View this slide">
            </a>
            
            <component 
              v-if="slide.link" 
              :is="linkComponent(slide.link)"
              class="uk-height-1-1 uk-width-1-1 uk-position-absolute uk-position-z-index slide-link"
              :to="!isLinkExternal(slide.link) ? slide.link : undefined"
              :href="isLinkExternal(slide.link) ? formatLink(slide.link) : undefined"
              :aria-label="slide.heading_content || formatSlideTitle(slide.link)"
              :target="isLinkExternal(slide.link) ? '_blank' : undefined"
              :rel="isLinkExternal(slide.link) ? 'noopener noreferrer' : undefined"
              :id="`slide-${index}`"
            >
            </component>

            <div v-if="slide.desktop">
              <picture>
                <source :srcset="`${slide.desktop}?width=1600`" media="(min-width: 960px)" />
                <source :srcset="`${slide.mobile}?width=566`" media="(max-width: 959px)" />
                <img :src="index === 0 ? `${slide.desktop}?width=1600` : `${slide.mobile}?width=566`" class="uk-width-1-1 slide-image"
                  width="1800" height="1200" :alt="strippedHeadingContent(slide.heading_content)" 
                  />
              </picture>

              <div v-if="slide.button_text" class="uk-position-bottom-left uk-width-medium uk-padding uk-text-left">
                <h2 v-bind:class="'' + slide.contrast + ''"
                  class="uk-heading-small uk-margin-remove uk-text-normal"
                  uk-slider-parallax="x: 100,-100" v-html="slide.heading_content">
                </h2>
                <p v-bind:class="'' + slide.contrast + ''" class="uk-heading-small uk-margin-small-top"
                  uk-slider-parallax="x: 200,-200" v-html="slide.sub_heading">
                </p>
                <div v-if="slide.button_text" class="uk-animation-fade">
                  <div class="uk-margin-small-top">
                    <router-link v-if="slide.link" :class="[slide.contrast, slide.button_colour]"
                      class="uk-button uk-text-bold ford-btn uk-border-pill uk-margin-small-top uk-width-auto uk-padding-left"
                      uk-slider-parallax="x: 300,-300" :to="slide.link">{{ slide.button_text }}</router-link>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="slide.video" class="uk-height-1-1 uk-position-relative">
              <video :src="slide.video" loop muted playsinline uk-video="autoplay: inview" :poster="slide.video_poster"
                ></video>

              <div class="uk-position-bottom-left uk-padding uk-width-medium uk-text-left">
                <h2 v-bind:class="'' + slide.contrast + ''"
                  class="uk-heading-small uk-margin-remove"
                  uk-slider-parallax="x: 100,-100" v-html="slide.heading_content">
                </h2>
                <p v-bind:class="'' + slide.contrast + ''" class="uk-heading-small uk-margin-remove-top uk-text-bold"
                  uk-slider-parallax="x: 200,-200" v-html="slide.sub_heading">
                </p>
                <div v-if="slide.button_text" class="uk-animation-fade">
                  <div class="uk-margin-small-top">
                    <router-link v-if="slide.link" :class="[slide.contrast, slide.button_colour]"
                      class="uk-button uk-text-bold ford-btn uk-border-pill uk-margin-small-top uk-width-auto uk-padding-left"
                      uk-slider-parallax="x: 300,-300" :to="slide.link">{{ slide.button_text }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

    <!-- <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    
    <div class="uk-flex uk-flex-center uk-margin-small">
      <a class="uk-margin-small-right uk-border-circle slider-nav-btn" href="#" aria-label="previous" uk-slider-item="previous"><svg width="30" height="30" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <polyline fill="none" stroke="#fff" points="10 14 5 9.5 10 5"></polyline>
          <line fill="none" stroke="#fff" x1="16" y1="9.5" x2="5" y2="9.52"></line>
        </svg></a>
      <a class="uk-margin-small-left uk-border-circle slider-nav-btn" href="#" aria-label="next" uk-slider-item="next"><svg width="30" height="30" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <polyline fill="none" stroke="#fff" points="10 5 15 9.5 10 14"></polyline>
          <line fill="none" stroke="#fff" x1="4" y1="9.5" x2="15" y2="9.5"></line>
        </svg></a>
    </div> -->

  </div>
</template>
<script>
import { isDateInRange } from "@/utils";
import MetaMixin from "@/mixins/meta";

export default {
  name: "front-slider",
  data() {
    return {
      siteName: this.$store.state.site.name,
      activeSlide: 0
    };
  },
  computed: {
    home_slides() {
      const slides = this.$store.state.site.promotional[0].slides;
      return slides.filter((comp) => isDateInRange(comp.start, comp.end));
    }
  },
  mounted() {
    // Listen for UIkit slider before-show event to update activeSlide
    this.$nextTick(() => {
      if (typeof UIkit !== 'undefined' && this.$refs.slider) {
        UIkit.util.on(this.$refs.slider, 'itemshow', (e) => {
          const slideItems = document.querySelectorAll('.uk-slider-items > div');
          // Find the active slide index
          slideItems.forEach((slide, index) => {
            if (slide.classList.contains('uk-active')) {
              this.activeSlide = index;
              console.log('Active slide:', index);
            }
          });
        });
      }
    });
  },
  methods: {
    isLinkExternal(link) {
      return /^(http|https):\/\//.test(link);
    },
    linkComponent(link) {
      return this.isLinkExternal(link) ? 'a' : 'router-link';
    },
    formatLink(link) {
      if (/^https?:\/\//.test(link)) {
        return link;
      }
      return 'https://' + link;
    },
    formatSlideTitle(link) {
      if (!link) return this.siteName;
      const parts = link.replace('-', ' ').split('/');
      return parts[2] || parts[1] || this.siteName;
    },
    strippedHeadingContent(content) {
        if (!content) return '';
        // Remove HTML tags and return plain text
        return content.replace(/<[^>]*>/g, '');
    }
  },
  metaInfo() {
    if (!this.home_slides || !this.home_slides.length) return {};
    
    return {
      link: [{
        rel: 'preload',
        fetchpriority: 'high',
        as: 'image',
        href: this.home_slides[0].desktop,
        type: 'image/jpg'
      }]
    };
  }
};
</script>
<style>
.hero-slider h2,
.hero-slider h1,
.hero-slider h3,
.hero-slider h4,
.hero-slider p {
  margin: 0
}

.hero-slider .uk-light {
  color: #fff
}

.hero-panel {
  z-index: 2;
}
</style>

<style scoped>
/* Slider item styling */
.uk-slider-items {
  margin-left: 0;
}

.uk-slider-items > div {
  padding: 10px;
  transition: transform 0.3s ease;
}

.uk-panel {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.uk-panel:hover {
  transform: translateY(-5px);
}

/* Navigation styling */
.uk-dotnav {
  margin-top: 20px;
  position: relative;
  z-index: 5;
}

.hero-slider .uk-slider-nav li a {
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  width: 12px;
  height: 12px;
  transition: all 0.3s;
}

.hero-slider .uk-slider-nav li.uk-active a {
  background-color: #fff;
  transform: scale(1.2);
}

/* Slide content styling */
.slide-image {
  object-fit: cover;
  height: 100%;
  border-radius: 0;
}

.uk-position-bottom-left {
  padding: 2rem 2rem 4rem 4rem; /* Top Right Bottom Left - increased bottom padding */
  width: 400px;
  z-index: 5;
}

.ford-btn {
  background-color: #066fef;
  color: white;
  transition: background-color 0.3s;
}

.ford-btn:hover {
  background-color: #0142BE;
  color: white;
}

/* Text styling to match the attached image */
.uk-heading-medium, .uk-heading-small {
  text-shadow: none;
  font-weight: 400; /* Reduced font weight from 700 to 400 */
}

/* Ford OEM style */
.uk-heading-small {
  font-size: 1.85rem;
  letter-spacing: -.0525rem;
  line-height: 2.2rem;
}

/* Override for heading weight */
.uk-text-normal {
  font-weight: 400 !important;
}

@media (max-width: 960px) {
  .uk-position-bottom-left {
    padding: 1rem 1rem 2rem 2rem; /* Add extra padding on left and bottom for mobile */
    width: 70%; /* Reduce width to avoid side widget */
  }
}

.slider-nav-btn {
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, transform 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.slider-nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* Overlay styles for non-active slides */
.slide-overlay {
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 10; /* Ensure it's above other elements */
  text-decoration: none;
  display: block;
}

/* Make overlays only visible on inactive slides */
.uk-slider-items > div:not(.uk-active) .slide-overlay {
  opacity: 1; 
}

/* Darken inactive slides */
.uk-slider-items > div:not(.uk-active) .uk-panel {
  filter: brightness(0.7);
  transition: all 0.3s ease;
}

/* Add hover effect to inactive slides */
.uk-slider-items > div:not(.uk-active) .uk-panel:hover {
  filter: brightness(0.9);
}

/* Style active slides */
.uk-slider-items > div.uk-active .uk-panel {
  transform: scale(1);
  z-index: 1;
  box-shadow: 0 14px 25px rgba(0,0,0,0.16);
}

/* Hide overlay on active slides */
.uk-slider-items > div.uk-active .slide-overlay {
  opacity: 0;
  pointer-events: none;
}

.slide-link {
  z-index: 1;
}

/* Slide transition effects */
.uk-slider-items > div.slide-activating .uk-panel {
  filter: brightness(1);
  transition: all 0.3s ease;
}

.uk-slider-items > div.slide-activating .slide-overlay {
  opacity: 0.3;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}
</style>