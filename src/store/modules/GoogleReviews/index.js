import axios from 'axios'
export default {
    state: {
        googlereviews: []
    },
    getters: {
      getGoogleReviews: (state) => state.googlereviews
    },
    actions: {
      async fetchGoogleReviews({ commit }) {
          try {
            const unInterceptedAxios = axios.create();
            const data = await unInterceptedAxios.get(`${process.env.VUE_APP_DA_DATA_CDN_URL}/reviews/hours.json`)
              commit('SET_GOOGLEREVIEWS', data.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    },
    mutations: {
        SET_GOOGLEREVIEWS(state, googlereviews) {
          state.googlereviews = googlereviews
      }
    }
}
