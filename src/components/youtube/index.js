import axios from "axios";
const unInterceptedAxios = axios.create();
export const getVideos = async function() {
return unInterceptedAxios
  .get('https://driveagent.b-cdn.net/files/shared/oem/hyundai/youtube.json')
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.error("error getting YouTube data", error);
  });
}
// export const getChannelTitleAndAvatar = async function(channelId, apiKey) {
//       //const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);
//     const response = await
//
//      unInterceptedAxios
//     .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/youtube/youtube.json`);
//
//     return response.data;
// };

// export const getSubscribersCount = async function(channelId, apiKey) {
//     //const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
//     unInterceptedAxios
//    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/youtube/youtube.json`);
//
//    return response.data;
// };

// export const getVideos = async function() {
//     //const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${resultsCount}`);
//     unInterceptedAxios
//    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/youtube/youtube.json`);
//
//      return response.data;
// };
//
// export const loadMoreVideos = async function(channelId, apiKey, resultsCount, nextPageToken) {
//     //const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&pageToken=${nextPageToken}&maxResults=${resultsCount}`);
//     unInterceptedAxios
//    .get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/youtube/youtube.json`);
//
//    return response.data;
// };
