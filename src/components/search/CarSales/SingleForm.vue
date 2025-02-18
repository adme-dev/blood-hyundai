<template>
  <div class="car-sales-from">
    <div class="uk-card uk-card-hover uk-padding-small">
      <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove uk-text-center">
        Enquire on this vehicle
      </div>
      <div class="uk-width-1-1 uk-text-small uk-text-center">or ask a question</div>

      <form class="adme-form">
        <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
          v-show="isSending">
          <div class="uk-position-center uk-text-center">
            <div uk-spinner="ratio: 2"></div>
            <p>Sending...</p>
          </div>
        </div>
        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1 mdl-label">
            <span class="uk-form-icon" uk-icon="icon: user"></span>
            <input v-model="username" id="username" name="username" type="text" class="uk-input uk-form-large"
              placeholder="First and last name" :class="[errors.name ? 'field-error' : '']" />
            <label class="uk-form-label">First and last name</label>
          </div>
          <div v-if="errors.name" class="uk-text-small uk-text-danger">{{ errors.name }}</div>
        </div>

        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1 mdl-label">
            <div :class="{ control: true }">
              <span class="uk-form-icon" uk-icon="icon: mail"></span>
              <input class="uk-input uk-form-large" name="email" type="text" v-model="email" placeholder="Email address"
                :class="[errors.email ? 'field-error' : '']" />
              <label class="uk-form-label">Email address</label>
            </div>
          </div>
          <div v-show="errors.email" class="uk-text-small uk-text-danger">{{ errors.email }}</div>
        </div>

        <div class="uk-margin-small mdl-label">
          <div class="uk-inline uk-width-1-1 mdl-label">
            <label class="uk-form-label">Phone Number</label>
            <span class="uk-form-icon" uk-icon="icon: receiver"></span>
            <input id="input_3" class="uk-input uk-form-large" type="tel" v-model="phone" placeholder="Phone Number" />
            <label class="uk-form-label">Phone Number</label>
          </div>
        </div>

        <div class="uk-width-1-1 uk-margin-small">
          <textarea id="input_4" class="uk-textarea uk-form-large" type="text" rows="3" v-model="message"
            placeholder="Message"></textarea>
        </div>

        <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
          <label class="uk-margin-small-left uk-margin-auto-right font-14">I would like a test drive.</label>
          <label><input class="uk-radio" type="radio" name="testdrive" v-model="testdrive" value="" checked />
            No</label>
          <label><input class="uk-radio" type="radio" name="testdrive" v-model="testdrive"
              value="Yes I would like a test drive" />
            Yes</label>
        </div>

        <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
          <label class="uk-margin-small-left uk-margin-auto-right font-14">I have a vehicle to trade in.</label>
          <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein" value="" checked />
            No</label>
          <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein"
              value="Yes I have a vehicle to trade in" />
            Yes</label>
        </div>

        <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
          <label class="uk-margin-small-left uk-margin-auto-right font-14">I'm interested in finance.</label>
          <label><input class="uk-radio" type="radio" name="finance" v-model="finance" value="" checked />
            No</label>
          <label><input class="uk-radio" type="radio" name="finance" v-model="finance"
              value="Yes I'm interested in finance." />
            Yes</label>
        </div>

        <div class="uk-margin uk-text-center">
          <button class="uk-button uk-button-primary uk-button-large uk-width-1-1 border-radius-50" type="button"
            @click="validateAndSubmit">
            Send Enquiry
          </button>
        </div>
        <div class="uk-text-small uk-text-muted uk-text-center">
          <sup>*</sup>We do not disclose any information collected on the website to any
          organisation not related to this company.
        </div>
      </form>

      <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
        v-show="isSent">
        <div class="uk-position-center uk-text-center">
          <strong>Hi {{ username }}</strong>
          <div>Thank you for your enquiry. One of our staff members will be in touch shortly.</div>
          <button class="uk-button uk-button-primary uk-button-large uk-width-auto border-radius-50" @click="close()">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "carSalesSingleForm",
  props: ["itemStock", "item", "condition"],
  data() {
    return {
      errors: { name: "", email: "" },
      invalid: false,
      username: "",
      email: "",
      phone: "",
      finance: "",
      tradein: "",
      testdrive: "",
      message: "",
      isSending: false,
      isSent: false.itemStock,
      confirmationMessage: "",
    };
  },
  watch: {
    phone() {
      this.phone = this.phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
  },
  // created: function() {
  //   console.log(JSON.stringify(this.$store.getters.vehicleById(this.itemStock)) + ' - ' + this.itemStock);
  // },
  methods: {
    emailIsValid: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateAndSubmit() {
      if (!this.username) {
        this.invalid = true;
        this.errors.name = "Name is required";
      } else {
        this.invalid = false;
      }

      if (!this.emailIsValid(this.email)) {
        this.invalid = true;
        this.errors.email = "Valid email is required";
      } else {
        this.invalid = false;
      }

      if (!this.invalid) {
        this.isSending = !this.isSending;

        // Remove the 'Comments' key from 'this.item'
        const itemToSend = { ...this.item };
        delete itemToSend.Comments; // Removes the 'Comments' key-value pair

        axios
          .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
            payload: {
              input_1: this.username,
              input_2: this.phone,
              input_3: this.email,
              input_4: this.message,
              input_5: this.item.stockid,
              input_6: this.finance,
              input_7: this.tradein,
              input_17: this.testdrive,
              input_8: this.item.condition.displayValue[0],
              input_9: this.item.make.displayValue[0],
              input_10: this.item.model.displayValue[0],
              input_11: this.item.badge.displayValue[0] || '',
              input_12: this.item.stockid + '/' + this.item.slug,
              input_16: JSON.stringify(itemToSend),
              input_26: 'Stock Enquiry Page',
            },
            formid: this.$store.state.site.forms.carsales,
          })
          .then((response) => {
            if (response.data.is_valid) {
              this.confirmationMessage = response.data.confirmation_message.replace(
                /(&nbsp;|<([^>]+)>)/gi,
                ""
              );
              this.isSending = false;
              this.isSent = true;
            } else {
              this.isSending = false;
              this.isSent = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });

        this.email = "";
        this.phone = "";
        this.message = "";
      }
    },
    close() {
      this.username = "";
      this.email = "";
      this.phone = "";
      this.message = "";
      this.isSent = false;
    },
  },
};
</script>
<style scoped>
.font-14 {
  font-size: 14px;
}

.car-sales-from {
  background-image: linear-gradient(to top, #f8f8f8 0.84%, white);
}

@media (min-width: 960px) {
  .single-modal .sidebar-card {
    max-width: 350px;
  }
}
</style>
