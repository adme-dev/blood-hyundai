<template>
  <div v-if="isPaymentGatewayEnabled" class="uk-container">
    <div class="uk-margin-top uk-margin-bottom" uk-grid>
      <div class="uk-width-1-2@m" v-if="this.item">
        <single-item :item="item" />
      </div>
      <div class="uk-width-1-2@m small-lead-form">
        <div class="uk-card">
          <div class="uk-text-small">Vehicle Reservation</div>
          <h3 class="uk-margin-remove uk-text-bold">{{ depositAmount }}</h3>
        </div>
        <div v-if="paymentSuccess" class="uk-card message-success">
          <div class="uk-card-body uk-padding-small">
            <p>Payment Succesful</p>
          </div>
        </div>
        <div v-if="paymentFailed" class="uk-card message-error">
          <div class="uk-card-body uk-padding-small">
            <p>Sorry there's been some problem with the request. Please try again later</p>
          </div>
        </div>
        <form v-if="!paymentSuccess">
          <fieldset class="uk-fieldset uk-grid-small uk-grid">
            <div class="uk-width-1-2@m uk-inline">
              <da-input
                :options="{
                  name: 'first_name',
                  label: 'First Name',
                  required: true,
                  icon: 'user',
                }"
                v-model="first_name"
                ref="firstName"
              />
            </div>
            <div class="uk-width-1-2@m uk-inline">
              <da-input
                :options="{
                  name: 'last_name',
                  label: 'Last Name',
                  required: true,
                  icon: 'user',
                }"
                v-model="last_name"
                ref="lastName"
              />
            </div>
            <div class="uk-width-1-1 uk-inline">
              <da-email
                :options="{
                  name: 'email',
                  label: 'Email',
                  required: true,
                  icon: 'mail',
                }"
                v-model="email"
                ref="email"
              />
            </div>
            <div class="uk-width-1-1 uk-inline">
              <da-phone
                :options="{
                  name: 'phone',
                  label: 'Phone Number',
                  required: true,
                  icon: 'phone',
                }"
                v-model="phone"
                ref="phone"
              />
            </div>
            <div class="uk-width-1-1 uk-inline">
              <da-square-card v-if="isPaymentGatewaySquare" ref="squareCard" />
              <DaStripeElement
                v-if="isPaymentGatewayStripe"
                ref="stripeElementCard"
                elementType="card"
              />
            </div>
            <div class="uk-width-1-1 uk-inline">
              <button
                type="button"
                class="uk-button uk-button-primary uk-button-large uk-width-1-1 border-radius-50"
                @click="processPayment"
              >
                Pay Now
              </button>
            </div>
            <div class="uk-width-1-1 uk-inline">
              <DaStripeElement
                v-if="isPaymentGatewayStripe"
                ref="stripeElementpaymentRequestButton"
                elementType="paymentRequestButton"
                :validateCustomerFields="validateCustomerFields"
                @onPaymentMethod="processPaymentRequest"
              />
            </div>
            <!-- <DaStripePaymentButton
              :validateCustomerFields="validateCustomerFields"
              @onPaymentMethod="processPaymentRequest"
              ref="stripePaymentButton"
            /> -->
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import DaInput from "@/components/form-elements/DaInput";
import DaEmail from "@/components/form-elements/DaEmail";
import DaPhone from "@/components/form-elements/DaPhone";
import DaSquareCard from "@/components/form-elements/DaSquareCard";
import DaStripeElement from "@/components/form-elements/DaStripeElement";
import SingleItem from "@/components/search/Item/SingleItem";
import axios from "axios";
import { StripeService } from "@/services";
export default {
  name: "secure-vehicle",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      item: "",
      paymentFailed: false,
      paymentSuccess: false,
    };
  },
  components: {
    DaInput,
    DaEmail,
    DaPhone,
    DaSquareCard,
    DaStripeElement,
    SingleItem,
  },
  computed: {
    depositAmount() {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        this.$store.state.site.deposit_amount
      );
    },
    isPaymentGatewayStripe() {
      return this.$store.state.site.payment_gateway === "stripe";
    },
    isPaymentGatewaySquare() {
      return this.$store.state.site.payment_gateway === "square";
    },
    isPaymentGatewayEnabled() {
      return this.$store.state.site.payment_gateway === "noPaymentGateway" ? false : true;
    },
    itemId() {
      return this.$route.params.id;
    },
  },

  watch: {
    "$route.params": {
      handler(newValue) {
        if (Object.keys(this.$store.state.vehicles).length === 0) {
          this.$store.dispatch("getVehicles").then(() => {
            this.item = this.$store.getters.vehicleById(this.itemId);
          });
        } else {
          this.item = this.$store.getters.vehicleById(this.itemId);
        }
      },
      immediate: true,
    },
  },
  methods: {
    isFormValid(validatedObject) {
      return (
        Object.values(validatedObject).reduce((m, o) => m + o) ===
        Object.keys(validatedObject).length
      );
    },
    validateCustomerFields() {
      const validatedFileds = {
        firstNameValid: this.$refs.firstName.validate(),
        lastNameValid: this.$refs.lastName.validate(),
        emailValid: this.$refs.email.validate(),
        phoneValid: this.$refs.phone.validate(),
      };

      return this.isFormValid(validatedFileds);
    },
    async processPayment() {
      this.$store.dispatch("setLoading", true);

      const validatedForm = {
        isFormValid: this.validateCustomerFields(),
        cardValid: this.$refs.stripeElementCard.validate(),
      };

      const isFormValid = this.isFormValid(validatedForm);

      let payment = {};

      if (isFormValid) {
        if (this.$store.state.site.payment_gateway === "square")
          payment = await this.processSquarePayment();
        if (this.$store.state.site.payment_gateway === "stripe") {
          payment = await this.processStripePayment("card");
        }

        this.submitDepositForm(payment);
      }
      this.$store.dispatch("setLoading", false);
    },
    async processPaymentRequest(e) {
      this.$store.dispatch("setLoading", true);
      const payment = await this.processStripePayment("PaymentRequestButton", e);
      await this.submitDepositForm(payment);
      this.$store.dispatch("setLoading", false);
    },
    async processStripePayment(elementType, event) {
      event = event || "";
      const data = {
        email: this.$refs.email.value,
        description: `#${this.item.stockid} - ${this.item.year.displayValue[0]} ${this.item.make.displayValue[0]}
          ${this.item.model.displayValue[0]}`,
      };

      let payment = {};
      await StripeService.createPaymentIntent(data).then(async (res) => {
        data.clientSecret = res.data.clientSecret;

        let paymentResponse;
        if (elementType === "PaymentRequestButton")
          paymentResponse = await this.$refs.stripeElementpaymentRequestButton.handlePayment(
            data,
            event
          );
        if (elementType === "card")
          paymentResponse = await this.$refs.stripeElementCard.handlePayment(data, event);

        if (paymentResponse.paymentIntent && paymentResponse.paymentIntent.status === "succeeded") {
          this.paymentSuccess = true;
          payment.status = paymentResponse.paymentIntent.status;
          payment.id = paymentResponse.paymentIntent.id;
          payment.message = "";
        }

        if (paymentResponse.error) {
          this.paymentFailed = true;
          payment.status = "failed";
          payment.id = paymentResponse.error.payment_intent.id;
          payment.message = paymentResponse.error.message;
        }
      });
      return payment;
    },
    async processSquarePayment() {
      const data = {
        email: this.$refs.email.value,
        note: `#${this.item.stockid} - ${this.item.year.displayValue[0]} ${this.item.make.displayValue[0]}
          ${this.item.model.displayValue[0]}`,
      };

      const paymentResponse = await this.$refs.squareCard.handlePayment(data);

      let payment = {};
      if (paymentResponse.success) {
        this.paymentSuccess = true;
        payment.status = paymentResponse.payment.status;
        payment.id = paymentResponse.payment.id;
        payment.message = `orderId : ${paymentResponse.payment.orderId}`;
      }

      if (paymentResponse.statusCode === 400) {
        this.paymentFailed = true;
        payment.status = paymentResponse.result.payment.status;
        payment.id = paymentResponse.result.payment.id;
        payment.message = paymentResponse.result.errors[0].detail;
      }

      return payment;
    },

    async submitDepositForm(payment) {
      const formData = {
        payload: {
          input_1: this.first_name,
          input_2: this.last_name,
          input_3: this.phone,
          input_4: this.email,
          input_5: this.$store.state.site.deposit_amount,
          input_6: this.$store.state.site.payment_gateway,
          input_7: payment.status,
          input_8: payment.message,
          input_9: payment.id,
          input_10: this.item.stockid,
          input_11: this.item,
        },
        formid: "8",
      };
      await axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, formData)
        .then((response) => {})
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
<style scoped>
.message-success {
  color: #198754;
  /* border: 1px solid #198754; */
  background-color: #1987541a;
}
.message-error {
  color: #f0506e;
  /* border: 1px solid #198754; */
  background-color: #f0506e1a;
}
</style>
