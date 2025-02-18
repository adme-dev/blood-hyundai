require("dotenv").config();
const axios = require("axios");
const stripe = require("stripe")(process.env.VUE_APP_STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const session = await stripe.checkout.sessions.retrieve(body.id);
  const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

  return {
    statusCode: 200,
    body: JSON.stringify({
      vehicleId: paymentIntent.metadata["vehicle-id"],
      description: paymentIntent.description,
    }),
  };
};
