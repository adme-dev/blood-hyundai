<template>
  <div class="contact-form uk-padding-small">


<div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-2@m" uk-grid>
    <div>

      <div class="uk-text-center uk-margin-medium-top">
        <div class="uk-h1 uk-text-bold uk-text-capitalize">Contact {{ siteName }}</div>
        <p>At {{ siteName }}, your satisfaction is important to us. We’re here to help.</p>
        <p v-if="activeHoursTab === 'parts_form'">
          Genuine Hyundai Parts are designed to meet the highest level of quality <br class="uk-visible@m" />
          expected not only by Hyundai, but also by our customers.
        </p>
        <div class="uk-h4 uk-margin-remove">Your Details</div>
      </div>

      <ul
        :id="id"
        class="uk-hidden"
        uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium"
      >
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
                    <input
                      id="first_name"
                      class="uk-input uk-form-large"
                      name="first_name"
                      v-model="first_name"
                      required
                      @invalid="invalidateForm"
                      placeholder="First Name"
                      type="text"
                    />
                    <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label>
                    <span class="error-message uk-text-small">First name required</span>
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input
                      id="second_name"
                      class="uk-input uk-form-large"
                      name="second_name"
                      v-model="second_name"
                      required
                      @invalid="invalidateForm"
                      placeholder="Second Name"
                      type="text"
                    />
                    <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label>
                    <span class="error-message uk-text-small">Second name required</span>
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                  </div>

                  <div class="uk-width-1-1 uk-inline">
                    <input
                      id="email_a"
                      class="uk-input uk-form-large"
                      name="email_a"
                      v-model="email_a"
                      required
                      @invalid="validEmail"
                      placeholder="Email Address"
                      type="text"
                    />
                    <label class="uk-form-label" for="email_a">Email Address<sup>*</sup></label>
                    <span class="error-message uk-text-small">Email address required</span>
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                  </div>

                  <div class="uk-width-1-1 uk-inline">
                    <input
                      id="phone_n"
                      name="phone_n"
                      class="uk-input uk-form-large"
                      @invalid="invalidateForm"
                      v-model="phone_n"
                      placeholder="Phone Number"
                      type="text"
                    />
                    <label class="uk-form-label" for="phone_n">Phone Number<sup>*</sup></label>
                    <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                  </div>

                  <div class="uk-width-1-1 uk-inline">
                    <input
                      id="registration"
                      name="registration"
                      class="uk-input uk-form-large"
                      v-model="registration"
                      placeholder="Vehicle Registration"
                      type="text"
                    />
                    <label class="uk-form-label" for="registration">Vehicle Registration</label>
                    <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                  </div>

                  <div class="uk-width-1-1 uk-inline message-textarea">
                    <textarea
                      rows="4"
                      class="uk-textarea"
                      name="message"
                      type="text"
                      v-model="message"
                      placeholder="Message"
                    ></textarea>
                    <label class="uk-form-label" for="message">Message</label>
                    <span class="uk-form-icon" uk-icon="icon: commenting"></span>
                  </div>

                  <div class="uk-width-1-1">
                    <p class="uk-text-meta uk-margin-small-top">
                      Your personal information will be collected, used and stored in strict accordance with our
                      <a class="uk-text-primary" href="/privacy-policy" target="_blank">Privacy Policy</a>. Our Privacy Policy
                      contains details on how information is used, how you may access / correct information held and our privacy
                      complaints processes.
                    </p>
                  </div>
                </fieldset>
              </form>

              <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2" uk-grid>
                <div class="uk-margin-auto-left">
                  <button class="uk-button uk-width-1-1 uk-button-primary" @click="checkForm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="uk-width-1-1 uk-inline">
            <div
              class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
              v-show="isSending"
            >
              <div class="uk-position-center uk-text-center">
                <div uk-spinner="ratio: 2"></div>
                <p>Sending...</p>
              </div>
            </div>

            <div
              class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
              v-show="isSent"
            >
              <div class="uk-position-center uk-text-center form-confirmation">
                <strong>Hi {{ first_name }}</strong>
                <div>
                  Thank you for your enquiry. One of our staff members will be in touch shortly.
                </div>
              </div>
            </div>

            <div class="uk-padding-small">
              <div>
                <button class="uk-button uk-button-link uk-link-reset" uk-switcher-item="0">
                  <span uk-icon="chevron-left"></span> Back
                </button>
                <div class="uk-text-secondary uk-text-bold uk-float-right">Confirm & Send</div>
              </div>

              <ul class="uk-list uk-list-divider uk-padding-small">
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
              </ul>

              <div class="uk-grid-small uk-margin-small-top uk-margin-medium-bottom" uk-grid>
                <div class="uk-margin-auto">
                  <button class="uk-button uk-button-large border-radius-50 uk-width-1-1 uk-button-primary" @click="submitForm">
                    Send Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div>
    <div class="uk-text-center uk-margin-medium-top">
      <div class="uk-h1 uk-text-bold uk-margin-medium-bottom">Our Trading Hours</div>
    </div>

    <div class="uk-margin--top"><HeaderHours :activeTab="activeHoursTab" :switchId="activeHoursTab"/></div>
    </div>

  </div>

  </div>
</template>
<script>
import axios from "axios";
import HeaderHours from "@/components/page-elements/HeaderHours";
export default {
  name: "ContactForm",
  props: {
    activeHoursTab:String,
    formType: String,
    id:{
      type:  String,
      default: 'default'
    }
  },
  data: function() {
    return {
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
  components: { HeaderHours },
  methods: {
    checkForm: function(e) {
      (this.errors = []),
        this.first_name || this.errors.push("Fist Name required."),
        this.second_name || this.errors.push("Second Name required."),
        this.email_a
          ? this.validEmail(this.email_a) || this.errors.push("Valid email required.")
          : this.errors.push("Email required."),
        this.errors.length || this.UIkit.switcher("#" + this.id).show("1"),
        this.first_name && this.second_name && this.email_a,
        e.preventDefault();
    },

    validEmail: function(email_a) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email_a);
    },
    invalidateForm() {
      this.errors = true;
    },
    submitForm: function(e) {
      this.isSending = !this.isSending;
      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
          payload: {
            input_1: this.first_name + " " + this.second_name,
            input_2: this.phone_n,
            input_3: this.email_a,
            input_4: this.message,
            input_27: this.second_name,
            input_28: this.$route.params.slug,
          },
          formid: this.$store.state.site.forms.contact,
        })
        .then((response) => {
          this.isSending = false;
          this.isSent = true;
        })
        .catch((error) => {
          //this.response = 'Error: ' + error.response.status
          console.log(error);
        });
    },
  },
  watch: {
    phone_n() {
      this.phone_n = this.phone_n
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
  },
};
</script>
<style>
.form-wrap .trading-title{
  display: none;
}
</style>
