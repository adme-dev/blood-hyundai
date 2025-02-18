<template>
  <div class="filter-variant-inner">
    <h4>{{ option.displayName }}</h4>
    <el-input :label="option.displayName" :placeholder="option.displayName" v-model="value" clearable> </el-input>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: "Text",
          name: "text",
          type: "text",
        };
      },
    },
  },

  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.priceBuilder.preselect[name] || "";
      },
      set(value) {
        const { name } = this.option;
        if (value) {
          this.$store.dispatch("priceBuilder/select", { name, value });
        } else {
          this.$store.dispatch("priceBuilder/deselect", { name });
        }

        this.$emit("updateRouter", true);
      },
    },
  },
};
</script>
