export default {
  /* TODO: Redesign entire meta tag processing */

  async metaInfo() {
    const siteName = this.$store.state.site.name;
    let title = siteName;
    let description = this.$route.meta.description;

    const getTitleFromContent = (content) => content?.rendered || title;

    // Use dynamic imports for Lodash functions
    const { isEmpty, has } = await import("lodash");

    if (this.page) {
      title = `${getTitleFromContent(this.page.title)} - ${siteName}`;
      description = getTitleFromContent(this.page.excerpt) || description;
    } else if (!isEmpty(this.variant)) {
      title = `${getTitleFromContent(this.variant.metatitle)} - ${siteName}`;
      description = getTitleFromContent(this.variant.metadesc);
    } else if (!isEmpty(this.vehicle)) {
      title = `${getTitleFromContent(this.vehicle.title)} - ${siteName}`;
      description = getTitleFromContent(this.vehicle.excerpt);
    } else if (this.$route.meta.title) {
      title = `${this.$route.meta.title} - ${siteName}`;
    }

    return {
      title,
      meta: [
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: title },
        { property: "og:site_name", content: `${siteName}` },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
