/** TODO: eleminate use of element ui component */
<template>
  <div class="uk-width-1-1 uk-grid-collapse uk-grid">
    <div class="uk-width-2-3 uk-text-bold uk-inline" v-if="label">{{ label }}</div>
    <div class="uk-inline uk-width-auto uk-align-right">
      <el-switch
        v-model="value"
        :active-text="options.active"
        :inactive-text="options.inactive"
        active-color="#000"
        inactive-color="#333"
        :active-value="options.active.toLowerCase()"
        :inactive-value="options.inactive.toLowerCase()"
        @change="onChange"
      >
      </el-switch>
    </div>
  </div>
</template>
<script>
export default {
  name: "DaSwitch",
  props: {
    label: {
      type: String,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$emit("input", "no");
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onChange(value) {
      this.$emit("input", value);
    },
  },
};
</script>
