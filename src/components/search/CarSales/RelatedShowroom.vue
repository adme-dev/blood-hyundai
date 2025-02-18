<template>
  <div v-if="filteredModel" class="uk-position-relative related-showroom-slider uk-margin-medium-top" uk-slider="autoplay: true; autoplay-interval: 3500; clsActivated: uk-transition-active">
    <ul class="uk-slider-items">
      <li v-for="(item, index) in filteredModel" :key="index">
      <div class="related-showroom uk-padding-small uk-margin-remove uk-flex uk-flex-middle uk-text-left@l uk-text-center uk-width-1-1 uk-grid">
        <div class="uk-width-1-4@l">
          <div>
           <img :data-src="item.model_image" :alt="relatedModel" class="uk-transition-slide-left-small" data-uk-img />
         </div>
        </div>

        <div class="uk-width-expand">
          <div class="uk-transition-fade">
            <h3 class="uk-h3 uk-margin-remove">
              <div class="uk-text-bold">Ready to get a {{ item.title.rendered }}?</div>
            <div v-if="item.caption" class="uk-panel uk-text-small uk-text-muted uk-text-left@l uk-text-center">
              {{ item.caption.split('')
              .splice(0, 150)
              .join('')
              .replace(/<\/?[^>]+(>|$)/g, '') }}...
            </div>
          </h3>
          </div>
        </div>

        <div class="uk-padding-small uk-width-auto@l">
            <div class="uk-transition-fade">
              <a
                class="uk-button uk-button-primary uk-text-bold space33 uk-width-auto border-radius-50"
                :href="`/build/${item.slug}`" style="z-index: 1"
              >
                Discover
              </a>
            </div>
        </div>
      </div>
  </li>
  </ul>
  <div class="ban-nav uk-position-bottom-right uk-margin-small-right">
    <a v-for="(item, index) in filteredModel" :key="index" class="uk-text-xsmall uk-margin-small-right" href="#" :uk-slider-item="index">{{index+1}}</a>
  </div>
</div>
</template>
<script>
export default {
  name: "related-showroom",
  props: {
    relatedModel: {
      type: [Object, String],
      required: true,
    },
  },
  computed: {
    models() {
      return this.$store.state.models;
    },
    filteredModel: function () {
      if (!this.vLodash.isEmpty(this.models)) {
        return this.models.filter(item => {
        //return this.models.filter((vehicles) => this.relatedModel.toLowerCase().includes(vehicles.segment.toLowerCase()));
        return this.relatedModel.toLowerCase().split(' ').every(v => item.title.rendered.toLowerCase().includes(v))
      })
      }
    },
  },
};
</script>

<style scoped>
.related-showroom-slider{
box-shadow: 0px 1px 3px rgb(170 170 170 / 30%);
overflow: hidden;
border-radius: 5px;
z-index: 2;
}
.ban-nav .uk-active{
  font-weight: 900
}
.related-showroom-slider li.uk-active{
    background: linear-gradient(123deg,#fff,#fff 35%,#f6f6f6 0,#f9f9f9);

}
@media (min-width: 1200px) {
  .related-showroom-slider li.uk-active{
    background: linear-gradient(123deg,#fff,#fff 15%,#f6f6f6 0,#f9f9f9);
  }
  .related-showroom-content {
    font-size: 12px;
  }
}
</style>
