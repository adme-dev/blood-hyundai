import chunk from "lodash/chunk";
import matchvariants from "@/builder/utils/matchvariants";
import sortvariants from "@/builder/utils/sortvariants";

export default {
  matched({ variants, selected, sorting, filters }) {
    const matched = Object.keys(selected).length ? matchvariants(variants, selected, filters) : variants;
    const sorted = sortvariants(matched, sorting);

    return sorted;
  },

  total(state, { matched }) {
    return matched.length;
  },

  displayvariants({ page }, { matched }) {
    const { size } = page;
    const pages = chunk(matched, size);
    const { current } = page;
    return pages[current - 1];
  },

  itemById(state) {
    // function
    return (itemId) => {
      // item by id
      return state.variants.find((item) => item.id === itemId);
    };
  },

  loading(state) {
    return state.loading;
  },
};
