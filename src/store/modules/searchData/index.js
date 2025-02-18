
export default {
  state: {
      search: [],
      vehiclesData: []  // Ensure this state property exists
  },
  getters: {
      getSearch: (state) => state.search,
      getVehiclesData: (state) => state.vehiclesData // Getter for vehicles data
  },
  actions: {
      fetchSearchFromVehicles({ commit, state }) {
          try {
              const vehiclesData = state.vehiclesData;

         // Process vehiclesData to create structured search criteria
         const searchCriteria = vehiclesData.map(vehicle => ({
          body: vehicle.body.displayValue.join(', '),
          condition: vehicle.condition.displayValue.join(', '),
          make: vehicle.make.displayValue.join(', '),
          model: vehicle.model.displayValue.join(', '),
          // Optionally include other properties like displayMake and displayBody if needed
      }));

      commit('SET_SEARCH', searchCriteria);
          } catch (error) {
              console.log('Error processing vehicles data for search:', error);
          }
      }
  },
  mutations: {
      SET_SEARCH(state, search) {
          state.search = search;
      },
      SET_VEHICLES(state, vehicles) {
          state.vehiclesData = vehicles; // Mutation to set vehicles data
      }
  }
};
