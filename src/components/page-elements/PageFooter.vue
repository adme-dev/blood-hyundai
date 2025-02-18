<template>
  <div class="uk-background-secondary uk-position-relative">
    <div><footer-blocks /></div>
    <div><google-reviews /></div>

    
     <div class="uk-width-1-1 uk-inline-clip background-black uk-light">
       <img :src="footerbanner.image" :title="footerbanner.title" loading="lazy" uk-cover style="opacity: .2;">
           <div class="uk-padding-small">
             <div class="uk-panel uk-padding uk-margin-remove-first-child">
             <div class="uk-h2 uk-margin-top uk-margin-remove-bottom">{{footerbanner.title}}</div>
             <div class="uk-panel uk-margin-small-top uk-text-emphasis">{{footerbanner.content}}</div>
             <div class="uk-margin-top"><a :href="footerbanner.link" class="uk-button uk-button-default tm-button-default">{{footerbanner.button}}</a></div>
        </div>
      </div>
    </div>
    <div><footer-links /></div>

    <page-pop-up v-if="showPagePopup"/>

    <!-- preloader -->
    <div class="preloader uk-position-fixed uk-overlay-primary uk-position-cover">
      <div class="uk-position-center">
        <span uk-spinner="ratio: 2"></span>
      </div>
    </div>

    <!-- <div
      class="preloader-2 uk-position-fixed uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle"
      v-show="loading"
    >
    <div class="uk-position-center">
      <span uk-spinner="ratio: 2"></span>
     </div>
    </div> -->

  </div>
</template>
<script>
const FooterBlocks = () => import('@/components/page-elements/FooterBlocks')
const FooterLinks = () => import('@/components/page-elements/FooterLinks')
const PagePopUp = () => import('@/components/page-elements/PagePopUp')
import { isDateInRange } from "@/utils";
import { getStaticContent } from "@/services";
import lazyLoadComponent from "@/utils/lazyLoad";
import BlockLoading from "@/components/utilities/loading";
export default {
  name: "page-footer",
  components: {
    FooterBlocks,
    PagePopUp,
    FooterLinks,
    GoogleReviews: lazyLoadComponent({
    componentFactory: () => import(/* webpackChunkName: "pageFooter" */ "@/components/google-reviews/GoogleReviews"),
    loading: BlockLoading,
  }),
 },
  data() {
    return {
      showPagePopup:true,
      footerbanner: this.$store.state.site.promotional[0].footerbanner[0],
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.showPagePopup = isDateInRange(this.$store.state.site.popUp[0]?.start,this.$store.state.site.popUp[0]?.end)
  }
};
</script>
