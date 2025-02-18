<template>
  <div>
    <div id="openPayWidget"></div>
  </div>
</template>

<script>
import MetaMixin from "@/mixins/meta";
import { PageService } from "@/services";
export default {
  name: "open-pay",
  mixins: [MetaMixin],
  data() {
    return {
      page: null,
    };
  },
  mounted() {

    let opyElement = document.createElement("opy-landing-page");
    document.getElementById("openPayWidget").innerHTML = "<opy-landing-page></opy-landing-page>";
    var scripts = [
      "https://widgets.openpay.com.au/lib/openpay-widgets.min.js",
      // "js/another.js"
    ];
    scripts.forEach((script) => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.body.appendChild(tag);
    });
    setTimeout(() => {

      OpenpayWidgets.Config({
      region: "AU",
      currency: "$",
      planTiers: [2, 3, 4, 6, 12],
      minEligibleAmount: 1,
      maxEligibleAmount: 5000,
      type: "Instore"
      });
    }, 1000);
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        //console.log("newValue", newValue);
        this.getPage(newValue.slug);
      },
      immediate: true,
    },
  },
  methods: {
    getPage(pageName) {
      const isPageExists = this.vLodash.findIndex(
        this.$store.state.viewedPages,
        (p) => p.name === pageName
      );
      //console.log(isPageExists);
      if (isPageExists == -1) {
        PageService.getPageBySlug(pageName).then((data) => {
          const viewedPage = { name: pageName, data };
          this.$store.dispatch("setViewedPages", viewedPage);
          this.page = data;
        });
      } else {
        const page = this.vLodash.find(this.$store.state.viewedPages, (p) => p.name === pageName);
        this.page = page.data;
      }
    },
  },
};
</script>
