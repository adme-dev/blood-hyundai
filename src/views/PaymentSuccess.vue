<template>
  <div class="uk-background-muted uk-container">
    <div class="uk-margin-top uk-margin-bottom" uk-grid>
      <div class="uk-width-1-2@m" v-if="this.item">
        <single-item :item="item" />
      </div>
      <div class="uk-width-1-2@m small-lead-form">
        <div class="uk-card message-success">
          <div class="uk-card-body uk-padding-small">
            <p>Payment Succesful. Thank you for your intrest in this vehicle</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { StripeService } from "@/services";
import SingleItem from "@/components/search/Item/SingleItem";
export default {
  name: "payment-success",
  components: { SingleItem },
  data() {
    return {
      item: "",
    };
  },
  methods: {
    redirect() {
      this.$router.push({
        name: "vehicle-for-sale",
        params: {
          year: this.item.year.displayValue[0],
          make: this.item.make.value[0],
          model: this.item.model.value[0],
          id: this.item.id,
        },
      });
    },
  },
  mounted() {
    StripeService.retrieveCheckoutSession(this.$route.query.session_id).then((data) => {
      if (Object.keys(this.$store.state.vehicles).length === 0) {
        this.$store.dispatch("getVehicles").then(() => {
          this.item = this.$store.getters.vehicleById(data.vehicleId);
          if (this.$route.query.cancel) this.redirect();
        });
      } else {
        this.item = this.$store.getters.vehicleById(data.vehicleId);
        if (this.$route.query.cancel) this.redirect();
      }
    });
  },
};
</script>
<style scoped>
.message-success {
  color: #198754;
  /* border: 1px solid #198754; */
  background-color: #1987541a;
}
</style>
