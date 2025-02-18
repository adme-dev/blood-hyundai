import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import getSearch from "./modules/searchData";
import priceBuilder from "./modules/price-builder";
import getGoogleReviews from "./modules/GoogleReviews";
import fetchReviews from "./modules/fetchReviews";
Vue.use(Vuex);

const store = (initialState) => {
  return new Vuex.Store({
    state: initialState,
    mutations,
    getters,
    actions,
    modules: {
      getSearch,
      priceBuilder,
      getGoogleReviews,
      fetchReviews
    },
  });
};
export default store;
