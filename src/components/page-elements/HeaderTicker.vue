<template>
  <div
    v-if="tickers"
    class="uk-position-relative uk-slider uk-slider-container news-ticker-header"
    uk-slider="autoplay: true; autoplay-interval: 4000; pause-on-hover: false; clsActivated: uk-transition-active"
  >
    <ul class="uk-slider-items">
      <li
        v-for="(ticker, index) in tickers"
        :key="index"
        class="uk-width-1-1 uk-flex uk-active uk-transition-active"
        :class="[ticker.contrast]"
        :style="{ backgroundColor: ticker.background }"
      >
        <div
          class="uk-width-1-1 uk-flex uk-flex-middle uk-flex-center news-ticker"
          :class="[ticker.contrast]"
        >
          <div class="uk-padding-small">
            <router-link
              class="uk-transition-slide-fade uk-text-emphasis uk-link-reset uk-text-center news-ticker"
              :to="ticker.link"
              uk-icon="chevron-double-right"
            >
              <span uk-icon="icon: info"></span> {{ ticker.content }}
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { isDateInRange } from "@/utils";
export default {
  name: "header-tricker",
  computed: {
    tickers() {
      const tickers = this.$store.state.site.ticker;
      return tickers.filter((comp) => isDateInRange(comp.start, comp.end));
    },
  },
};
</script>
