<template>
  <div class="filter-item-inner">
    <h4 class="uk-margin-small-bottom">{{ option.displayName }}</h4>
    <el-input 
      :label="option.displayName" 
      :placeholder="option.displayName"
      v-model="inputValue"
      @input="debounceInput"
      @clear="handleClear"
      prefix-icon="el-icon-search"
      autocomplete="off"
      clearable>
    </el-input>
    <div v-if="searchSuggestions.length && inputValue" class="search-suggestions uk-box-shadow-medium">
      <div 
        v-for="suggestion in searchSuggestions" 
        :key="suggestion.text"
        class="suggestion-item uk-padding-small"
        @click="selectSuggestion(suggestion)">
        <span>{{ suggestion.text }}</span>
        <span class="uk-text-muted uk-text-small">({{ suggestion.count }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'TextSearchFilter',
  
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: "Text",
          name: "text",
          type: "text",
          timeout: null,
          minLength: 2
        };
      }
    },
    searchIndex: {
      type: Map,
      default: () => new Map()
    }
  },

  data() {
    return {
      inputValue: '',
      searchSuggestions: [],
      isSearching: false,
      ignoreNextStoreUpdate: false
    };
  },

  watch: {
    "$route.query.search_keywords": {
      handler(newVal) {
        if (newVal) {
          this.inputValue = newVal;
          this.dispatchSearch(this.inputValue);
        }
      },
      immediate: true
    }
  },

  methods: {
    debounceInput: debounce(function() {
      if (this.inputValue.length >= (this.option.minLength || 2) || this.inputValue.length === 0) {
        this.handleSearch();
      }
    }, 300),

    async handleSearch() {
      if (!this.inputValue) {
        this.clearSearch();
        return;
      }

      this.isSearching = true;
      try {
        const suggestions = this.generateSearchSuggestions(this.inputValue);
        this.searchSuggestions = suggestions;
        
        this.ignoreNextStoreUpdate = true;
        this.dispatchSearch(this.inputValue);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        this.isSearching = false;
      }
    },

    generateSearchSuggestions(input) {
      const terms = input.toLowerCase().split(/[\s-]+/).filter(term => term.length >= 2);
      const suggestions = new Map();
      
      terms.forEach(term => {
        this.searchIndex.forEach((vehicleIds, indexTerm) => {
          if (indexTerm.includes(term)) {
            const suggestion = {
              text: indexTerm,
              count: vehicleIds.size
            };
            suggestions.set(indexTerm, suggestion);
          }
        });
      });

      return Array.from(suggestions.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    },

    selectSuggestion(suggestion) {
      this.inputValue = suggestion.text;
      this.searchSuggestions = [];
      this.handleSearch();
    },

    handleClear() {
      this.inputValue = '';
      this.searchSuggestions = [];
      this.clearSearch();
    },

    dispatchSearch(value) {
      // Update URL
      const query = { ...this.$route.query };
      query.search_keywords = value;
      this.$router.push({ query }).catch(() => {});

      // Update store
      this.$store.dispatch("select", { 
        name: this.option.name, 
        value,
        metadata: {
          timestamp: Date.now(),
          type: 'text-search',
          preserveInput: true
        }
      });
    },

    clearSearch() {
      // Remove search from URL
      const query = { ...this.$route.query };
      delete query.search_keywords;
      this.$router.push({ query }).catch(() => {});

      // Clear store
      this.$store.dispatch("deselect", { name: this.option.name });
      this.searchSuggestions = [];
    }
  },

  mounted() {
    const initialValue = this.$route.query.search_keywords;
    if (initialValue) {
      this.inputValue = initialValue;
      this.dispatchSearch(initialValue);
    }
  },

  beforeDestroy() {
    if (this.debounceInput && this.debounceInput.cancel) {
      this.debounceInput.cancel();
    }
  }
};
</script>

<style scoped>
.filter-item-inner {
  position: relative;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.uk-text-muted {
  color: #999;
}
</style>