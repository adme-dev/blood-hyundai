<template>
  <div v-if="savedItemslocalStorage.length > 0" class="uk-margin-large-bottom">
    <div
      class="uk-grid-small uk-margin-small-top"
      uk-grid
    >
      <h6 class="uk-width-1-1 uk-padding uk-text-center uk-h3">
        <span class="uk-text-bold">{{ savedItemslocalStorage.length }} Saved</span> Vehicles
      </h6>
    </div>

    <div id="compare-items" class="uk-position-relative uk-overflow-hidden" uk-slider="finite:true">
      <div class="uk-position-relative uk-padding-small uk-flex uk-flex-center uk-visible@s">
        <a href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a href="#" uk-slidenav-next uk-slider-item="next"></a>
      </div>

      <ul
        class="uk-slider-items uk-grid-small uk-flex uk-flex-center@s uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l uk-child-width-1-6@xl"
        uk-sortable="handle: .uk-sortable-handle; cls-custom: sortable"
        uk-height-match="target: > li > .uk-card"
        uk-grid
      >
        <li v-for="(item, index) in savedItemslocalStorage" :key="index" class="uk-width-medium">
          <div class="uk-card uk-background-default border-radius-10 uk-box-shadow-small sortable">
            <span
              class="uk-sortable-handle uk-margin-small-right uk-padding-small"
              uk-icon="icon: table"
              uk-tooltip="Re-Order"
              @mouseover="stopSlider()"
              @mouseleave="startSlider()"
            ></span>
            <a
              href="#"
              class="save uk-position-z-index uk-padding-small uk-position-top-right uk-icon"
              uk-icon="icon: close; ratio: 1.2"
              uk-tooltip="Remove from saves"
              @click.prevent="removeFromSaves(item)"
            ></a>
            <div
              v-if="item.price"
              itemprop="offers"
              itemscope=""
              itemtype="http://schema.org/Offer"
            >
              <div class="uk-width-expand uk-padding-small">
                <div class="uk-text-light">DRIVEAWAY</div>
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
              <div class="uk-width-1-1 uk-padding-small">
                <div class="uk-width-expand">
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

            <div>
              <div class="uk-margin-medium-bottom uk-list uk-list-striped" itemprop="description">
                <div>
                  <div class="uk-width-expand">
                    <button
                      class="uk-button uk-button-default uk-width-1-1"
                      type="button"
                      :uk-toggle="`target: #modal-comments-${index}`"
                    >
                      <span uk-icon="comments"></span> View Comments
                    </button>
                    <div :id="`modal-comments-${index}`" uk-modal>
                      <div class="uk-modal-dialog uk-modal-body">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <h2 class="uk-modal-title">Dealer Comments</h2>
                        <p v-if="item.Comments" v-html="item.Comments"></p>
                        <p v-else>No comments at this moment</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Year:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.year.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Odometer:</div>
                  <div class="uk-width-expand">
                    <span v-if="item.kms">{{ item.kms }} km</span><span v-else>0km</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Condition:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.condition.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Registration:</div>
                  <div class="uk-width-expand">
                    <span
                      ><span v-if="item.Rego">Registered</span
                      ><span v-else>Unregistered</span></span
                    >
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Manufacture:</div>
                  <div class="uk-width-expand uk-text-capitalize">
                    <span>{{ item.make.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Model:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.model.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Badge:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-uppercase">{{ item.badge.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Series:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-uppercase">{{ item.series.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Body Type:</div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.body.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">
                    Exterior Colour:
                  </div>
                  <div class="uk-width-expand">
                    <span class="uk-text-capitalize">{{ item.colour.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">
                    Seating Capacity:
                  </div>
                  <div class="uk-width-expand">
                    <span>{{ item.seats.displayValue[0] }} Seats</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Drive Train:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.drivetrain.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Engine:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.engine.displayValue[0] }}Litre</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Gears:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.gears }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Fuel Type:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.fuel.displayValue[0] }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">Transmission:</div>
                  <div class="uk-width-expand">
                    <span
                      v-if="
                        (item.transmission.displayValue[0] === 'Constantly Variable Transmission')
                      "
                      :uk-tooltip="`${item.transmission.displayValue[0]}`"
                      class="rel-text-bold"
                      >CVT</span
                    >
                    <span v-else class="rel-text-bold">{{
                      item.transmission.displayValue[0]
                    }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">VIN:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.vin }}</span>
                  </div>
                </div>
                <div>
                  <div class="co-text-meta">SN:</div>
                  <div class="uk-width-expand">
                    <span>{{ item.stockid }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="uk-button-group uk-width-1-1">
              <router-link
                class="uk-button uk-button-secondary uk-light uk-padding-small uk-width-1-1"
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

      <div class="uk-position-relative uk-padding-small uk-flex uk-flex-center uk-visible@s">
        <a href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a href="#" uk-slidenav-next uk-slider-item="next"></a>
      </div>

      <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "compare-saves",
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    },
    savedItemslocalStorage: function () {
      const vehicleIds = this.$store.state.savedVehicles;
      if (Object.keys(this.vehicles).length > 0) {
        return this.vehicles.filter((vehicles) => vehicleIds.includes(vehicles.id));
      } else {
        return [];
      }
    },
  },
  watch: {
      "$route.params": {
        handler(newValue) {
          if(this.savedItemslocalStorage.length==0){
            this.$router.push({
             name:'car-sales'
            });
          }
        },
        immediate: true,
      },
    },
  methods: {
    removeFromSaves(item) {
      this.$store.dispatch("removeFromSavedVehicles", item);
      if(this.savedItemslocalStorage.length==0){
        this.$router.push({
         name:'car-sales'
        });
      }
    },
    stopSlider(){
      this.UIkit.slider('#compare-items', {
       draggable: false,
     });
   },
   startSlider(){
     this.UIkit.slider('#compare-items', {
      draggable: true,
    });
   }
  },
};

</script>
<style scoped>
.co-text-meta {
  font-size: 0.675rem;
  line-height: 1;
  color: #798493;
}
</style>
