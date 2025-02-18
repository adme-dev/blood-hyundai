<template>
  <div v-if="filteredItemslocalStorage && filteredItemslocalStorage.length > 0">
    <section>
      <div class="uk-padding-small">
        <h5 class="uk-margin-remove uk-text-bold">Recently Viewed Vehicles</h5>
        <div class="uk-margin-remove-top uk-text-small uk-text-muted">Discover again</div>
      </div>


      <div class="reverseorder">
        <div v-for="(item, index) in filteredItemslocalStorage" :key="index" class="uk-flex-1 a-card a-card-default">
          <router-link :to="{
    name: 'vehicle-for-sale',
    params: {
      id: item.id,
      slug: item.slug,
    },
  }" class="uk-inline uk-link-reset">
            <div class="uk-grid-small uk-grid uk-flex-middle">

              <div class="img-list-saves uk-position-relative">
                <div v-if="item.thumb" class="uk-inline uk-width-1-1 img-list-saves uk-background-cover"
                  :data-src="item.thumb" data-uk-img></div>
                <div v-else class="uk-inline uk-width-1-1 img-list-saves uk-background-cover" data-src="/comingsoon.jpg"
                  data-uk-img></div>
              </div>

              <div class="uk-width-expand">
                <div class="uk-text-small uk-margin-remove-bottom text-blue">{{ item.title }}</div>
                <div class="uk-text-xsmall uk-margin-remove-top">
                  <div v-if="item.price">
                    <div class="uk-margin-remove">
                      <b>${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}</b>
                      <sup>*</sup> <small>DRIVEAWAY</small>
                    </div>
                  </div>
                  <div v-else>
                    <div class="uk-margin-remove">P.O.A / Contact Us.</div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "ViewedVehicles",
  data() {
    return {
      // Initialize with data from localStorage
      activeVehicleIds: this.recentlyViewed(),
    };
  },
  mounted() {
    // Optionally, you can re-assign activeVehicleIds here if needed
    this.activeVehicleIds = this.recentlyViewed();
  },
  methods: {
    recentlyViewed() {
      return JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    },
  },
  watch: {
    '$store.state.recentlyViewed': {
      handler(newVal) {
        // Update activeVehicleIds when Vuex state changes
        this.activeVehicleIds = newVal || [];
      },
      immediate: true, // This ensures the watcher is triggered immediately with the current value when the component is mounted
    },
  },
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    },
    filteredItemslocalStorage: function () {
      // Use activeVehicleIds for filtering
      const vehicleIds = this.activeVehicleIds.filter(id => id);

      if (this.vehicles.length > 0) {
        return this.vehicles.filter(vehicle => vehicleIds.includes(vehicle.id));
      }
      return []; // Return an empty array if there are no vehicles
    },
  },
};
</script>




<style scoped>
.reverseorder {
  display: flex;
  flex-direction: column-reverse;
}

.padding-xsmall {
  padding: 10px;
}

.img-list-saves {
  height: 140px;
  width: 130px;
}
.a-card {
border-radius: 8px;
box-sizing: border-box;
margin: 5px;
overflow: hidden;
position: relative;
transition: .1s ease-in-out;
transition-property: color,background-color,background-size,border-color,box-shadow;
}
.a-card-default {
backdrop-filter: blur(25px);
-webkit-backdrop-filter: blur(25px);
background-color: #fff;
border: 2px solid #e7e7e7;
color: #000;
}
</style>
