<template>
  <div>
    <header-ticker />

    <div v-if="isVisible" class="uk-position-relative">
      <header><primary-nav-default /></header>
    </div>

    <div v-else class="uk-position-relative">
      <div>
        <header><primary-nav-default /></header>
      </div>
    </div>

    <main class="uk-flex">
      <div class="uk-width-1-1 main-body">
        <router-view></router-view>
      </div>
    </main>

    <footer>
      <page-footer />
      <vehicle-models></vehicle-models>
      <global-search></global-search>
      <MobileNav />
    </footer>

    <PageQuickLinks />
    <call-quick-links />
  </div>
</template>
<script>
const PrimaryNav = () => import('@/components/menus/PrimaryNav')
const PrimaryNavDefault = () => import('@/components/menus/PrimaryNavDefault')
const HeaderTicker = () => import('@/components/page-elements/HeaderTicker')
const GlobalSearch = () => import('@/components/modals/GlobalSearch')
const MobileNav = () => import('@/components/menus/MobileNavNew')
const CallQuickLinks = () => import('@/components/page-elements/CallQuickLinks')
//const VehicleModels = () => import('@/components/models/models')
const VehicleModels = () => import(/* webpackPrefetch: true */ '@/components/models/models');
//const PageFooter = () => import('@/components/page-elements/PageFooter')
const PageFooter = () => import(/* webpackPrefetch: true */ '@/components/page-elements/PageFooter');
const PageQuickLinks = () => import('@/components/page-elements/PageQuickLinks')
const showPrimaryNavRoutes = [
  'car-sales',
  'vehicle-for-sale',
  'variant-enquire',
  'special-offers',
  'build',
  'special-offer',
  'open-pay',
  'compare-saves',
];
export default {
  name: "layout-default",
  components: {
    PrimaryNav,
    PrimaryNavDefault,
    PageFooter,
    PageQuickLinks,
    VehicleModels,
    GlobalSearch,
    MobileNav,
    HeaderTicker,
    CallQuickLinks
  },
  computed: {
    isVisible() {
      return showPrimaryNavRoutes.includes(this.$route.name);
    },
  },
};
</script>
<style lang="scss" scoped>
.mobile-nav .uk-navbar-dropdown-dropbar.uk-open {
  width: 100%;
  height: 100vh;
  left: 0 !important;
}
</style>
