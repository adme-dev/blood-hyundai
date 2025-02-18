<template>
    <div class="google-review-scroller">
      <div class="uk-container">
        <h2 class="uk-text-center uk-h1 uk-text-primary uk-text-bold uk-margin-medium-bottom">Customer <b>Reviews</b></h2>
        <div v-if="getDealershipReviews.length > 0">
          <div class="uk-position-relative uk-visible-toggle" tabindex="-1" uk-slider="autoplay: true; autoplay-interval: 3000; center: true">
            <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small uk-grid uk-grid-match" uk-height-match="target: > li > div > .uk-card">
              <li v-for="review in positiveReviews" :key="review.time">
                <div class="uk-card uk-padding-small uk-flex uk-flex-column">
                  <div class="uk-flex uk-flex-middle uk-margin-bottom">
                    <img :src="review.profile_photo_url" :alt="review.author_name" class="uk-border-circle" width="70" height="70">
                    <div class="uk-margin-left">
                      <h4 class="uk-card-title uk-margin-remove">{{ review.author_name }}</h4>
                    </div>
                  </div>
                  <div class="uk-flex-1">
                    <div class="uk-text-small">{{ review.dealership }}</div>
                    <div class="uk-text-small">{{ truncateText(review.text, 150) }}</div>
                  </div>
                  <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-top">
                    <div class="uk-flex">
                      <span v-for="n in 5" :key="n" class="uk-margin-small-right">
                        <svg v-if="n <= review.rating" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <polygon fill="#ffc107" points="10 1 12.2 6.2 18 6.8 13.8 10.8 15 16.5 10 13.4 5 16.5 6.2 10.8 2 6.8 7.8 6.2" />
                        </svg>
                        <svg v-else width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <polygon fill="#e0e0e0" points="10 1 12.2 6.2 18 6.8 13.8 10.8 15 16.5 10 13.4 5 16.5 6.2 10.8 2 6.8 7.8 6.2" />
                        </svg>
                      </span>
                    </div>
                    <span class="uk-text-meta">{{ review.relative_time_description }}</span>
                  </div>
                </div>
              </li>
            </ul>
            <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
            <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
          </div>
          <ul class="uk-slider-nav uk-dotnav"></ul>
        </div>
        <div v-else class="uk-text-center">
          <p>No reviews available. Click the button below to fetch reviews.</p>
          <button @click="fetchReviews" class="uk-button uk-button-primary">Fetch Reviews</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    name: 'CoolGoogleReviewScroller',
    computed: {
      ...mapGetters(['getDealershipReviews']),
      positiveReviews() {
        return this.getDealershipReviews.filter(review => review.rating >= 4).sort((a, b) => b.rating - a.rating);
      }
    },
    methods: {
      ...mapActions(['fetchDealershipReviews']),
      fetchReviews() {
        this.fetchDealershipReviews();
      },
      truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
      }
    },
    mounted() {
      this.fetchReviews();
    }
  }
  </script>
  
  <style scoped>

  .uk-card {
    border: 2px solid #e8e8e8;
    border-radius: 15px;
    background-color: #fff;
  }
  .google-review-scroller .uk-slider-container{
    padding: 0 20px 40px;
  }
  </style>