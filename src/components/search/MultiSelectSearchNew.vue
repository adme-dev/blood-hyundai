<template>
  <div class="front-search">



    <div class="uk-padding-small uk-position-relative" style="z-index: 2;">
      <h1 class="uk-width-1-1 uk-h6 uk-margin-remove uk-text-center uk-text-bold text-space-33">{{ siteName }}</h1>
      <!-- <h2 class="uk-width-1-1 uk-heading-medium uk-margin-remove-top uk-text-center"> Get
        matched to
        your <div class="uk-text-bold"><b>perfect car.</b></div>

      </h2> -->







    </div>


    <!-- Top flowing bar -->
    <div class="flowing-bar uk-position-fixed uk-position-top uk-position-z-index uk-hidden">
      <div class="uk-flex uk-flex-center uk-grid">
        <div class="uk-width-expand uk-width-1-3@m uk-margin-small-top">
          <div class="uk-search uk-search-default uk-width-1-1 uk-background-default uk-border-pill uk-overflow-hidden">
            <span uk-search-icon class="uk-search-icon-flip uk-margin-small-right search-mag"></span>
            <input placeholder="Search vehicles" v-model="searchText"
              class="uk-form-large uk-input uk-border-pill uk-search-input uk-width-expand search-input-dark"
              ref="searchInput">
            <button v-if="searchText"
              class="uk-search-icon uk-search-icon-flip uk-search-close search-close uk-margin-medium-right"
              @click="clearSearchInput" uk-icon="icon: close"></button>
          </div>
        </div>
      </div>
    </div>



    <div class="uk-container uk-container-large uk-position-relative front-search-container" style="z-index: 2;">
      <div class="uk-container uk-container-large uk-border-rounded">



        <div class="uk-h1 uk-text-bold uk-margin-remove uk-text-center"><b>Discover</b> our Range</div>

        <div class="uk-width-1-1 uk-flex uk-flex-center uk-text-center">
          <div>
            <div
              class="uk-grid-small uk-text-large uk-text-center uk-child-width-1-1 uk-margin-small uk-margin-small-top uk-child-width-auto@s uk-grid uk-visible@l">
              <!-- Found: <b class="uk-text-primary">{{ filteredList.length }} Vehicles</b> -->
              <div @click="closeGlobalSearchSwitch()"><router-link to="/car-sales?page=1"
                  class="uk-button uk-button-small uk-border-pill uk-button-default">Total Vehicles:
                  <b>{{ totalVehicles }}</b> </router-link></div>
                  <div @click="closeGlobalSearchSwitch()"><router-link to="/car-sales?condition=new&page=1"
                  class="uk-button uk-button-small uk-border-pill uk-button-default">New Vehicles: <b>{{
                    newVehiclesCount }}</b></router-link></div>
              <div @click="closeGlobalSearchSwitch()"><router-link to="/car-sales?condition=demo&page=1"
                  class="uk-button uk-button-small uk-border-pill uk-button-default">Demo Vehicles: <b>{{
                    demoVehiclesCount }}</b></router-link></div>
              <div @click="closeGlobalSearchSwitch()"><router-link to="/car-sales?condition=used&page=1"
                  class="uk-button uk-button-small uk-border-pill uk-button-default">Used Vehicles: <b>{{
                    usedVehiclesCount }}</b></router-link></div>
            </div>
          </div>
        </div>

        <!-- 

          <div class="uk-width-1-1 uk-h6 uk-margin-remove uk-text-center"> Get matched to your perfect car <router-link
              to="/sell-my-car" class="" title="Sell My Car"><b class="uk-button uk-button-text"> or sell your
                car.</b></router-link></div> -->

        <div v-if="isFilterActive">
          <div class="uk-h3 uk-text-center uk-margin-small-top">
            Found <b>{{ filteredList.length }}</b> vehicle<span v-if="filteredList.length !== 1">s</span>
          </div>
        </div>

        <div v-else>
          <div class="uk-h3 uk-text-center uk-margin-small-top">
            <b>{{ filteredList.length }}</b> vehicles to explore
          </div>
        </div>


        <!-- External trigger buttons -->
        <div class="uk-width-1-1 uk-margin-bottom uk-hidden">
          <button @click="openDropdown('condition')" class="uk-button uk-button-default uk-margin-small-right">Open
            Condition</button>
          <button @click="openDropdown('make')" class="uk-button uk-button-default uk-margin-small-right">Open
            Make</button>
          <button @click="openDropdown('model')" class="uk-button uk-button-default">Open Model</button>
        </div>

        <div class="uk-width-1-1">

          <div class="search-select uk-padding-small uk-margin-small-bottom">

            <div class="uk-flex-center uk-container-expand uk-margin-auto">
              <div class="uk-grid-small uk-child-width-1-1 uk-grid">

                <!-- Condition Dropdown -->
                <div class="uk-width-1-1 uk-width-1-3@m uk-width-expand@l uk-margin-small-bottom">
                  <label class="uk-visible@l"><b>{{ computedConditions.length }} Vehicle Type{{
                    computedConditions.length !== 1 ? 's' : '' }}</b></label>
                  <el-select ref="conditionSelect" clearable multiple collapse-tags size="large"
                    popper-class="condition-dropdown adme-dropdown" v-model="filter.condition"
                    :placeholder="`All ${computedConditions.length} Vehicle Types`"
                    class="uk-width-1-1 elselect-condition" v-dropdown="'condition'"
                    @visible-change="(visible) => handleVisibleChange('condition', visible)">
                    <div class="uk-padding-small uk-light uk-hidden@m">
                      <div class="uk-h2 title uk-margin-remove">Avaliable Vehicle Types </div>
                      <hr class="uk-margin-small">
                      <div>
                        <b>Explore our great range of new, demonstrator, and pre-owned vehicles across our network of
                          dealerships.</b> 
                      </div>
                    </div>

                    <div class="floating-bar uk-animation-slide-bottom uk-hidden@m">
                      <button class="uk-button uk-button-secondary" @click="closeDropdown('condition')">
                        <span uk-icon="icon: close"> </span>
                      </button>
                      <button class="uk-button uk-button-primary" @click="nextDropdown('condition')">
                        Make <span uk-icon="icon: chevron-double-right"></span>
                      </button>
                    </div>

                    <el-option v-for="condition in computedConditions" :key="condition.value"
                      :label="condition.displayValue" :value="condition.value">
                      <span style="float: left" class="uk-margin-small-left uk-margin-auto-right">{{
                        condition.displayValue }}</span>
                      <span style="float: right; font-size: 13px">{{ condition.count }}</span>
                    </el-option>
                  </el-select>
                  <div class="uk-text-xsmall uk-text-muted uk-margin-small-left uk-hidden">Condition</div>
                </div>

                <!-- Make Dropdown -->
                <div class="uk-width-1-1 uk-width-1-3@m uk-width-expand@l uk-margin-small-bottom">
                  <label class="uk-visible@l"><b>{{ computedMakes.length }} Make{{ computedMakes.length !== 1 ? 's' : ''
                      }}</b></label>

                  <el-select ref="makeSelect" multiple collapse-tags v-model="filter.make"
                    popper-class="make-dropdown adme-dropdown" :placeholder="`All ${computedMakes.length} Makes`"
                    class="uk-width-1-1 elselect-make" v-dropdown="'make'"
                    @visible-change="(visible) => handleVisibleChange('make', visible)">
                    <div class="uk-h2 title uk-margin-remove uk-padding-small uk-light uk-hidden@m">
                      Avaliable Makes
                      <hr>
                    </div>
                    <div class="floating-bar uk-animation-slide-bottom uk-hidden@m">
                      <button class="uk-button" @click="prevDropdown('make')">
                        <span uk-icon="icon: chevron-double-left"></span> Condition
                      </button>
                      <button class="uk-button uk-button-secondary" @click="closeDropdown('make')">
                        <span uk-icon="icon: close"> </span>
                      </button>
                      <button class="uk-button uk-button-primary" @click="nextDropdown('make')">
                        Model <span uk-icon="icon: chevron-double-right"></span>
                      </button>
                    </div>


                    <el-option v-for="(make, index)  in computedMakes" :key="make.value" :label="make.displayValue"
                      :value="make.value">

                      <span style="float: left" class="uk-text-truncate uk-text-bold uk-margin-medium-right">
                        <img class="uk-margin-small-left uk-background-default" style="width:50px; border-radius: 8px"
                          :src="'https://driveagent.b-cdn.net/files/shared/badges/' + make.value.replace(/\s/g, '-').toLowerCase() + '.png'" />
                        <span class="uk-margin-small-left make-text-bold">{{ make.displayValue }}</span>
                      </span>
                      <span class="uk-margin-auto-left" style="float: right; font-size: 13px">{{ make.count }}</span>
                    </el-option>
                  </el-select>
                  <div class="uk-text-xsmall uk-text-muted uk-margin-small-left uk-hidden">Make</div>
                </div>


                <div class="uk-width-1-1 uk-width-1-3@m uk-width-expand@l uk-margin-small-bottom">
                  <label class="uk-visible@l">
                    <b>{{ computedModels.length }} Model{{ computedModels.length !== 1 ? 's' : '' }}</b>
                  </label>
                  <el-select ref="modelSelect" multiple collapse-tags v-model="filter.model"
                    popper-class="model-dropdown adme-dropdown" :placeholder="`All ${computedModels.length} Models`"
                    class="uk-width-1-1 elselect-model"
                    @visible-change="(visible) => handleVisibleChange('model', visible)">
                    <div class="floating-bar uk-animation-slide-bottom uk-hidden@m">
                      <button class="uk-button" @click="prevDropdown('model')">
                        <span uk-icon="icon: chevron-double-left"></span> Make
                      </button>
                      <button class="uk-button uk-button-secondary" @click="closeDropdown('model')">
                        <span uk-icon="icon: close"> </span>
                      </button>
                      <button class="uk-button uk-button-primary uk-text-bold" @click="searchQuery">
                        <svg class="uk-margin-small-right" width="20" height="20" viewBox="0 0 20 20" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>
                        Show {{ filteredList.length }} cars
                      </button>
                    </div>
                    <div v-for="(make, index) in groupedModels" :key="make.label" :label="make.label">
                      <div slot="title">
                        <div v-if="index === 0" class="uk-h2 title uk-margin-remove uk-padding-small uk-hidden@m">
                          Avaliable Models
                          <div class="uk-text-small">{{ siteName }}</div>
                          <hr>
                        </div>
                        <hr v-if="index > 0" class="uk-margin-small group-hr">
                        <div v-else class="uk-margin-small-top"></div>
                        <div class="uk-flex uk-flex-middle group-title uk-light uk-grid">
                          <div>
                            <img class="uk-margin-small-left uk-background-default badge-pill"
                              style="width:60px; border-radius: 8px; vertical-align: middle;"
                              :src="'https://driveagent.b-cdn.net/files/shared/badges/' + make.label.replace(/\s/g, '-').toLowerCase() + '.png'" />
                          </div>
                          <div class="uk-margin-auto-left uk-text-bold uk-margin-small-right">
                            {{ make.label }}
                            <sup class="uk-text-xsmall uk-text-muted uk-margin-small-bottom">
                              {{ make.options.length }}
                            </sup>
                          </div>
                        </div>
                      </div>
                      <el-option v-for="model in make.options" :key="model.value" :label="model.displayValue"
                        :value="model.value">
                        <span class="uk-text-truncate uk-margin-small-left uk-margin-auto-right">
                          {{ model.displayMake }} {{ model.value }}
                        </span>
                        <span style="float: right; font-size: 13px">
                          <span class="uk-text-muted uk-margin-small-right">{{ model.displayBody }}</span>
                          {{ model.count }}
                        </span>
                      </el-option>
                    </div>
                  </el-select>
                  <div class="uk-text-xsmall uk-text-muted uk-margin-small-left uk-hidden">Model</div>
                </div>

                <!-- <div class="uk-width-1-2 uk-width-expand@m uk-margin-small-bottom">
                  <label>Body Types</label>
                  <el-select clearable multiple collapse-tags v-model="filter.body" placeholder="All body types"
                    @change="onBodyChange" class="uk-width-1-1 elselect-model">
                    <el-option v-for="body in computedBodyTypes" :key="body.value" :label="body.displayValue"
                      :value="body.value">
                      <span style="float: left">{{ body.displayValue }}</span>
                      <span style="float: right; font-size: 13px">{{ body.count }}</span>
                    </el-option>
                  </el-select>
                  <div class="uk-text-xsmall uk-text-muted uk-margin-small-left uk-hidden">Body</div>
                </div> -->


                <div class="uk-width-1-1 uk-width-expand@m uk-margin-small-bottom">
                  <label class="uk-visible@l">Keyword</label>
                  <div class="uk-search uk-search-default uk-width-1-1 uk-border-rounded">
                    <span uk-search-icon class="uk-search-icon-flip uk-margin-small-right search-mag"></span>
                    <input placeholder="Search Keywords" v-model="searchText"
                      class="uk-form-large uk-input uk-border-rounded uk-search-input uk-width-expand search-input-dark"
                      ref="searchInput">
                    <button v-if="searchText"
                      class="uk-search-icon uk-search-icon-flip uk-search-close search-close uk-margin-medium-right"
                      @click="clearSearchInput" uk-icon="icon: close"></button>
                  </div>
                </div>


                <!-- <div class="uk-width-1-2 uk-width-expand@m uk-margin-small-bottom">
                  <label>Badge</label>
                  <el-select clearable multiple collapse-tags v-model="filter.badge" placeholder="All badges"
                    @change="onBadgeChange" class="uk-width-1-1 elselect-badge">
                    <el-option v-for="badge in computedBadges" :key="badge.value" :label="badge.displayValue"
                      :value="badge.value">
                      <span style="float: left">{{ badge.displayValue }}</span>
                      <span style="float: right; font-size: 13px">{{ badge.count }}</span>
                    </el-option>
                  </el-select>
                  <div class="uk-text-xsmall uk-text-muted uk-margin-small-left uk-hidden">Badge</div>
                </div> -->

                <div class="drop-searchbtn uk-width-1-1 uk-width-auto@m drop-search-btn">
                  <label class="uk-light uk-visible@l">Discover</label>
                  <button class="uk-button uk-h1 uk-button-primary uk-width-1-1" @click="searchQuery"><span
                      uk-icon="icon: chevron-double-right"></span> Show
                    {{
                      filteredList.length }} cars</button>
                </div>

              </div>

              <div class="uk-position-relative uk-width-1-1 uk-grid-collapse uk-margin-medium-top uk-visible@m uk-grid">

                <div class="uk-width-auto uk-margin-small-left">
                  <el-select clearable v-model="filter.body" :placeholder="`All ${computedBodyTypes.length} body types`"
                    class="elselect-body uk-light" popper-class="adme-dropdown">
                    <el-option v-for="body in computedBodyTypes" :key="body.value" :label="body.displayValue"
                      :value="body.value">
                      <span style="float: left" class="uk-margin-small-left">{{ body.displayValue }}</span>
                      <span style="float: right; font-size: 13px">{{ body.count }}</span>
                    </el-option>
                  </el-select>
                  <hr class="uk-margin-remove">
                </div>


                <!-- My Weekly Budget Slider -->
                <div class="uk-width-auto uk-margin-medium-left">
                  <div class="weekly-slider-wrap uk-grid-collapse uk-flex uk-flex-bottom uk-grid">
                    <div class="uk-text-bold">
                      <span>My Weekly Budget </span>
                      <span v-html="formattedPerWeekRange"></span>
                    </div>
                    <div class="uk-width-1-1 weekly-slider">
                      <el-slider v-model="perWeekRange" range :format-tooltip="formatTooltip"
                        :min="perWeekSliderOptions.min" :max="perWeekSliderOptions.max"
                        :step="perWeekSliderOptions.step" :marks="weeklyBudgetMarks" @change="onPerWeekChange"
                        tooltip-class="tooltip-class" class="uk-width-1-1 uk-margin-auto">
                      </el-slider>
                    </div>
                  </div>
                </div>

        
                <div v-if="isFilterActive" class="uk-position-bottom-right uk-text-center uk-margin-medium-top">
                  <button class="uk-button uk-button-secondary uk-border-pill" @click.prevent="resetFilters">Reset
                    All
                    Filters</button>
                </div>


              </div>


            </div>
          </div>


        </div>

      </div>
    </div>




    <!-- <div class="uk-text-center uk-margin-xlarge-top uk-flex uk-flex-center uk-grid-collapse uk-grid  uk-visible@">
                  <div class="uk-width-1-1 uk-margin-small-bottom"><b class="uk-h1">Popular Vehicles:</b></div>
                <div class="uk-h3">
                  <router-link v-for="(model, index) in topThreeModels" :key="index"
                class="uk-link"
                :to="`/car-sales/${model.make}/${model.model}`">
               
                <span class="uk-text-uppercase uk-margin-small-right"><b class="uk-text-small">{{
                model.make }} </b>{{
                  model.displayValue[0] }} </span>
              </router-link>
                </div>
              </div> -->


  </div>
</template>
<script>
// Remove Fuse import and add custom search
import { mapState, mapActions } from 'vuex';
import MetaMixin from '@/mixins/meta';
import Vue from 'vue';
import {
  Option,
  Select,
  Slider,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  OptionGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import { debounce, memoize } from 'lodash';

// Initialize Element UI
locale.use(lang);

// Register Element UI components
const elementComponents = [
  Select, Slider, Checkbox, CheckboxGroup,
  CheckboxButton, Dropdown, DropdownMenu,
  DropdownItem, Option, OptionGroup
];
elementComponents.forEach(component => Vue.use(component));

// Custom search utilities
// Custom search utilities
const createSearchIndex = memoize((vehicles) => {
  if (!vehicles?.length) return new Map();
  const searchIndex = new Map();

  vehicles.forEach(vehicle => {
    // Add condition to searchable text
    const searchableText = [
      vehicle.title,
      vehicle.stockid,
      vehicle.make?.displayValue?.[0],
      vehicle.model?.displayValue?.[0],
      vehicle.body?.displayValue?.[0],
      vehicle.fuel?.displayValue?.[0],
      vehicle.stockid?.displayValue?.[0],
      vehicle.badge?.displayValue?.[0],
      vehicle.year?.displayValue?.[0],
      vehicle.condition?.displayValue?.[0], // Added condition
      vehicle.search_keywords?.displayValue?.join(' ')
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const terms = searchableText
      .split(/[\s-]+/)
      .filter(term => term.length >= 2);

    terms.forEach(term => {
      if (!searchIndex.has(term)) {
        searchIndex.set(term, new Set());
      }
      searchIndex.get(term).add(vehicle.id);
    });
  });

  return searchIndex;
});

// Optimized search function remains the same
const searchVehicles = (vehicles, searchText, searchIndex) => {
  if (!searchText?.trim() || !vehicles?.length) return vehicles;

  const terms = searchText.toLowerCase().split(/[\s-]+/).filter(term => term.length >= 2);
  if (!terms.length) return vehicles;

  const termMatches = terms.map(term => {
    const exactMatches = searchIndex.get(term) || new Set();
    const partialMatches = new Set();

    searchIndex.forEach((vehicleIds, indexTerm) => {
      if (indexTerm.includes(term)) {
        vehicleIds.forEach(id => partialMatches.add(id));
      }
    });

    return new Set([...exactMatches, ...partialMatches]);
  });

  const matchingIds = new Set(termMatches[0]);
  for (let i = 1; i < termMatches.length; i++) {
    for (const id of matchingIds) {
      if (!termMatches[i].has(id)) {
        matchingIds.delete(id);
      }
    }
  }

  const results = vehicles
    .filter(vehicle => matchingIds.has(vehicle.id))
    .map(vehicle => {
      const score = calculateRelevanceScore(vehicle, terms);
      return { vehicle, score };
    })
    .sort((a, b) => b.score - a.score);

  return results.map(r => r.vehicle);
};

// Updated relevance scoring function with proper null checks
const calculateRelevanceScore = (vehicle, searchTerms) => {
  let score = 0;
  
  // Safely get display value
  const getDisplayValue = (field) => {
    if (!vehicle[field]?.displayValue?.[0]) return '';
    return vehicle[field].displayValue[0].toString().toLowerCase();
  };

  // Get all searchable text with condition included
  const text = [
    vehicle.title,
    getDisplayValue('make'),
    getDisplayValue('model'),
    getDisplayValue('body'),
    getDisplayValue('badge'),
    getDisplayValue('year'),
    getDisplayValue('condition'),
    Array.isArray(vehicle.search_keywords?.displayValue) 
      ? vehicle.search_keywords.displayValue.join(' ') 
      : ''
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  searchTerms.forEach(term => {
    // Exact word match
    if (new RegExp(`\\b${term}\\b`).test(text)) {
      score += 10;
    }

    // Start of any word
    if (text.startsWith(term)) {
      score += 8;
    }

    // Individual field matches
    const condition = getDisplayValue('condition');
    const make = getDisplayValue('make');
    const model = getDisplayValue('model');
    const body = getDisplayValue('body');

    if (condition && condition.includes(term)) score += 5;
    if (make && make.includes(term)) score += 5;
    if (model && model.includes(term)) score += 5;
    if (body && body.includes(term)) score += 5;
    if (vehicle.title && vehicle.title.toLowerCase().includes(term)) score += 5;

    // Partial match anywhere
    if (text.includes(term)) {
      score += 3;
    }
  });

  return score;
};



export default {
  name: 'VehicleList',
  mixins: [MetaMixin],

  directives: {
    dropdown: {
      bind(el, binding, vnode) {
        const type = binding.value;
        el.addEventListener('click', () => {
          vnode.context.openDropdown(type);
        });
      }
    }
  },

  data() {
    return {
      siteName: this.$store.state.site.name,
      manufacturer: this.$store.state.site.manufacturer,
      isModalVisible: false,
      filteredList: [],
      searchText: '',
      searchIndex: new Map(),
      filter: {
        condition: [],
        make: [],
        model: [],
        badge: [],
        body: [],
        wasprice: false,
        stock_special: false,
        dealer_special: false,
        tagNote: false,
      },
      priceRange: [0, 100000],
      sliderOptions: { min: 0, max: 0, step: 1500 },
      perWeekRange: [0, 1500], // Change this to null for initial state
      perWeekSliderOptions: {
        min: 0,
        max: 1500,
        step: 10
      },
      sortKey: 'price',
      sortOrder: 'ascending',
      currentPage: 1,
      itemsPerPage: 24,
      modalVehicleId: '',
      modalItem: {},
      lastViewedItemId: null,
      scrollPosition: 0,
      isRestoringState: false,
      itemSize: 300,
      dropdownVisibility: {
        condition: false,
        make: false,
        model: false
      },
      activeDropdown: null,
      dropdownOrder: ['condition', 'make', 'model']
    };
  },



  computed: {
    ...mapState(['vehicles', 'savedVehicles', 'searchState']),

    groupedModels() {
      const groups = {};
      if (this.computedModels) {
        this.computedModels.forEach(model => {
          if (!groups[model.displayMake]) {
            groups[model.displayMake] = {
              label: model.displayMake,
              options: []
            };
          }
          groups[model.displayMake].options.push({
            ...model,
            displayBody: model.displayBody || 'N/A'
          });
        });
      }
      return Object.values(groups).sort((a, b) => {
        if (a.label.toLowerCase() === 'hyundai') return -1;
        if (b.label.toLowerCase() === 'hyundai') return 1;
        return a.label.localeCompare(b.label);
      });
    },

    availableWeeklyRanges() {
      if (!this.vehicles?.length) return [];
      return this.vehicles
        .map(v => v.perweek)
        .filter(price => price != null)
        .sort((a, b) => a - b);
    },

    currentFilters() {
      return {
        condition: this.filter.condition,
        make: this.filter.make,
        model: this.filter.model,
        body: this.filter.body,
        priceRange: this.priceRange,
        perWeekRange: this.perWeekRange,
        searchText: this.searchText.trim()
      };
    },

    filteredVehiclesBase() {
      if (!this.isFilterActive) return this.vehicles;

      return this.vehicles?.filter(vehicle => {
        // Apply all filters
        if (this.filter.condition.length && 
            !this.filter.condition.includes(vehicle.condition?.displayValue[0])) return false;
            
        if (this.filter.make.length && 
            !this.filter.make.includes(vehicle.make?.displayValue[0])) return false;
            
        if (this.filter.model.length &&
            !this.filter.model.includes(vehicle.model?.displayValue[0])) return false;
            
        if (this.filter.body.length &&
            !this.filter.body.includes(vehicle.body?.displayValue[0])) return false;
            
        // Price range check  
        if (vehicle.price < this.priceRange[0] || vehicle.price > this.priceRange[1]) return false;
        
        // Per week range check
        if (vehicle.perweek < this.perWeekRange[0] || vehicle.perweek > this.perWeekRange[1]) return false;

        // Search text check
        if (this.searchText.trim()) {
          const searchResults = searchVehicles([vehicle], this.searchText.trim(), this.searchIndex);
          return searchResults.length > 0;
        }

        return true;
      }) || [];
    },

    totalVehicles() {
      return this.filteredVehiclesBase?.length || 0;
    },

    newVehiclesCount() {
      return this.filteredVehiclesBase?.filter(vehicle =>
        vehicle.condition?.displayValue[0] === 'New'
      ).length || 0;
    },

    demoVehiclesCount() {
      return this.filteredVehiclesBase?.filter(vehicle =>
        vehicle.condition?.displayValue[0] === 'Demo'
      ).length || 0;
    },

    usedVehiclesCount() {
      return this.filteredVehiclesBase?.filter(vehicle =>
        vehicle.condition?.displayValue[0] === 'Used'
      ).length || 0;
    },

    isFilterActive() {
      const filter = this.filter;
      return !!(
        filter.condition.length ||
        filter.make.length ||
        filter.model.length ||
        filter.badge.length ||
        filter.body.length ||
        this.searchText.trim() ||
        this.priceRange[0] !== this.sliderOptions.min ||
        this.priceRange[1] !== this.sliderOptions.max ||
        this.perWeekRange[0] !== this.perWeekSliderOptions.min ||
        this.perWeekRange[1] !== this.perWeekSliderOptions.max
      );
    },

    formattedPriceRange() {
      return `<b>${this.formatCurrency(this.priceRange[0])}</b> to <b>${this.formatCurrency(this.priceRange[1])}</b>`;
    },

    formattedPerWeekRange() {
      const inRangeCount = this.filteredVehiclesBase.filter(vehicle => 
        vehicle.perweek >= this.perWeekRange[0] && 
        vehicle.perweek <= this.perWeekRange[1]
      ).length;

      return `<b>${this.formatWeeklyAmount(this.perWeekRange[0])}</b> to <b>${this.formatWeeklyAmount(this.perWeekRange[1])}</b> per week (${inRangeCount} vehicles)`;
    },

    computedConditions() {
      return this.computeFilterOptions('condition', this.vehicles);
    },

    computedMakes() {
      const vehicles = this.getFilteredVehicles(['condition']);
      return this.computeFilterOptions('make', vehicles);
    },

    computedModels() {
      const vehicles = this.getFilteredVehicles(['condition', 'make']);
      return this.computeFilterOptions('model', vehicles);
    },

    filteredVehiclesForBody() {
      return this.vehicles?.filter(vehicle => {
        // Apply condition filter
        if (this.filter.condition.length && 
            !this.filter.condition.includes(vehicle.condition?.displayValue[0])) {
          return false;
        }
        
        // Apply make filter
        if (this.filter.make.length && 
            !this.filter.make.includes(vehicle.make?.displayValue[0])) {
          return false;
        }
        
        // Apply model filter
        if (this.filter.model.length &&
            !this.filter.model.includes(vehicle.model?.displayValue[0])) {
          return false;
        }

        // Apply price range filter
        if (vehicle.price < this.priceRange[0] || 
            vehicle.price > this.priceRange[1]) {
          return false;
        }

        // Apply weekly budget filter
        if (vehicle.perweek < this.perWeekRange[0] || 
            vehicle.perweek > this.perWeekRange[1]) {
          return false;
        }

        // Apply search text filter if present
        if (this.searchText.trim()) {
          const searchResults = searchVehicles([vehicle], this.searchText.trim(), this.searchIndex);
          return searchResults.length > 0;
        }

        return true;
      }) || [];
    },

    computedBodyTypes() {
      // Get filtered vehicles based on current filters (except body type)
      const vehicles = this.filteredVehiclesForBody;
      
      // Create a map to store body type counts
      const bodyTypeCounts = new Map();

      // Count occurrences of each body type
      vehicles.forEach(vehicle => {
        const bodyType = vehicle.body?.displayValue[0] || 'Unknown';
        bodyTypeCounts.set(bodyType, (bodyTypeCounts.get(bodyType) || 0) + 1);
      });

      // Convert to array and sort
      return Array.from(bodyTypeCounts.entries())
        .map(([value, count]) => ({
          value,
          displayValue: value,
          count
        }))
        .sort((a, b) => a.displayValue.localeCompare(b.displayValue));
    },

    weeklyBudgetMarks() {
      if (!this.filteredVehiclesBase?.length) return {};
      
      const prices = [...new Set(this.filteredVehiclesBase
        .map(v => v.perweek)
        .filter(p => p !== null && p !== undefined)
      )].sort((a, b) => a - b);
      
      const marks = {};
      if (prices.length) {
        marks[prices[0]] = this.formatCurrency(prices[0]);
        marks[prices[prices.length - 1]] = this.formatCurrency(prices[prices.length - 1]);
      }
      return marks;
    },

    topThreeModels() {
      const modelCounts = {};
      this.vehicles.forEach(vehicle => {
        const makeValue = vehicle?.make?.value?.[0];
        const modelValue = vehicle?.model?.value?.[0];
        const modelDisplayValue = vehicle?.model?.displayValue?.[0];

        if (makeValue && modelValue) {
          const modelKey = `${makeValue}-${modelValue}`;
          if (!modelCounts[modelKey]) {
            modelCounts[modelKey] = { 
              count: 0, 
              make: makeValue, 
              model: modelValue, 
              displayValue: modelDisplayValue 
            };
          }
          modelCounts[modelKey].count++;
        }
      });

      return Object.values(modelCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
        .map(item => ({ 
          make: item.make, 
          model: item.model, 
          displayValue: [item.displayValue] 
        }));
    }
    
  },
  watch: {
  '$route.params': {
    handler(newParams) {
      this.updateFiltersFromRoute(newParams);
    },
    immediate: true,
  },
  
  searchText: debounce(function () {
    this.applyFilters();
  }, 300),

  vehicles: {
    handler(newVehicles) {
      if (newVehicles?.length) {
        Promise.all([
          this.setSliderRange(),
          this.setPerWeekSliderRange(),
          this.initializeSearch()
        ]).then(() => this.applyFilters());
      }
    },
    immediate: true
  },
  
  'filter.condition': function () {
    this.applyFilters();
  },
  
  'filter.make': function () {
    this.applyFilters();
  },
  
  'filter.model': function () {
    this.applyFilters();
  },
  
  'filter.body': function () {
    this.applyFilters();
  },
  
  priceRange() {
    this.applyFilters();
  },
  
  perWeekRange() {
    this.applyFilters();
  }
},
  methods: {
    ...mapActions(['toggleSavedVehicle', 'saveSearchState', 'clearSearchState']),

    handleVisibleChange(type, visible) {
      if (visible) {
        this.activeDropdown = type;
      } else if (this.activeDropdown === type) {
        this.activeDropdown = null;
      }
    },

    openDropdown(type) {
      const select = this.$refs[`${type}Select`];
      if (select && this.activeDropdown !== type) {
        if (this.activeDropdown) {
          const previousSelect = this.$refs[`${this.activeDropdown}Select`];
          if (previousSelect) previousSelect.toggleMenu(); // Close the previous dropdown
        }
        this.$nextTick(() => {
          if (select) {
            select.toggleMenu(); // Open the desired dropdown
            this.activeDropdown = type;
          }
        });
      }
    },

    closeDropdown(type) {
      const select = this.$refs[`${type}Select`];
      if (select && this.activeDropdown === type) {
        select.toggleMenu(); // Close the dropdown
        this.activeDropdown = null;
      }
    },

    nextDropdown(currentType) {
      const dropdownOrder = ['condition', 'make', 'model'];
      const currentIndex = dropdownOrder.indexOf(currentType);
      if (currentIndex !== -1 && currentIndex < dropdownOrder.length - 1) {
        const nextType = dropdownOrder[currentIndex + 1];
        this.closeDropdown(currentType);
        this.openDropdown(nextType);
      }
    },

    prevDropdown(currentType) {
      const dropdownOrder = ['condition', 'make', 'model'];
      const currentIndex = dropdownOrder.indexOf(currentType);
      if (currentIndex > 0) {
        const prevType = dropdownOrder[currentIndex - 1];
        this.closeDropdown(currentType);
        this.openDropdown(prevType);
      }
    },

    toggleDropdown(type) {
      const select = this.$refs[`${type}Select`];
      if (select) {
        if (this.activeDropdown === type) {
          select.blur();
          this.activeDropdown = null;
        } else {
          if (this.activeDropdown) {
            const previousSelect = this.$refs[`${this.activeDropdown}Select`];
            if (previousSelect) previousSelect.blur();
          }
          this.$nextTick(() => {
            select.focus();
            this.activeDropdown = type;
          });
        }
      }
    },

    /**
     * Dynamically filters vehicles based on all active filters except the one excluded.
     * @param {String} excludeFilterType - The filter type to exclude from filtering.
     * @returns {Array} - The filtered list of vehicles.
     */
    getFilteredVehicles(filtersToApply) {
      return this.vehicles.filter(vehicle => {
        // Condition Filter
        if (filtersToApply.includes('condition') && this.filter.condition.length) {
          const vehicleCondition = vehicle.condition?.displayValue[0];
          if (!this.filter.condition.includes(vehicleCondition)) {
            return false;
          }
        }

        // Make Filter
        if (filtersToApply.includes('make') && this.filter.make.length) {
          const vehicleMake = vehicle.make?.displayValue[0];
          if (!this.filter.make.includes(vehicleMake)) {
            return false;
          }
        }

        // Model Filter
        if (filtersToApply.includes('model') && this.filter.model.length) {
          const vehicleModel = vehicle.model?.displayValue[0];
          if (!this.filter.model.includes(vehicleModel)) {
            return false;
          }
        }

        // Body Filter
        if (filtersToApply.includes('body') && this.filter.body.length) {
          const vehicleBody = vehicle.body?.displayValue[0];
          if (!this.filter.body.includes(vehicleBody)) {
            return false;
          }
        }

        // Price Range Filter
        if (vehicle.price < this.priceRange[0] || vehicle.price > this.priceRange[1]) {
          return false;
        }

        // Per Week Range Filter
        if (vehicle.perweek < this.perWeekRange[0] || vehicle.perweek > this.perWeekRange[1]) {
          return false;
        }

        return true;
      });
    },



    /**
     * Computes filter options based on the filter type and filtered vehicles.
     * @param {String} filterType - The type of filter ('condition', 'make', 'model', 'body').
     * @param {Array} vehicles - The list of filtered vehicles.
     * @returns {Array} - The computed filter options.
     */
    computeFilterOptions(filterType, vehicles) {
      let counts = {};
      vehicles.forEach((vehicle) => {
        if (filterType === 'model') {
          let displayValue = vehicle[filterType]?.displayValue[0] || 'Unknown';
          let displayMake = vehicle.make?.displayValue[0] || 'Unknown';
          let displayBody = vehicle.body?.displayValue[0] || 'Unknown';
          let combinedValue = `${displayMake} ${displayValue}`;
          if (!counts[combinedValue]) {
            counts[combinedValue] = {
              count: 0,
              displayBody: displayBody
            };
          }
          counts[combinedValue].count += 1;
        } else {
          let value = vehicle[filterType]?.displayValue[0] || 'Unknown';
          counts[value] = (counts[value] || 0) + 1;
        }
      });

      return Object.entries(counts)
        .map(([value, countInfo]) => {
          if (filterType === 'model') {
            let [displayMake, ...modelParts] = value.split(' ');
            let displayValue = modelParts.join(' ');
            return {
              value: displayValue,
              displayValue: value,
              displayMake,
              displayBody: countInfo.displayBody,
              count: countInfo.count,
            };
          } else {
            return {
              value,
              displayValue: value,
              count: countInfo,
            };
          }
        })
        .sort((a, b) => a.displayValue.localeCompare(b.displayValue));
    },

    /**
     * Applies all active filters to the vehicle list.
     */
    applyBasicFilters(vehicles) {
      return vehicles.filter((vehicle) => {
        const priceMatch =
          vehicle.price >= this.priceRange[0] && vehicle.price <= this.priceRange[1];
        const conditionMatch =
          !this.filter.condition.length ||
          this.filter.condition.includes(vehicle.condition?.displayValue[0]);
        const makeMatch =
          !this.filter.make.length ||
          this.filter.make.includes(vehicle.make?.displayValue[0]);
        const modelMatch =
          !this.filter.model.length ||
          this.filter.model.includes(vehicle.model?.displayValue[0]);
        const perWeekMatch =
          vehicle.perweek >= this.perWeekRange[0] &&
          vehicle.perweek <= this.perWeekRange[1];
        const bodyMatch =
          !this.filter.body.length ||
          this.filter.body.includes(vehicle.body?.displayValue[0]);

        return priceMatch && conditionMatch && makeMatch && modelMatch && perWeekMatch && bodyMatch;
      });
    },

    /**
     * Counts the number of vehicles matching a specific condition.
     * @param {String} condition - The condition to count ('New', 'Demo', 'Used').
     * @returns {Number} - The count of vehicles matching the condition.
     */
    countVehiclesByCondition(condition) {
      return this.vehicles
        ? this.vehicles.filter(vehicle =>
          vehicle.condition &&
          vehicle.condition.displayValue &&
          vehicle.condition.displayValue[0] === condition
        ).length
        : 0;
    },

    /**
     * Applies filters with debounce to optimize performance.
     */
    applyFilters() {
      this.filteredList = this.sortVehicles(this.filteredVehiclesBase);
    },

    // Helper method to safely get displayValue
    getDisplayValue(vehicle, property) {
      return vehicle[property]?.displayValue?.[0] || null;
    },

    /**
     * Sorts vehicles based on the current sort key and order.
     * @param {Array} vehicles - The list of vehicles to sort.
     * @returns {Array} - The sorted list of vehicles.
     */
    sortVehicles(vehicles) {
      return [...vehicles].sort((a, b) => {
        let valA = this.getValue(a, this.sortKey);
        let valB = this.getValue(b, this.sortKey);
        return this.sortOrder === 'ascending' ? valA - valB : valB - valA;
      });
    },

    /**
     * Retrieves the value of a specific key from a vehicle object for sorting.
     * @param {Object} vehicle - The vehicle object.
     * @param {String} key - The key to retrieve ('year', 'kilometres', 'price').
     * @returns {Number|String} - The value corresponding to the key.
     */
    getValue(vehicle, key) {
      if (key === 'year') return parseInt(vehicle.year.value[0]);
      if (key === 'kilometres') return parseInt(vehicle.kms);
      if (key === 'price') return parseFloat(vehicle.price);
      return vehicle[key];
    },
    initializeSearch() {
      this.searchIndex = createSearchIndex(this.vehicles);
    },

    // Update applyFilters to use new search
    applyFilters() {
      this.filteredList = this.sortVehicles(this.filteredVehiclesBase);
    },

    /**
     * Sets the price range slider based on vehicle prices.
     */
    setSliderRange() {
      const prices = this.vehicles.map((v) => v.price);
      this.sliderOptions.min = Math.min(...prices);
      this.sliderOptions.max = Math.max(...prices);
      this.priceRange = [this.sliderOptions.min, this.sliderOptions.max];
    },

    /**
     * Sets the per week range slider based on vehicle per week values.
     */
    setPerWeekSliderRange() {
      const perWeekValues = this.vehicles
        .map(vehicle => vehicle.perweek)
        .filter(value => value !== undefined && value !== null);

      if (perWeekValues.length > 0) {
        const min = Math.min(...perWeekValues);
        const max = Math.max(...perWeekValues);

        // Update slider options
        this.perWeekSliderOptions = {
          min,
          max,
          step: 10
        };

        // Only set initial range if not already set
        if (!this.perWeekRange[0] && !this.perWeekRange[1]) {
          this.perWeekRange = [min, max];
        }
      }
    },

    /**
     * Resets all filters to their default state.
     */
    resetFilters() {
      // Reset all filter values to default
      this.filter = {
        condition: [],
        make: [],
        model: [],
        badge: [],
        body: [],
        wasprice: false,
        stock_special: false,
        dealer_special: false,
        tagNote: false,
      };

      // Reset search text
      this.searchText = '';

      // Reset price range to min/max
      this.priceRange = [this.sliderOptions.min, this.sliderOptions.max];

      // Reset weekly budget range to min/max
      this.perWeekRange = [this.perWeekSliderOptions.min, this.perWeekSliderOptions.max];

      // Re-apply filters to update the view
      this.applyFilters();
    },

    /**
    * Formats a currency value with proper rounding and consistent formatting.
    * Used for both tooltips and display text.
    * @param {Number} value - The value to format.
    * @returns {String} - The formatted currency string.
    */
    formatCurrency(value) {
      if (value == null) {
        return '$0';
      }
      // Round the value to the nearest whole number
      const roundedValue = Math.round(value);

      // Format as AUD currency without decimals
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currencyDisplay: 'symbol' // Ensures simple $ symbol
      }).format(roundedValue);
    },

    /**
     * Direct tooltip formatter for the el-slider component.
     * Must format identically to other currency displays.
     */
    formatTooltip(value) {
      if (value == null) {
        return '$0';
      }
      // For tooltips, we need to ensure exact same formatting
      const roundedValue = Math.round(value);
      return `$${roundedValue}`;
    },

    /**
     * Weekly amount formatter used in the display text.
     */
    formatWeeklyAmount(value) {
      return this.formatCurrency(value);
    },


    /**
     * Handles changes in the price slider.
     * @param {Array} value - The new price range.
     */
    onChange(value) {
      this.priceRange = value;
      this.applyFilters();
    },

    /**
     * Clears the search input and reapplies filters.
     */
    clearSearchInput() {
      this.searchText = '';
      this.applyFilters();
    },


    /**
     * Converts a string to a slug format.
     * @param {String} str - The string to slugify.
     * @returns {String} - The slugified string.
     */
    slugify(str) {
      return str.toLowerCase().replace(/\s+/g, '-');
    },

    /**
     * Adds a query parameter to the router's query object.
     * @param {Object} query - The query object to modify.
     * @param {String} key - The key of the query parameter.
     * @param {String|Array} value - The value of the query parameter.
     */
    addQueryParam(query, key, value) {
      if (Array.isArray(value) && value.length) {
        query[key] = value.map(this.slugify).join(',');
      } else if (typeof value === 'string' && value.trim() !== '') {
        query[key] = this.slugify(value);
      }
    },

/**
   * Constructs and navigates to the search query route.
   * Handles special case for car-sales route, scrolls window to top,
   * and resets localStorage values.
   */
   searchQuery() {
  const query = {};

  // Check if only the 'make' filter is selected and no other filters are active
  const isOnlyMakeSelected =
    this.filter.make.length > 0 && // Make filter is active
    this.filter.condition.length === 0 && // No condition filter
    this.filter.model.length === 0 && // No model filter
    this.filter.body.length === 0 && // No body filter
    this.priceRange[0] === this.sliderOptions.min && // Price range is default
    this.priceRange[1] === this.sliderOptions.max && // Price range is default
    this.perWeekRange[0] === this.perWeekSliderOptions.min && // Weekly budget is default
    this.perWeekRange[1] === this.perWeekSliderOptions.max; // Weekly budget is default

  // Debugging: Log the state of filters and isOnlyMakeSelected
  console.log('isOnlyMakeSelected:', isOnlyMakeSelected);
  console.log('Filters:', this.filter);
  console.log('Price Range:', this.priceRange);
  console.log('Weekly Budget Range:', this.perWeekRange);

  // If only 'make' is selected, dynamically set search_keywords to the selected make
  if (isOnlyMakeSelected) {
    const selectedMake = this.filter.make[0]; // Get the first selected make
    query.search_keywords = this.slugify(selectedMake); // Slugify the selected make
  } else {
    // Otherwise, add all filters and search keywords as usual
    if (this.filter.condition.length > 0) {
      query.condition = this.filter.condition.map(this.slugify).join(',');
    }
    if (this.filter.make.length > 0) {
      query.make = this.filter.make.map(this.slugify).join(',');
    }
    if (this.filter.model.length > 0) {
      query.model = this.filter.model.map(this.slugify).join(',');
    }
    if (this.filter.body.length > 0) {
      query.body = this.filter.body.map(this.slugify).join(',');
    }
    if (this.searchText.trim() !== '') {
      query.search_keywords = this.slugify(this.searchText.trim());
    }
    if (this.priceRange[0] !== this.sliderOptions.min || this.priceRange[1] !== this.sliderOptions.max) {
      query.price = `${this.priceRange[0]},${this.priceRange[1]}`; // Price range doesn't need slugging
    }
    if (this.perWeekRange[0] !== this.perWeekSliderOptions.min || this.perWeekRange[1] !== this.perWeekSliderOptions.max) {
      query.perweek = `${this.perWeekRange[0]},${this.perWeekRange[1]}`; // Weekly budget doesn't need slugging
    }
  }

  // Add page parameter for car-sales route
  if (this.$route.path === '/car-sales') {
    query.page = 1; // Reset to first page when applying new filters
  }

  // Determine the target path
  const path = this.$route.path === '/car-sales' ? '/car-sales' : '/car-sales';

  // Debugging: Log the final query object
  console.log('Final Query:', query);

  // Navigate to the search results
  this.$router.push({ path, query })
    .then(() => {
      setTimeout(() => {
        // Reset localStorage values
        localStorage.setItem("pageSize", "12");
        localStorage.setItem('scrollPosition', "0");

        // Scroll to top after navigation is complete
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling for better UX
        });
      }, 100);
    })
    .catch((err) => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('Navigation error:', err);
      } else {
        // Even if navigation is duplicated, still scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

  // Close global search if it's open
  this.closeGlobalSearchSwitch();
},

/**
 * Slugify a string (convert to URL-friendly format).
 * @param {String} str - The string to slugify.
 * @returns {String} - The slugified string.
 */
slugify(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters (except hyphens)
},

  /**
   * Closes the global search interface and optionally passes selected item.
   * @param {Object} item - Optional selected item to pass to the store
   */
  closeGlobalSearchSwitch(item = null) {
    this.$store.dispatch("globalSearchSwitch", { 
      show: false, 
      item 
    });
  },
  
    /**
     * Updates filters based on route parameters.
     * @param {Object} params - The route parameters.
     */
    updateFiltersFromRoute(params) {
      const { condition, make, model, body } = params;

      if (condition && condition !== 'all') {
        const formattedCondition = this.formatFilterValue(condition, 'condition');
        this.filter.condition = [formattedCondition];
      } else {
        this.filter.condition = [];
      }

      if (make && make !== 'all') {
        const formattedMake = this.formatFilterValue(make, 'make');
        this.filter.make = [formattedMake];
      } else {
        this.filter.make = [];
      }

      if (model && model !== 'all') {
        const formattedModel = this.formatFilterValue(model, 'model');
        this.filter.model = [formattedModel];
      } else {
        this.filter.model = [];
      }

      if (body && body !== 'all') {
        const formattedBody = this.formatFilterValue(body, 'body');
        this.filter.body = [formattedBody];
      } else {
        this.filter.body = [];
      }

      this.$nextTick(() => {
        this.validateFilters();
        this.applyFilters();
      });
    },

    /**
     * Formats filter values based on their type.
     * @param {String} value - The value to format.
     * @param {String} filterType - The type of filter ('make', 'model', etc.).
     * @returns {String} - The formatted filter value.
     */
    formatFilterValue(value, filterType) {
      if (filterType === 'make' || filterType === 'model') {
        return value.toUpperCase();
      }
      return value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    },

    /**
     * Validates the current filters and resets invalid ones.
     */
    validateFilters() {
      let isValid = true;

      if (this.filter.condition.length > 0) {
        const validConditions = this.computedConditions.map((c) => c.value.toLowerCase());
        if (!validConditions.includes(this.filter.condition[0].toLowerCase())) {
          this.filter.condition = [];
          isValid = false;
        }
      }

      if (this.filter.make.length > 0) {
        const validMakes = this.computedMakes.map((m) => m.value.toLowerCase());
        if (!validMakes.includes(this.filter.make[0].toLowerCase())) {
          this.filter.make = [];
          isValid = false;
        }
      }

      if (this.filter.model.length > 0) {
        const validModels = this.computedModels.map((m) => m.value.toLowerCase());
        if (!validModels.includes(this.filter.model[0].toLowerCase())) {
          this.filter.model = [];
          isValid = false;
        }
      }

      if (this.filter.body.length > 0) {
        const validBodies = this.computedBodyTypes.map((b) => b.value.toLowerCase());
        if (!validBodies.includes(this.filter.body[0].toLowerCase())) {
          this.filter.body = [];
          isValid = false;
        }
      }

      if (!isValid) {
        this.$router.replace('/brighton').catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            console.error(err);
          }
        });
      }
    },

    /**
     * Capitalizes the first letter of a string.
     * @param {String} string - The string to capitalize.
     * @returns {String} - The capitalized string.
     */
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    /**
     * Applies additional filters based on lifestyle categories.
     * @returns {Array} - The filtered list of vehicles.
     */
    filterVehiclesByConditionAndMakeAndBody() {
      return this.filterVehiclesByConditionAndMake().filter(
        (vehicle) =>
          !this.filter.body.length ||
          this.filter.body.includes(vehicle.body?.displayValue[0])
      );
    },

    /**
     * Handles changes to the weekly budget slider.
     * @param {Array} value - The new per week range.
     */
    onPerWeekChange(value) {
      this.perWeekRange = value;
      this.applyFilters();
    },

    /**
     * Formats the tooltip value for the slider.
     * @param {Number} value - The value to format.
     * @returns {String} - The formatted tooltip string.
     */


    /**
     * Shows the enquiry modal for a specific vehicle.
     * @param {Object} item - The vehicle item.
     */
    showEnquiryModal(item) {
      this.modalVehicleId = item.stockid;
      this.modalItem = item;
      this.isModalVisible = true;
    },

    /**
     * Toggles the saved state of a vehicle.
     * @param {Object} item - The vehicle item.
     */
    toggleSave(item) {
      this.toggleSavedVehicle(item);
    },

    /**
     * Checks if a vehicle is saved.
     * @param {Object} item - The vehicle item.
     * @returns {Boolean} - True if saved, else false.
     */
    isSaved(item) {
      return this.savedVehicles.includes(item.stockid);
    },

    /**
     * Formats the price for display.
     * @param {Number} price - The price to format.
     * @returns {String} - The formatted price string.
     */
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },



    /**
     * Saves the current search state to Vuex.
     */
    saveCurrentState() {
      const state = {
        filter: this.filter,
        searchText: this.searchText,
        priceRange: this.priceRange,
        perWeekRange: this.perWeekRange,
        sliderOptions: this.sliderOptions,
        perWeekSliderOptions: this.perWeekSliderOptions,
        scrollPosition: window.pageYOffset || document.documentElement.scrollTop,
        lastViewedItemId: this.lastViewedItemId,
      };
      this.saveSearchState(state);
    },

    /**
     * Restores the search state from Vuex.
     */
    async restoreSearchState() {
      if (this.searchState) {
        this.isRestoringState = true;
        this.filter = this.searchState.filter;
        this.searchText = this.searchState.searchText;
        this.priceRange = this.searchState.priceRange;
        this.perWeekRange = this.searchState.perWeekRange;
        this.sliderOptions = this.searchState.sliderOptions || this.sliderOptions;
        this.perWeekSliderOptions =
          this.searchState.perWeekSliderOptions || this.perWeekSliderOptions;
        this.lastViewedItemId = this.searchState.lastViewedItemId;

        await this.applyFilters();
        await this.$nextTick();
        await this.scrollToLastViewedItem();
        this.isRestoringState = false;
      }
    },

    /**
     * Scrolls to the last viewed item or the saved scroll position.
     */
    async scrollToLastViewedItem() {
      if (this.lastViewedItemId) {
        const index = this.paginatedList.findIndex((item) => item.id === this.lastViewedItemId);
        if (index !== -1 && this.$refs.virtualScroller) {
          this.$refs.virtualScroller.scrollToItem(index);
        }
      } else if (this.searchState.scrollPosition) {
        window.scrollTo(0, this.searchState.scrollPosition);
      }
    },

    /**
     * Views a specific vehicle.
     * @param {Object} item - The vehicle item.
     */
    viewVehicle(item) {
      this.lastViewedItemId = item.id;
      this.saveCurrentState();
      this.$router.push({
        name: 'vehicle-for-sale',
        params: {
          id: item.id,
          slug: item.slug,
        },
      });
    },
  },
  mounted() {
    this.initializeSearch();

    // Wait for vehicles data
    if (this.vehicles?.length) {
      const perWeekValues = this.vehicles
        .map(v => v.perweek)
        .filter(v => v != null);

      if (perWeekValues.length) {
        const min = Math.min(...perWeekValues);
        const max = Math.max(...perWeekValues);

        // Set initial range
        this.perWeekRange = [min, max];
        this.perWeekSliderOptions = {
          min,
          max,
          step: 10
        };
      }
    }

    this.filteredList = [...this.vehicles];
    this.applyFilters();
  },

  beforeDestroy() {
    this.saveCurrentState();
    createSearchIndex.cache.clear();
  },
};
</script>



<style>
.front-search b {
  color: #1a78e4;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.front-search-box {
  align-items: center !important;
  background-color: #101010 !important;
  border-radius: 20px !important;
  display: flex;
  flex: none;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  justify-self: start;
  overflow: visible;
  padding: 32px !important;
  position: relative;
  text-decoration: none;
}

.front-search-box::before {
  content: '';
  position: absolute;
  border-radius: 20px;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  background: linear-gradient(45deg, rgb(128, 0, 28), rgb(187, 18, 20));
  z-index: -1;
  overflow: hidden;
}

.adme-dropdown.el-popper[x-placement^=bottom] .popper__arrow,
.adme-dropdown.el-popper[x-placement^=bottom] .popper__arrow {
  top: -8px !important;
  border-bottom-color: #1a78e4 !important;
}

.adme-dropdown.el-popper[x-placement^=top] .popper__arrow,
.adme-dropdown.el-popper[x-placement^=top] .popper__arrow {
  border-bottom-color: #1a78e4 !important;
}

.adme-dropdown.el-popper[x-placement^=bottom] .popper__arrow,
.adme-dropdown.el-popper[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: #1a78e4 !important;
}

.adme-dropdown.el-popper[x-placement^=top] .popper__arrow,
.adme-dropdown.el-popper[x-placement^=top] .popper__arrow::after {
  bottom: -4px !important;
  border-top-color: #1a78e4 !important;
}

.adme-dropdown .el-select-dropdown__item {
padding: 0 5px;
}

.elselect-body .el-select__caret.el-input__icon.el-icon-arrow-up,
.elselect-body .el-select__caret.el-input__icon.el-icon-circle-close {
  color: #1a78e4 !important;
}

.el-select-dropdown.el-popper.adme-dropdown {
  box-shadow: 0 28px 50px rgba(0, 0, 0, 0.95);
  transition: all 0.3s ease-in-out;
}


body.uk-overflow-hidden .el-select-dropdown.el-popper.adme-dropdown {
  z-index: 3 !important;
}

.el-select-dropdown.el-popper.adme-dropdown {
  border-radius: 20px;
  z-index: 99999
}

.max-18 {
  max-width: 1800px;
}

.el-select-group__wrap:not(:last-of-type)::after {
  background: #434343;
}

.el-select-group__title {
  display: none;
}

.el-tooltip__popper.is-dark {
  font-size: 24px;
  font-weight: 900;
  background: #151515;
  color: #fff;
  border: 2px solid #353535;
}

/* Faster blur animation */
@keyframes blur-animation {
  to {
    filter: blur(3vmin);
    transform: scale(1.05);
  }
}

/* Faster gradient animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.grd-txt {
  display: inline-block;
  vertical-align: baseline;
  user-select: none;
  font-size: 5vmin;
  /* Smaller font size */
  color: white;
  background-image: linear-gradient(to right, #626262, #fff);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.group-hr {
  border-top: 3px solid #232323;
}

.weekly-slider-wrap {
  position: relative;
  bottom: 12px;
}

.weekly-slider-wrap b {
  font-size: 36px;
}

.weekly-slider .el-slider__button {
  width: 15px;
  height: 15px;
}

.weekly-slider .el-slider__button-wrapper {
  height: 26px;
  width: 26px;
  top: -10px;
}

.weekly-slider .el-slider__marks-text {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-top: 18px;
}

.weekly-slider .el-slider__runway {
  margin: 6px 0
}

.group-title {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}

.lifesearch {
  position: relative;
  z-index: 2;
}

.scroller {
  height: 100%;
}

.front-search-container .el-select .el-input__inner::placeholder {
  color: white !important;
}

.front-search-container .elselect-body .el-input__inner::placeholder {
  color: #000 !important;
}

.el-scrollbar {
  border-radius: 20px;
}

.front-search-container .el-input--suffix .el-input__inner {
  background-color: transparent;
}

.search-select .el-input.is-focus .el-input__inner {
  border: 3px solid #1a78e4 !important;
}

.elselect-body .el-input--suffix .el-input__inner {
  border: none !important;
  padding: 0 !important;
  background-color: transparent !important;
}

.search-select .elselect-body .el-input.is-focus .el-input__inner {
  border: none !important;
}

.bg-muted {
  background-color: #e5eefb;
}

.flowing-bar {
  z-index: 99999999;
}

.adme-dropdown .el-select-dropdown__wrap {
  width: 350px;
}

.category-image {
  width: 100px;
  height: auto;
  cursor: pointer;
}

.el-popper[x-placement^=top] .popper__arrow::after {
  bottom: 0px;
  border-top-color: #1a78e4;
}

.results-wrap {
  background-color: #f3f1f1
}

.front-search .uk-search-input {
  padding-left: 20px !important;
}

.front-search .el-select .el-tag {
  padding: 20px;
}

.front-search .el-select .el-tag {
  color: #060606;
  background-color: #ffffff;
}

.front-search .el-select .el-tag__close.el-icon-close {
  top: 1px;
  background-color: #1a78e4;
  color: #fff;
}

.front-search .el-select .el-tag {
  width: auto
}


.el-select-dropdown.adme-dropdown  {
  border: 2px solid #1a78e4;
  border-radius: 20px;
  background-color: #101013;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  margin: 5px 0;
}

.adme-dropdown .el-select-dropdown__item {
  color: #f8f8f8;
  transition: .2s;
}


.front-search .el-tooltip,
.el-slider__button:hover {
  background: #fff !important;
  border: 4px solid #1a78e4;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .08);
}

.front-search .el-button,
.el-dropdown {
  font-size: 16px;
}

.search-select label {
  display: block;
  font-size: 26px;
  font-weight: 300;
  padding: 6px
}

.special-toggle {
  padding: 10px 15px;
  border-radius: 50px;
  margin-left: 20px;
  background: #910a2e54;
}

.special-toggle .el-switch__label * {
  font-size: 16px;
}

.special-toggle .el-switch__label {
  color: #ff5151 !important
}

.special-toggle .el-switch__label.is-active {
  color: #fff !important
}

.elselect-condition.el-select .el-input__inner,
.elselect-condition.el-select .el-input.is-focus .el-input__inner {
  padding: 25px;
  border-radius: 0;
  /* border-top-right-radius: 0;
  border-bottom-right-radius: 0; */
}

.elselect-make.el-select .el-input__inner,
.elselect-model.el-select .el-input__inner,
.elselect-badge.el-select .el-input__inner,
.elselect-make.el-select .el-input.is-focus .el-input__inner,
.elselect-model.el-select .el-input.is-focus .el-input__inner,
.elselect-badge.el-select .el-input.is-focus .el-input__inner {
  padding: 25px;
  border-radius: 0;
}

.el-input__inner,
.uk-search-input {
  border: 2px solid #d9dde4 !important;
  border-radius: 0;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #fff !important;
  padding-left: 15px;
  font-size: 400;
  border-radius: 10px;
  background-color: #1a78e4 !important;
}



.popular-v {
  position: relative;
  z-index: 2;
}

.el-select-dropdown__item.hover {
  background-color: #000;
}

.el-dropdown-menu.el-popper {
  border-radius: 20px;
}

.price-dropdown-select .el-tooltip.el-slider__button {
  border: 4px solid #1a78e4;
}

.el-select-dropdown.el-popper.is-multiple {
  border-radius: 20px;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  position: absolute;
  right: auto;
  left: 5px
}

.el-select-dropdown.is-multiple .el-select-dropdown__item {
  padding-right: 15px;
  padding-left: 0;
  margin: 3px 0;
}

.el-select__tags {
  flex-wrap: nowrap;
}

.el-select-dropdown__list {
  padding: 10px 10px 10px
}

.bg-muted .el-slider__runway {
  background-color: #979797;
}

.el-popper[x-placement^=bottom] .popper__arrow {
  top: -8px;
}

.bg-muted .el-slider__button-wrapper {
  z-index: 1;
}



.el-tag .el-icon-close {
  font-size: 18px;
  height: 25px;
  width: 25px;
  line-height: 24px;
}

.el-select-dropdown {
  min-width: 250px !important;
}

.el-select-dropdown__item {
  font-size: 16px;
}

.drop-search-btn .uk-button {
  min-width: 200px;
  font-size: 24px;
  letter-spacing: 1px;
  border-radius: 14px;
  padding: 14px 20px;
  background-color: #1a78e4 !important;
  border: #1a78e4 2px solid !important;
  /* border-top-left-radius: 0;
  border-bottom-left-radius: 0; */
}



.front-search .el-select .el-tag {
  max-width: 120px;
  border-radius: 11px
}

.front-search .el-select__tags {
  padding-left: 7px;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item {

  border-radius: 0;
}

.front-search-container {
  border-radius: 20px;
  position: relative;
}

.el-select-dropdown__item.selected {
  font-weight: 400;
}



#loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  /* Adjust the z-index value as needed */
}

.text-space-33 {
  letter-spacing: 3px;
}

.elselect input {
  color: #1a78e4 !important;
}

.default-dash .el-select.elselect .el-input__inner,
.default-dash .el-input__inner {
  padding: 25px;
  background-color: transparent !important;
  border: none !important;
}

.default-dash .el-slider__bar {
  background-color: #333 !important;
}

.front-search .el-slider__bar {
  background-color: #1a78e4 !important;
}

.front-search .el-slider:hover .el-slider__bar {
  background-color: #000 !important;
}

.front-search .el-slider:hover .el-slider__button {
  border: 4px solid #000;
}

.default-dash .uk-search-input {
  padding-left: 20px !important;
}

.search-mag {
  margin-top: 10px;
  height: 45px;
  border-left: 1px #303032 solid;
}

.front-search .el-input__inner,
.front-search .uk-search-input {
  border: 4px solid #303032 !important;
}

.front-search .uk-search-input:focus {
  border-color: #1a78e4 !important;
}

/* Using :not(:placeholder-shown) to check for value */
.front-search .uk-search-input:not(:placeholder-shown) {
  border-color: #1a78e4 !important;
  box-sizing: border-box;
}

/* Or using the more modern :has() selector */
.front-search:has(.uk-search-input[value]:not([value=""])) .uk-search-input {
  border-color: #1a78e4 !important;
  box-sizing: border-box;
}

.search-input-dark {
  height: 70px !important;
  border-radius: 20px !important;
  border-width: 3px !important;
}

.front-search .search-close {
  padding-right: 15px;
}

.link-box {
  cursor: pointer;
}

/* .uk-pagination .uk-button:not(:disabled) {
  color: #fff;
  background-color: black;
} */

.is-active {

  /* Light grey background for the active item */
  color: #1a78e4;
  /* Blue color for the text */
  font-weight: bold;
  /* Make text bold */
}

/* .vehicle-card .details-container {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s, visibility 0.3s;
}

.vehicle-card:hover .details-container {
  height: 0;
  width: 0;
}

.vehicle-card .image-container {
  transition: all 0.9s ease;
}

.vehicle-card:hover .image-container {
  height: 100%;
  width: 100%;
} */
.badge-pill {
  border-radius: 10px;
}

.border-radius-25 {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .1);
}

.price-dropdown {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.price-dropdown .el-dropdown {
  color: #000;
  font-size: 34px;
  font-weight: 300;
}




.front-search-container.cupped::before {
  content: '';
  position: absolute;
  border-radius: 20px;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  background: linear-gradient(45deg, rgb(128, 0, 28), rgb(187, 18, 20));
  z-index: -1;
  overflow: hidden;
}

.el-select-dropdown__wrap {
  max-height: 500px;
}

.front-search-container .el-icon-circle-close,
.front-search-containe .el-select .el-input .el-select__caret {
  color: #fff;
  font-size: 22px !important;
  margin: 1px 5px;
}

@media (min-width: 960px) {
  .el-select-dropdown.is-multiple .el-select-dropdown__item:hover {
    color: #fff !important;
    border-radius: 10px;
    background-color: #1a78e4 !important;
  }
}

@media (max-width: 960px) {

  .el-select-dropdown__item>span {
    font-size: 18px !important;
  }

  .el-select-dropdown__list {
    padding: 0 10px 100px;
  }

  .front-search-container.cupped {
    padding: 10px !important;
  }

  .icontxt {
    font-size: 1.0rem;
    line-height: 1.4;
  }

  .uk-text-meta.icontxtsm {
    font-size: 0.575rem;
  }

  .el-select-dropdown {
    border: transparent;
    background-color: #1010135c;
  }


  .el-select-dropdown.el-popper.is-multiple {
    border-radius: 0;
  }

  .el-select-dropdown.el-popper.is-multiple {
    min-width: 100% !important;
    height: 100%;
    /* height: 100svh; */
    position: fixed !important;
    top: auto !important;
    bottom: 0;
    left: 0 !important;
    right: 0;
    transform-origin: center;
    z-index: 2003;
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item {
    display: flex;
    height: 45px;
    margin: 10px 0;
    border-bottom-width: 1px !important;
    border-color: rgba(52, 52, 52, 0.425) !important;
    border-left-width: 1px !important;
    border-right-width: 1px !important;
    border-style: solid !important;
    border-top-width: 1px !important;
    align-items: center !important;
    background-color: #18181b !important;
    border-radius: 10px !important;
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    padding-left: 30px;
  }

  .group-hr {
    display: none;
  }

  .el-popper[x-placement^=bottom],
  .el-popper[x-placement^=top] {
    margin: 0;
  }

  .el-select-dropdown {
    transform-origin: bottom !important;
    align-items: center !important;
    background-color: #000 !important;
    border-radius: 0;
    margin: 0;
  }

  .el-scrollbar {
    border-radius: 0 !important;
    height: 100% !important;
  }

  .uk-h2.title {
    color: #fff;
  }

  .el-select-dropdown__wrap {

    background-color: transparent;
    border-radius: 0;
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item {
    padding-left: 5px;
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    left: 15px;
  }

  .el-select-dropdown__wrap {
    max-height: 100%;
    width: 100%;
  }

  .el-select-dropdown__item.selected .uk-text-muted.uk-margin-small-right {
    color: #fff !important;
  }

  b {
    color: #1a78e4;
  }


  .floating-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(51, 51, 51, 0.206);
    backdrop-filter: blur(10px);
    display: flex;
    padding: 10px;
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }


  .floating-bar button {
    flex-grow: 1;
    border: none;
    padding: 5px 0;
    font-size: 16px;
    border-radius: 10px;
    margin: 0 5px;
    transition: background-color 0.3s ease;
  }

  .floating-bar button.uk-button-primary,
  .floating-bar button.uk-button-primary:hover {
    background-color: #1a78e4 !important;
    color: #fff;
    border: 1px solid transparent;
  }

  .floating-bar button:active {
    opacity: 0.8;
  }

}

.weekly-slider .el-slider__marks {
  margin-top: 20px;
  /* Add more space for marks */
}

.weekly-slider .el-slider__marks-text {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  min-width: 45px;
  /* Ensure minimum width for the mark */
  text-align: center;
  transform: translateX(-50%);
  /* Center the mark */
  white-space: nowrap;
  /* Prevent wrapping */
}

/* Add spacing between marks if they're close */
.weekly-slider .el-slider__marks-text+.el-slider__marks-text {
  margin-left: 15px;
  /*Minimum space between marks */
}

.weekly-slider .el-slider__marks .el-slider__marks-text:first-child {
  margin-left: -15px;
}

/* Adjust mark position when they're too close */
.weekly-slider .el-slider__marks-text[style*="left: 15"] {
  transform: translateX(-100%);
  /* Move first mark fully to the left */
}

.weekly-slider .el-slider__marks-text[style*="left: 15"]+.el-slider__marks-text {
  transform: translateX(0);
  /* Move second mark fully to the right */
}
</style>
