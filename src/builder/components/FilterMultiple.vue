<template>
  <div class="filter-variant-inner">
    <h4 class="uk-margin-remove">{{ option.displayName }}</h4>
    <el-select clearable multiple v-model="value" :placeholder="option.displayValue">
      <el-option
        v-for="variant in option.data"
        :key="variant.value"
        :label="variant.displayValue + ' (' + counters[variant.value] + ')'"
        :value="variant.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import each from "lodash/each";
import cloneDeep from "lodash/cloneDeep";
import matchvariants from "@/builder/utils/matchvariants";

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: "Multiple",
          name: "multiple",
          type: "multiple",
        };
      },
    },
  },
  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.priceBuilder.preselect[name] || [];
      },
      set(value) {
        const { name } = this.option;
        if (value.length) {
          this.$store.dispatch("priceBuilder/select", { name, value });
        } else {
          this.$store.dispatch("priceBuilder/deselect", { name });
        }
        this.$emit("updateRouter", true);
      },
    },

    counters() {
      const { selected, variants, filters } = this.$store.state.priceBuilder;
      const { option } = this;
      const { data, name } = option;
      const counters = {};

      each(data, (variant) => {
        const fakeSelected = cloneDeep(selected);
        fakeSelected[name] = [variant.value];

        const fakeMatched = matchvariants(variants, fakeSelected, filters);
        counters[variant.value] = fakeMatched.length;
      });

      return counters;
    },
  },
};
</script>
