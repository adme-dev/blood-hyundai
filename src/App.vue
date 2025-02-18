<template>
  <div id="app" class="loading-indicator">
    <layout-default />
  </div>
</template>

<style lang="css">
@import "~uikit/dist/css/uikit.css";
@import "./assets/styles/App.scss";
</style>

<script>
import layoutDefault from "./layouts/Default";
import axios from "axios";

export default {
  components: { layoutDefault },
  
  data() {
    return {
      // Cache regex patterns
      externalLinkPattern: /^(?:https?:)?\/\//,
      blankTargetPattern: /\b_blank\b/i
    };
  },

  methods: {
    handleLink(event) {
      const target = event.target.closest('a');
      
      if (!this.isValidLink(target, event)) {
        return;
      }

      const href = target.getAttribute('href');
      if (!href) return;

      // Skip if same page
      if (window.location.pathname === href) {
        return;
      }

      // Prevent default first
      event.preventDefault();

      // Handle dropdowns with a slight delay to allow proper cleanup
      this.$nextTick(() => {
        // Queue the dropdown hiding and navigation in the next tick
        const dropdowns = document.querySelectorAll('.uk-navbar-dropdown.uk-open, .main-nav-dropdown.uk-open');
        
        if (dropdowns.length) {
          // Hide all dropdowns using UIkit's API
          dropdowns.forEach(dropdown => {
            const drop = this.UIkit.drop(dropdown);
            if (drop) {
              drop.hide(0);
            }
          });

          // Wait a tiny bit for UIkit to clean up, then navigate
          setTimeout(() => {
            this.$router.push(href).then(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
          }, 50);
        } else {
          // If no dropdowns, navigate immediately
          this.$router.push(href).then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      });
    },

    isValidLink(target, event) {
      if (!target || !target.hasAttribute('href')) return false;
      
      const href = target.getAttribute('href');
      
      // Quick checks first
      if (!href) return false;
      if (target.classList.contains("forcelink")) return false;
      if (event.button !== undefined && event.button !== 0) return false;
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return false;
      if (event.defaultPrevented) return false;

      // Allow internal links (starting with /)
      if (href.startsWith('/')) return true;
      
      // Check if it's an external link
      if (this.externalLinkPattern.test(href)) return false;
      
      // Check for javascript: and tel: protocols
      if (href.startsWith('javascript:') || href.startsWith('tel:')) return false;

      // Check for target="_blank"
      if (target.getAttribute && this.blankTargetPattern.test(target.getAttribute("target"))) {
        return false;
      }

      return true;
    }
  },

  mounted() {
    // Initial data loading
    Promise.all([
      this.$store.dispatch("fetchInitialData"),
      this.$store.dispatch("getModels"),
      this.$store.dispatch("fetchGoogleReviews")
    ]).then(() => {
      this.$store.dispatch("setLoading", false);
    });

    // Delegate click handling to document level
    document.addEventListener("click", this.handleLink.bind(this));
  },

  beforeDestroy() {
    // Clean up event listener
    document.removeEventListener("click", this.handleLink);
  }
};
</script>
