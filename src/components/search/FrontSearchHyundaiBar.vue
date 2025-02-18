<template>
  <div>

    <div class="h-tool-bar uk-container uk-padding-remove uk-container-small strip-icons-wrapper uk-position-relative uk-position-z-index">

      <div class="uk-grid-collapse uk-child-width-1-2 uk-child-width-expand@s strip-background uk-light uk-text-uppercase uk-text-center" uk-grid>
        <div class="uk-flex uk-flex-middle uk-divider-vertical">
          <router-link to="/service/" title="Book a Service" class="uk-link-reset uk-width-1-1">
            <i class="icon-hyundai-book-a-service"></i>
            <div class="icontxt text-blue uk-text-bold uk-h5 uk-margin-remove">Book a Service</div>
          </router-link>
        </div>
        <div class="uk-flex uk-flex-middle uk-divider-vertical">
            <router-link to="/test-drive/" title="Hyundai Test Drive" class="uk-link-reset uk-width-1-1">
                <i class="icon-hyundai-steering-wheel"></i>
                <div class="icontxt text-blue uk-text-bold uk-h5 uk-margin-remove">Test Drive a Hyundai</div>
            </router-link>
          </div>
          <div class="uk-flex uk-flex-middle uk-divider-vertical">
            <router-link to="/special-offers/" title="Hyundai Offers" class="uk-link-reset uk-width-1-1">
                <i class="icon-hyundai-compare-cars"></i>
                <div class="icontxt text-blue uk-text-bold uk-h5 uk-margin-remove">Current Offers</div>
            </router-link>
          </div>
          <div class="uk-flex uk-flex-middle uk-divider-vertical">
            <router-link to="/build-and-price/" title="Hyundai Buy online" class="uk-link-reset uk-width-1-1">
              <i class="icon-hyundai-click-to-buy"></i>
              <div class="icontxt text-blue uk-text-bold uk-h5 uk-margin-remove">Buy online</div>
            </router-link>
          </div>

          <div class="uk-flex uk-flex-middle uk-divider-vertical uk-hidden@s">
            <a class="uk-link-reset uk-width-1-1" href="#google_review" uk-scroll>
              <svg
                class="fronticon"
                version="1.1"
                width="26px"
                height="28px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 37.979 37.979"
                style="enable-background: new 0 0 37.979 37.979"
                xml:space="preserve"
              >
                <g>
                  <path
                    fill="#fff"
                    d="M21.553,2.322C15.45,3.435,9.956,6.693,2.608,3.406c0.096,0.333,0.189,0.667,0.283,1h-1.75L1,3.906H0l8.988,31.75h1 l-4.01-14.167h1.75c0.109,0.39,0.221,0.778,0.33,1.168C15.405,25.942,20.9,22.684,27,21.571 C25.186,15.155,23.369,8.738,21.553,2.322z M9.796,5.831c2.07-0.046,4.032-0.473,5.971-0.983c0.521,1.833,1.039,3.667,1.559,5.5 c-1.938,0.51-3.901,0.937-5.973,0.983C10.834,9.497,10.314,7.664,9.796,5.831z M5.766,20.739L1.354,5.156h1.75 c1.472,5.194,2.941,10.389,4.412,15.583H5.766z M7.173,15.991c-0.508-1.792-1.017-3.583-1.522-5.375 c2.046,0.751,3.951,1.005,5.773,0.964c0.507,1.792,1.015,3.583,1.521,5.375C11.125,16.996,9.219,16.742,7.173,15.991z M20.651,22.098c-1.938,0.511-3.9,0.937-5.972,0.982c-0.519-1.834-1.038-3.667-1.558-5.5c2.069-0.046,4.032-0.473,5.973-0.983 C19.613,18.432,20.133,20.264,20.651,22.098z M24.039,14.635c-1.729,0.375-3.414,0.889-5.121,1.337 c-0.508-1.792-1.016-3.583-1.521-5.375c1.706-0.449,3.395-0.962,5.12-1.337C23.023,11.052,23.531,12.843,24.039,14.635z M23.227,5.446c0.096,0.333,0.189,0.667,0.283,1c0.787-0.118,1.584-0.195,2.398-0.213c0.52,1.833,1.037,3.667,1.557,5.5 c-0.813,0.018-1.611,0.095-2.396,0.213c0.591,2.083,1.181,4.167,1.771,6.25c0.785-0.118,1.584-0.195,2.396-0.213 c0.521,1.833,1.039,3.667,1.56,5.5c-2.07,0.045-4.033,0.473-5.974,0.981c-0.121-0.432-0.243-0.86-0.364-1.291 c-2.018,0.529-4.008,1.15-6.068,1.525c0.217,0.766,0.434,1.529,0.649,2.293c6.101-1.113,11.597-4.371,18.94-1.086 c-1.814-6.416-3.633-12.833-5.449-19.25C29.11,5.128,26.094,5.015,23.227,5.446z M34.833,18.322 c-2.046-0.751-3.95-1.005-5.772-0.964c-0.508-1.792-1.016-3.583-1.521-5.375c1.82-0.041,3.727,0.213,5.771,0.964 C33.817,14.739,34.326,16.53,34.833,18.322z"
                  ></path>
                </g>
              </svg>
              <div class="icontxt text-blue uk-text-bold uk-h5 uk-margin-remove">Location</div>
            </a>
          </div>

          <div class="uk-flex uk-flex-middle uk-divider-vertical uk-hidden@s">
            <a href="#modal-call" uk-toggle class="uk-link-reset uk-width-1-1 icon-phone forcelink">
              <svg
                class="fronticon"
                version="1.1"
                width="25px"
                height="25px"
                viewBox="0 0 20 30"
                xmlns="http://www.w3.org/2000/svg"
                data-svg="receiver"
              >
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.01"
                  d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"
                ></path>
              </svg>
              <div class="icontxt text-blue uk-text-bold uk-h5 uk-margin-remove">Call Us</div>
            </a>
          </div>

      </div>

    </div>



    <div class="uk-inline uk-width-1-1 home-search">
      <div class="uk-container uk-container-small uk-position-relative uk-margin-medium-bottom akeModelPop" id="makeModels">
        <div v-if="loading" class="loader uk-animation-fade uk-position-center"></div>

        <div v-else class="uk-animation-fade">
          <div class="home-search-header">
            <div class="uk-width-1-1 uk-h1 uk-margin-remove uk-text-center uk-text-bold">
              <span class="uk-text-light">Vehicle </span> <b>Search</b>
            </div>
            <div class="uk-width-1-1 uk-h6 uk-margin-remove uk-text-center">
              Find the car that's
              <span class="uk-text-bold">perfect for you</span>.
            </div>
          </div>

          <div class="uk-text-center uk-margin-small-top uk-hidden@m">
            <button
              class="uk-button uk-button-primary uk-button-large appform-button border-radius-50 uk-text-bold"
              uk-toggle="target: #global-search-modal"
            >
              <span uk-icon="icon: search"></span> Search Vehicles
            </button>
          </div>

          <div class="uk-padding-small uk-visible@m">
            <div
              class="uk-grid-collapse uk-width-1-1 search-bar uk-background-default uk-child-width-expand@m uk-grid"
              uk-switcher="connect: #v_selects"
            >
              <div>
                <a @click="showModal(0)" class="uk-button uk-button-large uk-width-1-1" href="#">Type: {{ selectedMake }}</a>
              </div>
              <div class="uk-hidden">
                <a @click="showModal(1)" class="uk-button uk-button-large uk-width-1-1" href="#">Body: {{ selectedBody }}</a>
              </div>
              <div>
                <a @click="showModal(2)" class="uk-button uk-button-large uk-width-1-1" href="#">Make: {{ selectedModel }}</a>
              </div>
              <div @click="showModal(3)">
                <a class="uk-button uk-button-large uk-width-1-1" href="#">Model: {{ selectedModels }}</a>
              </div>
              <div>
                <router-link
                  class="uk-button uk-button-secondary uk-button-large appform-button uk-text-bold uk-width-1-1 uk-light"
                  :to="{
                    path: '/car-sales/',
                    name: 'car-sales',
                    query: search(),
                  }"
                  >Search</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "front-search",
  data() {
    return {
      loading: false,
      range: [],
      selectedMake: "All",
      selectedModel: "All",
      selectedModels: "All",
      selectedBody: "All",
      smType: "",
      smMakes: "",
      smModel: "",
      smBody: "",
      modelsearch: "",
      clearSearch: "",
      phone: this.$store.state.site.phone,
    };
  },

  methods: {
    showModal(index) {
      if (Object.keys(this.$store.state.models).length < 1) {
        this.$store.dispatch("getModels");
      }
      this.UIkit.modal("#global-search-modal").show();
      this.UIkit.switcher("#v_selects").show(index);
    },

    search: function () {
      this.$store.dispatch("setCurrentPage", 1);
      var vm = this;
      var type = vm.selectedMake;
      var body = vm.selectedBody;
      var make = vm.selectedModel;
      var model = vm.selectedModels;
      var query = {};
      if (type !== "All") {
        query.condition = type.toLowerCase();
      }
      if (body !== "All") {
        query.body = body.replace(/\s/g, "-").toLowerCase();
      }
      if (make !== "All") {
        query.make = make.replace(/\s/g, "-").toLowerCase();
      }
      if (model !== "All") {
        query.model = model.replace(/\s/g, "-").toLowerCase();
      }
      return query;
    },
  },
};
</script>
<style lang="scss" scoped>
.home-search {
  padding: 50px 0 0 0;
}
@media (min-width: 960px) {
.h-tool-bar{
  top: -50px;
  position: relative;
  z-index: 2;
}
.strip-background > div{
    padding: 47px 10px;
}
.h-tool-bar [class^="icon-hyundai-"] {
    color:#fff;
    font-size: 28px;
 }
}
@media (max-width: 960px) {
  .h-tool-bar .uk-divider-vertical{
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .icontxt {
    font-size: 0.7rem;
    line-height: 1.4;
  }
  .uk-text-meta.icontxtsm {
    font-size: 0.575rem;
  }
}
</style>
