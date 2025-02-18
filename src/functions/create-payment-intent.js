require("dotenv").config();
const axios = require("axios");
const stripe = require("stripe")(process.env.VUE_APP_STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const payload = JSON.parse(event.body);

  // Stripe payment processing begins here
  try {
    let amount = 0;
    await axios
      .get(`${process.env.VUE_APP_PUBLIC_API_URL}/deposit-amount`)
      .then((res) => {
        amount = res.data.amount * 100;
      })
      .catch((error) => {
        console.error("error getting deposit amount", error);
      });
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "aud",
      amount: amount,
      payment_method_types: ["card"],
      description: payload.description,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 400,
      body: JSON.stringify({
        status: err,
      }),
    };
  }
};
