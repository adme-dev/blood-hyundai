<template>
  <div class="uk-margin-medium-top">
    <h5 class="uk-text-uppercase">{{ title }}</h5>

    <span v-for="(item, index) in items" :key="index">

      <DaRadioBox
        :group="type"
        :id="`${type}-${item.name.replace(' ','')}`"
        :value="item.name"
        :isChecked="index === 0"
        @input="onInput($event,item)"
        classes="da-radio-circle"
      >
        <span
          class="
            uk-icon-button uk-margin-small-right uk-margin-small-top
            margin-small-bottom
          "
          :style="{ 'background-color': item.code }"
        >
          <span v-if="selectedItem === item.name" uk-icon="check" ></span>
        </span>
      </DaRadioBox>
    </span>
  </div>
</template>
<script>
import DaRadioBox from "@/components/form-elements/DaRadioBox";
export default {
  props: ["items", "type"],
  components: { DaRadioBox },
  data() {
    return {
      selectedItem: "",
    };
  },
  computed: {
    title() {
      return this.type.replace("_", " ");
    },
  },
  watch: {
    items() {
      this.selectedItem = this.items[0].name;
    },
  },
  mounted() {
    this.selectedItem = this.items[0].name;
  },

  methods: {
    onInput(e, item) {
      this.selectedItem = e.target.value;
      this.$emit("input", item);
    },
  },
};
</script>
<style scoped>
.uk-icon-button {
  border: 1px solid #e3e3e3 !important;
}
</style>
