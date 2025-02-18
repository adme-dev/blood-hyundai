<template>
  <div>
    <input
      type="text"
      class="uk-input uk-form-large"
      :class="{ 'uk-form-danger': !isValid }"
      :name="options.name"
      :value="value"
      @input="onInput"
      :placeholder="options.label"
    />
    <label class="uk-form-label" :for="options.name"
      >{{ options.label }}<sup v-if="options.isRequired">*</sup></label
    >
    <span v-if="options.icon" class="uk-form-icon" :uk-icon="options.icon"></span>
    <span v-if="!isValid" class="uk-text-danger uk-text-small"
      >Valid {{ options.label }} required</span
    >
  </div>
</template>

<script>
export default {
  name: "DaInput",
  data() {
    return {
      isValid: true,

      isRequired: this.options.required,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      if (this.isRequired) this.isValid = event.target.value ? true : false;
      event.target.value = event.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
      this.$emit("input", event.target.value);
    },
    validate() {
      return !this.value && this.isRequired ? (this.isValid = false) : (this.isValid = true);
    },
  },
};
</script>
