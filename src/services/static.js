import axios from "axios";
const getStaticContent = (file) => {
  return axios({
    method: "get",
    url: `/static/${file}.html`,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error("error getting file", error);
    });
};

const getStaticJson = (file) => {
  return axios({
    method: "get",
    url: `/static/${file}.json`,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error("error getting file", error);
    });
};

export { getStaticContent, getStaticJson };
