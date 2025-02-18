<template>
  <div class="da-stripe-element">
    <div :class="classObject" :id="elementId"></div>

    <span v-if="elementType === 'card' && !isValid" class="uk-text-danger uk-text-small">{{
      error
    }}</span>
  </div>
</template>
<script>
export default {
  name: "DaStripeElement",
  props: {
    elementType: {
      type: String,
      required: true,
    },
    validateCustomerFields: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      stripe: {},
      stripeElement: {},
      error: "",
      isComplete: false,
      isValid: true,
      isEmpty: true,
      paymentRequest: {},
      paymentMethod: {},
    };
  },
  computed: {
    elementId: function() {
      return `stripe-element-${this.elementType}`;
    },
    classObject: function() {
      if (this.elementType === "card")
        return { "uk-input": true, "uk-form-large": true, "uk-form-danger": !this.isValid };
      if (this.elementType === "paymentRequestButton") return { "uk-width-1-1": true };
    },
  },
  mounted() {
    this.stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY, {
      apiVersion: "2020-03-02",
    });

    const domElement = document.getElementById(this.elementId);
    this.mountStripeElement(domElement);
  },
  methods: {
    mountStripeElement: function(domElement) {
      const elements = this.stripe.elements();

      if (this.elementType === "paymentRequestButton") {
        this.mountPaymentRequestButton(elements, domElement);
      } else {
        this.stripeElement = elements.create(this.elementType);
        this.stripeElement.mount(domElement);
        this.stripeElement.on("change", this.onCardChange.bind(this));
      }
    },
    mountPaymentRequestButton: function(elements, domElement) {
      this.createPaymentRequest();
      this.stripeElement = elements.create(this.elementType, {
        paymentRequest: this.paymentRequest,
      });
      (async () => {
        const result = await this.paymentRequest.canMakePayment();

        if (result) {
          this.stripeElement.mount(domElement);
          this.stripeElement.on("click", this.onPaymentRequestButtonClick.bind(this));
          this.paymentRequest.on("paymentmethod", this.onPaymentMethod.bind(this));
        }
      })();
    },
    onCardChange(e) {
      if (e.empty) {
        this.isEmpty = true;
        this.isValid = false;
        this.error = "Card details required";
      } else if (!e.empty) {
        this.error = "";
        this.isEmpty = false;
        this.isValid = true;
      }

      if (e.error) {
        this.isValid = false;

        this.error = e.error.message;
      }

      if (!e.error && e.complete) {
        this.isComplete = true;
        this.isValid = true;
        this.error = "";
        this.$emit("complete", true);
      }
    },
    validate() {
      if (this.isEmpty) {
        this.error = "Card details required";
        this.isValid = false;
      }

      if (this.isComplete && !this.error && !this.isEmpty) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }

      return this.isValid;
    },
    createPaymentRequest: function() {
      this.paymentRequest = this.stripe.paymentRequest({
        country: "AU",
        currency: "aud",
        total: {
          label: "Deposit",
          amount: parseInt(this.$store.state.site.deposit_amount) * 100,
        },
      });
    },
    onPaymentRequestButtonClick: function(e) {
      e.preventDefault();
      if (this.validateCustomerFields()) {
        this.paymentRequest.show();
      }
    },
    onPaymentMethod: function(e) {
      this.paymentMethod = e.paymentMethod;
      this.$emit("onPaymentMethod", e);
    },
    handlePayment: async function(data, event) {
      event = event || "";
      let payMethodOptions;
      if (this.elementType === "card") {
        payMethodOptions = {
          card: this.stripeElement,
          billing_details: {
            email: data.email,
          },
        };
      } else if (this.elementType === "paymentRequestButton") {
        payMethodOptions = this.paymentMethod.id;
      }
      try {
        return this.stripe
          .confirmCardPayment(data.clientSecret, { payment_method: payMethodOptions })
          .then((result) => {
            if (result.error) {
              if (event) {
                event.complete("fail");
              }
            } else {
              if (event) {
                event.complete("success");
              }
            }
            return result;
          });
      } catch (error) {}
    },
  },
};
</script>
<style scoped>
.da-stripe-element .uk-input {
  padding-top: 18px;
  padding-left: 15px !important;
  font-size: 1.25rem;
}
</style>
