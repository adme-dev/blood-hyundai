<template>
  <div v-if="carsales.length > 0" class="uk-overflow-hidden">
    <PageSchema />
    <FrontSlider />
    <!-- Post Content -->
    <post-content v-if="page && page.content.rendered" :content="page.content.rendered"></post-content>

    <!-- Site Pages Section -->
    <section class="uk-container uk-container-expand uk-margin-medium-top">
      <h1 class="uk-heading-medium">Site Pages</h1>
      <div class="uk-child-width-auto uk-grid-small uk-flex-inline uk-margin-small-top uk-grid" uk-grid>
        <div v-for="(value, key) in social" :key="value">
          <a class="el-link uk-icon-button uk-icon" target="_blank" :href="value" :title="`${key}`"
            rel="noreferrer nofollow" :uk-icon="`icon:${key}`"></a>
        </div>
      </div>

      <div class="uk-grid-collapse uk-width-1-1 uk-padding-small uk-grid">
        <div v-for="(item, index) in footer" :key="`footer-${index}`" class="uk-flex uk-flex-top uk-width-expand@m">
          <div>
            <h3>{{ item.heading }}</h3>
            <nav class="el-content uk-panel">
              <ul>
                <li v-for="(link, linkIndex) in item.links" :key="`link-${linkIndex}`">
                  <a v-if="isLinkExternal(link.url)" :href="link.url" class="uk-text-light" rel="nofollow"
                    target="_blank">{{ link.title }}</a>
                  <router-link v-else :to="link.url" :title="link.title">{{ link.title }}</router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>




    <hr>
    <section class="uk-container uk-container-expand uk-margin-medium-top">
      <div class="uk-width-1-1">
        <h2 class="uk-h2 uk-text-bold">
          New Hyundai Showroom<span uk-icon="icon: chevron-down" class="uk-float-right uk-hidden@m"></span>
        </h2>
      </div>
      <div class="uk-width-1-1 uk-child-width-1-3@m uk-child-width-1-5@l uk-child-width-1-6@xl" uk-grid>
        <div v-for="(category, index) in vehiclecat" :key="`category-${index}`">
          <h3 class="uk-h5 uk-text-bold uk-text-uppercase" v-html="category"></h3>
          <nav class="el-content uk-panel">
            <ul>
              <li v-for="item in grouped[category]" :key="`item-${item.id}`">
                <router-link :to="'/vehicle/' + item.slug" :title="item.segment">Hyundai {{ item.title.rendered
                  }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <hr>
    <!-- Cars for Sale Section -->
    <section class="uk-container uk-container-expand uk-margin-bottom-top uk-margin-large-bottom">
      <h2 class="uk-margin-remove-bottom">{{ carsales.length }} Cars for Sale</h2>
      <h3 class="uk-margin-remove-top">{{ showroom_address }}</h3>

      <!-- Car Search -->
      <div class="uk-width-1-1 uk-margin-small-bottom">
        <div class="uk-width-1-1 uk-inline uk-margin-small-top">
          <span class="uk-form-icon" uk-icon="icon: search"></span>
          <input class="uk-input uk-border-pill" placeholder="Search cars in stock" type="text" v-model="searchQuery" />
        </div>
      </div>

      <!-- Condition Totals Section -->
      <div
        :class="`uk-child-width-1-1 ${Object.keys(conditionTotals).length === 2 ? 'uk-child-width-1-2@m' : 'uk-child-width-1-3@m'} uk-grid-small uk-grid-match uk-grid`">
        <div v-for="(total, condition) in conditionTotals" :key="`condition-${condition}`">
          <div class="listing-box uk-margin-small-bottom uk-link-heading">
            <div class="uk-width-1-1 uk-position-relative">
              <div class="uk-padding-small">
                <div itemscope itemtype="http://schema.org/Product">
                  <h2 class="uk-h3 uk-text-bolder uk-link" itemprop="name">
                    <router-link :to="`/cars-for-sale/${condition}`" class="uk-link-heading">
                      {{ total }} {{ condition | capitalize }} Cars for Sale
                    </router-link>
                  </h2>
                  <!-- Additional details or metadata could go here -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Car Listings -->
      <div class="uk-child-width-1-1 uk-child-width-1-2@m uk-child-width-1-3@xl uk-grid-small uk-grid-match uk-grid">
        <div v-for="(car, index) in groupedCars" :key="`car-${index}`">
          <div class="listing-box uk-margin-small-bottom uk-link-heading">

            <!-- Check if count is 1, use single page route, else use car.route -->
            <div class="uk-width-1-1 uk-position-relative">
              <div class="uk-padding-small">
                <div itemscope itemtype="http://schema.org/Product">
                  <!-- <img v-if="car.imageUrl" :src="car.imageUrl" :alt="`${car.make} ${car.model}`" class="uk-width-small"
                    itemprop="image" /> -->

                  <h2 class="uk-h3 uk-text-bolder uk-link" itemprop="name">
                    <router-link :to="car.count === 1 ? singlePageRoute(car) : car.route" class="uk-link-heading">
                      {{ car.summary }} for sale
                    </router-link>
                  </h2>

                  <!-- Car Condition Details -->
                  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                    <meta itemprop="availability" content="InStock" />
                    <meta itemprop="priceCurrency" content="AUD" />
                    <meta itemprop="price" :content="car.price" />
                    <meta v-if="car.imageUrl" itemprop="image" :content="car.imageUrl" />
                  </div>

                  <!-- Car Condition Details -->
                  <ul class="uk-list uk-list-bullet">
                    <li v-for="(detail, detailIndex) in car.conditionDetails" :key="`detail-${detailIndex}`">
                      <router-link :to="detail.route" class="uk-link">
                        <span itemprop="itemCondition">{{ detail.text }}</span>
                      </router-link>
                    </li>
                  </ul>

                  <meta itemprop="brand" :content="car.make" />
                  <meta itemprop="model" :content="car.model" />
                  <meta itemprop="url" :content="car.route" />
                  <meta v-if="car.imageUrl" itemprop="image" :content="car.imageUrl" />

                  <!-- Car Image (if available) -->
                  <!-- <img v-if="car.imageUrl" :src="car.imageUrl" :alt="`${car.make} ${car.model}`" itemprop="image" /> -->

                  <!-- Add more structured data properties as needed -->
                </div>
              </div>
            </div>
          </div> <!-- Close router-link -->

        </div>
      </div>


    </section>
  </div>
</template>

<script>
const PageSchema = () => import(/* webpackPrefetch: true */'@/components/page-elements/PageSchema')
const PostContent = () => import("@/components/content/PostContent");
import FrontSlider from "@/components/page-elements/FrontSlider";
import { PageService } from "@/services";
import MetaMixin from "@/mixins/meta";

function groupBy(array, key) {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
}
function slugify(str) {
  return str.toString().toLowerCase().trim().replace(/\s+/g, '-');
}

export default {
  name: "test-drive",
  mixins: [MetaMixin],
  data() {
    return {
      page: null,
      siteName: this.$store.state.site.name,
      modelsearch: "",
      clearSearch: "",
      searchQuery: '',
      showroom_address: this.$store.state.site.showroom_address,
    };
  },
  components: {
    PageSchema,
    PostContent,
    FrontSlider,
  },
  mounted() {
    this.getPage();
  },
  methods: {
    singlePageRoute(car) {
      const route = {
        name: 'vehicle-for-sale',
        params: {
          id: car.id,
          year: car.year,
          make: car.make,
          model: car.model,
          slug: car.slug,
        },
      };
      return route;
    },

    getPage() {
      PageService.getPageBySlug(this.$store.state.site.pages["site-map"]).then((data) => {
        this.page = data;
      });
    },
    isLinkExternal(link) {
      return link.includes("http");
    },
    clearsearch() {
      this.modelsearch = null;
    },
  },
  computed: {
    social() {
      return this.$store.state.site.social;
    },
    menu() {
      return this.$store.state.site.sitelinks.mainnav;
    },
    footer() {
      return this.$store.state.site.sitelinks.footer;
    },
    carsales() {
      return this.$store.state.vehicles;
    },
    vehicles() {
      return this.$store.state.models;
    },
    vehiclecat() {
      if (this.vehicles.length > 0) return [...new Set(this.vehicles.map((i) => i.vehiclecat))];
    },
    grouped() {
      return groupBy(this.vehicles, "vehiclecat");
    },
    conditionTotals() {
      const totals = {};

      this.carsales.forEach(car => {
        const condition = car.condition.displayValue[0].toLowerCase();
        if (totals[condition]) {
          totals[condition]++;
        } else {
          totals[condition] = 1;
        }
      });

      return totals;
    },
    groupedCars() {

      const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

      const grouped = {};

      this.carsales.forEach((car) => {
        const make = car.make.displayValue[0];
        const model = car.model.displayValue[0];
        const price = car.price;
        const condition = typeof car.condition.displayValue[0] === 'string'
          ? car.condition.displayValue[0].toLowerCase()
          : 'unknown';
        const imageUrl = car.photos[0]?.Url; // Assuming 'photos' array exists within each 'car' object and has at least one image

        const makeSlug = slugify(make);
        const modelSlug = slugify(model);
        const uniqueKey = `${makeSlug}-${modelSlug}`;

        if (!grouped[uniqueKey]) {
          grouped[uniqueKey] = {
            id: car.id,
            slug: car.slug,
            make: make,
            price: price,
            model: model,
            imageUrl, // Add image URL to each grouped object
            conditions: { [condition]: 1 },
            count: 1,
          };
        } else {
          grouped[uniqueKey].count++;
          if (condition) {
            if (grouped[uniqueKey].conditions[condition]) {
              grouped[uniqueKey].conditions[condition]++;
            } else {
              grouped[uniqueKey].conditions[condition] = 1;
            }
          }
        }
      });

      // Add condition details and route to each group
      for (let key in grouped) {
        const conditionDetails = [];
        for (let condition in grouped[key].conditions) {
          const route = `/cars-for-sale/${condition}/${slugify(grouped[key].make)}/${slugify(grouped[key].model)}`;
          conditionDetails.push({
            text: `${grouped[key].conditions[condition]} ${capitalize(condition)} ${grouped[key].make} ${grouped[key].model}`,
            route: route
          });
        }
        grouped[key].conditionDetails = conditionDetails;
        grouped[key].summary = `${grouped[key].count} ${grouped[key].make} ${grouped[key].model}`;
        grouped[key].route = `/car-sales/${slugify(grouped[key].make)}/${slugify(grouped[key].model)}`;
      }

      // Convert grouped object to array and sort or filter as needed
      const groupedArray = Object.values(grouped);

      // Sort the grouped cars by make
      groupedArray.sort((a, b) => {
        const makeA = String(a.make);
        const makeB = String(b.make);
        return makeA.localeCompare(makeB);
      });

      // Filter based on search query
      if (this.searchQuery) {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return groupedArray.filter(car => car.summary.toLowerCase().includes(lowerCaseQuery));
      }

      return groupedArray;
    },



  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      // Convert the input value to title case (capitalize first letter of each word)
      return value
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  }
};
</script>
<style scoped>
.listing-box {
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}

.listing-box:hover {
  color: rgb(12, 102, 247)
}
</style>