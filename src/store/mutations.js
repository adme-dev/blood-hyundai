import Vue from "vue";
import findIndex from "lodash/findIndex";
import { Notification } from "element-ui";
import { addQueryStringToSelection } from "@/utils";

export default {
  SET_SEARCH_STATE(state, searchState) {
    state.searchState = searchState;
  },
  SET_SAVES_LIST_VISIBILITY(state, value) {
    state.showSavesList = value;
  },
  CLEAR_SEARCH_STATE(state) {
    state.searchState = null;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_DATA_LOADED(state, isLoaded) {
    state.isDataLoaded = isLoaded;
  },
  SET_FILTERS(state, filters) {
    state.search.filters = filters;
  },
  SET_VEHICLES(state, payload) {
    Vue.set(state, "vehicles", payload);
  },
  SET_FILTERED_VEHICLES(state, filteredVehicles) {
    state.filteredVehicles = filteredVehicles;
  },
  SET_SCROLL_POSITION(state, scrollPosition) {
    state.scrollPosition = scrollPosition;
    // Sync with localStorage and notify components
    localStorage.setItem('scrollPosition', scrollPosition.toString());
  },

  RESET_SCROLL_POSITION(state) {
    state.scrollPosition = 0;
    localStorage.setItem('scrollPosition', "0");
    localStorage.setItem('pageSize', "12");
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  RESULTS_SEARCH_SWITCH(state, payload) {
    state.resultsSearchSwitch = payload;
  },
  GLOBAL_SEARCH_SWITCH(state, payload) {
    state.globalSearchSwitch = payload;
  },
  VEHICLE_ENQUIRY_GALLERY(state, payload) {
    state.vehicleEnquiryGallery = payload;
  },
  VEHICLE_ENQUIRY_POP_UP(state, { show, item }) {
    state.vehicleEnquiryPopUp = { show, item };
  },
  SORT_BY_DIRECTION_CHANGED(state, status) {
    state.isSortByDirectionChanged = status;
  },
  SORT_BY_CHANGED(state, status) {
    state.isSortByChanged = status;
  },
  CHANGE_SORTING_DIRECTION(state, dir) {
    state.search.sorting.direction = dir;
  },
  UPDATE_TEXT_SEARCH(state, { name, value }) {
    Vue.set(state.search.selected, name, value.toLowerCase());
  },

  CLEAR_TEXT_SEARCH(state, { name }) {
    Vue.delete(state.search.selected, name);
  },
  CHANGE_SORING_BY(state, value) {
    state.search.sorting.by = value;
  },

  SET_CURRENT_PAGE(state, current) {
    Vue.set(state.search.page, "current", current);
  },

  SET_PAGE_SIZE(state, size) {
    Vue.set(state.search.page, "size", size);
  },

  SET_SELECTED_FROM_QUERY_PARAMS(state, payload) {
    addQueryStringToSelection(state.search, payload);
  },
  SELECT(state, { name, value }) {
    Vue.set(state.search.selected, name, value);
  },
  DESELECT(state, { name }) {
    Vue.delete(state.search.selected, name);
  },

  DESELECT_ON_MULTIPLE(state, { name, value }) {
    const { selected } = state.search;
    const existed = selected[name];
    if (!existed) {
      return;
    }

    const idx = findIndex(existed, (item) => item === value);
    if (idx > -1) {
      Vue.delete(existed, idx);
    }

    if (existed.length === 0) {
      Vue.delete(selected, name);
    }
  },

  
  SET_MODELS(state, payload) {
    Vue.set(state, "models", payload);
  },
  SET_BRAND(state, payload) {
    Vue.set(state, "brand", payload);
  },
  SET_VEHICLES(state, payload) {
    Vue.set(state, "vehicles", payload);
  },
  SET_VEHICLE(state, payload) {
    Vue.set(state, "vehicle", payload);
  },
  SET_VARIANT(state, payload) {
    Vue.set(state, "variant", payload);
  },
  SET_VARIANT_MODEL(state, payload) {
    Vue.set(state, "modelVariants", payload);
  },
  MUTATE_PROP_KEY: (state, { prop, key, value }) => {
    state[prop] = { ...state[prop], [key]: value };
  },
  SET_PAGE(state, payload) {
    Vue.set(state, "page", payload);
  },
  SET_VIEWED_PAGES(state, payload) {
    Vue.set(state, "viewedPages", payload);
  },
  SET_RECENTLY_VIEWED(state, payload) {
    Vue.set(state, "recentlyViewed", payload);
  },
  SET_SAVED_VEHICLES(state, payload) {
    Vue.set(state, "savedVehicles", payload);
    window.localStorage.setItem("savedVehicles", JSON.stringify(payload));
  },
  SET_CLIENT_SECRET(state, payload) {
    Vue.set(state, "clientSecret", payload);
  },
  SET_SECURED_VEHICLE(state, payload) {
    Vue.set(state, "securedVehicles", payload);
  },
};
