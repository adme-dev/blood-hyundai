<template>
  <div class="uk-background-default">
    <el-drawer :title="siteName" :visible.sync="drawerVisible" :direction="direction" @close="handleClose"
      class="mobile-draw">
      <div>
        <ul class="uk-padding-small uk-overflow-hidden  uk-margin-large-bottom" uk-accordion="toggle: > .toggle; targets: > .target">
          <li>
            <div class="uk-padding-small uk-padding-remove-top">
              <searchQueryText :close="true" />

              <a href="https://consumer.xtime.net.au/scheduling/?&webKey=ahy20140925h3222v&bx=470928&VARIANT=HYUNDAIAUSTRALIA&WMODE=true&bx1=470928#/" @click.native="closeNav"
                class="uk-button uk-button-secondary uk-button-large uk-border-rounded uk-width-1-1 uk-margin-medium-top pulse-button"
                target="_blank"
                style="font-size: 1.1rem">Book a Service</a>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title nav-title uk-text-bold" href="#" @click="showModal(0), closeNav()">Stock
              Search <span class="uk-float-right" uk-icon="arrow-right"></span>
            </a>
          </li>
          <li>
            <a class="uk-accordion-title nav-title uk-text-bold" href="#offcanvas-models" @click="closeNav()"
              uk-toggle>Models <span class="uk-float-right" uk-icon="arrow-right"></span></a>
          </li>
          <li v-for="(item, index) in footer" :key="index" class="target">
            <a class="uk-accordion-title nav-title toggle uk-text-bold" href="#">
              {{ item.heading }}
              <span class="uk-float-right" uk-icon="arrow-right"></span>
            </a>
            <div class="uk-accordion-content nav-content">
              <ul class="uk-list uk-h4 uk-link-text uk-margin-small-left">
                <li v-if="index === 0">
                  <a href="#" @click="showModal(0), closeNav()" class="mb-link">Stock Search </a>
                </li>
                <li v-for="(item, index) in item.links" class="el-content uk-panel">
                  <a v-if="isLinkExternal(item.url)" :href="item.url" class="mb-link" ref="nofollow" target="_blank">
                    {{ item.title }}
                  </a>
                  <router-link v-else :to="item.url" :title="item.title" @click.native="closeNav" class="mb-link">
                    {{ item.title }}
                  </router-link>
                </li>
                <li class="uk-nav-divider"></li>
              </ul>
            </div>
          </li>
          <li class="target">
            <a class="uk-accordion-title nav-title toggle uk-text-bold" href="#">Trading Hours <span
                class="uk-float-right" uk-icon="arrow-right"></span></a>
            <div class="uk-accordion-content nav-content">
              <ul class="uk-list uk-padding-small">
                <li>
                  <div class="uk-text-large">Sales</div>
                  <trading-hours :tradingHours="dealerInfo.tradingHours" />
                </li>
                <li>
                  <hr>
                  <div class="uk-text-large">Service</div>
                  <trading-hours :tradingHours="dealerInfo.serviceHours" />
                </li>
                <li>
                  <hr>
                  <div class="uk-text-large">Parts</div>
                  <trading-hours :tradingHours="dealerInfo.partsHours" />
                </li>
              </ul>
            </div>
          </li>
          <li class="target">
            <a class="uk-accordion-title nav-title toggle uk-text-bold" href="#">Saved Vehicles <span
                class="uk-float-right" uk-icon="arrow-right"></span></a>
            <div class="uk-accordion-content nav-content" @click="closeNav()">
              <SavedList />
            </div>
          </li>
          <li class="target">
            <a class="uk-accordion-title nav-title toggle uk-text-bold" href="#">Recently Seen <span
                class="uk-float-right" uk-icon="arrow-right"></span></a>
            <div class="uk-accordion-content nav-content" @click="closeNav()">
              <RecentlySeenSlider />
            </div>
          </li>
          <li class="uk-nav-divider"></li>
          <li>       <div v-if="social"
          class="uk-child-width-auto uk-grid-small uk-flex-inline uk-margin-small-top uk-margin-small-left uk-grid"
          uk-grid>
          <div v-for="(value, key) in social" :key="value">
            <a class="el-link uk-icon-button uk-icon" target="_blank" rel="noreferrer" :href="value"
              :uk-icon="`icon:${key}`"></a>
          </div>
        </div></li>
          <li>
            <div>
              <div class="uk-text-bold nav-title text-red">Showroom:</div>
              <div class="uk-accordion-content nav-content">
                <div class="uk-margin-small-left">
                  <p>{{ showroom_address }}</p>
                  <a itemprop="telephone" :href="`tel:${phoneSales.replace(/[^A-Z0-9]+/gi, '')}`"
                    class="desktop-phone-link forcelink">
                    <span class="uk-link-heading uk-text-secondary">Sales: <b>{{ phoneSales }}</b></span>
                  </a>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div>
              <div class="uk-text-bold nav-title text-red">Service / Parts:</div>
              <div class="uk-accordion-content nav-content">
                <div class="uk-margin-small-left">
                  <p>{{ service_address }}</p>
                  <a itemprop="telephone" :href="`tel:${phoneService.replace(/[^A-Z0-9]+/gi, '')}`"
                    class="desktop-phone-link forcelink">
                    <span class="uk-link-heading uk-text-secondary">Service / Parts: <b>{{ phoneService }}</b></span>
                  </a>
                </div>
              </div>

            </div>
          </li>
        </ul>
 
        <div class="uk-background-secondary uk-light">
                  <div class="uk-child-width-auto uk-grid-small uk-flex-inline uk-padding uk-grid">


                    <div v-if="places.result" class="uk-width-1-1 uk-position-relative">
                    <div class="google-badge-score" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
                      <svg class="uk-float-left" viewBox="0 0 512 512" height="60" width="60">
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z"
                            fill="#4285f4"
                          ></path>
                          <path
                            d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z"
                            fill="#34a853"
                          ></path>
                          <path
                            d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z"
                            fill="#fbbc05"
                          ></path>
                          <path
                            d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z"
                            fill="#ea4335"
                          ></path>
                          <path d="M20 20h472v472H20V20z"></path>
                        </g>
                      </svg>

                      <div class="uk-margin-large-left" style="top:12px">
                        <div>Google Rating</div>
                        <div class="uk-width-1-1 reviews-based">
                          <span itemprop="ratingValue" class="rating-text uk-margin uk-width-1-1">
                            {{ places.result.rating }}
                          </span>
                          <div class="stars-outer">
                            <div class="stars-inner" :style="{ width: (places.result.rating / 5) * 100 + '%' }">
                              {{ places.result.rating }}
                            </div>
                          </div>
                        </div>
                        <div class="reviews-based">Based on {{ places.result.user_ratings_total }} reviews</div>
                      </div>
                    </div>

                    <a
                      :href="'https://search.google.com/local/writereview?placeid=' + places.result.place_id + ''"
                      target="_blank"
                      rel="noreferrer"
                      class="
                        uk-width-auto uk-button uk-button-text uk-border-rounded
                        uk-icon
                        uk-text-left
                        uk-margin-small-top
                        uk-text-capitalize
                      "
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path
                          d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"
                        />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                      <b> We’d love to hear your feedback!</b>
                    </a>

                  </div>



                  </div>
                </div>

      </div>
    </el-drawer>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import { EventBus } from '@/utils/eventBus';
const TradingHours = () => import('@/components/google-reviews/GoogleReviewsTrading');
const searchQueryText = () => import('@/components/search/CarSales/searchQueryTextMobileNav');
const SavedList = () => import('@/components/search/CarSales/SavedList');
const RecentlySeenSlider = () => import('@/components/search/CarSales/RecentlySeenSlider');

import { Drawer, Button } from "element-ui";
Vue.use(Drawer);
Vue.use(Button);

export default {
  name: "mobile-links",
  data() {
    return {
      drawer: false,
      drawerVisible: false,
      direction: 'btt',
    };
  },
  created() {
    EventBus.$on('toggleDrawer', this.toggleDrawer);
  },
  components: {
    TradingHours,
    searchQueryText,
    SavedList,
    RecentlySeenSlider
  },
  methods: {
    toggleDrawer(visible) {
      this.drawerVisible = visible;
    },
    handleClose() {
      this.drawerVisible = false;
      EventBus.$emit('toggleDrawer', false);
    },
    showModal(index) {
      this.$store.dispatch("globalSearchSwitch", {
        show: true,
        tab: index
      });
    },
    isLinkExternal(link) {
      return link.includes("http");
    },
    closeNav() {
      this.drawerVisible = false;
      EventBus.$emit('toggleDrawer', false);
    },
  },
  computed: {
    ...mapState({
      logo: state => state.site.logo,
      phoneSales: state => state.site.departments.sales.phone,
      phoneService: state => state.site.departments.service.phone,
      siteName: state => state.site.name,
      map_directions: state => state.site.map_directions,
      showroom_address: state => state.site.showroom_address,
      service_address: state => state.site.departments.service.address,
      dealerInfo: state => ({
        tradingHours: state.site.departments.sales.trading,
        serviceHours: state.site.departments.service.trading,
        partsHours: state.site.departments.parts.trading,
      }),
      social: state => state.site.social,
      footer: state => state.site.sitelinks.footer,
      vehicles: state => state.models,
      places: state => state.getGoogleReviews.googlereviews,
    }),
  },
  beforeDestroy() {
    EventBus.$off('toggleDrawer', this.toggleDrawer);
  },
};
</script>
<style>

.el-drawer__wrapper .uk-accordion-title, .mobile-draw .uk-accordion-content a.mb-link {
font-size: 1.85rem;
line-height: 1.2;
} 
.el-drawer__wrapper {
  background-color: rgb(0 0 0 / 73%)
}

.el-drawer__open .el-drawer.btt {
  height: 94vh !important;
}

.el-drawer__wrapper .uk-accordion-title {
  color: #000;
}

.el-drawer__container {
  height: 97vh;
}

.el-drawer.btt {
  animation: btt-drawer-out .3s;
  bottom: -40px;
}

.el-drawer {
  position: absolute;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
  overflow: hidden;
  outline: 0;
  border-radius: 10px;
}

.el-drawer__header {
  color: #000;
  font-size: 24px;
}

.mobile-draw .uk-accordion> :nth-child(n+2) {
  margin-top: 30px;
}

.mobile-draw .uk-accordion-title::before {
  display: none;
  background-image: none;
}

.mobile-draw .uk-icon svg {
  width: 30px;
}

.mobile-draw .uk-accordion-content {
  margin: 20px -50px 0 -50px;
}

.mobile-draw .nav-content {
  padding: 20px 60px;
}

.mobile-draw .uk-accordion-content a.mb-link {
  display: block;
  padding: 5px 0;
}

.target.uk-open .uk-accordion-title {
  color: #c00;
}

.target.uk-open .uk-icon {
  color: #c00;
  transform: rotate(90deg);
}

/* Pulse animation for Book a Service button */
.pulse-button {
  animation: pulse-animation 2s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
}

@keyframes pulse-animation {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
  }
}

.pulse-button:hover {
  animation: none;
  transform: scale(1.05);
  background-color: #b91c1c !important;
  border-color: #b91c1c !important;
}

@media (min-width: 1200px) {
  .el-drawer.btt {
    width: 50%;
    max-width: 600px;
  }

  .el-drawer {
    margin: 20px;
  }

  .el-drawer.btt {
    width: 93% !important;
    right: 0;
    left: auto;
    bottom: -20px;
  }
}
</style>
