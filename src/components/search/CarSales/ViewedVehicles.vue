<template>
  <div>
    <hr class="uk-margin-remove-bottom" />
    <section>
      <div class="uk-padding-small">
        <h4 class="uk-margin-remove uk-text-bold">Recently Viewed Vehicles</h4>
        <div class="uk-margin-remove-top uk-text-small uk-text-muted">Discover again</div>
      </div>

      <hr class="uk-margin-remove" />
      <div class="reverseorder">
        <div v-for="(item, index) in filteredItemslocalStorage" :key="index">
          <router-link
            :to="{
              name: 'vehicle-for-sale',
              params: {
                id: item.id,
                slug: item.slug,
              },
            }"
            class="uk-link-reset"
          >
            <div class="uk-grid-small uk-grid uk-flex-middle">
              <div v-if="item.photos.length" class="uk-width-auto">
                <img
                  width="100"
                  height="65"
                  :data-src="item.thumb"
                  data-uk-img
                />
              </div>
              <div v-else class="uk-width-auto">
                <img width="100" height="65" data-src="/comingsoon.jpg" uk-img/>
              </div>

              <div class="uk-width-expand">
                <h3 class="uk-h6 uk-margin-remove-bottom">{{ item.title }}</h3>
                <div class="uk-text-meta uk-margin-remove-top">
                  <div v-if="item.price">
                    <div class="uk-margin-remove">
                      ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}<sup>*</sup> DRIVEAWAY
                    </div>
                  </div>
                  <div v-else>
                    <div class="uk-margin-remove">P.O.A / Contact Us.</div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <hr class="uk-margin-remove" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ViewedVehicles",
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    },
    filteredItemslocalStorage: function() {
      const vehicleIds = this.$store.state.recentlyViewed;
      return this.vehicles.filter((vehicles) => vehicleIds.includes(vehicles.id));
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
</style>
