import axios from 'axios';
import router from '@/router' // Adjust path as needed

// Private helper function - defined at the top of the file
const handleUrlUpdate = (show, item) => {
  const params = new URLSearchParams(window.location.search);
  
  if (show && item?.stockid) {
    params.set('stock', item.stockid);
  } else {
    params.delete('stock');
  }

  const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  
  try {
    if (show && item) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    } else {
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  } catch (error) {
    console.error('Error updating URL:', error);
  }
};

import {
  VehicleService,
  VariantService,
  AccessoriesService,
  PageService,
  ModelService,
  BrandService,
} from "@/services";
import findIndex from "lodash/findIndex";
import { Notification } from "element-ui";
export default {
  setLoading({ commit }, value) {
    commit("SET_LOADING", value);
  },

    /**
   * Reset scroll position and related state
   */
    resetScrollPosition({ commit }) {
      commit('RESET_SCROLL_POSITION');
    },
  
    setScrollPosition({ commit }, position) {
      commit('SET_SCROLL_POSITION', position);
    },
  

  resultsSearchSwitch({commit}, value){
    commit("RESULTS_SEARCH_SWITCH", value)
  },

  globalSearchSwitch({commit}, value){
    commit("GLOBAL_SEARCH_SWITCH", value)
  },

  toggleSavesList({ commit }, value) {
    commit('SET_SAVES_LIST_VISIBILITY', value);
  },

  vehicleEnquiryGallery({commit}, value){
    commit("VEHICLE_ENQUIRY_GALLERY", value)
  },

  vehicleEnquiryPopUp({commit}, value){
    commit("VEHICLE_ENQUIRY_POP_UP", value)
  },
  
  changeSortingDirection(context, dir) {
    context.commit("SORT_BY_DIRECTION_CHANGED", true);
    context.commit("CHANGE_SORTING_DIRECTION", dir);
  },

  changeSortingBy(context, value) {
    context.commit("SORT_BY_CHANGED", true);
    context.commit("CHANGE_SORING_BY", value);
  },
  setCurrentPage(context, page) {
    context.commit("SET_CURRENT_PAGE", page);
  },
  setViewedPages({ state, commit }, page) {
    const { viewedPages } = state;
    const isPageExists = findIndex(viewedPages, (p) => p.name === page.name);
    if (isPageExists === -1) {
      viewedPages.push(page);
      commit("SET_VIEWED_PAGES", viewedPages);
    }
  },
  setPageSize(context, size) {
    context.commit("SET_PAGE_SIZE", size);
  },
  select(context, payload) {
    context.commit("SELECT", payload);
  },

  deselect(context, payload) {
    context.commit("DESELECT", payload);
  },

  deselectOnMultiple(context, payload) {
    context.commit("DESELECT_ON_MULTIPLE", payload);
  },

  setSelectedFromQueryParams(context, payload) {
    context.commit("SET_SELECTED_FROM_QUERY_PARAMS", payload);
  },

  getModels({ commit, dispatch }) {
    dispatch("setLoading", true);
    ModelService.getModels().then((data) => {
      commit("SET_MODELS", data);
      dispatch("setLoading", false);
    });
  },
  getBrand({ commit, dispatch }) {
    dispatch("setLoading", true);
    BrandService.getBrand().then((data) => {
      commit("SET_BRAND", data);
      dispatch("setLoading", false);
    });
  },


  // Add this new action to initialize from URL
  async initializeFromUrl({ dispatch, state }) {
    const params = new URLSearchParams(window.location.search);
    const stockId = params.get('stock');
    
    if (stockId) {
      // Wait for data to load if it hasn't already
      if (!state.isDataLoaded) {
        await dispatch('fetchInitialData');
      }
      
      // Find the vehicle with matching stock ID
      const vehicle = state.vehicles.find(v => v.stockid.toString() === stockId.toString());
      
      if (vehicle) {
        dispatch('vehicleEnquiryPopUp', { 
          show: true, 
          item: vehicle 
        });
      }
    }
  },

  // Your existing actions...
  vehicleEnquiryPopUp({ commit }, { show, item }) {
    handleUrlUpdate(show, item);
    commit('VEHICLE_ENQUIRY_POP_UP', { show, item });
  },

  saveSearchState({ commit }, searchState) {
    commit('SET_SEARCH_STATE', searchState);
  },

async fetchInitialData({ commit, state }) {
  if (state.isDataLoaded) {
    return; // Skip if data is already loaded
  }
  //const lambdaUrl = '/.netlify/functions/carsales-feed';
  //const lambdaUrl = '/assets/carsales-feed.json';
  const lambdaUrl = '/carsales-feed';
  commit("setLoading", true);

  try {
    const response = await axios.get(lambdaUrl);
    const { vehiclesData, filters } = response.data;

    commit('SET_VEHICLES', vehiclesData);
    commit('SET_FILTERS', filters);
    commit('SET_DATA_LOADED', true); // Indicate that data is loaded
  } catch (error) {
    console.error('Error:', error);
  } finally {
    commit("setLoading", false);
  }
},

  // New action to toggle saved state
  toggleSavedVehicle({ state, dispatch }, payload) {
    const savedVehicles = state.savedVehicles || [];
    const vehicleIndex = findIndex(savedVehicles, (id) => id == payload.id);

    if (vehicleIndex !== -1) {
      dispatch('removeFromSavedVehicles', payload);
    } else {
      dispatch('addToSavedVehicles', payload);
    }
  },

  getVehicles({ commit, dispatch }) {
    dispatch("setLoading", true);
    return VehicleService.getVehicles().then((data) => {
      commit("SET_VEHICLES", data);
      dispatch("setLoading", false);
    });
  },
  getVehicleBySlug({ dispatch, commit }, payload) {
    dispatch("setLoading", true);
    VehicleService.getVehicleBySlug(payload).then((data) => {
      commit("SET_VEHICLE", data);
      dispatch("setLoading", false);
    });
  },

  getVariantBySlug({ commit, dispatch }, payload) {
    VariantService.getVariantBySlug(payload).then((data) => {
      commit("SET_VARIANT", data);
    });
  },
  getVariantByModel({ commit, dispatch }, payload) {
    dispatch("setLoading", true);
    VariantService.getVariantByModel(payload).then((data) => {
      commit("SET_VARIANT_MODEL", data);
      dispatch("setLoading", false);
    });
  },
  getAccessoriesByModel({ commit, dispatch }, payload) {
    dispatch("setLoading", true);
    AccessoriesService.getAccessoriesByModel(payload).then((data) => {
      dispatch("setLoading", false);
      return data;
    });
  },

  getPageBySlug({ dispatch, commit }, payload) {
    dispatch("setLoading", true);
    PageService.getPageBySlug(payload).then((data) => {
      commit("SET_PAGE", data);
      dispatch("setLoading", false);
    });
  },

  setRecentlyViewed({ state, commit }, payload) {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (recentlyViewed.indexOf(payload) === -1) {
      recentlyViewed.unshift(payload);
      if (recentlyViewed.length > 10) recentlyViewed.length = 10;
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }

    commit("SET_RECENTLY_VIEWED", recentlyViewed);
  },
  addToSavedVehicles({ state, commit }, payload) {
    //console.log(payload);
    const savedVehicles = state.savedVehicles || [];
    const vehicleIndex = findIndex(savedVehicles, (id) => id == payload.id);

    //console.log("payload", vehicleIndex);
    const notifyOptions = {
      title: `${payload.make.displayValue[0]} ${payload.model.displayValue[0]}`,
      dangerouslyUseHTMLString: true,
    };

    if (vehicleIndex !== -1) {
      notifyOptions.message = `Stock: ${payload.stockid} <br><b>is already in your saves</b>`;
      notifyOptions.type = "info";
    } else {
      savedVehicles.push(payload.stockid);

      commit("SET_SAVED_VEHICLES", savedVehicles);

      notifyOptions.message = `Stock: ${payload.stockid} <br><b>has been added to your saves</b>`;
      notifyOptions.type = "success";
    }

    Notification(notifyOptions);
  },

  removeFromSavedVehicles({ state, commit }, payload) {
    const filteredSavedVehicles = state.savedVehicles.filter((id) => id != payload.id);

    commit("SET_SAVED_VEHICLES", filteredSavedVehicles);
  },


  setSecuredVehicle({ state, commit }, payload) {
    const securedVehicles = state.securedVehicles;

    securedVehicles.push(payload);
    commit("SET_SECURED_VEHICLE", securedVehicles);
  },
  setMetaData({ dispatch }, data) {
    if (data) {
      const content = data.excerpt ? data.excerpt.rendered : "";
      const metaTags = [
        {
          name: "description",
          content: data.excerpt.rendered,
        },
        {
          property: "og:description",
          content: data.excerpt.rendered,
        },
      ];
      dispatch("SET_META_TITLE", `${data.title.rendered}`);
      dispatch("SET_META_TAGS", metaTags);
      dispatch("WRITE_PAGE_META");
      dispatch("GA_PAGE_TRACK");
    }
  },
  SET_META_TAGS: ({ commit }, value) => {
    commit("MUTATE_PROP_KEY", { prop: "meta", key: "metaTags", value });
  },
  SET_META_TITLE: ({ commit, state }, value) => {
    commit("MUTATE_PROP_KEY", {
      prop: "meta",
      key: "title",
      value: `${value} - ${state.site.name}`,
    });
  },
  WRITE_PAGE_META: ({ getters }) => {
    const meta = getters.PROP("meta");
    document.title = meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((el) =>
      el.parentNode.removeChild(el)
    );

    // Turn the meta tag definitions into actual elements in the head.
    if (!meta.metaTags) next();
    meta.metaTags
      .map((tagDef) => {
        const tag = document.createElement("meta");
        Object.keys(tagDef).forEach((key) => {
          tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute("data-vue-router-controlled", "");
        return tag;
      })
      .forEach((tag) => document.head.appendChild(tag));
  },
  GA_PAGE_TRACK: () => {
    const obj = {
      hitType: "pageview",
      location: window.location.href,
      page: window.location.pathname,
      title: document.title,
    };
    if (window.location.hostname === "localhost") {
      return true;
    }
    if (window.ga) {
      window.ga("send", obj);
    }
  },
  GA_EVENT_TRACK: ({}, { eventCategory, eventAction, eventLabel }) => {
    const obj = {
      hitType: "event",
      eventCategory,
      eventAction,
      eventLabel,
    };
    if (window.location.hostname === "localhost") {
      return true;
    }
    if (window.ga) {
      window.ga("send", obj);
    }
  },
};
