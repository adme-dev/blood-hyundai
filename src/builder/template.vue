<template>
  <div class="vheight uk-background-default">
    <div v-if="loading" class="vloader vheight uk-width-1-1 uk-position-fixed uk-position-z-index uk-background-default">
      <div class="spinner-grow"></div>
    </div>

    <div class="toggle-bar-header uk-hidden@m" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
    style="z-index: 3;"
    >
      <nav class="uk-navbar-container uk-background-secondary uk-light" uk-navbar>
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav">
            <li class="uk-margin-small-left">
              <a
                href="#"
                uk-toggle="target: #toggle-bar; cls: toggle-bar-visible uk-position-top uk-position-fixed uk-position-z-index uk-width-1-1; animation: uk-animation-slide-left"
                class="uk-text-secondary uk-text-capitalize uk-text-bold"
              >
                <span class="uk-margin-small-right uk-float-left" uk-icon="icon: settings; ratio: 1.2"></span> Filters
              </a>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
             <li class="uk-margin-small-right">
            <a v-for="variant in $store.getters['priceBuilder/displayvariants']" :key="variant.id" class="uk-text-secondary uk-text-capitalize uk-text-bold">{{ variant.model.displayValue[0] }} | {{ variant.variant.displayValue[0] }}</a>
          </li>
        </ul>
       </div>
      </nav>
    </div>

    <div class="uk-grid-collapse uk-background-default" uk-grid>


      <div id="toggle-bar" class="filter-bar filter-bar-build uk-width-auto uk-background-default uk-visible@m">
        <div class="filterlistvariants uk-padding-small uk-margin-large-bottom">
          <div class="filter-selected">
            <filter-selected @updateRouter="updateTherouter"></filter-selected>
            <!-- <variant-sorting @updateRouter="updateTherouter"></variant-sorting> -->
          </div>

          <div v-for=" (filter, index) in filters" :key="index">


            <!-- <div
              v-if='index === 3'
              v-for="variant in $store.getters['priceBuilder/displayvariants']" :key="variant.id"
            >
              <div class="uk-width-1-1 filter-variant-inner"><h4>COLOUR</h4></div>
              <ul
                class="uk-grid-small uk-child-width-expand variant-colours-items uk-margin-small-top uk-grid"
              >
                  <li class="uk-flex uk-flex-center" v-for="(colours, index) in variant.colours" :key="colours.id">
                    <a href="#"
                      ><div
                        class="uk-border-circle uk-background-cover"
                        @click="changeChildColour(colours.images, colours.colour_name)"
                        :style="{ 'background-image': 'url(' + colours.swatch_colour_ + ')' }"
                      ></div
                    ></a>
                  </li>
               </ul>
            </div> -->

            <filter-text v-if="filter.type === 'text'" @updateRouter="updateTherouter" :option="filter"></filter-text>

            <filter-slider v-if="filter.type === 'slider'" @updateRouter="updateTherouter" :option="filter"></filter-slider>

            <filter-checkbox v-if="filter.type === 'checkbox'" @updateRouter="updateTherouter" :option="filter"></filter-checkbox>

            <filter-select v-if="filter.type === 'select'" @updateRouter="updateTherouter" :option="filter"></filter-select>

            <filter-radio v-if="filter.type === 'radio'" @updateRouter="updateTherouter" :option="filter"></filter-radio>

            <filter-multiselect
              v-if="filter.type === 'multiselect'"
              @updateRouter="updateRouter"
              :option="filter"
            ></filter-multiselect>
          </div>

          <div class="variant-search-footer uk-hidden@m">
            <a
              href="#top"
              id="to-top"
              class="uk-button uk-button-primary tm-button-default uk-width-1-1 uk-text-capitalize uk-float-right"
              uk-toggle="target: #toggle-bar; cls: toggle-bar-visible uk-position-top uk-position-fixed uk-position-z-index uk-width-1-1; animation: uk-animation-slide-left"
              ><i class="el-icon-search"></i> View {{ $store.state.priceBuilder.total }} Results</a
            >
          </div>
        </div>
      </div>

      <div class="filter-expand uk-width-expand@m">
        <div class="uk-width-1-1 uk-height-1-1 uk-margin-small-top">
          <variant-list @colorchange="buttonColorChange" :footerVehicelImage="footerVImage" :selectedColourName="selectedColourName"></variant-list>
        </div>

        <!-- <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-medium-top">
           <variant-pagination @updateRouter="updateTherouter"></variant-pagination>
          </div> -->
      </div>

    </div>

    <div class="variant-price-footer uk-visible@m">
      <variant-footer :footerVehicelImage="footerVImage" :selectedColourName="selectedColourName"></variant-footer>
    </div>

    <div class="uk-background-muted">
      <carRelated :model="$route.params.slug.split('-auto').join('')" vehicle_id="0"></carRelated>
    </div>

  </div>
</template>
<script>
import debounce from "lodash/debounce";
import Vue from "vue";
import {
  Input,
  Slider,
  Checkbox,
  Radio,
  Select,
  //Pagination,
  Option,
} from "element-ui";
import UPagination from "vuejs-uib-pagination";
import FilterSingle from "./components/FilterSingle.vue";
import FilterRadio from "./components/FilterRadio.vue";
import FilterCheckBox from "./components/FilterCheckBox.vue";
import FilterMultiselect from "./components/FilterMultiple.vue";
import FilterSelected from "./components/FilterSelected.vue";
import FilterSlider from "./components/FilterSlider.vue";
import FilterText from "./components/FilterText.vue";
import variantPagination from "./components/variantPagination.vue";
import variantList from "./components/variantList.vue";
import variantListFooter from "./components/variantListFooter.vue";
import variantSorting from "./components/variantSorting.vue";
import buildQuery from "./utils/buildQuery";
import parseQuery from "./utils/parseQuery";

import CarSalesSingleRelated from "./components/carsalesRelated.vue";

Vue.use(UPagination);
Vue.use(Input);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Select);
//Vue.use(Pagination);
Vue.use(Option);

export default {
  name: "test",

  data() {
    return {
      page: null,
      siteName: this.$store.state.site.name,
      phone: this.$store.state.site.phone,
      footerVImage:"",
      selectedColourName:"",
      selectedColourImages:""
    };
  },

  components: {
    "filter-selected": FilterSelected,
    "filter-checkbox": FilterCheckBox,
    "filter-multiselect": FilterMultiselect,
    "filter-radio": FilterRadio,
    "filter-select": FilterSingle,
    "filter-slider": FilterSlider,
    "filter-text": FilterText,
    "variant-list": variantList,
    "variant-pagination": variantPagination,
    "variant-sorting": variantSorting,
    "variant-footer": variantListFooter,
    carRelated: CarSalesSingleRelated,

  },

  beforeCreate() {
    this.$store.dispatch("priceBuilder/loadData", this.$route.params.slug);
  },
  beforeUpdate() {
    this.initRouter();
  },

  computed: {
    filters() {
      return this.$store.state.priceBuilder.filters;
    },
    loading() {
      return this.$store.state.priceBuilder.loading;
    },
  },

  watch: {
    $route() {
      this.debounceInitRoouter(this);
    },
  },

  methods: {
    changeChildColour(cImages, cImages360, coulourName){
      this.selectedColourName = coulourName
      this.footerVImage = cImages
      this.selectedColourImages = {
        cImages, cImages360
      }
    },
    buttonColorChange(data){
      this.footerVImage = data.image
      this.selectedColourName = data.cName

    },
    uniqColours(colours){
      return this.vLodash.uniqBy(colours, (colour) => {
        return colour.colour_name;
      })
    },
    initRouter() {
      const { query } = this.$route;
      const selected = parseQuery(query, this.$store.state.priceBuilder);
      this.$store.dispatch("priceBuilder/setPreselect", selected);
      this.$store.dispatch("priceBuilder/setSelected", selected);

      const page = query.page && +query.page > 1 ? query.page : 1;
      this.$store.dispatch("setCurrentPage", +page);

      const dir = query.sortdir && query.sortdir === "desc" ? "desc" : "asc";
      this.$store.dispatch("priceBuilder/changeSortingDirection", dir);

      if (query.sortby) {
        const { sorting } = this.$store.state.priceBuilder;
        const { options } = sorting;
        const by = options[query.sortby] === undefined ? "position" : query.sortby;
        this.$store.dispatch("priceBuilder/changeSortingBy", by);
      }
    },

    debounceInitRoouter: debounce((vm) => vm.initRouter()),

    updateRouter(resetPage) {
      this.debounceInitRoouter(this, resetPage);
    },

    updateTherouter(resetPage) {
      this.debounceUpdateRoute(this, resetPage);
    },

    debounceUpdateRoute: debounce((vm, resetPage) => {
      if (resetPage) {
        vm.$store.dispatch("priceBuilder/setCurrentPage", 1);
      }
      vm.$store.dispatch("priceBuilder/setSelected");
      const query = buildQuery(vm.$store.state.priceBuilder);
      vm.$router.push({ query }, () => {});
    }, 100),
  },
};
</script>
<style scoped>
.vheight {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.94);
}
.vloader {
  top: 0;
  z-index: 9;
}
.spinner-grow {
  color: rgb(0, 30, 80) !important;
  display: inline-block;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: spinner-grow 0.75s linear infinite;
  animation: spinner-grow 0.75s linear infinite;
  width: 100px;
  height: 100px;
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
  }
}
.controlpanel {
  top: 40%;
  left: 0;
  font-size: 12px;
  max-width: 70px;
  padding: 7px;
  transform: translateX(0) !important;
  transition: 0.3s ease-out;
  z-index: 9;
}
.controlpanel-hide {
  transform: translateX(-125px) !important;
}
.toggle-bar-header .uk-navbar-nav > li > a {
  min-height: 50px;
}
.toggle-bar-header svg {
  bottom: -2px;
}
.filter-bar {
  padding: 20px 30px;
}
.variant-search-footer {
  display: flow-root;
  width: 100%;
  margin: 0 -15px;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #e9e9e9;
  background: #f5f6f7;
  z-index: 9;
}
.variant-search-footer .uk-button{
  width: 60%;
  margin: 0 10px;
}
@media (min-width: 960px) {
  .filter-bar.filter-bar-build {
    width: 430px;
    padding: 0 30px;
    /* border-right: 4px solid #e1e3e3; */
  }

}
@media (max-width: 960px) {
  .filter-bar {
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.filterlistvariants {
  position: sticky;
position: -webkit-sticky;
top: 0;
  margin-bottom: 90px !important;
}


.filter-variant-inner h4 {
  margin: 10px 0 10px 0 !important;
}
.filter-variant-inner .el-slider {
  padding: 0 10px;
}
.filter-selected-button.uk-button {
  padding: 0 10px;
}
.title-filter {
  font-size: 12px;
  margin: 3px 0;
}
.filter-bar.toggle-bar-visible {
  display: block !important;
  width: 100%;
  padding: 0;
  z-index: 999;
}
.features .uk-list > :nth-child(n + 2) {
  margin-top: 0;
}
.el-slider__bar {
  background-color: #090909;
}
.el-slider__button {
  border: 2px solid #090909;
}

img[lazy*='loading'], img[data-src][src*='data:image'] {
  position: relative;
  display: block;
  max-width: 100%;
  height: auto;
  min-height: 3rem;
  background-color: rgb(234 234 234 / 97%);
  animation: loading 0.8s infinite alternate;
}

@keyframes loading {
  to {
    background-color: rgb(234 234 234 / 27%);
  }
}



/* img[lazy*='loading'], img[data-src][src*='data:image']{
    border: 2px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2px solid #3498db;
    width: 34px;
    height: 34px;
    display: flex;
    align-content: center;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} */
</style>
