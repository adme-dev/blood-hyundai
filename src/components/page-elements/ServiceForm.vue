<template>
  <div class="service-form  uk-margin-large-bottom uk-padding-small">
    <div class="uk-text-center uk-margin-medium-top">
      <div class="uk-h1 uk-margin-remove">BOOK YOUR SERVICE</div>
      <div class="uk-h2 uk-margin-remove">BELOW</div>
    </div>

    <div>
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
                <div class="uk-text-secondary uk-text-bold uk-float-left">Your Details</div>
              </div>

              <form novalidate="true" :class="this.errors ? 'errors' : false">
                <div v-if="errors" class="error-message">
                  <div>Please correct the following error(s):</div>
                  <ul class="uk-list uk-list-hyphen uk-hidden">
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                  </ul>
                </div>

                <fieldset class="uk-fieldset uk-grid-small uk-grid">
                  <div class="uk-width-1-1 uk-text-center">
                    <p class="uk-heading-line uk-padding uk-padding-remove-bottom">
                      <span class="uk-h3">Your Details</span>
                    </p>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="first_name" class="uk-input uk-form-large" name="first_name" v-model="first_name"
                      required @invalid="invalidateForm" placeholder="First Name" type="text" />
                    <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label>
                    <span class="error-message uk-text-small">First name required</span>
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="second_name" class="uk-input uk-form-large" name="second_name" v-model="second_name"
                      required @invalid="invalidateForm" placeholder="Second Name" type="text" />
                    <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label>
                    <span class="error-message uk-text-small">Second name required</span>
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="email_a" class="uk-input uk-form-large" name="email_a" v-model="email_a" required
                      @invalid="validEmail" placeholder="Email Address" type="text" />
                    <label class="uk-form-label" for="email_a">Email Address<sup>*</sup></label>
                    <span class="error-message uk-text-small">Email address required</span>
                    <span class="uk-form-icon" uk-icon="icon: mail"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="phone_n" name="phone_n" class="uk-input uk-form-large" @invalid="invalidateForm"
                      v-model="phone_n" placeholder="Phone Number" type="text" />
                    <label class="uk-form-label" for="phone_n">Phone Number<sup>*</sup></label>
                    <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                  </div>

                  <div class="uk-width-1-1 uk-text-center">
                    <p class="uk-heading-line uk-padding uk-padding-remove-bottom">
                      <span class="uk-h3">Vehicle Details</span>
                    </p>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="vehicle_make" class="uk-input uk-form-large" name="vehicle_make" v-model="vehicle_make"
                      required @invalid="invalidateForm" placeholder="Vehicle Make" type="text" />
                    <label class="uk-form-label" for="vehicle_make">Vehicle Make<sup>*</sup></label>
                    <span class="error-message uk-text-small">Vehicle Make required</span>
                    <span class="uk-form-icon" uk-icon="icon: file-edit"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="vehicle_model" class="uk-input uk-form-large" name="vehicle_model"
                      v-model="vehicle_model" required @invalid="invalidateForm" placeholder="Vehicle Model"
                      type="text" />
                    <label class="uk-form-label" for="vehicle_model">Vehicle Model<sup>*</sup></label>
                    <span class="error-message uk-text-small">Vehicle Model required</span>
                    <span class="uk-form-icon" uk-icon="icon: file-edit"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="vehicle_reg" class="uk-input uk-form-large" name="vehicle_reg" v-model="vehicle_reg"
                      required @invalid="invalidateForm" placeholder="Vehicle Registration" type="text" />
                    <label class="uk-form-label" for="vehicle_reg">Vehicle Registration<sup>*</sup></label>
                    <span class="error-message uk-text-small">Vehicle Registration required</span>
                    <span class="uk-form-icon" uk-icon="icon: file-edit"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="vehicle_year" class="uk-input uk-form-large" name="vehicle_year" v-model="vehicle_year"
                      required @invalid="invalidateForm" placeholder="Vehicle Year" type="text" />
                    <label class="uk-form-label" for="vehicle_year">Vehicle Year<sup>*</sup></label>
                    <span class="error-message uk-text-small">Vehicle Year required</span>
                    <span class="uk-form-icon" uk-icon="icon: file-edit"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="vehicle_vin" class="uk-input uk-form-large" name="vehicle_vin" v-model="vehicle_vin"
                      placeholder="VIN/Chassis #" type="text" />
                    <label class="uk-form-label" for="vehicle_vin">VIN/Chassis #<sup>*</sup></label>
                    <span class="error-message uk-text-small">Vehicle Odometer required</span>
                    <span class="uk-form-icon" uk-icon="icon: file-edit"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <input id="vehicle_odometer" class="uk-input uk-form-large" name="vehicle_odometer"
                      v-model="vehicle_odometer" required @invalid="invalidateForm" placeholder="Vehicle Odometer"
                      type="text" />
                    <label class="uk-form-label" for="vehicle_odometer">Vehicle Odometer<sup>*</sup></label>
                    <span class="error-message uk-text-small">Vehicle Odometer required</span>
                    <span class="uk-form-icon" uk-icon="icon: file-edit"></span>
                  </div>

                  <div class="uk-width-1-1 uk-text-center">
                    <p class="uk-heading-line uk-padding uk-padding-remove-bottom">
                      <span class="uk-h3">Preferred Booking Date/Time</span>
                    </p>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <Datetime type="datetime" v-model="drop_off_date" input-id="drop_off_date"
                      input-class="uk-input uk-form-large" placeholder="Preferred Drop Off Date:"
                      :zone="$store.state.site.timezone" :value-zone="$store.state.site.timezone"
                      :phrases="{ ok: 'Continue', cancel: 'Exit' }" :hour-step="1" :minute-step="15" use12-hour
                      :minDatetime="minStartDate" :disabled-days="[6, 7]">
                      <label for="drop_off_date" class="uk-form-label" slot="after">Preferred Drop Off
                        Date:<sup>*</sup></label>
                    </Datetime>
                    <span class="uk-form-icon" uk-icon="icon: calendar"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline uk-hidden">
                    <select name="input_47" id="input_6_47" class="uk-form-large uk-select" aria-invalid="false">
                      <option value="">Select Time</option>
                      <option value="7:30 am">7:30 am</option>
                      <option value="8:00 am">8:00 am</option>
                      <option value="8:30 am">8:30 am</option>
                      <option value="9:00 am">9:00 am</option>
                      <option value="9:30 am">9:30 am</option>
                      <option value="10:00 am">10:00 am</option>
                      <option value="10:30 am">10:30 am</option>
                      <option value="11:00 am">11:00 am</option>
                      <option value="11:30 am">11:30 am</option>
                      <option value="12:00 pm">12:00 pm</option>
                      <option value="12:30 pm">12:30 pm</option>
                      <option value="1:00 pm">1:00 pm</option>
                      <option value="1:30 pm">1:30 pm</option>
                      <option value="2:00 pm">2:00 pm</option>
                      <option value="2:30 pm">2:30 pm</option>
                      <option value="3:00 pm">3:00 pm</option>
                      <option value="3:30 pm">3:30 pm</option>
                      <option value="4:00 pm">4:00 pm</option>
                      <option value="4:30 pm">4:30 pm</option>
                      <option value="5:00 pm">5:00 pm</option>
                    </select>
                    <span class="uk-form-icon" uk-icon="icon: clock"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline">
                    <Datetime type="datetime" v-model="drop_pick_up_date" input-id="drop_pick_up_date"
                      input-class="uk-input uk-form-large" placeholder="Preferred Pick Up Date:"
                      :minDatetime="minStartDate" :zone="$store.state.site.timezone"
                      :value-zone="$store.state.site.timezone" :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                      :hour-step="1" :minute-step="15" use12-hour :disabled-days="[6, 7]">
                      <label for="drop_pick_up_date" class="uk-form-label" slot="after">Preferred Pick Up
                        Date:<sup>*</sup></label>
                    </Datetime>
                    <span class="uk-form-icon" uk-icon="icon: calendar"></span>
                  </div>

                  <div class="uk-width-1-2@m uk-inline uk-hidden">
                    <select name="input_48" id="input_6_48" class="uk-form-large uk-select" aria-invalid="false">
                      <option value="">Selct Time</option>
                      <option value="7:30 am">7:30 am</option>
                      <option value="8:00 am">8:00 am</option>
                      <option value="8:30 am">8:30 am</option>
                      <option value="9:00 am">9:00 am</option>
                      <option value="9:30 am">9:30 am</option>
                      <option value="10:00 am">10:00 am</option>
                      <option value="10:30 am">10:30 am</option>
                      <option value="11:00 am">11:00 am</option>
                      <option value="11:30 am">11:30 am</option>
                      <option value="12:00 pm">12:00 pm</option>
                      <option value="12:30 pm">12:30 pm</option>
                      <option value="1:00 pm">1:00 pm</option>
                      <option value="1:30 pm">1:30 pm</option>
                      <option value="2:00 pm">2:00 pm</option>
                      <option value="2:30 pm">2:30 pm</option>
                      <option value="3:00 pm">3:00 pm</option>
                      <option value="3:30 pm">3:30 pm</option>
                      <option value="4:00 pm">4:00 pm</option>
                      <option value="4:30 pm">4:30 pm</option>
                      <option value="5:00 pm">5:00 pm</option>
                    </select>
                    <span class="uk-form-icon" uk-icon="icon: clock"></span>
                  </div>

                  <div class="uk-width-1-1 uk-text-center">
                    <p class="uk-heading-line uk-padding uk-padding-remove-bottom">
                      <span class="uk-h3">Additional information</span>
                    </p>
                  </div>

                  <div class="uk-width-1-1">
                    <label class="uk-flex uk-flex-middle uk-text-small"><input class="uk-checkbox" type="checkbox"
                        true-value="Booking in for Scheduled
                      Service" v-model="input_24_1" />
                      Booking in for Scheduled Service</label>
                  </div>

                  <div class="uk-width-1-1 uk-hidden">
                    <label class="uk-flex uk-flex-middle uk-text-small"><input class="uk-checkbox" type="checkbox"
                        true-value="Express Servicing" v-model="input_24_2" /> Express
                      Servicing Please (1.5 – 2.0hrs), this service is dependent on the time required for the service
                      due, we will
                      let you know 😊.</label>
                  </div>

                  <div class="uk-width-1-1 uk-hidden">
                    <label class="uk-flex uk-flex-middle uk-text-small"><input class="uk-checkbox" type="checkbox"
                        true-value="Free Wash & Wax" v-model="input_24_3" /> Free Wash &
                      Wax Please.</label>
                  </div>

                  <div class="uk-width-1-1">
                    <label class="uk-flex uk-flex-middle uk-text-small"><input class="uk-checkbox" type="checkbox"
                        :true-value="`My vehicle has been serviced by ${{ siteName }} in the past`"
                        v-model="input_24_4" />
                      My vehicle has been serviced by {{ siteName }} in the past.</label>
                  </div>

                  <div class="uk-width-1-1">
                    <label class="uk-flex uk-flex-middle uk-text-small">
                      <input class="uk-checkbox" type="checkbox" true-value="Booking In For Other Repairs."
                        v-model="input_24_5" />
                      Booking In For Other Repairs.
                    </label>
                  </div>

                  <div class="uk-width-1-1 uk-text-center">
                    <p class="uk-heading-line uk-padding uk-padding-remove-bottom">
                      <span class="uk-h3">Service & Repair Requests</span>
                    </p>
                  </div>

                  <div class="uk-width-1-1 uk-inline message-textarea">
                    <textarea rows="4" class="uk-textarea" name="message" type="text" v-model="message"
                      placeholder="Service & Repair Requests"></textarea>
                    <label class="uk-form-label" for="message">Service & Repair Requests</label>
                    <span class="uk-form-icon" uk-icon="icon: commenting"></span>
                  </div>

                  <div class="uk-width-1-1">
                    <p class="uk-text-meta uk-margin-small-top">
                      Your personal information will be collected, used and stored in strict accordance with our
                      <a class="uk-text-primary" href="/privacy-policy">Privacy Policy</a>. Our Privacy Policy contains
                      details on
                      how information is used, how you may access / correct information held and our privacy complaints
                      processes.
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
  </div>
</template>
<script>
import { DateTime as LuxonDateTime } from 'luxon'
import axios from "axios";
export default {
  name: "ServiceForm",
  // components: {
  //   datetime: Datetime,
  // },
  data: function () {
    return {
      siteName: this.$store.state.site.name,
      errors: false,
      first_name: "",
      second_name: "",
      email_a: "",
      phone_n: "",
      message: "",
      vehicle_make: "",
      vehicle_model: "",
      vehicle_reg: "",
      vehicle_year: "",
      vehicle_vin: "",
      vehicle_odometer: "",
      drop_off_date: "",
      drop_pick_up_date: "",
      isSending: false,
      isSent: false,
      confirmationMessage: "",
      input_24_1: "",
      input_24_2: "",
      input_24_3: "",
      input_24_4: "",
      input_24_5: "",
    };
  },
  computed: {
    minStartDate() {
      return LuxonDateTime.local().plus({ days: 1 }).toISO()
    }
  },
  methods: {
    checkForm: function (e) {
      (this.errors = []),
        this.first_name || this.errors.push("Fist Name required."),
        this.second_name || this.errors.push("Second Name required."),
        this.email_a
          ? this.validEmail(this.email_a) || this.errors.push("Valid email required.")
          : this.errors.push("Email required."),
        this.errors.length || this.UIkit.switcher("#sel_form").show("1"),
        this.first_name && this.second_name && this.email_a,
        e.preventDefault();
      const scrollToEl = document.querySelectorAll(".service-form")[0];
      scrollToEl.scrollIntoView({ behavior: "smooth" });
    },

    validEmail: function (email_a) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email_a);
    },
    invalidateForm() {
      this.errors = true;
    },
    submitForm: function (e) {
      this.isSending = !this.isSending;

      const dropOffDateTime = new Date(this.drop_off_date);
      const pickUpDateTime = new Date(this.drop_pick_up_date);
      const formatedDropOffDateTime = dropOffDateTime.toLocaleTimeString([], {
        hour12: true,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const formatedPickUpDateTime = pickUpDateTime.toLocaleTimeString([], {
        hour12: true,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
          payload: {
            input_2: this.first_name,
            input_21: this.second_name,
            input_3: this.phone_n,
            input_6: this.email_a,
            input_17: this.message,
            input_10: this.vehicle_make,
            input_11: this.vehicle_model,
            input_13: this.vehicle_reg,
            input_38: this.vehicle_year,
            input_40: this.vehicle_vin,
            input_39: this.vehicle_odometer,
            input_42: formatedDropOffDateTime,
            input_49: formatedPickUpDateTime,
            input_24_1: this.input_24_1,
            input_24_2: this.input_24_2,
            input_24_3: this.input_24_3,
            input_24_4: this.input_24_4,
            input_24_5: this.input_24_5,
          },
          formid: this.$store.state.site.forms.service,
        })
        .then((response) => {
          if (response.data.is_valid) {
            this.confirmationMessage = response.data.confirmation_message;
            this.isSending = false;
            this.isSent = true;

            window.dataLayer?.push({
              event: "FormSub Service",
              formName: "Service Form",
              formStatus: "submitted",
              firstName: this.first_name,
              secondName: this.second_name,
              email: this.email_a,
              phone: this.phone_n,
              message: this.message,
            });

          } else {
            this.isSending = false;
            this.isSent = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
};
</script>
