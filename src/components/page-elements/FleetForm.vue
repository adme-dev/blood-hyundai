<template>
  <div class="uk-padding-small">



    <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-2@m overflow-vissible" uk-grid>
      <div>

        <div class="uk-text-center uk-margin-medium-top">
          <div class="uk-h1 uk-text-bold uk-text-capitalize">Contact {{ siteName }}</div>
          <p>At {{ siteName }}, your satisfaction is important to us. We’re here to help.</p>
          <p v-if="activeHoursTab === 'fleet_form'">
            Whatever your business' size, you need the right vehicle, <br class="uk-visible@m" />at the right price,
            with the right support to keep your business moving.
          </p>

          <div class="uk-h4 uk-text-bold uk-margin-medium">Choose the fleet vehicles for the needs of your organization
          </div>

          <div class="uk-text-center uk-margin">
            <a href="#" class="uk-button uk-button-primary uk-text-bold uk-width-auto uk-text-bold tm-button-default"
              uk-toggle="target: #fleet-models">
              Select your fleet vehicles.
            </a>
          </div>

        </div>

        <ul id="sel_form" class="uk-hidden"
          uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>

        <ul class="uk-switcher">
          <li>
            <div class="uk-width-1-1 small-lead-form">
              <div class="uk-padding-small">
                <div class="uk-margin-small-bottom uk-hidden">
                  <div class="uk-text-secondary uk-text-bold uk-margin-small">Your Details</div>
                </div>

                <form class="fleet-form" novalidate="true" :class="this.errors ? 'errors' : false">
                  <div v-if="errors" class="error-message">
                    <div>Please correct the following error(s):</div>
                    <ul class="uk-list uk-list-hyphen uk-hidden">
                      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                  </div>


                  <div v-if="selectedModels.length > 0"
                    class="uk-grid-match uk-text-center uk-grid-small uk-child-width-1-3 uk-margin-small" uk-grid>
                    <div class="uk-width-1-1 uk-h4 uk-text-bold uk-margin-small"><b>Please indicate the quantity by
                        vehicle below:</b></div>
                    <div v-for="(entry, index) in selectedModels" :key="index">
                      <div class="uk-padding-small uk-box-shadow-small uk-border-rounded">
                        <div class="uk-text-small uk-text-primary uk-text-bold uk-margin-small">{{ entry.title.rendered }}
                        </div>
                        <img :data-src="entry.model_image" class="uk-margin-small-bottom" width="150" height="57"
                          uk-img />

                        <counter v-model='resultCounterChild' :key="entry.id"></counter>

                      </div>
                    </div>
                  </div>


                  <div id="fleet-models" class="uk-padding-remove uk-height-1-1" data-uk-modal>

                    <div
                      class="uk-width-1-1 uk-width-1-2@m uk-width-1-3@l uk-padding-small uk-position-top-right uk-position-fixed uk-position-z-index">
                      <div class="uk-link-heading">
                        <button
                          class="uk-button uk-width-1-2 uk-button-primary tm-button-default uk-text-bold uk-inline-clip"
                          @click="close"><span uk-icon="chevron-left"
                            class="uk-position-center-left uk-position-small"></span>
                          Continue</button>
                      </div>
                    </div>

                    <div
                      class="uk-modal-body uk-width-1-1 uk-width-1-2@m uk-width-1-3@l uk-background-default uk-margin-auto-left uk-overflow-auto uk-animation-slide-right">

                      <div v-if="Object.keys(vehicles).length < 1">
                        <div class="uk-flex uk-flex-center uk-height-small">
                          <div class="uk-margin-auto uk-margin-auto-vertical">
                            <div uk-spinner></div>
                          </div>
                        </div>
                      </div>

                      <div v-else>
                        <h2 class="uk-margin-medium-top uk-margin-small-bottom"><b>Drive your business forward</b> <span
                            class="uk-text-light">with our extensive range of vehicles.</span></h2>
                        <div>If you’d like to talk more generally about your Fleet requirements, please contact us.
                        </div>

                        <h2 v-if="vehicleNames.length > 0" class="uk-margin-small">
                          <b>
                            {{ vehicleNames.length }}
                            <span v-if="vehicleNames.length > 1">vehicles</span><span v-else>vehicle</span>
                            select:
                          </b>
                        </h2>
                        <div>
                          <span v-if="selectedModels" v-for="(entry, index) in selectedModels" :key="index"
                            class="uk-text-bold">
                            <span>{{ (index > 0 ? ', ' : '') }}</span><span>{{ entry.title.rendered }}</span>
                          </span>
                        </div>

                        <div
                          class="uk-margin-medium-top uk-grid-collapse uk-child-width-1-3 uk-background-default uk-grid fleet-select"
                          v-for="(catentry, index) in groupedMakes" :key="index">
                          <hr class="uk-width-1-1">
                          <div class="uk-width-1-1 uk-h3 uk-text-left uk-text-bold  uk-margin-small-top"
                            v-html="catentry[0]['vehiclecat']"></div>
                          <label v-for="(entry, index) in catentry" :key="index" class="uk-text-center uk-inline-clip">
                            <img :data-src="entry.image" class="uk-margin-small-top" width="150" height="57" uk-img />
                            <div class="uk-width-1-1 check-title"><input
                                class="uk-checkbox uk-position-top-right uk-position-z-index" type="checkbox"
                                :value="entry.slug" v-model="vehicleNames"> {{ entry.title.rendered }}</div>
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div class="uk-width-1-1 uk-h4 uk-text-bold uk-text-center uk-margin-small">Your Details / Company
                    Details</div>
                  <fieldset class="uk-fieldset uk-grid-small uk-grid">


                    <div class="uk-width-1-2@m uk-inline">
                      <input id="first_name" class="uk-input uk-form-large" name="first_name" v-model="first_name"
                        required @invalid="invalidateForm" placeholder="First Name" type="text" />
                      <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label>
                      <span class="error-message uk-text-small">First name is mandatory</span>
                      <span class="uk-form-icon" uk-icon="icon: user"></span>
                    </div>

                    <div class="uk-width-1-2@m uk-inline">
                      <input id="second_name" class="uk-input uk-form-large" name="second_name" v-model="second_name"
                        required @invalid="invalidateForm" placeholder="Second Name" type="text" />
                      <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label>
                      <span class="error-message uk-text-small">Second name is mandatory</span>
                      <span class="uk-form-icon" uk-icon="icon: user"></span>
                    </div>

                    <div class="uk-width-1-1 uk-inline">
                      <input id="email_a" class="uk-input uk-form-large" name="email_a" v-model="email_a" required
                        @invalid="validEmail" placeholder="Email Address" type="text" />
                      <label class="uk-form-label" for="email_a">Email Address<sup>*</sup></label>
                      <span class="error-message uk-text-small">Email address is mandatory</span>
                      <span class="uk-form-icon" uk-icon="icon: mail"></span>
                    </div>

                    <div class="uk-width-1-1 uk-inline">
                      <input id="phone_n" name="phone_n" class="uk-input uk-form-large" @invalid="invalidateForm"
                        v-model="phone_n" placeholder="Phone Number" type="text" />
                      <label class="uk-form-label" for="phone_n">Phone Number<sup>*</sup></label>
                      <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                    </div>

                    <div class="uk-width-1-1 uk-inline">
                      <input id="company" class="uk-input uk-form-large" name="first_name" v-model="company" required
                        @invalid="invalidateForm" placeholder="Registered Company / Organisation" type="text" />
                      <label class="uk-form-label" for="company">Registered Company / Organisation<sup>*</sup></label>
                      <span class="error-message uk-text-small">Registered Company / Organisation is mandatory</span>
                      <span class="uk-form-icon" uk-icon="icon: world"></span>
                    </div>

                    <div class="uk-width-1-1 uk-inline">
                      <input id="location" class="uk-input uk-form-large" name="first_name" v-model="location" required
                        @invalid="invalidateForm" placeholder="Location address" type="text" />
                      <label class="uk-form-label" for="location">Location address<sup>*</sup></label>
                      <span class="error-message uk-text-small">Location address is mandatory</span>
                      <span class="uk-form-icon" uk-icon="icon: location"></span>
                    </div>


                    <div class="uk-inline uk-width-1-1">
                      <button
                        class="uk-button uk-button-default uk-button-large form-select-large uk-width-1-1 uk-text-left uk-border-rounded"
                        type="button" :class="{ 'drop-active': drophover }"><span class="uk-form-icon"
                          uk-icon="icon: settings"></span>
                        <span uk-icon="icon: chevron-down"
                          class="chevron-down uk-flex uk-flex-middle uk-position-right uk-position-small"></span>
                        <span v-if="targetSelect.length < 1" class="uk-h4"> Industry</span> <span v-else class="uk-h4">
                          {{ targetSelect }} </span>
                      </button>
                      <div id="formSelect" class="formSelect uk-width-1-1" uk-drop="offset:0"
                        @mouseover="drophover = true" @mouseleave="drophover = false">
                        <div class="uk-card uk-card-body uk-card-default uk-margin-small-right">
                          <ul class="uk-width-1-1 uk-list uk-list-collapse" @click="handleClicks($event)">
                            <li v-for="(s, index) in industry" :class="{ 'active': activeIndex === index }" :key="s.id"
                              @click="setActive(index)">
                              {{ s.title }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="uk-width-1-1 uk-inline message-textarea">
                      <textarea rows="4" class="uk-textarea" name="message" type="text" v-model="message"
                        placeholder="Message"></textarea>
                      <label class="uk-form-label" for="message">Message</label>
                      <span class="uk-form-icon" uk-icon="icon: commenting"></span>
                    </div>

                    <div class="uk-width-1-1">
                      <p class="uk-text-meta uk-margin-small-top">
                        Your personal information will be collected, used and stored in strict accordance with our
                        <a class="uk-text-primary" href="/privacy-policy" target="_blank">Privacy Policy</a>. Our
                        Privacy Policy
                        contains details on how information is used, how you may access / correct information held and
                        our privacy
                        complaints processes.
                      </p>
                    </div>
                  </fieldset>
                </form>

                <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2" uk-grid>
                  <div class="uk-margin-auto-left">
                    <button class="uk-button uk-width-1-1 uk-button-primary" @click="checkForm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="uk-width-1-1 uk-inline">
              <div
                class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
                v-show="isSending">
                <div class="uk-position-center uk-text-center">
                  <div uk-spinner="ratio: 2"></div>
                  <p>Sending...</p>
                </div>
              </div>

              <div
                class="uk-overlay form-overlay-default uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index"
                v-show="isSent">
                <div class="uk-position-center uk-text-center form-confirmation">
                  <strong>Hi {{ first_name }}</strong>
                  <div>
                    Thank you for your enquiry. One of our staff members will be in touch shortly.
                  </div>
                </div>
              </div>

              <div class="uk-padding-small">
                <div>
                  <button class="uk-button uk-button-link uk-link-reset" uk-switcher-item="0">
                    <span uk-icon="chevron-left"></span> Back
                  </button>
                  <div class="uk-text-secondary uk-text-bold uk-float-right">Confirm & Send</div>
                </div>

                <ul class="uk-list uk-list-divider uk-padding-small">
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
                    <div class="uk-float-right uk-text-bold">{{ email_a }}</div>
                  </li>
                  <li v-if="phone_n">
                    Phone Number:
                    <div class="uk-float-right uk-text-bold">{{ phone_n }}</div>
                  </li>
                  <li v-if="message">
                    <div>Message:</div>
                    <div>{{ message }}</div>
                  </li>
                </ul>

                <div class="uk-grid-small uk-margin-small-top uk-margin-medium-bottom" uk-grid>
                  <div class="uk-margin-auto">
                    <button class="uk-button uk-button-large border-radius-50 uk-width-1-1 uk-button-primary"
                      @click="submitForm">
                      Send Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div id="my-id">


        <div class="uk-margin--top hours-tab" data-uk-sticky="bottom: #my-id; media: 960">

          <div class="uk-text-center uk-margin-medium-top">
            <div class="uk-h1 uk-text-bold uk-margin-medium-bottom">Our Trading Hours</div>
          </div>

          <HeaderHours :activeTab="activeHoursTab" switchId="contact-form" />
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import axios from "axios";
import HeaderHours from "@/components/page-elements/HeaderHours";
import counter from "@/components/page-elements/counter";
export default {
  name: "FleetForm",
  props: ["activeHoursTab"],
  data: function () {
    return {
      //errors:[],
      errors: false,
      first_name: "",
      second_name: "",
      email_a: "",
      phone_n: "",
      company: "",
      location: "",
      message: "",
      isSending: false,
      isSent: false,
      siteName: this.$store.state.site.name,
      vehicleNames: [],
      resultCounterChild: null,
      targetSelect: "",
      drophover: false,
      activeIndex: 0,
      industry: [
        { title: 'Agriculture, Forestry and Fishing' },
        { title: 'Mining' },
        { title: 'Manufacturing' },
        { title: 'Electricity, Gas, Water and Waste Services' },
        { title: 'Mining' },
        { title: 'Construction' },
        { title: 'Wholesale Trade' },
        { title: 'Retail Trade' },
        { title: 'Accommodation and Food Services' },
        { title: 'Transport, Postal and Warehousing' },
        { title: 'Information Media and Telecommunications' },
        { title: 'Financial and Insurance Services' },
        { title: 'Rental, Hiring and Real Estate Services' },
        { title: 'Professional, scientific and technical services' },
        { title: 'Administrative and Support Services (private)' },
        { title: 'Public Administration and Safety (Government)' },
        { title: 'Education and Training' },
        { title: 'Health Care and Social Assistance' },
        { title: 'Arts and Recreation Services' },
        { title: 'Other Services (e.g. Repair and Maintenance; Personal and Other Services)' },
      ]
    };
  },
  components: {
    HeaderHours,
    counter
  },
  mounted() {
    const currentPage = this.$route.name === "page" ? this.$route.params.slug : this.$route.name;
    if (currentPage === "fleet") {
      window.digitaldata = {
        page: {
          pageName: "dealer:fleet:request:thank you",
          siteSection: "fleet",
          hierarchy: "finance",
          userLanguage: "eng",
          pageNameNoVehicle: "dealer:fleet:request:thank you",
          tool: "lead submitted",
          tooldescriptor: "fleet",
          radUIVersion: "pc",
        },
        user: {
          fdafCode: " ",
        },
        event: {
          action: "lead submitted|updates opt-in|tools",
        },
      };
    };
    //this.loadMapBox()

  },
  methods: {
    //  loadMapBox(){
    //    var scripts = [
    //      "https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js",
    //      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"
    //    ];
    //    scripts.forEach((script) => {
    //      let tag = document.createElement("script");
    //      tag.setAttribute("src", script);
    //      document.body.appendChild(tag);
    //    });
    //
    //    var styles = [
    //      "https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css",
    //      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.css"
    //
    //    ];
    //    styles.forEach((styles) => {
    //      let tag = document.createElement("link");
    //      tag.rel='stylesheet';
    //      tag.setAttribute("href", styles);
    //      document.body.appendChild(tag);
    //    });
    //
    //
    //    setTimeout(() => {
    //      	mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bDAwOCIsImEiOiJPbzFWOHFrIn0.c4xv1WR-odsow8dtxkm7xw';
    //      const map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/dark-v10',
    //     center: [144.782642, -37.7712244],
    //     zoom: 13
    // });
    //
    // // Add the control to the map.
    // const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     zoom: 14,
    //     placeholder: 'Location address / Buisiness name',
    //     mapboxgl: mapboxgl
    // });
    //
    // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    //    }, 1000);
    //  },
    handleClicks: function (click) {
      if (click.target.tagName == "LI") { //Check if clicked element is a <li>
        let value = click.target.innerHTML //Get li's html
        // click.target.classList.add("uk-active");
        this.targetSelect = value;
        this.UIkit.drop('.formSelect').hide(0);
      }
    },
    setActive: function (index) {
      this.activeIndex = index;
    },
    checkForm: function (e) {
      (this.errors = []),
        this.first_name || this.errors.push("Fist Name required."),
        this.second_name || this.errors.push("Second Name required."),
        this.email_a ?
          this.validEmail(this.email_a) || this.errors.push("Valid email required.") :
          this.errors.push("Email required."),
        this.errors.length || this.UIkit.switcher("#sel_form").show("1"),
        this.first_name && this.second_name && this.email_a,
        e.preventDefault();
    },

    validEmail: function (email_a) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email_a);
    },
    invalidateForm() {
      this.errors = true;
    },
    submitForm: function (e) {
      _satellite.track("contact-thankyou");
      this.isSending = !this.isSending;
      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
          payload: {
            input_1: this.first_name + " " + this.second_name,
            input_2: this.phone_n,
            input_3: this.email_a,
            input_4: this.message,
            input_27: this.second_name,
            input_29: this.targetSelect,
            input_28: this.$route.params.slug.replace(/\-/g, " ").replace(/(^\w|\s\w)/g, (c) => c.toUpperCase()),
          },
          formid: this.$store.state.site.forms.contact,
        })
        .then((response) => {
          this.isSending = false;
          this.isSent = true;

          window.dataLayer?.push({
            event: "FormSub Fleet",
            formName: "Fleet Form",
            formStatus: "submitted",
            firstName: this.first_name,
            secondName: this.second_name,
            email: this.email_a,
            phone: this.phone_n,
            message: this.message,
          });

        })
        .catch((error) => {
          //this.response = 'Error: ' + error.response.status
          console.log(error);
        });
    },
    close() {
      this.UIkit.modal("#fleet-models").hide();
    },
  },
  watch: {
    phone_n() {
      this.phone_n = this.phone_n
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
  },
  computed: {
    vehicles() {
      return this.$store.state.models;
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
            form: item.form
          });
        });
        return makes;
      }
    },
    selectedModels: function () {
      if (this.vehicleNames.length) {
        return this.vehicles.filter((vehicles) =>
          this.vehicleNames.includes(vehicles.slug)
        );
      } else {
        return [];
      }
    },

  },
};
</script>
<style scoped>
.overflow-vissible {
  overflow: visible;
}

.hours-tab {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  z-index: 1;
}

.hours-tab.uk-active {
  padding-bottom: 80px;
}

.trading-title {
  display: none;
}

.fleet-select label {
  cursor: pointer;
}

.check-title {
  padding-top: 10px;
}

.uk-radio:checked:focus,
.uk-checkbox:checked:focus,
.uk-checkbox:indeterminate:focus {
  background-color: transparent;
}

.fleet-select input.uk-checkbox {
  border: none;
  background-color: transparent;
}

.fleet-select input.uk-checkbox {
  padding: 15px
}

.fleet-select .uk-checkbox {
  top: 10px
}

.form-select-large {
  line-height: 33px;
  padding: 10px 40px;
}

.formSelect li {
  padding: 10px;
  position: relative;
  cursor: pointer;
}

.drop-active,
.form-select-large:hover {
  border: 1px solid #000;
}

.formSelect li:hover {
  background: rgba(227, 229, 230, .498);
  border-radius: 4px;
}

.chevron-down {
  -webkit-transition: all .55s ease-out;
  transition: all .55s ease-out;
}

.drop-active .chevron-down,
.form-select-large:hover .chevron-down {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.formSelect li.active {
  color: #000;
  font-weight: 700
}

.formSelect li.active:after {
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
  height: 1rem;
  padding: 0;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
  width: .5rem;
  position: absolute;
  top: .75rem;
  left: -15px;
  content: " ";
  display: block;
}
</style>
