<template>
  <div class="da-radio uk-grid-item-match" :class="classes">
    <input type="radio" :id="id" :name="`daRadioBox-${group}`" :value="value" @change="onChange" :checked="isChecked" />
    <label class="uk-height-1-1" :for="id"><slot /></label>
  </div>
</template>
<script>
export default {
  name: "DaRadioBox",
  props: {
    id: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: false,
    },
    group: {
      type: String,
      required: true,
    },
  },
  methods: {
    onChange(e) {
      this.$emit("input", e);
    },
  },
};
</script>
<style scoped>
.da-radio input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.da-radio-box label {
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 2px;
  cursor: pointer;
  -webkit-box-shadow: 0 0 0 1px #ccc inset;
  box-shadow: 0 0 0 1px #ccc inset;
  transition: -webkit-box-shadow 0.4s ease-in-out;
  transition: box-shadow 0.4s ease-in-out;
}

.da-radio-box label:hover,
.da-radio-box input[type="radio"]:focus + label,
.da-radio-box input[type="radio"]:checked + label,
.da-radio-box-active {
  -webkit-box-shadow: 0 0 0 2px #222 inset;
  box-shadow: 0 0 0 2px #222 inset;
}

.da-radio-circle {
  display: inline-block;
}
</style>
