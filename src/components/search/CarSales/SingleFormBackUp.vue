<template>
  <div class="car-sales-from">
    <div class="uk-card uk-card-hover uk-padding-small">
      <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove uk-text-center">
        Enquire on this vehicle
      </div>
      <div class="uk-width-1-1 uk-text-small uk-text-center">or ask a question</div>

      <form class="adme-form">
        <div
          class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
          v-show="isSending"
        >
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
              id="username"
              name="username"
              type="text"
              class="uk-input uk-form-large"
              :class="errors.name ? 'field-error' : ''"
              placeholder="First and last name"
            />
            <label class="uk-form-label">First and last name</label>
          </div>
          <div v-if="errors.name" class="uk-text-small uk-text-danger">{{ errors.name }}</div>
        </div>

        <div class="uk-margin-small">
          <div class="uk-inline uk-width-1-1 mdl-label">
            <div :class="{ control: true }">
              <span class="uk-form-icon" uk-icon="icon: mail"></span>
              <input
                class="uk-input uk-form-large"
                :class="errors.email ? 'field-error' : ''"
                name="email"
                type="text"
                v-model="email"
                placeholder="Email address"
              />
              <label class="uk-form-label">Email address</label>
            </div>
          </div>
          <div v-show="errors.email" class="uk-text-small uk-text-danger">{{ errors.email }}</div>
        </div>

        <div class="uk-margin-small mdl-label">
          <div class="uk-inline uk-width-1-1 mdl-label">
            <label class="uk-form-label">Phone Number</label>
            <span class="uk-form-icon" uk-icon="icon: receiver"></span>
            <input
              id="input_3"
              class="uk-input uk-form-large"
              type="tel"
              v-model="phone"
              placeholder="Phone Number"
            />
            <label class="uk-form-label">Phone Number</label>
          </div>
        </div>

        <div class="uk-width-1-1 uk-margin-small">
          <textarea
            id="input_4"
            class="uk-textarea uk-form-large"
            type="text"
            rows="3"
            v-model="message"
            placeholder="Message"
          ></textarea>
        </div>

        <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
          <label class="uk-margin-small-left uk-margin-auto-right font-14"
            >I would like a test drive.</label
          >
          <label
            ><input
              class="uk-radio"
              type="radio"
              name="testdrive"
              v-model="testdrive"
              value=""
              checked
            />
            No</label
          >
          <label
            ><input
              class="uk-radio"
              type="radio"
              name="testdrive"
              v-model="testdrive"
              value="Yes I would like a test drive"
            />
            Yes</label
          >
        </div>

        <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
          <label class="uk-margin-small-left uk-margin-auto-right font-14"
            >I'm interested in finance.</label
          >
          <label
            ><input
              class="uk-radio"
              type="radio"
              name="finance"
              v-model="finance"
              value=""
              checked
            />
            No</label
          >
          <label
            ><input
              class="uk-radio"
              type="radio"
              name="finance"
              v-model="finance"
              value="Yes I'm interested in finance."
            />
            Yes</label
          >
        </div>


        <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
          <label class="uk-margin-small-left uk-margin-auto-right font-14"
            >I have a vehicle to trade in.</label
          >
          <label
            ><input
              class="uk-radio"
              type="radio"
              name="tradein"
              v-model="tradein"
              value=""
              checked
            />
            No</label
          >
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

<div v-if="tradein" class="uk-width-1-1">



      <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-medium-top uk-text-center">
        Your trade in details:
      </div>

<!-- <div v-for="make in makes" :key="make" class="uk-width-1-1">
 {{make}}
</div> -->

<el-select v-model="makes_value" placeholder="Select Vehicle Make" @change="makesChange" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
    <el-option
      v-for="item in makes"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>

  <div v-if="makes_value && models">
   <el-select v-model="models_value" placeholder="Select Vehicle Model" @change="modelsChange" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
      <el-option
        v-for="item in models"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
  <div v-else-if="showForm" class="uk-width-1-1 mdl-label">
    <div class="uk-inline uk-width-1-1">
    <span class="uk-form-icon" uk-icon="icon: user"></span>
    <input
      v-model="username"
      id="username"
      name="username"
      type="text"
      :class="errors.name ? 'field-error' : ''"
      class="uk-input uk-form-large"
      placeholder="Enter varint details"
    />
    <label class="uk-form-label">Enter varint details</label>
  </div>
  <div v-if="errors.name" class="uk-text-small uk-text-danger">{{ errors.name }}</div>
  </div>


    <el-select v-if="models_value" v-model="variants_value" placeholder="Select Vehicle Variant" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
        <el-option
          v-for="item in variants"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-small uk-text-center">
        Vehicle condition:
      </div>

      <div class="uk-display-block uk-padding uk-padding-remove-top">
        <el-slider
        v-model="vehicle_condition"
        :show-tooltip="false"
        :marks="marks">
       </el-slider>
    </div>

<div class="uk-grid-small" uk-grid>

  <div class="uk-width-1-2 mdl-label">
    <div class="uk-inline">
    <span class="uk-form-icon" uk-icon="icon: user"></span>
    <input
      v-model="username"
      id="username"
      name="username"
      type="text"
      class="uk-input uk-form-large"
      placeholder="First and last name"
    />
    <label class="uk-form-label">First and last name</label>
  </div>
  <div v-if="errors.name" class="uk-text-small uk-text-danger">{{ errors.name }}</div>
  </div>

  <div class="uk-width-1-2 mdl-label">
    <div class="uk-inline">
    <span class="uk-form-icon" uk-icon="icon: user"></span>
    <input
      v-model="username"
      id="username"
      name="username"
      type="text"
      class="uk-input uk-form-large"
      placeholder="First and last name"
    />
    <label class="uk-form-label">First and last name</label>
  </div>
  <div v-if="errors.name" class="uk-text-small uk-text-danger">{{ errors.name }}</div>
  </div>

  <div class="uk-width-1-1 mdl-label">
    <div class="uk-inline uk-width-1-1">
    <span class="uk-form-icon" uk-icon="icon: user"></span>
    <input
      v-model="username"
      id="username"
      name="username"
      type="text"
      :class="errors.name ? 'field-error' : ''"
      class="uk-input uk-form-large"
      placeholder="First and last name"
    />
    <label class="uk-form-label">First and last name</label>
  </div>
  <div v-if="errors.name" class="uk-text-small uk-text-danger">{{ errors.name }}</div>
  </div>

  <div class="uk-width-1-1"><hr></div>

  <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-small-top uk-text-center">
    How many keys?
  </div>

    <div class="uk-inline aval_keys uk-margin-auto">
      <el-switch
        style="display: block"
        v-model="aval_keys"
        active-color="#2fbc05"
        inactive-color="#2fbc05"
        active-text="I have 2 keys"
        inactive-text="I have 1 key">
      </el-switch>
    </div>

   <div class="uk-width-1-1"><hr></div>

    <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-small-top uk-text-center">
      Do you have full service history?
    </div>

      <div class="uk-inline aval_keys uk-margin-auto">
        <el-switch
          style="display: block"
          v-model="service_history"
          active-color="#2fbc05"
          inactive-color="#2fbc05"
          active-text="Yes"
          inactive-text="No">
        </el-switch>
      </div>

      <div class="uk-width-1-1"><hr></div>

  </div>

 </div>

</div>

<TradeInForm/>

        <div class="uk-margin uk-text-center">
          <button
            class="uk-button uk-button-primary uk-button-large uk-width-auto border-radius-50"
            type="button"
            @click="validateAndSubmit"
          >
            Send Enquiry
          </button>
        </div>
        <div class="uk-text-small uk-text-muted uk-text-center">
          <sup>*</sup>Please note this form allows us to undertake a sight-unseen appraisal of your vehicle to determine it’s likely value. Whilst we endeavour to use due care and skill in doing so, all valuations are subject to final inspection and test drive.
        </div>
      </form>

      <div
        class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
        v-show="isSent"
      >
        <div class="uk-position-center uk-text-center">
          <strong>Hi {{ username }}</strong>
          <div>Thank you for your enquiry. One of our staff members will be in touch shortly.</div>
          <button
            class="uk-button uk-button-primary uk-button-large uk-width-auto border-radius-50"
            @click="close()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Switch, Select, Option, Slider } from "element-ui";
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Slider);
import TradeInForm from "@/components/search/CarSales/TradeInForm.vue";
export default {
  name: "carSalesSingleForm",
  props: {
    itemStock: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      makes: [],
      models: [],
      variants:[],
      variants_value: "",
      makes_value: "",
      models_value: "",
      vehicle_condition: "",
        marks: {
          0: 'POOR',
          50: 'GOOD',
          100: 'ECELLENT',
        },
      errors: { name: "", email: "" },
      showForm: false,
      invalid: false,
      username: "",
      email: "",
      phone: "",
      finance: "",
      tradein: "",
      testdrive: "",
      message: "",
      service_history: "",
      aval_keys: "",
      isSending: false,
      isSent: false.itemStock,
      confirmationMessage: "",
    };
  },
  components: {
    TradeInForm
  },
  watch: {
    phone() {
      this.phone = this.phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
  },
  created: function() {
    this.getVehicleData();
  },
  methods: {
    async getVehicleData() {
      try {
        const response = await axios.get(
          '/vehicles/makes.json'
        );
        // JSON responses are automatically parsed.
        this.makes = response.data.makes;

      } catch (error) {
        console.log(error);
      }
    },
    async makesChange(item) {
      try {
        const response = await axios.get(
          `/vehicles/models/${item}.json`
        );
        // JSON responses are automatically parsed.
        this.models = null;
        this.models_value = null;
        this.variants_value = null;
        this.models = response.data.results;
        if(typeof response.data.results !== "object"){
          this.showForm = true
        }
      } catch (error) {
        console.log(error);
      }
    },
    async modelsChange(item) {
      try {
        const response = await axios.get(
          `/vehicles/variants/${this.makes_value}/${this.makes_value}-${item}.json`
        );
        // JSON responses are automatically parsed.
        this.variants_value = null;
        this.variants = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    emailIsValid: function(email) {
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
        axios
          .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
            payload: {
              input_1: this.username,
              input_2: this.phone,
              input_3: this.email,
              input_4: this.message,
              input_5: this.itemStock,
              input_6: this.finance,
              input_7: this.tradein,
              input_17: this.testdrive,
              input_16: JSON.stringify(this.$store.getters.vehicleById(this.itemStock)),
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
<style>
.font-14{
  font-size: 14px;
}
.el-select.v-select .el-input--suffix .el-input__inner {
    height: 54px;
    border-radius: 5px;
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
