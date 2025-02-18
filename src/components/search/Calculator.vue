<template>
  <div v-if="retail" class="uk-grid uk-grid-small uk-child-width-1-1" data-uk-grid>
    <div class="calculator-container">
      <div class="uk-card uk-card-hover uk-flex payment-calculator uk-overflow-hidden uk-flex-column">
        <div class="uk-padding-small">
          <h4 class="uk-margin-remove uk-text-bold">Quick repayment estimator</h4>
          <div class="uk-margin-remove-top uk-text-small uk-text-muted">Discover your weekly/monthly repayments<sup>~</sup></div>
        </div>

        <ul
          uk-tab
          class="uk-grid-collapse uk-child-width-expand uk-text-center payment-tab"
          data-uk-tab="{connect:'#payment-tab'}"
          uk-grid
        >
          <li>
            <a href="#"
              ><div><h4 class="uk-h5 uk-text-bold uk-margin-remove">Weekly Payment</h4></div></a
            >
          </li>
          <li class="uk-padding-remove">
            <a href="#"
              ><div><h4 class="uk-h5 uk-text-bold uk-margin-remove">Monthly Payment</h4></div></a
            >
          </li>
        </ul>

        <div id="filter-tab" class="filter-tab background-red uk-padding-small text-blue uk-switcher uk-text-center">
          <li>
            <div>Estimated payment:</div>
            <div class="uk-h1 uk-text-bold text-blue uk-margin-remove">{{ calcWeeklyPayment }}<sup>~</sup></div>
            <div>per weekly</div>
            <div class="uk-text-small">over {{ length }} months with {{ Currency(downPayment) }} deposit</div>
          </li>
          <li>
            <div>Estimated payment:</div>
            <div class="uk-h1 uk-text-bold text-blue uk-margin-remove">{{ calcPayment }}<sup>~</sup></div>
            <div>per monthly</div>
            <div class="uk-text-small">over {{ length }} months with {{ Currency(downPayment) }} deposit</div>
          </li>
        </div>

        <div class="calculator-footer uk-position-relative uk-padding-small background-red uk-light uk-flex-1">
          <div class="uk-grid-collapse uk-child-width-1-2 uk-text-center" uk-grid>
            <div class="uk-text-small text-white">
              <div>Estimated Total</div>
              <div>Interest Repayable</div>
              <div class="uk-text-bold text-white">{{ calcWeeklyTotalpayable }}</div>
            </div>
            <div class="uk-text-small text-white left-border">
              <div>Estimated Total</div>
              <div>Repayable</div>
              <div class="uk-text-bold text-white">{{ calcWeeklyTotalInterest }}</div>
            </div>
          </div>
        </div>

        <form class="uk-padding" action="">
          <label for="down-payment"
            >Down payment <span class="uk-text-bold uk-text-secondary">{{ Currency(downPayment) }}</span></label
          >
          <el-slider v-model="downPayment" :format-tooltip="Currency" :show-tooltip="false" :min="0" :max="50000"> </el-slider>

          <label for="trade-in"
            >Trade-in value <span class="uk-text-bold uk-text-secondary">{{ Currency(tradeIn) }}</span></label
          >
          <el-slider v-model="tradeIn" :format-tooltip="Currency" :show-tooltip="false" :step="100" :min="0" :max="50000">
          </el-slider>

          <label for="length"
            >Term length <span class="uk-text-bold uk-text-secondary">{{ length }} months</span
            ><span class="uk-text-meta"> ( {{ Math.round(this.length / 12) }} years ) </span></label
          >
          <el-slider v-model="length" :step="12" :min="12" :max="84" :marks="months" :show-tooltip="false" class="margin-months-bottom">
          </el-slider>

          <label for="rate"
            >Interest rate <span class="uk-text-bold uk-text-secondary">{{ rate }}%</span></label
          >
          <el-slider v-model="rate" :format-tooltip="Percentage" :show-tooltip="false" :step="0.1" :max="15"> </el-slider>

          <div class="uk-width-auto uk-text-xsmall uk-margin-small-top">
            <sup>~</sup>The calculations performed and the results provided by the calculators on this website are estimates only
            and should be treated as a guide. The calculations and information provided using the calculators should not be your
            only source of information and advice when making financial decisions. For a quote or to apply for finance please
            <a href="/finance">contact us</a>.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Slider } from "element-ui";
Vue.use(Slider);
export default {
  name: "calculator",
  //props: ['retail'],
  props: {
    retail: {
      type: [Number, String],
      default: 30000,
    },
  },
  data() {
    return {
      //retail: 30000,
      downPayment: 200,
      tradeIn: 0,
      length: 60,
      rate: 9.98,
      months: {
        12: "12",
        24: "24",
        36: "36",
        48: "48",
        60: "60",
        72: "72",
        84: "84"
      },
    };
  },
  computed: {
    calcPayment: function (e) {
      var p = this.retail - this.downPayment - this.tradeIn;
      var r = this.rate / 1200;
      var n = this.length;
      var i = Math.pow(1 + r, n);
      var payment = (p * r * i) / (i - 1) || 0;
      return currencyFormat(payment);
    },
    calcWeeklyTotalInterest: function (e) {
      var p = this.retail - this.downPayment - this.tradeIn;
      var r = this.rate / 1200;
      var n = this.length;
      var i = Math.pow(1 + r, n);
      var weekly = (p * r * i) / (i - 1) || 0;
      var payment = weekly * n;
      return currencyFormat(payment);
    },
    calcWeeklyTotalpayable: function (e) {
      var p = this.retail - this.downPayment - this.tradeIn;
      //var p = balloon - ('10' / Math.pow(1 + r, 60))) * (rate / (1 - Math.pow(1 + r, -60));
      var r = this.rate / 1200;
      var n = this.length;
      var i = Math.pow(1 + r, n);
      var weekly = (p * r * i) / (i - 1) || 0;
      var payment = weekly * n - p;
      return currencyFormat(payment);
    },
    calcWeeklyPayment: function (e) {
      var p = this.retail - this.downPayment - this.tradeIn;
      var r = this.rate / 1200;
      var n = this.length;
      var i = Math.pow(1 + r, n);
      var payment = (p * r * i) / (i - 1) || 0;
      return currencyFormat((payment * 12) / 52, 0);
    },
    numFormat: function (e) {
      e.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
  },
  methods: {
    //lengthTooltip(val) {
    //  return val +' Months';
    //},
    Currency(val) {
      return currencyFormat(val);
    },
    Percentage(val) {
      return val + "%";
    },
  },
  watch: {},
};

function currencyFormat(num) {
  return (
    "$" +
    Number(num)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}
</script>

<style scoped>
.calculator-container {
  display: flex;
  flex-direction: column;
}
.payment-calculator {
  flex: 1;
}
.payment-tab li {
  background-color: #222;
}
.payment-tab li:hover {
  background-color: #f8f8f8;
}
.payment-tab li h4,
.text-blue,
.payment-tab li.uk-active:hover h4 {
  color: #fff;
}
.payment-tab li:hover h4 {
  color: #1c4ea1;
}
.payment-tab.uk-tab > * > a {
  padding: 15px 10px;
  border-bottom: 0;
}
.text-white {
  color: #fff;
}
.filter-tab {
  border-bottom: 1px solid rgba(230, 230, 230, 0.28);
}
.filter-tab .uk-h1 {
  font-weight: 700;
}
.border-bottom-r {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.background-red,
.payment-tab.uk-tab > .uk-active {
  background-color: #1c4ea1;
}
.margin-months-bottom {
  margin-bottom: 25px;
}
.left-border {
  border-left: 1px solid rgba(255, 255, 255, 0.27);
}
.calculator-footer:after,
.calculator-footer:after {
  z-index: 0;
  position: absolute;
  bottom: -18px;
  left: calc(50% - 50px);
  content: "";
  width: 0;
  height: 0;
  border-top: solid 30px #1c4ea1;
  border-left: solid 50px transparent;
  border-right: solid 50px transparent;
}
@media (max-width: 960px) {
  .single-modal .calculator-container {
    padding: 0;
  }
}
</style>
