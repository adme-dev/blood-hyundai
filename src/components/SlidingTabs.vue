<template>
  <div :class="customClass">
    <div>
        <ul 
          class="tabs-block uk-text-center uk-grid-collapse uk-child-width-expand uk-grid" 
          ref="tabsList"
          :class="{ 'tabs-grid': shouldUseGrid }"
        >
          <div
            class="slider uk-border-pill"
            :style="sliderStyle"
            v-show="!shouldUseGrid"
          ></div>
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            ref="tabItems"
            @click="switchTab(index)"
            :class="{ 
              'active': value === index,
              'grid-item': shouldUseGrid 
            }"
          >
            {{ tab }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SlidingTabs',
    props: {
      tabs: {
        type: Array,
        required: true,
        validator: function(value) {
          return value.length > 0;
        }
      },
      value: {
        type: Number,
        default: 0
      },
      customClass: {  // renamed from 'class' to 'customClass'
      type: [String, Array],  // Changed to accept string or array of strings
      default: ''  // Default to empty string
     }
    },
    data() {
      return {
        sliderPosition: 0,
        sliderWidth: 0,
        isInitialized: false,
        resizeObserver: null,
        windowWidth: window.innerWidth
      }
    },
    computed: {
      shouldUseGrid() {
        return this.windowWidth < 640 && this.tabs.length > 3;
      },
      sliderStyle() {
        return {
          transform: `translateX(${this.sliderPosition}px)`,
          width: this.isInitialized ? `${this.sliderWidth}px` : `${100 / this.tabs.length}%`,
          opacity: this.isInitialized ? 1 : 0
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setupResizeObserver();
        this.calculateSliderDimensions();
        this.isInitialized = true;
        window.addEventListener('resize', this.handleResize);
      });
    },
    beforeDestroy() {
      this.cleanupResizeObserver();
      window.removeEventListener('resize', this.handleResize);
    },
    watch: {
      value: {
        handler() {
          this.$nextTick(() => {
            if (this.isInitialized && !this.shouldUseGrid) {
              this.calculateSliderDimensions();
            }
          });
        }
      },
      tabs: {
        handler() {
          this.$nextTick(() => {
            if (this.isInitialized && !this.shouldUseGrid) {
              this.calculateSliderDimensions();
            }
          });
        }
      }
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
        if (!this.shouldUseGrid) {
          this.$nextTick(() => {
            this.calculateSliderDimensions();
          });
        }
      },
      setupResizeObserver() {
        try {
          this.resizeObserver = new ResizeObserver(
            this.debounce(() => {
              if (this.$refs.tabsList && !this.shouldUseGrid) {
                requestAnimationFrame(() => {
                  this.calculateSliderDimensions();
                });
              }
            }, 100)
          );
          if (this.$refs.tabsList) {
            this.resizeObserver.observe(this.$refs.tabsList);
          }
        } catch (error) {
          console.error('ResizeObserver setup failed:', error);
        }
      },
      cleanupResizeObserver() {
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }
      },
      calculateSliderDimensions() {
        if (!this.$refs.tabItems?.length) return;
        const activeTab = this.$refs.tabItems[this.value];
        if (!activeTab) return;
        this.sliderWidth = activeTab.offsetWidth;
        this.sliderPosition = activeTab.offsetLeft;
      },
      switchTab(index) {
        if (index === this.value) return;
        this.$emit('input', index);
      },
      debounce(fn, delay) {
        let timeoutId;
        return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => fn.apply(this, args), delay);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .tabs-block {
    position: relative;
    display: flex;
    list-style: none;
    padding: 0;
    margin: auto;
    border: 5px solid #fff;
    background: #f7f8f9;
    border-radius: 50px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
  }
  
  .tabs-block.tabs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    padding: 0 8px;
  }
  
  .tabs-block li {
    font-weight: 600;
    padding: 12px 16px;
    cursor: pointer;
    z-index: 1;
    transition: all 0.3s ease;
    color: #000000;
    user-select: none;
    font-size: 14px;
    white-space: nowrap;
  }
  
  .tabs-block li.grid-item {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
    margin: 0;
    white-space: normal;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px;
    font-size: 12px;
    line-height: 1.2;
  }
  
  .tabs-block li.grid-item.active {
    background-color: #1a78e4;
    color: white;
  }
  
  @media (min-width: 640px) {
    .tabs-block li {
      padding: 12px 24px;
      font-size: 16px;
    }
  }
  
  .tabs-block li.active:not(.grid-item) {
    color: white;
  }
  
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #1a78e4;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, width;
  }

  .box .tabs-block, .box .uk-border-pill {
    border-radius: 10px;
  }
  .box .slider {
    background-color: #0f0f0f;
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,.08);
  }
  </style>