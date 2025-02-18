<template>
  <div v-if="variantList" class="uk-background-default">


    <div class="uk-width-1-1 uk-text-center">
     <div class="uk-h2 uk-margin-remove uk-margin-large-top">
      <span class="uk-text-bold"><span class="uk-text-capitalize">{{itemTitle}}</span> </span><span class="uk-text-light"> trims</span>
    </div>
     <div class="uk-width-1-1 ">Discover / Enquire: <span class="uk-text-capitalize">{{itemTitle}}</span> range below.</div>
    </div>

    <div class="uk-container uk-container-xsmall uk-text-center uk-margin-small-top uk-overflow-hidden">
      <div class="uk-text-meta uk-text-uppercase uk-margin-small-bottom space33">{{ totalCount }} {{itemModel}}</div>
    </div>

    <ul class="model--Category uk-tab uk-margin-medium-bottom uk-flex uk-flex-center">
      <li v-for="(modelCategory, index) in removeDuplicates" :key="index">
        <label class="uk-button uk-text-uppercase uk-text-bold">
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

    <div
      class="model-slider uk-position-relative"
      data-uk-slider
    >
    <div class="uk-flex uk-flex-center uk-position-relative uk-position-z-index">
    <a class="tm-slidenav" href="#" uk-slider-item="previous"><span uk-icon="icon: arrow-left; ratio: 2"></span></a>
    <a class="tm-slidenav" href="#" uk-slider-item="next"><span uk-icon="icon: arrow-right; ratio: 2"></span></a>
    </div>
    <div class="uk-width-1-1 uk-height-medium uk-position-top linear-gradient"></div>
      <ul class="uk-slider-items uk-grid-collapse uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-5@xl" :class="[itemsCount < 5 ? 'uk-flex uk-flex-center@m ' : '']">
        <li
          class="uk-position-relative uk-padding-small"
          v-for="(item, index) in matchedAndSort"
          :key="index"
          tabindex="0"
        >
          <div class="uk-link-heading">
            <div class="uk-pane">

              <ImageGallery :colours="item.colors.images" :driveaway="item.drive_away" :title="item.title" :key="$route.params.slug"/>

              <div class="uk-width-1-1">

                <div
                  v-if="itemStock == item.id"
                  class="uk-padding-small uk-padding-remove-top"
                >
                  <a
                    href="#app"
                    class="uk-button uk-button-default uk-button-border uk-text-primary border-radius-50 uk-width-auto uk-margin-small-top"
                    uk-scroll
                    ><strong>Currently</strong> viewing</a
                  >
                </div>

                <div v-else class="uk-padding-small uk-padding-remove-top">
                    <router-link
                      :to="'/variant/' + item.slug + ''"
                      class="uk-button uk-button-default uk-button-border uk-text-primary border-radius-50 uk-width-auto uk-margin-small-top"
                      ><strong>Enquire</strong> Today</router-link
                    >
                 </div>


                <div class="uk-padding-small">
                  <div class="uk-text-bold">Key Specifications</div>
                  <hr class="uk-margin-small">

                  <div class="v-features uk-text-light uk-overflow-hidden"
                  :class="{'uk-height-small uk-margin-small-bottom': toggled === true, 'uk-height-1-1': toggled === false}"
                  v-html="item.features"></div>
                <div v-if="countWords(item.features) > 20">
                  <button
                  class="uk-button uk-button-link uk-margin-medium-bottom"
                  :class="{'uk-visible': toggled === true, 'uk-hidden': toggled === false}"
                  @click="toggle()"><span uk-icon="chevron-down"></span> SHOW MORE KEY FEATURES
                  </button>
                  <button
                  class="uk-button uk-button-link uk-margin-medium-bottom"
                  :class="{'uk-hidden': toggled === true, 'uk-visible': toggled === false}"
                  @click="toggle()"><span uk-icon="chevron-up"></span> SHOW LESS KEY FEATURES
                  </button>
                </div>

                </div>
              </div>
            </div>
          </div>

        </li>
      </ul>

      <div class="uk-padding uk-flex uk-flex-center">
      <a class="tm-slidenav" href="#" uk-slider-item="previous"><span uk-icon="icon: arrow-left; ratio: 2"></span></a>
      <a class="tm-slidenav" href="#" uk-slider-item="next"><span uk-icon="icon: arrow-right; ratio: 2"></span></a>
      </div>

      <!-- <div>
        <a
        class="uk-position-bottom-left uk-text-secondary uk-padding model-slider-left uk-visible@m"
        href="#"
        uk-slider-item="previous"
        ><span uk-icon="icon: arrow-left; ratio: 2"></span
      ></a>
      <a
        class="uk-position-bottom-right uk-text-secondary uk-padding model-slider-right uk-visible@m"
        href="#"
        uk-slider-item="next"
        ><span uk-icon="icon: arrow-right; ratio: 2"></span
      ></a>
    </div> -->

    </div>


    <div class="uk-padding uk-text-meta-xs">
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
  name: "model-variants",
  props: {
    itemStock: {
      type: [Number, String],
      default: 0,
    },
    itemModel: {
      type: [Number, String],
      default: 0,
    },
    itemTitle: {
      type: [Object, String],
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
  mounted: function() {
      this.$store.dispatch("getVariantByModel",this.itemModel);
  },
  methods: {
    // changeSlider(index) {
    //   this.UIkit.slider("#slider").show(index);
    // },
    paintPrice(value) {
      if (value) {
        return parseInt(value)
      } else {
        return parseInt(0)
      }
    },
    toggle: function() {
      this.toggled = !this.toggled
    },
    countWords: function(s) {
      return s.trim().replace(/[ ]{2,}/gi," ").split(" ").length;
    },
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
      if (!this.vLodash.isEmpty(this.variantList)) return [...new Set(this.variantList.map((i) => i.grade))];
    },
    itemsCount() {
      return this.matchedAndSort.length;
    },
    totalCount() {
      return (!this.vLodash.isEmpty(this.variantList)) ? this.variantList.length : {};
    },
  },
  watch: {
    itemModel(val) {
      this.$store.dispatch("getVariantByModel", val);
    },
  },
  filters: {
    formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style lang="css" scoped>
.uk-button-border{
  border: 2px solid rgb(0, 30, 80);
}
.rotate-svg{
  display: none;
}
.model-slider .uk-slider-items li {
  opacity: 0.2;
  transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
}
.counter-top-center,
.model-slider-action {
  opacity: 0;
  transition: opacity 1.9s;
  -webkit-transition: opacity 1.9s;
}

.model-slider .uk-slider-items li {
  cursor: pointer;
}
.model-slider .uk-slider-items li.uk-active,
.model-slider .uk-slider-items li.uk-active .counter-top-center,
.model-slider .uk-slider-items li.uk-active .model-slider-action {
  opacity: 1;
  cursor: default;
}
.model-slider .uk-slider-items li:hover:not(.uk-active) {
  opacity: 0.4;
}
.sl-position-bottom-nav {
  position: absolute;
  bottom: 55%;
  left: 0;
  right: 0;
  z-index: 0;
}
@media (max-width: 960px) {
  .model_image_lg {
    margin-bottom: -220px;
  }
}
.model--Category input[type="checkbox"] {
  display: none;
}
.model--Category :checked + span {
  color: #000;
  border-bottom: 4px solid #ed0000;
}
.model--Category :checked + span {
  font-weight: bold;
}
.model-slider-left, .model-slider-right{
  margin-top:-30px
}
.model-slider .linear-gradient{
  background: linear-gradient(rgba(238, 241, 245, 0) 0.42%, rgba(239, 242, 245, 0.8274509803921568) 36.97%, #bfc2c4 64.29%, rgba(236, 239, 242, 1) 70.59%, hsla(0, 0%, 84.7%, 0));
}
</style>
