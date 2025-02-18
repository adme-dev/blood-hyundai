<template>
  <div v-if="showModal" id="global-search-modal" class="uk-flex-top search-modal uk-modal uk-flex uk-open">
    <div class="
          uk-modal-dialog uk-width-1-1 uk-animation-slide-bottom uk-padding-remove
          m-dialog
          uk-border-rounded uk-modal-body uk-margin-auto-vertical 
        ">
      <button
        class="uk-modal-close-outside uk-close-large uk-padding-small uk-border-pill y-bg"
        type="button" uk-close @click="closeGlobalSearchSwitch(null)"></button>
      <div><MultiSelectSearchNew/></div>
    </div>
  </div>
</template>
<script>
const MultiSelectSearchNew = () => import('@/components/search/MultiSelectSearchNew')

export default {
  name: "global-search",
  components: {
    MultiSelectSearchNew
  },
  methods: {
    closeGlobalSearchSwitch(item) {
      this.$store.dispatch("globalSearchSwitch", { show: false, item });
    },

    hideModal() {
      const gsm = this.UIkit.modal("#global-search-modal");
      if (gsm) {
        gsm.hide();
        this.resetSelection();
      }
    },

  },

  computed: {
    showModal() {
      return this.$store.state.globalSearchSwitch.show;
    },
  }
};
</script>
<style>
.el-select-dropdown.el-popper.is-multiple {
  z-index: 9999999999 !important;
}

.m-dialog {
  margin: 10px;
  border-radius: 20px;
  max-width: 1500px !important;
  margin: auto;
}

.m-dialog .front-search-container{
  padding: 20px 0;
}

.m-dialog .front-search {
  padding: 0;
}

.m-dialog .front-search-container {
  max-width: 100%;
  position: relative;
  margin: 0;
}

.search-modal .uk-modal-close-outside {
  margin: 5px;
}

.y-bg{
  color: #000!important;
  background-color: #fff;
}

.search-modal.uk-modal.uk-open {
opacity: 1;
backdrop-filter: blur(8px);
-webkit-backdrop-filter: blur(8px);
}

.search-modal.uk-modal label{
  color: #c6c6c6;
  font-weight: 400;
}

@media (min-width: 960px) {
  .search-modal.uk-modal {
    padding-left: 60px;
    padding-right: 60px;
  }
}

@media (max-width: 960px) {
  .search-modal .uk-modal-close-outside {
    margin: 25px;
  }
}
</style>
