<template>
  <div class="uk-background-muted viewport">

    <div v-show="variants == 0">
      <div class="uk-flex uk-height-medium" uk-height-viewport="offset-top: true">
        <div class="uk-margin-auto uk-margin-auto-vertical"><div uk-spinner="ratio: 2"></div></div>
      </div>
    </div>

    <div v-if="filteredList" class="offers-content uk-overflow-hidden uk-padding-small">

      <h1 class="uk-h1 uk-text-bold uk-text-center uk-margin-medium-top uk-text-capitalize">
        Hyundai car deals and offers.
      </h1>

      <h3 class="uk-h3 uk-text-center uk-margin-small-top uk-text-capitalize">
        <span v-if="model && variant"> Showing Offers for {{ model + " - " + variant }}</span>
        <span v-else-if="model && !variant"> Showing Offers for {{ model }}</span>
        <span v-else-if="!model && variant"> Showing Offers for {{ variant }}</span>
        <span v-else> Showing all available Offers</span>
      </h3>

      <div class="filter-results">
        <div class="uk-flex-center uk-width-large uk-margin-auto">
          <div class="uk-grid-small uk-grid">
            <div class="uk-width-1-1 uk-width-1-2@s">
              <el-select

                class="uk-width-1-1 uk-margin-small-bottom"
                v-model="model"
                placeholder="Select Model"
                @change="onModelChange"
              >
                <el-option v-for="model in models" :key="model" :label="model" :value="model">
                </el-option>
              </el-select>
            </div>
            <div class="uk-width-1-1 uk-width-1-2@s">
              <el-select

                class="uk-width-1-1 uk-margin-small-bottom"
                v-model="variant"
                placeholder="Select Variant"
                @change="onVariantChange"
                :disabled="variantDisabeled"
              >
                <el-option
                  v-for="variant in variants"
                  :key="variant"
                  :label="variant"
                  :value="variant"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>


<div class="uk-container uk-container-large uk-margin-medium-top uk-margin-large-bottom">

     <div class="uk-grid-medium uk-grid-match uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">

       <div v-for="(item, index) in filteredList" :key="index" class="uk-border-rounded uk-margin-medium-bottom">

         <div class="uk-grid-collapse uk-grid background-gd uk-box-shadow-small uk-border-rounded uk-overflow-hidden">

           <div class="uk-width-1-1 uk-position-relative uk-grid-collapse uk-grid">

             <div v-if="item.badge">
              <img :data-src="item.badge" class="uk-width-1-6 uk-position-top-left uk-position-small uk-position-z-index" loading="lazy" data-uk-img />
             </div>


               <div class="uk-width-1-1">
                 <div class="uk-padding-small uk-text-center uk-margin-small-top">
                <h3 class="uk-h3 uk-text-bold uk-text-uppercase uk-margin-remove">
                 {{ item.model }}
                </h3>

                 <p class="uk-text-small uk-text-light">
                  {{ item.title }}
                 </p>

                 <div v-if="item.offers" class="uk-text-bold uk-text-primary uk-margin" v-html="item.offers.replace(/(<br>)*/g, '')"></div>
                 <div v-else class="uk-display-block uk-text-bold uk-text-primary uk-margin"></div>


               </div>

                 <img :src="item.vehicle_image[0]" loading="lazy" />
                 <div class="uk-text-xsmall uk-text-light uk-padding-small uk-hidden">Image shown for guidance purpose only.</div>
              </div>

               <div class="uk-width-1-1 uk-padding-small uk-padding-remove-bottom uk-background-default">





              </div>

              <div v-if="item.drive_away" class=" uk-width-1-1 uk-padding-small uk-text-center">
                <div class="uk-text-small uk-text-bold uk-text-emphasis">
                  DRIVE AWAY FROM<sup>*</sup>
                </div>
                <div class="uk-h2 uk-margin-remove uk-text-bold text-red">
                  ${{parseFloat(item.drive_away).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                </div>
              </div>




            </div>




         <div :id="'modal-disclaimer-' + item.id + ''" class="uk-flex-top" uk-modal>
           <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body uk-width-3-4@s">
             <button class="uk-modal-close-default" type="button" uk-close></button>
             <div class="uk-text-bold">Disclaimer</div>
             <div class="uk-text-small uk-text-light" v-html="item.disclaimer"></div>
             <div class="uk-text-small uk-text-light uk-margin-small-top" v-html="item.disclaimer2"></div>
           </div>
         </div>



        <div class="uk-width-1-1 uk-margin-auto-top uk-background-default">

                   <div class="uk-text-center uk-padding-small">
                     <a
                       v-if="item.disclaimer || item.disclaimer2"
                       class="uk-text-meta uk-text-light"
                       :href="'#modal-disclaimer-' + item.id + ''"
                       uk-toggle
                       >Show disclaimers</a
                     >
                   </div>

          <router-link
          :to="{
          name: 'special-offer',
          params: {
            id: item.id,
            name: item.slug,
          },
          }"
          class="uk-button uk-button-secondary uk-width-1-1"
          >Book a test drive / Enquire </router-link
          >
        </div>

      </div>
     </div>

         </div>
       </div>
      </div>

      <div class="uk-padding uk-text-meta-xs">
        *All prices listed are driveway price including on road costs such as registration and CTP
        insurance unless specified as ECG (ex government charges) or POA (price on application).
        {{ siteName }} may change pricing at any time (this includes where there are government
        changes in regulation and/or legislation). There may be a delay to any pricing updates
        displaying correctly on our materials. Always obtain confirmation on updated pricing from
        {{ siteName }}. All prices are subject to change at the discretion of {{ siteName }}.
      </div>

    </div>


</template>
<script>
import VariantService from "@/services/variant";
import MetaMixin from "@/mixins/meta";
import Vue from "vue";
import {Option, Select} from "element-ui";


Vue.use(Select);
Vue.use(Option);
export default {
  name: "Offers",
  mixins: [MetaMixin],
  data() {
    return {
      model: "",
      variant: "",
      variantsList: null,
      filteredList: null,
      queryParams: {},
      queryOptions: {},
      filterOptions: {},
      variantDisabeled: true,
      siteName: this.$store.state.site.name,
    };
  },
  mounted() {
    VariantService.getOffers().then((data) => {
      this.variantsList = this.filteredList = data;
      const urlParams = new URLSearchParams(window.location.search);
      this.queryParams = Object.fromEntries(urlParams.entries());

      if (Object.keys(this.queryParams).length > 0) {
        this.model = this.queryParams.model;
        this.variant = this.queryParams.variant;

        if (this.model) {
          this.filterOptions.model = this.model;
        }

        if (this.variant) {
          this.filterOptions.title = this.variant;
        }

        this.filterVariantList();
      }
    });
  },
  computed: {
    variants() {
      if (this.vLodash.isEmpty(this.model)) {
        return this.getProcessedData(this.variantsList, "title");
      }

      return this.getProcessedData(this.getVariantsByModel(), "title");
    },

    models() {
      return this.getProcessedData(this.variantsList, "model");
    },
  },
  methods: {
    formatBullet(value) {
      var myNewString =
        "<li>" +
        value.split("\r\n").join("</li><li>") +
        "</li>";
      return myNewString;
    },
    getProcessedData(variants, item) {
      return this.vLodash.compact(this.vLodash.uniq(this.vLodash.map(variants, item)));
    },

    getVariantsByModel() {
      return this.vLodash.filter(this.variantsList, ["model", this.model]);
    },

    onModelChange() {
      this.filterOptions.model = this.queryOptions.model = this.model;
      this.variant = "";
      this.variantDisabeled = false;
      delete this.filterOptions.title;
      delete this.queryOptions.variant;

      this.filterVariantList();
    },
    onVariantChange() {
      this.filterOptions.model = this.model;
      this.queryOptions.model = this.model;

      this.filterOptions.title = this.variant;
      this.queryOptions.variant = this.variant;

      this.filterVariantList();
    },
    filterVariantList() {
      if (
        !this.vLodash.isEmpty(this.queryOptions) &&
        !this.vLodash.isEqual(this.queryOptions, this.queryParams)
      )
        this.$router.push({ query: this.queryOptions });
      this.filteredList = this.vLodash.filter(this.variantsList, this.filterOptions);
    },
  },
};
</script>
<style>
.offer-panel-header {
border: 1px solid #e6e6e6;
}
.offer-panel-header .features li::before {
background-image: none;
background-color: #c00;
border-radius: 25px;
top: 8px;
width: 0.3em;
height: 0.3em;
}
.features li span{
  font-size: 12px;
  line-height: 18px;
}
@media (min-width: 1200px){
  .filter-results {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      padding-top:10px;
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
        padding-left: .8rem;
        margin-left: auto;
        background-color: #e1e3e3;
    }

    .offer-details__available-extras-name {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0;
        margin-top: .3rem;
        margin-bottom: .5rem;
        background-color: #e1e3e3;
        display: -ms-flexbox;
        display: flex;
    }

    .offer-details__available-extras-heading {
        font-size: 12px;
        letter-spacing: .12em;
        text-transform: uppercase;
    }
    .background-gd{
          background: linear-gradient(163deg,#eef1f4 6%,#eef1f4 32%,#fff 49%);
    }
</style>
