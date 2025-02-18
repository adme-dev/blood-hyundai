<template>
  <div id="modal-variants" class="uk-modal uk-open" style="display: block" container="#vehicle-container" uk-modal>

    <div class="uk-modal-dialog uk-modal-body selectedVariants uk-padding-small variant-select-body uk-border-rounded">

      <button class="uk-modal-close-default uk-icon-button uk-close-large uk-background-muted" type="button"
        uk-close></button>

      <h2 class="uk-h4 uk-text-bold uk-margin-remove">Enquire</h2>
      <hr class="uk-margin-small" />

      <div v-if="Object.keys(range).length < 1">
        <div class="uk-flex uk-flex-center uk-height-small">
          <div class="uk-margin-auto uk-margin-auto-vertical">
            <div uk-spinner></div>
          </div>
        </div>
      </div>

      <div v-else id="variantSelect">

        <ul id="sel_variant" class="uk-hidden" uk-switcher="animation: uk-animation-fade; swiping: false">
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
        <ul class="uk-switcher uk-overflow-hidden">
          <li>
            <div class="uk-width-1-1">
              <div class="uk-background-default">
                <div class="uk-grid-collapse uk-width-1-1 uk-child-width-1-1 uk-grid">
                  <p class="uk-text-secondary uk-text-small uk-margin-small-bottom">

                  <div class="choose" v-if="isActiveToggle == false">
                    Are you ready to experience your next <span class="uk-text-bold">

                      <span v-if="model">
                        {{ model.replace('-', ' ') }}
                      </span>
                      <span v-else>
                        {{ itemModel.replace('-', ' ') }}
                      </span>

                    </span>? Book a test
                    drive with us today!
                    <a class="uk-h6 uk-text-bold choose-select" href="#"
                      @click.prevent="isActiveToggle = !isActiveToggle">
                      <div>or Choose Another Hyundai.</div>
                    </a>
                  </div>


                  <div class="uk-width-1-1 choose" v-if="isActiveToggle == true">
                    <div class="uk-width-1-1 uk-inline">
                      <button
                        class="uk-button uk-width-auto uk-button-primary tm-button-default uk-text-bold uk-inline-clip uk-float-left"
                        @click.prevent="isActiveToggle = !isActiveToggle">
                        <span uk-icon="chevron-left"
                          class="uk-position-center-left uk-position-small uk-margin-small-left"></span>Back
                      </button>
                    </div>

                    <div class="uk-grid-collapse uk-child-width-1-2 uk-margin-small-top uk-margin-small-bottom uk-grid"
                      v-for="(catentry, index) in groupedMakes" :key="index">
                      <div class="uk-width-1-1 uk-h4 uk-text-left uk-text- uk-margin-small-top"
                        v-html="catentry[0]['vehiclecat']"></div>
                      <hr class="uk-width-1-1">

                      <label v-for="(entry, index) in catentry" :key="index" class="uk-text-center choose-model"
                        :class="{ 'active': activeIndex === entry.id }">
                        <img :data-src="entry.image" class="uk-margin-small-top" width="150" height="57" uk-img />
                        <div class="uk-width-1-1 uk-text-bold">
                          <input class="uk-hidden" type="radio"
                            :value="entry.segment.replace(/\s+/g, '-').toLowerCase()"
                            @change="getNewRange($event), onChangeCategory(), setActive(entry.id)">
                          {{ entry.title.rendered }}
                        </div>
                      </label>

                    </div>
                  </div>
                  </p>

                  <div class="choose uk-margin-small-top" v-if="isActiveToggle == false">
                    <div v-if="model" class="uk-text-bold uk-text-secondary uk-margin-small">Select
                      your
                      {{ model.replace('-', ' ') }}:
                    </div>
                    <div v-else class="uk-text-bold uk-text-secondary uk-margin-small">Select your
                      {{ itemModel.replace('-', ' ') }}:
                    </div>

                    <div>
                      <select v-model="selectedCategory" @change="oneChange()"
                        class="uk-select uk-form-large uk-margin-small-bottom uk-border-rounded">
                        <option value="All" selected>Select Variant</option>
                        <option v-for="variant in asc(rangeNames)" :value="'' + variant + ''">{{
        variant | capitalize
      }}
                        </option>
                      </select>
                    </div>
                  </div>


                  <div class="choose" v-if="selectedCategory !== 'All'"
                    :class="[isActiveToggle ? 'uk-hidden' : 'uk-visible']">

                    <div class="uk-text-bold uk-text-secondary uk-margin-small uk-text-capitalize">Select your
                      {{ selectedCategory }}:
                    </div>

                    <select v-model="selectedVariants" @change="onChange"
                      class="uk-select uk-form-large uk-border-rounded">
                      <option value="All" selected>Select Variant</option>
                      <option v-for="variants in asc(filteredModels)" :data-id="'' + variants.id + ''"
                        :value="'' + variants.title + ''">{{ variants.title | capitalize }}
                      </option>
                    </select>
                  </div>
                  <div class="choose" v-if="selectedVariants !== 'All'"
                    :class="[isActiveToggle ? 'uk-hidden' : 'uk-visible']">
                    <ul class="uk-list">
                      <li class="uk-text-capitalize" v-for="(variants, index) in asc(filteredVariant.slice(0, 1))">
                        <div class="uk-margin-medium-top">
                          <div class="uk-margin-small-left uk-text-secondary uk-text-center">
                            <div class="uk-text-bold uk-text-uppercase">{{ variants.model }} {{
        variants.grade_id
      }}
                            </div>
                            <div class="uk-text-light">{{ variants.title | capitalize }}</div>
                          </div>

                          <div class="uk-position-relative uk-visible-toggle" tabindex="-1"
                            uk-slideshow="animation:fade;ratio: 370:350; min-height: 380">
                            <ul class="uk-slideshow-items uk-text-center">
                              <li v-for="colors in variants.colors.images" :key="colors.id">

                                <div>
                                  <div>
                                    <div v-if="variants.drive_away" class="uk-margin-medium-top">
                                      <div class="uk-text-small uk-text-light uk-text-emphasis">
                                        DRIVE AWAY FROM
                                      </div>
                                      <div class="uk-h1 uk-text-bold uk-margin-remove">
                                        ${{ parseInt(variants.drive_away) + paintPrice(colors.paint_price) | formatPrice
                                        }}<sup>*</sup>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="uk-text-center uk-text-light">
                                  Colour: {{ colors.colour_name }}
                                </div>

                                <img :data-src="buttonColour || variants.vehicle_image[0]" width="1150" height="872"
                                  class="colour-img uk-display-block uk-margin-auto" data-uk-img />

                              </li>
                            </ul>
                            <div>
                              <div
                                class="uk-text-xsmall uk-text-light uk-text-center uk-padding-small uk-padding-remove-top">
                                Image shown for guidance purpose only.</div>
                              <ul
                                class="uk-flex uk-flex-center uk-grid-collapse uk-child-width-auto variant-colours-items uk-grid">
                                <li :uk-slideshow-item="`${index}`" v-for="(colors, index) in variants.colors.images"
                                  :key="colors.id">
                                  <a href="#">
                                    <div @click.prevent="
        buttonColour = colors.images,
        changePrice = parseInt(variants.drive_away) + paintPrice(colors.paint_price)
        " class="uk-border-circle uk-background-cover"
                                      :style="{ 'background-image': 'url(' + colors.swatch_colour_ + ')' }"></div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div><img :data-src="buttonColour || variants.vehicle_image[0]" class="uk-hidden"
                              loading="lazy" uk-img /></div>
                          <div class="uk-text-light uk-text-secondary uk-margin-small-left uk-margin-small-top">Key
                            Features</div>
                          <div class="uk-list-collapse uk-text-xsmall uk-margin-remove v-features"
                            v-html="variants.features"></div>
                          <div class="uk-width-expand uk-text-meta-xs uk-margin-medium-top">
                            <sup>*</sup>There may be a delay to any pricing updates displaying correctly on our
                            materials. Always obtain
                            confirmation on updated pricing from {{ siteName }}. All prices are subject to change at the
                            discretion of
                            {{ siteName }}.
                          </div>
                          <div class="uk-margin-medium-top uk-text-right">


                            <button
                              class="uk-button uk-width-1-2 uk-button-primary tm-button-default uk-text-bold uk-inline-clip"
                              v-show="!firstStep" uk-switcher-item="1"><span uk-icon="chevron-right"
                                class="uk-position-center-right uk-position-small"></span>
                              Next</button>

                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="uk-grid-collapse uk-flex uk-flex-middle uk-margin-small-top uk-child-width-auto uk-grid">
                  <div class="uk-text-bold uk-width-expand">1/3</div>
                  <div class="uk-text-xsmall">View our online <a href="/privacy-policy">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>

          </li>
          <li>
            <div class="uk-width-1-1">
              <div class="uk-padding-small uk-background-default variant-lead-form">
                <p class="uk-text-secondary uk-text-bold">Contact details</p>
                <form class="uk-position-relative" novalidate="true" :class="this.errors ? 'errors' : false">
                  <div v-if="errors.length" class="error-message">
                    <div>Please correct the following error(s):</div>
                    <ul class="uk-list uk-list-hyphen uk-hidden">
                      <li v-for="error in errors">{{ error }}</li>
                    </ul>
                  </div>
                  <fieldset class="uk-fieldset">
                    <div class="uk-width-1-1 uk-inline">
                      <input id="first_name" class="uk-input uk-form-large" name="first_name" v-model="first_name"
                        required @invalid="invalidateForm" type="text" @input="persist" />
                      <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label> <span
                        class="error-message uk-text-small">First name required</span>
                    </div>
                    <div class="uk-width-1-1 uk-inline">
                      <input id="second_name" class="uk-input uk-form-large" name="second_name" v-model="second_name"
                        required @invalid="invalidateForm" type="text" @input="persist" />
                      <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label> <span
                        class="error-message uk-text-small">Second name required</span>
                    </div>
                    <div class="uk-width-1-1 uk-inline">
                      <input id="email" class="uk-input uk-form-large" name="email" v-model="email" required
                        @invalid="validEmail" type="email" @input="persist" />
                      <label class="uk-form-label" for="email">Email Address<sup>*</sup></label> <span
                        class="error-message uk-text-small">Email address required</span>
                    </div>
                    <div class="uk-width-1-1 uk-inline">
                      <input id="phone" name="phone" class="uk-input uk-form-large" v-model="phone" type="tel"
                        @input="persist" />
                      <label class="uk-form-label" for="phone">Phone Number</label>
                    </div>
                    <div class="uk-width-1-1 uk-inline">
                      <textarea class="uk-textarea" name="message" type="text" v-model="message"
                        @input="persist"></textarea>
                      <label class="uk-form-label message-label" for="message">Comments</label>
                    </div>
                    <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                      <label class="uk-margin-small-left uk-margin-auto-right">I have a vehicle to trade in.</label>
                      <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein" value="" checked />
                        No</label>
                      <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein"
                          value="Yes I have a vehicle to trade in" /> Yes</label>
                    </div>
                    <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                      <label class="uk-margin-small-left uk-margin-auto-right">I'm interested in finance.</label>
                      <label><input class="uk-radio" type="radio" name="finance" v-model="finance" value="" checked />
                        No</label>
                      <label><input class="uk-radio" type="radio" name="finance" v-model="finance"
                          value="Yes I'm interested in finance." /> Yes</label>
                    </div>
                  </fieldset>
                </form>
                <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2 uk-grid">
                  <div>
                    <button
                      class="uk-button uk-width-1-1 uk-button-default tm-button-default uk-text-bold uk-inline-clip"
                      uk-switcher-item="0"><span uk-icon="chevron-left"
                        class="uk-position-center-left uk-position-small"></span> Back
                    </button>
                  </div>
                  <div>
                    <button
                      class="uk-button uk-width-1-1 uk-button-primary tm-button-default uk-text-bold uk-inline-clip"
                      @click="checkForm"><span uk-icon="chevron-right"
                        class="uk-position-center-right uk-position-small"></span>
                      Next</button>
                  </div>
                </div>
                <div class="uk-grid-collapse uk-flex uk-flex-middle uk-margin-medium-top uk-child-width-auto uk-grid">
                  <div class="uk-text-bold uk-width-expand">2/3</div>
                  <div class="uk-text-xsmall">View our online <a href="/privacy-policy">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="uk-width-1-1">
              <div class="uk-padding-small uk-background-default">
                <div class="uk-text-secondary uk-text-bold">Enquiry summary</div>
                <div class="uk-text-meta uk-text-italic">Review before Submit</div>
                <ul class="uk-list uk-list-divider">
                  <li>
                    First Name:
                    <div class="uk-float-right uk-text-bold">{{ first_name }}</div>
                  </li>
                  <li>
                    Second Name:
                    <div class="uk-float-right uk-text-bold">{{ second_name }}</div>
                  </li>
                  <li>
                    Email Address:
                    <div class="uk-float-right uk-text-bold">{{ email }}</div>
                  </li>
                  <li v-if="phone">
                    Phone Number:
                    <div class="uk-float-right uk-text-bold">{{ phone }}</div>
                  </li>
                  <li v-if="tradein">
                    <div class="uk-text-bold">{{ tradein }}</div>
                  </li>
                  <li v-if="finance">
                    <div class="uk-text-bold">{{ finance }}</div>
                  </li>
                  <li v-if="message">
                    <div>Message:</div>
                    <div>{{ message }}</div>
                  </li>
                  <li>
                    <div class="uk-text-capitalize" v-for="(variants, index) in asc(filteredVariant.slice(0, 1))">
                      <div class="uk-margin-small-top uk-text-secondary uk-text-center">
                        <div class="uk-text-bold">{{ variants.model | capitalize }} {{
        variants.grade_id | capitalize
      }}
                        </div>
                        <div class="uk-text-light">{{ variants.title | capitalize }}</div>

                        <div v-if="variants.drive_away && changePrice" class="uk-margin-small-top">
                          <div class="uk-text-light space15">DRIVEAWAY FROM</div>
                          <h3 class="uk-h1 uk-margin-remove">
                            ${{ changePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                          </h3>
                        </div>

                        <div v-else-if="variants.drive_away" class="uk-margin-medium-top">
                          <div class="uk-text-light space15">DRIVEAWAY FROM</div>
                          <h3 class="uk-h1 uk-margin-remove">
                            ${{ variants.drive_away.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}<sup>*</sup>
                          </h3>
                        </div>

                      </div>
                      <div>
                        <img :data-src="buttonColour || variants.colors.images[0].images" loading="lazy" uk-img />

                        <!-- <img v-if="buttonColour" :data-src="buttonColour" loading="lazy" uk-img/>
                        <img v-else-if="variants.colors.images[0].variant_gallery[0]" :data-src="variants.colors.images[0].variant_gallery[0]" loading="lazy" uk-img/>
                        <img v-else="variants.vehicle_image" :data-src="variants.vehicle_image" loading="lazy" uk-img/> -->

                      </div>
                      <div class="uk-width-expand uk-text-meta-xs uk-margin-small-top">
                        <sup>*</sup>There may be a delay to any pricing updates displaying correctly on our materials.
                        Always obtain
                        confirmation on updated pricing from {{ siteName }}. All prices are subject to change at the
                        discretion of
                        {{ siteName }}.
                      </div>
                    </div>
                  </li>
                </ul>
                <div
                  class="uk-overlay uk-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
                  v-show="isSending">
                  <div class="uk-position-center uk-text-center">
                    <div uk-spinner="ratio: 2"></div>
                    <p>Sending...</p>
                  </div>
                </div>
                <div
                  class="confirm-overlay uk-overlay uk-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
                  v-show="isSent">
                  <div class="uk-position-center uk-text-center uk-padding form-confirmation">
                    <strong>Hi {{ first_name }}</strong>
                    <div>Thank you for your enquiry. One of our staff members will be in touch shortly.</div>
                    <button
                      class="uk-button uk-button-primary tm-button-default uk-text-bold uk-button-large uk-margin-small-top"
                      @click="closeSent">OK
                    </button>
                  </div>
                </div>
                <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2 uk-grid">
                  <div>
                    <button
                      class="uk-button uk-width-1-1 uk-button-default tm-button-default uk-text-bold uk-inline-clip"
                      uk-switcher-item="1"><span uk-icon="chevron-left"
                        class="uk-position-center-left uk-position-small"></span> Back
                    </button>
                  </div>
                  <div>
                    <button
                      class="uk-button uk-width-1-1 uk-button-primary tm-button-default uk-text-bold uk-inline-clip"
                      @click="submitForm">Submit</button>
                  </div>
                </div>
                <div class="uk-grid-collapse uk-flex uk-flex-middle uk-margin-medium-top uk-child-width-auto uk-grid">
                  <div class="uk-text-bold uk-width-expand">3/3</div>
                  <div class="uk-text-xsmall">View our online <a href="/privacy-policy">Privacy Collection statement</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { persistorMixin } from "@/mixins/persistMixin";
export default {
  name: "variant-select-enquire",
  mixins: [persistorMixin(["first_name", "second_name", "email", "phone", "message"])],
  props: {
    itemModel: {
      type: [Object, String],
      required: true,
    },
    variants: {
      type: [Array, Object, String],
    }
  },
  data() {
    return {
      siteName: this.$store.state.site.name,
      range: [],
      model: '',
      selectedCategory: "All",
      selectedVariants: "All",
      errors: !1,
      first_name: "",
      second_name: "",
      email: "",
      phone: "",
      message: "",
      finance: "",
      tradein: "",
      isSending: !1,
      isSent: !1,
      firstStep: !0,
      defaultImg: null,
      buttonColour: '',
      changePrice: '',
      activeIndex: 0,
      isActiveToggle: false
    };
  },
  filters: {
    capitalize: function (e) {
      return e ? (e = e.toString()).charAt(0).toUpperCase() + e.slice(1).toLowerCase() : "";
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
  mounted: function () {
    this.getRange();
    document.getElementsByTagName("html")[0].classList.add("uk-modal-page")
  },
  beforeMount() {
    // fetch(`${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?filter[variant_category]=${this.itemModel}&per_page=100`).then((res) => {
    //       return res.json();
    //   }).then((data) => {
    //       this.range.push(...data);
    //   }).catch(error => {
    //       console.log(error)
    //   })
  },
  methods: {
    closeSent() {
      this.isSent = 0
      //console.log('shit')
    },
    formatBullet(value) {
      var myNewString =
        "<li>" +
        value.split("\r\n").join("</li><li>") +
        "</li>";
      return myNewString;
    },
    setActive: function (index) {
      this.activeIndex = index;
      this.isActiveToggle = false;
      //this.UIkit.toggle('.choose').toggle();
    },
    asc: function (e) {
      return e.slice().sort(function (e, t) {
        return e > t;
      });
    },
    clickToggle: function () {
      this.isActiveToggle = false;
    },
    onChange(e) {
      if (e.target.options.selectedIndex > -1) {
        const t = e.target.options[e.target.options.selectedIndex].dataset;
        (this.dataid = t.id), this.dataid && (this.firstStep = !1);
      }
    },
    oneChange() {
      this.selectedVariants = 'All';
    },
    onChangeCategory() {
      this.selectedCategory = 'All';
    },
    // closeCategory(){
    //   this.UIkit.toggle('.choose').toggle();
    // },
    paintPrice(value) {
      if (value) {
        return parseInt(value)
      } else {
        return parseInt(0)
      }
    },
    checkForm: function (e) {
      (this.errors = []),
        this.first_name || this.errors.push("Fist Name required."),
        this.second_name || this.errors.push("Second Name required."),
        this.email ? this.validEmail(this.email) || this.errors.push("Valid email required.") : this.errors.push("Email required."),
        this.errors.length || this.UIkit.switcher("#sel_variant").show("2"),
        this.first_name && this.second_name && this.email,
        e.preventDefault();
    },
    validEmail: function (e) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e);
    },
    invalidateForm() {
      this.errors = !0;
    },
    submitForm: function (e) {

      (this.isSending = !this.isSending),
        axios
          .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
            payload: {
              input_1: this.first_name + " " + this.second_name,
              input_3: this.phone,
              input_5: this.email,
              input_4: this.message,
              input_28: this.finance,
              input_20: this.tradein,
              input_29: parseInt(this.dataid),
              input_30: this.filteredVariant[0]['title'],
              input_31: '',
              input_32: '',
              //input_32: encodeURIComponent(JSON.stringify(this.filteredVariant)),
              input_33: this.buttonColour || this.filteredVariant[0].colors.images[0].images,
              input_34: this.changePrice || this.filteredVariant[0].drive_away,
            },
            formid: this.$store.state.site.forms.showroom,
          })
          .then((e) => {
            (this.isSending = !1), (this.isSent = !0);

            window.dataLayer?.push({
              event: "FormSub Variants",
              formName: "Variants Form",
              formStatus: "submitted",
              firstName: this.first_name,
              secondName: this.second_name,
              email: this.email,
              phone: this.phone,
              message: this.message,
            });

          })
          .catch((e) => {
          });
    },
    async getRange() {
      const { data } = await axios.get(
        `${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?filter[variant_category]=${this.itemModel}&per_page=100`
      );
      this.range = data;
    },
    getNewRange(model) {
      axios
        .get(
          `${process.env.VUE_APP_OEM_2021_CDN_URL}/variants?filter[variant_category]=${model.target.value}&per_page=100`
        )
        .then((res) => {
          this.range = res.data;
          this.model = model.target.value;
        })
        .catch((error) => {
          console.error("error getting variant by model", error);
        });
    }
  },
  watch: {
    phone() {
      this.phone = this.phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
  },
  computed: {
    vehicles() {
      return this.$store.state.models;
    },
    filteredModels: function () {
      var e = this.selectedCategory;
      return "All" === e ?
        this.range :
        this.range.filter(function (t) {
          return "All" === e || t.grade_id === e;
        });
    },
    filteredVariant: function () {
      var e = this.selectedVariants;
      if (Object.keys(this.range).length > 0) {
        return this.range.filter(function (t) {
          return "All" === e || t.title === e;
        });
      }
    },
    rangeNames: function () {
      for (var e = [], t = 0; t < this.range.length; t++) -1 === e.indexOf(this.range[t].grade_id) && e.push(this.range[t].grade_id);
      return e;
    },
    groupedMakes() {
      if (this.vehicles.length) {
        var makes = {};
        this.vehicles.forEach((item) => {
          makes[item.vehiclecat] = makes[item.vehiclecat] || [];
          makes[item.vehiclecat].push({
            title: item.title,
            image: item.model_image,
            caption: item.caption,
            vehiclecat: item.vehiclecat,
            segment: item.segment,
            variant_link: item.variant_link,
            slug: item.slug,
            id: item.id,
            form: item.form
          });
        });
        return makes;
      }
    },
  },
  destroyed() {
    document.getElementsByTagName("html")[0].classList.remove("uk-modal-page");
  },
}
</script>
<style scoped>
@media (min-width: 640px) {
  .variant-select-body {
    width: 400px;
    margin: unset;
    margin-left: auto;
  }
}

.variant-select-body .uk-select {
  font-size: 16px;
}

.variant-lead-form label.uk-form-label {
  position: absolute;
  top: -11px;
  left: 10px;
  font-size: 14px;
  font-weight: 700;
  padding: 1px 3px;
  background-color: #fff;
  -webkit-transition: 0.2s linear;
  -moz-transition: 0.2s linear;
  transition: 0.2s linear;
}

.variant-lead-form input:valid+.uk-form-label,
.variant-lead-form form.errors input:invalid+.uk-form-label {
  top: -11px;
}

.variant-lead-form input:focus+.uk-form-label {
  top: -11px;
}

.variant-lead-form .uk-inline {
  margin: 10px 0
}

.message-label {
  padding: 1px 3px;
  background-color: #fff
}

.error-message {
  display: none;
  color: #e60606;
}

.variant-lead-form form.errors input:invalid~.uk-form-label {
  color: #e60606;
}

.variant-lead-form form.errors input:invalid {
  border-bottom: 1px solid #ff002f;
}

.variant-lead-form form.errors input:invalid~.error-message {
  display: block;
}

.vehicle-nav .uk-navbar-nav>li>a {
  min-height: 60px;
}

.indicator {
  position: relative;
  width: 100%;
  height: 3px;
}

.indicator-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
  background: #41a4f4;
  transition: width ease .3s, left cubic-bezier(.4, .95, .5, 1.5) .5s;
}

.confirm-overlay.uk-overlay {
  background: rgb(255 255 255 / 95%);
}

.choose-model:hover {
  font-weight: bold;
  cursor: pointer;
}

.choose-model.active {
  font-weight: bold;
}

.choose-select {
  color: #1e87f0;
  text-decoration: underline;
  cursor: pointer;
}

img.colour-img[data-src][src*='data:image'] {
  position: absolute;
  content: "";
  display: block;
  top: 45%;
  left: 45%;
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #001E50;
  width: 39px;
  height: 39px;
  display: flex;
  align-content: center;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  transform: translate(-47%, -47%);
}
</style>
