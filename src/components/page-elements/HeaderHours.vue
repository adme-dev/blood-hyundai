<template>
  <div>

        <!-- <ul class="uk-flex-center uk-tab" :data-uk-switcher="`connect: .${switchId}; swiping:false`">
          <li :class="{ 'uk-active' : activeTab === 'contact_form'}"><a class="uk-text-bold" href="#">Sales</a></li>
          <li :class="{'uk-active': activeTab === 'service_form'}"><a class="uk-text-bold" href="#">Service</a></li>
          <li :class="{'uk-active': activeTab === 'parts_form'}"><a class="uk-text-bold" href="#">Parts</a></li>
        </ul> -->

        <div class="uk-flex uk-flex-center uk-list uk-text-secondary uk-subnav-pill uk-grid-collapse uk-child-width-expand"><SlidingTabs
    v-model="activeTab"
    :tabs="tabs"
    :custom-class="['box', 'black']"
  /></div>

  <ul class="uk-grid-collapse uk-margin-small-top uk-grid">
          <li class="uk-width-1-1" v-show="activeTab === 0" :class="{'uk-active':activeTab === 'contact_form'}">
            <div class="uk-flex-center uk-text-center uk-text-bold">
              <p class="uk-h2">Sales Trading Hours</p>
            </div>
            <trading-hours :tradingHours="dealerInfo.tradingHours" />
          </li>
          <li class="uk-width-1-1" v-show="activeTab === 1" :class="{'uk-active':activeTab === 'service_form'}">
            <div class="uk-flex-center uk-text-center uk-text-bold">
              <p class="uk-h2">Service Trading Hours</p>
            </div>
            <trading-hours :tradingHours="dealerInfo.serviceHours" />
          </li>
          <li class="uk-width-1-1" v-show="activeTab === 2" :class="{'uk-active':activeTab === 'parts_form'}">
            <div class="uk-flex-center uk-text-center uk-text-bold">
              <p class="uk-h2">Parts Trading Hours</p>
            </div>
            <trading-hours :tradingHours="dealerInfo.partsHours" />
          </li>
        </ul>

  </div>
</template>
<script>
const TradingHours = () => import('@/components/page-elements/TradingHours')
import SlidingTabs from '@/components/SlidingTabs.vue'
export default {
  name: "header-hours",
  props: ["switchId"],
  components: { TradingHours, SlidingTabs },
  data() {
    return {
      page: null,
      siteName: this.$store.state.site.name,
      activeTab: 0,
      tabs: ['Sales', 'Service', 'Parts']
    };
  },
  // mounted() {
  //  UIkit.tab('#hoursTab').show(index);
  // },
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
  },
 
};
</script>
<style scoped>
.slider {
background-color: #01152d;
}
</style>