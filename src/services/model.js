import axios from "axios";
const unInterceptedAxios = axios.create();
const getModels = () => {
  return (
    unInterceptedAxios
      .get(`${process.env.VUE_APP_OEM_DATA_CDN_URL}/models.json`)
      //.get('`${process.env.VUE_APP_PUBLIC_API_URL}/models`')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("error getting models data", error);
      })
  );
};
const VariantService = {
  getModels,
};
export default VariantService;
