<template>
  <div v-if="showModalGallery"
    class="uk-flex uk-flex-top uk-modal uk-padding-small uk-padding-remove-top uk-background-secondary uk-open"
    id="modal-enquire" container="#car-sales">
    <div class="uk-width-1-1 uk-height-1-1 uk-padding-remove" style="opacity: 1;transform: translateY(0);">

      <a @click.prevent="closeModal" class="enquire-header uk-flex uk-flex-middle view-form-header">
        <div class="uk-light uk-visible@m">{{ item.title }}</div>
        <div class="uk-link-heading uk-light uk-hidden@s">
          <span class="icon-back" uk-icon="icon: arrow-left; ratio: 2"></span>
          <span>Back</span>
        </div>
        <span class="uk-margin-auto-left uk-light uk-visible@s">
          <div class="uk-link-heading">
            <span class="icon-enquire" uk-icon="icon: close; ratio: 1.5"></span>
          </div>
        </span>
      </a>

      <div class="uk-padding-remove-top uk-height-1-1 car-sales-from">


        <div class="uk-grid-small uk-grid">

          <carSalesGalleryList class="uk-width-expand@m uk-margin-small-bottom" :itemStock="item">
          </carSalesGalleryList>

          <div class="uk-position-relative uk-width-large@m">

            <div class="uk-height-1-1 uk-background-default uk-border-rounded">

              <div class="sticky-form">
                <div class="uk-overflow-auto">

                  <div class="uk-grid-collapse uk-padding-small uk-grid">
                    <div class="uk-width-expand uk-text-left uk-margin-small-right">
                      <h1 class="uk-h3 uk-margin-remove uk-text-truncate title-items">
                        {{ item.year.displayValue[0] }}
                        <span class="uk-text-bold uk-margin-small-right">{{ item.make.displayValue[0] }} {{
    item.model.displayValue[0] }}</span>
                      </h1>
                      <div class="uk-text-large">
                        {{ item.condition.displayValue[0] }} {{ item.title }}
                      </div>
                    </div>
                    <div>

                      <div v-if="item.wasprice" class="uk-text-left">
                        <div class="uk-text uk-text-small">Was <s>${{ item.wasprice | formatPrice }}</s></div>
                        <span class="uk-h6 uk-text-bold uk-margin-remove text-red">Is Now</span>
                        <span class="uk-h2 uk-margin-remove uk-text-bold text-red"> ${{ item.price | formatPrice
                          }}<sup>*</sup></span>
                        <div class="uk-text-xsmall uk-margin-small-bottom">DRIVE AWAY</div>
                      </div>

                      <div v-else class="uk-text-center">
                        <div v-if="item.price">
                          <h4 class="uk-h2 uk-margin-remove uk-text-bold">
                            ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                          </h4>
                          <div class="uk-text-xsmall">DRIVE AWAY</div>
                        </div>
                        <div v-else>
                          <h3 class="uk-margin-remove uk-text-bold">P.O.A</h3>
                          <div class="uk-text-small">Contact Us.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="uk-grid-collapse uk-padding-small uk-padding-remove-top uk-grid">
                    <div class="uk-width-expand uk-margin-small-top uk-text-left">
                      <div class="uk-h4 uk-margin-remove uk-text-light">Call us</div>
                      <a itemprop="telephone" :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`"
                        class="uk-h4 uk-text-bold">{{ dealerInfo.salesNumber }}</a>
                      <div class="uk-text-meta">Stock No: {{ item.stockid }}</div>
                    </div>
                    <div class="uk-margin-auto-vertical uk-light">
                      <a itemprop="telephone" :href="`tel:${dealerInfo.salesNumber.replace(/[^A-Z0-9]+/gi, '')}`"
                        class="uk-margin-small-right call-us-icon" uk-icon="icon: receiver; ratio: 1.8"></a>
                    </div>
                  </div>


                  <ul class="form-tab uk-tab uk-flex-center uk-margin-small-top" uk-grid
                    uk-switcher="animation: uk-animation-fade; swiping:false">
                    <li class="enqformnav"><a href="#">Enquire</a></li>

                    <li v-if="item.price > 0">
                      <a href="#">Calculator</a>
                    </li>

                    <li><a href="#">Location</a></li>
                  </ul>
                  <ul class="uk-switcher uk-padding-small uk-background-default uk-position-relative">
                    <li class="enqform">
                      <div class="uk-text-primary uk-text-center uk-margin-small-top">
                        <h3 class="uk-card-title uk-margin-remove">Enquire on this</h3>
                        <div>{{ item.make.displayValue[0] }} {{ item.model.displayValue[0] }}</div>
                        <div class="uk-width-1-1 uk-text-small uk-text-center">or ask a question</div>
                      </div>
                      <form class="adne-form">
                        <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left"
                          v-show="isSending">
                          <div class="uk-position-center uk-text-center">
                            <div uk-spinner="ratio: 2"></div>
                            <p>Sending...</p>
                          </div>
                        </div>
                        <div class="uk-margin-small">
                          <div class="uk-inline uk-width-1-1 mdl-label">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input v-model="username" id="username" name="username" type="text"
                              class="uk-input uk-form-large" data-vv-as="Name" placeholder="First and last name"
                              :class="[errors.name ? 'field-error' : '']" />
                            <label class="uk-form-label">First and Last name</label>
                            <div class="uk-text-small text-red" v-if="errors.name">
                              {{ errors.name }}
                            </div>
                          </div>
                        </div>

                        <div class="uk-margin-small">
                          <div class="uk-inline uk-width-1-1 mdl-label">
                            <div :class="{ control: true }">
                              <span class="uk-form-icon" uk-icon="icon: mail"></span>
                              <input class="uk-input uk-form-large" name="email" type="text" v-model="email"
                                placeholder="Email address" :class="[errors.email ? 'field-error' : '']" />
                              <label class="uk-form-label">Email Address</label>
                              <div class="uk-text-small text-red" v-if="errors.email">
                                {{ errors.email }}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="uk-margin-small mdl-label">
                          <div class="uk-inline uk-width-1-1 mdl-label">
                            <label class="uk-form-label">Phone Number</label>
                            <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                            <input id="input_3" class="uk-input uk-form-large" type="tel" v-model="phone"
                              placeholder="Phone Number" />
                            <label class="uk-form-label">Phone Number</label>
                          </div>
                        </div>

                        <div class="uk-width-1-1 uk-margin-small">
                          <textarea id="input_4" class="uk-textarea uk-form-large" type="text" rows="3"
                            v-model="message" placeholder="Message"></textarea>
                        </div>

                        <div class="uk-margin-small label-select sw-w uk-grid-collapse uk-child-width-auto uk-grid">
                    <label class="uk-margin-auto-right">I would like a test drive.</label>

                    <el-switch v-model="testdrive" active-text="Yes" inactive-text="No" active-color="#13ce66"
                      inactive-color="#910a2d" active-value="Yes would like to book a test drive." inactive-value="No"
                      class="uk-float-right form-switch">
                    </el-switch>
                  </div>


                  <div class="uk-margin-small label-select sw-w uk-grid-collapse uk-child-width-auto uk-grid">
                    <label class="uk-margin-auto-right">I have a vehicle to trade in.</label>

                    <el-switch v-model="tradein" active-text="Yes" inactive-text="No" active-color="#13ce66"
                      inactive-color="#910a2d" active-value="Yes I have a vehicle to trade in" inactive-value="No"
                      class="uk-float-right form-switch">
                    </el-switch>

                    <div v-if="selectedTradeInVehicle">
                      <p>{{ selectedTradeInVehicle.year }} {{ selectedTradeInVehicle.make }} {{
                        selectedTradeInVehicle.model }}</p>
                    </div>
                  </div>


                  <div class="uk-margin-small label-select sw-w uk-grid-collapse uk-child-width-auto uk-grid">
                    <label class="uk-margin-auto-right">I'm interested in finance.</label>

                    <el-switch v-model="finance" active-text="Yes" inactive-text="No" active-color="#13ce66"
                      inactive-color="#910a2d" active-value="Yes I'm interested in finance." inactive-value="No"
                      class="uk-float-right form-switch">
                    </el-switch>
                  </div>


                  <div class="uk-grid-collapse uk-padding-small uk-margin-small sw-w uk-flex uk-flex-center reserve-wrap uk-grid">
                    <div class="uk-text-center uk-width-1-1">
                      <h4 class="uk-text-bold uk-margin-remove">Reserve this Vehicle for $500?</h4>
                    </div>
                    <div class="uk-margin-small-bottom">
                      <el-switch v-model="reserve" active-text="Yes Reserve" inactive-text="No" active-color="#13ce66"
                        inactive-color="#910a2d" active-value="Yes I would like to reserve this vehicle"
                        inactive-value="No" class="uk-width-1-1 uk-margin-small-top">
                      </el-switch>
                    </div>
                  </div>

                        <div class="uk-margin uk-text-center">
                          <button class="uk-button uk-button-secondary uk-text-large uk-padding-small uk-border-rounded uk-width-1-1"
                            type="button" @click="validateAndSubmit">
                            Send Enquiry
                          </button>
                        </div>
                        <div class="uk-text-xsmall uk-text-muted uk-text-center">
                          <sup>*</sup>We do not disclose any information collected on the website to any organisation
                          not
                          related to this
                          company.
                        </div>
                      </form>

                      <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left"
                        v-show="isSent">
                        <div class="uk-position-center uk-text-center form-confirmation">
                          <strong>Hi {{ username }}</strong>
                          <div>{{ confirmationMessage }}</div>
                          <button class="uk-button uk-button-primary uk-button-large uk-margin-small-top"
                            @click="close()">
                            OK
                          </button>
                        </div>
                      </div>
                    </li>

                    <li v-if="item.price > 0">
                      <div>
                        <calculator :retail="item.price"></calculator>
                      </div>
                    </li>

                    <li>
                      <div class="uk-grid-collapse uk-padding-small uk-child-width-1-1 uk-grid">
                        <div>
                          <div class="uk-margin-small-left">
                            <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove">
                              {{ dealerInfo.name }}
                            </div>
                            <div class="uk-width-1-1 uk-text-light">{{ dealerInfo.showroom_address }}</div>
                          </div>
                          <div class="map-container-page uk-margin-small-top">
                            <iframe v-if="dealerInfo.map_embed" class="uk-height-large googlemap border-radius-10"
                              :src="dealerInfo.map_embed" width="600" height="450" frameborder="0" style="border: 0"
                              allowfullscreen="" aria-hidden="false" tabindex="0" loading="lazy"></iframe>
                          </div>
                        </div>
                        <div class="uk-margin-medium-top">
                          <trading-hours :tradingHours="dealerInfo.tradingHours" />
                        </div>
                      </div>
                    </li>
                  </ul>
                  <hr>
                  <div class="uk-padding-small">
                    <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-bottom-medium">
                      <div>About This Vehicle</div>
                      <div class="uk-text-meta">{{ item.title }}</div>
                    </div>
                    <div class="single-specs uk-column-1-1" itemprop="description">
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Year:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.year.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Odometer:</div>
                        <div class="uk-width-expand">
                          <span v-if="item.kms">{{ item.kms }} km</span><span v-else>0 km</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Condition:</div>
                        <div class="uk-width-expand">
                          <span class="uk-text-capitalize">{{ item.condition.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Registration:</div>
                        <div class="uk-width-expand">
                          <span><span v-if="item.rego">Registered</span><span v-else>Unregistered</span></span>
                        </div>
                      </div>
                      <div v-if="item.regoexpiry"
                        class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Registration Expiry:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.regoexpiry }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Manufacture:</div>
                        <div class="uk-width-expand uk-text-capitalize">
                          <span>{{ item.make.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Model:</div>
                        <div class="uk-width-expand">
                          <span class="uk-text-capitalize">{{ item.model.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Badge:</div>
                        <div class="uk-width-expand">
                          <span class="uk-text-uppercase">{{ item.badge.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Series:</div>
                        <div class="uk-width-expand">
                          <span class="uk-text-uppercase">{{ item.series.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Body Type:</div>
                        <div class="uk-width-expand">
                          <span class="uk-text-capitalize">{{ item.body.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">
                          Exterior Colour:
                        </div>
                        <div class="uk-width-expand">
                          <span class="uk-text-capitalize">{{ item.colour.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Doors:</div>
                        <div class="uk-width-expand">
                          <span class="uk-text-capitalize">{{ item.doors.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">
                          Seating Capacity:
                        </div>
                        <div class="uk-width-expand">
                          <span>{{ item.seats.displayValue[0] }} Seats</span>
                        </div>
                      </div>
                      <div v-if="item.interiorcolour"
                        class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">
                          Interior Colour:
                        </div>
                        <div class="uk-width-expand">
                          <span class="uk-text-capitalize">{{ item.interiorcolour }}</span>
                        </div>
                      </div>
                      <div v-if="item.engine.displayValue[0]"
                        class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Engine:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.engine.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div v-if="item.cylinders"
                        class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Cylinders:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.cylinders }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Fuel Type:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.fuel.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div v-if="item.gears" class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Gears:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.gears }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">Transmission:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.transmission.displayValue[0] }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">VIN:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.vin }}</span>
                        </div>
                      </div>
                      <div class="uk-text-left uk-child-width-1-2 uk-width-1-1 uk-grid-small uk-grid">
                        <div class="uk-width-expand uk-text-meta">SN:</div>
                        <div class="uk-width-expand">
                          <span>{{ item.stockid }}</span>
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
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { mapState } from 'vuex';
import { Switch } from "element-ui";
const TradingHours = () => import(/* webpackChunkName: "TradingHours" */'@/components/page-elements/TradingHours')
const carSalesGalleryList = () => import(/* webpackChunkName: "GallerySlider" */ '@/components/search/CarSales/GallerySlider')
const Calculator = () => import(/* webpackChunkName: "Calculator" */ './Calculator')

Vue.use(Switch);

export default {
  name: "form-element",

  props: ["stockid"],
  data() {
    return {
      errors: { name: "", email: "" },
      info: [],
      loading: true,
      invalid: false,
      username: "",
      email: "",
      phone: "",
      finance: "No",
      tradein: "No",
      testdrive: "No",
      message: "",
      reserve: "",
      isSending: false,
      isSent: false,
      confirmationMessage: "",
    };
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
    ...mapState({
      showModalGallery: state => state.vehicleEnquiryPopUp.show,
      item: state => state.vehicleEnquiryPopUp.item
    }),
    dealerInfo() {
      const { name, lmct, showroom_address, map_embed, map_directions } = this.$store.state.site;
      const salesNumber = this.$store.state.site.departments.sales.phone;
      const tradingHours = this.$store.state.site.departments.sales.trading;
      return {
        name,
        lmct,
        showroom_address,
        map_embed,
        map_directions,
        salesNumber,
        tradingHours,
      };
    },
    getPr() {
      return this.$props;
    },
    item() {
      return this.$store.state.vehicleEnquiryGallery.item;
    },
    showModalGallery() {
      return this.$store.state.vehicleEnquiryGallery.show;
    },
  },
  methods: {
    closeModal(item) {
      this.$store.dispatch("vehicleEnquiryGallery", { show: false, item });
    },
    emailIsValid: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(email);
    },
    validateAndSubmit() {
      if (!this.username) {
        this.invalid = true;
        this.errors.name = "Name is required";
      } else {
        this.invalid = false;
      }

      if (!this.emailIsValid(this.email)) {
        this.invalid = true;
        this.errors.email = "Valid email is required";
      } else {
        this.invalid = false;
      }

      if (!this.invalid) {

        // Get campaign parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const campaign = urlParams.get('adme_campaign') || '';

        this.isSending = !this.isSending;

        // Remove the 'Comments' key from 'this.item'
        const itemToSend = { ...this.item };
        delete itemToSend.Comments; // Removes the 'Comments' key-value pair

        axios
          .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
            payload: {
              input_1: this.username,
              input_2: this.phone,
              input_3: this.email,
              input_4: this.message,
              input_5: this.item.stockid,
              input_6: this.finance,
              input_7: this.tradein,
              input_17: this.testdrive,
              input_8: this.item.condition.displayValue[0],
              input_9: this.item.make.displayValue[0],
              input_10: this.item.model.displayValue[0],
              input_11: this.item.badge.displayValue[0] || '',
              input_12: this.item.stockid + '/' + this.item.slug,
              input_16: JSON.stringify(itemToSend),
              input_18:'', //Reserve
              input_19: 'Stock Enquiry Gallery Popup',
              input_20: campaign
            },
            formid: this.$store.state.site.forms.carsales,
          })
          .then((response) => {
            if (response.data.is_valid) {
              this.confirmationMessage = response.data.confirmation_message.replace(/(&nbsp;|<([^>]+)>)/gi, "");
              this.isSending = false;
              this.isSent = true;

              window.dataLayer.push({
                event: `FormSub Stock ${this.item.condition.displayValue[0]}`, // Correct use of template literals // ie: FormSub Stock New
                formName: "stock enquire",
                formStatus: "submitted",
                username: this.username,
                phone: this.phone,
                email: this.email,
                message: this.message,
                finance: this.finance,
                tradeIn: this.tradein,
                testDrive: this.testdrive,
                stockId: this.stockid,
              });

            } else {
              this.isSending = false;
              this.isSent = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.email = "";
        this.phone = "";
        this.message = "";
      }
    },
    close() {
      this.username = "";
      this.email = "";
      this.phone = "";
      this.message = "";
      this.isSent = false;
      this.UIkit.modal("#modal-enquire").hide();
    },
  },
  components: { calculator: Calculator, TradingHours, carSalesGalleryList },
  filters: {
    formatPrice(value) {
      value = Math.round(value);
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style scoped>
.border-top-1 {
  border-top: 1px solid #e1e4e8;
}

.call-us-icon {
  padding: 10px;
  border-radius: 50px;
  background-color: #d2d2d2;
  webkit-transition: background-color 500ms linear;
  transition: background-color 500ms linear;
}

.call-us-icon:hover {
  background-color: #0bd415;
}

.icon-enquire {
  width: 30px;
  height: 30px;
}

.icon-back {
  width: 40px;
  height: 40px;
}

.call-us-icon svg {
  width: 36px;
  height: 36px;
}

.controlpanel[data-v-fb38c376] {
  left: 0;
}

.controlpanel-hide {
  transform: translateX(-150px);
}

.v-slideshow:after {
  content: "";
  bottom: -5px;
}

.sticky-form {
  position: sticky;
  top: 0px
}

.reserve-wrap{
  border: 2px solid #333;
  border-radius: 4px;
}

@media (min-width: 960px) {

  .sticky-form .uk-overflow-auto {
    height: 100vh;
  }
}
</style>
