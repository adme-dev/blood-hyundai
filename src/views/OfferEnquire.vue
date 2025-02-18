<template>

  <div class="viewport">

    <div v-show="variant == 0">
      <div class="uk-flex uk-height-medium" uk-height-viewport="offset-top: true">
        <div class="uk-margin-auto uk-margin-auto-vertical">
          <div uk-spinner="ratio: 2"></div>
        </div>
      </div>
    </div>



    <div v-if="variant" class="offers-content uk-grid-collapse uk-grid uk-background-muted">

      <div class="hero-offer-left uk-width-1-1 uk-width-expand@m uk-grid-collapse uk-grid">

        <div class="uk-padding-small">
          <router-link to="/special-offers" class="uk-button uk-button-text uk-margin-medium-bottom uk-width-auto">
            <div class="uk-link-heading">
              <span uk-icon="icon: arrow-left; ratio: 1.2"></span>
              <span>Back to offer list</span>
            </div>
          </router-link>
        </div>

        <div class="uk-width-1-1 uk-margin-auto">
          <img :data-src="'' + variant.vehicle_image[0] + ''" class="uk-width-1-1" loading="lazy" data-uk-img />
        </div>

      </div>

      <div class="uk-width-1-1 uk-width-1-3@m variant offer-panel-header">

        <div class="uk-padding-small uk-padding-remove-bottom">

          <div class="uk-padding-small">


            <div v-if="variant.offers" class="uk-text-bold uk-text-primary uk-margin" v-html="variant.offers"></div>


            <a v-if="variant.disclaimer" class="uk-text-small uk-text-light"
              :href="'#modal-disclaimer-' + variant.id + ''" uk-toggle>Show disclaimers</a>

            <div class="uk-text-left uk-margin-medium-top">
              <h3 class="uk-h3 uk-text-bold uk-text-uppercase uk-margin-remove">
                {{ variant.model }}
              </h3>
              <h3 class="uk-h4 uk-margin-remove">
                {{ variant.title }}
              </h3>

              <div v-if="variant.drive_away" class="uk-margin-small-top">
                <div class="uk-text-small uk-text-bold uk-text-emphasis">
                  DRIVE AWAY FROM<sup>*</sup>
                </div>
                <div class="uk-h2 uk-margin-remove uk-text-bold text-red">
                  ${{ variant.drive_away.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                </div>
              </div>

              <div v-if="variant.abn_holder_price" class="uk-text-small">
                <div>ABN Holder Price From <b>${{ variant.abn_holder_price | formatPrice }}<sup>A1</sup></b> Driveaway
                </div>
              </div>



              <div v-if="variant.features">
                <div class="uk-h3 uk-text-bold uk-margin-small-top">Key Features</div>

                <div class="features uk-text-light uk-overflow-hidden"
                  :class="{ 'uk-height-small uk-margin-small-bottom': toggled === true, 'uk-height-1-1': toggled === false }"
                  v-html="variant.features"></div>
                <button class="uk-button uk-button-link uk-margin-medium-bottom"
                  :class="{ 'uk-visible': toggled === true, 'uk-hidden': toggled === false }" @click="toggle()"><span
                    uk-icon="chevron-down"></span> SHOW MORE KEY FEATURES
                </button>
                <button class="uk-button uk-button-link uk-margin-medium-bottom"
                  :class="{ 'uk-hidden': toggled === true, 'uk-visible': toggled === false }" @click="toggle()"><span
                    uk-icon="chevron-up"></span> SHOW LESS KEY FEATURES
                </button>

              </div>

              <router-link :to="'/vehicle/' + variant.model.replace(/\s+/g, '-').toLowerCase() + ''"
                class="uk-button uk-button-text uk-h6 uk-text-bold uk-text-uppercase uk-width-auto">MORE ABOUT
                {{ variant.model }}
                <svg class="forward-svg" width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                  data-svg="chevron-right">
                  <polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"></polyline>
                </svg>
              </router-link>

            </div>

            <div :id="'modal-disclaimer-' + variant.id + ''" class="uk-flex-top" uk-modal>
              <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body uk-width-3-4@s">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-text-bold">Disclaimer</div>
                <div class="uk-text-small uk-text-light" v-html="variant.disclaimer"></div>
              </div>
            </div>

          </div>


        </div>

        <div>

          <form-offer :id="variant.id" :title="variant.title" :image="variant.vehicle_image[0]" :page_link="current_url"
            :price="variant.drive_away"></form-offer>
        </div>


      </div>



    </div>

    <!-- <div>
          <variantSlider :itemModel="variant.model"></variantSlider>
        </div>
        <div class="uk-background-muted">
         <carRelated :model="variant.model" vehicle_id="0"></carRelated>
        </div> -->


  </div>
  </div>

</template>
<script>

import VariantService from '@/services/variant'
import MetaMixin from '@/mixins/meta'
import FormOffer from '@/components/page-elements/FormOffer.vue'
export default {
  name: 'Offers',
  mixins: [MetaMixin],
  components: {
    FormOffer: FormOffer
    // variantSlider: lazyLoadComponent({
    //   componentFactory: () => import(/* webpackChunkName: "variantSlider" */ "@/components/modelSlider/variantSlider"),
    //   loading: BlockLoading,
    // }),
    // carRelated: lazyLoadComponent({
    //   componentFactory: () => import(/* webpackChunkName: "carRelated" */ "@/builder/components/carsalesRelated.vue"),
    //   loading: BlockLoading,
    // }),
  },
  data() {
    return {
      model: '',
      variant: '',
      current_url: '',
      toggled: true,
    }
  },
  mounted() {
    VariantService.getOffersById(this.$route.params.id).then(data => {
      //console.log(data)
      this.variant = data
    })
    this.current_url = window.location.href
  },
  computed: {},
  methods: {
    toggle: function () {
      this.toggled = !this.toggled
    },
    formatBullet(value) {
      var myNewString = '<li>' + value.split('\r\n').join('</li><li>') + '</li>'
      return myNewString
    }
  },
  filters: {
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
}

</script>
<style scoped>
.hero-offer-left {
  height: 90vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.offers-content.uk-background-muted {
  background: #f5f6f7;
}

.offers-content .enqform {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .15);
}

.offer-panel-header {
  min-width: 350px;
  background: #fff;
  position: relative;
  z-index: 3;
}

.offer-panel-header .features li::before {
  background-image: none;
  background-color: #c00;
  border-radius: 25px;
  top: 8px;
  width: 0.3em;
  height: 0.3em;
}

.features li span {
  font-size: 12px;
  line-height: 18px;
}

.controlpanel {
  left: 0;
  right: auto;
  transform: translateX(0);
}

.controlpanel-hide {
  transform: translateX(-150px) !important;
}

@media (min-width: 1200px) {
  .offer-panel-header {
    max-width: 450px;
  }

  .filter-results {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    padding-top: 10px;
    z-index: 2;
  }

  .offer-img-scale {
    position: relative;
    margin: -20px;
    transform: scale(1.4);
  }
}

.offer-background {
  width: 1000%;
  max-width: 1000%;
  margin: 0 calc(-50vw + 50%);
  z-index: -1;
}

.offer-details__available-extras-price {
  float: right;
}

.offer-details__available-extras-name {
  float: left;
}

.col-xs-12 {
  width: auto;
  padding: 30px;
  background-color: #e1e3e3;
}

.offer-details__available-extras-item {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 20px;
  background-image: linear-gradient(to right, #aeaeae 1px, transparent 0);
  background-position: left center;
  background-repeat: repeat-x;
  background-size: 5px 1px;
  -ms-flex-align: center;
  align-items: center;
}

.offer-details__available-extras-details {
  text-align: right;
  white-space: nowrap;
  padding-left: 0.8rem;
  margin-left: auto;
  background-color: #e1e3e3;
}

.offer-details__available-extras-name {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  background-color: #e1e3e3;
  display: -ms-flexbox;
  display: flex;
}

.offer-details__available-extras-heading {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
