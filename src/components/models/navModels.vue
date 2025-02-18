<template>
  <div class="uk-flex uk-grid-collapse groupedMakes uk-grid">
    <div class="uk-width-1-1">
      <div v-if="vehiclecat" class="showroom-menu uk-background-default">


        <div class="uk-hidden@l">

          <div @click="show = !show" class="uk-padding uk-padding-remove-bottom uk-link uk-text-bold">
            <span class="uk-padding-smal uk-margin-small-right" uk-icon="icon: settings; ratio: 1.2"></span>
            Filter
          </div>

          <ul class="uk-list uk-margin-medium-left" v-show="show">
            <li :class="{ 'uk-active': (itemToShow == '-1') }">
              <a href="#" @mouseover="selectedCategory = 'All', itemToShow = '-1', show = false" class="uk-text-bold">
                All
              </a>
            </li>
            <li v-for="(modelCategory, index) in vehiclecat" :key="index" :class="{ 'uk-active': (itemToShow == index) }"
              @mouseover="itemToShow = index">
              <a :href="'#' + modelCategory" @click.prevent="selectedCategory = modelCategory, show = false"
                class="uk-text-bold" uk-scroll="offset:80">
                {{ modelCategory | capitalizeFirstLetter }}
              </a>
            </li>
            <li>
              <router-link to="/car-sales?search_keywords=hyundai"
                class="uk-dropdown-close uk-text-bold uk-text-capitalize" @click.native="closeModel">In stock</router-link>
            </li>
          </ul>

        </div>



        <ul
          class="uk-subnav model--Category showroomnav uk-tab uk-flex uk-flex-center@s uk-flex-nowrap uk-margin-remove-top uk-light uk-visible@l">
          <li :class="{ 'uk-active': (itemToShow == '-1') }">
            <a href="#" @mouseover="selectedCategory = 'All', itemToShow = '-1'" class="uk-text-bold model-Cat-Btn">
              All
            </a>
          </li>
          <li v-for="(modelCategory, index) in vehiclecat" :key="index" :class="{ 'uk-active': (itemToShow == index) }"
            @mouseover="itemToShow = index">
            <a :href="'#' + modelCategory" @click.prevent="selectedCategory = modelCategory, scrollToElement"
              class="uk-text-bold model-Cat-Btn uk-text-capitalize" uk-scroll="offset:80">
              {{ modelCategory | capitalizeFirstLetter }}
            </a>
          </li>
          <li>
            <router-link to="/car-sales?search_keywords=hyundai"
              class="uk-dropdown-close uk-text-bold uk-text-capitalize model-Cat-Btn" @click.native="closeModel">In stock</router-link>
          </li>
          <li class="uk-position-center-right uk-margin-small-right uk-visible@l">
            <a href="#" @click.prevent="closeModel" class="" aria-expanded="true"><svg class="uk-position-center-right"
                width="60" height="60" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" data-svg="close">
                <path fill="none" stroke="#ffffff" stroke-width="1.3" d="M16,16 L4,4"></path>
                <path fill="none" stroke="#ffffff" stroke-width="1.3" d="M16,4 L4,16"></path>
              </svg></a>
          </li>
        </ul>




        <div v-for="(catentry, name, index) in groupedMakes(filteredSegments)" :key="index" class="model-range-mnu">

          <div class="uk-margin-medium-left uk-margin-medium-top">
            <div :id="catentry[0]['vehiclecat']" class="uk-h3 uk-width-1-1 uk-text-bold uk-margin-remove"
              v-html="catentry[0]['vehiclecat']"></div>
            <div v-html="catentry[0]['segment_desc']" class="uk-visible@s"></div>
          </div>
          <hr class="uk-margin-remove">
          <div class="uk-margin-medium-left model-wrap uk-grid-collapse uk-flex uk-flex-left uk-grid">
            <div v-for="(entry, index) in catentry" :key="index"
              class="uk-width-1-2@s uk-width-1-4@l uk-width-1-5@xl vehicle-item">
              <div>
                <div>


                  <router-link @click.native="closeModel" :to="'/vehicle/' + entry.slug + ''" class="uk-text-muted">
                    <img :data-src="`${entry.model_image}?width=357&auto_optimize=medium`" :alt="entry.title.rendered"
                      class="uk-display-block" width="357" height="185" loading="lazy" data-uk-img />
                  </router-link>


                </div>

                <div class="uk-grid-collapse uk-margin-medium-left uk-margin-small-bottom">

                  <div class="uk-width-1-1 uk-text-bold uk-text-secondary uk-text-left">
                    {{ entry.title.rendered }}
                  </div>

                  <div class="uk-width-expand uk-text-center">

                    <div v-if="entry.form" class="uk-child-width-auto uk-grid">
                      <div>
                        <router-link @click.native="closeModel" :to="'/vehicle/' + entry.slug + ''" class="
                              uk-text-center uk-button uk-button-text uk-button-small uk-text-capitalize uk-padding-remove-left
                            ">Details / <strong>Enquire</strong></router-link>
                      </div>
                    </div>

                    <div v-else class="uk-child-width-auto uk-grid">
                      <div>
                        <router-link @click.native="closeModel" :to="'/vehicle/' + entry.slug + ''"
                          class="uk-text-center uk-button uk-button-text uk-button-small uk-text-primary uk-text-capitalize uk-padding-remove-left">Details</router-link>
                      </div>
                      <!-- <div><router-link :to="'/variant/'+entry.variant_link+''" class="uk-text-center uk-button uk-button-text uk-text-capitalize">Enquire</router-link></div> -->
                      <div>
                        <router-link @click.native="closeModel" :to="`/variant/${entry.variant_link}`"
                          class="uk-text-center uk-button uk-button-text uk-button-small uk-text-primary uk-text-capitalize">Enquire</router-link>
                      </div>
                      <div>
                        <router-link @click.native="closeModel" :to="`/build/${entry.slug}`"
                          class="uk-text-center uk-button uk-button-text uk-button-small uk-text-primary uk-text-capitalize">Range</router-link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>






      </div>
    </div>

    <div class="uk-width-1-1 menu-side-nav uk-margin-auto-top uk-background-default">
      <hr class="uk-margin-remove-bottom">
      <div class="uk-padding uk-text-left">
        <div class="uk-text-muted uk-text-small space33">
          <div class="uk-width-1-1 uk-margin-small-bottom uk-h3 uk-text-bold">Explore more</div>
        </div>
        <ul class="uk-child-width-1-3@s uk-child-width-expand@m uk-grid-collapse uk-grid" uk-margin>
          <li class="uk-margin-small-top">
            <router-link @click.native="closeModel" to="/special-offers"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Latest
              Offers</router-link>
          </li>
          <li class="uk-margin-small-top">
            <router-link @click.native="closeModel" to="/car-sales?condition=used"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Used
              Cars</router-link>
          </li>
          <li class="uk-margin-small-top">
            <router-link @click.native="closeModel" to="/build-and-price"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Build
              & price
            </router-link>
          </li>
          <li class="uk-margin-small-top">
            <a href="#global-search-modal" uk-toggle @click="closeModel"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Stock
              Seach
            </a>
          </li>
          <li class="uk-margin-small-top">
            <router-link @click.native="closeModel" to="/finance"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Finance
              options</router-link>
          </li>
          <li class="uk-margin-small-top">
            <router-link @click.native="closeModel" to="/sell-my-car"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Sell
              your car</router-link>
          </li>
          <li class="uk-margin-small-top last-column">
            <router-link @click.native="closeModel" to="/test-drive"
              class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Book
              a test drive
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCategory: "All",
      startTab: null,
      itemToShow: null,
      show: false,
    };
  },
  methods: {
    closeModel() {
      this.UIkit.modal("#offcanvas-models").hide(0);
      this.UIkit.drop("#vehicle-nav-dropdown").hide(0);
    },
    hoverTab(i) {
      this.UIkit.switcher(".model--Category").show(i);
      this.startTab = true;
    },
    groupedMakes(filteredSegments) {
      // Ensure filteredSegments exists and is an array
      if (!Array.isArray(filteredSegments)) {
        return {};
      }
      
      const makes = {};
      filteredSegments.forEach((item) => {
        // Ensure item.categories exists and is a string
        if (item && typeof item.categories === 'string') {
          const categories = item.categories.split(', ');
          categories.forEach(category => {
            makes[category] = makes[category] || [];
            makes[category].push(item);
          });
        }
      });
      return makes;
    },
    scrollToElement() {
      document.getElementById("offcanvas-models").scroll({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    vehicles() {
      return this.$store.state.models || [];
    },
    filteredSegments() {
      const category = this.selectedCategory;
      const vehicles = this.vehicles;

      // Ensure vehicles is an array
      if (!Array.isArray(vehicles)) {
        return [];
      }

      if (category === "All") {
        return vehicles;
      } else {
        return vehicles.filter(vehicle => 
          vehicle && vehicle.categories && vehicle.categories.includes(category)
        );
      }
    },
    vehiclecat() {
      const vehicles = this.vehicles;
      
      if (Array.isArray(vehicles) && vehicles.length > 0) {
        const allCategories = vehicles
          .filter(vehicle => vehicle && vehicle.categories)
          .flatMap(vehicle => vehicle.categories.split(', '));
        return [...new Set(allCategories)];
      }
      return [];
    },
  },
  filters: {
    capitalizeFirstLetter: (string) => {
      if (typeof string !== 'string') return '';
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
  }
};
</script>
