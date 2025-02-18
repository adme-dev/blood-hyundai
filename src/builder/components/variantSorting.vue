<template>
  <div class="variant-sorting">
    <el-select :value="sortBy" @change="changeBy" v-model="palceholder">
      <el-option v-for="(value, key) in options" :key="key" :label="value" :value="key"> </el-option>
    </el-select>
    <div class="uk-link-reset uk-button uk-button-default tm-button-default uk-margin-small-left" @click="changeDirection">
      <i :class="{ 'el-icon-arrow-up': !isToggled, 'el-icon-arrow-down': isToggled }"></i>
      <span>{{ isToggled ? "DESC" : "ASC" }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "variant-sorting",
  data() {
    return {
      palceholder: "Order By",
    };
  },
  computed: {
    options() {
      return this.$store.state.priceBuilder.sorting.options;
    },

    direction() {
      return this.$store.state.priceBuilder.sorting.direction;
    },

    value: {
      get() {
        return this.$store.state.priceBuilder.sorting.by;
      },
      set(value) {
        this.$store.dispatch("priceBuilder/changeSortingBy", value);
        this.$emit("updateRouter");
      },
    },
  },

  methods: {
    changeDirection() {
      const dir = this.direction === "asc" ? "desc" : "asc";
      this.$store.dispatch("priceBuilder/changeSortingDirection", dir);
      this.$emit("updateRouter");
    },
  },
};
</script>
