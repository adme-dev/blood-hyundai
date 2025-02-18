import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
const state = () => ({
  filters: [],
  variants: [],
  preselect: {},
  selected: {},
  loading: false,
  format: {
    price: {
      locale: "en-AU",
      options: {
        style: "currency",
        currency: "AUD",
      },
      prefix: "",
      suffix: "",
    },
    rating: {
      locale: "en-GB",
      options: [],
      prefix: "\u2b50",
      suffix: "",
    },
  },
  page: {
    size: 1,
    sizes: [12, 24, 36],
    current: 1,
  },
  sorting: {
    options: {
      position: "Position",
      name: "Name",
      rating: "Rating",
      price: "Price",
      date: "Date",
    },
    by: "price",
    direction: "desc",
  },
});

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
