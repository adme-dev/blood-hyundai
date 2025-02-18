<template>
  <div v-if="vehicles" class="search-item-inner">
    <div class="uk-search uk-search-default uk-width-expand">
      <span uk-search-icon></span>
      <input 
        class="uk-input uk-form-large uk-border-rounded uk-search-input uk-width-expand" 
        :placeholder="option.displayName"
        v-model="inputValue" 
        @input="debounceInput" 
        ref="searchInput"
      >
      <button 
        v-if="inputValue" 
        class="uk-search-icon uk-search-icon-flip" 
        @click="clearInput"
        uk-icon="icon: close"
      ></button>
    </div>

    <!-- Display search results with pagination -->
    <ul v-if="paginatedResults.length" class="uk-list recently-search">
      <li v-for="result in paginatedResults" :key="result.stockid" class="uk-flex-1 a-card a-card-default uk-box-shadow-hover-small ">
        <router-link 
          :to="{ name: 'vehicle-for-sale', params: { slug: result.slug, id: result.id } }"
          class="uk-link-reset"
        >
          <div class="uk-grid-collapse uk-grid uk-flex-middle" @click="closeNav">
            <div class="recently-search-img uk-border-rounded uk-position-relative">
              <div 
                v-if="result.photos && result.photos.length" 
                class="uk-inline uk-width-1-1 recently-search-img uk-background-cover uk-border-rounded"
                :data-src="formatImageUrl(result.thumb)"
                data-uk-img
              ></div>
              <div 
                v-else 
                class="uk-inline uk-width-1-1 recently-search-img uk-background-cover uk-border-rounded"
                data-src="/comingsoon.jpg" 
                data-uk-img
              ></div>
            </div>
            <div class="uk-width-expand">
              <div class="recently-search-inner">
                <h3 class="uk-margin-remove-bottom">
                  {{ result.condition?.displayValue?.[0] }} {{ result.title }}
                </h3>
                <div class="uk-text-bold text-red">
                  <div v-if="result.wasprice" class="uk-text">
                    Was <s>${{ formatPrice(result.wasprice) }}</s>
                    Is Now ${{ formatPrice(result.price) }}
                  </div>
                  <div v-else-if="result.price">
                    <div class="uk-margin-remove">
                      ${{ formatPrice(result.price) }}<sup>*</sup>
                      <span>DRIVEAWAY</span>
                    </div>
                  </div>
                  <div v-else-if="result.egc_price">
                    <div class="uk-margin-remove">
                      ${{ formatPrice(result.egc_price) }}<sup>*</sup>
                      <span>Excl. Govt. Charges (EGC)</span>
                    </div>
                  </div>
                  <div v-else>
                    <div class="uk-margin-remove">P.O.A / Contact Us.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-controls">
      <button class="uk-button uk-button-small uk-button-secondary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="uk-button uk-button-small uk-button-secondary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus';
import { debounce } from 'lodash';
import Fuse from 'fuse.js';

export default {
  name: 'VehicleSearch',
  
  props: {
    option: {
      type: Object,
      default: () => ({
        displayName: "Search vehicles",
      }),
    },
    itemModel: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      inputValue: '',
      fuse: null,
      searchResults: [],
      currentPage: 1,
      resultsPerPage: 5, // Adjust this to set how many results per page
    };
  },

  created() {
    EventBus.$on('toggleDrawer', this.toggleDrawer);
  },
  
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    },

    // Compute the results to display on the current page
    paginatedResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      const end = start + this.resultsPerPage;
      return this.searchResults.slice(start, end);
    },

    // Calculate total pages based on search results and results per page
    totalPages() {
      return Math.ceil(this.searchResults.length / this.resultsPerPage);
    },
  },

  watch: {
    itemModel: {
      handler(newValue) {
        this.inputValue = newValue;
        this.debounceInput();
      },
      immediate: true,
    },
    
    vehicles: {
      handler(newVehicles) {
        if (newVehicles && newVehicles.length > 0) {
          this.initializeFuse();
        }
      },
      immediate: true,
    },
  },

  methods: {
    initializeFuse() {
      this.fuse = new Fuse(this.vehicles, {
        keys: [
          'title',
          'make.displayValue',
          'model.displayValue',
          'badge.displayValue',
          'year.displayValue',
          'color.displayValue',
          'body.displayValue',
          'stockid',
          'condition.displayValue',
          'search_keywords'
        ],
        includeScore: true,
        threshold: 0.3,
        minMatchCharLength: 2,
        useExtendedSearch: true,
      });
    },

    debounceInput: debounce(function() {
      this.search();
    }, 300),

    search() {
      if (!this.inputValue?.trim() || this.inputValue.trim().length < 2) {
        this.searchResults = [];
        return;
      }

      if (!this.fuse) {
        console.warn('Fuse.js not initialized');
        return;
      }

      const searchQuery = this.inputValue.trim().split(/\s+/).map(word => ({
        $or: [
          { title: word },
          { 'make.displayValue': word },
          { 'model.displayValue': word },
          { 'badge.displayValue': word },
          { 'year.displayValue': word },
          { 'color.displayValue': word },
          { 'body.displayValue': word },
          { stockid: word },
          { 'condition.displayValue': word },
          { search_keywords: word }
        ]
      }));

      const results = this.fuse.search({
        $and: searchQuery
      });

      this.searchResults = results.map(result => result.item);
      this.currentPage = 1; // Reset to the first page on new search
    },

    clearInput() {
      this.inputValue = '';
      this.searchResults = [];
      this.$refs.searchInput?.focus();
    },

    closeNav() {
      this.drawerVisible = false;
      EventBus.$emit('toggleDrawer', false);
    },

    formatPrice(value) {
      if (!value) return '0';
      return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    formatImageUrl(url) {
      if (!url) return '';
      return url.split('1920, 1080').join('280, 180');
    },

    // Pagination methods
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>


.uk-accordion-title {
font-size: 1.65rem;
line-height: 1.0;
}

.mobile-draw .uk-accordion-content a.mb-link {
font-size: 1.65rem;
}

.search-item-inner li {
  border-radius: 5px;
  background-color: rgba(244, 244, 244, 0.071);
  overflow: hidden;
}

.recently-search {
  margin-bottom: 3px;
  overflow: hidden;
}

.recently-search-inner {
  padding: 4px;
  margin: 0 8px 0;
}

.padding-xsmall {
  padding: 10px;
}

.recently-search-img {
  height: 120px;
  width: 160px;
}

.uk-search.uk-search-default {
  position: sticky;
  top: -40px;
  border-radius: 50px;
  z-index: 99999999;
}

.selectedVariants .uk-search.uk-search-default {
  background-color: #fff;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
}
</style>