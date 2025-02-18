<template>
  <div v-if="variantList && variantList.length > 1" class="uk-container uk-container-expand related-vehicles">
    <h3 class="uk-h1 uk-text-bold uk-text-center uk-padding uk-text-capitalize">
      {{ itemModel.replace("-", " ") }}
    </h3>

    <ul class="model--Category uk-tab uk-margin-small uk-flex uk-flex-center">
      <li v-for="(modelCategory, index) in removeDuplicates" :key="index">
        <label class="uk-text-medium uk-text-bold uk-text-uppercase">
          <input
            class="uk-checkbox"
            type="checkbox"
            :value="modelCategory"
            v-model="checkedvariantCategory"
          />
          <span v-html="modelCategory"></span>
        </label>
      </li>
    </ul>

    <div v-if="matchedAndSort" class="uk-text-center uk-text-muted uk-text-capitalize uk-margin-medium">
      Showing {{ Object.keys(matchedAndSort).length }} {{ itemModel.replace("-", " ") }}
    </div>

    <div
      class="uk-grid-small variant-wrap uk-grid-match uk-child-width-1-1 uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-3@xl"
      uk-grid
    >
      <div class="variant" v-for="(variant, index) in matchedAndSort" :key="index">
        <!-- <div class="variant" v-for='variant in matchedAndSort' :key="variant.id"> -->
        <div class="variant uk-padding-small uk-box-shadow-small variant-card uk-inline-clip">


          <ImageGallery :colours="variant.colors.images" :driveaway="variant.drive_away" :key="$route.params.slug"/>


          <div class="uk-padding-small uk-position-relative v-card">

            <div>
              <div>
                <div class="uk-text-large uk-text-uppercase uk-text-muted">{{ variant.model }} {{ variant.badge }}</div>
                <h3 class="uk-h4 uk-margin-remove uk-text-bold">{{ variant.title }}</h3>

                <div class="uk-text-muted uk-text-small uk-text-light uk-text-uppercase">
                  {{ variant.transmission }}, {{ variant.engine }}, {{ variant.drive_train }}
                </div>
              </div>
            </div>

            <div v-if="variant.offer">
              <div class="uk-text-bold stag uk-text-left text-blue">Special offer</div>
            </div>

            <div class="uk-padding-small uk-text-center uk-margin-auto-top">
              <div class="uk-text-left uk-text-small">Key Features</div>
              <div class="uk-text-left uk-text-small features uk-text-light uk-overflow-hidden"
              :class="{'uk-height-small uk-margin-small-bottom': toggled === true, 'uk-height-1-1': toggled === false}"
              v-html="variant.features"></div>

              <div class="uk-text-left">
              <button
              class="uk-button uk-button-link"
              :class="{'uk-visible': toggled === true, 'uk-hidden': toggled === false}"
              @click="toggle()"><span uk-icon="chevron-down"></span> Show more features
              </button>
              <button
              class="uk-button uk-button-link"
              :class="{'uk-hidden': toggled === true, 'uk-visible': toggled === false}"
              @click="toggle()"><span uk-icon="chevron-up"></span> Show less features
              </button>
              </div>
            </div>

            <div class="uk-margin uk-text-center">
              <a
                v-if="variant.offer"
                class="uk-link-heading uk-hidden"
                :href="'#modal-disclaimer-' + variant.id + ''"
                uk-toggle
                >Show disclaimers</a
              >
            </div>

          </div>

          <div
            v-if="hideVariant(variant.id)"
            class="uk-width-1-1 uk-padding-small uk-position-bottom"
          >
            <a
              href="#"
              class="uk-text-center uk-button uk-button-secondary tm-button-default v-card-button uk-margin-small-top uk-text-capitalize"
              uk-scroll
              >Book a test drive / Enquire</a
            >
          </div>

          <div
            v-else
            class="uk-width-1-1 uk-padding-small uk-position-bottom"
            v-bind:class="{ 'uk-hidden': hideVariant(variant.id) }"
          >
            <router-link
              :to="'/variant/' + variant.slug + ''"
              class="uk-text-center uk-button uk-button-secondary tm-button-default v-card-button uk-margin-small-top uk-text-capitalize"
              >Book a test drive / Enquire</router-link
            >
          </div>


          <div :id="'modal-disclaimer-' + variant.id + ''" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body uk-width-3-4@s">
              <button class="uk-modal-close-default" type="button" uk-close></button>
              <div class="uk-h5">Disclaimer</div>
              <div class="uk-text-small" v-html="variant.disclaimer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-padding-small uk-text-meta-xs">
      *All prices listed are driveway price including on road costs such as registration and CTP
      insurance unless specified as ECG (ex government charges) or POA (price on application).
      {{ siteName }} may change pricing at any time (this includes where there are government
      changes in regulation and/or legislation). There may be a delay to any pricing updates
      displaying correctly on our materials. Always obtain confirmation on updated pricing from
      {{ siteName }}. All prices are subject to change at the discretion of {{ siteName }}.
    </div>
  </div>
</template>
<script>
import ImageGallery from "@/components/modelSlider/variantGallery";
export default {
  name: "related-variants",
  props: {
    itemStock: {
      type: [Number, String],
      default: 0,
    },
    itemModel: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      filters: [],
      //variantList: [],
      checkedvariantCategory: [],
      siteName: this.$store.state.site.name,
      toggled: true,
    };
  },
  components: {
    ImageGallery
  },
  computed: {
    variantList() {
      return this.$store.state.modelVariants;
      //return this.$store.getters.variantLists(this.variantLists);
    },
    matchedAndSort: function() {
      if (this.checkedvariantCategory.length == 0) return this.variantList;
      return this.variantList.filter((variantList) =>
        this.checkedvariantCategory.includes(variantList.grade)
      );
    },
    removeDuplicates: function() {
      return [...new Set(this.variantList.map((i) => i.grade))];
    },
  },
  watch: {
    itemModel(val) {
      this.$store.dispatch("getVariantByModel", val);
    },
  },
  mounted: function() {
    this.$store.dispatch("getVariantByModel", this.itemModel);
  },
  methods: {
    paintPrice(value) {
      if (value) {
        return parseInt(value)
      } else {
        return parseInt(0)
      }
    },
    hideVariant: function(variantId) {
      return variantId == this.itemStock;
    },
    toggle: function() {
      this.toggled = !this.toggled
    }
  },
  filters: {
    formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style>
.related-vehicles .model--Category :checked + span {
    padding-bottom: 0;
}
</style>
