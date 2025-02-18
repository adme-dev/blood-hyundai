<template>
  <div class="modal-enquire uk-padding-remove uk-modal uk-open " :class="[show ? 'uk-display-block' : '' ]">
    <div class="variant-modal-body uk-width-1-1 uk-height-1-1 uk-margin-auto-left uk-background-default uk-padding-remove uk-animation-slide-right">
      <a
        class="uk-flex uk-flex-middle view-form-header stickytop uk-background-muted uk-padding-small"
        @click="close"
      >
        <div class="uk-link-heading uk-hidden@s">
          <span class="icon-back" uk-icon="icon: arrow-left; ratio: 2"></span>
          <span>Back</span>
        </div>
        <span class="uk-margin-auto-left uk-visible@s">
          <div class="uk-link-heading">
            <span class="icon-enquire" uk-icon="icon: close; ratio: 1.5" @click="close"></span>
          </div>
        </span>
      </a>

      <div  class="uk-padding-remove-top car-sales-from uk-background-default">
        <div class="uk-grid-collapse uk-padding-small" uk-grid>
          <div class="uk-width-expand uk-text-center">
            <p class="uk-h3 uk-margin-remove title-items">
              Enquire about the
            </p>
            <p>
              {{title}}
            </p>


            <div>
              <div v-if="vehiclePrice">
                <div class="uk-text-light space15">Drive away from</div>
                <h3 class="uk-h1 uk-text-bold uk-margin-remove">
                  ${{ vehiclePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}<sup>*</sup>
                </h3>
              </div>
              <div v-else class="uk-margin-small-bottom">
                <div class="uk-text-light space15">Contact us</div>
                <h3 class="uk-h2 uk-text-bold uk-margin-remove">
                  P.O.A
                </h3>
                <div class="uk-text-light space15">Price on application</div>
              </div>
            </div>

            <img :src="vehicleImage.images || vehicleImage" class="uk-width-1-1" width="1280" height="720" lazyload="lazy" />


            <div class="uk-hidden">
                <button
                  @click="
                  isModalAccVisible = !isModalAccVisible
                  "
                  class="uk-button uk-button-primary uk-border-rounded uk-width-auto uk-margin-small-bottom"
                  >Add accesories to enquire</button
                >
             </div>


           <variantStepFormAccesoriesCart :vehiclePrice="vehiclePrice" :key="isModalAccVisible"/>



            <div class="uk-text-bold uk-h4 uk-margin-remove uk-padding-small">Please enter your details below and the team at <b>{{siteName}}</b> will be in touch.</div>
          </div>

          <div>
        </div>
        </div>



        <ul
          class="form-tab uk-tab uk-flex-center uk-margin-small-top"
          uk-grid
          uk-switcher="animation: uk-animation-fade; swiping:false"
          id="contact-switcher"
        >
          <li class="enqformnav"><a href="#">Enquire</a></li>

          <li><a href="#">Location</a></li>
        </ul>
        <ul class="uk-switcher uk-background-default uk-position-relative">
          <li class="uk-padding-small enqform">
            <div class="uk-h3 uk-text-bold uk-margin-small-top">
              <div>Your details</div>
            </div>
            <form class="adne-form" :class="this.errors ? 'errors' : false">
              <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left" v-show="isSending">
                <div class="uk-position-center uk-text-center">
                  <div uk-spinner="ratio: 2"></div>
                  <p>Sending...</p>
                </div>
              </div>
              <div class="uk-margin-small">
                <div class="uk-inline uk-width-1-1 mdl-label">
                  <span class="uk-form-icon" uk-icon="icon: user"></span>
                  <input
                    v-model="username"
                    id="user_name"
                    name="username"
                    type="text"
                    class="uk-input uk-form-large"
                    data-vv-as="Name"
                    placeholder="First and last name"
                    :class="[errors.name ? 'field-error' : '' ]"
                  />
                  <label class="uk-form-label" for="user_name">First and Last name</label>
                  <div class="uk-text-small uk-text-danger" v-if="errors.name">
                    {{ errors.name }}
                  </div>
                </div>
              </div>

              <div class="uk-margin-small">
                <div class="uk-inline uk-width-1-1 mdl-label">
                  <div :class="{ control: true }">
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                    <input
                    class="uk-input uk-form-large"
                    id="email"
                    name="email"
                    type="text"
                    v-model="email"
                    placeholder="Email address"
                    :class="[errors.email ? 'field-error' : '' ]"
                    />
                    <label class="uk-form-label">Email Address</label>
                    <div class="uk-text-small uk-text-danger" v-if="errors.email">
                      {{ errors.email }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="uk-margin-small mdl-label">
                <div class="uk-inline uk-width-1-1 mdl-label">
                  <label class="uk-form-label" for="phone_num">Phone Number</label>
                  <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                  <input id="phone_num" class="uk-input uk-form-large" type="tel" v-model="phone" placeholder="Phone Number" />
                  <label class="uk-form-label">Phone Number</label>
                </div>
              </div>

              <div class="uk-width-1-1 uk-margin-small">
                <textarea
                  id="input_message"
                  class="uk-textarea uk-form-large"
                  type="text"
                  rows="3"
                  v-model="message"
                  @input="persist"
                  placeholder="Message"
                ></textarea>
              </div>

              <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                <label class="uk-margin-small-left uk-margin-auto-right" for="input_message">I would like a test drive.</label>
                <label><input class="uk-radio" type="radio" name="testdrive" v-model="testdrive" value="" checked /> No</label>
                <label
                  ><input
                    class="uk-radio"
                    type="radio"
                    name="testdrive"
                    v-model="testdrive"
                    value="Yes would like to book a test drive."
                  />
                  Yes</label
                >
              </div>

              <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                <label class="uk-margin-small-left uk-margin-auto-right">I have a vehicle to trade in.</label>
                <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein" value="" checked /> No</label>
                <label
                  ><input
                    class="uk-radio"
                    type="radio"
                    name="tradein"
                    v-model="tradein"
                    value="Yes I have a vehicle to trade in"
                  />
                  Yes</label
                >
              </div>

              <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                <label class="uk-margin-small-left uk-margin-auto-right">I'm interested in finance.</label>
                <label><input class="uk-radio" type="radio" name="finance" v-model="finance" value="" checked /> No</label>
                <label
                  ><input class="uk-radio" type="radio" name="finance" v-model="finance" value="Yes I'm interested in finance." />
                  Yes</label
                >
              </div>

              <div class="uk-margin uk-text-center">
                <button
                  class="uk-button uk-button-primary uk-button-large uk-width-auto border-radius-50"
                  type="button"
                  @click="validateAndSubmit"
                >
                  Send Enquiry
                </button>
              </div>
              <div class="uk-text-xsmall uk-text-muted uk-text-center">
                <sup>*</sup>We do not disclose any information collected on the website to any organisation not related to this
                company.
              </div>
            </form>

            <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left" v-show="isSent">
              <div class="uk-position-center uk-text-center form-confirmation">
                <strong>Hi {{ username }}</strong>
                <div v-html="confirmationMessage"></div>
                <button class="uk-button uk-button-primary uk-button-large uk-margin-small-top uk-hidden" @click="close()">
                  OK
                </button>
              </div>
            </div>
          </li>



          <li>
            <div class="uk-grid-collapse uk-padding-small uk-child-width-1-1" uk-grid>
              <div>
                <div class="uk-margin-small-left">
                  <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove">
                    {{ dealerInfo.name }}
                  </div>
                  <div class="uk-width-1-1 uk-text-light">{{ dealerInfo.showroom_address }}</div>
                </div>
                <div class="map-container-page uk-margin-small-top">
                  <iframe
                    v-if="dealerInfo.map_embed"
                    class="uk-height-large googlemap border-radius-10"
                    :src="dealerInfo.map_embed"
                    width="600"
                    height="450"
                    frameborder="0"
                    style="border: 0"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              <div class="uk-margin-medium-top">
                <trading-hours :tradingHours="dealerInfo.tradingHours" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <variantStepFormAccesories
      v-show="isModalAccVisible"
      @close="isModalAccVisible = false"
      :show="isModalAccVisible"
      :model="model"
      :title="title"
      :vehiclePrice="vehiclePrice"
      :key="isModalAccVisible"
    />

  </div>
</template>
n>
<script>
import axios from "axios";
import { persistorMixin } from "@/mixins/persistMixin";
import TradingHours from "@/components/page-elements/TradingHours.vue";
import variantStepFormAccesories from "./variantStepFormAccesories.vue";
import variantStepFormAccesoriesCart from "./variantStepFormAccesoriesCart.vue";
export default {
  name: "step-form-element",
  mixins: [persistorMixin(["username", "email", "phone", "message"])],
  props: ['itemid','show', 'title', 'vehicleImage', 'vehiclePrice', 'model'],
  data() {
    return {
      errors: { name: "", email: "" },
      info: [],
      accessories_items: JSON.parse(sessionStorage.getItem("accessories")) || [],
      vehicle: [],
      loading: true,
      invalid: false,
      username: "",
      email: "",
      phone: "",
      finance: "",
      tradein: "",
      testdrive: "",
      message: "",
      isSending: false,
      isSent: false,
      confirmationMessage: "",
      isModalAccVisible: false,
      siteName: this.$store.state.site.name
    };
  },
  watch: {
    phone() {
      this.phone = this.phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    }
  },
  computed: {
    dealerInfo() {
      const { name, lmct, showroom_address, map_embed, map_directions } = this.$store.state.site;
      const salesNumber = this.$store.state.site.departments.sales.phone;
      const tradingHours = this.$store.state.site.departments.sales.trading;
      return {
        lmct,
        showroom_address,
        map_embed,
        map_directions,
        salesNumber,
        tradingHours,
      };
    },
  },
  methods: {
    emailIsValid: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
                  payload: {
                    input_1: this.username,
                    input_3: this.phone,
                    input_5: this.email,
                    input_19: this.test_drive,
                    input_28: this.finance,
                    input_20: this.tradein,
                    input_4: this.message,
                    input_29: this.itemid,
                    input_30: this.title,
                    input_31: this.accessories_items.length > 0 ? JSON.stringify(this.accessories_items) : "",
                    input_32: "",
                    //input_32: JSON.stringify([this.$store.state.variant]),
                    //input_33: this.page_link,
                    input_33: this.vehicleImage.images || this.vehicleImage,
                    input_34: this.vehiclePrice,
                  },
                  formid: this.$store.state.site.forms.showroom,
          })
          .then((response) => {
            if (response.data.is_valid) {
              this.confirmationMessage = response.data.confirmation_message;
              this.isSending = false;
              this.isSent = true;
              window.dataLayer.push({
                event: "FormSub Variant",
                formName: "model variant",
                formStatus: "submitted",
                username: this.username,
                phone: this.phone,
                email: this.email,
                message: this.message,
                finance: this.finance,
                tradeIn: this.tradein,
                testDrive: this.testdrive,
                stockId: this.itemid,
              });
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
      this.$emit("close");
      document.getElementsByTagName("html")[0].classList.remove("uk-modal-page");
    },
  },
  components: { TradingHours, variantStepFormAccesories, variantStepFormAccesoriesCart },
};
</script>
<style scoped>
.border-top-1 {
  border-top: 1px solid #e1e4e8;
}
.call-us-icon {
  padding: 10px;
  border-radius: 50px;
  background-color: #d2d2d2;
  webkit-transition: background-color 500ms linear;
  transition: background-color 500ms linear;
}
.call-us-icon:hover {
  background-color: #0bd415;
}
.icon-enquire {
  width: 30px;
  height: 30px;
}
.icon-back {
  width: 40px;
  height: 40px;
}
.call-us-icon svg {
  width: 36px;
  height: 36px;
}
.trading-title{
  margin-top: 0;
}
.variant-modal-body{
  max-width: 480px
}
</style>
