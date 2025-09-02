<template>
  <div>
    <PageSchema />

    <front-slider />

    <front-search/>

    <front-slider-thumbs  class="uk-margin-large-top" />

    <FrontCarsalesFeatured  class="uk-background-secondary"/>

    <post-content v-if="page" :content="page.content.rendered" />
 
    

    <modelSliderNew />

    <carsales-dealer-brand />

    <DealershipReviews class="uk-margin-large-bottom uk-margin-large-top"/>

    <YouTubeWidget></YouTubeWidget>
  </div>
</template>


<script>
import MetaMixin from "@/mixins/meta";
import { PageService } from "@/services";
import lazyLoadComponent from "@/utils/lazyLoad";
import BlockLoading from "@/components/utilities/loading";
//import YouTubeWidget from "@/components/youtube/YouTubeWidget";
const PageSchema = () => import('@/components/page-elements/PageSchema')
const PostContent = () => import('@/components/content/PostContent')
import FrontSlider from "@/components/page-elements/FrontSlider";
const FrontSearch = () => import(/* webpackPrefetch: true */ "@/components/search/FrontSearch");
const DealershipReviews = () => import('@/components/page-elements/DealershipReviews')
export default {
  name: "Home",
  mixins: [MetaMixin],
  components: {
  PageSchema,
  FrontSlider,
  FrontSearch,
  DealershipReviews,
  PostContent,
  FrontSliderThumbs: () => import(/* webpackChunkName: "frontSliderThumbs" */ "@/components/page-elements/FrontSliderThumbs"),
  modelSlider: () => import(/* webpackPrefetch: true */ '@/components/modelSlider/modelSlider'),
  modelSliderNew: () => import(/* webpackPrefetch: true */ '@/components/modelSlider/modelSliderNew'),
  CarsalesDealerBrand: () => import(/* webpackChunkName: "frontCarsalesDealerBrand" */ "@/components/search/CarSales/FrontCarsalesDealerBrand"),
  FrontCarsalesFeatured: () => import(/* webpackChunkName: "frontCarsalesDealerBrand" */ "@/components/search/CarSales/FrontCarsalesFeatured"),
  YouTubeWidget: () => import(/* webpackChunkName: "modelSlider" */ "@/components/youtube/YouTubeWidget"),
},
  data() {
    return {
      page: null,
    };
  },
  mounted() {
    this.getPage("home");
  },
  methods: {
    getPage(pageName) {
      const isPageExists = this.vLodash.findIndex(this.$store.state.viewedPages, (p) => p.name === pageName);
      //console.log(isPageExists);
      if (isPageExists == -1) {
        PageService.getPageBySlug(pageName).then((data) => {
          const viewedPage = { name: pageName, data };
          this.$store.dispatch("setViewedPages", viewedPage);
          this.page = data;
        });
      } else {
        const page = this.vLodash.find(this.$store.state.viewedPages, (p) => p.name === pageName);
        this.page = page.data;
      }
    },
  },
};
</script>
