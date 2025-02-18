require("dotenv").config();
const axios = require("axios");
const stripe = require("stripe")(process.env.VUE_APP_STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const payload = JSON.parse(event.body);

  if (payload.hostname === "localhost") payload.hostname = "localhost:8888";
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.VUE_APP_STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    payment_intent_data: {
      description: `Deposit for ${payload.vehicle.year.displayValue[0]} ${payload.vehicle.make.displayValue[0]} ${payload.vehicle.model.displayValue[0]} - v${payload.vehicle.stockid}`,
      metadata: {
        "vehicle-id": payload.vehicle.stockid,
      },
    },
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `http://${payload.hostname}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${payload.hostname}${payload.currentPath}?cancel=true&session_id={CHECKOUT_SESSION_ID}`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      session: session,
    }),
  };
};
