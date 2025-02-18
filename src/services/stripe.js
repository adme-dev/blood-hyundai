import axios from "axios";
const createPaymentIntent = (vehicle) => {
  return axios
    .post(
      "/.netlify/functions/create-payment-intent",
      { vehicle: vehicle },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("error creating stripe payment intent", error);
    });
};

const createCheckoutSession = (payload) => {
  return axios
    .post(
      "/.netlify/functions/create-checkout-session",
      {
        vehicle: payload.item,
        currentPath: payload.currentPath,
        hostname: window.location.hostname,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error creating stripe payment intent", error);
    });
};
const retrieveCheckoutSession = (id) => {
  return axios
    .post(
      "/.netlify/functions/retrieve-stripe-session",
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("error creating stripe payment intent", error);
    });
};

const StripeService = {
  createPaymentIntent,
  createCheckoutSession,
  retrieveCheckoutSession,
};

export default StripeService;
