<template>
  <div v-if="showPopup" id="alert-center" class="alert-center" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-padding-remove uk-border-rounded">
      <button
        class="uk-close-large uk-modal-close-default uk-padding-small uk-overlay-primary uk-position-top-right"
        type="button"
        uk-close
      ></button>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
import UIkit from "uikit";

export default {
  name: "page-pop-up",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    showPopup() {
      return this.$store.state.site.popUp.length > 0;
    },
  },
  watch: {
    showPopup: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.content = this.$store.state.site.popUp[0].content;
          setTimeout(() => {
            this.loadPopUp();
          }, 3500);
        }
      },
    },
  },
  methods: {
    loadPopUp() {
      const sitePages = this.$store.state.site.popUp[0].sitePages;
      const currentPage = this.$route.name === "page" ? this.$route.params.slug : this.$route.name;
      if (sitePages.includes(currentPage)) this.UIkit.modal("#alert-center").show();
    },
  },
};
</script>
