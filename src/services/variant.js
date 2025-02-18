import axios from "axios";
const getVariantBySlug = (slug) => {
  return axios
    .get(`${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?slug=${slug}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      console.error("error getting variant by slug data", error);
    });
};
const getVariantByModel = (model) => {
  const refinedModelName = model.replace(/\s/g, "-").toLowerCase();
  return axios
    .get(
      `${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?filter[variant_category]=${refinedModelName}&per_page=100`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting variant by model", error);
    });
};
const getVariants = () => {
  return axios
    .get(`${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?per_page=99`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting variants data", error);
    });
};
const getOffers = () => {
  return axios
    //.get(`${process.env.VUE_APP_OEM_2021_CDN_URL}/latest-offers?per_page=99`)
    .get(
      `${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?filter[offer_type]=special-offer,finance-offer,driveaway-offer,factory-bonus&per_page=100`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting offers data", error);
    });
};
const getOffersById = (id) => {
  return axios
    //.get(`${process.env.VUE_APP_OEM_2021_CDN_URL}/latest-offers/${id}`)
    .get(`${process.env.VUE_APP_OEM_2021_CDN_URL}/variants/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting offer by id data", error);
    });
};
const getBuilderOffers = (model) => {
  const refinedModelName = model.replace(/\s/g, "-").toLowerCase();
  return axios
    .get(
      `${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?filter[offer_type]=special-offer,finance-offer,driveaway-offer,factory-bonus&filter[variant_category]=${refinedModelName}&per_page=100`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting variant by model", error);
    });
};
const VariantService = {
  getVariantBySlug,
  getVariantByModel,
  getVariants,
  getOffers,
  getOffersById,
  getBuilderOffers
};
export default VariantService;
