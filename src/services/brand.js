import axios from "axios";
const unInterceptedAxios = axios.create();
const getBrand = () => {
  return (
    unInterceptedAxios
      .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/carsales/brand.json`)
      //.get('`${process.env.VUE_APP_PUBLIC_API_URL}/models`')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("error getting brand data", error);
      })
  );
};
const BrandService = {
  getBrand,
};
export default BrandService;
