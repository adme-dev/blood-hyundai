<template>
  <div class="item-sorting">
    <el-select :value="sortBy" @change="changeBy">
      <el-option v-for="(value, key) in options" :key="key" :label="value" :value="key">
      </el-option>
    </el-select>
    <div
      class="uk-link-reset uk-button uk-button-default tm-button-default uk-margin-small-left"
      @click="changeDirection"
    >
      <i :class="{ 'el-icon-arrow-up': !isToggled, 'el-icon-arrow-down': isToggled }"></i>
      <span>{{ isToggled ? "DESC" : "ASC" }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: this.$store.state.search.sorting.options,
      isToggled: false, // TODO: change the sort direction data structure to isToggle
    };
  },
  beforeUpdate() {
    this.isToggled = this.$store.state.search.sorting.direction === "desc";
  },
  computed: {
    sortBy() {
      return this.$store.state.search.sorting.by;
    },
  },
  methods: {
    changeDirection() {
      this.isToggled = !this.isToggled;
      this.$store.dispatch("changeSortingDirection", this.isToggled ? "desc" : "asc");
      this.$emit("pushFilter");
    },
    changeBy(value) {
      this.$store.dispatch("changeSortingBy", value);
      this.$emit("pushFilter");
    },
  },
};
</script>
