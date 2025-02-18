<template>
  <div class="uk-width-1-1 uk-inline message-textarea">
    <label class="form-label" :for="options.name"
      >
      <span uk-icon="comment"></span> {{ options.label }}<sup v-if="options.isRequired">*</sup></label
    >
    <textarea
      rows="4"
      class="uk-textarea uk-margin-small-top"
      :class="{ 'uk-form-danger': !isValid }"
      :name="options.name"
      :value="value"
      @input="onInput"

    ></textarea>
    <span v-if="!isValid" class="uk-text-danger uk-text-small">{{ validationMessage }}</span>
  </div>
</template>
<script>
export default {
  name: "DaTextArea",
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
  computed: {
    validationMessage() {
      if (this.options.validation_message) {
        return this.options.validation_message;
      } else {
        return `${this.options.label} required`;
      }
    },
  },
  methods: {
    onInput(event) {
      if (this.isRequired) this.isValid = event.target.value ? true : false;
      this.$emit("input", event.target.value);
    },
    validate() {
      return !this.value ? (this.isValid = false) : (this.isValid = true);
    },
  },
};
</script>
