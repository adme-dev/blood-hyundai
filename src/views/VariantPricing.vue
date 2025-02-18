<template>
  <div class="uk-background-muted">
    <div>
      <div v-if="resultedVariant.length > 0" uk-grid>
        <div class="uk-width-expand@m">
          <VehicleInfo
            v-if="resultedVariant.length > 0"
            :model="resultedVariant[0].model"
            :grade="resultedVariant[0].grade"
            :price="vehiclePrice"
            :image="vehicleImage"
          />
        </div>
        <div class="uk-width-2-5@m stickytop uk-position-relative uk-position-z-index">
          <div class="uk-card uk-card-default uk-card-body variant-price-block uk-padding-remove-top" style="box-shadow: none">
            <FilterGradeItem
              :items="filters.grade"
              type="grade"
              :modelVariants="modelVariants"
              @input="defaultSelect.grade = $event.target.value"
            />
            <FilterColourItem :items="filters.colours" type="colour" @input="userSelect.colours = $event" />
            <FilterItem :items="filters.body" type="body" @input="userSelect.body = $event" />
            <FilterItem :items="filters.drive_train" type="drive_train" @input="userSelect.drive_train = $event" />
            <FilterItem :items="filters.engine" type="engine_type" @input="userSelect.engine = $event" />
            <FilterItem :items="filters.transmission" type="transmission" @input="userSelect.transmission = $event" />
            <FilterItem :items="filters.seats" type="seats" @input="userSelect.seats = $event" />
          </div>
        </div>
      </div>

      <PricingFooter
        v-if="resultedVariant.length > 0"
        :vehicleImage="vehicleImage"
        :model="resultedVariant[0].model"
        :grade="resultedVariant[0].grade"
        :transmission="resultedVariant[0].transmission"
        :price="vehiclePrice"
      />
    </div>
    <!-- Calculator Modal -->
    <div id="modal-calculator" uk-modal>
      <div class="uk-modal-dialog uk-padding-remove uk-modal-body uk-border-rounded uk-width-large">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <Calculator :retail="vehiclePrice" />
      </div>
    </div>

    <!-- Test Drive Modal -->
    <div id="modal-test-drive" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close @click="onTestDriveModalClose()"></button>
        <TestDrive :vehicle="`${title} - ${userSelect.name}`" :selection="userSelect" ref="refTestDrive" />
      </div>
    </div>
  </div>
</template>
<script>
import { filter, map, omit, omitBy, isEmpty, uniq, compact, pick, partialRight, minBy, flattenDeep, flatMapDepth } from "lodash";
import { VariantService } from "@/services";
import Calculator from "@/components/search/Calculator";
import TestDrive from "@/components/page-elements/TestDrive";
import DaRadioBox from "@/components/form-elements/DaRadioBox";
import VehicleInfo from "@/components/pricing/VehicleInfo";
import PricingFooter from "@/components/pricing/Footer";
import FilterItem from "@/components/pricing/FilterItem";
import FilterColourItem from "@/components/pricing/FilterColourItem";
import FilterGradeItem from "@/components/pricing/FilterGradeItem";
export default {
  name: "variant-pricing",
  components: { DaRadioBox, Calculator, TestDrive, VehicleInfo, PricingFooter, FilterItem, FilterColourItem, FilterGradeItem },
  data() {
    return {
      title: "",
      queryFields: ["grade", "body", "drive_train", "engine", "transmission", "seats"],
      filters: {},
      modelVariants: [],
      gradeVariants: [],
      resultedVariant: [],
      defaultSelect: {},
      userSelect: { colours: "" },
    };
  },
  computed: {
    vehiclePrice() {
      if (this.resultedVariant[0])
        return this.resultedVariant[0].colours.images[0].driveaway_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    gradePrice() {
      return minBy(this.gradeVariants, "drive_away");
    },
    vehicleImage() {
      return !isEmpty(this.userSelect.colours)
        ? this.userSelect.colours.image
        : !isEmpty(this.defaultSelect.colours)
        ? this.defaultSelect.colours.image
        : "";
    },
    selectedColourName() {
      if (this.userSelect.colours) {
        return this.userSelect.colours.name;
      } else if (this.defaultSelect.colours) {
        return this.defaultSelect.colours.name;
      }
    },
  },
  created() {
    this.queryFields.forEach((field) => {
      this.$set(this.filters, field, "");
      this.$set(this.defaultSelect, field, "");
      if (field !== "grade") {
        this.$set(this.userSelect, field, "");
      }
      this.$watch(`userSelect.${field}`, function (newVal, oldVal) {
        field !== "grade" ? this.filterVariants(field) : "";
      });
    });
    this.$watch(`defaultSelect.grade`, function (newVal, oldVal) {
      this.triggerGradeChange();
    });
  },
  async mounted() {
    await this.setModalVariants();
    this.setGradeFiltersAndSelection();
  },
  methods: {
    async setModalVariants() {
      const variants = await VariantService.getVariants();
      this.modelVariants = filter(variants, (variant) => variant.model.toLowerCase() === this.$route.params.model);
    },
    setGradeVariants() {
      const selectedGrade = this.defaultSelect.grade ? this.defaultSelect.grade : this.filters.grade[0];
      this.gradeVariants = filter(this.modelVariants, ["grade", selectedGrade]);
    },
    setGradeFiltersAndSelection() {
      this.$set(this.filters, "grade", uniq(map(this.modelVariants, "grade")));
      this.$set(this.defaultSelect, "grade", this.filters["grade"][0]);
    },
    setFiltersAndSelection(variants) {
      this.queryFields.forEach((field) => {
        if (field !== "grade" && field !== "colours") {
          this.$set(this.filters, field, uniq(compact(map(variants, field))));
          this.$set(this.defaultSelect, field, this.filters[field][0]);
        }
      });
    },
    resetUserSelect() {
      this.queryFields.forEach((field) => {
        if (field !== "grade") {
          this.$set(this.userSelect, field, "");
        }
      });
      this.$set(this.userSelect, "colours", {});
    },
    triggerGradeChange() {
      this.setGradeVariants();
      this.setFiltersAndSelection(this.gradeVariants);
      this.DefaultFilterVariants();
      this.resetUserSelect();
      console.log(this.vehicleImage, this.userSelect, this.defaultSelect);
    },
    filterVariants(field) {
      let queryData = omitBy(this.userSelect, isEmpty);
      queryData = omit(queryData, "colours");
      queryData.grade = this.defaultSelect.grade;
      this.resultedVariant = filter(this.gradeVariants, queryData);
      this.setFiltersAndSelection(this.resultedVariant);
      this.setColoursFilterAndSelection();
    },
    DefaultFilterVariants() {
      let queryData = omitBy(this.defaultSelect, isEmpty);
      queryData = omit(queryData, "colours");
      this.resultedVariant = filter(this.gradeVariants, queryData);
      this.setFiltersAndSelection(this.gradeVariants);
      this.setColoursFilterAndSelection();
    },
    setColoursFilterAndSelection() {
      if (this.resultedVariant.length > 0) {
        const colours = map(this.resultedVariant[0].colours.images, (images) => {
          return {
            name: images.colour_name,
            image: images.images[0],
            code: images.swatch_colour_,
          };
        });
        this.$set(this.filters, "colours", colours);

        const colour = {
          name: colours[0].name,
          code: colours[0].code,
          image: colours[0].image,
        };
        this.$set(this.defaultSelect, "colours", colour);
      }
    },
  },
};
</script>
