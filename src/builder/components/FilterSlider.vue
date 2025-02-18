<template>
  <div class="filter-variant-inner">
    <h4>{{ option.displayName }}</h4>
    <span>{{ value[0].toLocaleString() }} - {{ value[1].toLocaleString() }}</span>
    <el-slider
      :min="option.data.min"
      :max="option.data.max"
      :step="option.data.step"
      :format-tooltip="formatTooltip"
      v-model="value"
      :show-tooltip="false"
      :show-input="true"
      range
    >
    </el-slider>
  </div>
</template>

<script>
import formatNumber from "@/builder/utils/formatNumber";

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: "Slider",
          name: "slider",
          type: "slider",
        };
      },
    },
  },

  computed: {
    value: {
      get() {
        const { name } = this.option;
        const { min, max } = this.option.data;
        return this.$store.state.priceBuilder.preselect[name] || [min, max];
      },
      set(value) {
        const { name } = this.option;
        const { min, max } = this.option.data;
        if (min === value[0] && max === value[1]) {
          this.$store.dispatch("priceBuilder/deselect", { name });
        } else {
          this.$store.dispatch("priceBuilder/select", { name, value });
        }

        this.$emit("updateRouter", true);
      },
    },
  },

  methods: {
    formatTooltip(val) {
      const { format } = this.$store.state.priceBuilder;
      const { name } = this.option;
      return formatNumber(val, name, format);
    },
  },
};
</script>
