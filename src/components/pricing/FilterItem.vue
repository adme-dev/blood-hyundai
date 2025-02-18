<template>
  <div class="uk-margin-medium-top">
    <h5 class="uk-text-uppercase">{{ title }}</h5>
    <div class="uk-grid-collapse uk-grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="variant-price-block-column"
        :class="{
          'uk-width-1-1@m': items.length === 1,
          'uk-width-1-2@m': items.length > 1,
        }"
      >
        <DaRadioBox
          :group="type"
          :id="`${type}-${item}`"
          :value="item"
          :isChecked="selectedItem === item"
          @input="$emit('input', $event.target.value)"
          classes="uk-card uk-card-body uk-padding-remove uk-text-center da-radio-box"
        >
          <p class="uk-padding-small uk-margin-remove">{{ item }}</p>
        </DaRadioBox>
      </div>
    </div>
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
      this.selectedItem = this.items[0];
    },
  },
  mounted() {
    this.selectedItem = this.items[0];
  },
};
</script>
<style scoped>
.variant-price-block {
  padding-right: 20px;
}
</style>
