<template>
  <div class="uk-position-relative" @click="handleThumbnailClick">
    <div
      class="thumbnail-image"
      :data-src="thumbnailSrc"
      uk-img="loading: eager"
    >
      <!-- Photo Count Badge -->
      <span class="uk-position-bottom-left uk-position-small uk-light photo-count">
        <span uk-icon="camera"></span>
        <span class="count-text">{{ photoCount }}</span>
      </span>

      <!-- CarSales Badge -->
      <div v-if="shouldShowBadge" class="uk-position-bottom-right badge-container">
        <picture>
          <source
            media="(max-width: 799px)"
            :data-src="carsalesBadge.small"
            uk-img
          >
          <img
            :data-src="carsalesBadge.default"
            class="badge-image"
            alt="Used car sales"
            uk-img
          >
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
const DEFAULT_IMAGE = 'https://driveagent.b-cdn.net/files/shared/comingsoon.jpg';

export default {
  name: 'GalleryThumbnail',

  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) => {
        return Array.isArray(item?.photos);
      }
    },
    showGallery: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click', 'update:showGallery'],

  computed: {
    thumbnailSrc() {
      // Use the thumbnail if it exists, otherwise use the first photo, otherwise use the default image
      return this.item.thumb || this.item.photos?.[0] || DEFAULT_IMAGE;
    },

    photoCount() {
      return this.item.photos?.length || 0;
    },

    hasCarSalesBadge() {
      const promotional = this.$store.state.site.promotional[0];
      return promotional?.carsales?.carsalesbadge;
    },

    isUsedCar() {
      return this.item.condition?.displayValue[0] === 'Used';
    },

    shouldShowBadge() {
      return this.hasCarSalesBadge && this.isUsedCar;
    },

    carsalesBadge() {
      if (!this.hasCarSalesBadge) {
        return { default: '', small: '' };
      }
      const { carsales } = this.$store.state.site.promotional[0];
      return {
        default: carsales.carsalesbadge,
        small: carsales.carsalesbadgeSmall
      };
    }
  },

  methods: {
    handleThumbnailClick() {
      // Prevent multiple rapid clicks
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout);
      }

      this.clickTimeout = setTimeout(() => {
        // Emit click event first
        this.$emit('click');

        // Trigger the enquiry modal
        this.$store.dispatch("vehicleEnquiryPopUp", {
          show: true,
          item: this.item
        });

        // Update gallery visibility if needed
        if (this.showGallery !== undefined) {
          this.$emit('update:showGallery', true);
        }

        this.clickTimeout = null;
      }, 300); // Debounce time
    }
  },

  beforeUnmount() {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
  },

  data() {
    return {
      clickTimeout: null
    };
  }
};
</script>

<style scoped>
.thumbnail-image {
  aspect-ratio: 494/325;
  width: 100%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.thumbnail-image:hover {
  transform: scale(1.02);
}

.photo-count {
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
  z-index: 1;
}

.count-text {
  min-width: 1rem;
  text-align: center;
}

.badge-container {
  padding: 8px;
  z-index: 1;
}

.badge-image {
  max-width: 80px;
  height: auto;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.badge-image:hover {
  opacity: 1;
}
</style>