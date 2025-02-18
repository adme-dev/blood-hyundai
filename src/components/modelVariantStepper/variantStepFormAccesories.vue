<template>
  <div class="modal-step-accesories uk-padding-remove uk-modal uk-open" :class="[show ? 'uk-display-block' : '' ]">
    <div class="accesories-modal-body uk-width-1-1 uk-height-1-1 uk-margin-auto-left uk-background-default uk-padding-remove uk-animation-slide-right">

      <a
        class="uk-flex uk-flex-middle view-form-header stickytop uk-padding-small uk-background-muted"
        @click="close"
      >
        <div class="uk-link-heading">
          <span class="icon-back" uk-icon="icon: arrow-left; ratio: 2"></span>
          <span>Back</span>
        </div>
        <span class="uk-margin-auto-right uk-hidden">
          <div class="uk-link-heading">
            <span class="icon-enquire" uk-icon="icon: close; ratio: 1.5" @click="close"></span>
          </div>
        </span>
      </a>


    <div class="uk-padding-small uk-background-default">

    <h5 class="uk-padding-small">{{title}}</h5>

    <div v-if="variant_accessories.length < 1">
      <div class="uk-flex uk-flex-center uk-height-small">
        <div class="uk-margin-auto uk-margin-auto-vertical">
          <div uk-spinner></div>
        </div>
      </div>
    </div>

   <Accessories v-else :accessories="variant_accessories"></Accessories>

   </div>

   </div>
  </div>
</template>
<script>
import Accessories from "@/components/accessories/Accessories";
import { AccessoriesService } from "@/services";
export default {
  name: "step-form-accesories",
  props: ['itemid','show', 'model', 'title'],
  data() {
    return {
     variant_accessories:[]
    };
  },
  mounted() {
    this.setVariantAccessories();

  },
  watch: {
    itemid(val) {
      this.setVariantAccessories(val);
    },
  },
  computed: {
    // getModel: function() {
    //   return this.itemModel.split('-dual-cab').join('');
    //   //console.log(this.isModalVisible)
    // },
  },
  methods: {

    async setVariantAccessories(slug) {

      if (['triton-dual-cab', 'triton-club-cab', 'triton-single-cab'].indexOf(this.$route.params.slug) > -1){
        this.variant_accessories = await AccessoriesService.getAccessoriesByModel('triton').then((data) => {
          return data;
        });
      } else {
        this.variant_accessories = await AccessoriesService.getAccessoriesByModel(this.model).then((data) => {
          return data;
        });
      }

    },
    close() {
      this.$emit("close");
    },
  },
  components: { Accessories },
};
</script>
<style scoped>
.accesories-modal-body {
  width: 460px;
}
.modal-step-accesories {
  background: rgba(0, 0, 0, 0.18);
  transition: opacity 0.1s linear;
}
/* .accesories-modal-body .uk-h3.uk-text-bold{
  margin-left: 20px
} */
</style>
