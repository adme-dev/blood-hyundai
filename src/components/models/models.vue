<template>
<div id="offcanvas-models" uk-modal>
  <button class="uk-modal-close-default uk-close-large uk-text-primary uk-padding-small uk-position-z-index uk-background-default uk-border-pill md-nav-mdls uk-hidden@l" type="button" uk-close></button>

  <div class="offcanvas-models uk-modal-dialog uk-modal-body uk-padding-remove uk-width-1-1 uk-margin uk-border-rounded" uk-overflow-auto>


    <Models />
  </div>
</div>


</div>
</template>

<script>
import Models from "@/components/models/navModels";
export default {
  data: function() {
    return {
      logo: this.$store.state.site.logo,
      siteName: this.$store.state.site.name,
      phoneSales: this.$store.state.site.departments.sales.phone,
      //map_directions: this.$store.state.site.departments.sales.map_directions,
    };
  },
  components: {
    Models
  }
};
</script>
<style>
.md-nav-mdls{
  z-index: 99999
}
@media (min-width: 1200px) {
  .offcanvas-models.uk-modal-dialog {
    padding: 0;
  }
 }
 @media (max-width: 1200px) {
   .model-range-mnu .uk-margin-medium-left.model-wrap{
     margin-left: 0!important;
   }
  }
</style>
