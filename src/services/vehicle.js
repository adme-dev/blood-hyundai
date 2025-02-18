import axios from "axios";
const unInterceptedAxios = axios.create();
const getVehicleBySlug = (slug) => {
  //return axios
  //test
  return (
    unInterceptedAxios
      .get(`${process.env.VUE_APP_OEM_RAW_CDN_URL}/${slug}.json`)
      //.get(`${process.env.VUE_APP_PUBLIC_API_URL}/vehicle/${slug}`)
      .then((res) => {
        return res.data[0];
      })
      .catch((error) => {
        console.error("error getting vehicle by slug data", error);
      })
  );
};
const getVehicles = () => {
  return unInterceptedAxios
    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/carsales/dataSampleKey.json`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting vehicles data", error);
    });
};
const getVariantByModel360 = (model) => {
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
const VehicleService = {
  getVehicleBySlug,
  getVehicles,
  getVariantByModel360
};
export default VehicleService;
