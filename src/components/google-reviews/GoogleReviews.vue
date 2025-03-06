<template>
  <div v-if="places && places.result" id="google_review">
    <div class="google_review uk-background-default">
      <div class="uk-position-relative uk-overflow-hidden">
        <div class="google_map_overlay uk-position-z-index uk-background-default uk-overflow-hidden uk-border-rounded">
          <div class="uk-width-1-1 uk-padding-small">
            <div class="uk-position-top-right uk-padding-small uk-text-center">
              <a :href="'https://www.google.com/maps/dir//' + places.result.name + '?hl=en'" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(66, 133, 244)" height="35" viewBox="0 0 24 24" width="35">
                  <path
                    d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"
                  />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <div class="text-directions">Directions</div></a
              >
            </div>
            <div class="google-badge-score" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
              <svg viewBox="0 0 512 512" height="50" width="50">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z"
                    fill="#4285f4"
                  ></path>
                  <path
                    d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z"
                    fill="#34a853"
                  ></path>
                  <path
                    d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z"
                    fill="#fbbc05"
                  ></path>
                  <path
                    d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z"
                    fill="#ea4335"
                  ></path>
                  <path d="M20 20h472v472H20V20z"></path>
                </g>
              </svg>

              <div class="google-rating uk-position-top-left uk-margin-medium-left">
                <div>Google Rating</div>
                <div class="uk-width-1-1 reviews-based">
                  <span itemprop="ratingValue" class="rating-text uk-margin uk-width-1-1">
                    {{ places.result.rating }}
                  </span>
                  <div class="stars-outer">
                    <div class="stars-inner" :style="{ width: (places.result.rating / 5) * 100 + '%' }">
                      {{ places.result.rating }}
                    </div>
                  </div>
                </div>
                <div class="reviews-based">Based on {{ places.result.user_ratings_total }} reviews</div>
              </div>
            </div>

            <a
              :href="'https://search.google.com/local/writereview?placeid=' + places.result.place_id + ''"
              target="_blank"
              rel="noreferrer"
              class="
                uk-width-1-1 uk-button uk-button-default uk-border-rounded
                tm-button-default
                uk-text-bold uk-icon
                leave-a-review
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              Write a review
            </a>

            <div class="google-review-info" itemscope itemtype="http://schema.org/LocalBusiness">
              <div class="uk-h4 uk-margin-small-top uk-margin-remove">
                <strong>{{ places.result.name }}</strong>
              </div>
              <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress" class="uk-text-small">
                {{ places.result.formatted_address }}
              </div>
              <div class="g-phone-w">
                <a itemprop="telephone" :href="`tel:${places.result.formatted_phone_number.replace(/[^A-Z0-9]+/gi, '')}`">
                  <svg
                    class="g-phone"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fbfbfb"
                    height="25"
                    viewBox="0 0 24 24"
                    width="25"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"
                    />
                  </svg>
                  <strong class="g-phone-text">{{ places.result.formatted_phone_number }}</strong>
                </a>
              </div>
            </div>

            <div class="opening_hours" itemprop="openingHours">
              <div
                :class="[changeToday() == 1 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Monday:</div>
                {{ places.result.opening_hours.weekday_text[0].replace("Monday:", "") }}
              </div>
              <div
                :class="[changeToday() == 2 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Tuesday:</div>
                {{ places.result.opening_hours.weekday_text[1].replace("Tuesday:", "") }}
              </div>
              <div
                :class="[changeToday() == 3 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Wednesday:</div>
                {{ places.result.opening_hours.weekday_text[2].replace("Wednesday:", "") }}
              </div>
              <div
                :class="[changeToday() == 4 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Thursday:</div>
                {{ places.result.opening_hours.weekday_text[3].replace("Thursday:", "") }}
              </div>
              <div
                :class="[changeToday() == 5 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Friday:</div>
                {{ places.result.opening_hours.weekday_text[4].replace("Friday:", "") }}
              </div>
              <div
                :class="[changeToday() == 6 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Saturday:</div>
                {{ places.result.opening_hours.weekday_text[5].replace("Saturday:", "") }}
              </div>
              <div
                :class="[changeToday() == 7 ? 'uk-text-primary uk-text-bold' : '']"
                class="uk-child-width-1-2 uk-grid-collapse uk-grid"
              >
                <div class="uk-margin-auto-right">Sunday:</div>
                {{ places.result.opening_hours.weekday_text[6].replace("Sunday:", "") }}
              </div>
            </div>
          </div>

          <div v-if="places">
            <div class="uk-slider uk-slider-container" uk-slider="autoplay:true; autoplay-interval:4000">
              <div class="uk-position-relative uk-overflow-hidden uk-visible-toggle uk-transition-toggle" tabindex="-1">
                <ul
                  class="uk-slider-items uk-grid-small uk-grid-match uk-flex uk-flex-middle uk-child-width-1-1 uk-grid"
                  uk-height-match=".review-wrap"
                >
                
                  <li v-for="(item, index) in places.result.reviews" :uk-slideshow-item="index" :key="index" v-if="item.rating > 4">
                    <div
                      class="uk-card uk-background-default uk-width-1-1 uk-border-rounded review-wrap"
                      itemprop="aggregateRating"
                      itemscope
                      itemtype="http://schema.org/AggregateRating"
                    >
                      <div class="uk-padding-small uk-padding-remove-bottom">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                          <div class="uk-width-auto">
                            <img
                              class="uk-border-circle"
                              width="60"
                              height="60"
                              :data-src="item.profile_photo_url"
                              data-uk-img
                              :alt="`${item.author_name}`"
                            />
                          </div>
                          <div class="uk-width-expand uk-inline-clip">
                            <h5 class="uk-margin-remove-bottom">{{ item.author_name }}</h5>
                            <div class="stars-outer">
                              <div class="stars-inner" :style="{ width: (item.rating / 5) * 100 + '%' }">
                                {{ places.result.rating }}
                              </div>
                            </div>
                            <div class="uk-text-meta uk-text-small uk-margin-remove-top relative-time">
                              {{ item.relative_time_description }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="uk-padding-small uk-padding-remove-top">
                        <div class="uk-text-meta uk-text-small uk-margin-remove-top">
                          <a :href="item.author_url" target="_blank" rel="noreferrer" class="uk-link-muted uk-text-primary"
                            >
                            {{ item.text.substring(0, 180) }}...</a
                          >
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <a
                  class="uk-position-center-left uk-padding-small uk-overlay-default uk-border-rounded uk-hidden-hover uk-hidden"
                  href="#"
                  uk-slidenav-previous
                  uk-slider-item="previous"
                  >Prev</a
                >
                <a
                  class="uk-position-center-right uk-padding-small uk-overlay-default uk-border-rounded uk-hidden-hover uk-hidden"
                  href="#"
                  uk-slidenav-next
                  uk-slider-item="next"
                  >Next</a
                >
              </div>
            </div>
          </div>
        </div>
        <iframe
          class="google_map_box lazyframe uk-position-relative uk-width-1-1 uk-overflow-hidden"
          :src="
            'https://maps.google.com/maps?q=' + places.result.name + ' ' + places.result.formatted_address + '&z=16&output=embed'
          "
          frameborder="0"
          title="Dealership location"
          style="border: 0"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { getBusinessHours } from "@/services";
export default {
  data() {
    return {
      loading: true,
    };
  },
  methods: {
  changeToday() {
      return [new Date().getDay()];
    },
  },
  computed: {
    places() {
      return this.$store.state.getGoogleReviews.googlereviews
    },
  },
};
</script>
