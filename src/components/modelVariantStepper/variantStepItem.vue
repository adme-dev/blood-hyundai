<template>

  <div v-if="variantList && variantList.length > 1" class="uk-background-default">

    <div class="uk-width-1-1 uk-text-center">
      <div class="uk-h2 uk-margin-large-top">
        <span class="uk-text-bold"><span class="uk-text-capitalize uk-margin-large-top">{{itemTitle}}</span> </span><span class="uk-text-light"> TRIMS</span>
      </div>
      <div class="uk-width-1-1 uk-text-uppercase">Discover / Enquire: <span class="uk-text-capitalize">{{itemTitle}}</span> range below.</div>
    </div>

    <!-- <div class="uk-container uk-container-xsmall uk-text-center uk-margin-small-top uk-overflow-hidden">
      <div class="uk-text-meta uk-text-uppercase uk-margin-small-bottom space33">{{ totalCount }} {{itemModel}}</div>
    </div> -->


    <div v-if="Object.keys(removeDuplicates).length > 1">
      <div class="uk-position-relative uk-overflow-auto">
        <div class="modelCat uk-flex uk-flex-nowrap uk-flex-center@s uk-margin-medium-top">
          <div v-for="(modelCategory, name, index) in removeDuplicates"
              :key="index"
              
              @click.prevent="selectedCategory = modelCategory, selectedSecondCat = modelCategory[0].id, onThumbClick(index), itemToShow=0, changeSlider(index) ">
            <div class="uk-h2 uk-width-expand uk-padding-small uk-text-center uk-link-muted uk-text-nowrap uk-margin-small-left uk-margin-small-right" :class="{ 'uk-background-secondary uk-light': (index==currentIndex) }">

                <div v-html="modelCategory[0].grade_id"></div>
                <div class="bounce uk-margin-small-bottom uk-hidden@s"
                     :class="[index==currentIndex ? 'uk-display-inline' : 'uk-hidden']"><span uk-icon="icon: chevron-down;"></span></div>

            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- :class="[totalCount > 5 ? 'uk-child-width-1-4@s uk-grid' : 'uk-slidenav-container uk-overflow-auto uk-slider-items']" -->
    <div v-if="Object.keys(removeDuplicates).length > 1" id="slider" class="uk-visible@s" data-uk-slider="draggable:false; center:true; easing: cubic-bezier(.4,0,.2,1); finite:true">
      <div class="uk-position-relative">
        <div class="uk-position-top uk-position-z-index uk-width-auto uk-text-center uk-hidden@s">
          <a href="#" uk-slider-item="previous"><span uk-icon="arrow-left"></span></a>
          <a href="#" uk-slider-item="next"><span uk-icon="arrow-right"></span></a>
        </div>
        <ul class="uk-slidenav-container uk-slider-items uk-flex uk-flex-center@s uk-child-width-1-2@s uk-child-width-1-3@xl uk-margin-medium-top">
          <li v-for="(modelCategory, name, index) in removeDuplicates"
              :key="index"
              class="model-cat-item uk-link-muted uk-grid-item-match"
              @click.prevent="selectedCategory = modelCategory, selectedSecondCat = modelCategory[0].id, onThumbClick(index), itemToShow=0, changeSlider(index)">
            <div class="uk-padding-small">
              <div class="uk-grid-collapse uk-padding uk-margin-medium-bottom uk-box-shadow-small uk-grid" :class="{ 'uk-box-shadow-large': (index==currentIndex) }">

                

                <div class="uk-width-1-1">
                <div>SUBARU</div>
                  <div class="uk-width-1-1 uk-h1 uk-text-bold uk-margin-remove">{{modelCategory[0].grade_id}}</div>
                  <div class="uk-h4 uk-text-bold uk-margin-remove uk-hidden" v-html="modelCategory[0].model"></div>
                  <div class="uk-text-muted">Transmision: <span v-for="(item, index) in transmission(modelCategory)" :key="index"><span v-if="item" class="uk-background-muted uk-border-pill uk-text-secondary"> {{item}} </span> </span></div>
                  <div class="uk-text-muted">Body: <span v-for="(item, index) in body(modelCategory)" :key="index"><span v-if="item" class="uk-background-muted uk-border-pill uk-text-secondary"> {{item}} </span> </span></div>
                  <div class="uk-text-muted">Fuel: <span v-for="(item, index) in fuel(modelCategory)" :key="index"><span v-if="item" class="uk-background-muted uk-border-pill uk-text-secondary"> {{item}} </span> </span></div>
                  <div class="uk-text-muted">Drive train: <span v-for="(item, index) in drive_train(modelCategory)" :key="index"><span v-if="item" class="uk-background-muted uk-border-pill uk-text-secondary"> {{item}} </span> </span></div>
                </div>
                  
                  <div v-if="modelCategory && modelCategory[0] && modelCategory[0].vehicle_image" class="uk-width-auto">
                    <img
                      :src="`${modelCategory[0].vehicle_image[0]}?width=380`"
                      width="380"
                      height="137"
                      :alt="modelCategory[0].vehicle_image[3] ? modelCategory[0].vehicle_image[3] : ''"
                      lazyload="lazy"
                    />
                </div>

                <div class="bounce uk-text-center"
                     :class="[index==currentIndex ? 'uk-display-inline' : 'uk-hidden']"><span uk-icon="icon: chevron-down;" class="uk-position-bottom uk-margin-small-bottom"></span></div>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <div v-else class="uk-margin-medium-top"></div>

    <div class="uk-background-default">
      <hr class="uk-margin-remove">
      <div :class="{ 'm-marg-left' : selectedCategory.length < 2}">



        <div class="uk-grid-collapse uk-height-1-1 uk-grid">
          <!-- {{selectedCategory}} -->
          <div v-if="selectedCategory.length > 1" class="second-cat uk-width-auto@l uk-background-default border-r">
            <div class="uk-width-1-1 uk-padding-small uk-background-default uk-text-muted uk-text-bold uk-grid-collapse uk-grid uk-light">{{selectedCategory[0].model}} <span class="uk-margin-auto-left">{{selectedCategory[0].grade_id}}</span></div>
            <ul class="uk-list uk-list-collapse uk-child-width-1-1 uk-margin-remove">
              <li v-for="(item, index) in selectedCategory"
                  :key="index"
                  @click="selectedSecondCat = item.id, itemToShow = index"
                  :class="{ 'uk-background-secondary uk-light': (index==itemToShow) }"
                  class="uk-position-relative uk-link-muted uk-text-center uk-animation-fade">
                <a href="#model-top" class="uk-width-1-1 uk-height-1-1 uk-position-cover uk-position-z-index uk-hidden@m" data-uk-scroll></a>
                <div class="uk-grid-collapse uk-flex uk-flex-middle uk-grid">
                    <div v-if="item && item.vehicle_image[0]" class="uk-width-auto">
                    <img
                      :data-src="`${item.vehicle_image[0]}?width=280`"
                      width="280"
                      lazyload="lazy"
                      data-uk-img
                    />
                </div>
                  <div class="uk-width-expand  uk-padding-small">
                    <div class="uk-text-bold">{{item.title.rendered}}</div>

                    <div v-if="getVehicleCode(item.variant_id)">
                      <div class="uk-text-light space15 uk-text-xsmall">Drive away from</div>
                      <div class="text-red uk-text-xsmall uk-text-bold">
                        ${{ parseInt(getVehicleCode(item.variant_id)) | formatPrice }}<sup>*</sup>
                      </div>
                      </div>

                    </div>
                </div>
              </li>
            </ul>
          </div>

          <div id="model-top" class="uk-width-expand@l">

            <div v-for="(item, index) in groupedMakes(selectedSecondCat)"
                 :key="index">

              <div class="uk-grid-collapse uk-flex uk-height-1-1 uk-grid">

                <div class="info-panel uk-width-auto@l uk-flex-last uk-flex-first@m">

                  <div class="uk-padding-small">

                    <h3 class="uk-h3 uk-text-bold uk-margin-small-top w-title-400">
                      {{ item.title.rendered }}
                    </h3>

                    <div>
                      <div v-if="getVehicleCode(item.variant_id)" class="uk-margin-small-bottom">
                        <div class="uk-text-light space15">Drive away from</div>
                        <h3 class="uk-h1 uk-text-bold uk-margin-remove">
                          ${{ parseInt(getVehicleCode(item.variant_id)) + paintPrice(paint_price || item.colours[0].paint_price) | formatPrice }}<sup>*</sup>
                        </h3>
                      </div>
                      <div v-else class="uk-margin-small-bottom">
                        <div class="uk-text-light space15">Contact us</div>
                      </div>
                    </div>

                    <div>
                      <button @click="
                      isModalVisible = !isModalVisible,
                      isModalTitle = item.title.rendered
                      vehicleImage = vehicle_image
                      vehiclePrice = parseInt(getVehicleCode(item.variant_id)) + paintPrice(paint_price || item.colours[0].paint_price)
                      lockPage()
                      "
                      class="uk-button uk-button-primary uk-border-rounded uk-width-auto uk-margin-small-bottom">Book a test drive / Enquire</button
                >
             </div>


              <div v-if="item.offer" class="item-offer uk-text-bold uk-padding-small uk-margin-small-bottom uk-background-muted uk-border-rounded">
                <div v-html="item.offer"></div>
                <a v-if="item.offer_disclaimer" class="uk-link-heading uk-text-meta uk-text-light" :href="'#modal-disclaimer-' + item.id + ''" uk-toggle>Show disclaimers</a>
              </div>


              <div v-if="item.offer_disclaimer" :id="'modal-disclaimer-' + item.id + ''" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body uk-width-3-4@s">
                  <button class="uk-modal-close-default" type="button" uk-close></button>
                      <div class="uk-text-bold">Disclaimer</div>
                      <div class="uk-text-small uk-text-light" v-html="item.offer_disclaimer"></div>
                    </div>
                  </div>

                  <div class="uk-text-bold">Key Specifications</div>
                  <hr class="uk-margin-small">
                  <div class="v-features uk-text-light uk-overflow-hidden" v-html="item.features"></div>

                </div>
              </div>

              <div class="uk-flex uk-flex-top uk-width-expand@l">
                <variantStepGallery @handle-driveaway-data="handlePaintDataCallback" :colours="item.colours" :driveaway="getVehicleCode(item.variant_id)"
                                    :title="item.title"
                                    :key="item.id" />
              </div>

            </div>

          </div>

          <div class="uk-padding uk-text-meta-xs uk-background-default">
            *All prices listed are driveway price including on road costs such as registration and CTP insurance unless specified as
            ECG (ex government charges) or POA (price on application). {{ siteName }} may change pricing at any time (this
            includes where there are government changes in regulation and/or legislation). There may be a delay to any pricing
            updates displaying correctly on our materials. Always obtain confirmation on updated pricing from {{ siteName }}.
            All prices are subject to change at the discretion of {{ siteName }}.
          </div>

        </div>

      </div>

    </div>

  </div>

 <YouTubeRelated :model="itemModel.split('-dual-cab').join('').replace('-', ' ')" :title="itemModel" :key="$route.params.slug" class="uk-margin-medium-bottom"/>

  <variantStepFormEnquire v-show="isModalVisible"
                          @close="isModalVisible = false"
                          :itemid="selectedSecondCat"
                          :show="isModalVisible"
                          :title="isModalTitle"
                          :vehiclePrice="vehiclePrice"
                          :vehicleImage="vehicle_image"
                          :model="itemModel"
                          selectedColour="wtwe" />

  </div>

</template>

<script>


  import axios from "axios";
  const variantStepFormEnquire = () => import("@/components/modelVariantStepper/variantStepFormEnquire");
  const variantStepGallery = () => import("@/components/modelVariantStepper/variantStepGallery");
  const YouTubeRelated = () => import("@/components/search/CarSales/YouTubeRelated");

  export default {
    name: 'variant-step-item',
    props: {
      itemStock: {
        type: [Number, String],
        default: 0
      },
      itemModel: {
        type: [Number, String],
        default: 0
      },
      itemTitle: {
        type: [Object, String],
        default: 0
      }
    },
    data() {
      return {
        vehicleData: [], // Initialize as empty array
      items: [],
      filters: [],
      selectedCategory: {},
      selectedSecondCat: [],
      checkedvariantCategory: [],
      siteName: this.$store.state.site.name,
      toggled: true,
      itemToShow: 0,
      paint_price: '',
      vehicle_image: '',
      vehicle_price: '',
      currentIndex: 0,
      isModalVisible: false,
      isModalTitle: '',
      vehiclePrice: '',
      isLoading: true,
      error: null
      }
    },
    async created() {
    try {
      const data = await this.fetchVehicleData();
      this.vehicleData = Array.isArray(data) ? data : [];
      this.isLoading = false;
    } catch (error) {
      console.error('Error in fetchVehicleData:', error);
      this.error = error.message;
      this.isLoading = false;
    }
  },
    components: {
      variantStepGallery,
      variantStepFormEnquire,
      YouTubeRelated
    },
    mounted: function() {
      this.$store.dispatch('getVariantByModel', this.itemModel)
    },
    async beforeRouteUpdate(to, from, next) {
    try {
      this.isLoading = true;
      const data = await this.fetchVehicleData();
      this.vehicleData = Array.isArray(data) ? data : [];
      this.isLoading = false;
      next();
    } catch (error) {
      console.error('Error in fetchVehicleData:', error);
      this.error = error.message;
      this.isLoading = false;
      next(error);
    }
  },
    methods: {
      lockPage() {
        document.getElementsByTagName('html')[0].classList.add('uk-modal-page')
      },
      changeSlider(index) {
        this.UIkit.slider('#slider').show(index)
      },
      onThumbClick(_index) {
        this.currentIndex = _index
      },
      groupedMakes(category) {
        return this.variantList.filter(function(vehicles) {
          return vehicles.id === category
        })
      },
      paintPrice(value) {
        if (value) {
          return parseInt(value)
        } else {
          return parseInt(0)
        }
      },
      toggle: function() {
        this.toggled = !this.toggled
      },
      countWords: function(s) {
        return s
          .trim()
          .replace(/[ ]{2,}/gi, ' ')
          .split(' ').length
      },
      handlePaintDataCallback({ paint_price, vehicle_image }) {
        this.paint_price = paint_price
        this.vehicle_image = vehicle_image
      },
      drive_train: function(items) {
          if (items.length > 0) return [...new Set(items.map((i) => i.drive_train))];
      },
      transmission: function(items) {
          if (items.length > 0) return [...new Set(items.map((i) => i.transmission))];
      },
      body: function(items) {
          if (items.length > 0) return [...new Set(items.map((i) => i.body))];
      },
      fuel: function(items) {
          if (items.length > 0) return [...new Set(items.map((i) => i.fuel))];
      },

      fetchVehicleData() {
      const unInterceptedAxios = axios.create();
      return unInterceptedAxios
        .post(`/.netlify/functions/get-dprice-by-variantid`, { model: this.itemModel })
        .then((response) => {
          if (!response.data) {
            throw new Error('No data received from server');
          }
          return response.data;
        })
        .catch((error) => {
          console.error('API Error:', error);
          throw error;
        });
    },
    
    getVehicleCode(variantCode) {
      if (!Array.isArray(this.vehicleData)) {
        return 0;
      }
      
      const vehicle = this.vehicleData.find((obj) => obj?.fhiCode === variantCode);
      return vehicle && !isNaN(vehicle.geoPrice) ? vehicle.geoPrice : 0;
    }



    },
    beforeDestroy() {
      document.getElementsByTagName("html")[0].classList.remove("uk-modal-page");
  },
    computed: {
      variantList() {
        return this.$store.state.modelVariants
      },
      matchedAndSort: function() {
        if (this.checkedvariantCategory.length == 0) return this.variantList
        return this.variantList.filter(variantList => this.checkedvariantCategory.includes(variantList.grade_id))
      },
      removeDuplicates: function() {
        var model = {}
        if (this.variantList) {
          this.variantList.forEach(item => {
            model[item.grade_id] = model[item.grade_id] || []
            model[item.grade_id].push(item)
          })
        }
        return model
      },
      itemsCount() {
        return this.matchedAndSort.length
      },
      totalCount() {
        return !this.vLodash.isEmpty(this.variantList) ? this.variantList.length : {}
      },
    },
    watch: {
      itemModel(val) {
        this.$store.dispatch('getVariantByModel', val)
      },
      removeDuplicates(newValue, oldValue) {
        this.UIkit.util.on('#vslider', 'show', function () {
        alert()
       });
        if (Object.keys(newValue).length > 0) {
          this.selectedCategory = newValue[Object.keys(newValue)[0]]
          this.selectedSecondCat = newValue[Object.keys(newValue)[0]][0]?.id
        }
      }
    },
    filters: {
      formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    }
  }

</script>
<style scoped>

  .box-shadow-left {
    box-shadow: 4px 0px 0px 0px rgb(0 0 0 / 8%);
  }

  .box-border {
    border: 1px solid #e3e5e680;
  }

  .item-offer p {
    margin: 0;
  }

  .w-title-200 {
    width: auto;
    word-wrap: break-word;
    white-space: normal;
  }

  .w-title-400 {
    width: auto;
    word-wrap: break-word;
    white-space: normal;
  }

  .uk-link-muted {
    cursor: pointer;
  }

  .border-r {
      border-right: 1px solid #ebebeb;
  }
  .model-cat-item{
    max-width: 500px;
    min-width: 400px;
  }
  .active-shadow-large {
    box-shadow: 0 14px 25px rgb(0 0 0 / 16%);
 }
  @media (min-width: 1200px) {
    .info-panel {
      width: 450px;
    }
    .m-marg-left{
      margin-left: 30px;
    }
    .second-cat {
      width: 300px;
    }
  }

</style>
