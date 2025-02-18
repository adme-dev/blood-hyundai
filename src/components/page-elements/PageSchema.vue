<template>
  <div v-if="places"></div>
</template>

<script>
export default {
  name: "PageSchema",
  metaInfo() {
    if (!this.places) return {};

    return {
      script: [
        {
          type: 'application/ld+json',
          json: this.jsonld()
        }
      ]
    };
  },
  data: function () {
    return {
      logo: this.$store.state.site.logo,
      description: this.$store.state.site.description,
    };
  },
  computed: {
    places() {
      return this.$store.state.getGoogleReviews.googlereviews.result;
    },
    social() {
      return this.$store.state.site.social;
    },
  },
  methods: {

    getBusinessHours(current_opening_hours) {
      if (!current_opening_hours || !current_opening_hours.periods) {
        return "";
      }

      const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
      const hours = current_opening_hours.periods.map(period => {
        const openDay = days[period.open.day];
        const openTime = period.open.time;
        const closeTime = period.close.time;
        return `${openDay} ${openTime}-${closeTime}`;
      });

      return hours.join(", ");
    },
    jsonld() {
      const baseSchema = {
        "@context": "https://schema.org/",
        "@type": "AutoDealer",
        name: this.places?.name,
        description: this.description,
        image: this.places?.photos[0]?.photo_reference,
        url: this.places?.website,
        logo: this.logo,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${this.places?.address_components[0]?.long_name} ${this.places?.address_components[1]?.long_name}`,
          addressLocality: this.places?.address_components[2]?.long_name,
          addressRegion: this.places?.address_components[4]?.short_name,
          addressCountry: this.places?.address_components[5]?.short_name,
          postalCode: this.places?.address_components[6]?.long_name,
        },
        telephone: this.places?.formatted_phone_number,
        geo: {
          "@type": "GeoCoordinates",
          latitude: this.places?.geometry?.location?.lat,
          longitude: this.places?.geometry?.location?.lng,
        },
        openingHours: this.places?.current_opening_hours?.weekday_text,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: this.places?.rating,
          reviewCount: this.places?.user_ratings_total,
        },
        sameAs: [
          this.social?.youtube,
          this.social?.linkedin,
          this.social?.instagram
        ].filter(Boolean),

      };

      // Add top 5 reviews directly to the main schema, not nested in aggregateRating
      if (this.places?.reviews) {
        baseSchema.review = this.places?.reviews.slice(0, 5).map(review => ({
          "@type": "Review",
          author: review.author_name,
          datePublished: new Date(review.time * 1000).toISOString(),
          description: review.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating
          }
        }));
      }

      return baseSchema;
    }


  },
  watch: {
    places: {
      immediate: true,
      handler() {
        this.$meta().refresh();
      }
    }
  }
};
</script>
