<template>
  <div v-if="savedItemslocalStorage.length > 0">
    <hr class="uk-margin-remove-bottom" />
    <section>
      <div class="uk-padding-small">
        <h4 class="uk-margin-remove uk-text-bold">{{ savedVehiclesCount }} Saved Vehicles</h4>
        <div class="uk-margin-remove-top uk-text-small uk-text-muted" v-if="savedItemslocalStorage.length > 1">
          <router-link class="uk-width-auto" to="/compare-vehicles-for-sale"><span><span
                class="uk-text-bold">Compare</span> vehicles</span>
          </router-link>
        </div>
      </div>


      <div class="">
        <div v-for="(item, index) in savedItemslocalStorage" :key="index" class="uk-flex-1 a-card a-card-default">

          <a href="#"
            class="save uk-link-reset uk-position-z-index uk-position-top-right padding-xsmall uk-position-z-index uk-icon uk-visible@s"
            uk-icon="icon: close; ratio: 0.6" uk-tooltip="Remove from saves" @click.prevent="removeFromSaves(item)"></a>

          <a href="#"
            class="save uk-link-reset uk-margin-small-right uk-position-z-index uk-position-top-right uk-border-pill uk-position-small uk-icon uk-hidden@s"
            uk-icon="icon: close; ratio: 0.6" uk-tooltip="Remove from saves" @click.prevent="removeFromSaves(item)"></a>

          <router-link :to="{
    name: 'vehicle-for-sale',
    params: {
      id: item.id,
      slug: item.slug,
    },
  }" class="uk-link-reset">
            <div class="uk-grid-small uk-grid uk-flex-middle">
              <div class="img-list-saves uk-position-relative">
                <div v-if="item.thumb" class="uk-inline uk-width-1-1 img-list-saves uk-background-cover"
                  :data-src="item.thumb" data-uk-img></div>
                <div v-else class="uk-inline uk-width-1-1 img-list-saves uk-background-cover" data-src="/comingsoon.jpg"
                  data-uk-img></div>
              </div>
              <!-- <div v-if="item.photos.length" class="uk-width-auto">
                <img
                  width="100"
                  height="65"
                  :data-src="item.photos[0].Url.split(1920, 1080).join(100, 180)"
                  data-uk-img
                />
              </div>
              <div v-else class="uk-width-auto">
                <img width="100" height="65" data-src="/comingsoon.jpg" uk-img/>
              </div> -->

              <div class="uk-width-expand uk-padding-xsmall">
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
  <div v-else class="uk-h2 uk-text-center uk-text-bold uk-padding savedbar uk-hidden">
    No Saved Vehicles
  </div>
</template>

<script>
export default {
  name: "Saveslist",
  methods: {
    removeFromSaves(item) {
      this.$store.dispatch("removeFromSavedVehicles", item);
    },
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

.padding-xsmall {
  padding: 10px;
}

.img-list-saves {
  height: 140px;
  width: 130px;
}

#saved-bar .savedbar.uk-hidden {
  display: block !important
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
