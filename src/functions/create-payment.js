require("dotenv").config();
const square = require("square");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
exports.handler = async (event, context) => {
  const payload = JSON.parse(event.body);

  try {
    let amount = 0;
    await axios
      .get(`${process.env.VUE_APP_PUBLIC_API_URL}/deposit-amount`)
      .then((res) => {
        amount = res.data.amount * 100;
      })
      .catch((error) => {
        console.error("error getting variant by slug data", error);
      });

    const client = new square.Client({
      environment: square.Environment.Sandbox,
      accessToken: process.env.VUE_APP_SQUARE_ACCESS_TOKEN,
    });

    const payment = {
      sourceId: payload.sourceId,
      locationId: payload.locationId,
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount,
        currency: "AUD",
      },
      buyerEmailAddress: payload.email,
      note: payload.note,
    };

    if (payload.verificationToken) {
      payment.verificationToken = payload.verificationToken;
    }

    const { result, statusCode } = await client.paymentsApi.createPayment(payment);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          receiptUrl: result.payment.receiptUrl,
          orderId: result.payment.orderId,
        },
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify(err),
    };
  }
};
