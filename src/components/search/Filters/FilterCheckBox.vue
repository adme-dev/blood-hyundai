<template>
  <div class="filter-item-inner">
    <ul data-uk-accordion>
      <li
        v-if="
          option.displayName === 'Engine' ||
            option.displayName === 'Body' ||
            option.displayName === 'Transmission' ||
            option.displayName === 'Drive Train' ||
            option.displayName === 'Fuel Type' ||
            option.displayName === 'Seating Capacity' ||
            option.displayName === 'Doors' ||
            option.displayName === 'Badges'
        "
      >
        <a class="uk-accordion-title uk-h4 uk-margin-remove" href="#">{{ option.displayName }}</a>
        <div class="uk-accordion-content">
          <div
            class="checkbox-item"
            v-for="item in option.data"
            :key="item.id"
            :class="
              'value-' +
                counters[item.value] +
                ' ' 
            "
          >
            <el-checkbox v-model="value" :label="item.value" :disabled="counters[item.value] === 0" :class="{ 'uk-hidden': (counters[item.value] === 0) }">
              <span class="uk-text-capitalize">
                {{ item.displayValue }}
                <span class="uk-float-right checkbox-counter ">{{ counters[item.value] }}</span>
              </span>
            </el-checkbox>
          </div>
        </div>
      </li>

      <li v-else class="uk-open">
        <a class="uk-accordion-title uk-h4 uk-margin-remove" href="#">{{ option.displayName }}</a>
        <div class="uk-accordion-content">
          <div
            class="uk-child-width-1-4 uk-child-width-1-3@m uk-grid-collapse uk-grid"
            v-if="option.displayName === 'Makes'"
          >
            <div
              class="checkbox-item uk-position-relative uk-flex uk-flex-center item-make"
              v-for="item in option.data"
              :key="item.id"
              :class="'value-' + counters[item.value] + ''"
            >
              <el-checkbox
                v-model="value"
                :label="item.value"
                class="uk-text-center uk-background-default"
                :disabled="counters[item.value] === 0"
              >
                <img
                  class="make-logo-img uk-blend-multiply"
                  :src="
                    'https://s3-ap-southeast-2.amazonaws.com/car-resources/site-badges/' +
                      item.value+
                      '.png'
                  "
                />
                <div class="item-make-title">{{ item.displayValue }}</div>
                <span class="uk-text-muted uk-position-top-left item-counter">{{
                  counters[item.value]
                }}</span>
              </el-checkbox>
            </div>
          </div>

          <div
            class="uk-text-center uk-grid-collapse uk-child-width-1-5 uk-grid"
            v-else-if="option.displayName === 'Colour'"
          >
            <div
              class="checkbox-item uk-position-relative uk-flex uk-flex-center item-colour"
              v-for="item in option.data"
              :key="item.id"
              :class="
                'value-' +
                  counters[item.value] +
                  ' ' 
              "
            >
              <el-checkbox
                v-model="value"
                :label="item.value"
                :class="item.value"
                :disabled="counters[item.value] === 0"
              >
                <div class="facetwp-colors" :style="'background-color: ' + item.value + ''"></div>
                <div class="uk-text-small item-make-title">
                  {{ item.displayValue }}
                </div>
              </el-checkbox>
            </div>
          </div>

          <div
            class="uk-text-center uk-grid-collapse uk-child-width-1-3 uk-grid"
            v-else-if="option.displayName === 'Condition'"
          >
            <div
              class="checkbox-item uk-position-relative uk-flex uk-flex-center item-condition uk-transition-toggle"
              v-for="item in option.data"
              :key="item.id"
              :class="
                'value-' +
                  counters[item.value] +
                  ' '
              "
            >
              <el-checkbox
                v-model="value"
                :label="item.value"
                :disabled="counters[item.value] === 0"
              >
                <img
                  class="uk-transition-scale-up uk-transition-opaque"
                  data-src="/assets/images/body/condition.png"
                  uk-img
                />
                <div>{{ item.displayValue }}</div>
                <span class="uk-text-muted uk-position-top-left item-counter">{{
                  counters[item.value]
                }}</span>
              </el-checkbox>
            </div>
          </div>

          <div v-else>
            <div
              class="checkbox-item"
              v-for="item in option.data"
              :key="item.id"
              :class="
                'value-' +
                  counters[item.value] +
                  ' ' 
              "
            >
              <el-checkbox
                v-model="value"
                :label="item.value"
                :disabled="counters[item.value] === 0"
              >
                <span v-if="item.displayValue === 'WAGON'">
                  SUV / WAGON
                  <span class="uk-float-right checkbox-counter ">{{ counters[item.value] }}</span>
                </span>
                <span class="uk-text-capitalize" v-else>
                  {{ item.displayValue }}
                  <span class="uk-float-right checkbox-counter ">{{ counters[item.value] }}</span>
                </span>
              </el-checkbox>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { matchItems } from "@/utils";

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
        return this.$store.state.search.selected[name] || [];
      },
      set(value) {
        const { name } = this.option;
        if (value.length) {
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

      this.vLodash.each(data, (item) => {
        const fakeSelected = this.vLodash.cloneDeep(selectionsWithValue);
        fakeSelected[name] = [item.value];
        const fakeMatched = matchItems(vehicles, fakeSelected, filters);
        counters[item.value] = fakeMatched.length;
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
