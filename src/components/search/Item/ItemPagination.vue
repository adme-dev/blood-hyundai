<template>
  <div class="uk-width-1-1">
    <div 
      ref="loadMoreTrigger" 
      class="load-more uk-width-1-1"
      :class="{ 'is-loading': isLoading }"
    ></div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { eventBus } from "@/components/search/script.js";

const INITIAL_PAGE_SIZE = 12;

export default {
  name: 'InfiniteScroll',

  data() {
    return {
      lastScrollPos: parseInt(localStorage.getItem('scrollPosition')) || 0,
      isLoading: false,
      observer: null,
      shouldRestoreScroll: true
    };
  },

  computed: {
    total() {
      return this.$store.getters.totalVehiclesFound;
    },
    pageSize: {
      get() {
        return this.$store.state.search.page.size;
      },
      set(value) {
        if (value > 0 && value <= this.total) {
          this.$store.dispatch("setPageSize", value);
        }
      }
    }
  },

  watch: {
    '$store.state.search.selected'() {
      this.handleFilterChange();
    }
  },

  created() {
    // Set up event bus listeners
    eventBus.$on('resetFilters', this.handleReset);
  },

  mounted() {
    this.initIntersectionObserver();
    this.setupInitialState();
  },

  beforeDestroy() {
    this.cleanup();
  },

  methods: {
    setupInitialState() {
      const savedPageSize = localStorage.getItem('pageSize');
      if (savedPageSize) {
        this.$store.dispatch("setPageSize", parseInt(savedPageSize));
      }
      
      window.addEventListener("scroll", this.handleScroll, { passive: true });
      
      this.$nextTick(() => {
        this.restoreScrollPosition();
      });
    },

    handleIntersection: throttle(function(entries) {
      const entry = entries[0];
      if (entry.isIntersecting && !this.isLoading) {
        this.isLoading = true;
        this.$store.dispatch("setPageSize", this.pageSize + INITIAL_PAGE_SIZE)
          .finally(() => {
            this.isLoading = false;
          });
      }
    }, 100),

    handleScroll: throttle(function() {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - this.lastScrollPos) > 100) {
        this.saveScrollPosition(scrollY);
      }
    }, 100),

    saveScrollPosition: throttle(function(scrollY) {
      this.lastScrollPos = scrollY;
      localStorage.setItem('scrollPosition', scrollY.toString());
    }, 200),

    handleFilterChange() {
      this.shouldRestoreScroll = false;
      this.isLoading = false;
      
      this.$store.dispatch("setPageSize", INITIAL_PAGE_SIZE)
        .then(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          this.lastScrollPos = 0;
          localStorage.setItem('scrollPosition', '0');
          this.initIntersectionObserver();
        })
        .finally(() => {
          this.shouldRestoreScroll = true;
        });
    },

    handleReset() {
      this.isLoading = false;
      this.lastScrollPos = 0;
      localStorage.removeItem('scrollPosition');
      localStorage.removeItem('pageSize');
      
      this.$nextTick(() => {
        this.initIntersectionObserver();
      });
    },

    restoreScrollPosition() {
      if (!this.shouldRestoreScroll) return;

      const scrollPos = localStorage.getItem('scrollPosition');
      const isNavigatingBack = performance.getEntriesByType("navigation")[0]?.type === "back_forward";
      
      if ((isNavigatingBack || scrollPos) && scrollPos !== null) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: parseInt(scrollPos),
            behavior: 'instant'
          });
        });
      }
    },

    initIntersectionObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }

      if (!this.$refs.loadMoreTrigger) return;

      this.observer = new IntersectionObserver((entries) => {
        this.handleIntersection(entries);
      }, {
        root: null,
        rootMargin: '200px',
        threshold: 0.1
      });

      this.observer.observe(this.$refs.loadMoreTrigger);
    },

    cleanup() {
      eventBus.$off('resetFilters', this.handleReset);
      window.removeEventListener("scroll", this.handleScroll);
      
      if (this.observer) {
        this.observer.disconnect();
      }

      localStorage.setItem('pageSize', this.pageSize.toString());
      localStorage.setItem('scrollPosition', this.lastScrollPos.toString());
    }
  }
};
</script>

<style scoped>
.load-more {
  min-height: 20px;
  transition: opacity 0.3s ease;
}

.is-loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>