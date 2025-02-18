<template>
  <div>
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

    <ul class="model--Category uk-tab uk-flex uk-flex-center">
      <li v-for="(category, index) in allCategories" :key="index">
        <label class="uk-button uk-h2 uk-text-bold uk-text-uppercase uk-text-emphasis">
          <input class="uk-checkbox" type="checkbox" :value="category" v-model="checkedModelCat" />
          <span v-html="category"></span>
        </label>
      </li>
    </ul>

    <div id="slider" class="model-slider uk-position-relative uk-visible-toggle"
      data-uk-slider="center:true; easing: cubic-bezier(.4,0,.2,1); finite:true">
      <ul class="uk-slider-items uk-grid-collapse uk-margin-small-bottom uk-child-width-1-2@s uk-child-width-1-3@xl">
        <li class="uk-text-center uk-margin-large-right uk-margin-large-bottom uk-position-relative"
          v-for="(item, index) in filteredItems" :key="index">
          <div class="counter-top-center uk-margin-small uk-text-bold uk-text-muted">{{ index + 1 }} / {{ itemsCount }}
          </div>

          <div class="pane" @click="changeSlider(index)" @mouseover="hover = true" @mouseleave="hover = false"
            :class="{ 'uk-lights': hover }">
            <div class="uk-pane">
              <div>
                <h3 class="uk-h1 uk-text-bold uk-margin-remove-bottom">
                  <div class="item-title">{{ item.title.rendered }}</div>

                  <router-link v-if="item.form" :to="'/vehicle/' + item.slug + ''" class="
                    uk-width-auto uk-button uk-button-small uk-button-secondary tm-button-primary enquire-now uk-position-top-right uk-position-medium uk-position-z-index bounce-bottom-small
                  ">
                    <div>Enquire Now</div>
                  </router-link>

                  <button v-else
                    class="uk-width-auto uk-button uk-button-small uk-button-secondary tm-button-primary enquire-now uk-position-top-right uk-position-medium uk-position-z-index bounce-bottom-small"
                    @click="isModalVisible = true; showEnquireModel(item.segment)">
                    <div>Enquire Now</div>
                  </button>

                </h3>
              </div>
              <div>
                <img :src="`${item.model_image}?width=710&auto_optimize=medium`" class="model_image_sl" width="710"
                  height="399" :alt="item.title.rendered" lazyload="lazy" />
              </div>
              <div>
                <div v-if="item.caption" class="uk-text-small uk-padding-small item-caption">
                  {{ truncateAndStripHTML(item.caption, 250) }}
                </div>
              </div>
            </div>

            <div v-if="item.form" class="model-slider-action">
              <router-link @click.native="closeModel" :to="'/vehicle/' + item.slug + ''" class="
                uk-text-center uk-button uk-button-primary uk-button-large uk-text-capitalize
              ">Details / <strong>Enquire</strong></router-link>
            </div>

            <div v-else class="model-slider-action">
              <router-link :to="'/vehicle/' + item.slug + ''"
                class="uk-button uk-button-default uk-text-secondary uk-width-auto model-sl-btn">Visit
                <strong>Showroom</strong> <span uk-icon="chevron-right"></span></router-link>
              <router-link :to="'/build/' + item.slug + ''"
                class="uk-button uk-button-primary uk-width-auto uk-margin-small-left model-sl-btn"><strong>Enquire</strong>
                / Range <span uk-icon="chevron-right"></span></router-link>
            </div>

          </div>
        </li>
      </ul>

      <a class="uk-position-center-left uk-position-large uk-text-secondary uk-visible@m model-slider-left" href="#"
        uk-slider-item="previous" aria-label="previous"><span uk-icon="icon: arrow-left; ratio: 2"></span></a>
      <a class="uk-position-center-right uk-position-large uk-text-secondary uk-visible@m model-slider-right" href="#"
        uk-slider-item="next" aria-label="next"><span uk-icon="icon: arrow-right; ratio: 2"></span></a>
    </div>

    <VehicleSelectEnquire :key="slug" :itemModel="itemModelSelect" v-if="isModalVisible" />

  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedModelCat: [],
      hover: false,
      slug: '',
      isModalVisible: false,
      itemModelSelect: ''
    };
  },
  components: {
    VehicleSelectEnquire: () => import("@/components/page-elements/VariantSelectEnquire.vue"),
  },
  mounted: function () {
    if (Object.keys(this.$store.state.models).length < 1) {
      this.$store.dispatch("getModels");
    }
    const vm = this;
    setTimeout(function () {
      vm.UIkit.slider("#slider").show(1);
    }, 600);
  },
  methods: {

    truncateAndStripHTML(html, maxLength) {
      // First, remove HTML tags
      const text = html.replace(/<[^>]*>/g, '');

      // Then truncate the text
      if (text.length <= maxLength) {
        return text;
      }

      return text.substr(0, maxLength) + '...';
    },

    changeSlider(index) {
      this.UIkit.slider("#slider").show(index);
    },
    showEnquireModel(slug) {
      this.slug = slug;
      if (document.getElementById("modal-variants")) {
        this.UIkit.modal("#modal-variants").show();
      }
      this.itemModelSelect = this.slug;
    },
  },
  computed: {
    vehicles() {
      return this.$store.state.models;
    },
    filteredItems: function () {
      if (this.checkedModelCat.length) {
        return this.vehicles.filter((vehicle) =>
          this.checkedModelCat.some(cat => vehicle.categories.includes(cat))
        );
      } else {
        return this.vehicles;
      }
    },
    itemsCount() {
      return this.filteredItems.length;
    },
    allCategories() {
      const categories = this.vehicles.flatMap(vehicle => vehicle.categories.split(', '));
      return _.uniq(categories.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
    },
  },
};
</script>
<style lang="css" scoped>
.model-slider .uk-slider-items li {
  opacity: 0.4;
  transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
}

.counter-top-center,
.model-slider-action,
.item-caption,
.item-title {
  opacity: 0;
  transition: opacity 1.9s;
  -webkit-transition: opacity 1.9s;
}

.model-slider .uk-slider-items li {
  cursor: pointer;
}

.model-slider .uk-slider-items li.uk-active,
.model-slider .uk-slider-items li.uk-active .counter-top-center,
.model-slider .uk-slider-items li.uk-active .model-slider-action,
.model-slider .uk-slider-items li.uk-active .item-caption,
.model-slider .uk-slider-items li.uk-active .item-title {
  opacity: 1;
  cursor: default;
}

.model-slider .uk-slider-items li:hover:not(.uk-active) {
  opacity: 0.6;
}

.sl-position-bottom-nav {
  position: absolute;
  bottom: 55%;
  left: 0;
  right: 0;
  z-index: 0;
}

.uk-active .model_image_sl {
  transition: 0.3s ease-out;
  -webkit-transition: 0.3s ease-out;
}

.model-sl-btn {
  padding: 0 10px 0 15px;
  border: 2px solid #002c5f;
}

.model-sl-btn:hover,
.model-sl-btn:hover strong {
  color: #fff !important;
  background-color: #002c5f
}

@media (min-width: 960px) {
  .model-slider {
    /* background: linear-gradient(120deg, #ffffff 0, #dbdbdb 0, #dbdbdb 35%, #ffffff 28%); */
    /* background: linear-gradient(to bottom right, #f2f2f2 10.5%,#fff 10.5% 50%,transparent 0%) top center/50% 800% no-repeat, #f2f2f2; */
  }
}

.model--Category input[type="checkbox"] {
  display: none;
}

.model--Category :checked+span {
  color: #000;
  border-bottom: 4px solid #ed0000;
}

.model--Category :checked+span {
  font-weight: bold;
}

.enquire-now {
  display: none;
  color: #000;
  text-align: center;
  height: 75px;
  width: 75px;
  line-height: 16px;
  padding: 0;
  top: 15%;
  right: 10%;
  border: 4px solid #000;
  background-color: #fff;
}

.enquire-now div {
  transform: rotate(15deg);
}

.uk-active .enquire-now {
  display: block;
}

.enquire-now:hover {
  color: #fff;
  background-color: #222
}

a.enquire-now div {
  padding: 20px 0 25px;
}
</style>
