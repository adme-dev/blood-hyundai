import axios from "axios";
const getAccessoryById = (id) => {
  return axios
    .get(`${process.env.VUE_APP_OEM_2021_CDN_URL}/accessories-956f9feba2c2df/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting accessory by id data", error);
    });
};
const getAccessoriesByModel = (model) => {
  const refinedModelName = model.replace(/\s/g, "-").toLowerCase();
  return axios
    .get(
      `${process.env.VUE_APP_OEM_2021_CDN_URL}/accessories-956f9feba2c2df?filter[accessories_model]=${refinedModelName}&per_page=100`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error getting accessories by slug data", error);
    });
};

const AccessoryService = {
  getAccessoriesByModel,
  getAccessoryById,
};
export default AccessoryService;
