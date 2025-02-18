<template>
  <div class="uk-background-secondary uk-light" role="contentinfo">

    
    <div class="site-footer uk-width-1-1">
      <div class="uk-section uk-section-small">
        <div class="uk-container uk-container-large">

          <div class="uk-grid uk-visible@m">
            <div class="uk-width-1-1">
              <div class="uk-h5 uk-text-bold" uk-toggle="target: #footer-Vehicles">
                Choose your Hyundai<span uk-icon="icon: chevron-down" class="uk-float-right uk-hidden@m"></span>
              </div>
            </div>
            <div class="footer-wrap uk-width-1-1 uk-child-width-1-3@m uk-child-width-expand@l" id="footer-Vehicles" aria-hidden="false" uk-grid hidden>
              <div v-for="(category, index) in vehiclecat" :key="index" class="uk-margin-medium-top">
              <div class="uk-h5 uk-text-bold uk-text-uppercase" v-html="category"></div>
              <div v-for="item in grouped[category]" :key="item.id" class="el-content uk-panel">
                <router-link :to="'/vehicle/' + item.slug + ''" :title="item.segment" class="uk-margin-remove-last-child">
                  {{ item.title.rendered }}
                </router-link>
              </div>
            </div>
          </div>
          </div>


          <div class="uk-width-1-1 uk-margin-medium-top">
            <div class="uk-h5 uk-text-bold uk-text-capitalize uk-flex uk-flex-middle">
              <div class="uk-margin-auto-right"> 
                <div>{{ siteName }}</div>
              <div class="uk-text-muted">{{ showroom_address }}</div>
                      <div>
                        <a itemprop="telephone" :href="`tel:${phoneService.replace(/[^A-Z0-9]+/gi, '')}`" class="forcelink">
                          <span class="uk-button uk-button-text"
                            >Sales / Service / Parts: <b>{{ phoneService }}</b></span
                          >
                        </a>
                      </div>
                      </div>
              <div>
                <img src="/assets/logos/logo-white-sm.svg" width="60" height="32" class="nav-logo logo-white" loading="lazy" :alt="siteName" />
                </div>
            </div>
            <hr class="uk-visible@m"/>
          </div>

          <div>
            <ul
              class="
                uk-list
                footer-list
                uk-position-relative uk-margin-small uk-child-width-1-1 uk-child-width-expand@m
              "
              uk-grid
            >
            <hr class="uk-hidden@m">
              <li class="el-item uk-hidden@m">
                <div class="uk-h5 uk-text-bold" uk-toggle="target: #footer-Vehicles">
                  Choose your Hyundai <span uk-icon="icon: chevron-down" class="uk-float-right uk-hidden@m"></span>
                </div>
                <div class="footer-wrap" id="footer-Vehicles" aria-hidden="false" hidden>
                  <div v-for="(category, index) in vehiclecat" :key="index" class="uk-width-1-1 uk-margin-medium-top">
                  <div class="uk-h5 uk-text-bold uk-text-uppercase" v-html="category"></div>
                  <div v-for="item in grouped[category]" :key="item.id" class="el-content uk-panel">
                    <router-link :to="'/vehicle/' + item.slug + ''" :title="item.segment" class="uk-margin-remove-last-child">
                      {{ item.title.rendered }}
                    </router-link>
                  </div>
                </div>
                
                </div>

                  <hr class="uk-hidden@m">

              </li>
              <li v-for="(item, index) in footer" :key="index" class="el-item">
                <div class="uk-h5 uk-text-bold" :uk-toggle="'target: #footer-'+item.heading.replace(/\s/g, '-')+''">
                  {{ item.heading }} <span uk-icon="icon: chevron-down" class="uk-float-right uk-hidden@m"></span>
                </div>

                <div class="footer-wrap" :id="'footer-'+item.heading.replace(/\s/g, '-')+''" aria-hidden="false" hidden>
                  <div v-for="(item, index) in item.links" class="el-content uk-panel">
                  <a v-if="isLinkExternal(item.url)" :href="item.url" class="uk-text-light" ref="nofollow" target="_blank">  {{ item.title }}</a>
                  <router-link v-else :to="item.url" :title="item.title" class="uk-margin-remove-last-child uk-text-light">
                    {{ item.title }}
                  </router-link>
                 </div>
                </div>

                <hr class="uk-hidden@m">

                <div v-if="index === 2">
                  <div class="uk-child-width-auto uk-grid-small uk-flex-inline uk-margin-small-top uk-grid" uk-grid>
                    <div class="uk-width-1-1">
                      <div class="uk-h5 uk-text-bold">
                        Connect with us.
                      </div>
                    </div>

                    <div v-for="(value, key) in social" :key="value" class="uk-width-auto">
                     <div><a class="el-link uk-icon-button uk-icon" target="_blank" :href="value" :title="`${key}`" rel="noreferrer nofollow" :uk-icon="`icon:${key}`"></a></div>
                   </div>


                    <div v-if="places.result" class="uk-width-1-1 uk-margin-medium-top uk-position-relative">
                      <div class="google-badge-score" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
                      <svg class="uk-float-left" viewBox="0 0 512 512" height="60" width="60">
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

                      <div class="uk-margin-large-left" style="top:12px">
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
                        uk-width-auto uk-button uk-button-text uk-border-rounded
                        uk-icon
                        uk-text-left
                        uk-margin-small-top
                        uk-text-capitalize
                      "
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path
                          d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"
                        />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                      <b> We’d love to hear your feedback!</b>
                    </a>

                  </div>



                  </div>
                </div>
              </li>
                <li>
                <div>
                  <FooterHours/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div class="uk-container uk-container-large uk-overflow-hidden">
        <div class="uk-flex uk-flex-center uk-flex-right@s uk-grid">
          <div>
            <img data-src="https://driveagentmedia.b-cdn.net/files/shared/logos/twg/Part-of-Tony-White-Group.png" alt="Tony White Group" width="450" height="119" class="uk-margin-medium-right uk-responsive" uk-img />
          </div>
        </div>
       </div>
      </div>
    
    </div>





    <div class="uk-section uk-section-small uk-position-relative uk-position-z-index">
      <div class="uk-container uk-container-large">
        <div class="uk-margin-small-bottom">
          <small class="uk-text-xsmall">
          <sup>*</sup>All prices listed are Manufacturer’s ‘On the road’ Recommended Retail Price. Hyundai may change RRPs at any time (this includes where there are government changes in regulation and/or legislation). There may be a delay to any RRP displaying correctly on our materials. Always obtain prices from {{siteName}}.
          </small>
        </div>
        <div class="tm-grid-expand uk-margin-remove-vertical uk-grid uk-grid-stack" uk-grid>
          <div class="uk-grid-item-match uk-flex-middle uk-width-1-2@s">
            <div class="uk-panel uk-width-1-1">
              <div class="uk-text-small uk-text-light uk-margin uk-text-center uk-text-left@s">
                © {{ siteName }} LMCT {{ lmct }}. All rights reserved.
                <a href="https://driveagent.io/" rel="nofollow" target="_blank" class="uk-link-text uk-text-meta"
                  >Powered by DriveAgent.io.</a
                >
              </div>
            </div>
          </div>
          <div class="uk-grid-item-match uk-flex-middle uk-width-1-2@s uk-grid-margin">
            <div class="uk-panel uk-width-1-1">
              <div class="uk-margin uk-text-center uk-text-right@s">
                <a href="/privacy-policy" class="uk-link-text uk-text-small uk-text-light uk-margin-small-right">Terms of Service</a>
                <a href="/privacy-policy" class="uk-link-text uk-text-small uk-text-light uk-margin-small-right">Privacy Policy </a>
                <a href="#" uk-totop role="button" class="uk-icon uk-width-1-1 uk-margin-small uk-width-auto@s" aria-label="Top"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBusinessHours } from "@/services";
const FooterHours = () => import("@/components/page-elements/tradingDetails");
export default {
  name: "footer-links",
  components: { FooterHours },
  data: function () {
    return {
      siteName: this.$store.state.site.name,
      lmct: this.$store.state.site.lmct,
      loading: true,
      phoneService: this.$store.state.site.departments.service.phone,
      showroom_address: this.$store.state.site.showroom_address,
    };
  },
  created() {
    if (Object.keys(this.$store.state.models).length < 1) {
      this.$store.dispatch("getModels");
    }
  },
  computed: {
    places() {
      return this.$store.state.getGoogleReviews.googlereviews
    },
    social() {
      return this.$store.state.site.social;
    },
    footer() {
      return this.$store.state.site.sitelinks.footer;
    },
    vehicles() {
      return this.$store.state.models;
    },
    vehiclecat: function () {
      if (this.vehicles.length > 0) return [...new Set(this.vehicles.map((i) => i.vehiclecat))];
    },
    grouped() {
      const groups = {};
      this.vehicles.forEach((item) => {
        groups[item.vehiclecat] = groups[item.vehiclecat] || [];
        groups[item.vehiclecat].push(item);
      });
      return groups;
    },
  },
  methods:{
    isLinkExternal(link){
      return link.includes('http')
    },
  }
};
</script>
<style lang="css" scoped>
.el-content {
  margin-bottom: 10px;
}
.footer-list li {
  margin-top: 20px;
}
.footer-list [aria-expanded="true"] > .uk-icon {
     transform: rotateX(180deg);
}
@media (min-width: 960px){
  .footer-wrap, .footer-wrap[aria-hidden="false"] {
      display: flex!important;
  }
  .footer-list .footer-wrap[aria-hidden="false"] {
      display: block!important;
  }
}

</style>
