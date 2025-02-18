import axios from "axios";
const getPageBySlug = (slug) => {
  const unInterceptedAxios = axios.create();
  return unInterceptedAxios
    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/pages/${slug}.json`)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      //console.error("error getting page by slug data", error);
      return { error: true }; // Return an error object when an error occurs
    });
};


const PageService = {
  getPageBySlug,
};

export default PageService;
