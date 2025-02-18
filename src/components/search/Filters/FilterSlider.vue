<template>
  <div class="filter-item-inner" :class="option.name">

    <ul data-uk-accordion>
      <li
        v-if="
          option.displayName === 'Kilometres' 
        "
      >
        <a class="uk-accordion-title uk-h4 uk-margin-remove" href="#">{{ option.displayName }}</a>
        <div class="uk-accordion-content">
          <span
      >{{ minLabel }}
      <span class="uk-float-right">{{ maxLabel }}</span>
    </span>

    <el-slider
      :min="option.data.min"
      :max="option.data.max"
      :step="option.data.step"
      :format-tooltip="formatTooltip"
      :show-tooltip="false"
      :show-input="true"
      v-model="value"
      range
      @change="onChange"
    >
    </el-slider>
    <div class="uk-text-xsmall" v-if="option.decription" v-html="option.decription"></div>
        </div>
      </li>


  <li v-else class="uk-open">
    <h4 class="uk-margin-small-bottom uk-text-light" v-html="option.displayName"></h4>

    <span
      >{{ minLabel }}
      <span class="uk-float-right">{{ maxLabel }}</span>
    </span>

    <el-slider
      :min="option.data.min"
      :max="option.data.max"
      :step="option.data.step"
      :format-tooltip="formatTooltip"
      :show-tooltip="false"
      :show-input="true"
      v-model="value"
      range
      @change="onChange"
    >
    </el-slider>
    <div class="uk-text-xsmall" v-if="option.decription" v-html="option.decription"></div>
  </li>
</ul>

  </div>


</template>

<script>
import { formatNumber } from "@/utils";
import { eventBus } from "@/components/search/script.js";
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
  data() {
    return {
      value: this.$store.state.search.selected[this.option.name] || [
        this.option.data.min,
        this.option.data.max,
      ],
    };
  },
  mounted() {
    eventBus.$on("resetSlider", () => {
      this.value = [this.option.data.min, this.option.data.max];
    });
  },
  beforeDestroy() {
    // removing eventBus listener
    eventBus.$off("resetSlider");
  },

  computed: {
    minLabel() {
      if (this.option.displayName === "Budget") {
        return `$${this.value[0].toLocaleString()}`;
      } else if (this.option.displayName === "Kilometres") {
        return `${this.value[0].toLocaleString()} km`;
      } else if (this.option.name === "perweek") {
        return `$${this.value[0].toLocaleString()}`;
      } else {
        return `${this.value[0]}`;
      }
    },
    maxLabel() {
      if (this.option.displayName === "Budget") {
        return `$${this.value[1].toLocaleString()}`;
      } else if (this.option.displayName === "Kilometres") {
        return `${this.value[1].toLocaleString()} km`;
      } else if (this.option.name === "perweek") {
        return `$${this.value[1].toLocaleString()}`;
      } else {
        return `${this.value[1]}`;
      }
    },
  },
  methods: {
    onChange(value) {
      const { name } = this.option;
      const { min, max } = this.option.data;
      if (min === value[0] && max === value[1]) {
        this.$store.dispatch("deselect", { name });
      } else if (!isNaN(value[0]) && !isNaN(value[0])) {
        this.$store.dispatch("select", { name, value });
      }
      this.$emit("click");
    },
    formatTooltip(val) {
      const { format } = this.$store.state;
      const { name } = this.option;
      return formatNumber(val, name, format);
    },
  },
};
</script>
