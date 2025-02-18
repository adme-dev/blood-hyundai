<template>
  <div class="filter-variant-inner">
    <div v-if="option.displayName === 'GRADE'" class="uk-grid-small" uk-grid>
      <div class="uk-width-1-1">
        <h4>{{ option.displayName }}</h4>
      </div>
      <div
        class="radio-models grade-models uk-grid-item-match uk-text-left"
        v-for="(variant, index) in option.data"
        :key="index"
        :class="[option.data.length < 3 ? 'uk-width-1-2' : 'uk-width-1-2']"
      >
        <div>
          <el-radio v-model="value" class="uk-padding-small uk-card-body uk-height-1-1" :label="variant.value">
            {{ variant.displayValue }}
            <img :data-src="'' + variant.thumb + ''" class="uk-width-1-1" loading="lazy" data-uk-img />

            <span class="uk-hidden">({{ counters[variant.value] > 0 ? counters[variant.value] : 0 }})</span>
          </el-radio>
        </div>
      </div>
    </div>

    <div v-else-if="option.displayName === 'MODELS'" class="uk-grid-collapse uk-margin-medium-top uk-grid" uk-grid>
      <button
        class="uk-button uk-button-default uk-padding-small uk-width-1-1 uk-text-uppercase"
        uk-toggle="target: #model-center"
        type="button"
      >
        <h4 class="uk-margin-remove uk-padding-remove">CHANGE MODEL: </br> <strong>{{ this.$route.params.slug }}</strong></h4>
      </button>

      <div id="model-center" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-width-1-1 uk-border-rounded">
          <button class="uk-modal-close-default" type="button" uk-close></button>

          <div uk-filter="target: .vehiclecat-filter">
            <h3 class="uk-h4 uk-margin-small-bottom">A uniquely progressive collection of vehicles, each one the product of our defining commitment to creating a BETTER, SMARTER, MORE SUSTAINABLE FUTURE.</h3>

            <ul class="uk-tab uk-margin-small-bottom uk-flex-nowrap uk-overflow-auto">
              <li
                v-for="(variant, index) in vehiclecat"
                :key="index"
                :class="{ 'uk-active': variant === 'SUV' }"
                :uk-filter-control="'[data-model=' + variant.replace(/\W/g, '-').toLowerCase() + ']'"
              >
                <a href="#" v-html="variant"></a>
              </li>
            </ul>

            <ul class="vehiclecat-filter uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-5@xl uk-text-left" uk-grid>
              <li
                v-for="(variant, index) in option.data"
                :key="index"
                :data-model="variant.vehiclecat.replace(/\W/g, '-').toLowerCase()"
                :class="{ 'model_active': variant.link === $route.params.slug }"
              >

              <div v-if="variant.form">
                <router-link uk-toggle="target: #model-center" :to="'/vehicle/' + variant.link + ''" class="uk-link-reset">
                  <div class="uk-width-1-1">
                    <img :data-src="'' + variant.model_image + ''" class="uk-width-1-1" loading="lazy" data-uk-img />
                  </div>
                  <div class="vehiclecat-title">
                    <div class="uk-h4 uk-margin-remove">
                      {{ variant.displayValue }}
                    </div>
                  </div>
                </router-link>
              </div>

                <div v-else>
                  <router-link uk-toggle="target: #model-center" :to="'/build/' + variant.link + ''" @click.native="loadVehicle" class="uk-link-reset">
                    <div class="uk-width-1-1">
                      <img :data-src="'' + variant.model_image + ''" class="uk-width-1-1" loading="lazy" data-uk-img />
                    </div>
                    <div class="vehiclecat-title">
                      <div class="uk-h4 uk-margin-remove">
                        {{ variant.displayValue }}
                      </div>
                    </div>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="uk-grid-collapse uk-grid" uk-grid>
      <div class="uk-width-1-1"

      >
        <h4 class="uk-margin-small-bottom">{{ option.displayName }}</h4>
      </div>
      <div
          class="radio-models uk-text-center"
          v-for="(variant, index) in option.data"
          :key="index"
          :class="[option.data.length < 2 ? 'uk-width-1-1' : 'uk-width-1-2']"
          >

          <el-radio
            v-model="value"
            class="uk-padding-small uk-card-body uk-height-1-1"
            :disabled="counters[variant.value] === 0"
            :label="variant.value"
          >
            <img v-if="variant.thumb && option.data.length > 2" :data-src="'' + variant.thumb + ''" class="uk-width-1-1 body-select" loading="lazy" data-uk-img />
            {{ variant.displayValue }}
            <span class="uk-hidden"> / {{ counters[variant.value] > 0 ? counters[variant.value] : 0 }}</span>
          </el-radio>
        </div>

    </div>
  </div>
</template>
<script>
import each from "lodash/each";
import cloneDeep from "lodash/cloneDeep";
import matchvariants from "@/builder/utils/matchvariants";

export default {
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: "Radio",
          name: "radio",
          type: "radio",
        };
      },
    },
  },
  data() {
    return {
      siteName: this.$store.state.site.name,
      phone: this.$store.state.site.phone,
    };
  },
  methods: {
    loadVehicle() {
      this.$store.dispatch("priceBuilder/loadData", this.$route.params.slug);
    }
  },
  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.priceBuilder.preselect[name] || "";
      },
      set(value) {
        const { name } = this.option;

        if (value) {
          this.$store.dispatch("priceBuilder/select", { name, value });
          if (name === "variant") {
            each(this.$store.state.priceBuilder.selected, (value, name) => {
              if (name !== "variant") {
                this.$store.dispatch("priceBuilder/deselect", { name });
              }
            });
          }
        } else {
          this.$store.dispatch("priceBuilder/deselect", { name });
        }
        this.$emit("updateRouter", true);
      },
    },
    counters() {
      const { selected, variants, filters } = this.$store.state.priceBuilder;
      const { option } = this;
      const { data, name } = option;
      const counters = {};

      each(data, (variant, idx) => {
        if (idx > -1) {
          const fakeSelected = cloneDeep(selected);

          fakeSelected[name] = variant.value;

          const fakeMatched = matchvariants(variants, fakeSelected, filters);

          counters[variant.value] = fakeMatched.length;
        }
        // else
        // {
        //   counters[variant.value] = 0;
        // }
      });

      return counters;
    },
    vehiclecat: function () {
      if (this.option.data.length > 0) {
        return [...new Set(this.option.data.map((i) => i.vehiclecat))];
      } else {
        return [];
      }
    },
  },
};
</script>
<style>
.radio-models .el-radio__input
/* , .radio-models .value-0 */ {
  display: none;
}
.grade-models label {
  min-height: 80px;
}
.vehiclecat-title {
  left: 20px;
  position: relative;
}
.radio-models label {
  display: block;
  font-size: 16px;
  white-space: inherit;
  cursor: pointer;
  border: 2px solid rgb(210, 210, 210);
  margin: 0 -2px -2px -2px;
}
.radio-models:nth-child(4) label, .radio-models:nth-child(5) label,
.radio-models:nth-child(6) label, .radio-models:nth-child(7) label{
  margin-top: -2px;
}
.filtericon-close {
  right: 7px;
}
.filter-variant-inner h4,
.filter-variant-inner .uk-h4 {
  padding-top: 30px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 400;
}
.radio-models .el-radio__label {
  text-align: center;
  line-height: 19px;
  font-size: 11px;
  font-weight: 700;
  padding-left: 0;
  padding-bottom: 5px;
}
.radio-models .radio-img {
  min-height: 90px;
  background-color: #f9f9f9;
  position: relative;
  background-size: 90%;
  background-position-y: 10px;
  mix-blend-mode: multiply;
}
.radio-models .el-radio__input.is-checked+.el-radio__label{
  color:#000
}
.radio-models .el-radio.is-checked,
.radio-models .el-radio:not(.is-disabled):hover {
  font-weight: 900;
  border: 2px solid #000;
  position: relative;
  z-index: 2;
}
.uk-tab > .uk-active > a {
border-color: #001E50;
}
.grade-models .el-radio__label {
  font-size: 16px;
}
.grade-models .el-radio__input.is-checked + .el-radio__label {
  color: #171717;
}
.model_active > div{
  border-radius: 10px;
 background-image: linear-gradient(to top, rgba(252, 252, 252, 0), rgba(0, 0, 0, 0.11));
}
</style>
