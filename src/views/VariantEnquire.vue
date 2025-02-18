<template>
  <div v-if="variant">
    <div class="uk-animation-fade">
      <div class="variant-bg">
        <div class="uk-container uk-container-expand uk-padding-remove uk-position-relative">
          <div class="uk-grid-collapse uk-grid">
            <div class="switcher-colour-hero-wrap uk-width-1-1 uk-width-expand uk-flex uk-flex-middle uk-flex-center">

              <div class="uk-width-1-2@m uk-position-top-left uk-padding-small uk-hidden@s">
                <h1 class="uk-h5 uk-text-bold uk-margin-remove">{{ variant.model }} {{ variant.grade_id }}</h1>
                <div class="uk-text-small" v-html="variant.short_desc"></div>
              </div>

              <div class="uk-width-1-1 uk-grid-collapse uk-grid">
                <div class="uk-flex uk-flex-middle uk-flex-center uk-width-expand@l">
                  <img :src="buttonColour || variant.colors.images[0].images"
                    class="uk-width-expand uk-animation-fade" />
                </div>


                <div class="uk-width-large"></div>
              </div>
            </div>

            <div class="uk-width-expand@l control-panel uk-inline" :data-id="variant.id" :data-model="variant.model">
            </div>

            <div class="uk-width-auto@l uk-background-default box-shadow-left">
              <div id="enquire-header"
                class="uk-flex uk-flex-middle contact-form variant-form uk-margin-medium-top uk-height-1-1 uk-padding-small">
                <div>
                  <div class="uk-width-1-1">
                    <div>
                      <div>
                        <h3 class="uk-h1 uk-margin-remove uk-text-bold">{{ variant.model }}</h3>
                        <div class="uk-text-bold">{{ variant.title }}</div>

                        <div v-if="variant.drive_away && changePrice" class="uk-margin-small-top">
                          <div class="uk-text-small uk-text-bold uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup></div>
                          <div class="uk-h1 text-red uk-text-bold uk-margin-remove">
                            ${{ changePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                          </div>
                        </div>

                        <div v-else-if="variant.drive_away" class="uk-margin-small-top">
                          <div class="uk-text-small uk-text-bold uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup></div>
                          <div class="uk-h1 text-red uk-text-bold uk-margin-remove">
                            ${{ parseInt(variant.drive_away) + paintPrice(variant.colors.images[0].paint_price) |
    formatPrice }}
                          </div>
                        </div>

                        <div v-if="strippedHtml().length"
                          class="offer-box uk-box-shadow-small uk-padding-small uk-margin-small-top">
                          <div class="uk-text-bold stag uk-text-left text-blue">BONUS OFFER</div>
                          <div class="text-blue uk-text-small uk-text-bold uk-text-italic" v-html="variant.offers">
                          </div>
                          <div class="offer-end"></div>
                        </div>
                        <div v-else class="offer-box">
                          <div class="uk-text-small uk-text-light uk-text-left uk-margin-small-top">
                            There are currently no Bonus Offers available for
                            {{ variant.title }}. Please contact us to discuss your options.
                          </div>
                        </div>


                        <div class="uk-text-xsmall" v-html="variant.short_desc"></div>

                      </div>
                    </div>



                  </div>

                  <ul id="sel_form" class="uk-hidden"
                    uk-switcher="connect: .switcher-main; animation: uk-animation-fade, uk-animation-fade">
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                  </ul>

                  <ul class="uk-switcher switcher-main">
                    <li>
                      <div class="uk-margin-small-top uk-position-relative uk-position-z-index">
                        <p uk-margin>
                          <button v-if="variant.seats"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">SEATS:</span><span class="uk-float-right">{{ variant.seats
                              }}</span>
                          </button>
                          <button v-if="variant.drive_train"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">DRIVE:</span><span class="uk-float-right">{{ variant.drive_train
                              }}</span>
                          </button>
                          <button v-if="variant.fuel"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">FUEL:</span><span class="uk-float-right">{{ variant.fuel
                              }}</span>
                          </button>
                          <button v-if="variant.engine"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">ENGINE:</span><span class="uk-float-right">{{ variant.engine
                              }}</span>
                          </button>
                          <button v-if="variant.transmission"
                            class="uk-width-1-1 spec-button uk-button uk-button-default tm-button-default">
                            <span class="uk-float-left">TRANSMISSION:</span><span class="uk-float-right">{{
    variant.transmission }}</span>
                          </button>
                        </p>

                        <div class="uk-margin-medium-top" v-if="variantList && variantList.length > 1">
                          <div class="uk-h3 uk-text-bold">Choose your {{ variant.model }}</div>

                          <ul id="select-range" class="uk-margin-remove-bottom" data-uk-accordion>
                            <li class="box-shadow-top variant-select">
                              <a class="uk-accordion-title uk-card uk-padding-small" href="#">
                                <span uk-icon="check"
                                  class="uk-position-top-left uk-margin-small-top uk-icon-button"></span>
                                <div class="uk-h5 uk-margin-remove">
                                  <div class="uk-grid-collapse selected_variant uk-grid">
                                    <div class="uk-width-auto">
                                      <img :data-src="buttonColour || variant.colors.images[0].images"
                                        class="uk-width-small hero-variant-select" :alt="variant.title.rendered"
                                        uk-img />
                                    </div>
                                    <div class="uk-width-expand uk-flex uk-flex-middle uk-flex-center">
                                      <div class="uk-text-small uk-text-bold">{{ variant.title }}</div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                              <div class="uk-accordion-content">
                                <div v-for="(model, index) in groupedmodels" :key="index">
                                  <div class="uk-margin-small-left">
                                    <div
                                      class="uk-h3 uk-text-bold uk-text-uppercase uk-text-muted uk-margin-small-top uk-margin-remove-bottom">
                                      <div v-if="index != 'null'">{{ index }}</div>
                                      <div v-else>{{ variant.model }}</div>
                                    </div>
                                    <div v-html="model[0]['short_desc']"></div>
                                    <hr class="uk-margin-remove" />
                                  </div>
                                  <ul class="uk-list uk-margin-remove">
                                    <li v-for="(cat, index) in model" :key="index">
                                      <router-link :to="'/variant/' + cat.slug + ''" class="uk-link-reset">
                                        <div @click="toggleAccordion()"
                                          class="uk-grid-collapse selected_variant uk-grid" v-bind:class="{
    'uk-text-bold uk-background-secondary uk-light': selectedVariant(cat.id),
  }">
                                          <div class="uk-width-auto">
                                            <img :data-src="'' + cat.image[0] + ''"
                                              class="uk-padding-small uk-width-small" data-uk-img />
                                          </div>
                                          <div class="uk-width-expand uk-flex uk-flex-middle uk-flex-left">

                                            <div class="uk-width-1-1">

                                              <div class="uk-text-small uk-text-bold">
                                                {{ cat.title }}
                                              </div>
                                              <div v-if="cat.drive_away" class="uk-width-1-1">
                                                <span class="uk-text-xsmall uk-text-bold">DRIVE AWAY
                                                  FROM<sup>*</sup></span>
                                                <span class="uk-text-xsmall uk-text-bold">
                                                  ${{ parseInt(cat.drive_away) | formatPrice }}
                                                </span>
                                              </div>

                                            </div>


                                          </div>
                                        </div>
                                      </router-link>
                                    </li>
                                  </ul>
                                </div>


                              </div>
                            </li>
                          </ul>
                        </div>

                        <div class="uk-h3 uk-text-bold uk-margin-small-top">Choose your colour
                          <div class="uk-text-meta">{{ colourName || variant.colors.images[0].colour_name }}</div>
                        </div>

                        <ul class="uk-grid-collapse uk-child-width-auto variant-colours-items uk-grid">
                          <li v-for="(colours, index) in variant.colors.images" :key="index"
                            :class="{ 'uk-active': index === activeItem }">
                            <a href="#" @click.prevent="
    buttonColour = colours.images,
    colourName = colours.colour_name,
    changePrice = parseInt(variant.drive_away) + paintPrice(colours.paint_price),
    selectItem(index)
    ">
                              <div class="uk-border-circle uk-background-cover"
                                :style="{ 'background-image': 'url(' + colours.swatch_colour_ + ')' }"></div>
                            </a>
                          </li>
                        </ul>
                        <div class="uk-text-meta-xs uk-text-muted">
                          The images shown here are for illustrative purposes only, and may differ from the standard
                          specifications per type. No rights can be derived from the photos. Hyundai reserves the right
                          to change
                          models, colors and equipment without prior notice and without obligation to change the cars
                          already in
                          the market.
                        </div>

                        <div class="uk-h3 uk-text-bold uk-margin-medium-top">Key Features</div>
                        <div>
                          <div class="uk-text-left uk-text-small v-features uk-text-light uk-overflow-hidden"
                            :class="{ 'uk-height-small uk-margin-small-bottom': toggled === true, 'uk-height-1-1': toggled === false }"
                            v-html="variant.features"></div>

                          <div class="uk-text-left">
                            <button class="uk-button uk-button-link"
                              :class="{ 'uk-visible': toggled === true, 'uk-hidden': toggled === false }"
                              @click="toggle()"><span uk-icon="chevron-down"></span> Show more features
                            </button>
                            <button class="uk-button uk-button-link"
                              :class="{ 'uk-hidden': toggled === true, 'uk-visible': toggled === false }"
                              @click="toggle()"><span uk-icon="chevron-up"></span> Show less features
                            </button>
                          </div>
                        </div>


                        <div v-if="variant.specifications" class="uk-h3 uk-text-bold uk-margin-medium-top">Specs &
                          Brochure</div>

                        <div class="uk-grid">
                          <a v-if="variant.specifications" :href="variant.specifications"
                            class="uk-button uk-button-link" target="_blank"><span uk-icon="icon: file-pdf"></span>
                            Specifications</a>

                          <a v-if="variant.brochure" :href="variant.brochure" class="uk-button uk-button-link"
                            target="_blank"><span uk-icon="icon: file-pdf"></span> Brochure</a>
                        </div>

                      </div>

                      <div v-if="variant_accessories.length">
                        <Accessories :accessories="variant_accessories"></Accessories>
                      </div>

                      <hr>

                      <div class="uk-h3 uk-text-bold uk-text-center">Enquire on your {{ variant.model }}</div>

                      <div class="uk-grid-small uk-child-width-expand uk-margin-medium-bottom uk-grid">

                        <div class="uk-margin-auto-left">
                          <a href="#enquire-header"
                            class="uk-width-1-1 uk-button uk-button-primary uk-button-large uk-text-bold tm-button-default bounce-bottom-small"
                            @click="getAccessoriesList()" uk-scroll="offset: 20" uk-switcher-item="next">Continue to
                            enquire</a>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div>
                        <div v-if="accessories_items.length" class="uk-width-1-1 uk-margin-medium-top checkout">
                          <div class="uk-width-1-1">
                            <div>
                              <div class="uk-h3 uk-text-bold">Your accessories</div>
                              <span class="uk-float-right"><span uk-icon="icon: cart"></span><span
                                  class="uk-badge uk-margin-small-bottom uk-background-secondary">{{
    accessories_items.length
  }}</span></span>
                            </div>
                            <ul class="uk-list uk-list-divider uk-margin-remove">
                              <li v-for="(item, id) in accessories_items" :key="id" class="uk-visible-toggle">
                                <div>
                                  <div class="uk-grid-collapse uk-text-left uk-grid">
                                    <div class="uk-width-auto">
                                      <div class="uk-background-cover uk-margin-small-right cart-image"
                                        :style="{ backgroundImage: `url(${item.image})` }">
                                        <canvas width="80px" height="60px"></canvas>
                                      </div>
                                    </div>
                                    <div class="uk-width-expand">
                                      <div class="uk-text-meta uk-text-secondary">
                                        {{ item.modal }}
                                      </div>
                                      <div v-html="item.title.rendered"></div>
                                      <div>
                                        <div class="uk-text-emphasis">
                                          <span class="uk-text-bold">{{ item.price | currency }}</span><sup>A1</sup>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="text-red uk-h4 uk-margin-remove-bottom">
                                Total: <b>{{ cashDividends | currency }}</b>
                              </li>
                            </ul>
                          </div>
                          <div class="uk-text-meta-xs">
                            <sup>A1</sup>There may be a delay to any pricing updates displaying correctly on our
                            materials. Always
                            obtain confirmation on updated pricing from {{ siteName }}. All prices are subject to change
                            at the
                            discretion of {{ siteName }}.
                          </div>
                        </div>

                        <div class="uk-text-left uk-margin-medium-top">
                          <div class="uk-h1 uk-margin-remove uk-text-bold">Enquire</div>
                          <div class="uk-h4 uk-text-normal uk-margin-remove-top">
                            Complete this form to send your enquiry to {{ siteName }}. Or call
                            <a class="text-red" itemprop="telephone"
                              :href="'tel:' + phone.replace(/[^A-Z0-9]+/gi, '')">{{
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
                                <input id="first_name" class="uk-input uk-form-large" name="first_name"
                                  v-model="first_name" required @invalid="invalidateForm" placeholder="First Name"
                                  type="text" />
                                <label class="uk-form-label" for="first_name">First Name<sup>*</sup></label>
                                <span class="error-message uk-text-small">First name required</span>
                                <span class="uk-form-icon" uk-icon="icon: user"></span>
                              </div>

                              <div class="uk-width-1-2@m uk-inline">
                                <input id="second_name" class="uk-input uk-form-large" name="second_name"
                                  v-model="second_name" required @invalid="invalidateForm" placeholder="Second Name"
                                  type="text" />
                                <label class="uk-form-label" for="second_name">Second Name<sup>*</sup></label>
                                <span class="error-message uk-text-small">Second name required</span>
                                <span class="uk-form-icon" uk-icon="icon: user"></span>
                              </div>

                              <div class="uk-width-1-1 uk-inline">
                                <input id="email_a" class="uk-input uk-form-large" name="email_a" v-model="email_a"
                                  required @invalid="validEmail" placeholder="Email Address" type="text" />
                                <label class="uk-form-label" for="email_a">Email Address<sup>*</sup></label>
                                <span class="error-message uk-text-small">Email address required</span>
                                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                              </div>

                              <div class="uk-width-1-1 uk-inline">
                                <input id="phone_n" name="phone_n" class="uk-input uk-form-large"
                                  @invalid="invalidateForm" v-model="phone_n" placeholder="Phone Number" type="text" />
                                <label class="uk-form-label" for="phone_n">Phone Number<sup>*</sup></label>
                                <span class="uk-form-icon" uk-icon="icon: receiver"></span>
                              </div>

                              <div class="uk-width-1-1 uk-inline message-textarea">
                                <textarea rows="4" class="uk-textarea" name="message" type="text" v-model="message"
                                  placeholder="Message"></textarea>
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
                                      <label><input class="uk-radio" type="radio" name="test_drive" v-model="test_drive"
                                          value="" checked />
                                        No</label>
                                      <label><input class="uk-radio" type="radio" name="test_drive" v-model="test_drive"
                                          value="Yes I would like to book a test drive" />
                                        Yes</label>
                                    </div>
                                  </div>

                                  <div class="uk-width-1-1">
                                    <div class="uk-grid-small uk-margin-small-top uk-child-width-auto uk-grid">
                                      <label class="uk-margin-auto-right">I have a vehicle to trade in.</label>
                                      <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein"
                                          value="" checked />
                                        No</label>
                                      <label><input class="uk-radio" type="radio" name="tradein" v-model="tradein"
                                          value="Yes I have a vehicle to trade in" />
                                        Yes</label>
                                    </div>
                                  </div>

                                  <div class="uk-width-1-1">
                                    <div class="uk-grid-small uk-margin-small-top uk-child-width-auto uk-grid">
                                      <label class="uk-margin-auto-right">I'm interested in finance.</label>
                                      <label><input class="uk-radio" type="radio" name="finance" v-model="finance"
                                          value="" checked />
                                        No</label>
                                      <label><input class="uk-radio" type="radio" name="finance" v-model="finance"
                                          value="Yes I'm interested in finance." />
                                        Yes</label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="uk-width-1-1">
                                <p class="uk-text-meta-xs uk-margin-small-top">
                                  Your personal information will be collected, used and stored in strict accordance with
                                  our
                                  <a class="uk-text-primary" href="/privacy-policy" target="_blank">Privacy Policy</a>.
                                  Our
                                  Privacy Policy contains details on how information is used, how you may access /
                                  correct
                                  information held and our privacy complaints processes.
                                </p>
                              </div>
                            </fieldset>
                          </form>

                          <div class="uk-grid-small uk-margin-medium-top uk-child-width-1-2 uk-grid">
                            <div>
                              <a href="#enquire-header"
                                class="uk-button uk-width-1-1 uk-button-default tm-button-default uk-text-bold"
                                uk-scroll uk-switcher-item="previous">Previous</a>
                            </div>
                            <div class="uk-margin-auto-left">
                              <button class="uk-button uk-width-1-1 uk-button-primary tm-button-default uk-text-bold"
                                @click="checkForm">
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div id="e-confirm" class="e-confirm uk-flex-top" uk-modal="bg-close:false">
                        <div class="uk-modal-dialog uk-margin-auto-vertical uk-border-rounded uk-box-shadow-medium">
                          <h2 class="uk-modal-title uk-margin-small-left uk-padding-small">Confirm & Send</h2>

                          <div class="uk-width-1-1">
                            <div class="
                                uk-overlay
                                form-overlay-default
                                uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index
                              " v-show="isSending">
                              <div class="uk-position-center uk-text-center">
                                <div uk-spinner="ratio: 2"></div>
                                <p>Sending...</p>
                              </div>
                            </div>

                            <div class="
                                uk-overlay
                                form-overlay-default
                                uk-width-1-1 uk-height-1-1 uk-position-top-left uk-position-z-index
                              " v-show="isSent">
                              <div class="uk-position-center uk-text-center form-confirmation">
                                <strong>Hi {{ first_name }}</strong>
                                <div>Thank you for your enquiry. One of our staff members will be in touch shortly.
                                </div>
                              </div>
                            </div>

                            <div class="uk-padding-small">
                              <div>
                                <button class="uk-button uk-button-link uk-link-reset uk-modal-close-full"
                                  uk-switcher-item="1" @click="backForm">
                                  Close <span uk-icon="close"></span>
                                </button>
                              </div>

                              <div class="uk-grid uk-flex uk-flex-middle">
                                <div class="uk-width-expand uk-margin-small-left">
                                  <div class="uk-h4 uk-text-bold uk-margin-remove">{{ variant.title }}</div>
                                  <div v-if="variant.drive_away" class="uk-margin-small-top">
                                    <div class="uk-text-small uk-text-bold uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup>
                                    </div>
                                    <div class="uk-h3 uk-margin-remove uk-text-bold uk-text-emphasis">
                                      ${{ variant.drive_away.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                                    </div>
                                  </div>
                                  <div v-if="variant.abn_holder_price">
                                    <div class="uk-text-xsmall">ABN Holder Price From <b>${{ variant.abn_holder_price |
    formatPrice }}<sup>A1</sup></b> Driveaway</div>
                                  </div>
                                </div>
                                <div class="uk-width-expand">
                                  <img :src="buttonColour || variant.colors.images[0].images" class="uk-width-expand" />
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

                              <div class="uk-grid-small uk-margin-small-top uk-grid">
                                <div class="uk-margin-auto">
                                  <button class="
                                      uk-width-1-1 uk-button uk-button-primary uk-button-large
                                      tm-button-default
                                      uk-text-bold
                                      border-radius-50
                                    " @click="submitForm">
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

        <div v-if="variant.offer_disclaimer"
          class="uk-width-1-1 uk-background-default uk-position-relative uk-position-z-index">
          <hr class="uk-margin-remove" />
          <div class="uk-width-1-1 uk-text-meta-xs uk-padding-small" v-html="variant.offer_disclaimer"></div>
        </div>
      </div>



      <div class="uk-background-muted uk-position-relative">
        <div class="pd-tp-50">
          <variantSlider :itemStock="variant.id" :itemModel="variant.model" :itemTitle="variant.model"
            :key="$route.params.slug"></variantSlider>
        </div>
      </div>

    </div>

    <div class="uk-background-muted uk-position-relative">
      <carRelated :model="variant.modelslug" vehicle_id="0"></carRelated>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import PostContent from "@/components/content/PostContent";
import variantSlider from "@/components/modelSlider/variantSlider";
import Accessories from "@/components/accessories/Accessories";
import ImageRotator from "@/builder/components/ImageRotator";
import carRelated from "@/builder/components/carsalesRelated.vue";
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
      current_url: "",
      buttonColour: "",
      changePrice: "",
      colourName: '',
      activeItem: null,
      toggled: true,
      siteName: this.$store.state.site.name,
      address: this.$store.state.site.showroom_address
    };
  },
  metaInfo() {
    if (this.variant)
      return {
        title:
          this.variant.title + ' | ' + this.$store.state.site.name,
        meta: [
          {
            vmid: "description",
            name: "description",
            content: this.variant.title + ' | ' + this.$store.state.site.name + ' | ' + this.$store.state.site.departments.sales.address,
          },
        ],
      };
  },
  methods: {
    strippedHtml() {
      //console.log(string.replace(/<\/?[^>]+(>|$)/g, ""));
      return this.variant.offers.toString().replace(/\s/g, '').replace(/<\/?[^>]+>/ig, '');
    },
    toggle: function () {
      this.toggled = !this.toggled
    },
    selectItem(i) {
      this.activeItem = i;
    },
    formatBullet(value) {
      var myNewString =
        "<li>" +
        value.split("\r\n").join("</li><li>") +
        "</li>";
      return myNewString;
    },
    toggleAccordion() {
      this.UIkit.accordion("#select-range").toggle();
      window.scrollTo(0, 0);
    },
    paintPrice(value) {
      if (value) {
        return parseInt(value)
      } else {
        return parseInt(0)
      }
    },
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
      const scrollToEl = document.querySelectorAll(".small-lead-form")[0];
      scrollToEl.scrollIntoView({ behavior: "smooth" });
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
            input_30: this.variant.title,
            input_31: this.accessories_items.length > 0 ? JSON.stringify(this.accessories_items) : "",
            input_32: "",
            //input_32: JSON.stringify([this.$store.state.variant]),
            //input_33: this.page_link,
            input_33: this.buttonColour || this.variant.colors.images[0].images,
            input_34: this.changePrice || this.variant.drive_away,
          },
          formid: this.$store.state.site.forms.showroom,
        })
        .then((response) => {
          this.isSending = false;
          this.isSent = true;

          window.dataLayer?.push({
            event: "FormSub Variants",
            formName: "Variants Form",
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
        this.changePrice = null;
        this.buttonColour = null;
        this.colourName = null;
        this.activeItem = null;
      },
      immediate: true,
    },
  },

  components: { PostContent, Accessories, ImageRotator, carRelated, variantSlider },

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
            title: item.title,
            image: item.vehicle_image,
            grade_id: item.grade_id,
            slug: item.slug,
            id: item.id,
            drive_away: item.drive_away,
            abn_holder_price: item.abn_holder_price
          });
        } else {
          models[item.grade_id].push({
            title: item.title,
            image: item.vehicle_image,
            grade_id: item.grade_id,
            slug: item.slug,
            id: item.id,
            drive_away: item.drive_away,
            abn_holder_price: item.abn_holder_price
          });
        }
      });
      return models;
    },
  },
  mounted() {
    document.body.classList.add("variant-enquire");
    this.current_url = window.location.href;
  },
  destroyed() {
    document.body.classList.remove("variant-enquire");
    window.sessionStorage.removeItem('accessories');
  },
  filters: {
    currency(price) {
      return "$" + price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style>
.pd-tp-50 {
  padding-top: 50px;
}

.variant-bg {
  position: relative;
}

.switcher-colour-hero-wrap {
  min-height: calc(-100px + 100vh);
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

.variant-enquire .controlpanel {
  right: auto;
  left: 0;
  transform: translateX(0);
}

.variant-enquire .controlpanel-hide {
  transform: translateX(-150px) !important;
}

.box-shadow-left {
  position: relative;
  z-index: 1;
}

/* .box-shadow-left{
  box-shadow: -4px 0px 0px 0px rgb(0 0 0 / 8%);
} */
@media (min-width: 1200px) {
  .switcher-colour-hero-wrap {
    position: fixed;
    left: 0;
  }

  #enquire-header {
    min-height: 100vh;
  }
}

@media (max-width: 1200px) {
  .switcher-colour-hero-wrap {
    position: relative;
  }
}
</style>
