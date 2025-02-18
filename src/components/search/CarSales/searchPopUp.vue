<template>
  <div v-if="showModal" class="modal-search uk-flex-top uk-flex uk-modal uk-open uk-animation-fade uk-animation-fast">
    <div class="uk-modal-dialog modal-search-dialog uk-overflow-hidden uk-animation-scale-up">

      <!-- <div class="uk-modal-header">
            <h2 class="uk-modal-title"></h2>
        </div> -->

      <div class="uk-modal-body uk-height-1-1 modal-search-body uk-padding-remove uk-overflow-auto">

        <span class="uk-position-top-right uk-position-fixed uk-padding-small toggle-bar-close"
          @click="closeGlobalSearchSwitch(null)">
          <div class="filter-icon-close" type="button"></div>
        </span>
        <!-- Filters -->
        <div class="uk-margin-medium-bottom">
          <div class="filter-list-body">
            <div class="uk-margin-small-top" ref="filterContainer">
              <FilterSelected @click="pushFilterSelectionsToRouter"></FilterSelected>
              <hr class="uk-width-1-1" />
              <ul data-uk-accordion>
                <li class="filter-item" v-for="filter in filters" :key="filter.name">
                  <filter-text v-if="filter.type === 'text'" :option="filter"
                    @click="pushFilterSelectionsToRouter"></filter-text>
                  <filter-slider v-if="filter.type === 'slider'" :option="filter"
                    @click="pushFilterSelectionsToRouter"></filter-slider>
                  <filter-checkbox v-if="filter.type === 'checkbox'" :option="filter"
                    @click="pushFilterSelectionsToRouter"></filter-checkbox>
                  <filter-select v-if="filter.type === 'select'" :option="filter"
                    @click="pushFilterSelectionsToRouter"></filter-select>
                  <filter-multiselect v-if="filter.type === 'multiselect'" @click="pushFilterSelectionsToRouter"
                    :option="filter"></filter-multiselect>
                </li>
              </ul>
            </div>

            <div>
              <SavedList />
            </div>
            <div>
              <RecentlySeenSlider />
            </div>

          </div>
        </div>
        <!-- End Of Filters -->

        <!-- <div class="uk-card-footer search-footer uk-hidden@m">
        <span class="uk-icon-button ad-button-red uk-float-left toggle-bar-close uk-icon uk-hidden"
          uk-toggle="target: #toggle-bar; cls: uk-visible uk-position-top uk-position-fixed uk-position-z-index uk-hidden uk-width-1-1; animation: uk-animation-slide-bottom" uk-icon="icon: close">
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close">
            <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path>
            <path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path>
          </svg>
        </span>
        <button class="
          uk-button uk-button-secondary
          tm-button-default
          uk-border-rounded uk-text-bold uk-text-capitalize uk-width-1-1 uk-width-auto@m uk-float-right
        "
        @click="closeGlobalSearchSwitch(null)"
        ><i class="el-icon-search"></i> {{ foundResultText }}</button>

      </div> -->

        <div
          class="modal-search-footer uk-width-1-1 uk-padding-small uk-box-shadow-small uk-position-fixed uk-position-bottom">
          <button class="
               uk-button uk-button-secondary
               tm-button-default
               uk-border-rounded uk-text-bold uk-text-capitalize uk-width-expand
             " @click="closeGlobalSearchSwitch(null)">
            <i class="el-icon-search"></i> {{ foundResultText }}
          </button>
        </div>

      </div>



    </div>
  </div>
</template>

<script>
import Vue from "vue";

import {
  Input,
  Slider,
  Switch,
  Checkbox,
  Select,
  Option
} from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

import {
  buildQuery
} from "@/utils";
import {
  addQueryStringToSelection
} from "@/utils";

import ItemSorting from "@/components/search/Item/ItemSorting";
import FilterText from "@/components/search/Filters/FilterText";
import FilterSlider from "@/components/search/Filters/FilterSlider";
import FilterCheckbox from "@/components/search/Filters/FilterCheckBox";
import FilterSelect from "@/components/search/Filters/FilterSelect";
import FilterMultiselect from "@/components/search/Filters/FilterMultiselect";

const FilterSelected = () => import('@/components/search/Filters/FilterSelected.vue')
const SavedList = () => import('@/components/search/CarSales/SavedList')
const RecentlySeenSlider = () => import('@/components/search/CarSales/RecentlySeenSlider')

locale.use(lang);

export default {
  name: "search",
  components: {
    ItemSorting,
    FilterSelected,
    FilterText,
    FilterSlider,
    FilterCheckbox,
    FilterSelect,
    FilterMultiselect,
    SavedList,
    RecentlySeenSlider
  },
  created() {
    Vue.use(Input);
    Vue.use(Slider);
    Vue.use(Switch);
    Vue.use(Checkbox);
    Vue.use(Select);
    Vue.use(Option);
  },
  data() {
    return {

    };
  },
  computed: {
    filters() {
      return this.$store.state.search.filters;
    },
    resultText: function () {
      var totalResults = this.$store.getters.totalVehiclesFound;
      if (totalResults > 1) {
        return 'View ' + totalResults + ' Results';
      } else {
        return 'View ' + totalResults + ' Result';
      }
    },
    foundResultText: function () {
      var totalResults = this.$store.getters.totalVehiclesFound;
      if (totalResults > 1) {
        return totalResults + ' Vehicles found';
      } else {
        return totalResults + ' Vehicle found';
      }
    },
    showModal() {
      return this.$store.state.resultsSearchSwitch.show;
    },
  },
  mounted() {
    ///console.log(this.$refs, 'refs')
  },
  // beforeDestroy() {
  //
  // },
  methods: {
    setSelection() {
      this.$store.state.search.selected = {};
      const urlParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlParams.entries());

      if (Object.keys(params).length > 0) {
        this.$store.dispatch("setSelectedFromQueryParams", params);
      }
    },
    closeGlobalSearchSwitch() {
      this.$store.dispatch("resultsSearchSwitch", {
        show: false
      });
    },
    pushFilterSelectionsToRouter() {
      this.$store.dispatch("setCurrentPage", 1);
      const routerQueries = this.$route.query;
      const builtQueries = buildQuery(this.$store.state.search);
      if (!this.vLodash.isEqual(routerQueries, builtQueries)) this.$router.push({
        query: builtQueries
      });
    },
  },
};
</script>
<style>
.modal-search {
  backdrop-filter: blur(2px);
  z-index: 99999999999;
}

.modal-search .modal-search-dialog {
  height: 100%;
  /* height: calc(100vh - 60px); */
}

.modal-search-footer {
  z-index: 2;
  background: #f9f9f9;
  z-index: 999999;
}

.modal-search .uk-modal-dialog,
.modal-search .uk-modal-footer {
  border-radius: 20px;
}

.modal-search .filter-item-inner.multiple-select .uk-child-width-1-3\@m>* {
  width: calc(100% * 1 / 5.001);
}

.el-select-dropdown.el-popper {
  z-index: 99999999999 !important;
}

.modal-search .selected-item-toolbar {
  display: flex;
}

.modal-search .uk-modal-dialog:not(.model-body-select) {
  max-width: 540px !important;
  background: #f9f9f9;
}

.modal-search .filter-list-body {
  padding: 50px 20px 20px;
}

.nav-bar-filters,
.filter-list .el-select .el-input--suffix .el-input__inner {
  border: 4px solid #e5e5e5;
}

.mb-nav-bar-filters {
  background: #ebebeb;
  border-radius: 4px;
}

.modal-search .uk-modal-body::-webkit-scrollbar {
  width: 5px;
  /* Set the width of the scrollbar */
}

.modal-search .uk-modal-body::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* Set the background color of the scrollbar track */
}

.modal-search .uk-modal-body::-webkit-scrollbar-thumb {
  background-color: #888;
  /* Set the background color of the scrollbar thumb */
  border-radius: 5px;
  /* Set the border radius of the scrollbar thumb */
}

.modal-search .uk-modal-body {
  scrollbar-color: #888 #f1f1f1;
  /* Set the color of the scrollbar thumb and track */
}

@media (max-width: 1200px) {
  .modal-search .filter-item-inner.multiple-select .uk-child-width-1-3\@m>* {
    width: calc(100% * 1 / 4.001);
  }
}</style>
