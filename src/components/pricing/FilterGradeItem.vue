<template>
  <div class="uk-margin-medium-top">
    <h5 class="uk-text-uppercase">{{ title }}</h5>
    <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@xl uk-grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="uk-margin-small-bottom"
      >

        <DaRadioBox
          :group="type"
          :id="`${type}-${item}`"
          :value="item"
          :isChecked="index === 0"
          @input="$emit('input', $event)"
          classes="grade-card da-radio-box uk-text-left"
        >
          <span>
            <h5 class="uk-margin-small">{{ item }}</h5>
            <p class="uk-text-meta uk-margin-remove uk-text-light">
              Driveaway From
            </p>

            <h3 class="uk-h4 uk-margin-remove uk-text-bold">
              ${{
                driveAwayPrice(item)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </h3>
          </span>
        </DaRadioBox>
      </div>
    </div>
  </div>
</template>
<script>
import DaRadioBox from "@/components/form-elements/DaRadioBox";
import { filter, minBy } from "lodash";
export default {
  props: ["items", "type", "modelVariants"],
  components: { DaRadioBox },
  computed: {
    title() {
      return this.type.replace("_", " ");
    },
  },
  methods: {
    driveAwayPrice(grade) {
      const gradeVariants = filter(this.modelVariants, ["grade", grade]);
      return minBy(gradeVariants, "drive_away").drive_away;
    },
  },
};
</script>
