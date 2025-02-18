<template>
  <div class="filter-item-inner multiple-select uk-position-relative">
    <h4 class="uk-margin-small-bottom text-white">Makes & Models</h4>

    <div class="uk-child-width-1-4 uk-child-width-1-3@m uk-grid-collapse uk-grid"
      :class="{ 'uk-hidden': isNewOrDemo() }">
      <div class="checkbox-item uk-position-relative uk-flex uk-flex-center item-make"
        v-for="(item, index) in groupedModels" :key="index" @click.prevent="itemToShow = index" v-if="showMake(item)">
        <el-checkbox :label="item.value" class="uk-text-center uk-background-default"
          :class="{ 'make-logo-active': selectedModels(item.modelList, value) }">
          <img class="make-logo-img uk-blend-multiply" :src="getLogoSrc(item.displayMake)" />
          <div class="item-make-title">{{ item.displayMake }}</div>
          <span v-html="selectedModels(item.modelList, value)"></span>
        </el-checkbox>
      </div>
    </div>

    <div v-for="(item, index) in groupedModels" :key="item.value"
      :class="{ 'uk-flex-top uk-modal uk-flex uk-open': itemToShow == index && !isNewOrDemo(item.displayMake) }">
      <div v-show="itemToShow == index" :class="getModalClasses(item.displayMake)">
        <div
          class="uk-child-width-auto uk-grid-collapse uk-grid uk-flex-middle uk-margin-small-top uk-position-top-left"
          :class="{ 'active': (itemToShow == index) }" @click.prevent="itemToShow = index">
          <div><img style="width:80px" :src="getLogoSrc(item.displayMake)" /></div>
          <div class="uk-text-bold">{{ item.displayMake }}</div>
        </div>
        <button @click.prevent="itemToShow = -1, resetSelection()"
          class="uk-close uk-position-top-right uk-padding-small" type="button" aria-label="Close" uk-close></button>
        <div class="uk-h4 uk-margin-small-top modal-list">
          <ul v-for="(group, displayBody) in groupByDisplayBody(item.modelList)" class="uk-list uk-margin-small-bottom">
            <li class="uk-margin-small-bottom displayBody" v-if="group.some(item => counters[item.value] > 0)">{{
        group[0].displayBody }}</li>
            <li v-for="(items, i) in group" :key="i" :class="{ 'uk-hidden': counters[items.value] === 0 }">
              <label :for="items.value"
                class="model-search uk-position-relative uk-background-default uk-border-rounded uk-grid-collapse uk-grid uk-flex-middle">
                <input @click="SelectionScroll" type="checkbox" :disabled="counters[items.value] === 0"
                  :id="items.value" name="models" v-model="value" class="uk-checkbox uk-border-pill"
                  :value="items.value">
                <div class="uk-width-expand">
                  <div class="uk-flex uk-flex-center uk-text-small uk-position-center-right">
                    <div>{{ counters[items.value] }}</div>
                  </div>
                  <div class="text-white uk-text-bold uk-margin-small-left">{{ items.displayValue }}</div>
                </div>
              </label>
              <hr class="uk-margin-small-top">
            </li>
          </ul>

          <div class="uk-text-center">
            <button @click.prevent="resetSelection"
              class="uk-button uk-button-primary uk-margin-small-top uk-border-pill">OK</button>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      itemToShow: '-1'
    };
  },
  computed: {
    groupedModels() {
      const groups = _(this.option.data)
        .groupBy('displayMake')
        .map((models, displayMake) => ({
          displayMake,
          modelList: _.uniqBy(models, 'displayValue')
        }))
        .value();

      return _.sortBy(groups, ({ displayMake }) => displayMake.toLowerCase());
    },

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

      data.forEach(item => {
        const fakeSelected = { ...selectionsWithValue, [name]: [item.value] };
        const fakeMatched = matchItems(vehicles, fakeSelected, filters);
        counters[item.value] = fakeMatched.length;
      });

      return counters;
    },
    existingModelsCount() {
      const { vehicles } = this.$store.state;
      const { selected, filters } = this.$store.state.search;
      const { data, name } = this.option;

      const selectionsWithValue = this.getSelectionsWithValue(selected);
      const counters = [];

      data.forEach(item => {
        const fakeSelected = { ...selectionsWithValue, [name]: [item.value] };
        const fakeMatched = matchItems(vehicles, fakeSelected, filters);
        if (fakeMatched.length !== 0)
          counters.push(item.value);
      });

      return counters;
    },

    filterMakeCondition() {
      const condition = this.$route.query.condition;
      if (condition) {
        const urlQueryCondition = condition.split(",").map(cond => cond.trim());
        const filter = this.$store.state.vehicles.filter(vehicle => urlQueryCondition.includes(vehicle.condition.value[0]));
        return [...new Set(filter.map(vehicle => vehicle.make.displayValue[0]))];
      } else {
        return [...new Set(this.$store.state.vehicles.map(vehicle => vehicle.make.displayValue[0]))];
      }
    }

  },
  methods: {
    updateBodyClass() {
      const className = 'make-model';
      if (this.itemToShow !== '-1') {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    },
    SelectionScroll() {
      window.scrollTo({ top: 0, left: 0 });
    },
    resetSelection() {
      this.itemToShow = '-1';
      this.updateBodyClass();
    },
    autoSelectModelFromUrl() {
      setTimeout(() => {
        const pathSegments = this.$route.path.split('/');
        if (pathSegments[1] === 'car-sales' && pathSegments.length >= 4) {
          const make = pathSegments[2];
          const model = pathSegments[3];
          const { name } = this.option;
          this.$store.dispatch('select', { name, value: [model] });
        } else {
          console.log("URL does not match the expected pattern.");
        }
      }, 100);
    },
    isNewOrDemo(displayMake) {
      const condition = this.$route.query.condition;

      if (condition) {
        const conditions = condition.split(',').map(cond => cond.trim());
        if ((conditions.includes('used') && conditions.includes('new')) || (conditions.includes('used') && conditions.includes('demo'))) {
          return false;
        }

        return (conditions.includes('new') || conditions.includes('demo')) && displayMake === 'Hyundai';
      }

      return false;
    },
    showMake(item) {
      const commonModels = _.intersectionWith(this.existingModelsCount, item.modelList.map(model => model.value), _.isEqual);
      return this.filterMakeCondition.includes(item.displayMake) && commonModels.length > 0;
    },
    selectedModels(items, values) {
      const res = items.filter(o => values.includes(o.value));
      return res.length > 0 ? `<span class="uk-text-muted uk-position-top-left item-counter">${res.length}</span>` : '';
    },
    groupByDisplayBody(e) {
      return _.groupBy(e, 'displayBody');
    },
    getSelectionsWithValue(selected) {
      return Object.keys(selected).reduce((acc, key) => {
        if (!_.isEmpty(selected[key])) acc[key] = selected[key];
        return acc;
      }, {});
    },
    getLogoSrc(displayMake) {
      return `https://driveagent.b-cdn.net/files/shared/badges/${displayMake.replace(/\s/g, '-').toLowerCase()}.png`;
    },
    getModalClasses(displayMake) {
      return this.isNewOrDemo(displayMake)
        ? 'new-or-demo-class'
        : ['uk-modal-dialog', 'uk-modal-body', 'model-body-select', 'uk-width-1-4@s', 'uk-margin-auto-vertical'];
    },
  },
  mounted() {
    this.autoSelectModelFromUrl();
    this.updateBodyClass();
  },
  watch: {
    itemToShow() {
      this.updateBodyClass();
    },
  },
};
</script>

<style scoped>
.select-dropdown_item {
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  margin-bottom: 4px;
  cursor: pointer;
}

.make-meta {
  color: #606266;
  font-size: 14px;
}

.select-dropdown_item img {
  width: 80px;
  padding: 5px;
}

.model-body-select {
  min-width: 350px;
  max-width: 450px !important;
  border-radius: 15px
}

body.make-model .uk-margin-small-top.modal-list{
 margin-top: 30px!important;
}

.li-disabled {
  display: none;
}

.make-logo-active {}

.item-make .el-checkbox.make-logo-active {
  border: 2px solid #030303;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0), 0 2px 4px rgba(0, 0, 0, .02), 0 6px 14px rgba(0, 0, 0, .02);
}

.make-logo-active .make-logo-img {
  filter: none;
}

.new-or-demo-class {
  display: block !important;
  position: relative;
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 0 15px;
  margin: 4px 0;
  border-radius: 10px;
}

.new-or-demo-class button,
.new-or-demo-class .uk-position-top-left {
  display: none !important;
}

.new-or-demo-class .uk-background-default {
  background-color: transparent;
}

.toggle-bar.uk-visible .new-or-demo-class {
  background-color: #f4f4f4
}
</style>

