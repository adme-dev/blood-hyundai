<template>
  <div class="uk-position-relative data-465763-navigation data-nav pn"
    :class="{ 'dropdown-show background-white': isHoveringNav }">
    <div class="linear-activity" v-show="loading">
      <div class="indeterminate"></div>
    </div>

    <div class="uk-navbar-container uk-visible@m uk-navbar-transparent tm-toolbar-container tm-toolbar-gradient"
      :class="[isHoveringNav ? '' : 'uk-light']">
      <div class="uk-container uk-container-large uk-navbar" uk-navbar>
        <div class="uk-navbar-left">
          <nav>
            <ul class="uk-navbar-nav">
              <li>
                <a itemprop="telephone" :href="`tel:${phoneSales.replace(/[^A-Z0-9]+/gi, '')}`" class="forcelink">
                  <span class="uk-margin-xsmall-right uk-icon" uk-icon="icon: receiver; ratio: .75;"></span>
                  <span class="uk-button uk-button-text">Sales: <b>{{ phoneSales }}</b></span>
                </a>
              </li>
              <li>
                <a itemprop="telephone" :href="`tel:${phoneService.replace(/[^A-Z0-9]+/gi, '')}`" class="forcelink">
                  <span class="uk-margin-xsmall-right uk-icon" uk-icon="icon: receiver; ratio: .75;"></span>
                  <span class="uk-button uk-button-text">Service / Parts: <b>{{ phoneService }}</b></span>
                </a>
              </li>
              <li>
                <div class="uk-navbar-item uk-visible@l">
                  <a href="/contact" class="uk-link-reset">
                    <span uk-icon="icon: clock; ratio: .75;" class="uk-icon uk-margin-small-right"></span>
                    <span class="uk-button uk-button-text">Open Hours</span>
                  </a>

                  <div class="uk-background-secondary"
                    uk-dropdown="pos:bottom-center; animation: uk-animation-slide-top-small; duration: 0; offset:0">
                    <div class="uk-width-large uk-light">
                      <HeaderHours switchId="nav-hours" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div class="uk-navbar-right">
          <nav>
            <ul class="uk-navbar-nav">
              <li>
                <router-link to="/service" title="Vehicle servicing"><b class="uk-button uk-button-text">Book a
                    Service</b></router-link>
              </li>
                          <li>
                <router-link to="/fleet" title="Hyundai Fleet"><b class="uk-button uk-button-text">
                    Fleet</b></router-link>
              </li>
              <li>
                <router-link to="/contact" title="Contact us"><b
                    class="uk-button uk-button-text">Contact</b></router-link>
              </li>
              <li>
                <router-link to="/sell-my-car" title="Sell My Car"><b class="uk-button uk-button-text">Sell My
                    Car</b></router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div uk-sticky="top:800" show-on-up animation="uk-animation-slide-top"
      cls-active="uk-navbar-sticky uk-background-default" cls-inactive="lite-nav" sel-target=".nav-main"
      class="nav-main uk-navbar-transparent uk-navbar-container uk-background-default uk-sticky uk-sticky-below uk-sticky-fixed uk-box-shadow-small"
      style="z-index: 9999">

      <div id="main-navbar" class="main-navbar" @mouseover="isHoveringNav = true" @mouseleave="isHoveringNav = false">
        <nav class="uk-navbar uk-container uk-container-large"
          uk-navbar="dropbar: true; dropbar-anchor: !.uk-navbar-container; target-y: !.uk-navbar-container">
          <div class="uk-navbar-left navbar-logo">
            <ul class="uk-navbar-nav">
              <li class="hd-nv-tle">
                <router-link :to="'/'" rel="home">
                 
                </router-link>
              </li>
              <li>
                <router-link :to="'/'" rel="home">
                  <img src="/assets/logos/logo-white.svg" width="160" height="22"
                    class="nav-logo logo-white uk-visible@m" loading="eager" :alt="siteName" />
                  <img data-src="/assets/logos/logo-black.svg" width="160" height="22"
                    class="nav-logo logo-black uk-visible@m" data-uk-img :alt="siteName" />
                  <img data-src="/assets/logos/logo-white-sm.svg" width="50" height="26"
                    class="nav-logo logo-white-md uk-hidden@m" data-uk-img :alt="siteName" />
                  <img data-src="/assets/logos/logo-black-sm.svg" width="50" height="26"
                    class="nav-logo logo-black-md uk-hidden@m" data-uk-img :alt="siteName" />
                </router-link>
              </li>
              <li class="uk-hidden@m">
                <router-link :to="'/'"
                  class="site-name uk-text-emphasis uk-text-bolder uk-text-left uk-text-capitalize uk-padding-remove">{{
      siteName
    }}</router-link>
              </li>
            </ul>
          </div>
          <div class="uk-navbar-left uk-margin-medium-left uk-visible@l">
            <ul class="uk-navbar-nav">
              <li class="nav-li mega-nav mega-models">
                <a class="uk-text-emphasis uk-text-bold uk-text-capitalize uk-padding-remove-right" title="model"
                  href="#">
                  <span>
                    <div class="hover-element">Models <span uk-icon="icon: chevron-down" class="chevron-down"></span>
                    </div>
                    <div class="hover-element">Models <span uk-icon="icon: chevron-down"
                        class="chevron-down chevron"></span></div>
                  </span>
                </a>
                <div id="vehicle-nav-dropdown"
                  class="vehicle-nav-dropdown uk-width-1-1 uk-navbar-dropdown uk-padding-remove"
                  uk-drop="boundary: !.nav-main; stretch: x; flip: false">

                  <Models />

                </div>
              </li>
              <li v-for="(item, index) in menu" :key="index" class="nav-li"
                :class="`${item.submenu.rendered ? 'mega-nav' : ''}`">
                <router-link :to="item.url" class="uk-text-emphasis uk-text-bold uk-text-capitalize"
                  :class="`${item.submenu.rendered ? 'uk-padding-remove-right' : ''}`">
                  <span>
                    <div class="hover-element">
                      {{ item.name }}
                      <span v-if="item.submenu.rendered" uk-icon="icon: chevron-down" class="chevron-down"></span>
                    </div>
                    <div class="hover-element">
                      {{ item.name }}
                      <span v-if="item.submenu.rendered" uk-icon="icon: chevron-down"
                        class="chevron-down chevron"></span>
                    </div>
                  </span>
                </router-link>
                <div v-if="item.submenu.rendered" class="main-nav-dropdown uk-navbar-dropdown"
                  uk-drop="stretch: x; target: !.nav-main">
                  <div class="navbar-dropdown-content beacon-nav uk-container uk-container-large"
                    v-html="item.submenu.rendered"></div>
                </div>
              </li>

            </ul>
          </div>
          <div class="uk-navbar-right navbar-right link-nav navbar-right-visible uk-visible@l">
            <ul class="uk-navbar-nav navbar-address link-nav">
              <li>
                <a class="el-link uk-text-left uk-text-emphasis uk-text-capitalize" :href="map_directions"
                  target="_blank" title="Directions">
                  <div>
                    <div class="site-name uk-text-bold uk-h4 uk-margin-remove">
                      {{ siteName }}
                    </div>
                    <div class="site-name uk-text-capitalize uk-text-xsmall">
                      {{ address }}
                    </div>
                    <GoogleReviewHeader />
                  </div>
                </a>
              </li>

              <li class="uk-text-center navbar-gradient">
                <a class="uk-navbar-toggle navbar-toggler sitedraw" href="#" title="More" @click.prevent="openDrawer">
                  <div>
                    <div class="menu-icon-wrapper">
                      <div class="menu-icon"></div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="uk-navbar-right navbar-gradient uk-hidden@l">
            <ul class="uk-navbar-nav">
              <li class="uk-text-center">
                <a href="#google_review" class="icon-time" title="Trading Hours">
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"></circle>
                    <rect x="9" y="4" width="1.2" height="7"></rect>
                    <path fill="none" stroke="#000" stroke-width="1.2" d="M13.018,14.197 L9.445,10.625"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a :href="map_directions" target="_blank" rel="noreferrer"
                  class="uk-icon-link uk-padding-small forcelink" uk-icon="location"></a>
              </li>
              <li class="uk-hidden">
                <router-link to="/contact" class="uk-icon-link uk-padding-small forcelink" uk-icon="mail"></router-link>
              </li>
              <li>
                <div class="uk-flex uk-flex-middle uk-height-1-1">
                  <a href="#modal-call" uk-toggle class="icon-phone uk-icon-button forcelink" title="Phone"><svg
                      width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="receiver">
                      <path fill="#000" stroke="#000" stroke-width="1.01"
                        d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611">
                      </path>
                    </svg></a>
                </div>
              </li>
              <li class="uk-text-center uk-margin-small-left">
                <a class="sitedraw" href="#" @click.prevent="openDrawer" title="More">
                  <div>
                    <div class="menu-icon-wrapper">
                      <div class="menu-icon"></div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="mb-toolbar-gradient uk-hidden@m"></div>
    <div class="headernavbg uk-visible@m"></div>

  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus';
const HeaderHours = () => import('@/components/page-elements/HeaderHours')
const Models = () => import('@/components/models/navModels')
const GoogleReviewHeader = () => import(/* webpackPrefetch: true */ "@/components/google-reviews/GoogleReviewHeader");
export default {
  name: "primary-nav",
  components: { HeaderHours, Models, GoogleReviewHeader },
  data: function () {
    return {
      logo: this.$store.state.site.logo,
      phoneSales: this.$store.state.site.departments.sales.phone,
      phoneService: this.$store.state.site.departments.service.phone,
      siteName: this.$store.state.site.name,
      address: this.$store.state.site.showroom_address,
      map_directions: this.$store.state.site.map_directions,
      hover: false,
      isHoveringNav: false
    };
  },
  mounted: function () {
    this.menuDropdown();
  },
  beforeDestroy() {
    document.body.classList.remove("nav-transparent");
  },
  methods: {
    menuDropdown() {
      this.UIkit.util.on("#vehicle-nav-dropdown", "show", function () {
        document.body.classList.add("uk-overflow-hidden");
      });
      this.UIkit.util.on("#vehicle-nav-dropdown", "hide", function () {
        document.body.classList.remove("uk-overflow-hidden");
      });
    },
    hover_unlock() {
      //document.body.classList.remove("uk-overflow-hidden");
    },
    hover_lock() {
      //document.body.classList.add("uk-overflow-hidden");
    },
    // menuDropdown() {
    //   this.UIkit.util.on(".uk-navbar-dropdown", "show", function () {
    //     document.body.classList.add("dropdown-show");
    //   });
    //   this.UIkit.util.on(".uk-navbar-dropdown", "beforehide", function () {
    //     document.body.classList.remove("dropdown-show");
    //   });
    // },
    openDrawer() {
      EventBus.$emit('toggleDrawer', true);
    },
  },
  computed: {
    savedItemslocalStorage: function () {
      return this.$store.state.savedVehicles;
    },
    menu() {
      return this.$store.state.site.sitelinks.mainnav;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
<style scoped>
.uk-navbar-dropdown {
  --uk-position-offset: 0;
  --uk-position-shift-offset: 0;
  --uk-position-viewport-offset: 0;
}

.tm-toolbar-container>li>a,
.tm-toolbar-container .uk-navbar-nav>li>a,
.tm-toolbar-container .uk-navbar-item {
  text-transform: none;
  height: 40px;
  min-height: 40px;
}

.uk-margin-xsmall-right {
  margin-right: 5px !important;
}

.nav-main .site-name {
  color: #001E50
}

.nav-main .hover-element {
  color: #000
}



.nav-main.lite-nav .hover-element {
  color: #fff;
}

.nav-main.lite-nav .site-name {
  color: #fff !important;
}

.uk-logo {
  transition: margin .2s ease-in-out, width .2s ease-in-out;
}

.nav-main.lite-nav .header-logo path {
  fill: #fff;
}

.header-logo path {
  fill: #001E50;
}

.nav-main.lite-nav .icon-phone path,
.nav-main.lite-nav .icon-time path,
.nav-main.lite-nav .icon-time circle,
.nav-main.lite-nav .icon-time rect {
  stroke: #fff;
}

.data-nav.dropdown-show .navbar-address .site-name,
.data-nav.dropdown-show .nav-main.lite-nav .hover-element,
.background-white .nav-main.lite-nav .hdr-ste-nme {
  color: #001E50 !important;
}

.background-white .main-navbar .icon-phone path {
  fill: #001E50 !important;
}

.nav-main.uk-background-default .logo-black,
.nav-main.uk-background-default .logo-black-md,
.dropdown-show.background-white .logo-black {
  display: block;
}

.nav-main.uk-background-default .logo-white,
.nav-main .logo-black,
.nav-main.uk-background-default .logo-white-md,
.nav-main .logo-black-md,
.dropdown-show.background-white .logo-white {
  display: none;
}

.background-white {
  background: #fff;
}

@media (min-width: 960px) {

  .background-white .nav-main.lite-nav .menu-icon,
  .background-white .nav-main.lite-nav .menu-icon:after,
  .background-white .nav-main.lite-nav .menu-icon:before {
    background: #001E50
  }
}

@media (max-width: 960px) {
  header .data-465763-navigation {
    background: transparent !important;
  }
}

@media (max-width: 1440px) {
  .nav-li a>span .hover-element {
    font-size: 1vw;
  }

  .navbar-right-visible .uk-h4 {
    font-size: 1.0rem;
  }
}

@media (max-width: 1290px) {
  .hd-nv-tle {
    display: none;
  }
}

.dropdown-show.background-white .tm-toolbar-gradient:after {
  display: none;
}

.dropdown-show.background-white .headernavbg {
  top: 60px
}

.dropdown-show.background-white .tm-toolbar-gradient {
  border-bottom: 1px solid #8d8d8db3
}

.vehicle-nav-dropdown {
  top: auto !important;
  --uk-position-offset: 0;
  --uk-position-shift-offset: 0;
  --uk-position-viewport-offset: 0;
  width: 100%;
}

.hdr-ste-nme {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

/* #vehicle-nav-dropdown{
  max-width: 100vw!important;
  width: 100vw!important;
} */
/* .nav-logo {
width: 120px;
top: 20px;
left: 0px;
position: absolute;
} */
</style>
