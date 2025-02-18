<template>
    <div v-if="isLoaded" class="uk-inline-clip" @mouseover="hover = false">
      <div class="uk-360-svg uk-visible@s" v-if="hover">
          <svg width="182" height="34" version="1.1" class="rotate-svg uk-visible@s" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          	 viewBox="0 0 2122 461.9" style="enable-background:new 0 0 2122 461.9;" xml:space="preserve">
          <g>
          	<path fill="#c8c8c8" d="M1061,361.5c62.3,0,113.1-50.2,113.1-112.4c0-31-12.8-59.4-33.2-79.6c-20.4-20.3-48.8-32.8-79.9-32.8
          		c-31.1,0-59.5,12.5-79.9,32.8c-20.5,20.2-33.2,48.6-33.2,79.6c0,31,12.8,59.3,33.2,79.6C1001.5,348.9,1029.9,361.5,1061,361.5z
          		 M1022,210.7c10-9.9,23.7-16,39-16c15.4,0,29,6.1,39.1,16c10,10,16,23.3,16,38.4c0,15-6,28.4-16.1,38.4c-10,9.9-23.7,16-39,16
          		c-15.4,0-29-6.1-39-16c-10-10-16-23.3-16-38.4C1005.9,234,1012,220.7,1022,210.7z"/>
          	<path fill="#c8c8c8" d="M559.1,249.1c0-13.7-11.1-24.7-24.7-24.7H156.5l21.7-17.7c10.6-8.6,12.1-24.2,3.5-34.8
          		c-8.6-10.6-24.2-12.1-34.8-3.5L71.6,230c-5.7,4.7-9.1,11.7-9.1,19.1c0,7.4,3.3,14.4,9.1,19.1l75.4,61.6c10.6,8.6,26.1,7.1,34.8-3.5
          		c8.6-10.6,7.1-26.1-3.5-34.8l-21.7-17.7h377.8C548,273.8,559.1,262.8,559.1,249.1z"/>
          	<path fill="#c8c8c8" d="M1916.9,326.3c8.6,10.6,24.2,12.2,34.8,3.5l75.4-61.6c5.7-4.7,9.1-11.7,9.1-19.1c0-7.4-3.3-14.5-9.1-19.1
          		l-75.4-61.6c-10.6-8.6-26.1-7.1-34.8,3.5c-8.6,10.6-7.1,26.1,3.5,34.8h0l21.7,17.7h-377.8c-13.7,0-24.7,11.1-24.7,24.7
          		c0,13.7,11.1,24.7,24.7,24.7h377.8l-21.7,17.7C1909.8,300.2,1908.3,315.7,1916.9,326.3z"/>
          </g>
          </svg>
      </div>
      <img
      draggable="false"
      :src="carousel.currentPath"
      :class="imageClass"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      @touchend="handleTouchEnd"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      width="1130"
      height="636"
      loading="lazy"
    />
  </div>
 <div class="vue-product-360__loading" v-else></div>
</template>
<script>
function ImagesLoader(images) {
  const promises = [];
  if (images) {
    images.map((src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onabort = () => reject(src);
      img.onerror = () => reject(src);
    }));
  }
  //console.log(Promise.all(promises));
  return Promise.all(promises);
}

export default {
props: {
  images: {
      type: Array,
      required: true,
        },
  imageClass: {
      type: String,
      default: null,
    },
    speed: {
      type: Number,
      default: 5,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    keepPosition: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isLoaded: false,
    hover: true,
    carousel: {
      current: 0,
      currentPath: null,
    },
    mouse: {
      isMoving: true, // false
      savedPositionX: 0,
      currentPositionX: 0,
    },
  }),
  beforeMount() {
    this.$emit('loading');
    this.handleLoading().then(() => {
      this.$emit('loaded');
    });
  },
  created() {
    this.carousel.currentPath = this.images[this.carousel.current];
  },
  methods: {
    handleLoading() {
      return ImagesLoader(this.images).then(() => {
        this.isLoaded = true;
      });
    },
    handleMouseUp() {
      this.mouse.isMoving = true; // false
      this.$emit('stopping', { position: this.carousel.current });
    },
    handleMouseLeave() {
      if (this.mouse.isMoving) {
        this.mouse.isMoving = true; // false
        this.$emit('stopping', { position: this.carousel.current });
      }
    },
    handleMouseDown(event) {
      if (!this.disabled) {
        this.mouse.savedPositionX = event.pageX;
        this.mouse.isMoving = true;
        this.$emit('starting', { position: this.carousel.current });
      }
    },
    handleTouchStart(event) {
      event.preventDefault();
      if (!this.disabled) {
        this.mouse.savedPositionX = event.touches[0].pageX;
        this.mouse.isMoving = true;
        this.$emit('starting');
      }
    },
    handleTouchEnd() {
      this.mouse.isMoving = false;
      this.$emit('stopping');
    },
    handleTouchMove(event) {
      event.preventDefault();
      this.handleMovement(event.touches[0].pageX);
    },
    handleMouseMove(event) {
      this.handleMovement(event.pageX);
    },
    handleMovement(currentPosition) {
      if (this.mouse.isMoving) {
        this.mouse.currentPositionX = currentPosition;
        const distance = this.mouse.currentPositionX - this.mouse.savedPositionX;
        if (Math.abs(distance) > this.speed) {
          this.mouse.savedPositionX = this.mouse.currentPositionX;
          if ((distance > 0 && !this.reverse) || (distance < 0 && this.reverse)) {
            this.slideToRight();
          } else {
            this.slideToLeft();
          }
        }
      }
    },
    slideToRight() {
      if (this.carousel.current < this.images.length) {
        this.carousel.current += 1;
        this.carousel.currentPath = this.images[this.carousel.current - 1];
      } else if (this.infinite) {
        this.carousel.current = 0;
        this.carousel.currentPath = this.images[this.carousel.current];
      }
    },
    slideToLeft() {
      if (this.carousel.current > 1) {
        this.carousel.current -= 1;
        this.carousel.currentPath = this.images[this.carousel.current - 1];
      } else if (this.infinite) {
        this.carousel.current = this.images.length;
        this.carousel.currentPath = this.images[this.carousel.current - 1];
      }
    },
    slideTo(position) {
      if (this.images[position]) {
        this.carousel.current = position;
        this.carousel.currentPath = this.images[position === 0 ? position : position - 1];
      }
    },
  },
  watch: {
    images: {
      handler() {
        this.$emit('refreshing');
        this.handleLoading().then(() => {
          const positionExist = this.images[this.carousel.current];
          if (this.keepPosition && positionExist) {
            this.slideTo(this.carousel.current);
          } else {
            this.slideTo(0);
          }
          this.$emit('refreshed');
        });
      },
    },
  }
}
</script>
