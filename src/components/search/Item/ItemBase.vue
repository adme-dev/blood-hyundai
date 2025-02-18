<template>
  <div class="item listing-item" v-if="item">
    <div class="uk-grid-collapse listing-container uk-padding-remove uk-background-default uk-grid">
      <div class="itembody uk-width-1-1 uk-position-relative">


        <div v-if="stockSpecial" class="uk-position-top-left uk-position-small uk-position-z-index">
          <div class="uk-h6 uk-text-bold uk-margin-remove special-badge">
            <svg viewBox="0 0 16 16" width="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <g fill="#fff" fill-rule="nonzero">
                  <path
                    d="M9.4 5.727l-4.88 4.886L3.893 10l4.88-4.887.627.614zM5.567 11.66l.626.627 3.627-3.62-.627-.627-3.626 3.62zM15.2 6.373c-.185.26-.16.616.06.847.25.258.25.668 0 .927L7.847 15.56c-.588.586-1.54.586-2.127 0L.44 10.28c-.586-.588-.586-1.539 0-2.127L7.853.74c.125-.123.292-.193.467-.193.173.002.337.071.46.193.124.12.288.186.46.187.139-.001.274-.046.387-.127 1.43-1.084 3.411-1.065 4.82.047L15.293 0H16v.547l-.913.92c1.154 1.417 1.201 3.437.113 4.906zm-.74-4.28L13.447 3.1c.35.607.249 1.373-.247 1.868-.496.495-1.263.595-1.869.243-.606-.351-.9-1.066-.717-1.742.184-.677.799-1.145 1.5-1.142.231.006.459.063.666.166l1.02-1.02c-1.088-.803-2.572-.803-3.66 0-.265.2-.588.307-.92.307-.326.003-.644-.1-.907-.293L1.067 8.78c-.24.242-.24.632 0 .873l5.28 5.28c.241.24.631.24.873 0l7.26-7.266c-.402-.543-.402-1.285 0-1.827.832-1.113.824-2.643-.02-3.747zm-2.347 1.12c-.368 0-.666.299-.666.667 0 .368.298.667.666.667.369 0 .667-.299.667-.667 0-.368-.298-.667-.667-.667z" />
                </g>
              </g>
            </svg>
            {{ stockSpecialDisplayValue }}<sup>~</sup>
          </div>
        </div>

        <carSalesGalleryList :item="item"></carSalesGalleryList>

        <div class="listing-view-body">
          <div class="uk-grid-small uk-grid">
            <div class="uk-width-expand uk-text-left">
              <div class="uk-text-small">
                {{ item.condition.displayValue[0] }}
              </div>
              <h3 class="uk-margin-remove uk-text-bold title-items">
                {{ item.year.displayValue[0] }} {{ item.make.displayValue[0] }}
                {{ item.model.displayValue[0] }}  / {{ item.badge.displayValue[0] }}
              </h3>
              <div class="uk-text-small">
                {{ item.title }}
              </div>
            </div>
            <div>

              <div v-if="item.wasprice">
                <div class="uk-text uk-text-">Was <s>${{ item.wasprice | formatPrice }}</s></div>
                <span class="uk-h5 uk-text-bold uk-margin-remove text-red">Is Now</span>
                <span class="uk-h4 uk-margin-remove uk-text-bold text-red"> ${{ item.price | formatPrice
                  }}<sup>*</sup></span>
                <div class="uk-text-xsmall">DRIVE AWAY</div>
              </div>

              <div v-else class="uk-text-center">
                <div v-if="item.price">
                  <h3 class="uk-h4 uk-margin-remove uk-text-bold">
                    ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                  </h3>
                  <div class="uk-text-xsmall">DRIVE AWAY</div>
                  <div v-if="item.condition.displayValue[0] === 'Used'"
                    class="uk-text-xsmall uk-text-bold uk-text-primary">or ${{ item.perweek }} p/week <span
                      class="uk-text-muted perweek-icon" uk-icon="warning"></span></div>
                </div>
                <div v-else>
                  <h3 class="uk-margin-remove uk-text-bold">P.O.A</h3>
                  <div class="uk-text-small">Contact Us.</div>
                </div>
              </div>

            </div>
          </div>

          <div class="uk-grid-small spec-items uk-grid">
            <div class="uk-width-expand uk-text-left">
              <div>
                <span class="uk-text-meta"></span>
                {{ item.body.displayValue[0] }} / {{ item.seats.displayValue[0] }} seats
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

            <div class="uk-width-expand uk-text-left">
              <div>
                <span class="uk-text-meta"></span>
                <span v-if="item.cylinders">{{ item.cylinders }}cyl</span> {{ item.fuel.displayValue[0] }}
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

          <div class="uk-position-relative">
            <div v-if="item.Comments" class="uk-margin-small-top uk-text-small">{{ }}
              <div v-if="readMore" v-html="item.Comments"></div>
              <span v-else v-html="truncatedComments"></span>
              <span v-if="shouldShowReadMore" class="uk-button uk-button-link uk-text-small uk-text-capitalize"
                @click="toggleReadMore">
                <div v-if="readMore">
                  <span uk-icon="chevron-up"></span> Read Less
                </div>
                <span v-else>
                  <span uk-icon="chevron-down"></span> Read More
                </span>
              </span>
            </div>
          </div>
        </div>

        <hr class="uk-margin-remove uk-visible@s" />
        <div class="uk-card-footer uk-flex uk-flex-right">
          <button
            class="uk-button view-details uk-margin-auto-right uk-background-default button-save-lg tm-button-default uk-border-rounded-25 uk-float-left uk-text-capitalize"
            @click="addToSaves(item)">
            <span uk-icon="heart"></span> <span class="uk-visible@s">Save</span>
          </button>
          <button
            class="uk-button view-details uk-background-default uk-border-rounded-25 uk-text-capitalize uk-width-auto"
            @click="showEnquiryModal(item)">
            <span uk-icon="forward"></span> Enquire
          </button>

          <router-link class="uk-button view-details uk-border-rounded-25 uk-text-capitalize uk-width-auto" :to="{
    name: 'vehicle-for-sale',
    params: {
      id: item.id,
      slug: item.slug,
    },
  }">
            <span uk-icon="file-text"></span> View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const CarSalesGalleryList = () => import("@/components/search/CarSales/GalleryList");
//import CarSalesGalleryList from "../CarSales/GalleryList.vue";

export default {
  props: {
    item: Object,
  },

  data() {
    return {
      active: false,
      layout_view: "item-view",
      isOpen: false,
      readMore: false,
    };
  },

  methods: {
    change: function () {
      this.active = !this.active;
    },
    toggleReadMore() {
      this.readMore = !this.readMore;
    },
    addToSaves(item) {
      this.$store.dispatch("addToSavedVehicles", item);
    },
    durationDate(date) {
      const now = LuxonDateTime.now();
      const dateEdit = LuxonDateTime.fromFormat(date, "ddMMyyyy");
      const interval = Interval.fromDateTimes(dateEdit, now);
      return interval.length('days');
    },
    showEnquiryModal(item) {
      this.$store.dispatch("vehicleEnquiryPopUp", { show: true, item });
    },
  },

  watch: {
    active: function () {
      if (this.active) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
  filters: {
    // specs
    formatBullet(value) {
      var myNewString =
        "<ul class='uk-list uk-list-disc uk-text-small uk-list-muted uk-column-1-2@s uk-column-1-3@xl uk-column-divider uk-margin-small-top'><li>" +
        value.split(",").join("</li><li>") +
        "</li></ul>";
      return myNewString;
    },
  },
  computed: {
    truncatedComments() {
      return this.item.Comments.split('')
        .splice(0, 250)
        .join('')
        .replace(/<\/?[^>]+(>|$)/g, '');
    },
    shouldShowReadMore() {
      return this.item.Comments.split(' ')
        .splice(0, 40)
        .join(' ').length > 180;
    },
    showReadMore() {
      return this.item.Comments.split(' ').splice(0, 40).join(' ').length > 180;
    },
    stockSpecial() {
      return this.item.stock_special;
    },
    stockSpecialDisplayValue() {
      return this.item.stock_special.displayValue[0];
    },
    currentPage() {
      return this.$store.getters.displayItems;
    },
  },
  components: {
    carSalesGalleryList: CarSalesGalleryList,
  },
  filters: {
    formatPrice(value) {
      value = Math.round(value);
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style scoped>
.special-badge {
  padding: 5px 8px;
  background-color: #c00;
  color: #fff;
  border-radius: 10px;
}
</style>