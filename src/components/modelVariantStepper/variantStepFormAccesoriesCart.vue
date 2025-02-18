<template>
  <div v-if="accessories_items.length > 0" class="uk-width-1-1 uk-margin-small-top">
    <div class="checkout">
    <div class="uk-grid-collapse uk-grid">
      <div class="uk-width-1-1 uk-padding-small">
        <span class="uk-h3 uk-text-bold uk-float-left uk-margin-remove">Your accessories</span>
        <span class="uk-float-right"
          ><span uk-icon="icon: cart"></span
          ><span class="uk-badge uk-background-secondary uk-margin-small-right">{{
            accessories_items.length
          }}</span></span
        >
      </div>

      <ul class="uk-list uk-width-1-1 uk-list-divider" uk-scrollspy="cls: uk-animation-fade; target: li; delay: 100">
        <li v-for="(item, id) in accessories_items" :key="id" class="uk-visible-toggle uk-position-relative">
          <div>
            <div class="uk-grid-collapse uk-text-left uk-grid">
              <div class="uk-width-auto">
                <div
                  class="uk-background-cover uk-margin-small-right cart-image"
                  :style="{ backgroundImage: `url(${item.image})` }"
                >
                  <canvas width="80px" height="60px"></canvas>
                </div>
              </div>
              <div class="uk-width-expand">
                <div class="uk-text-meta uk-text-secondary">
                  {{ item.modal }}
                </div>
                <div v-html="item.title"></div>
                <div>
                  <div class="uk-text-emphasis">
                    <span class="uk-text-bold">{{ item.price | currency }}</span
                    ><sup>A1</sup>
                  </div>
                </div>
              </div>
            </div>
            <a
              class="uk-badge uk-background-muted uk-text-danger uk-position-top-right uk-margin-small-top uk-position-z-index"
              href="#"
              @click.prevent="sub(item)"
              uk-icon="icon: close; ratio: .75"
              uk-tooltip="Remove"
            ></a>
          </div>
        </li>
        <li class="uk-h4 uk-margin-remove-bottom uk-text-left">
          Total: <b>{{ cashDividends | currency }}</b>
        </li>
      </ul>
    </div>
    <div class="uk-text-meta-xs uk-text-left">
      <sup>A1</sup>There may be a delay to any pricing updates displaying correctly on our materials. Always
      obtain confirmation on updated pricing from {{ siteName }}. All prices are subject to change at the
      discretion of {{ siteName }}.
    </div>

  </div>

    <div v-if="cashDividends && vehiclePrice" class="uk-padding-small uk-text-left">
      <div class="uk-text-bold">
        <div class="uk-h3 uk-margin-remove">Estimated Total Price:</div>
        <div class="uk-h1 uk-text-bold uk-margin-remove">${{basket_total}}<sup>*</sup></div>
      </div>
        <div class="uk-text-xsmall uk-text-muted">
          <sup>*</sup>All prices are subject to change at the discretion of {{siteName}}.
        </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "step-form-accesories-cart",
  props: ['vehiclePrice'],
  data() {
    return {
      accessories_items: [],
      total: 0,
      cart: [],
      siteName: this.$store.state.site.name,
    };
  },
  mounted() {
    this.getAccessoriesList();
  },
  watch: {

  },
  computed: {
    cashDividends() {
      let basket_total = 0;
      this.accessories_items.forEach((val) => {
        basket_total += Number(val.price);
        //or if you pass float numbers , use parseFloat()
      });
      return basket_total;
    },
    basket_total() {
      let total = this.cashDividends + this.vehiclePrice;
      return total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
  },
  methods: {
    getAccessoriesList() {
      if (sessionStorage.getItem("accessories")) this.accessories_items = JSON.parse(sessionStorage.getItem("accessories")) || [];
    },
    sub(item) {
      const items = JSON.parse(sessionStorage.getItem("accessories"));
      const filtered = items.filter((item_) => item_.id !== item.id);
      sessionStorage.setItem("accessories", JSON.stringify(filtered));
      this.total -= parseFloat(item.price);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);

            break;
          }
        }
      }
    this.accessories_items = JSON.parse(sessionStorage.getItem("accessories")) || [];
    },
  },
  //components: { Accessories },
  filters: {
  currency(price) {
    return "$" + price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
 },
};
</script>
<style scoped>
.accesories-modal-body {
  width: 460px;
}
.modal-step-accesories {
  background: rgba(0, 0, 0, 0.18);
  transition: opacity 0.1s linear;
}
/* .accesories-modal-body .uk-h3.uk-text-bold{
  margin-left: 20px
} */
</style>
