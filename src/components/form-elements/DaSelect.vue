/** TODO: Clean this component */
<template>
  <div>
    <div class="da-select" @blur="open = false">
      <div
        class="selected uk-input uk-form-large"
        :class="{ open: open, 'da-danger': !isValid }"
        @mousedown="open = !open"
      >
        {{ selectedLabel }}
      </div>
      <div class="options" :class="{ 'select-hide': !open }">
        <div v-for="(option, i) of modifiedOptions" :key="i" @click="onClick(option)">
          {{ option.label }}
        </div>
      </div>
    </div>
    <span class="uk-form-icon" :uk-icon="options.icon"></span>
    <span v-if="!isValid" class="uk-text-danger uk-text-small"
      >{{ options.label }} is required</span
    >
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedLabel: "",
      selectedValue: "",
      open: false,
      isValid: true,
      isRequired: this.options.required,
    };
  },
  computed: {
    modifiedOptions() {
      const mOptions = JSON.parse(JSON.stringify(this.options.options));
      mOptions.unshift({ label: `Select ${this.options.label}`, value: "" });
      return mOptions;
    },
  },
  mounted() {
    this.selectedLabel = `Select ${this.options.label}`;
    this.$emit("input", this.selectedValue);
  },
  methods: {
    onClick(option) {
      if (this.isRequired) this.isValid = option.value.length > 0 ? true : false;
      this.selectedLabel = option.label;
      this.selectedValue = option.value;
      this.open = false;
      this.$emit("input", option.selectedValue);
    },
    validate() {
      if (!this.selectedValue) {
        this.isValid = false;
        return false;
      } else {
        this.isValid = true;
        return true;
      }
    },
    clear() {
      this.selectedValue = "";
      this.selectedLabel = `Select ${this.options.label}`;
    },
  },
};
</script>

<style scoped>
.da-select {
  position: relative;
  outline: none;
}

.da-select .selected {
  cursor: pointer;
}
.da-select .selected.open {
  border: 2px solid #666 !important;
  border-radius: 5px;
}
.da-select .selected:after {
  position: absolute;
  content: "";
  top: 27px;
  right: 16px;
  border: 5px solid transparent;
  border-color: #666 transparent transparent transparent;
}

.da-select .options {
  color: #666;
  border-radius: 0px 0px 5px 5px;
  overflow: hidden;
  border-right: 2px solid #000;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  font-size: 1.25em;
  position: absolute;
  background-color: #fff;
  padding-bottom: 10px;
  left: 0;
  right: 0;
  top: 50px;
  z-index: 1;
}

.da-select .options div {
  color: #666;
  padding-left: 43px;
  cursor: pointer;
  user-select: none;
  line-height: 40px;
}

.da-select .options div:hover {
  background-color: #e3e3e3;
}
.da-select .uk-form-icon {
  left: 5px;
}
.da-danger {
  color: #f0506e;
  border-color: #f0506e;
}
.select-hide {
  display: none;
}
</style>
