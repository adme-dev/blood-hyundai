<template>
  <div>
    <div v-if="showNotice" class="trading-notice">
      <div class="uk-h4 uk-dark uk-text-bold uk-margin-remove" v-html="notice[0].heading"></div>
      <div class="uk-h6 uk-margin-remove" v-html="notice[0].sub_heading"></div>
    </div>
    <div class="uk-width-1-1 uk-h4 uk-margin-remove uk-text-bold trading-title">Trading Hours</div>
    <div class="container uk-text-light">

      <div class="time-list  uk-grid-small uk-text-uppercase uk-margin-small-top uk-child-width-1-3 uk-grid">
        <div>Day</div>
        <div>From</div>
        <div>To</div>
      </div>
      <div v-for="(value, name, index) in hours" :key="index"
        class="time-list uk-grid-small uk-text-uppercase uk-child-width-1-3 uk-text-light uk-grid"
        :class="[changeToday() == index + 1 ? 'uk-text-primary uk-text-bold' : '']">
        <div class="uk-text-capitalize">{{ name }}</div>
        <div v-if="value.status !== 'open'" class="uk-width-expand"> {{ value.status }}</div>
        <div v-if="value.status === 'open'">{{ value.open }}</div>
        <div v-if="value.status === 'open'">{{ value.close }}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { processTradingHours, isDateInRange } from "@/utils";

export default {
  name: "trading-hours",
  props: ["tradingHours"],
  data() {
    return {
      showNotice: false,
    };
  },
  created() {
    if (this.notice) this.showNotice = isDateInRange(this.notice[0].start, this.notice[0].end);
  },
  computed: {
    notice() {
      const { ["notice"]: notice } = this.tradingHours;
      return notice;
    },
    hours() {
      const { ["notice"]: notice, ...tradingHours } = this.tradingHours;
      return processTradingHours(tradingHours);
    },
  },
  methods: {
    changeToday() {
      return [new Date().getDay()];
    },
  },
};
</script>
<style>
.time-list {
  position: relative;
}

.time-list::before {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 15px;
  right: 0;
  border-bottom: 1px solid rgb(158 158 158 / 16%)
}
</style>
