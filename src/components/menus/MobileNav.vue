<template>
  <div id="siteDraw" uk-modal>
    <div class="uk-offcanvas-bar-animation uk-offcanvas-bar-light">
      <div class="uk-padding-small uk-grid-collapse uk-flex uk-flex-middle uk-grid">
        <div class="uk-width-auto">
          <img data-src="/assets/logos/logo-black-sm.svg" width="50" height="26" class="nav-logo" data-uk-img
            :alt="siteName" />
        </div>
        <div class="uk-width-expand uk-text-left uk-text-bold uk-text-emphasis uk-margin-small-left">
          <span class="uk-text-middle">{{ siteName }}</span>
        </div>
        <div>
          <a itemprop="telephone" :href="`tel:${phoneSales.replace(/[^A-Z0-9]+/gi, '')}`"
            class="forcelink uk-icon-link uk-margin-small-right uk-hidden@m" uk-icon="receiver"></a>
          <a :href="map_directions" target="_blank" rel="noreferrer"
            class="forcelink uk-icon-link uk-margin-small-right" uk-icon="location"></a>
        </div>
        <div>
          <a href="#" class="uk-margin-small-left" type="button" uk-toggle="target: #siteDraw">
            <svg width="35" height="35" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close">
              <path fill="none" stroke="#002c5f" stroke-width="1.5" d="M16,16 L4,4"></path>
              <path fill="none" stroke="#002c5f" stroke-width="1.5" d="M16,4 L4,16"></path>
            </svg>
          </a>
        </div>
      </div>

      <hr class="uk-margin-remove" />

      <ul class="uk-margin-medium-top" uk-accordion="toggle: > .toggle; targets: > .target">
        <li>
          <a class="uk-accordion-title nav-title uk-text-bold" href="#offcanvas-models" title="Explore models" uk-toggle
            @click="onMobileMenuClick">Explore models</a>
        </li>
        <li v-for="(item, index) in footer" :key="index" class="target">
          <a class="uk-accordion-title nav-title toggle uk-text-bold" href="#">{{ item.heading }}</a>
          <div class="uk-accordion-content nav-content">
            <ul class="uk-list uk-h4 uk-link-text uk-margin-small-left">
              <li v-if="index === 0">
                <a href="#global-search-modal" uk-toggle class="mb-link">Stock Search </a>
              </li>

              <li v-for="(item, index) in item.links" class="el-content uk-panel">

                <a v-if="isLinkExternal(item.url)" :href="item.url" class="mb-link" ref="nofollow" target="_blank"> {{
                  item.title }}</a>
                <router-link v-else :to="item.url" :title="item.title" @click.native="closeNav" class="mb-link">
                  {{ item.title }}
                </router-link>


              </li>
              <li class="uk-nav-divider"></li>
            </ul>
          </div>
        </li>

        <li class="target">
          <a class="uk-accordion-title nav-title toggle uk-text-bold" href="#">Trading hours</a>
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


      </ul>
      <div class="uk-child-width-1-1 uk-grid-small uk-padding-small uk-grid">
        <div class="uk-width-1-1 uk-margin-medium">
          <router-link to="/service" @click.native="closeNav"
            class="uk-button uk-button-primary uk-button-large uk-border-pill uk-width-1-1"
            style="font-size: 1.1rem">Book a Service</router-link>
        </div>


        <div class="uk-grid-small uk-child-width-auto uk-flex-middle uk-flex-center uk-grid" uk-grid="">
          <div class="uk-first-column">
            <a class="uk-text-bold uk-text-emphasis"
              :href="`tel:${phoneSales.replace(/[^A-Z0-9]+/gi, '')}`">{{ phoneSales }}</a>
          </div>
          <div>
            <ul class="uk-iconnav">
              <li v-for="(value, key) in social" :key="value">
                <a :href="value" target="_blank" :title="`${key}`" rel="noreferrer nofollow"
                  :uk-icon="`icon:${key}`"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
import saveVehicleMenuItem from "@/components/page-elements/saveVehicleMenuItem";
import TradingHours from "@/components/google-reviews/GoogleReviewsTrading.vue";
export default {
  name: "footer-links",
  data: function () {
    return {
      logo: this.$store.state.site.logo,
      phoneSales: this.$store.state.site.departments.sales.phone,
      siteName: this.$store.state.site.name,
      map_directions: this.$store.state.site.map_directions,
    };
  },
  components: {
    saveVehicleMenuItem,
    TradingHours
  },
  methods: {
    onMobileMenuClick() {
      if (Object.keys(this.$store.state.models).length < 1) {
        this.$store.dispatch("getModels");
      }
    },
    closeNav() {
      this.UIkit.modal("#siteDraw").hide();
    },
    isLinkExternal(link) {
      return link.includes('http')
    },
  },
  computed: {
    dealerInfo() {
      const tradingHours = this.$store.state.site.departments.sales.trading;
      const serviceHours = this.$store.state.site.departments.service.trading;
      const partsHours = this.$store.state.site.departments.parts.trading;
      return {
        tradingHours,
        serviceHours,
        partsHours,
      };
    },
    social() {
      return this.$store.state.site.social;
    },
    footer() {
      return this.$store.state.site.sitelinks.footer;
    },
    vehicles() {
      return this.$store.state.models;
    },
  },
};
</script>
