// Vuex store module (in your Vue.js application)
import axios from 'axios'

export default {
  state: {
    dealershipReviews: {}
  },
  getters: {
    getDealershipReviews: (state) => state.dealershipReviews
  },
  actions: {
    async fetchDealershipReviews({ commit }) {
      try {
        const response = await axios.get('/fetchReviews')
        commit('SET_DEALERSHIP_REVIEWS', response.data)
      } catch (error) {
        console.error('Error fetching dealership reviews:', error)
      }
    }
  },
  mutations: {
    SET_DEALERSHIP_REVIEWS(state, reviews) {
      state.dealershipReviews = reviews
    }
  }
}