import chunk from "lodash/chunk";
import { matchItems, sortItems, getSelectionsWithValue } from "@/utils";
export default {
  PROP: (state) => (prop) => {
    return state[prop];
  },
  PROP_KEY: (state) => ({ prop, key }) => {
    return state[prop][key] ? state[prop][key] : false;
  },
  matched(state) {
    const { vehicles } = state;
    const { selected, sorting, filters } = state.search;
    const matched = Object.keys(selected).length
      ? matchItems(vehicles, selected, filters)
      : vehicles;
    const sorted = sortItems(matched, sorting);

    return sorted;
  },
  totalVehiclesFound(state, { matched }) {
    return matched.length;
  },

  displayItems(state, { matched }) {
    const { size } = state.search.page;
    const pages = chunk(matched, size);
    const { current } = state.search.page;
    return pages[current - 1];
  },
  vehicleById(state) {
    return (vehicleId) => {
      return state.vehicles.find((vehicle) => vehicle.id === vehicleId);
    };
  },
  relatedVehicleName(state) {
    return (vehicleName, vehicleId) => {
      const filterResults = state.vehicles.filter(
        (vehicle) => vehicle.model.displayValue[0] === vehicleName && vehicle.id !== vehicleId
      );
      return chunk(filterResults, 10)[0];
    };
  },
  relatedVehicleBodyPrice(state) {
    return (vehicleBody, vehiclePrice, vehicleId) => {
      let priceminus = parseInt(vehiclePrice) - 3000;
      let priceplus = parseInt(vehiclePrice) + 3000;
      const filterResults = state.vehicles.filter(
        (vehicle) =>
          vehicle.body.value[0] === vehicleBody &&
          vehicle.price >= priceminus &&
          vehicle.price <= priceplus &&
          vehicle.id !== vehicleId
      );
      return chunk(filterResults, 10)[0];
    };
  },

  // latestViewed(state) {
  //   return () => {
  //     const vehicleIds = JSON.parse(JSON.stringify(localStorage.getItem("latestViewed"))) || [];
  //     //const vehicleIds = JSON.parse(localStorage.getItem("latestViewed")) || [];
  //
  //
  //   //if (state.vehicles.length) return
  //     const filterResults = state.vehicles.filter(
  //       (vehicle) => vehicleIds.includes(vehicle.id),
  //       console.log(vehicleIds + ' ids found in localStorage')
  //     );
  //     return filterResults;
  //   };
  // }


};
