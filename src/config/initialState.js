import filterSelection from "../config/filterSelection";
import meta from "@/config/meta";
import site from "@/config/site";

const savedVehicles = window.localStorage.getItem("savedVehicles");
const recentlyViewedVehicles = window.localStorage.getItem("recentlyViewedVehicles");

export default {
  meta,
  site,
  search: {
    sorting: {
      by: "kms",
      direction: "asc",
      options: { price: "Price", kms: "Kilometres", year: "Year Made" },
    },
    filters: {},
    selected: {},
    page: {
      size: 24,
      sizes: [24, 36, 48],
      current: 1,
    },
  },
  vehicles: [],
  models: {},
  layout: "list-view",
  loading: false,
  showSavesList: false,
  isSortByChanged: false,
  isSortByDirectionChanged: false,
  refCount: 0,
  format: {
    price: {
      locale: "en-GB",
      options: {
        style: "currency",
        currency: "AUD",
      },
      prefix: "",
      suffix: "",
    },
  },
  viewedPages: [],
  securedVehicles: [],
  savedVehicles: savedVehicles ? JSON.parse(savedVehicles) : [],
  recentlyViewedVehicles: recentlyViewedVehicles ? JSON.parse(recentlyViewedVehicles) : [],
  globalSearchSwitch:{show:false, tab:null},
  vehicleEnquiryGallery:{show:false, item:null},
  resultsSearchSwitch:{show:false},
  vehicleEnquiryPopUp:{show:false, item:null}
};
