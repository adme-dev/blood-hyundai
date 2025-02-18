<template>
<div class="car-sales-from">

  <div id="trade-in-modal" class="trade-in-modal uk-flex-top uk-card uk-padding-small" uk-modal="bg-close:false">

    <div class="uk-modal-dialog uk-modal-body uk-padding-remove uk-margin-auto-vertical uk-width-1-4@m uk-border-rounded uk-overflow-hidden">

      <button class="uk-modal-close-default uk-position-top-right uk-background-default uk-padding-small" type="button" uk-close></button>

      <div class="uk-background-cover uk-height-small uk-panel" data-src="https://driveagent.b-cdn.net/files/shared/images/girls-driving-cabriole.jpeg" uk-img></div>


    <div class="uk-padding-small uk-width-1-1 adme-form">

      <div class="uk-width-1-1 uk-h2 uk-text-bold uk-margin-remove-bottom uk-text-center">
        Your trade in details:
      </div>

      <div class="uk-text-small uk-text-center">
        <sup><span class="uk-text-small" uk-icon="info; ratio: 0.8"></span></sup> Please note this form allows us to undertake a sight-unseen appraisal of your vehicle to determine it’s likely value. Whilst we endeavour to use due care and skill in doing so, all valuations are subject to final inspection and test drive.
      </div>

      <div class="uk-width-1-1 uk-h3 uk-text-bold uk-margin-small-top uk-text-center">
        <div v-if="makes_value">Selected Vehicle:</div>
        <div v-else>Select Vehicle:</div>
        {{year_value}} {{makes_value}} {{models_value}} {{variants_value}}
      </div>

      <el-select v-model="year_value" placeholder="Select Vehicle Year" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
        <el-option v-for="item in getYears" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <div v-if="year_value">
        <el-select v-model="makes_value" placeholder="Select Vehicle Make" @change="makesChange" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
        <el-option v-for="item in makes" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>

      <div v-if="makes_value && makes_value!== 'Other' && models">
        <el-select v-model="models_value" placeholder="Select Vehicle Model" @change="modelsChange" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
          <el-option v-for="item in models" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>


      <!-- <div v-else-if="showForm" class="uk-width-1-1 mdl-label">
        <div class="uk-width-1-1 uk-h3 uk-text-bold uk-margin-small uk-text-center">
          Enter variant details:
        </div>
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon" uk-icon="icon: user"></span>
          <input v-model="other_variant" id="other_variant" name="other_variant" type="text" :class="errors.other_variant ? 'field-error' : ''" class="uk-input uk-form-large" placeholder="Enter variant details" />
        </div>
      </div> -->

      <el-select v-if="models_value && Object.keys(variants) && models_value!=='Other'" v-model="variants_value" placeholder="Select Vehicle Variant" class="v-select uk-width-1-1 uk-margin-small-bottom uk-border-rounded">
        <el-option v-for="item in variants" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>



      <div v-if="makes_value =='Other' || !models || models_value =='Other' || !variants" class="uk-width-1-1 mdl-label">
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon" uk-icon="icon: user"></span>
          <input v-model="other_variant" id="other_variant" name="other_variant" type="text" :class="errors.other_variant ? 'field-error' : ''" class="uk-input uk-form-large" placeholder="Enter details" />
        </div>
      </div>



      <div class="uk-width-1-1 uk-h3 uk-text-bold uk-margin-small-top uk-text-center">
        Vehicle condition: {{vehicle_condition}}%
      </div>

      <div class="uk-display-block vehicle_condition uk-padding-small uk-padding-remove-top uk-margin-medium-right uk-margin-medium-left">
        <el-slider v-model="vehicle_condition" :marks="marks"
      :max="100">
        </el-slider>
      </div>


      <div class="uk-grid-small uk-margin-small-top" uk-grid>

        <hr class="uk-width-1-1">

        <div class="uk-width-1-1 uk-h3 uk-text-bold uk-margin-small-top uk-text-center">
          How many keys?
        </div>

        <div class="uk-inline aval_keys uk-margin-auto">
          <el-switch style="display: block" v-model="aval_keys" active-color="#2fbc05" active-value="2 keys" inactive-value="1 key" inactive-color="#2fbc05" active-text="I have 2 keys" inactive-text="I have 1 key">
          </el-switch>
        </div>

        <hr class="uk-width-1-1">

        <div class="uk-width-1-1 uk-h3 uk-text-bold uk-text-center">
          Do you have full service history?
        </div>

        <div class="uk-inline aval_keys uk-margin-auto">
          <el-switch style="display: block" v-model="service_history" active-value="Yes" inactive-value="No" active-color="#2fbc05" inactive-color="#2fbc05" active-text="Yes" inactive-text="No">
          </el-switch>
        </div>

        <hr class="uk-width-1-1">

        <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-small-top uk-text-center">
          Anything else you would like to note/Additional Comments:
        </div>

        <div class="uk-inline aval_keys uk-margin-auto">
          <el-switch style="display: block" v-model="yes_comments" active-value="Yes" inactive-value="No" active-color="#2fbc05" inactive-color="#2fbc05" active-text="Yes" inactive-text="No">
          </el-switch>
        </div>

        <div v-if="yes_comments == 'Yes'" class="uk-width-1-1 mdl-label">
          <div class="uk-inline uk-width-1-1">
            <textarea v-model="comments" id="comments"  rows="4" name="comments" type="textarea" class="uk-textarea uk-form-large uk-border-rounded"></textarea>
          </div>
        </div>


      </div>

    <div class="uk-padding uk-text-center">
      <button
        @click="onClickChild(), storeTradin()"
        class="uk-button uk-button-primary uk-button-large uk-modal-close-default uk-position-relative uk-text-bold uk-width-1-1 border-radius-50" type="button">
        Continue
      </button>
    </div>



    </div>

   </div>
  </div>

</div>

</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
  Switch,
  Select,
  Option,
  Slider
} from "element-ui";
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Slider);
export default {
  name: "carSalesSingleForm",
  props: {

  },
  data() {
    return {
      makes: [],
      models: [],
      variants: [],
      year_value: "",
      variants_value: "",
      makes_value: "",
      models_value: "",
      vehicle_condition: 50,
      comments:"",
      other_variant: "",
      marks: {
        0: 'POOR',
        50: 'GOOD',
        100: 'EXCELLENT',
      },
      errors: {
        name: "",
        email: ""
      },
      showForm: false,
      invalid: false,
      value: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      finance: "",
      tradein: [],
      testdrive: "",
      message: "",
      service_history: "",
      aval_keys: "",
      yes_comments: "",
      isSending: false,
      isSent: false.itemStock,
      confirmationMessage: "",
    };
  },
  watch: {

  },
  created: function() {
    this.getVehicleData();

    if (localStorage.getItem("tradein")) {
    let tradein = JSON.parse(localStorage.getItem("tradein")) || [];
    this.year_value = tradein[0].year,
    this.makes_value = tradein[0].make,
    this.models_value = tradein[0].model,
    this.variants_value = tradein[0].variant,
    this.tradein_vehicle = tradein[0].tradein_vehicle;
    this.other_variant = tradein[0].tradein_vehicle_other;
    this.vehicle_condition = tradein[0].vehicle_condition,
    this.service_history = tradein[0].vehicle_service_hist,
    this.yes_comments = tradein[0].yes_comments,
    this.comments = tradein[0].tradein_comments,
    this.aval_keys = tradein[0].vehicle_aval_keys
   }

  },
  computed: {
    getYears () {
      var max = new Date().getFullYear()
      var min = max - 14
      var years = []
      for (var i = max; i >= min; i--) {
        years.push(i)
      }
      return years
    }
  },
  methods: {
    async getVehicleData() {
      try {
        const response = await axios.get(
          '/vehicles/makes.json'
        );
        // JSON responses are automatically parsed.
        this.makes = response.data.makes;
        if (this.makes && !this.makes.includes("Other")) {
          this.makes.push("Other")
        }

      } catch (error) {
        console.log(error);
      }
    },
    async makesChange(item) {
      try {
        const response = await axios.get(
          `/vehicles/models/${item}.json`
        );
        // JSON responses are automatically parsed.
        this.models = null;
        this.models_value = null;
        this.variants_value = null;
        this.models = response.data.results;
        if (this.models && !this.models.includes("Other")) {
          this.models.push("Other")
        }
        // if (typeof response.data.results !== "object") {
        //   this.showForm = true
        // }
      } catch (error) {
        console.log(error);
      }
    },
    async modelsChange(item) {
      try {
        const response = await axios.get(
          `/vehicles/variants/${this.makes_value}/${this.makes_value}-${item}.json`
        );
        // JSON responses are automatically parsed.
        this.variants_value = null;
        this.variants = response.data.results;
        if (this.variants && !this.variants.includes("Other")) {
          this.variants.push("Other")
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClickChild(){
      localStorage.removeItem("tradein"); ///clear stored local storage trade in
      let tradeincomments = "";
      if(this.yes_comments == 'Yes') {
        tradeincomments = this.comments;
      } else {
        tradeincomments =  '';
      }
      this.$emit( 'handle-form-data',
      {
        year: this.year_value,
        make: this.makes_value,
        model: this.models_value,
        variant: this.variants_value,
        tradein_vehicle: this.year_value + ' ' + (this.makes_value ? this.makes_value : '') + ' ' + (this.models_value ? this.models_value : '') + ' ' + (this.variants_value ? this.variants_value : '')  + ' ' + (this.other_variant ? this.other_variant : ''),
        vehicle_condition: this.vehicle_condition,
        vehicle_service_hist: this.service_history,
        tradein_comments: tradeincomments,
        vehicle_aval_keys: this.aval_keys
      }
     );
   },
   storeTradin(){
     this.UIkit.modal("#trade-in-modal").hide();
     let tradeinStorage = JSON.parse(localStorage.getItem("tradein")) || [];

     let tradeincomments = "";
     if(this.yes_comments == 'Yes') {
       tradeincomments = this.comments;
     } else {
       tradeincomments =  '';
     }

     tradeinStorage.push({
       tradein: 'Yes I have a vehicle to trade in',
       year: this.year_value,
       make: this.makes_value,
       model: this.models_value,
       variant: this.variants_value,
       tradein_vehicle: this.year_value + ' ' + (this.makes_value ? this.makes_value : '') + ' ' + (this.models_value ? this.models_value : '') + ' ' + (this.variants_value ? this.variants_value : '') + ' ' + (this.other_variant ? this.other_variant : ''),
       tradein_vehicle_other: this.other_variant,
       vehicle_condition: this.vehicle_condition,
       vehicle_service_hist: this.service_history,
       yes_comments: this.yes_comments,
       tradein_comments: tradeincomments,
       vehicle_aval_keys: this.aval_keys
     });
     localStorage.setItem("tradein", JSON.stringify(tradeinStorage));
   }
  },
};
</script>
<style>
.trade-in-modal hr {
    border-top: 1px solid #f2f2f2;
}
.vehicle_condition {
      margin-top: -10px;
}
.trade-in-modal .el-slider__button {
    border: 2px solid #002c5f;
    background-color: #002c5f;
}
.trade-in-modal .el-slider__bar, .trade-in-modal .el-slider__bar:hover {
    background-color: #002c5f;
}
.trade-in-modal .el-slider__stop {

    background-color: #909399;
}
.trade-in-modal .el-slider__marks-text, .aval_keys .el-switch__label *{
  font-family: "Hyundai Sans Head";
}
.trade-in-modal .el-switch__label.el-switch__label--right.is-active{
  color: rgb(47, 188, 5)!important;
}
.el-select.v-select .el-input--suffix .el-input__inner {
  height: 54px;
  border-radius: 5px;
}
.trade-in-modal .uk-button {
    font-size: 20px;
}
.trade-in-modal .uk-textarea {
    border: 3px solid #002c5f;
}
.trade-in-modal .el-select-dropdown__item {
font-size: 18px;
font-weight: 900;
}
@media (min-width: 760px) {
  .trade-in-modal .uk-modal-body {
    min-width: 450px;
  }
}
</style>
