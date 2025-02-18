<template>
  <div class="saves-slider uk-background-muted" v-if="savedItemslocalStorage.length > 0">
    <div class="uk-grid-collapse uk-flex uk-flex-middle uk-flex-center" uk-grid>
      <div class="uk-margin-medium-top">
       <h6 class="uk-width-auto uk-padding-small uk-margin-remove uk-h4">
        <span class="uk-text-bold">Saved</span> Vehicles
      </h6>
      </div>

      <div
        class="uk-width-auto uk-margin-medium-top"
        v-if="savedItemslocalStorage.length > 1"
      >
        <div>
          <router-link
            class="uk-width-auto"
            to="/compare-vehicles-for-sale"
            ><span class="uk-h4"> / <span class="uk-text-bold">Compare</span> vehicles <span uk-icon="sign-in"></span></span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="uk-position-relative" tabindex="-1" uk-slider>
      <div class="uk-container uk-container-expand">
        <ul
          class="uk-slider-items uk-flex uk-flex-center@s uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@l uk-grid-match scroll-card-wrap"
          uk-height-match="target: > li > .uk-card"
        >
          <li
            v-for="(item, index) in savedItemslocalStorage"
            :key="index"
            class="uk-margin-small-bottom"
          >
            <div class="uk-card uk-background-default border-radius-10 uk-inline-clip">
              <div>
                <div class="uk-text-left uk-padding-small">
                  <div
                    v-if="item.price"
                    class="uk-width-1-1 uk-flex uk-flex-middle uk-text-left"
                    itemprop="offers"
                    itemscope=""
                    itemtype="http://schema.org/Offer"
                  >
                    <div class="uk-width-expand uk-margin-small-left uk-margin-small-bottom">
                      <div class="uk-margin-small-top uk-text-light">DRIVEAWAY</div>
                      <div>
                        <span class="uk-h3 uk-text-bold uk-margin-remove"
                          >${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }}<sup>*</sup></span
                        >
                      </div>
                      <div class="uk-h5 uk-margin-remove uk-text-secondary uk-text-capitalize">
                        {{ item.condition.displayValue[0] }} {{ item.year.displayValue[0] }}
                        {{ item.make.value[0] }} {{ item.model.value[0] }}
                      </div>
                      <div class="uk-text-secondary uk-text-uppercase uk-text-light">
                        {{ item.badge.displayValue[0] }} {{ item.series.value[0] }}
                      </div>
                    </div>
                    <meta itemprop="priceCurrency" content="AUD" />
                    <meta itemprop="price" :content="item.price" />
                    <link itemprop="availability" href="http://schema.org/InStock" />
                  </div>
                  <div v-else>
                    <div class="uk-width-1-1 uk-flex uk-flex-middle uk-text-left">
                      <div class="uk-width-expand uk-margin-small-left uk-margin-small-bottom">
                        <div class="uk-margin-small-top uk-text-light">Price On Application</div>
                        <div><span class="uk-h3 uk-text-bold uk-margin-remove">P.O.A</span></div>
                        <div class="uk-h5 uk-margin-remove uk-text-secondary uk-text-capitalize">
                          {{ item.condition.displayValue[0] }} {{ item.year.displayValue[0] }}
                          {{ item.make.value[0] }} {{ item.model.value[0] }}
                        </div>
                        <div class="uk-text-secondary uk-text-uppercase uk-text-light">
                          {{ item.badge.displayValue[0] }} {{ item.series.value[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                class="save uk-position-z-index uk-position-small uk-position-top-right uk-icon"
                uk-icon="icon: close; ratio: 1.2"
                uk-tooltip="Remove from saves"
                @click.prevent="removeFromSaves(item)"
              ></a>

              <!-- <img v-if="item.photos" src="/comingsoon.jpg" :data-src="item.photos[0].Url" class="uk-width-1-1" uk-img>
             <img v-else src="/comingsoon.jpg" class="uk-width-1-1" uk-img> -->

              <router-link
                class="uk-link-reset"
                :to="{
                  name: 'vehicle-for-sale',
                  params: {
                    id: item.id,
                    slug: item.slug,
                  },
                }"
              >
                <!-- <div v-if="item.photos" class="uk-inline uk-width-1-1 img-height-medium uk-background-cover" :data-src="item.photos[0].Url" uk-img></div>
             <div v-else class="uk-inline uk-width-1-1 img-height-medium uk-background-cover" data-src="/comingsoon.jpg" uk-img></div> -->

                <div
                  v-if="Object.keys(item.photos).length > 0"
                  class="uk-inline uk-width-1-1 img-height-medium uk-background-cover"
                  :data-src="item.thumb"
                  data-uk-img
                ></div>
                <div
                  v-else
                  class="uk-inline uk-width-1-1 img-height-medium uk-background-cover"
                  data-src="/comingsoon.jpg"
                  data-uk-img
                ></div>
              </router-link>

              <div class="uk-button-group uk-width-1-1 uk-light bk-blk">
                <router-link
                  class="uk-button uk-button-text uk-text-emphasis uk-padding-small uk-width-1-1"
                  :to="{
                    name: 'vehicle-for-sale',
                    params: {
                      id: item.id,
                      slug: item.slug,
                    },
                  }"
                  ><span uk-icon="file-text"></span> Details</router-link
                >
   
              </div>
            </div>
          </li>
        </ul>

        <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

        <div class="uk-position-relative uk-padding-small uk-flex uk-flex-center uk-visible@s">
          <a href="#" uk-slidenav-previous uk-slider-item="previous"></a>
          <a href="#" uk-slidenav-next uk-slider-item="next"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarSalesSingleSaves",
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    },
    savedItemslocalStorage: function() {
      const vehicleIds = this.$store.state.savedVehicles;
      return this.vehicles.filter((vehicles) => vehicleIds.includes(vehicles.id));
    },
  },
  methods: {
    removeFromSaves(item) {
      this.$store.dispatch("removeFromSavedVehicles", item);
    },
  },
};
</script>

<style scoped>
.uk-slider-container {
  padding: 4px;
}
.bk-blk {
  background-color: #0e0e0e;
}
.uk-padding-small {
  padding: 10px;
}
.saves-slider li {
  min-width: 300px;
  max-width: 300px;
  margin: 10px;
}
</style>
