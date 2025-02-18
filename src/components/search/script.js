import Vue from 'vue';
import Meta from 'vue-meta';
import { Input, Slider, Switch, Checkbox, Select, Option } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import UPagination from 'vuejs-uib-pagination';
import { PageService } from '@/services';
import MetaMixin from '@/mixins/meta';
import { buildQuery } from '@/utils';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

// Constants
const GALLERY_MODE_KEY = 'galleryMode';
const RECENTLY_VIEWED_KEY = 'recentlyViewedVehicles';
const DEFAULT_PAGE_SIZE = 12;
const INITIAL_STATE = {
  layout: 'grid-view',
  galleryMode: 'gallery',
  modalVehicleId: '',
  modalItem: {},
  selectedMake: '',
  condition: '',
  body: '',
  pageTitle: '',
  isInitialized: false,
  isLoading: false,
};

// Lazy-loaded components
const componentImports = {
  PageSchema: () => import('@/components/page-elements/PageSchema'),
  ItemSorting: () => import('./Item/ItemSorting'),
  FilterSelected: () => import('./Filters/FilterSelected'),
  FilterText: () => import('./Filters/FilterText'),
  FilterSlider: () => import('./Filters/FilterSlider'),
  FilterCheckbox: () => import('./Filters/FilterCheckBox'),
  FilterSelect: () => import('./Filters/FilterSelect'),
  FilterMultiselect: () => import('./Filters/FilterMultiselect'),
  ItemList: () => import('./Item/ItemList'),
  ItemGrid: () => import('./Item/ItemGrid'),
  ItemPagination: () => import('./Item/ItemPagination'),
  DynamicBreadcrumb: () => import('./Item/DynamicBreadcrumb'),
  ViewedVehicles: () => import('@/components/search/CarSales/ViewedVehicles'),
  VehicleEnquiry: () => import('@/components/search/VehicleEnquiry'),
  VehicleEnquiryGallery: () => import('@/components/search/VehicleEnquiryGallery'),
  SavedList: () => import('@/components/search/CarSales/SavedList'),
  RecentlySeenSlider: () => import('@/components/search/CarSales/RecentlySeenSlider'),
  SearchPopUp: () => import('@/components/search/CarSales/searchPopUp'),
};

// Element UI Setup
[Input, Slider, Switch, Checkbox, Select, Option].forEach(component => {
  Vue.use(component);
});
locale.use(lang);
Vue.use(Meta);
Vue.use(UPagination);

// Event Bus
export const eventBus = new Vue();
window.eBus = eventBus;

export default {
  name: 'CarSales',
  mixins: [MetaMixin],

  components: componentImports,

  data() {
    return {
      ...INITIAL_STATE,
      page: null,
      layout: localStorage.getItem(GALLERY_MODE_KEY) === 'gallery' ? 'grid-view' : 'list-view',
      galleryMode: localStorage.getItem(GALLERY_MODE_KEY) || 'gallery',
      recentlyVieweditems: [],
    };
  },

  metaInfo() {
    return this.generateMetaInfo();
  },

  computed: {
    siteName() {
      return this.$store.state.site.name;
    },

    showroom_address() {
      return this.$store.state.site.showroom_address;
    },

    vehicles() {
      return this.$store.state.vehicles;
    },

    fetchData() {
      const { filters } = this.$store.state.search;
      return Object.keys(filters).length < 1 || !this.vehicles.length;
    },

    savedVehiclesCount() {
      return this.$store.state.savedVehicles.length || 0;
    },

    filters() {
      return this.$store.state.search.filters;
    },

    savedItemslocalStorage() {
      const vehicleIds = this.$store.state.savedVehicles;
      return this.vehicles.filter(vehicle => vehicleIds.includes(vehicle.id));
    },

    foundResultText() {
      const total = this.$store.getters.totalVehiclesFound;
      return `${total} ${total === 1 ? 'Vehicle' : 'Vehicles'} found`;
    },

    savedVehiclesText() {
      const count = this.savedVehiclesCount;
      if (count === 0) return 'No Vehicles saved';
      return `${count} ${count === 1 ? 'Vehicle' : 'Vehicles'} saved`;
    },
  },

  watch: {
    '$route.params': {
      handler: debounce(async function() {
        this.isLoading = true;
        try {
          await this.handleRouteChange();
        } finally {
          this.isLoading = false;
        }
      }, 250),
      immediate: true,
    },

    galleryMode: {
      handler(newValue) {
        localStorage.setItem(GALLERY_MODE_KEY, newValue);
        this.updateLayout();
      },
    },
  },

  async created() {
    try {
      await Promise.all([
        this.initializeSearch(),
        this.$store.dispatch('initializeFromUrl'),
      ]);
    } catch (error) {
      console.error('Error during component creation:', error);
      // Handle error appropriately (show user notification, etc)
    }
  },

  mounted() {
    this.updateLayout();
    this.loadRecentlyViewedVehicles();
  },

  beforeDestroy() {
    this.$store.dispatch('globalSearchSwitch', { show: false, null: null });
  },

  methods: {
    generateMetaInfo() {
      const pathSegments = this.$route.path.split('/');
    let title = 'Cars for Sale';
    let description = this.page?.excerpt.rendered || this.siteName;
    let canonicalUrl = `${window.location.origin}${this.$route.path}`;
    const totalVehicles = this.$store.getters.totalVehiclesFound;
    const countPrefix = totalVehicles > 0 ? `${totalVehicles} ` : '';

    // First check for make/model in URL path
    if (pathSegments[1] === 'car-sales' && pathSegments.length >= 4) {
      this.$store.commit("SET_CURRENT_PAGE", 1);
      const make = pathSegments[2];
      const model = pathSegments[3];
      
      title = `${countPrefix}${make.charAt(0).toUpperCase() + make.slice(1)} ${model.charAt(0).toUpperCase() + model.slice(1)} for Sale | ${this.showroom_address}`;
      this.pageTitle = `${countPrefix}${make.charAt(0).toUpperCase() + make.slice(1)} ${model.charAt(0).toUpperCase() + model.slice(1)} for Sale at ${this.siteName} | ${this.showroom_address}`;
    } 
    // Check for query parameters
    else if (Object.keys(this.$route.query).length > 0) {
      const { condition, body, make, model } = this.$route.query;
      let titleParts = [];
      
      // Add condition if present
      if (condition) {
        titleParts.push(condition.charAt(0).toUpperCase() + condition.slice(1));
      }

      // Add make/model if present
      if (make && model) {
        titleParts.push(`${make.charAt(0).toUpperCase() + make.slice(1)} ${model.charAt(0).toUpperCase() + model.slice(1)}`);
      } else if (model) {
        titleParts.push(model.charAt(0).toUpperCase() + model.slice(1));
      }

      // Add body type if present
      if (body) {
        titleParts.push(body.charAt(0).toUpperCase() + body.slice(1));
      }

      // Add "Cars" if we don't have a specific model
      if (!model) {
        titleParts.push('Cars');
      }

      if (titleParts.length > 0) {
        // Join all parts with spaces and add count prefix
        title = `${countPrefix}${titleParts.join(' ')} for Sale | ${this.siteName} | ${this.showroom_address}`;
      } else {
        title = `${countPrefix}Cars for Sale | ${this.siteName} | ${this.showroom_address}`;
      }
      this.pageTitle = title;
    }
    // Default case
    else {
      title = `${countPrefix}Cars for Sale | ${this.siteName} | ${this.showroom_address}`;
      this.pageTitle = title;
    }

    return {
      title: title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: description
        },
        {
          vmid: "canonical",
          rel: "canonical",
          href: canonicalUrl
        }
      ]
    };
    },

    generatePageTitle(pathSegments, query, countPrefix) {
      if (this.isMakeModelPath(pathSegments)) {
        return this.generateMakeModelTitle(pathSegments, countPrefix);
      }
      return this.generateQueryBasedTitle(query, countPrefix);
    },

    async handleRouteChange() {
      try {
        await Promise.all([
          this.getPage('car-sales'),
          this.initializeSearch(),
        ]);
        
        this.condition = this.$route.query.condition || '';
        this.body = this.$route.query.body || '';
        this.isInitialized = false;
      } catch (error) {
        console.error('Error handling route change:', error);
        throw error;
      }
    },

    async getPage(pageName) {
      try {
        const existingPage = this.$store.state.viewedPages.find(p => p.name === pageName);
        
        if (existingPage) {
          this.page = existingPage.data;
          return;
        }

        const data = await PageService.getPageBySlug(pageName);
        await this.$store.dispatch('setViewedPages', { name: pageName, data });
        this.page = data;
      } catch (error) {
        console.error('Error fetching page:', error);
        throw error;
      }
    },

    async initializeSearch() {
      if (this.isInitialized) return;

      try {
        if (this.fetchData) {
          await this.storeCarsalesData();
        }

        await this.initializeFromUrl();
        this.isInitialized = true;
      } catch (error) {
        console.error('Error initializing search:', error);
        throw error;
      }
    },

    async initializeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlParams.entries());

      this.$store.state.search.selected = {};
      await this.$store.dispatch('setPageSize', DEFAULT_PAGE_SIZE);

      if (Object.keys(params).length) {
        await this.$store.dispatch('setSelectedFromQueryParams', params);
      }

      this.condition = this.$route.query.condition || '';
      this.body = this.$route.query.body || '';
    },

    storeCarsalesData() {
      return Promise.all([
        this.$store.dispatch('fetchInitialData'),
        this.$store.dispatch('fetchSearchFromVehicles'),
      ]);
    },

    loadRecentlyViewedVehicles() {
      this.recentlyVieweditems = JSON.parse(
        localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]'
      );
    },

    async pushFilterSelectionsToRouter() {
      try {
        await this.$store.dispatch('setCurrentPage', 1);
        const routerQueries = this.$route.query;
        const builtQueries = buildQuery(this.$store.state.search);

        if (!isEqual(routerQueries, builtQueries)) {
          await this.$router.push({ query: builtQueries });
        }
      } catch (error) {
        console.error('Error updating filters:', error);
      }
    },

    showModal() {
      this.$store.dispatch('resultsSearchSwitch', { show: true });
    },

    async clearAll() {
      try {
        this.$store.state.search.selected = {};
        await this.$router.push({ path: '/car-sales', query: {} });
        window.scrollTo(0, 0);
        await this.$store.dispatch('setPageSize', DEFAULT_PAGE_SIZE);
      } catch (error) {
        console.error('Error clearing filters:', error);
      }
    },

    updateLayout() {
      const isList = this.layout === 'list-view';
      document.body.classList.toggle('list-view', isList);
      document.body.classList.toggle('grid-view', !isList);
    },

    closeTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    removeFromSaves(item) {
      this.$store.dispatch('removeFromSavedVehicles', item);
    },
  },
};