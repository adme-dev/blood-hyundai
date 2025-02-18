<template>
  <div>
    <div v-if="variant" class="uk-animation-fade">
      <div class="variant-bg" style="position: relative; z-index: 0">
        <div class="uk-container uk-container-expand uk-padding-remove uk-position-relative">
          <div class="uk-grid-collapse" uk-grid>
            <div class="switcher-colour-hero-wrap uk-width-1-1 uk-flex uk-flex-middle uk-flex-center">
              <div class="uk-width-1-2@m uk-position-top-left uk-padding-small">
                <div class="uk-h4 uk-margin-remove-bottom">{{ variant.model }}</div>
                <h1 class="uk-h3 uk-text-bold uk-margin-remove">{{ variant.title.rendered }}</h1>
                <div>{{ variant.segment }}</div>
                <div>{{ variant.short_desc }}</div>
              </div>

              <div class="uk-width-1-1 uk-grid-collapse" uk-grid>
                <div class="uk-flex uk-flex-middle uk-flex-center uk-width-expand@l">
                  <ul class="uk-switcher switcher-colour switcher-colour-hero">
                    <li v-for="colours in variant.colours.images" :key="colours.id">
                      <img :data-src="'' + colours.images + ''" class="uk-width-1-1" data-uk-img />
                      <div class="uk-width-1-2@m uk-position-bottom-left uk-position-medium uk-margin-large-bottom">
                        <div class="uk-text-left text-colour uk-text-meta uk-text-uppercase">
                          COLOUR: {{ colours.colour_name }}
                        </div>
                        <div class="uk-text-meta-xs">
                          The images shown here are for illustrative purposes only, and may differ from the standard
                          specifications per type. No rights can be derived from the photos. Toyota reserves the right to change
                          models, colors and equipment without prior notice and without obligation to change the cars already in
                          the market.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="uk-width-large"></div>
              </div>
            </div>

            <div class="uk-width-expand@l control-panel uk-inline" :data-id="variant.id" :data-model="variant.model"></div>

            <div class="uk-width-auto@l uk-background-default">
              <div id="enquire-header" class="uk-flex uk-flex-middle contact-form variant-form uk-height-1-1 uk-padding-small">
                <div>
                  <div class="uk-width-1-1">
                    <div>
                      <div>
                        <h3 class="uk-h1 uk-margin-remove uk-text-bold">{{ variant.model }} {{ variant.grade_id }}</h3>
                        <div class="uk-text-meta">{{ variant.title.rendered }}</div>
                        <div v-if="variant.drive_away" class="uk-margin-small-top">
                          <div class="uk-text-small uk-text-bold uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup></div>
                          <div class="uk-h1 text-blue uk-text-bold uk-margin-remove">
                            ${{ variant.drive_away.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="variant.offer" class="offer-box">
                      <div class="uk-text-bold stag uk-text-left text-blue">Special offer</div>
                      <div class="text-blue uk-text-small uk-text-light uk-text-left" v-html="variant.offer"></div>
                      <div class="offer-end"></div>
                    </div>
                    <div v-else class="offer-box">
                      <div class="uk-text-small uk-text-light uk-text-left uk-margin-small-top">
                        There are currently no Bonus Offers available for
                        {{ variant.title.rendered }}. Please contact us to discuss your options.
                      </div>
                    </div>
                  </div>

                  <ul
                    id="sel_form"
                    class="uk-hidden"
                    uk-switcher="connect: .switcher-main; animation: uk-animation-fade, uk-animation-fade"
                  >
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                  </ul>

                  <ul class="uk-switcher switcher-main">
                    <li>
                      <div class="uk-margin-small-top uk-position-relative uk-position-z-index">
                        <p uk-margin>
                          <button
                            v-if="variant.seats"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default"
                          >
                            <span class="uk-float-left">SEATS:</span><span class="uk-float-right">{{ variant.seats }}</span>
                          </button>
                          <button class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">DRIVE:</span><span class="uk-float-right">{{ variant.drive_train }}</span>
                          </button>
                          <button
                            v-if="variant.fuel"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default"
                          >
                            <span class="uk-float-left">FUEL:</span><span class="uk-float-right">{{ variant.fuel }}</span>
                          </button>
                          <button class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">ENGINE:</span><span class="uk-float-right">{{ variant.engine }}</span>
                          </button>
                          <button class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">TRANSMISSION:</span
                            ><span class="uk-float-right">{{ variant.transmission }}</span>
                          </button>
                        </p>

                        <div class="uk-margin-medium-top" v-if="variantList">
                          <div class="uk-h3 uk-text-bold">Choose your {{ variant.model }}</div>

                          <ul id="select-range" class="uk-margin-remove-bottom" data-uk-accordion>
                            <li class="box-shadow-top variant-select">
                              <a class="uk-accordion-title uk-card uk-padding-small" href="#">
                                <span uk-icon="check" class="uk-position-top-left uk-margin-small-top uk-icon-button"></span>
                                <div class="uk-h5 uk-margin-remove">
                                  <div class="uk-grid-collapse selected_variant uk-grid">
                                    <div class="uk-width-auto">
                                      <ul class="uk-switcher switcher-colour">
                                        <li v-for="colours in variant.colours.images" :key="colours.id">
                                          <img
                                            :data-src="'' + colours.images + ''"
                                            class="uk-width-small hero-variant-select"
                                            data-uk-img
                                          />
                                        </li>
                                      </ul>
                                    </div>
                                    <div class="uk-width-expand uk-flex uk-flex-middle uk-flex-center">
                                      <div class="uk-text-small">{{ variant.title.rendered }}</div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                              <div class="uk-accordion-content">
                                <div v-for="(model, index) in groupedmodels" :key="index">
                                  <div class="uk-margin-small-left">
                                    <div class="uk-h3 uk-text-bold uk-margin-small-top uk-margin-remove-bottom">
                                      {{ index }}
                                    </div>
                                    <div v-html="model[0]['short_desc']"></div>
                                    <hr class="uk-margin-remove" />
                                  </div>
                                  <ul class="uk-list uk-margin-remove">
                                    <li v-for="(cat, index) in model" :key="index">
                                      <router-link :to="'/variant/' + cat.slug + ''" class="uk-link-reset">
                                        <div
                                          class="uk-grid-collapse selected_variant uk-grid"
                                          v-bind:class="{
                                            'uk-text-bold uk-background-muted uk-text-emphasis': selectedVariant(cat.id),
                                          }"
                                        >
                                          <div class="uk-width-auto">
                                            <img
                                              :data-src="'' + cat.image + ''"
                                              class="uk-padding-small uk-width-small"
                                              data-uk-img
                                            />
                                          </div>
                                          <div class="uk-width-expand uk-flex uk-flex-middle uk-flex-center">
                                            <div class="uk-text-small uk-text-light">
                                              {{ cat.title }}
                                            </div>
                                          </div>
                                        </div>
                                      </router-link>
                                    </li>
                                  </ul>
                                </div>

                                <!-- <ul class="uk-list">
                          <li v-for="(variant_item, index) in variantList"
                          :key="index">
                          <router-link :to="'/variant/'+variant_item.slug+''" class="uk-link-reset">

                           <div class="uk-grid-collapse selected_variant uk-grid" v-bind:class="{'uk-background-muted': selectedVariant(variant_item.id)}">
                            <div class="uk-width-auto">
                             <img :data-src="'' + variant_item.vehicle_image[0] + ''" class="uk-width-small" data-uk-img>
                            </div>
                           <div class="uk-width-expand uk-flex uk-flex-middle uk-flex-center">
                            <div class="uk-text-small uk-text-bold">{{variant_item.title.rendered}}</div>
                           </div>
                          </div>

                          </router-link>
                         </li>
                       </ul> -->
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div class="uk-h3 uk-text-bold">Choose your colour</div>

                        <ul class="uk-switcher uk-margin-small-bottom switcher-colour">
                          <li v-for="colours in variant.colours.images" :key="colours.id">
                            <div class="uk-text-left text-colour uk-text-uppercase">
                              COLOUR: {{ colours.colour_name }}
                              <span class="uk-text-secondary uk-text-bold" v-if="colours.paint_price > 0"
                                >+ ${{ colours.paint_price }}
                              </span>
                            </div>
                          </li>
                        </ul>

                        <ul
                          class="uk-grid-collapse uk-child-width-expand variant-colours-items uk-grid"
                          uk-switcher="connect: .switcher-colour"
                        >
                          <li v-for="(colours, index) in variant.colours.images" :key="index">
                            <a href="#"
                              ><div class="uk-border-circle" v-bind:style="{ 'background-color': colours.swatch_colour_ }"></div
                            ></a>
                          </li>
                        </ul>
                        <div class="uk-text-meta-xs">
                          The images shown here are for illustrative purposes only, and may differ from the standard
                          specifications per type. No rights can be derived from the photos. Toyota reserves the right to change
                          models, colors and equipment without prior notice and without obligation to change the cars already in
                          the market.
                        </div>

                        <div class="uk-h3 uk-text-bold">Key Features</div>
                        <div class="features" v-html="variant.features"></div>

                        <div class="uk-margin-small-top uk-grid-divider" uk-grid>
                          <button class="uk-button uk-button-link" uk-toggle="target: .specifications-usage">
                            <a href="#specifications" uk-scroll>See full specs</a>
                          </button>
                          <a href="#" class="uk-button uk-button-link" target="_blank">Download brochure</a>
                        </div>
                      </div>

                      <div>
                        <Accessories v-if="variant_accessories.length > 0" :accessories="variant_accessories"></Accessories>
                      </div>

                      <div class="uk-h3 uk-text-bold uk-text-center">Enquire on your {{ variant.model }}</div>

                      <div class="uk-grid-small uk-child-width-expand uk-margin-medium-bottom" uk-grid>
                        <div class="uk-margin-auto-left">
                          <a
                            href="#enquire-header"
                            class="uk-width-1-1 uk-button uk-button-primary uk-button-large tm-button-default bounce-bottom-small"
                            @click="getAccessoriesList()"
                            uk-scroll="offset: 20"
                            uk-switcher-item="next"
                            >Continue to enquire</a
                          >
                        </div>
                      </div>
                    </li>

                    <li>
                      <div>
                        <div v-if="accessories_items.length" class="uk-width-1-1 uk-margin-medium-top checkout">
                          <div class="uk-width-1-1">
                            <div>
                              <div class="uk-h3 uk-text-bold uk-float-left">Your accessories</div>
                              <span class="uk-float-right"
                                ><span uk-icon="icon: cart"></span
                                ><span class="uk-badge uk-margin-small-bottom uk-background-secondary">{{
                                  accessories_items.length
                                }}</span></span
                              >
                            </div>
                            <ul class="uk-list uk-list-divider uk-margin-remove">
                              <li v-for="(item, id) in accessories_items" :key="id" class="uk-visible-toggle">
                                <arttcle>
                                  <div class="uk-grid-small uk-text-left" uk-grid>
                                    <div class="uk-width-auto">
                                      <div
                                        class="uk-background-cover uk-margin-small-right cart-image"
                                        :style="{ backgroundImage: `url(${item.image})` }"
                                      >
                                        <canvas width="80px" height="60px"></canvas>
                                      </div>
                                    </div>
                                    <div class="uk-width-expand">
                                      <div class="uk-text-meta uk-text-secondary">
                                        {{ item.modal }}
                                      </div>
                                      <div v-html="item.title"></div>
                                      <div>
                                        <div class="uk-text-emphasis">
                                          <span class="uk-text-bold">{{ item.price | currency }}</span
                                          ><sup>A1</sup>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </arttcle>
                              </li>
                              <li class="text-blue uk-h4 uk-margin-remove-bottom">
                                Total: <b>{{ cashDividends | currency }}</b>
                              </li>
                            </ul>
                          </div>
                          <div class="uk-text-meta-xs">
                            <sup>A1</sup>There may be a delay to any pricing updates displaying correctly on our materials. Always
                            obtain confirmation on updated pricing from {{ siteName }}. All prices are subject to change at the
                            discretion of {{ siteName }}.
                          </div>
                        </div>

                        <div class="uk-text-left uk-margin-medium-top">
                          <div class="uk-h1 uk-margin-remove uk-text-bold">Enquire</div>
                          <div class="uk-h4 uk-text-normal uk-margin-remove-top">
                            Complete this form to send your enquiry to {{ siteName }}. Or call
                            <a class="text-blue" itemprop="telephone" :href="'tel:' + phone.replace(/[^A-Z0-9]+/gi, '')">{{
                              phone
                            }}</a>
                          </div>
                        </div>
                      </div>

                      <div class="uk-width-1-1 small-lead-form">
                        <div class="uk-margin-medium-top uk-text-left">
                          <div class="uk-h3 uk-text-secondary uk-text-bold uk-margin-small-bottom">Your Details</div>
                        </div>

                        <div>
                          <form novalidate="true" :class="this.errors ? 'errors' : false">
                            <div v-if="errors" class="error-message">
                              <div>Please correct the following error(s):</div>
                              <ul class="uk-list uk-list-hyphen uk-hidden">
                                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                              </ul>
                            </div>

                            <fieldset class="uk-fieldset uk-grid-small uk-grid">
                              <div class="uk-width-1-2@m uk-inline">
                                <input
                                  id="first_name"
                                  class="uk-input uk-form-large"
                                  name="first_name"
                                  v-model="first_name"
                                  required
                                  @invalid="invalidateForm"
                                  placeholder="First Name"
                                  type="text"
                                />
                                <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label>
                                <span class="error-message uk-text-small">First name required</span>
                                <span class="uk-form-icon" uk-icon="icon: user"></span>
                              </div>

                              <div class="uk-width-1-2@m uk-inline">
                                <input
                                  id="second_name"
                                  class="uk-input uk-form-large"
                                  name="second_name"
                                  v-model="second_name"
                                  required
                                  @invalid="invalidateForm"
                                  placeholder="Second Name"
                                  type="text"
                                />
                                <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label>
                                <span class="error-message uk-text-small">Second name required</span>
                                <span class="uk-form-icon" uk-icon="icon: user"></span>
                              </div>

                              <div class="uk-width-1-1 uk-inline">
                                <input
                                  id="email_a"
                                  class="uk-input uk-form-large"
                                  name="email_a"
                                  v-model="email_a"
                                  required
                                  @invalid="validEmail"
                                  placeholder="Email Address"
                                  type="text"
                                />
                                <label class="uk-form-label" for="email_a">Email Address<sup>*</sup></label>
                                <span class="error-message uk-text-small">Email address required</span>
                                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                              </div>

                              <div class="uk-width-1-1 uk-inline">
                                <input
                                  id="phone_n"
                                  name="phone_n"
                                  class="uk-input uk-form-large"
                                  @invalid="invalidateForm"
                                  v-model="phone_n"
                                  placeholder="Phone Number"
                                  type="text"
                                />
                                <label class="uk-form-label" for="phone_n">Phone Number<sup>*</sup></label>
                                <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                              </div>

                              <div class="uk-width-1-1 uk-inline message-textarea">
                                <textarea
                                  rows="4"
                                  class="uk-textarea"
                                  name="message"
                                  type="text"
                                  v-model="message"
                                  placeholder="Message"
                                ></textarea>
                                <label class="uk-form-label" for="message">Message</label>
                                <span class="uk-form-icon" uk-icon="icon: commenting"></span>
                              </div>

                              <div class="uk-width-1-1">
                                <div class="uk-margin-small-top uk-text-left">
                                  <div class="uk-h3 uk-text-secondary uk-text-bold">Additional information</div>
                                </div>

                                <div class="uk-padding-small uk-background-muted uk-border-rounded uk-text-emphasis">
                                  <div class="uk-width-1-1">
                                    <div class="uk-grid-small uk-child-width-auto uk-grid">
                                      <label class="uk-margin-auto-right">I would like to book a test drive.</label>
                                      <label
                                        ><input
                                          class="uk-radio"
                                          type="radio"
                                          name="test_drive"
                                          v-model="test_drive"
                                          value=""
                                          checked
                                        />
                                        No</label
                                      >
                                      <label
                                        ><input
                                          class="uk-radio"
                                          type="radio"
                                          name="test_drive"
                                          v-model="test_drive"
                                          value="Yes I would like to book a test drive"
                                        />
                                        Yes</label
                                      >
                                    </div>
                                  </div>

                                  <div class="uk-width-1-1">
                                    <div class="uk-grid-small uk-margin-small-top uk-child-width-auto uk-grid">
                                      <label class="uk-margin-auto-right">I have a vehicle to trade in.</label>
                                      <label
                                        ><input class="uk-radio" type="radio" name="tradein" v-model="tradein" value="" checked />
                                        No</label
                                      >
                                      <label
                                        ><input
                                          class="uk-radio"
                                          type="radio"
                                          name="tradein"
                                          v-model="tradein"
                                          value="Yes I have a vehicle to trade in"
                                        />
                                        Yes</label
                                      >
                                    </div>
                                  </div>

                                  <div class="uk-width-1-1">
                                    <div class="uk-grid-small uk-margin-small-top uk-child-width-auto uk-grid">
                                      <label class="uk-margin-auto-right">I'm interested in finance.</label>
                                      <label
                                        ><input class="uk-radio" type="radio" name="finance" v-model="finance" value="" checked />
                                        No</label
                                      >
                                      <label
                                        ><input
                                          class="uk-radio"
                                          type="radio"
                                          name="finance"
                                          v-model="finance"
                                          value="Yes I'm interested in finance."
                                        />
                                        Yes</label
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="uk-width-1-1">
                                <p class="uk-text-meta-xs uk-margin-small-top">
                                  Your personal information will be collected, used and stored in strict accordance with our
                                  <a class="uk-text-primary" href="/privacy-policy" target="_blank">Privacy Policy</a>. Our
                                  Privacy Policy contains details on how information is used, how you may access / correct
                                  information held and our privacy complaints processes.
                                </p>
                              </div>
                            </fieldset>
                          </form>

                          <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2" uk-grid>
                            <div>
                              <a
                                href="#enquire-header"
                                class="uk-button uk-width-1-1 uk-button-default tm-button-default"
                                uk-scroll
                                uk-switcher-item="previous"
                                >Previous</a
                              >
                            </div>
                            <div class="uk-margin-auto-left">
                              <button class="uk-button uk-width-1-1 uk-button-primary tm-button-default" @click="checkForm">
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div id="e-confirm" class="e-confirm uk-flex-top" uk-modal="bg-close:false">
                        <div class="uk-modal-dialog uk-margin-auto-vertical">
                          <h2 class="uk-modal-title uk-margin-small-left uk-padding-small">Confirm & Send</h2>

                          <div class="uk-width-1-1">
                            <div
                              class="
                                uk-overlay
                                form-overlay-default
                                uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index
                              "
                              v-show="isSending"
                            >
                              <div class="uk-position-center uk-text-center">
                                <div uk-spinner="ratio: 2"></div>
                                <p>Sending...</p>
                              </div>
                            </div>

                            <div
                              class="
                                uk-overlay
                                form-overlay-default
                                uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index
                              "
                              v-show="isSent"
                            >
                              <div class="uk-position-center uk-text-center form-confirmation">
                                <strong>Hi {{ first_name }}</strong>
                                <div>Thank you for your enquiry. One of our staff members will be in touch shortly.</div>
                              </div>
                            </div>

                            <div class="uk-padding-small">
                              <div>
                                <button
                                  class="uk-button uk-button-link uk-link-reset uk-modal-close-full"
                                  uk-switcher-item="1"
                                  @click="backForm"
                                >
                                  Close <span uk-icon="close"></span>
                                </button>
                              </div>

                              <div class="uk-grid uk-flex uk-flex-middle">
                                <div class="uk-width-expand uk-margin-small-left">
                                  <h3 class="uk-h1 uk-margin-remove uk-text-bold">{{ variant.model }} {{ variant.grade_id }}</h3>
                                  <div class="uk-text-meta">{{ variant.title.rendered }}</div>
                                  <div v-if="variant.retail" class="uk-margin-small-top">
                                    <div class="uk-text-small uk-text-bold uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup></div>
                                    <div class="uk-h3 uk-margin-remove uk-text-bold uk-text-emphasis">
                                      ${{ variant.retail.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                                    </div>
                                  </div>
                                </div>
                                <div class="uk-width-expand">
                                  <ul class="uk-switcher switcher-colour">
                                    <li v-for="colours in variant.colours.images" :key="colours.id">
                                      <img :data-src="'' + colours.images + ''" class="uk-width-expand" data-uk-img />
                                    </li>
                                  </ul>
                                </div>
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
                                <li v-if="test_drive">
                                  <span class="uk-float-left uk-margin-small-right" uk-icon="icon: check"></span>
                                  <div class="uk-text-bold">{{ test_drive }}</div>
                                </li>
                                <li v-if="tradein">
                                  <span class="uk-float-left uk-margin-small-right" uk-icon="icon: check"></span>
                                  <div class="uk-text-bold">{{ tradein }}</div>
                                </li>
                                <li v-if="finance">
                                  <span class="uk-float-left uk-margin-small-right" uk-icon="icon: check"></span>
                                  <div class="uk-text-bold">{{ finance }}</div>
                                </li>
                                <li v-if="message">
                                  <div>Message:</div>
                                  <div>{{ message }}</div>
                                </li>
                              </ul>

                              <hr />

                              <div class="uk-grid-small uk-margin-small-top" uk-grid>
                                <div class="uk-margin-auto">
                                  <button
                                    class="
                                      uk-width-1-1 uk-button uk-button-primary uk-button-large
                                      tm-button-default
                                      border-radius-50
                                    "
                                    @click="submitForm"
                                  >
                                    Send Enquiry
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-width-1-1 uk-background-default">
          <hr class="uk-margin-remove" />
          <div class="uk-width-1-1 uk-text-meta-xs uk-padding-small" v-html="variant.offer_disclaimer"></div>
        </div>
      </div>

      <div v-if="variant.specifications" class="uk-background-default">
        <div id="specifications" class="uk-container uk-container-large uk-background-default">
          <div uk-grid>
            <a
              href="#specifications"
              uk-scroll
              class="uk-width-1-1 uk-h2 uk-margin-remove uk-padding"
              uk-toggle="target: .specifications-usage"
              ><span uk-icon="icon: file-text; ratio: 2.3"></span> <span class="specifications-usage">View </span
              ><span class="specifications-usage" hidden>Hide </span>{{ variant.model }} Specifications</a
            >
            <div class="uk-width-1-1 uk-margin-remove">
              <div class="specifications-usage uk-width-1-1" hidden v-html="variant.specifications"></div>
              <div class="specifications-usage uk-width-1-1 uk-margin-medium-top uk-flex uk-flex-center" hidden>
                <p uk-margin>
                  <a
                    href="#specifications"
                    uk-scroll
                    class="uk-button uk-button-default tm-button-default uk-padding-remove-right"
                    >Back to top
                    <button class="uk-button uk-button-secondary tm-button-default uk-margin-small-left uk-padding-remove-left">
                      <div uk-toggle="target: .specifications-usage">
                        <span class="uk-icon uk-margin-small-left" uk-icon="icon: close"></span>
                        Close
                      </div>
                    </button></a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-width-1-1"><hr class="uk-margin-remove" /></div>
      </div>

      <RelatedVariants :itemModel="variant.model" :itemStock="variant.id"></RelatedVariants>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostContent from "@/components/content/PostContent";
import RelatedVariants from "@/components/related/RelatedVariants";
import Accessories from "@/components/accessories/Accessories";
import MetaMixin from "@/mixins/meta";
import { AccessoriesService } from "@/services";
export default {
  name: "variant-enquire",
  mixins: [MetaMixin],
  props: {
    selectedIimg: String,
  },
  emits: ["update:selectedIimg"],
  data: function () {
    return {
      variant_accessories: [],
      accessories_items: [],
      total: 0,
      errors: false,
      first_name: "",
      second_name: "",
      email_a: "",
      phone_n: "",
      finance: "",
      tradein: "",
      test_drive: "",
      message: "",
      isSending: false,
      isSent: false,
      siteName: this.$store.state.site.name,
      phone: this.$store.state.site.phone,
    };
  },
  methods: {
    async setVariantAccessories(slug) {
      this.variant_accessories = await AccessoriesService.getAccessoriesByModel(slug).then((data) => {
        return data;
      });
    },
    selectedVariant: function (variantId) {
      return variantId == this.variant.id;
    },
    checkForm: function (e) {
      (this.errors = []),
        this.first_name || this.errors.push("Fist Name required."),
        this.second_name || this.errors.push("Second Name required."),
        this.email_a
          ? this.validEmail(this.email_a) || this.errors.push("Valid email required.")
          : this.errors.push("Email required."),
        this.errors.length || this.UIkit.modal("#e-confirm").show(),
        // UIkit.switcher("#sel_form").show("2")
        this.first_name && this.second_name && this.email_a,
        e.preventDefault();
    },
    backForm() {
      this.isSending = false;
    },
    validEmail: function (email_a) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email_a);
    },
    invalidateForm() {
      this.errors = true;
    },
    submitForm: function (e) {
      this.isSending = !this.isSending;
      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/form`, {
          payload: {
            input_1: this.first_name + " " + this.second_name,
            input_3: this.phone_n,
            input_5: this.email_a,
            input_19: this.test_drive,
            input_28: this.finance,
            input_20: this.tradein,
            input_4: this.message,
            input_29: this.variant.id,
            input_30: this.variant.title.rendered,
            input_31: JSON.stringify(this.accessories_items),
            input_32: JSON.stringify([this.$store.state.variant]),
          },
          formid: this.$store.state.site.forms.showroom,
        })
        .then((response) => {
          this.isSending = false;
          this.isSent = true;
        })
        .catch((error) => {
          //this.response = 'Error: ' + error.response.status
        });
    },
    getAccessoriesList() {
      if (sessionStorage.getItem("accessories")) this.accessories_items = JSON.parse(sessionStorage.getItem("accessories")) || [];
    },
  },
  watch: {
    itemModel(val) {
      this.setVariantAccessories(val);
    },
    phone_n() {
      this.phone_n = this.phone_n
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{1,2})/g, "$1$2")
        .substr(0, 10);
    },
    "$route.params": {
      handler(newValue) {
        const { slug } = newValue;
        this.$store.dispatch("getVariantBySlug", slug);
      },
      immediate: true,
    },
  },

  components: { PostContent, RelatedVariants, Accessories },

  computed: {
    itemModel() {
      if (this.$store.state.variant) return this.$store.state.variant.model;
    },
    variant() {
      return this.$store.state.variant;
    },
    variantList() {
      return this.$store.state.modelVariants;
    },
    cashDividends() {
      let basket_total = 0;
      this.accessories_items.forEach((val) => {
        basket_total += Number(val.price);
        //or if you pass float numbers , use parseFloat()
      });
      return basket_total;
    },

    groupedmodels() {
      var models = {};

      this.variantList.forEach((item) => {
        if (models[item.grade_id] == undefined) {
          models[item.grade_id] = [];
          models[item.grade_id].push({
            title: item.title.rendered,
            image: item.vehicle_image[0],
            grade_id: item.grade_id,
            slug: item.slug,
            id: item.id,
          });
        } else {
          models[item.grade_id].push({
            title: item.title.rendered,
            image: item.vehicle_image[0],
            grade_id: item.grade_id,
            slug: item.slug,
            id: item.id,
          });
        }
      });
      return models;
    },
  },
  mounted() {
    document.body.classList.add("variant-enquire");
  },
  destroyed() {
    document.body.classList.remove("variant-enquire");
  },
  filters: {
    currency(price) {
      return "$" + price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
};
</script>
<style lang="css" scoped>
.switcher-colour-hero-wrap {
  min-height: calc(-62px + 100vh);
}
.related-vehicles {
  position: relative;
  background-color: #fff;
  z-index: 999;
}
.spec-button {
  padding: 0 15px;
}
.uk-button {
  text-transform: none;
}
.hero-variant-select {
  min-height: 92px;
}
@media (min-width: 1200px) {
  .switcher-colour-hero-wrap {
    position: fixed;
    left: 0;
    z-index: -1;
  }
  #enquire-header {
    min-height: 100vh;
  }
}
@media (max-width: 1200px) {
  .switcher-colour-hero {
    margin: 180px 0 110px 0;
  }
  .switcher-colour-hero-wrap {
    position: relative;
  }
}
</style>
