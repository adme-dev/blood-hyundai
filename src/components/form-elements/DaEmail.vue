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
    options: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      this.isValid = this.isValidEmail(event.target.value) ? true : false;
      this.$emit("input", event.target.value);
    },
    validate() {
      return this.isRequired && !this.isValidEmail(this.value)
        ? (this.isValid = false)
        : (this.isValid = true);
    },
    isValidEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
