<template>
  <div class="uk-padding-small sticky" :class="{ 'footerpanel': scrollpx > 600 }">
          <div class="uk-container uk-container-large">
            <div class="uk-grid-small uk-flex uk-flex-middle uk-light uk-grid">

              <div class="uk-text-xsmall uk-text-bold uk-width-1-6 uk-visible@m">
                {{ title }}
              </div>

              <div>
                <div class="uk-text-left">
                  <div>
                    <div class="uk-text-xsmall fo-dr-ti">DRIVE AWAY FROM</div>
                    <div class="uk-text-large uk-text-bold">
                      ${{ price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div>
                <span class="uk-icon-button uk-text-bold fo-or">OR</span>
              </div>

              <div class="uk-inline">
                <div class="uk-text-large uk-text-bold">${{perweek}} p/week <span class="perweek-icon uk-position-top-right" uk-icon="warning"></span></div>
                <div class="uk-text-xsmall">To Approved Purchasers</div>
              </div> -->

              <div class="uk-margin-auto-left uk-hidden@m">
                <a
                    href="#"
                    @click.prevent="showEnquiryModal()"
                    class="fo-en-btn uk-button uk-button-small uk-button-secondary uk-text-bold tm-button-default"
                >Enquire
                </a>
              </div>

              <div class="uk-padding-remove uk-margin-auto-left uk-grid uk-visible@m">
                <div>
                  <router-link
                    to="/sell-my-car"
                    class="uk-button uk-button-default tm-button-default uk-width-small"
                  >
                  Sell your car
                  </router-link>
                </div>
                <div>
                  <a
                      href="#"
                      @click.prevent="showEnquiryModal()"
                      class="fo-en-btn uk-button uk-button-secondary uk-text-bold tm-button-default uk-width-small"
                  >Enquire
                  </a>
                </div>
              </div>
            </div>
          </div>

          <SingleFooterForm :stockid="stock_id" />


        </div>
</template>

<script>
import SingleFooterForm from "@/components/search/CarSales/SingleFooterForm.vue";
export default {
  name: "CarSalesSingleFooter",
  props: ["stock_id", "title", "price", "perweek"],
  components: {
    SingleFooterForm,
  },
  data() {
    return {
      scrollpx: 0,
      salesNumber: this.$store.state.site.departments.sales.phone
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollpx = window.scrollY;
    },
    showEnquiryModal() {
      this.UIkit.modal("#modal-"+this.stock_id).show();
    },
  }
};
</script>
<style scoped>
.sticky {
  position: fixed;
  width: 100%;
  background-color: #001e50;
  top: -100px;
  transition: top 0.5s ease;
}
.footerpanel.sticky {
  top: -2px;
  z-index: 4;
}
.footerpanel .tm-button-default {
  border: solid #fff 2px !important;
}
.perweek-icon{
  color:#efef;
  right: -10px
}
.fo-or{
  color: #001e50;
  background-color: #fff;
}
.fo-en-btn{
  color: #001e50;
}
@media (max-width: 960px) {
  .sticky {
    top: auto;
    bottom:-100px;
  }
  .footerpanel.sticky {
    top: auto;
    bottom:-2px;
    z-index: 999;
  }
  .fo-en-btn{
    margin-right: 10px;
  }
  .sticky .uk-text-large {
    font-size: 0.9rem;
    line-height: 1.2;
   }
   .fo-dr-ti{
     font-size: 0.4rem;
   }
}
</style>
