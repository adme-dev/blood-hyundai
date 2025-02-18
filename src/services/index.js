import Vue from "vue";
import VueGtag from "vue-gtag";
import VueFbCustomerChat from "vue-fb-customer-chat";
import App from "@/App.vue";
import router from "@/router";
import VueGtm from "vue-gtm";
import store from "@/store";
import axios from "axios";
import filter from "lodash/filter";
import forEach from "lodash/forEach";
import { addQueryStringToSelection } from "@/utils";
import { getStaticContent, getStaticJson } from "./static";
import VehicleService from "./vehicle";
import VariantService from "./variant";
import AccessoriesService from "./accessories";
import PageService from "./page";
import ModelService from "./model";
import BrandService from "./brand";
import StripeService from "./stripe";
import initialState from "@/config/initialState";
const initVue = (queryStringParams) => {
  getSiteConfig().then((siteConfig) => {
    initialState.site = siteConfig;
    /** Google Analytics */
    let config = {};
    let includes = [];
    const analytics = siteConfig.scripts.google.analytics;
    const filteranalytics = filter(analytics, (tag) => tag !== "");
    if (filteranalytics.length > 0) {
      forEach(filteranalytics, (value) => {
        if (Object.keys(config).length === 0) {
          config.config = { id: value };
        } else {
          includes.push({ id: value });
        }
      });
      if (includes.length > 0) config.includes = includes;

      if (config.config) {
        Vue.use(VueGtag, config, router);
      }
    }

    /** Google Tag Manager */

    if (siteConfig.scripts.google.gtm) {
      Vue.use(VueGtm, {
        id: siteConfig.scripts.google.gtm,
        defer: false,
        enabled: true,
        debug: false,
        loadScript: true,
        vueRouter: router,
        trackOnNextTick: false,
      });
    }

    /** Facebook Chat */
    // if (siteConfig.scripts.facebook.pageid) {
    //   Vue.use(VueFbCustomerChat, {
    //     page_id: siteConfig.scripts.facebook.pageid,
    //     theme_color: "#333333",
    //     locale: "en_US",
    //   });
    // }

    
    new Vue({
      router,
      store: store(initialState),
      render: (h) => h(App),
    }).$mount("#app");
  });
};

const getSearchFormData = () => {
  const unInterceptedAxios = axios.create();
  return unInterceptedAxios
    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/carsales/searchform.json`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting page by slug data", error);
    });
};
const getBusinessHours = () => {
  const unInterceptedAxios = axios.create();
  return unInterceptedAxios
    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/reviews/hours.json`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting business hours data", error);
    });
};
const getSiteConfig = () => {
  const unInterceptedAxios = axios.create();
  return unInterceptedAxios
    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/config/config.json`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting business hours data", error);
    });
};
export {
  initVue,
  getStaticContent,
  getStaticJson,
  getSearchFormData,
  getBusinessHours,
  VehicleService,
  VariantService,
  AccessoriesService,
  PageService,
  ModelService,
  BrandService,
  StripeService,
};
