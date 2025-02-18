import isEmpty from "lodash/isEmpty";
import has from "lodash/has";

export default {

  methods: {
    generatePageTitle(siteName) {
      return `${this.page.title.rendered} - ${siteName}`;
    },

    generateVariantTitle(siteName) {
      return `${this.variant.metatitle.rendered} - ${siteName}`;
    },

    generateVehicleTitle(siteName) {
      return `${this.vehicle.title.rendered} - ${siteName}`;
    },
  },

  metaInfo() {
    const siteName = this.$store.state.site.name;
    let title = "";
    let description = "";

    if (this.page) {
      title = this.generatePageTitle(siteName);
      description = this.page.excerpt?.rendered || "";
    } else if (!isEmpty(this.variant) && has(this.variant, "metatitle")) {
      title = this.generateVariantTitle(siteName);
      description = this.variant.metadesc?.rendered || "";
    } else if (!isEmpty(this.vehicle) && has(this.vehicle, "title")) {
      title = this.generateVehicleTitle(siteName);
      description = this.vehicle.excerpt?.rendered || "";
    } else if (!isEmpty(this.$route.meta.title)) {
      title = `${this.$route.meta.title} - ${siteName}`;
    } else {
      title = siteName;
    }

    return {
      title,
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:site_name", content: siteName },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
