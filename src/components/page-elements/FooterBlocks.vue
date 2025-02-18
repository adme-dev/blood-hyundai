<template>
<div v-if="footer_blocks" class="footer-blocks uk-background-default">

  <div class="uk-container">
  <div class="uk-margin-large-bottom uk-margin-large-top uk-child-width-1-1 uk-grid uk-grid-stack">
  <div class="uk-width-1-1@m">
   <h3 class="uk-h1 uk-text-center">Experience better<br class="uk-visible@l"> with {{siteName}}.</h3>
     <div class="uk-panel uk-margin uk-width-xlarge uk-margin-auto uk-text-center">No matter what you need, our experienced staff are here to help. <br>Visit {{siteName}} today!</div>
      </div>
    </div>
  </div>

  <div class="uk-grid-collapse uk-child-width-1-1 uk-child-width-1-2@s uk-grid">
    <div v-for="(block, index) in footer_blocks" :key="index">
      <div class="uk-inline-clip uk-width-1-1">
           <router-link :to="block.link" class="uk-link-reset" :title="block.heading_content">
             <img
             :data-src="`${block.slides}?width=900&auto_optimize=medium`"
             width="900" height="900"
             class="uk-width-1-1" :alt="block.heading_content" loading="lazy" uk-img>
              <div class="uk-position-top uk-position-large" :class="[block.text_contrast == 'uk-light' ? 'uk-light' : '']">
               <div class="uk-text-center uk-text-bold">
                   <div class="uk-margin-remove-bottom uk-h2 uk-margin-remove-adjacent uk-text-bold">
                     {{ block.heading_content }}
                   </div>
                   <div class="sub-text">{{ block.sub_heading }}</div>
                   <div>
                     <router-link :to="block.link" :title="block.heading_content" class="thumb-link uk-button uk-button-text">
                       {{block.button}}
                       <span uk-icon="icon: chevron-right"></span>
                     </router-link>
                   </div>
              </div>
           </div>
         </router-link>
      </div>
   </div>
  </div>
</div>
</template>
<script>
import { isDateInRange } from "@/utils";
export default {
  name: "footer-blocks",
  data: function () {
    return {
      siteName: this.$store.state.site.name,
    };
  },
  computed: {
    footer_blocks() {
      const slides = this.$store.state.site.promotional[0].footerblocks;
      return slides ? slides.filter((comp) => isDateInRange(comp.start, comp.end)) : "";
    },
  },
};
</script>
<style lang="css" scoped>
/* .footer-blocks .uk-light .uk-h2{
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.52);
} */
.footer-blocks .uk-light .sub-text, .footer-blocks .uk-light .uk-h2, .footer-blocks .uk-light a.thumb-link.uk-button-text{
  color:#fff!important
}
</style>
