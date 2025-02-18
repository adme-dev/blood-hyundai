<template>
  <section class="filter-item-inner uk-width-1-1" itemscope itemtype="https://schema.org/ItemList">
    <!-- Add meta title for SEO -->
    <meta itemprop="name" content="Vehicle Filter Results" />
    
    <!-- Header section -->
    <header class="filter-item-selected uk-child-width-1-2 uk-grid-collapse uk-width-1-1 uk-grid">
      <div>
        <span class="uk-margin-small-right uk-float-left nav-filters" uk-icon="icon: settings" aria-label="Filter settings"></span>
        <h2 class="uk-h4 uk-margin-remove">Filters</h2>
      </div>

      <div class="uk-text-right uk-animation-fade" v-if="hasItems">
        <button 
          class="uk-button uk-button-default uk-button-small tm-button-default navy-background-secondary clearAll"
          @click="clearAll"
          aria-label="Clear all filters">
          Clear all
        </button>
      </div>
    </header>

    <!-- Filter items list -->
    <div class="uk-margin-small-top" role="list" aria-label="Selected filters">
      <div 
        class="selected-item-toolbar" 
        v-for="(item, index) in items" 
        :key="item.id" 
        @click="remove(item)"
        itemscope 
        itemtype="https://schema.org/ListItem"
        role="listitem">
        
        <div class="uk-flex uk-flex-middle uk-width-1-1 uk-text-left uk-inline-clip selected-remove uk-button uk-button-small selected-item-btn uk-button-default btn-round uk-icon">
          <!-- Car make filter -->
          <template v-if="item.displayMake">
            <img 
              style="width:38px" 
              :src="getBadgeSrc(item.displayMake)" 
              :alt="`${item.displayMake} badge`"
              itemprop="image" />
            <span itemprop="name">{{ item.displayMake }}:</span>
            <strong class="uk-text-primary uk-margin-small-left" itemprop="value">{{ item.displayValue }}</strong>
          </template>

          <!-- Color filter -->
          <template v-else-if="item.displayName === 'Colour'" class="uk-flex uk-flex-middle">
            <span 
              class="facetwp-colors swatch-sel" 
              :style="'background-color: ' + item.value"
              :aria-label="`Color: ${item.displayValue}`"></span>
            <span itemprop="name">{{ item.displayName }}:</span>
            <strong class="uk-text-primary uk-margin-small-left" itemprop="value">{{ item.displayValue }}</strong>
          </template>

          <!-- Body type filter -->
          <template v-else-if="item.displayName === 'Body'">
            <img 
              style="width:38px" 
              :src="getBodySrc(item.displayValue)" 
              :alt="`${item.displayValue} body type`"
              itemprop="image" />
            <span itemprop="name">{{ item.displayName }}:</span>
            <strong class="uk-text-primary uk-margin-small-left" itemprop="value">{{ item.displayValue }}</strong>
          </template>

          <!-- Other filters -->
          <template v-else>
            <span class="uk-margin-small-left" itemprop="name">{{ item.displayName }}:</span>
            <strong class="uk-text-primary uk-margin-small-left" itemprop="value">{{ item.displayValue }}</strong>
          </template>

          <!-- Remove button -->
          <button 
            class="uk-position-center-right" 
            type="button" 
            uk-close 
            :aria-label="`Remove ${item.displayName} filter`"></button>
        </div>

        <!-- Hidden meta for search engines -->
        <meta itemprop="position" :content="index + 1" />
      </div>
    </div>

    <!-- Structured data for search engines -->
    <script type="application/ld+json" v-if="hasItems">
      {{
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
              '@type': 'Thing',
              'name': item.displayName,
              'value': item.displayValue
            }
          }))
        })
      }}
    </script>
  </section>
</template>
<script>
import { formatNumber } from "@/utils";
import { eventBus } from "@/components/search/script.js";
export default {
  name: "filter-selected",
  computed: {
    items() {
      const { format } = this.$store.state;
      const { selected, filters } = this.$store.state.search;
      const items = [];
      this.vLodash.each(selected, (value, key) => {
        const filterItem = this.vLodash.find(filters, (f) => f.name === key);
        if (filterItem) {
          const { displayName, type, name } = filterItem;
          if (type === "text") {
            items.push({
              type,
              name,
              value,
              displayName,
              displayValue: value,
            });
          }

          if (type === "slider") {
            const [min, max] = value;
            const formatedMin = formatNumber(min, key, format);
            const formatedMax = formatNumber(max, key, format);
            items.push({
              type,
              name,
              displayName,
              displayValue: `${formatedMin} - ${formatedMax}`,
            });
          }

          if (type === "date") {
            const [start, end] = value;
            items.push({
              type,
              name,
              value,
              displayName,
              displayValue: `From ${start} to ${end}`,
            });
          }

          if (type === "radio" || type === "select") {
            const { data } = filterItem;

            const { displayValue } = this.vLodash.find(data, (i) => i.value === value);
            items.push({
              type,
              name,
              value,
              displayName,
              displayValue,
            });
          }

          if (type === "checkbox" || type === "multiselect") {
            const { data } = filterItem;
            this.vLodash.each(value, (val) => {
              const filterData = this.vLodash.find(data, (i) => i.value === val);
              if (!this.vLodash.isEmpty(filterData)) {
                const { displayValue, displayMake } = this.vLodash.find(data, (i) => i.value === val);
                items.push({
                  type,
                  name,
                  value: val,
                  displayName,
                  displayMake,
                  displayValue,
                });
              }
            });
          }
        }
      });
      return items;
    },
    hasItems() {
      return this.items.length > 0;
    }
  },

  methods: {
    getBadgeSrc(displayMake) {
      return `https://driveagent.b-cdn.net/files/shared/badges/${displayMake.replace(/\s/g, '-').toLowerCase()}.png`;
    },
    getBodySrc(displayValue) {
      return `https://driveagent.b-cdn.net/files/shared/body/${displayValue.replace(/\s/g, '-').toLowerCase()}.png`;
    },
    groupedMakes(filteredSegments) {
      var makes = {};
      filteredSegments.forEach((item) => {
        makes[item.displayMake] = makes[item.displayMake] || [];
        makes[item.displayMake].push(item);
      });
      return makes;
    },
async clearAll() {
      try {
        // Emit reset event before clearing filters
        eventBus.$emit("resetFilters");
        
        // Clear filters
        this.remove(this.items);
        eventBus.$emit("resetSlider");
        
        // Reset page size to initial value
        await this.$store.dispatch("setPageSize", this.$store.state.search.page.sizes[0]);
        
        // Clear query parameters and scroll to top
        await this.$router.push({ 
          path: '/car-sales', 
          query: {} 
        });
        
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        
        // Clear stored scroll and page size
        localStorage.removeItem('scrollPosition');
        localStorage.removeItem('pageSize');
        
        // Force a refresh of the infinite scroll
        eventBus.$emit("refreshInfiniteScroll");
      } catch (error) {
        console.error('Error clearing filters:', error);
      }
    },

    remove(item) {
      const { type, name, value } = item;
      if (type === "checkbox" || type === "multiselect") {
        this.$store.dispatch("deselectOnMultiple", { name, value });
      } else {
        this.$store.dispatch("deselect", { name });
      }
      this.$emit("click");
    }
  },
};
</script>
<style scoped>
.swatch-sel {
  width: 16px;
  height: 16px;
  margin: 0;
  left: 16px;
  margin: 0 10px
}
</style>