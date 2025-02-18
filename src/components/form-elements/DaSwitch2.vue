<template>
  <div class="da-switch">
    <span
      :style="[
        !isChecked
          ? { color: options.choices.active.color }
          : { color: options.choices.inActive.color },
      ]"
      >{{ options.choices.inActive.label }}</span
    >
    <span class="toggle">
      <input
        type="checkbox"
        :checked="isChecked"
        :id="`switch-${options.name}`"
        :name="options.name"
        :value="value"
        @change="onChange"
      />
      <label
        :for="`switch-${options.name}`"
        :style="[
          isChecked
            ? { background: options.choices.active.color }
            : { background: options.choices.inActive.color },
        ]"
        >Toggle</label
      >
    </span>
    <span
      :style="[
        isChecked
          ? { color: options.choices.active.color }
          : { color: options.choices.inActive.color },
      ]"
      >{{ options.choices.active.label }}</span
    >
  </div>
</template>
<script>
export default {
  name: "DaSwitch2",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isChecked: false,
      value: this.options.choices.inActive.label,
    };
  },
  methods: {
    onChange(e) {
      this.isChecked = !this.isChecked;
      this.value = this.isChecked
        ? this.options.choices.active.label
        : this.options.choices.inActive.label;

      this.$emit("switchChanged", {
        checked: e.target.checked,
        name: e.target.name,
        value: this.value,
      });
    },
    clear() {
      this.isChecked = false;
      this.value = this.options.choices.inActive.label;
    },
  },
};
</script>
<style lang="scss" scoped>
$active-color: #bada55;
.da-switch input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}
.da-switch .toggle {
  margin-left: 5px;
  margin-right: 8px;
}
.da-switch label {
  cursor: pointer;
  text-indent: -9999px;
  width: 40px;
  height: 20px;
  background: grey;
  display: inline-block;
  border-radius: 100px;
  position: relative;
  top: 18px;
}

.da-switch label:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

.da-switch input:checked + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}</style
>;
