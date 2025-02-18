<template>
<div>
<div id="modal-call" class="uk-flex-top uk-padding-remove" uk-modal>
  <div class="uk-modal-dialog uk-modal-body uk-animation-slide-bottom uk-width-large uk-margin-auto-vertical uk-margin-remove-bottom uk-border-rounded border-rounded-bottom-none">

    <h2 class="uk-h4 uk-text-center uk-text-bold uk-text-primary">Contact {{siteName}}</h2>

      <button class="uk-modal-close-default uk-close-large uk-text-secondary" type="button" uk-close></button>

      <div class="uk-grid-small uk-margin-small-top uk-child-width-1-1 uk-text-center uk-animation-fade uk-grid uk-grid-stack uk-grid">

      <div class="uk-margin-small-bottom">
        <p class="uk-text-super uk-margin-small-bottom uk-text-bold text-blue">Sales Department</p>
        <a itemprop="telephone" :href="`tel:${phoneSales.replace(/[^A-Z0-9]+/gi, '')}`" class="forcelink uk-inline-clip uk-text-bold uk-button uk-button-primary uk-width-1-1 tm-button-default uk-icon">
        <span class="uk-position-center-left uk-margin-small-left" uk-icon="receiver">
        </span> {{phoneSales}}
        </a>
      </div>

      <div class="uk-first-column">
        <p class="uk-text-super uk-margin-small-bottom uk-text-bold text-blue">Service Department</p>
        <a :href="`tel:${phoneService.replace(/[^A-Z0-9]+/gi, '')}`" class="forcelink uk-inline-clip uk-text-bold uk-button uk-button-primary uk-width-1-1 tm-button-default uk-icon">
        <span class="uk-position-center-left uk-margin-small-left" uk-icon="receiver">
        </span> {{phoneService}}
        </a>
      </div>

      <div class="uk-margin-medium-top">
        <div class="uk-text-super uk-text-bold uk-margin-small-bottom text-blue">{{address}}</div>
        <a :href="map_directions" class="text-blue uk-inline-clip uk-text-bold uk-button uk-button-default uk-width-1-1 tm-button-default uk-icon" target="_blank">
        <span class="text-blue uk-position-center-left uk-icon-button icon-qc uk-icon uk-background-default" uk-icon="location">
        </span> Directions
        </a>
      </div>

      </div>

  </div>

 </div>
</div>
</template>
<script>
export default {
  name: "call-quick-links",
  data: function () {
    return {
      logo: this.$store.state.site.logo,
      phoneSales: this.$store.state.site.departments.sales.phone,
      phoneService: this.$store.state.site.departments.service.phone,
      siteName: this.$store.state.site.name,
      address: this.$store.state.site.showroom_address,
      map_directions: this.$store.state.site.map_directions,
    };
  },
};
</script>
<style scoped>
.controlpanel {
  top: 35%;
  right: 0;
  font-size: 12px;
  width: 80px;
  padding: 7px;
  transform: translateX(0);
  transition: 0.3s ease-out;
  z-index: 7;
}
.control-panel-container {
  padding: 10px 5px;
  border-radius: 5px;
  background-color: #002c5f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.controlpanel a {
  line-height: 14px;
  margin: 10px 0;
  display: block;
}
.controlpanel-hide {
  transform: translateX(150px);
}
</style>
