import axios from "axios";
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const unInterceptedAxios = axios.create();

// Utility function to handle cache and fetch
const cacheFetch = async (cacheKey, fetchFunc) => {
  const cachedData = myCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await fetchFunc();
    myCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getOemPageBySlug = async (slug) => {
  const cacheKey = `oemPage-${slug}`;
  return cacheFetch(cacheKey, async () => {
    const res = await unInterceptedAxios.get(`${process.env.VUE_APP_OEM_PAGES_CDN_URL}/${slug}.json`);
    return res.data[0];
  });
};

const OemPageService = {
  getOemPageBySlug,
};

export default OemPageService;
