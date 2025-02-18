<template>
  <div id="card-container"></div>
</template>
<script>
export default {
  name: "DaSquareCard",
  data() {
    return {
      appId: "sandbox-sq0idb-zAuA03STq2_r2rl7rZDCeA",
      locationId: "LBFC7PFB4XX1A",
      card: "",
      formData: "",
    };
  },
  async mounted() {
    const payments = window.Square.payments(this.appId, this.locationId);

    this.card = await this.initializeCard(payments);
  },
  methods: {
    async initializeCard(payments) {
      const card = await payments.card();
      await card.attach("#card-container");

      return card;
    },
    async createPayment(token) {
      const body = JSON.stringify({
        locationId: this.locationId,
        sourceId: token,
        email: this.formData.email,
        note: this.formData.note,
      });

      const paymentResponse = await fetch("/.netlify/functions/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      return paymentResponse.json();
    },

    async tokenize(paymentMethod) {
      const tokenResult = await paymentMethod.tokenize();
      if (tokenResult.status === "OK") {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }

        throw new Error(errorMessage);
      }
    },

    async handlePayment(data) {
      try {
        this.formData = data;
        const token = await this.tokenize(this.card);
        const paymentResults = await this.createPayment(token);

        return paymentResults;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
