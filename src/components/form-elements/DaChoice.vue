//TODO: This can be done better.
<template>
  <div>
    <div class="uk-width-1-1 uk-flex uk-flex-middle uk-grid-collapse uk-grid">
      <div class="uk-width-2-3 uk-text-bold uk-margin-small-right" v-if="options.label">
        {{ options.label }}
      </div>
      <div class="uk-inline uk-width-auto uk-margin-auto-left">
        <DaSwitch2
          :options="options.controls.switch.options"
          @switchChanged="switchChanged"
          ref="daswitch"
        ></DaSwitch2>
      </div>
    </div>
    <div class="uk-width-1-1 uk-inline message-textarea">
      <DaTextArea
        v-if="isTextAreaVisible"
        :options="options.controls.text_area.options"
        v-model="textAreaValue"
        ref="textarea"
        @input="onTextAreaInput"
        class="uk-margin-small-top"
      />
    </div>
    <hr>
  </div>
</template>
<script>
import DaSwitch2 from "@/components/form-elements/DaSwitch2";
import DaTextArea from "@/components/form-elements/DaTextArea";
export default {
  name: "DaChoice",
  components: { DaSwitch2, DaTextArea },
  data() {
    return {
      isTextAreaVisible: this.options.controls.text_area.options.visible,
      isTextAreaRequired: false,
      isValid: true,
      textAreaValue: "",
      choiceValue: [],
      checkedValue: "",
    };
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.choiceValue[this.options.controls.switch.options.name] = "No";
    this.choiceValue[this.options.controls.text_area.options.name] = "";
    this.$emit("input", this.choiceValue);
  },
  methods: {
    switchChanged(e) {
      this.isTextAreaVisible = !this.isTextAreaVisible;
      if (!this.isTextAreaVisible) this.textAreaValue = "";
      this.isTextAreaRequired = e.checked;
      this.choiceValue[e.name] = e.value;

      this.$emit("input", this.choiceValue);
    },
    onTextAreaInput(value) {
      this.choiceValue[this.options.controls.text_area.options.name] = value;
      this.$emit("input", this.choiceValue);
    },
    validate() {
      if (this.isTextAreaRequired) {
        return this.$refs.textarea.validate();
      } else {
        return true;
      }
    },
    clear() {
      this.choiceValue = [];
      this.textAreaValue = "";
      this.isTextAreaVisible = false;
      this.$refs.daswitch.clear();
    },
  },
};
</script>
