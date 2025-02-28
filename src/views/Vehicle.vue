<template>
<div v-if="vehicle">
<PageSchema />
  <div class="vehicle">

    <div id="top" v-if="vehicle.header.slides" class="uk-position-relative uk-background-secondary">
            <div class="uk-width-1-1 uk-overflow-hidden uk-inline">

            <div class="uk-position-bottom uk-position-z-index uk-light">
                   <div class="uk-container uk-container-large">
                    <div class="uk-padding spec-strip-grid uk-grid">

                        <div class="uk-width-1-1 spec-strip-header uk-margin-medium-bottom">
                        <span class="uk-h1 uk-text-bold">{{vehicle.header.slides[0].heading}}</span>
                        <div class="uk-h4 uk-margin-remove-top">{{vehicle.header.slides[0].sub_heading}}</div>
                        </div>

                          <div v-for="(item, index) in vehicle.header.slides[0].bottom_strip" :key="index" class="uk-width-auto spec-strip">
                              <div class="uk-h5 uk-margin-remove-bottom" v-html="item.heading"></div>
                              <div class="uk-text-small uk-text-light uk-margin-small-bottom" v-html="item.sub_heading"></div>
                          </div>

                          <div v-if="vehicle.form" class="uk-width-1-1 uk-width-auto@m uk-margin-auto-left@m">
                            <a href="#register" uk-scroll class="uk-width-1-1 uk-width-auto@s uk-button uk-button-default tm-button-default text-inherit heading-btn">{{vehicle.header.slides[0].button}}</a>
                          </div>

                          <div v-else class="uk-width-1-1 uk-width-auto@m uk-margin-auto-left@m">
                            <a :href="`/build/${vehicle.model }`" class="uk-width-1-1 uk-width-auto@s uk-button uk-button-default tm-button-default text-inherit heading-btn">{{vehicle.header.slides[0].button}}</a>
                          </div>

                        </div>
                    </div>
                    <div class="uk-container uk-container-large uk-margin-small-bottom uk-text-center bounce uk-visible@s"><a href="#start" uk-scroll="offset:140"><span uk-icon="icon: chevron-down; ratio: 1.3"></span></a></div>
                    <div class="uk-container uk-container-large uk-margin-small-bottom uk-text-center bounce uk-hidden@s"><a href="#start" uk-scroll><span uk-icon="icon: chevron-down; ratio: 1.3"></span></a></div>

                  </div>

            <div class="uk-overflow-hidden" uk-height-viewport>

            <div v-if="vehicle.header.slides[0].video">
             <video :src="`${vehicle.header.slides[0].video}`" loop muted playsinline poster="`${vehicle.header.slides[0].desktop__slide}`" uk-video="autoplay: inview" uk-cover></video>
            </div>

            <div v-else>
              <img :data-src="`${vehicle.header.slides[0].desktop}`" :alt="vehicle.model" class="uk-visible@m uk-width-1-1" data-uk-img uk-cover>
              <img :data-src="`${vehicle.header.slides[0].mobile}`" :alt="vehicle.model" class="uk-hidden@m uk-width-1-1" data-uk-img uk-cover>
            </div>

            </div>
             <div class="uk-position-bottom uk-width-1-1 uk-gradient"></div>
          </div>

        </div>

        <div v-if="vehicle.form" :class="[vehicle.formbg == 'uk-light' ? 'uk-background-secondary uk-light' : '']">
          <div class="uk-container form-wrap" :class="[vehicle.form == 'Contact' ? 'uk-container-large' : 'uk-container-xsmall']">
            <component :is="dynamicComponent" activeHoursTab="register" class="uk-margin-large-bottom uk-margin-large-top" id="register"/>
          </div>
        </div>

        <div v-else class="uk-margin-large-top">
            <variantSlider v-if="vehicle.model" :itemModel="vehicle.model" :itemTitle="$route.params.slug" :key="$route.params.slug"></variantSlider>
        </div>


      <div class="uk-background-muted">
        <carRelated :model="$route.params.slug" vehicle_id="0"></carRelated>
      </div>

   <post-content :content="vehicle.content.rendered" />

  </div>

  <div v-if="!vehicle.form">
   <VehicleSelectEnquire :key="$route.params.slug" :itemModel="$route.params.slug" v-if="scrollpx > 4100"/>
  </div>

</div>

<div v-else>
  <div class="uk-flex uk-height-medium uk-background-secondary uk-light" uk-height-viewport="offset-top: true">
    <div class="uk-margin-auto uk-margin-auto-vertical uk-text-center">
      <div class="uk-position-relative spinner-loader"></div>
      <div class="uk-padding-small">loading vehicle</div>
    </div>
  </div>
</div>

</template>

<script>

import MetaMixin from "@/mixins/meta";
import lazyLoadComponent from "@/utils/lazyLoad";
import BlockLoading from "@/components/utilities/loading";

import variantSlider from "@/components/modelSlider/variantSlider";
const PageSchema = () => import('@/components/page-elements/PageSchema')
const PostContent = () => import('../components/content/PostContent')
const Register = () => import("@/components/page-elements/RegisterForm");
const ContactForm = () => import("@/components/page-elements/ContactForm");
import {
  VehicleService
} from "@/services";
export default {
  name: "vehicle",
  mixins: [MetaMixin],
  components: {
    PageSchema,
    PostContent,
    variantSlider,
    carRelated: lazyLoadComponent({
      componentFactory: () => import(/* webpackChunkName: "carRelated" */ "@/builder/components/carsalesRelated.vue"),
      loading: BlockLoading,
    }),
    VehicleSelectEnquire: () => import("@/components/page-elements/VariantSelectEnquire.vue"),
  },
  data() {
    return {
      vehicle: null,
      variant: [],
      single_variant: [],
      scrollpx: 0,
    };
  },
  computed: {
    dynamicComponent() {
      if (this.vehicle.form === "Register") {
        return Register;
      } else if (this.vehicle.form === "Contact") {
        return ContactForm;
      } else {
        //console.log('');
      }
    },
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        const {  slug} = newValue;
        this.getVehiclePage(slug);
        setTimeout(()=>{
         this.galleryTop();
       },1800);
        // VehicleService.getVariantByModel360(this.$route.params.slug).then((data) => {
        //   this.variant = data;
        //   this.single_variant = data;
        // });
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

       document.body.classList.add("vehicle-page");
       var scripts = [
       "/assets/js/swiper-bundle.min.js",
     ];
     scripts.forEach(script => {
       let tag = document.createElement("script");
       tag.setAttribute("src", script);
       document.head.appendChild(tag);
     });
    setTimeout(()=>{
     this.galleryTop();
   },1800);
  },
  methods: {
    handleScroll() {
      this.scrollpx = window.scrollY;
    },
    getVehiclePage(pageName) {
      const isPageExists = this.vLodash.findIndex(
        this.$store.state.viewedPages,
        (p) => p.name === pageName
      );

      if (isPageExists == -1) {
        VehicleService.getVehicleBySlug(pageName).then((data) => {
          const viewedPage = {
            name: pageName,
            data
          };
          this.$store.dispatch("setViewedPages", viewedPage);
          this.vehicle = data;
        });
      } else {
        const page = this.vLodash.find(this.$store.state.viewedPages, (p) => p.name === pageName);
        this.vehicle = page.data;
      }
    },
    getColour: function(id) {
      var vm = this;
      vm.single_variant = vm.variant.filter((item) => item.id === id);
    },
    galleryTop: function() {
       var galleryTop = new Swiper('.gallery-thumbs', {
         spaceBetween: 10,
         loop:true,
         //autoHeight:true,
         preloadImages: false,
         lazy: true,
         autoplay: {
            delay: 3000,
         },
         pagination: {
           el: '.swiper-pagination',
           clickable: true,
           }
       });
       var galleryThumbs = new Swiper('.gallery-top', {
         spaceBetween: 10,
         slidesPerView: 1,
         slideToClickedSlide: true,
         loop: true,
         navigation: {
           nextEl: '.swiper-button-next',
           prevEl: '.swiper-button-prev',
         },
       });
       galleryTop.controller.control = galleryThumbs;
       galleryThumbs.controller.control = galleryTop;

       var galleryIconTop = new Swiper('.gallery-icon-bottom', {
         spaceBetween: 0,
         navigation: {
           nextEl: '.swiper-button-next',
           prevEl: '.swiper-button-prev',
         },
       });
       var galleryIconThumbs = new Swiper('.gallery-icon-thumbs', {
           spaceBetween: 0,
           slidesPerView: 4,
           centeredSlides: true,
           slideToClickedSlide: true,
           watchSlidesVisibility: true,
           watchSlidesProgress: true,
           breakpoints: {
               // when window width is >= 320px
               320: {
                 slidesPerView: 2,
                 spaceBetween: 20
               },
               // when window width is >= 480px
               480: {
                 slidesPerView: 3,
                 spaceBetween: 30
               },
               // when window width is >= 640px
               640: {
                 slidesPerView: 5,
                 spaceBetween: 10
               }
             }
       });
       galleryIconTop.controller.control = galleryIconThumbs;
       galleryIconThumbs.controller.control = galleryIconTop;
     },
  },
  destroyed() {
    document.body.classList.remove("vehicle-page");
  },
};
</script>
<style>
@import '/assets/css/swiper-bundle.min.css';
.new-id{
  display: none!important
}
.uk-tab.tab-vehicle::before {
    border-bottom: 2px solid transparent;
}
.uk-tab.tab-vehicle a {
    border-bottom: 2px solid #e7e7e7;
}
.uk-tab.tab-vehicle > .uk-active > a, .uk-tab.tab-vehicle a:hover {
    border-bottom: 2px solid #f01e1e;
}
.variant-colors-items li a, .variant-colors-items li div {
    width: 40px;
    height: 40px;
}
.variant-colors-items li.uk-active a::after {
  content: "";
  position: absolute;
  border: 2px solid #e9e9e9;
  border-top: 0;
  border-right: 0;
  width: 8px;
  height: 4px;
  transform: rotate(-55deg);
  -webkit-transform: rotate(-55deg);
  margin: -25px 0 0 17px;
  z-index: 1
}
.variant-colors-items li.uk-active div, .variant-colors-items li:hover a div, .vehicle-colors-items li.uk-active div, .vehicle-colors-items li:hover a div {
    transform: scale(1.1);
    box-shadow: inset 0 0 0 1px #d7d7d7;
}
.uk-switcher.vehicle-colors > :not(.uk-active) img.image-drag{
  display: none;
}

@media (min-width: 960px){
  .tab-wrap{
    margin-bottom: -70px;
  }
  .coluor-wrap{
    margin-top: -70px;
  }
}

.uk-gradient {
height: 50%;
background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent 68.91%)
}
.uk-height-xlarge{
  height: 600px;
}
@media (max-width: 960px) {
.uk-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent 68.91%);
  }
  .heading-btn{
    margin-top:30px
  }
}
.bounce {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 70%, 90% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

.variant-element{
  display: none!important
}


.swiper-container {
 width: 100%;

 margin-left: auto;
 margin-right: auto;
 overflow: hidden;
}
.swiper-slide {
 background-size: cover;
 background-position: center;
}
.gallery-thumbs {
 height: 50%;
 box-sizing: border-box;
 padding: 10px 0;
 overflow: hidden;
}
.gallery-thumbs .swiper-button-next, .gallery-thumbs .swiper-button-prev{
  top:auto;
  bottom:20px
}
.adme-slider__pagination {
text-align: center;
margin-top:30px;
}
.adme-slider__pagination .swiper-pagination-bullet {
display: inline-block;
opacity: .2;
margin: 0 5px;
border-radius: 20px;
transition: opacity .5s, background-color .5s, width .5s;
transition-delay: .5s, .5s, 0s;
}
.adme-slider__pagination .swiper-pagination-bullet-active {
opacity: 1;
background: #00aad2;
width: 100px;
transition-delay: 0s;
}

.gallery-icon-thumbs {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.gallery-icon-thumbs .swiper-slide {
  opacity: 0.4;
  -webkit-backface-visibility: hidden;
backface-visibility: hidden;
cursor: pointer;
opacity: .5;
text-align: center;
-webkit-transform: scale(.9);
transform: scale(.9);
-webkit-transform-style: preserve-3d;
transform-style: preserve-3d;
transition: opacity .3s,-webkit-transform .3s;
transition: opacity .3s,transform .3s;
transition: opacity .3s,transform .3s,-webkit-transform .3s;
width: 140px;
}

.gallery-icon-thumbs .swiper-slide-active {
  opacity: 1;
  -webkit-transform: scale(1);
transform: scale(1);
}
.gallery-icon-thumbs .swiper-slide:hover {
  -webkit-transform: scale(1);
transform: scale(1);
}

.icon-width-small{
  width: 41px
}
.icon-width-medium{
  width: 55px
}
.icon-sl-text-small{
  color:#000;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  margin:5px 0
}

.gallery-icon-thumbs .swiper-button-next:after, .gallery-icon-thumbs .swiper-button-prev:after {
      color: #222;
    font-size: 20px;
}

.icon-width-wrap {
  background: linear-gradient(4deg, rgba(255, 255, 255, 1) 15.25%, #eef1f4 15.30%, #eef1f4)!important;
  padding-bottom: 100px;
}
@media (min-width: 960px){
  .gallery-thumbs{
    left: -90px;
    position: relative;
    z-index: 3;
  }
  .height-viewport{
    height: 100vh;
    max-height: 1300px
  }
  .gallery-thumb-card{
    min-width: 400px
  }
}

</style>
