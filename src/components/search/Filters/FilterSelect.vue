<template>
  <div v-if="option.displayName === 'Models'">
    <div class="filter-item-inner">
      <h4 class="uk-margin-small-bottom">{{ option.displayName }}</h4>
      <el-select clearable v-model="value" placeholder="Select Model">
        <el-option
          v-for="(item, index) in option.data"
          :key="item.value"
          :label="
            item.displayMake +
              ' ' +
              item.displayValue +
              (index ? ' (' + counters[item.value] + ')' : '')
          "
          :value="item.value"
          :disabled="counters[item.value] === 0"
          :class="
            '' + option.displayName.toLowerCase() + '-' + counters[item.value] + ' select-model'
          "
        >
          <div v-if="counters[item.value] === '0'"></div>
          <div v-else>
            <img
              class="model-make-logo"
              :src="
                'https://s3-ap-southeast-2.amazonaws.com/car-resources/site-badges/' +
                  item.displayMake.replace(/\s/g, '-').toLowerCase() +
                  '.png'
              "
            />
            <span class="model-make-name">
              <span class="uk-text-bold">{{ item.displayValue }}</span>
              <div class="uk-text-secondary uk-text-small">
                {{ item.displayMake }}
              </div>
            </span>
            <span style="float: right; color: #222; font-size: 14px">{{
              counters[item.value]
            }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
  </div>

  <div v-else-if="option.displayName === 'Badges'">
    <div class="filter-item-inner" :class="'section-' + option.displayName.toLowerCase() + ''">
      <h4 class="uk-margin-small-bottom">{{ option.displayName }}</h4>
      <el-select clearable v-model="value" placeholder="Select Badge">
        <el-option
          v-for="(item, index) in option.data"
          :key="item.value"
          :label="item.displayValue + (index ? ' (' + counters[item.value] + ')' : '')"
          :value="item.value"
          :class="'' + option.displayName.toLowerCase() + '-' + counters[item.value] + ''"
        >
          <div v-if="counters[item.value] === '0'"></div>
          <div v-else>
            <span style="float: left"
              >{{ item.displayValue }}
              <div class="uk-text-meta uk-text-small red-high-text">
                {{ item.displayMake }}
              </div>
            </span>
            <span style="float: right; color: #222; font-size: 14px">{{
              counters[item.value]
            }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import each from "lodash/each";
import cloneDeep from "lodash/cloneDeep";
import { matchItems } from "@/utils/";

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: "Single",
          name: "single",
          type: "single",
        };
      },
    },
  },

  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.search.selected[name] || "";
      },
      set(value) {
        const { name } = this.option;
        if (value) {
          this.$store.dispatch("select", { name, value });
        } else {
          this.$store.dispatch("deselect", { name });
        }
        this.$emit("click");
      },
    },

    counters() {
      const { vehicles } = this.$store.state;
      const { selected, filters } = this.$store.state.search;
      const { data, name } = this.option;
      const selectionsWithValue = this.getSelectionsWithValue(selected);
      const counters = {};
      this.vLodash.each(data, (item, idx) => {
        if (idx > 0) {
          const fakeSelected = this.vLodash.cloneDeep(selectionsWithValue);
          fakeSelected[name] = item.value;
          const fakeMatched = matchItems(vehicles, fakeSelected, filters);
          counters[item.value] = fakeMatched.length;
        }
      });

      return counters;
    },
  },
  methods: {
    getSelectionsWithValue(selected) {
      let selectionsWithValue = {};
      for (var key in selected) {
        if (!this.vLodash.isEmpty(selected[key])) selectionsWithValue[key] = selected[key];
      }
      return selectionsWithValue;
    },
  },
};
</script>
