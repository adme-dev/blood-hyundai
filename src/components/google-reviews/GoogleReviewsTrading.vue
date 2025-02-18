<template>
  <div>
    <div v-if="showNotice" class="trading-notice">
      <h4 class="uk-dark uk-text-bold uk-margin-remove" v-html="notice[0].heading"></h4>
      <h6 class="uk-margin-remove" v-html="notice[0].sub_heading"></h6>
    </div>


      <div>
          <div
            v-for="(value, name, index) in hours"
            :key="index"
            class="uk-child-width-auto uk-grid-collapse uk-grid uk-text-small"
            :class="[changeToday() == index + 1 ? 'uk-text-primary uk-text-bold' : '']"
          >
            <span class="uk-margin-auto-right uk-text-capitalize">{{ name  }}</span>
            <span>
            <span v-if="value.status !== 'open'" class="uk-text-muted"> {{ value.status }}</span>
            <span v-if ="value.status === 'open'">{{ value.open + ' -' }} </span>
            <span v-if="value.status === 'open'">{{ value.close }} </span>
            </span>
          </div>
      </div>
    </div>
</template>
<script>
import { processTradingHours, isDateInRange } from "@/utils";
export default {
  name: "trading-hours-googlemap",
  props: ["tradingHours"],
  data() {
    return {
      notice: "",
      hours: "",
      showNotice: false,
    };
  },
  mounted() {
    const { ["notice"]: notice, ...tradingHours } = this.tradingHours;
    this.notice = notice;
    if (notice) this.showNotice = isDateInRange(notice[0].start, notice[0].end);
    this.hours = processTradingHours(tradingHours);
  },
  methods: {
    changeToday() {
      return [new Date().getDay()];
    },
  },
};
</script>
