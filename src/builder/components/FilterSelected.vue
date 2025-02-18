<template>
  <div class="filter-variant-inner uk-width-1-1">
    <div class="filter-variant-selected uk-child-width-1-2 uk-grid-collapse uk-width-1-1 uk-grid">
      <div class="uk-float-left"><h3 class="uk-margin-remove"><span class="uk-margin-small-right uk-float-left nav-filters" uk-icon="icon: settings"></span>FILTERS</h3></div>

      <div class="uk-text-right uk-float-right uk-animation-fade" v-if="variants.length">
        <button class="uk-button uk-button-secondary uk-button-small tm-button-default clearAll" @click="clearAll">
          Clear all
        </button>
      </div>
    </div>

    <div class="uk-margin-small-top">
      <div class="uk-margin-small" v-for="variant in variants" @click="remove([variant])" :key="variant.id">
        <div
          class="
            uk-width-1-1
            filter-selected-button
            uk-button
            uk-button-small
            uk-button-default
            uk-text-left
            uk-inline-clip
            uk-background-default
            uk-icon
          "
        >
          <div class="title-filter uk-float-left">{{ variant.displayName }}: {{ variant.displayValue }}</div>
          <span class="uk-position-center-right filtericon-close" type="button" uk-close></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import each from "lodash/each";
import find from "lodash/find";
import formatNumber from "@/builder/utils/formatNumber";

export default {
  computed: {
    variants() {
      const { preselect, format, filters } = this.$store.state.priceBuilder;
      const variants = [];
      each(preselect, (value, key) => {
        const filtervariant = find(filters, (f) => f.name === key);
        if (filtervariant) {
          const { displayName, type, name } = filtervariant;
          if (type === "text") {
            variants.push({
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
            variants.push({
              type,
              name,
              displayName,
              displayValue: `${formatedMin} - ${formatedMax}`,
            });
          }

          if (type === "date") {
            const [start, end] = value;
            variants.push({
              type,
              name,
              value,
              displayName,
              displayValue: `From ${start} to ${end}`,
            });
          }

          if (type === "radio" || type === "select") {
            const { data } = filtervariant;
            const { displayValue } = find(data, (i) => i.value === value);
            variants.push({
              type,
              name,
              value,
              displayName,
              displayValue,
            });
          }

          if (type === "checkbox" || type === "multiselect") {
            const { data } = filtervariant;
            each(value, (val) => {
              const { displayValue } = find(data, (i) => i.value === val);
              variants.push({
                type,
                name,
                value: val,
                displayName,
                displayValue,
              });
            });
          }
        }
      });
      return variants;
    },
  },

  methods: {
    clearAll() {
      this.remove(this.variants);
    },

    remove(variants) {
      each(variants, (variant) => {
        const { name, type, value } = variant;
        if (type === "checkbox" || type === "multiselect") {
          this.$store.dispatch("priceBuilder/deselectOnMultiple", { name, value });
        } else {
          this.$store.dispatch("priceBuilder/deselect", { name });
        }
      });
      this.$emit("updateRouter", true);
    },
  },
};
</script>
