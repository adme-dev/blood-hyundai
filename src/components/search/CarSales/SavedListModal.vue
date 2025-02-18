<template>
  <div v-if="savedItemslocalStorage.length > 0">

    <section>
      <div class="uk-border-rounded uk-margin-small-bottom uk-light">
        <h4 class="uk-h3 uk-margin-remove uk-text-bold uk-text-center uk-text-emphasis">{{ savedVehiclesCount }} Saved Vehicles</h4>
        <div class="uk-margin-remove-top uk-text-small uk-text-muted" v-if="savedItemslocalStorage.length > 1">
          <!-- <router-link
            class="uk-width-auto"
            to="/compare-vehicles-for-sale"
            ><span><span class="uk-text-bold">Compare</span> vehicles</span>
          </router-link> -->
        </div>
      </div>


      <div class="uk-flex uk-flex-column uk-margin-small-top">
        
        <div v-for="(item, index) in savedItemslocalStorage" :key="index"
          class="uk-inline-clip uk-margin-small-bottom uk-background-default uk-border-rounded saved-items-md">

          <a href="#"
            class="uk-icon-button save uk-position-z-index uk-position-top-right uk-position-small uk-border-pill uk-icon"
            uk-icon="icon: close" @click.prevent="removeFromSaves(item)"></a>



          <a href="#" @click.prevent="showEnquiryModal(item)" class="uk-link-reset">
            <div class="uk-grid-small uk-grid uk-flex-middle">
              <div class="img-list-saves uk-position-relative">
                <span class="uk-label label-saves uk-position-z-index uk-position-top-left uk-border-pill">{{ item.condition.displayValue[0] }}</span>
                <div v-if="item.photos[0]"
                  class="uk-inline uk-width-1-1 img-list-saves uk-border-rounded uk-background-cover"
                  :data-src="item.thumb" data-uk-img></div>
                <div v-else class="uk-inline uk-width-1-1 img-list-saves uk-background-cover" data-src="/comingsoon.jpg"
                  data-uk-img></div>
              </div>

              <div class="uk-width-expand uk-padding-small">
                <h3 class="uk-h5 uk-margin-remove-bottom">{{ item.title }}</h3>
                <div class="uk-margin-remove-top">
                  <div v-if="item.price">
                    <b class="uk-margin-small-top">
                      ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}<sup>*</sup> <small>Driveaway</small>
                    </b>
                  </div>
                  <div v-else>
                    <div class="uk-margin-remove">P.O.A / Contact Us.</div>
                  </div>
                </div>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  </div>

  <div v-else class="uk-h2 uk-text-center uk-text-bold uk-padding savedbar uk-hidden">
    No Saved Vehicles
  </div>
</template>

<script>

export default {
  name: "Saveslist",
  emits: ['is-saved-open-changed'],

  methods: {

    removeFromSaves(item) {
      this.$store.dispatch("removeFromSavedVehicles", item);
    },
    showEnquiryModal(item) {
      this.$store.dispatch("vehicleEnquiryPopUp", {
        show: true,
        item
      });
      this.closeModal();
    },

    closeModal() {
      this.$emit('is-saved-open-changed', false);
    },

    removeFromSaves(item) {
      this.$store.dispatch("removeFromSavedVehicles", item);
    },
  },
  watch: {
    savedItemslocalStorage(newValue) {
      if (newValue.length === 0) {
        this.$emit('is-saved-open-changed', false);
      }
    }
  },
  computed: {
    savedVehiclesCount() {
      return this.$store.state.savedVehicles.length || 0;
    },
    vehicles() {
      return this.$store.state.vehicles
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
};
</script>
<style scoped>
.reverseorder {
  display: flex;
  flex-direction: column-reverse;
}

.label-saves{
  margin: 5px 25px 0
}
.padding-xsmall {
  padding: 10px;
}

.img-list-saves {
  min-height: 120px;
  width: 170px;
}

#saved-bar .savedbar.uk-hidden {
  display: block !important
}

.uk-border-rounded {
  border-radius: 20px;
}

.saved-items-md {
  max-width: 100%;
  padding: 10px 40px 10px 10px;
}

@media (min-width: 960px) {
  .saved-items-md {
    max-width: 450px;
  }
}
</style>
