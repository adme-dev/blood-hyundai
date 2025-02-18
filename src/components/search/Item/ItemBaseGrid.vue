<template>
  <div>
    <div class="uk-card uk-background-default box-shadow-item border-radius-10 uk-flex uk-flex-column">
      <div class="uk-card-header uk-padding-remove">
        <div class="uk-position-relative">
          <span class="uk-icon uk-icon-image search-icon-image uk-position-top-right" :data-src="'https://driveagent.b-cdn.net/files/shared/badges/' +
            item.make.value[0] +
            '.png'
            " data-uk-img></span>

          <div v-if="item.stock_special" class="uk-position-top-left uk-position-small uk-position-z-index">
            <div class="uk-h6 uk-text-bold uk-margin-remove"
              style="padding:5px 8px;background-color: #c00;color: #fff;border-radius:10px">
              <svg viewBox="0 0 16 16" width="15" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <g fill="#fff" fill-rule="nonzero">
                    <path
                      d="M9.4 5.727l-4.88 4.886L3.893 10l4.88-4.887.627.614zM5.567 11.66l.626.627 3.627-3.62-.627-.627-3.626 3.62zM15.2 6.373c-.185.26-.16.616.06.847.25.258.25.668 0 .927L7.847 15.56c-.588.586-1.54.586-2.127 0L.44 10.28c-.586-.588-.586-1.539 0-2.127L7.853.74c.125-.123.292-.193.467-.193.173.002.337.071.46.193.124.12.288.186.46.187.139-.001.274-.046.387-.127 1.43-1.084 3.411-1.065 4.82.047L15.293 0H16v.547l-.913.92c1.154 1.417 1.201 3.437.113 4.906zm-.74-4.28L13.447 3.1c.35.607.249 1.373-.247 1.868-.496.495-1.263.595-1.869.243-.606-.351-.9-1.066-.717-1.742.184-.677.799-1.145 1.5-1.142.231.006.459.063.666.166l1.02-1.02c-1.088-.803-2.572-.803-3.66 0-.265.2-.588.307-.92.307-.326.003-.644-.1-.907-.293L1.067 8.78c-.24.242-.24.632 0 .873l5.28 5.28c.241.24.631.24.873 0l7.26-7.266c-.402-.543-.402-1.285 0-1.827.832-1.113.824-2.643-.02-3.747zm-2.347 1.12c-.368 0-.666.299-.666.667 0 .368.298.667.666.667.369 0 .667-.299.667-.667 0-.368-.298-.667-.667-.667z" />
                  </g>
                </g>
              </svg>
              {{ item.stock_special.displayValue[0] }}<sup>~</sup>
            </div>
          </div>
   <!-- Gallery section -->
   <div class="vehicle-gallery">
            <transition name="gallery-switch" mode="out-in">
              <!-- Thumbnail View -->
              <gallery-thumbnail
                v-if="!showFullGallery"
                :item="item"
                :show-gallery="showGallery"
                @click="handleThumbnailClick"
                @update:show-gallery="updateGalleryVisibility"
              />

              <!-- Full Gallery View -->
              <car-sales-gallery
                v-else
                :key="'gallery'"
                :item-stock="item.id"
                :item-condition="item.condition"
              />
            </transition>
          </div>

        </div>
      </div>

      <div class="uk-grid-small uk-padding-small uk-padding-remove-bottom uk-position-relative uk-grid">
        

  <button
    :class="[
      'uk-link view-details grid-saves uk-position-top-right uk-margin-small-top uk-background-default text-red',
      { 'active-save': isSaved(item) }
    ]"
    @click="toggleSave(item)"
  >
    <span uk-icon="heart"></span>
  </button>
          
        <div class="uk-width-expand uk-text-left uk-text-truncate">
          <div class="uk-text-small">{{ item.condition.displayValue[0] }}</div>
          <h4 class="uk-h4 uk-margin-remove uk-text-truncate uk-text-bold title-items">
            <b>{{ item.make.displayValue[0] }}
            {{ item.model.displayValue[0] }} / {{ item.badge.displayValue[0] }}</b>
          </h4>
          <div class="uk-text-secondary">
            <router-link class="uk-link-heading"
            :to="{
            name: 'vehicle-for-sale',
            params: {
              id: item.id,
              slug: item.slug,
            },
          }">
             {{ item.title }}
          </router-link>
           
          </div>
        </div>
        <!-- <div>
          <div class="uk-text-center">
            <div v-if="item.price">
              <h3 class="uk-h4 uk-margin-remove uk-text-bold">
                ${{ formatPrice(item.price) }}<sup>*</sup>
              </h3>
              <div class="uk-text-small">DRIVE AWAY</div>
              <div v-if="item.condition.displayValue[0] === 'Used'" class="uk-text-xsmall uk-text-bold uk-text-primary">
                or ${{ item.perweek }} p/week <span class="uk-text-muted perweek-icon" uk-icon="warning"></span></div>
            </div>
            <div v-else>
              <h3 class="uk-margin-remove uk-text-bold">P.O.A</h3>
              <div class="uk-text-small">Contact Us.</div>
            </div>
          </div>
        </div> -->


      <div v-if="item.price" class="uk-width-1-1 uk-margin-small-top uk-grid-collapse uk-grid uk-flex uk-flex-middle">
              <!-- <h3 class="uk-h3 uk-margin-remove">
              <span class="uk-text-bold">${{ formatPrice(item.price) }}</span>  <span class="uk-text-small">Drive away<sup>*</sup></span>
              </h3> -->

              <div class="price-container">
                <div class="price">${{ formatPrice(item.price) }}</div>
                <div class="drive-away">
                  Drive
                  <span>away<span class="asterisk">*</span></span>
                </div>
              </div>

              <div v-if="item.condition.value[0] ==='used'"
                class="per-week-price uk-margin-auto-left uk-text-bold text-red">
                <span class="uk-h3 uk-margin-remove"><b>${{ formatPrice(item.perweek) }}</b></span>
                <span>p/w</span> <sup class="uk-text-muted perweek-icon" uk-icon="warning"></sup>
                <div class="uk-text-xsmall estimated">Est. repayments</div>
              </div>
            </div>
            <div v-else>
              <h3 class="uk-margin-remove uk-text-bold">P.O.A</h3>
              <div class="uk-text-small">Contact Us.</div>
            </div>

      </div>




      <hr class="uk-margin-small-top">

      <div class="uk-article uk-flex-1 uk-padding-small uk-padding-remove-top">
        <div class="uk-grid-small spec-items spec-items-gallery  uk-grid">
          <div class="uk-width-expand uk-text-left uk-text-truncate">
            <div><span class="uk-text-meta"></span>
              {{ item.body.displayValue[0] }} / {{ item.seats.value[0] }} seats
            </div>
            <div>
              <span class="uk-text-meta"></span>
              {{ item.transmission.displayValue[0] }}
            </div>
            <div>
              <span class="uk-text-meta"></span>
              {{ item.drivetrain.displayValue[0] }}
            </div>
          </div>

          <div class="uk-width-expand uk-text-left uk-text-truncate">
            <div>
              <span class="uk-text-meta"></span>
              <span v-if="item.attributes?.find(attr => attr.Name === 'Cylinders')?.Value">
                {{ item.attributes.find(attr => attr.Name === 'Cylinders').Value }}cyl
              </span>
              {{ item.fuel.displayValue[0] }}
            </div>
            <div v-if="item.rego">
              <div><span class="uk-text-meta"></span> Registered</div>
            </div>
            <div v-else>
              <div><span class="uk-text-meta"></span> Unregistered</div>
            </div>

            <div v-if="item.kms">
              <div><span class="uk-text-meta"></span> {{ item.kms }} km</div>
            </div>
            <div v-else>
              <div><span class="uk-text-meta"></span> 0 km</div>
            </div>
          </div>
        </div>
      </div>
      <div class="gallery-vehicle-footer">
        <div class="uk-grid-collapse uk-grid">
   
          <button
            class="enquiry-flow uk-button uk-button-primary uk-button-small uk-border-rounded uk-text-capitalize uk-width-expand"
            @click="showEnquiryModal(item)">
            <span uk-icon="eye"></span>  <span uk-icon="forward"></span> Enquire
          </button>


          <router-link class="uk-button view-detail uk-button-primary uk-button-small uk-border-rounded uk-text-capitalize uk-width-expand"
            :to="{
            name: 'vehicle-for-sale',
            params: {
              id: item.id,
              slug: item.slug,
            },
          }">
            View Details
          </router-link>

          <button 
           @click="showEnquiryModal(item)"
          class="uk-hidden uk-button view-detail uk-button-primary uk-button-small uk-border-rounded uk-text-capitalize uk-width-expand">
            View Details
          </button>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GalleryThumbnail from '../CarSales/GalleryThumbnail.vue';
import CarSalesGallery from "../CarSales/Gallery.vue";
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ItemBaseGrid',
  
  components: {
    GalleryThumbnail,
    CarSalesGallery
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      showFullGallery: false,
      showGallery: false
    };
  },

  computed: {
    ...mapState(['savedVehicles'])
  },

  methods: {
    ...mapActions(['toggleSavedVehicle']),

    handleThumbnailClick() {
      // Handle the thumbnail click event
      this.$store.dispatch("vehicleEnquiryPopUp", {
        show: true,
        item: this.item
      });
    },

    updateGalleryVisibility(value) {
      this.showFullGallery = value;
      this.showGallery = value;
    },

    toggleSave(item) {
      this.toggleSavedVehicle(item);
    },

    isSaved(item) {
      return this.savedVehicles.includes(item.stockid);
    },

    formatPrice(price) {
      const roundedPrice = Math.round(price);
      return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    showEnquiryModal(item) {
      this.$store.dispatch("vehicleEnquiryPopUp", {
        show: true,
        item
      });
    }
  }
};
</script>

<style scoped>
.view-detail {
  color: #fff !important;
  line-height: 34px;
  background-color: #002c5f !important;
  border: 2px solid #002c5f !important;
  margin: 1px;
}

.enquiry-flow {
  color: #fff !important;
  line-height: 34px;
  background-color: #000 !important;
  border: 2px solid #000 !important;
  margin: 1px;
}

.enquiry-flow:hover,
.view-detail:hover {
  opacity: 0.9;
}

.item-grid .view-detail {
  padding: 0 15px;
  border: 1px solid #fff;
}
</style>