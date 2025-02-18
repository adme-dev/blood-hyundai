<template>
  <div :id="`modal-${stockid}`" uk-modal class="modal-enquire">
    <div class="uk-modal-dialog uk-modal-body uk-background-default uk-box-shadow-medium uk-padding-remove"
      style="opacity: 1;transform: translateY(0);">
      <a href="#" class="uk-link-toggle enquire-header uk-flex uk-flex-middle view-form-header uk-background-secondary">
        <div class="uk-link-heading uk-light uk-hidden@s" @click="
    closeModal();
  ">
          <span class="icon-back uk-light" uk-icon="icon: arrow-left; ratio: 2"></span>
          <span class="uk-light">Back</span>
        </div>
        <span class="uk-margin-auto-left uk-light uk-visible@s">
          <div class="uk-link-heading">
            <span class="icon-enquire uk-modal-close-default" uk-icon="icon: close; ratio: 1.5" @click="
    closeModal();
  "></span>
          </div>
        </span>
      </a>


      <div class="uk-padding-remove-top car-sales-from">
        <div class="uk-grid-collapse uk-padding-small uk-background-secondary uk-light" uk-grid>
          <div class="uk-width-expand uk-text-center">
            <h1 class="uk-h3 uk-margin-remove uk-text-truncate title-items">
              {{ item.year.displayValue[0] }}
              <span class="uk-text-bold">{{ item.make.displayValue[0] }} {{ item.model.displayValue[0] }}</span>
            </h1>
            <div class="uk-text-meta">
              {{ item.title }}
            </div>
          </div>
        </div>

        <div class="uk-background-secondary uk-light">
          <div class="uk-grid-medium uk-padding-small uk-flex uk-flex-middle uk-flex-center uk-grid">

            <div>
              <div class="uk-text-left">
                <div>
                  <div class="uk-text-xsmall fo-dr-ti">DRIVE AWAY FROM</div>
                  <div class="uk-text-large uk-text-bold">
                    ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span class="uk-icon-button uk-text-bold fo-or">OR</span>
            </div>

            <div class="uk-inline">
              <div class="uk-text-large uk-text-bold">${{ item.perweek }} p/week <span
                  class="perweek-icon uk-position-top-right" uk-icon="warning"></span></div>
              <div class="uk-text-xsmall">To Approved Purchasers</div>
            </div>

          </div>
        </div>


        <carSalesGalleryList :itemStock="item.stockid"></carSalesGalleryList>

        <div class="uk-background-default">
          <div class="uk-grid-small uk-padding-small" uk-grid>
            <div class="uk-width-expand uk-margin-small-left uk-text-left">
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
        </div>

        <ul class="form-tab uk-tab uk-flex-center uk-margin-small-top" uk-grid
          uk-switcher="animation: uk-animation-fade; swiping:false">
          <li class="enqformnav"><a href="#">Enquire</a></li>

          <li v-if="item.condition.value[0] == 'used' && item.egc_price > 0">
            <a href="#">Calculator</a>
          </li>
          <li v-else-if="item.price > 0">
            <a href="#">Calculator</a>
          </li>

          <li><a href="#">Location</a></li>
        </ul>
        <ul class="uk-switcher uk-background-default uk-position-relative">
          <li class="uk-padding enqform">
            <div class="uk-text-primary uk-text-center">
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
                  <input v-model="username" id="username" name="username" type="text" class="uk-input uk-form-large"
                    data-vv-as="Name" placeholder="First and last name" />
                  <label class="uk-form-label">First and Last name</label>
                  <div class="uk-text-small uk-text-danger" v-if="errors.name">
                    {{ errors.name }}
                  </div>
                </div>
              </div>

              <div class="uk-margin-small">
                <div class="uk-inline uk-width-1-1 mdl-label">
                  <div :class="{ 'error': errors.email }">
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                    <input class="uk-input uk-form-large" name="email" type="text" v-model="email"
                      placeholder="Email address" />
                    <label class="uk-form-label">Email Address</label>
                    <div class="uk-text-small uk-text-danger" v-if="errors.email">
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
                <textarea id="input_4" class="uk-textarea uk-form-large" type="text" rows="3" v-model="message"
                  placeholder="Message"></textarea>
              </div>

              <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                <label class="uk-margin-small-left uk-margin-auto-right">I would like a test drive.</label>
                <label><input class="uk-radio" type="radio" name="testdrive" v-model="testdrive" value="" checked />
                  No</label>
                <label><input class="uk-radio" type="radio" name="testdrive" v-model="testdrive"
                    value="Yes would like to book a test drive." />
                  Yes</label>
              </div>

              <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                <label class="uk-margin-small-left uk-margin-auto-right">I have a vehicle to trade in.</label>
                <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein" value="" checked />
                  No</label>
                <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein"
                    value="Yes I have a vehicle to trade in" />
                  Yes</label>
              </div>

              <div class="uk-margin-small uk-grid-small uk-child-width-auto uk-grid">
                <label class="uk-margin-small-left uk-margin-auto-right">I'm interested in finance.</label>
                <label><input class="uk-radio" type="radio" name="finance" v-model="finance" value="" checked />
                  No</label>
                <label><input class="uk-radio" type="radio" name="finance" v-model="finance"
                    value="Yes I'm interested in finance." />
                  Yes</label>
              </div>

              <div class="uk-margin uk-text-center">
                <button class="uk-button uk-button-primary uk-button-large uk-width-auto border-radius-50" type="button"
                  @click="validateAndSubmit">
                  Send Enquiry
                </button>
              </div>
              <div class="uk-text-small uk-text-muted uk-text-center">
                <sup>*</sup>We do not disclose any information collected on the website to any organisation not related
                to this
                company.
              </div>
            </form>

            <div class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left"
              v-show="isSent">
              <div class="uk-position-center uk-text-center form-confirmation">
                <strong>Hi {{ username }}</strong>
                <div>{{ confirmationMessage }}</div>
                <button class="uk-button uk-button-primary uk-button-large uk-margin-small-top uk-hidden"
                  @click="close()">
                  OK
                </button>
              </div>
            </div>
          </li>

          <li v-if="item.condition.value[0] == 'used' && item.egc_price > 0">
            <calculator :retail="item.egc_price"></calculator>
          </li>
          <li v-else-if="item.price > 0">
            <calculator :retail="item.price"></calculator>
          </li>

          <li>
            <div class="uk-grid-collapse uk-padding-small uk-child-width-1-1" uk-grid>
              <div>
                <div class="uk-margin-small-left">
                  <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-remove">
                    {{ dealerInfo.name }}
                  </div>

                  <div v-if="item.condition.value[0] === 'used'" class="uk-width-1-1 uk-text-light">Corner Dora and
                    Banksia Streets Heidelberg, Melbourne VIC 3084</div>
                  <div v-else class="uk-width-1-1 uk-text-light">{{ dealerInfo.showroom_address }}</div>

                </div>

                <div class="map-container-page uk-margin-small-top">
                  <iframe v-if="dealerInfo.map_embed" class="uk-height-large googlemap border-radius-10"
                    :src="dealerInfo.map_embed" width="600" height="450" frameborder="0" style="border:0;"
                    allowfullscreen="" aria-hidden="false" tabindex="0" loading="lazy"></iframe>
                </div>

              </div>
              <div class="uk-margin-medium-top">
                <trading-hours :tradingHours="dealerInfo.tradingHours" />
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
import Calculator from "@/components/search/Calculator";
import TradingHours from "@/components/page-elements/TradingHours.vue";
import carSalesGalleryList from "@/components/search/CarSales/GalleryList.vue";
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
      finance: "",
      tradein: "",
      testdrive: "",
      message: "",
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
      return this.$store.getters.vehicleById(this.stockid);
    },
  },
  methods: {
    emailIsValid: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        this.isSending = !this.isSending;
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
              input_16: JSON.stringify(this.item),
              input_26: 'Single Enquiry Page POP UP',
              
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
    },
    closeModal() {
      this.UIkit.modal("#modal-" + this.stockid).hide();
    },
  },
  components: { calculator: Calculator, TradingHours, carSalesGalleryList },
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

.perweek-icon {
  color: #efef;
  right: -10px
}

.fo-or {
  color: #001e50;
  background-color: #fff;
}

.modal-enquire .uk-light {
  color: #fff
}

.v-slideshow:after {
  content: "";
  bottom: -5px;
}
</style>
