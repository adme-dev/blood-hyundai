<template>
  <div>
  <div>
    <div class="uk-container uk-container-large s-wp uk-background-secondary uk-light">
      <div class="uk-grid-collapse uk-child-width-1-3 uk-child-width-1-5@l uk-text-center uk-margin-small-top uk-margin-small-bottom iconnav uk-grid">
        <div>
          <router-link to="/service/" title="Hyundai Service" class="uk-link-reset uk-width-1-1">
            <div class="uk-padding-small">
              <i class="icon-hyundai-book-a-service"></i>
              <div class="icontxt uk-text-bold uk-h5 uk-margin-small">Servicing available</div>
              <div class="uk-text-light uk-text-meta icontxtsm uk-visible@s"></div>
              <button class="uk-button uk-button-text uk-width-auto uk-visible@s">
                Book a Service
              </button>
            </div>
          </router-link>
        </div>

        <div>
          <router-link to="/test-drive/" title="Hyundai Test Drive" class="uk-link-reset uk-width-1-1">
            <div class="uk-padding-small">
              <i class="icon-hyundai-steering-wheel"></i>
              <div class="icontxt uk-text-bold uk-h5 uk-margin-small">Test Drive a Hyundai</div>
              <div class="uk-text-light uk-text-meta icontxtsm uk-visible@s"></div>
              <button class="uk-button uk-button-text uk-text-secondary uk-width-auto uk-visible@s">
                Book a Test Drive
              </button>
            </div>
          </router-link>
        </div>

        <div>
          <router-link to="/special-offers/" title="Hyundai Offers" class="uk-link-reset uk-width-1-1">
            <div class="uk-padding-small">
            <i class="icon-hyundai-compare-cars"></i>
              <div class="icontxt uk-text-bold uk-h5 uk-margin-small">Current Offers</div>
              <div class="uk-text-light uk-text-meta icontxtsm uk-visible@s"></div>
              <button class="uk-button uk-button-text uk-text-secondary uk-width-auto uk-visible@s">
                View Offers
              </button>
            </div>
          </router-link>
        </div>

        <div>
          <router-link to="/contact" title="Hyundai Contact" class="uk-link-reset uk-width-1-1">
            <div class="uk-padding-small">
            <i class="icon-hyundai-talk-to-a-expert"></i>
              <div class="icontxt uk-text-bold uk-h5 uk-margin-small">Make an Enquiry</div>
              <div class="uk-text-light uk-text-meta icontxtsm uk-visible@s"></div>
              <button class="uk-button uk-button-text uk-text-secondary uk-width-auto uk-visible@s">
                More Info
              </button>
            </div>
          </router-link>
        </div>

        <div>
          <a class="uk-link-reset uk-width-1-1" href="#google_review" title="Google reviews">
            <div class="uk-padding-small">
              <svg
                class="fronticon"
                version="1.1"
                width="56px"
                height="58px"
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
                    fill="#1a78e4"
                    d="M21.553,2.322C15.45,3.435,9.956,6.693,2.608,3.406c0.096,0.333,0.189,0.667,0.283,1h-1.75L1,3.906H0l8.988,31.75h1 l-4.01-14.167h1.75c0.109,0.39,0.221,0.778,0.33,1.168C15.405,25.942,20.9,22.684,27,21.571 C25.186,15.155,23.369,8.738,21.553,2.322z M9.796,5.831c2.07-0.046,4.032-0.473,5.971-0.983c0.521,1.833,1.039,3.667,1.559,5.5 c-1.938,0.51-3.901,0.937-5.973,0.983C10.834,9.497,10.314,7.664,9.796,5.831z M5.766,20.739L1.354,5.156h1.75 c1.472,5.194,2.941,10.389,4.412,15.583H5.766z M7.173,15.991c-0.508-1.792-1.017-3.583-1.522-5.375 c2.046,0.751,3.951,1.005,5.773,0.964c0.507,1.792,1.015,3.583,1.521,5.375C11.125,16.996,9.219,16.742,7.173,15.991z M20.651,22.098c-1.938,0.511-3.9,0.937-5.972,0.982c-0.519-1.834-1.038-3.667-1.558-5.5c2.069-0.046,4.032-0.473,5.973-0.983 C19.613,18.432,20.133,20.264,20.651,22.098z M24.039,14.635c-1.729,0.375-3.414,0.889-5.121,1.337 c-0.508-1.792-1.016-3.583-1.521-5.375c1.706-0.449,3.395-0.962,5.12-1.337C23.023,11.052,23.531,12.843,24.039,14.635z M23.227,5.446c0.096,0.333,0.189,0.667,0.283,1c0.787-0.118,1.584-0.195,2.398-0.213c0.52,1.833,1.037,3.667,1.557,5.5 c-0.813,0.018-1.611,0.095-2.396,0.213c0.591,2.083,1.181,4.167,1.771,6.25c0.785-0.118,1.584-0.195,2.396-0.213 c0.521,1.833,1.039,3.667,1.56,5.5c-2.07,0.045-4.033,0.473-5.974,0.981c-0.121-0.432-0.243-0.86-0.364-1.291 c-2.018,0.529-4.008,1.15-6.068,1.525c0.217,0.766,0.434,1.529,0.649,2.293c6.101-1.113,11.597-4.371,18.94-1.086 c-1.814-6.416-3.633-12.833-5.449-19.25C29.11,5.128,26.094,5.015,23.227,5.446z M34.833,18.322 c-2.046-0.751-3.95-1.005-5.772-0.964c-0.508-1.792-1.016-3.583-1.521-5.375c1.82-0.041,3.727,0.213,5.771,0.964 C33.817,14.739,34.326,16.53,34.833,18.322z"
                  ></path>
                </g>
              </svg>
              <div class="icontxt uk-text-bold uk-h5 uk-margin-remove">Location</div>
              <div class="uk-text-small icontxtsm uk-visible@s">
                {{ $store.state.site.showroom_address }}
              </div>
            </div>
          </a>
        </div>

        <div>
          <a class="uk-link-reset uk-width-1-1 uk-hidden@l forcelink" title="Call us" :href="`tel:${phone}`">
            <div class="uk-padding-small">
              <svg
                class="fronticon"
                version="1.1"
                width="45px"
                height="45px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                data-svg="receiver"
              >
                <path
                  fill="none"
                  stroke="#1a78e4"
                  stroke-width="1.01"
                  d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"
                ></path>
              </svg>
              <div class="icontxt uk-text-bold uk-h4 uk-margin-small">Call Us</div>
              <div class="uk-text-small icontxtsm uk-visible@s">
                <b>{{ $store.state.site.name }}</b>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
    <MultiSelectSearchNew  class="uk-margin-medium-top"/>
  </div>
</template>
<script>
const MultiSelectSearchNew = () => import(/* webpackPrefetch: true */ "@/components/search/MultiSelectSearchNew");
export default {
  name: "front-search",
  components: {
    MultiSelectSearchNew
  },
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
// .s-wp{
//   background: linear-gradient(to top, rgba(226, 228, 230, 0) 44.12%, rgba(231, 231, 231, 0.24) 65.97%)
//
// }
.home-search {
  padding: 50px 0 10px;
}
.s-wp{
padding: 10px 0 0;
}
@media (min-width: 960px) {
  .s-wp{
    margin-top: 20px;
    border-radius: 20px;
    position: relative;
    z-index: 2;
  }
}
@media (max-width: 960px) {
  .icontxt {
    font-size: 0.7rem;
    line-height: 1.4;
  }
  .uk-text-meta.icontxtsm {
    font-size: 0.575rem;
  }
}
</style>
