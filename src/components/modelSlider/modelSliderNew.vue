# Template section
<template>
  <div>
    <!-- Header section remains unchanged -->
    <div class="uk-container uk-text-center uk-margin-small-top uk-overflow-hidden">
      <div class="uk-container uk-text-center uk-overflow-hidden">
        <div class="uk-text-light space33">HYUNDAI RANGE</div>
        <h2 class="uk-h2 uk-text-lighter uk-margin-small">
          A uniquely progressive collection of vehicles, each one the product of our
          defining commitment to creating a <span class="uk-text-bold uk-text-uppercase">
            better, smarter, more sustainable future.</span>
        </h2>
      </div>
    </div>

    <div v-if="vehicles.length" class="uk-margin-medium-top uk-width-expand@s">
      <div class="showroom-menu uk-margin-medium-bottom">
        <!-- Category tabs remain unchanged -->
        <div class="uk-margin-auto uk-flex uk-flex-center">
          <ul class="uk-subnav models--Category uk-flex-nowrap uk-margin-remove-top uk-overflow-auto" uk-tab>
            <li v-for="(category, index) in filteredCategories" 
                :key="index" 
                :class="{ 'uk-active': activeTab === index }"
                @click="switchTab(index)">
              <a href="#" 
                 @click.prevent 
                 class="uk-text-primary uk-text-capitalize">
                {{ category }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Modified vehicle grid with matched heights -->
        <div uk-slider class="slider">
          <div class="uk-position-relative uk-margin-small-top uk-flex uk-flex-center@s uk-visible-toggle" tabindex="-1">
            <div class="uk-grid-small uk-width-auto uk-slider-items uk-grid uk-grid-match">
              <div v-for="(vehicle, index) in filteredVehicles" 
                   :key="index" 
                   class="vehicle-item model-range">
                <div class="uk-card uk-card-default uk-card-hover uk-height-1-1 uk-flex uk-flex-column">
                  <div class="uk-flex uk-flex-column uk-height-1-1">
                    <div class="uk-card-media-top">
                      <router-link @click.native="closeModel" 
                                :to="'/vehicle/' + vehicle.slug" 
                                class="uk-text-muted">
                        <img :data-src="vehicle.model_image" 
                             :alt="vehicle.title.rendered" 
                             width="357" 
                             height="137"
                             class="uk-width-1-1 uk-margin-medium-bottom" 
                             uk-img />
                      </router-link>
                    </div>

                    <div class="uk-card-body uk-padding uk-padding-remove-top uk-flex-1">
                      <div class="uk-width-1-1 uk-text-bold uk-text-lead uk-text-secondary uk-text-uppercase">
                        {{ vehicle.title.rendered }}
                      </div>

                      <div v-if="vehicle.caption" class="uk-width-1-1 uk-text-meta uk-text-truncate">
                        {{ vehicle.caption }}
                      </div>
                    </div>

                    <div class="uk-margin-medium-bottom">
                      <div v-if="vehicle.form" class="uk-child-width-auto uk-flex uk-flex-center uk-grid">
                        <div>
                          <router-link @click.native="closeModel" 
                                      :to="'/vehicle/' + vehicle.slug"
                                      class="uk-text-center uk-button uk-button-primary uk-text-capitalize">
                            Details / <strong>Enquire</strong> <span uk-icon="chevron-right"></span>
                          </router-link>
                        </div>
                      </div>

                      <div v-else class="uk-child-width-auto uk-flex uk-flex-center uk-grid-small uk-grid">
                        <div>
                          <router-link @click.native="closeModel" 
                                      :to="'/vehicle/' + vehicle.slug"
                                      class="coloredsvg uk-text-center uk-button uk-button-primary uk-text-light uk-text-capitalize">
                            Discover <span uk-icon="chevron-right"></span>
                          </router-link>
                        </div>
                        <div>
                          <button @click="isModalVisible = true; showEnquireModel(vehicle.segment)"
                                      class="coloredsvg uk-text-center uk-button uk-button-primary uk-text-light uk-text-capitalize">
                            Enquire <span uk-icon="chevron-right"></span>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <a
        class="uk-position-top-left uk-text-secondary uk-padding-small uk-overlay-default uk-visible@m model-slider-left"
        href="#"
        aria-label="previous"
        uk-slider-item="previous"
        ><span uk-icon="icon: arrow-left; ratio: 2"></span
      ></a>
      <a
        class="uk-position-top-right uk-text-secondary uk-padding-small uk-overlay-default uk-visible@m model-slider-right"
        href="#"
        aria-label="next"
        uk-slider-item="next"
        ><span uk-icon="icon: arrow-right; ratio: 2"></span
      ></a> -->

          </div>
          <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

          <div class="uk-padding-small uk-flex uk-flex-center">
  <a class="tm-slidenav uk-padding-small uk-margin-small-right uk-overlay-primary" href="#" uk-slider-item="previous" uk-slidenav-previous></a>
  <a class="tm-slidenav uk-padding-small uk-margin-small-left uk-overlay-primary" href="#" uk-slider-item="next" uk-slidenav-next></a>
  </div>
        </div>
      </div>
    </div>
    
  <div class="uk-flex uk-flex-center">
   <div><button class="uk-button uk-button-large uk-button-primary" title="Explore models" uk-toggle="target: #offcanvas-models">Explore all models</button></div>
  </div>

    <VehicleSelectEnquire :key="slug" :itemModel="itemModelSelect" v-if="isModalVisible" />

  </div>
</template>

<script>
// Script section remains unchanged
export default {
  data() {
    return {
      activeTab: 0,
      vehicles: [],
      isModalVisible: false
    }
  },
  components: {
    VehicleSelectEnquire: () => import("@/components/page-elements/VariantSelectEnquire.vue"),
  },
  computed: {
    filteredCategories() {
      const categories = new Set(['All']);
      
      this.vehicles.forEach(vehicle => {
        if (vehicle.categories) {
          vehicle.categories.split(',')
            .map(cat => cat.trim())
            .forEach(cat => categories.add(cat));
        } else if (vehicle.vehiclecat) {
          categories.add(vehicle.vehiclecat);
        }
      });

      return Array.from(categories);
    },

    filteredVehicles() {
      const activeCategory = this.filteredCategories[this.activeTab];
      
      if (activeCategory === 'All') {
        return this.vehicles;
      }

      return this.vehicles.filter(vehicle => {
        const vehicleCategories = vehicle.categories
          ? vehicle.categories.split(',').map(cat => cat.trim())
          : [vehicle.vehiclecat];
        
        return vehicleCategories.includes(activeCategory);
      });
    }
  },

  methods: {
    showEnquireModel(slug) {
      this.slug = slug;
      if (document.getElementById("modal-variants")) {
        this.UIkit.modal("#modal-variants").show();
      }
      this.itemModelSelect = this.slug;
    },

    switchTab(index) {
      this.activeTab = index;
    },

    async loadVehicles() {
      try {
        this.vehicles = this.$store.state.models;
      } catch (error) {
        console.error('Error loading vehicles:', error);
      }
    }
  },

  created() {
    this.loadVehicles();
  }
}
</script>

<style scoped>
.max-2200 {
  max-width: 2200px;
}

.models--Category{
  padding: 20px;
}
.slider{
  padding: 20px 0;
}
.vehicle-item.model-range{
  max-width: 380px;
}
.uk-tab > .uk-active > a {
  color: #00aad2!important;
  border-color: #00aad2;
  border-width: 5px;
}

.model--Category {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.model--Category::-webkit-scrollbar {
  display: none;
}

/* Add styles for consistent card heights */
.uk-card {
  display: flex;
  flex-direction: column;
}

.uk-card-body {
  flex: 1 0 auto;
}

.uk-card-footer {
  margin-top: auto;
}
</style>