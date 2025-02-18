<template>

  <div>
    <div>
      <post-content v-if="page && page.content.rendered" :content="page.content.rendered" />
    </div>

    <div class="uk-flex uk-grid-collapse uk-overflow-auto uk-grid uk-background-default">
      <div class="uk-width-1-1" id="model-Cat">
        <div class="showroom-menu">

            <ul  class="uk-subnav model--Category uk-tab uk-flex uk-flex-center@s uk-flex-nowrap uk-overflow-auto uk-light" uk-sticky>
              <li>
                <a href="#model-Cat" @click="selectedCategory = 'All'" class="uk-text-bold model-Cat-Btn" uk-scroll>All</a>
              </li>
              <li v-for="(modelCategory, index) in vehiclecat" :key="index" :class="{ 'uk-active': (itemToShow==index) }" @click="itemToShow = index">
                <a href="#model-Cat" @click="selectedCategory = modelCategory" class="uk-text-bold model-Cat-Btn" uk-scroll>
                <span v-html="modelCategory"></span>
              </a>
              </li>
              <li>
                <router-link to="/car-sales?condition=used&make=hyundai" class="uk-text-bold model-Cat-Btn">Used Hyundai's</router-link>
              </li>
            </ul>


            <div class="uk-width-1-1">
              <div v-for="(catentry, name, index) in groupedMakes(filteredSegments)" :key="index">

                <div class="uk-margin-medium-left">
                  <div class="uk-h3 uk-width-1-1 uk-text-bold uk-margin-remove" v-html="catentry[0]['vehiclecat']"></div>
                  <div v-html="catentry[0]['segment_desc']"></div>
                </div>
                <hr class="uk-margin-remove">
                <div class="uk-margin-medium-left uk-grid-collapse uk-flex uk-flex-left uk-grid">
                  <div v-for="(entry, index) in catentry"
                       :key="index"
                       class="uk-width-1-2@s uk-width-1-4@l uk-width-1-5@xl vehicle-item model-range">
                    <div>
                      <div>

                        <router-link v-if="entry.form" :to="'/vehicle/' + entry.slug + ''" class="uk-text-muted">
                          <img :data-src="entry.model_image"
                               :alt="entry.title.rendered"
                               class="uk-display-block"
                               width="357"
                               height="137"
                               uk-img />
                        </router-link>

                        <router-link v-else :to="'/build/' + entry.slug + ''" class="uk-text-muted">
                          <img :data-src="entry.model_image"
                               :alt="entry.title.rendered"
                               class="uk-display-block"
                               width="357"
                               height="137"
                               uk-img />
                        </router-link>

                      </div>

                      <div class="uk-grid-collapse uk-margin-medium-left uk-margin-large-bottom">

                        <div class="uk-width-1-1 uk-text-bold uk-text-secondary uk-text-left uk-text-uppercase">
                          {{ entry.title.rendered }}
                        </div>

                        <div class="uk-width-expand uk-text-center">

                          <div v-if="entry.form" class="uk-child-width-auto uk-grid">
                            <div>
                              <router-link :to="'/vehicle/' + entry.slug + ''"
                                           class="
                          uk-text-center uk-button uk-button-text uk-button-small uk-text-capitalize uk-padding-remove-left
                        ">Details / <strong>Enquire</strong></router-link>
                            </div>
                          </div>

                          <div v-else class="uk-child-width-auto uk-grid">
                            <div>
                              <router-link :to="'/vehicle/' + entry.slug + ''"
                                           class="uk-text-center uk-button uk-button-text uk-button-small uk-text-primary uk-text-capitalize uk-padding-remove-left">Details</router-link>
                            </div>
                            <!-- <div><router-link :to="'/variant/'+entry.variant_link+''" class="uk-text-center uk-button uk-button-text uk-text-capitalize">Enquire</router-link></div> -->
                            <div>
                              <router-link :to="`/variant/${entry.variant_link}`"
                                           class="uk-text-center uk-button uk-button-text uk-button-small uk-text-primary uk-text-capitalize">Enquire</router-link>
                            </div>
                            <div>
                              <router-link :to="`/build/${entry.slug}`"
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
          </div>


      </div>

      <div class="uk-width-1-1 menu-side-nav uk-height-1-1">
        <hr class="uk-margin-remove-bottom">
        <div class="uk-padding uk-text-left">
          <div class="uk-flex uk-text-muted uk-text-small space33">
            <div class="uk-width-1-1 uk-margin-small-bottom uk-h3 uk-text-bold">Explore more</div>
          </div>
          <ul class="uk-child-width-1-3@s uk-child-width-expand@m uk-grid-collapse uk-grid" uk-margin>
            <li class="uk-margin-small-top">
              <router-link to="/special-offers"
                           class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Latest Offers</router-link>
            </li>
            <li class="uk-margin-small-top">
              <router-link to="/car-sales?condition=used"
                           class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Used Cars</router-link>
            </li>
            <li class="uk-margin-small-top">
              <router-link to="/build-and-price"
                           class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Build & price
              </router-link>
            </li>
            <li class="uk-margin-small-top">
              <a href="#global-search-modal" uk-toggle
                 @click="closeModel"
                 class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Stock Seach
                  </a>
            </li>
            <li class="uk-margin-small-top">
              <router-link to="/finance"
                           class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Finance options</router-link>
            </li>
            <li class="uk-margin-small-top">
              <router-link to="/sell-my-car"
                           class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Sell your car</router-link>
            </li>
            <li class="uk-margin-small-top last-column">
              <router-link to="/test-drive"
                           class="uk-button uk-button-text uk-text-light uk-text-primary uk-text-bold uk-text-capitalize uk-width-auto">Book a test drive
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
const PostContent = () => import("@/components/content/PostContent")
const PageQuickLinks = () => import('@/components/page-elements/PageQuickLinks')
import { PageService } from "@/services";
import MetaMixin from "@/mixins/meta";
export default {
    name: "build-and-price",
    mixins: [MetaMixin],
      data() {
        return {
          page: null,
          checkedModelCat: [],
          siteName: this.$store.state.site.name,
          itemToShow: null,
          selectedCategory: "All"
        };
      },
      components: { PostContent, PageQuickLinks },
      mounted() {
        this.getPage();
        document.body.classList.add("test-drive");
      },
      methods: {
        getPage() {
          PageService.getPageBySlug(this.$store.state.site.pages["test-drive"]).then((data) => {
            this.page = data;
          });
        },
        groupedMakes(filteredSegments) {
          var makes={};
          this.filteredSegments.forEach((item)=>{
            makes[item.vehiclecat] = makes[item.vehiclecat] || [];
            makes[item.vehiclecat].push(item);
             });
            return makes;
         },
        closeModel() {
          this.UIkit.modal("#offcanvas-models").hide();
          this.UIkit.drop("#vehicle-nav-dropdown").hide('0');
        },
        scrollToElement: function() {
          document.getElementById("model--Category").scroll({
            top: 0,
            behavior: "smooth",
          });
        },
      },
      computed: {
        vehicles() {
          return this.$store.state.models;
        },
       filteredSegments: function() {
         var vm = this;
         var category = vm.selectedCategory;

         if(category === "All") {
           return vm.vehicles;
         } else {
           return vm.vehicles.filter(function(vehicles) {
             return vehicles.vehiclecat === category;
           });
         }
       },
        // filteredItems: function() {
        //   if (this.checkedModelCat.length) {
        //     return this.$store.state.models.filter((vehicles) => this.checkedModelCat.includes(vehicles.vehiclecat));
        //   } else {
        //
        //       return this.$store.state.models;
        //   }
        // },
        vehiclecat: function() {
          if (this.vehicles.length > 0) return [...new Set(this.vehicles.map((i) => i.vehiclecat))];
        },
      },
        filters: {
          capitalizeFirstLetter: (string) => {
            return string[0].toUpperCase() + string.substr(1).toLowerCase()
          },
      }
    };
    </script>
