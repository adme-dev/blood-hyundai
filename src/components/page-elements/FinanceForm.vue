<template>
  <div id="finance_form" class="uk-child-width-1-2@m uk-grid-collapse uk-grid">

    <div class="uk-background-default">

      <div class="uk-grid uk-grid-small uk-child-width-1-1 uk-grid">
        <div class="calculator-container">
          <div class="uk-card uk-flex payment-calculator uk-overflow-hidden uk-flex-column">
            <div class="uk-padding-small">
              <h4 class="uk-margin-remove uk-text-bold">Quick repayment estimator</h4>
              <div class="uk-margin-remove-top uk-text-small uk-text-muted">Discover your weekly/monthly
                repayments<sup>~</sup></div>
            </div>

            <ul uk-tab class="uk-grid-collapse uk-child-width-expand uk-text-center payment-tab uk-grid"
              data-uk-tab="{connect:'#payment-tab'}">
              <li>
                <a href="#">
                  <div>
                    <h4 class="uk-h5 uk-text-bold uk-margin-remove">Weekly Payment</h4>
                  </div>
                </a>
              </li>
              <li class="uk-padding-remove">
                <a href="#">
                  <div>
                    <h4 class="uk-h5 uk-text-bold uk-margin-remove">Monthly Payment</h4>
                  </div>
                </a>
              </li>
            </ul>

            <div id="filter-tab"
              class="filter-tab background-blue uk-padding-small text-blue uk-switcher uk-text-center">
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

            <div class="calculator-footer uk-position-relative uk-padding-small background-blue uk-light uk-flex-1">
              <div class="uk-grid-collapse uk-child-width-1-2 uk-text-center uk-grid">
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
              <label for="down-payment">Vehicle Price <span class="uk-text-bold uk-text-secondary">{{
                  Currency(retailSlider) }}</span></label>
              <el-slider v-model="retailSlider" :format-tooltip="Currency" :show-tooltip="false" :step="100" :min="0"
                :max="150000"> </el-slider>

              <label for="down-payment">Down payment <span class="uk-text-bold uk-text-secondary">{{
                  Currency(downPaymentSlider) }}</span></label>
              <el-slider v-model="downPaymentSlider" :format-tooltip="Currency" :show-tooltip="false" :min="0"
                :max="50000"> </el-slider>

              <label for="trade-in">Trade-in value <span class="uk-text-bold uk-text-secondary">{{
                  Currency(tradeInSlider) }}</span></label>
              <el-slider v-model="tradeInSlider" :format-tooltip="Currency" :show-tooltip="false" :step="100" :min="0"
                :max="50000"> </el-slider>

              <label for="length">Term length <span class="uk-text-bold uk-text-secondary">{{ length }}
                  months</span><span class="uk-text-meta"> ( {{ Math.round(this.length / 12) }} years ) </span></label>
              <el-slider v-model="length" :step="12" :min="12" :max="84" :marks="months" :show-tooltip="false"
                class="margin-months-bottom"> </el-slider>

              <label for="rate">Interest rate <span class="uk-text-bold uk-text-secondary">{{ rate }}%</span></label>
              <el-slider v-model="rate" :format-tooltip="Percentage" :show-tooltip="false" :step="0.1" :max="15">
              </el-slider>

              <div class="uk-width-auto uk-text-meta uk-margin-small-top">
                <sup>~</sup>The calculations performed and the results provided by the calculators on this website are
                estimates only and should be treated as a guide. The calculations and information
                provided using the calculators should not be your only source of information and advice when making
                financial decisions. For a quote or to apply for finance please contact us.
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

    <div class="uk-background-default">

      <div class="contact-form uk-padding-small">
        <div class="uk-text-center uk-margin-medium-top">
          <div class="uk-h2 uk-margin-remove">START YOUR ADVENTURE</div>
          <div class="uk-h4 uk-text-uppercase uk-margin-remove">PRE-APPROVAL {{ siteName }}</div>
        </div>

        <div>
          <ul id="sel_form" class="uk-hidden"
            uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>

          <ul class="uk-switcher">
            <li>
              <div class="uk-width-1-1 small-lead-form">
                <div class="uk-padding-small">
                  <div class="uk-margin-small-bottom uk-hidden">
                    <div class="uk-text-secondary uk-text-bold uk-float-left">Your Details</div>
                  </div>

                  <form novalidate="true" :class="this.errors ? 'errors' : false">
                    <div v-if="errors" class="error-message">
                      <div>Please correct the following error(s):</div>
                      <ul class="uk-list uk-list-hyphen uk-hidden">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                      </ul>
                    </div>

                    <fieldset class="uk-fieldset uk-grid-small uk-grid">
                      <div class="uk-width-1-2@m uk-inline">
                        <input id="first_name" class="uk-input uk-form-large" name="first_name" v-model="first_name"
                          required @invalid="invalidateForm" placeholder="First Name" type="text" />
                        <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label>
                        <span class="error-message uk-text-small">First name required</span>
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                      </div>

                      <div class="uk-width-1-2@m uk-inline">
                        <input id="second_name" class="uk-input uk-form-large" name="second_name" v-model="second_name"
                          required @invalid="invalidateForm" placeholder="Second Name" type="text" />
                        <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label>
                        <span class="error-message uk-text-small">Second name required</span>
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                      </div>

                      <div class="uk-width-1-1 uk-inline">
                        <input id="email_a" class="uk-input uk-form-large" name="email_a" v-model="email_a" required
                          @invalid="validEmail" placeholder="Email Address" type="text" />
                        <label class="uk-form-label" for="email_a">Email Address<sup>*</sup></label>
                        <span class="error-message uk-text-small">Email address required</span>
                        <span class="uk-form-icon" uk-icon="icon: mail"></span>
                      </div>

                      <div class="uk-width-1-1 uk-inline">
                        <input id="phone_n" name="phone_n" class="uk-input uk-form-large" @invalid="invalidateForm"
                          v-model="phone_n" placeholder="Phone Number" type="text" />
                        <label class="uk-form-label" for="phone_n">Phone Number<sup>*</sup></label>
                        <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                      </div>

                      <div class="uk-width-1-1 uk-inline message-textarea">
                        <textarea rows="4" class="uk-textarea" name="message" type="text" v-model="message"
                          placeholder="Message"></textarea>
                        <label class="uk-form-label" for="message">Message</label>
                        <span class="uk-form-icon" uk-icon="icon: commenting"></span>
                      </div>

                      <div class="uk-width-1-1 uk-text-center uk-padding-small">
                        <div class="uk-h3">LOAN DETAILS</div>
                      </div>


                      <div class="uk-width-1-3@m uk-inline">
                        <input id="retail" class="uk-input uk-form-large" name="retailInout" v-model="retailInput"
                          @input="onRetailInputChange" required placeholder="Loan amount" type="text" />
                        <label class="uk-form-label" for="retail">Loan amount<sup>*</sup></label>
                        <span class="error-message uk-text-small">Loan amount required</span>
                        <span class="uk-form-icon" uk-icon="icon: credit-card"></span>
                      </div>

                      <div class="uk-width-1-3@m uk-inline">
                        <input id="downPayment" class="uk-input uk-form-large" name="downPayment"
                          v-model="downPaymentInput" @input="onDownPaymentInputChange" required
                          placeholder="Down payment" type="text" />
                        <label class="uk-form-label" for="downPayment">Down payment<sup>*</sup></label>
                        <span class="error-message uk-text-small">Down payment required</span>
                        <span class="uk-form-icon" uk-icon="icon: credit-card"></span>
                      </div>

                      <div class="uk-width-1-3@m uk-inline">
                        <input id="tardeIn" class="uk-input uk-form-large" name="tradeInInput" v-model="tradeInInput"
                          @input="onTradeInInputChange" placeholder="Trade-in value" type="text" />
                        <label class="uk-form-label" for="tardeIn">Trade-in value<sup>*</sup></label>
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                      </div>

                      <div class="uk-width-1-2@m uk-inline">
                        <input id="length" class="uk-input uk-form-large" name="length" v-model="length" required
                          placeholder="Loan amount" type="text" />
                        <label class="uk-form-label" for="length">Term length<sup>*</sup></label>
                        <span class="error-message uk-text-small">Term length required</span>
                        <span class="uk-form-icon" uk-icon="icon: calendar"></span>
                      </div>

                      <div class="uk-width-1-2@m uk-inline">
                        <input id="downPayment" class="uk-input uk-form-large" name="rate" v-model="rate" required
                          placeholder="Interest rate" type="text" />
                        <label class="uk-form-label" for="rate">Interest rate<sup>*</sup></label>
                        <span class="error-message uk-text-small">Interest rate required</span>
                        <span class="uk-h4 uk-form-icon percent-icon">%</span>
                      </div>


                      <div class="uk-width-1-2@m uk-inline">
                        <input id="length" interest_repayable class="uk-input uk-form-large" name="interest_repayable"
                          v-model="calcWeeklyTotalpayable" required placeholder="Interest Repayable" type="text"
                          disabled />
                        <label class="uk-form-label" for="interest_repayable">Interest Repayable<sup>*</sup></label>
                        <span class="error-message uk-text-small">Interest Repayable required</span>
                        <span class="uk-form-icon" uk-icon="icon: credit-card"></span>
                      </div>

                      <div class="uk-width-1-2@m uk-inline">
                        <input id="total_interest" class="uk-input uk-form-large" name="estimated_total"
                          v-model="calcWeeklyTotalInterest" required placeholder="Estimated Total" type="text"
                          disabled />
                        <label class="uk-form-label" for="total_interest">Estimated Total<sup>*</sup></label>
                        <span class="error-message uk-text-small">Estimated Total required</span>
                        <span class="uk-form-icon" uk-icon="icon: credit-card"></span>
                      </div>


                      <div class="uk-width-1-1">
                        <p class="uk-text-meta uk-margin-small-top">
                          Your personal information will be collected, used and stored in strict accordance with our
                          <a class="uk-text-primary" href="/privacy-policy" target="_blank">Privacy Policy</a>. Our
                          Privacy Policy
                          contains details on how information is used, how you may access / correct information held and
                          our privacy
                          complaints processes.
                        </p>
                      </div>
                    </fieldset>
                  </form>

                  <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2 uk-grid">
                    <div class="uk-margin-auto-left">
                      <button class="uk-button uk-width-1-1 uk-button-primary" @click="checkForm">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div class="uk-width-1-1 uk-inline">
                <div
                  class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
                  v-show="isSending">
                  <div class="uk-position-center uk-text-center">
                    <div uk-spinner="ratio: 2"></div>
                    <p>Sending...</p>
                  </div>
                </div>

                <div
                  class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
                  v-show="isSent">
                  <div class="uk-position-center uk-text-center form-confirmation">
                    <strong>Hi {{ first_name }}</strong>
                    <div>Thank you for your enquiry. One of our staff members will be in touch shortly.</div>
                  </div>
                </div>

                <div class="uk-padding-small uk-margin-medium-top">
                  <div>
                    <button class="uk-button uk-button-link uk-link-reset" uk-switcher-item="0">
                      <span uk-icon="chevron-left"></span> Back
                    </button>
                    <div class="uk-text-secondary uk-text-bold uk-float-right">Confirm & Send</div>
                  </div>

                  <ul class="uk-list uk-list-divider uk-padding-small">
                    <li>
                      <div class="uk-width-1-1 uk-text-center uk-padding-small">
                        <div class="uk-h3 uk-margin-remove">PERSONAL DETAILS</div>
                      </div>
                    </li>
                    <li>
                      First Name:
                      <div class="uk-float-right uk-text-bold">{{ first_name }}</div>
                    </li>
                    <li>
                      Second Name:
                      <div class="uk-float-right uk-text-bold">{{ second_name }}</div>
                    </li>
                    <li>
                      Email Address:
                      <div class="uk-float-right uk-text-bold">{{ email_a }}</div>
                    </li>
                    <li v-if="phone_n">
                      Phone Number:
                      <div class="uk-float-right uk-text-bold">{{ phone_n }}</div>
                    </li>
                    <li v-if="message">
                      <div>Message:</div>
                      <div>{{ message }}</div>
                    </li>
                    <li>
                      <div class="uk-width-1-1 uk-text-center uk-padding-small">
                        <div class="uk-h3 uk-margin-remove">LOAN DETAILS</div>
                      </div>
                    </li>
                    <li v-if="retail">
                      Loan amount:
                      <div class="uk-float-right uk-text-bold">{{ Currency(retail) }}</div>
                    </li>
                    <li v-if="downPayment">
                      Down payment:
                      <div class="uk-float-right uk-text-bold">{{ Currency(downPayment) }}</div>
                    </li>
                    <li v-if="tradeIn">
                      Trade-in value:
                      <div class="uk-float-right uk-text-bold">{{ Currency(tradeIn) }}</div>
                    </li>
                    <li v-if="length">
                      Term length:
                      <div class="uk-float-right uk-text-bold">{{ length }}</div>
                    </li>
                    <li v-if="rate">
                      Interest rate:
                      <div class="uk-float-right uk-text-bold">{{ rate }}%</div>
                    </li>
                    <li v-if="calcWeeklyTotalpayable">
                      Interest Repayable:
                      <div class="uk-float-right uk-text-bold">{{ calcWeeklyTotalpayable }}</div>
                    </li>
                    <li v-if="calcWeeklyTotalInterest">
                      Estimated Total:
                      <div class="uk-float-right uk-text-bold">{{ calcWeeklyTotalInterest }}</div>
                    </li>
                    <li>
                    </li>
                  </ul>

                  <div class="uk-grid-small uk-margin-small-top uk-margin-medium-bottom uk-grid">
                    <div class="uk-margin-auto">
                      <button class="uk-button uk-button-large border-radius-50 uk-width-1-1 uk-button-primary"
                        @click="submitForm">
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
import { Slider } from "element-ui";
import axios from "axios";
Vue.use(Slider);
export default {
  name: "FinanceForm",
  data: function () {
    return {
      retail: 30000,
      retailInput: 30000,
      retailSlider: 30000,
      downPayment: 200,
      downPaymentSlider: 200,
      downPaymentInput: this.Currency(200),
      tradeIn: 0,
      tradeInSlider: 0,
      tradeInInput: 0,
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
      //errors:[],
      errors: false,
      first_name: "",
      second_name: "",
      email_a: "",
      phone_n: "",
      message: "",
      isSending: false,
      isSent: false,
      siteName: this.$store.state.site.name,
    };
  },
  methods: {
    onRetailInputChange: function () {
      this.retail = parseFloat(this.retailInput.replace(/[^\d\.]/g, ""))
      if (isNaN(this.retail)) {
        this.retail = 0
      }
      this.retailSlider = this.retail;
      this.retailInput = "$ " + this.retail.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    },
    onTradeInInputChange: function () {
      this.tradeIn = parseFloat(this.tradeInInput.replace(/[^\d\.]/g, ""))
      if (isNaN(this.tradeIn)) {
        this.tradeIn = 0
      }
      this.tradeInSlider = this.tradeIn;
      this.tradeInInput = "$ " + this.tradeIn.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    },
    onDownPaymentInputChange: function () {
      this.downPayment = parseFloat(this.downPaymentInput.replace(/[^\d\.]/g, ""))
      if (isNaN(this.downPayment)) {
        this.downPayment = 0
      }
      this.downPaymentSlider = this.downPayment;
      this.downPaymentInput = "$ " + this.downPayment.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    },
    checkForm: function (e) {
      (this.errors = []),
        this.first_name || this.errors.push("Fist Name required."),
        this.second_name || this.errors.push("Second Name required."),
        this.email_a
          ? this.validEmail(this.email_a) || this.errors.push("Valid email required.")
          : this.errors.push("Email required."),
        this.errors.length || this.UIkit.switcher("#sel_form").show("1"),
        this.first_name && this.second_name && this.email_a,
        e.preventDefault();
    },
    validEmail: function (email_a) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email_a);
    },
    invalidateForm() {
      this.errors = true;
    },
    submitForm: function (e) {
      this.isSending = !this.isSending;
      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
          payload: {
            input_5: this.first_name + " " + this.second_name,
            input_3: this.phone_n,
            input_4: this.email_a,
            input_19: this.message,
            input_6: this.second_name,
            input_11: currencyFormat(this.retail), // loan amount
            input_12: currencyFormat(this.downPayment), // loan Down payment
            input_20: this.length, // loan Term length:
            input_21: this.rate + '%', // loan Interest rate:
            input_22: this.calcWeeklyTotalpayable, // loan Interest Repayable:
            input_23: this.calcWeeklyTotalInterest, // loan Estimated Total:
            input_28: this.$route.params.slug.replace(/\-/g, " ").replace(/(^\w|\s\w)/g, (c) => c.toUpperCase()),
          },
          formid: this.$store.state.site.forms.finance,
        })
        .then((response) => {
          this.isSending = false;
          this.isSent = true;

          window.dataLayer?.push({
            event: "FormSub Finance",
            formName: "Finance Form",
            formStatus: "submitted",
            firstName: this.first_name,
            secondName: this.second_name,
            email: this.email_a,
            phone: this.phone_n,
            message: this.message,
          });

        })
        .catch((error) => {
          //this.response = 'Error: ' + error.response.status
          console.log(this.response);
        });
    },
    Currency(val) {
      return currencyFormat(val);
    },
    Percentage(val) {
      return val + "%";
    },
  },
  watch: {
    downPaymentSlider(value) {
      this.downPayment = value
      this.downPaymentInput = this.Currency(value)
    },
    tradeInSlider(value) {
      this.tradeIn = value
      this.tradeInInput = this.Currency(value)
    },
    retailSlider(value) {
      this.retail = value
      this.retailInput = this.Currency(value)
    },
    phone_n() {
      this.phone_n = this.phone_n
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
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

.payment-tab.uk-tab>*>a {
  padding: 15px 10px;
  border-bottom: 0;
}

.small-lead-form .uk-form-icon.percent-icon {
  top: -26px;
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

.background-blue,
.payment-tab.uk-tab>.uk-active {
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
