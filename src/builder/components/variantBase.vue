<template>
  <div>
    <div>

      <div id="rototator-modal" class="rototator-modal uk-position-relative">
        <!-- <button class="uk-modal-close-default" type="button" uk-close @click="enlargeRemove"></button> -->

        <img :src="buttonColour || variant.colours[0].images" class="uk-width-expand uk-animation-fade" />

        <div class=" uk-grid-collapse uk-child-width-1-1 uk-text-center uk-margin-medium-top" uk-grid>

           <div><h5 class="uk-text-meta uk-text-uppercase">COLOUR: {{ selectedColourName || colourName || variant.colours[0].colour_name}}</h5></div>


          <div class="uk-width-auto uk-margin-auto">
           <ul
             class="uk-grid-small uk-child-width-auto view-colours variant-colours-items uk-padding uk-flex uk-flex-center uk-grid"
           >
               <li v-for="(colours, index) in uniqColours(variant.colours)" :key="index">
                 <a href="#"
                 @click.prevent="
                 buttonColour = colours.images,
                 colourName = colours.colour_name,
                 changePrice = parseInt(variant.price) + paintPrice(colours.paint_price),
                 emitColourImage(colours.images, colours.colour_name)
                 "
                 ><div
                   class="uk-border-circle uk-background-cover"
                    :style="{ 'background-image': 'url(' + colours.swatch_colour_ + ')' }"
                 ></div
                 ></a>
               </li><!-- {{colours.images_360}} -->
            </ul>
        </div>
      </div>
<!-- <button @click="enlargeRotator" type="button">enlarge</button> -->
   </div>

        <div>
          <div class="uk-child-width-expand@l uk-grid-collapse uk-background-default" uk-grid>

              <div class="uk-padding-small">
                <div>

                  <div class="uk-text-meta">{{ variant.model.displayValue[0] }}</div>
                  <h3 class="uk-h3 uk-margin-remove uk-text-bold" v-html="variant.title"></h3>
                  <div>{{ variant.short_desc }}</div>

                  <div>
                    <h4 v-if="variant.offer_title" class="uk-h3 uk-margin-remove uk-text-light">
                      {{ variant.offer_title }}
                    </h4>
                    <h6 v-if="variant.offer_sub" class="uk-h6 uk-text-light uk-margin-remove" v-html="variant.offer_sub"></h6>
                  </div>


                  <div v-if="variant.price && changePrice" class="uk-margin-small-top">
                    <div class="uk-text-small uk-text-light uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup></div>
                    <div class="uk-h2 uk-text-bold uk-margin-remove">
                      ${{ changePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
                    </div>
                  </div>

                  <div v-else-if="variant.price" class="uk-margin-small-top">
                    <div class="uk-text-small uk-text-light uk-text-emphasis">DRIVE AWAY FROM<sup>*</sup></div>
                    <div class="uk-h2 uk-text-bold uk-margin-remove">
                      ${{ parseInt(variant.price) + paintPrice( variant.colours[0].paint_price) | formatPrice }}
                    </div>
                  </div>

                  <div v-if="strippedHtml().length" class="offer-box uk-box-shadow-small uk-padding-small uk-margin-small-top">
                    <div class="uk-text-bold stag uk-text-left text-blue">BONUS OFFER</div>
                    <div class="text-blue uk-text-small uk-text-bold uk-text-italic" v-html="variant.offer"></div>
                    <div class="offer-end"></div>
                  </div>
                  <div v-else class="offer-box">
                    <div class="uk-text-small uk-text-light uk-text-left uk-margin-small-top">
                      There are currently no Bonus Offers available for
                      {{ variant.title }}. Please contact us to discuss your options.
                    </div>
                  </div>


                  <div v-if="variant.price" class="uk-margin-small">
                    <div class="uk-text-meta-xs uk-width-expand uk-margin-small">
                      <sup>*</sup>There may be a delay to any pricing updates displaying correctly on our materials. Always obtain
                      confirmation on updated pricing from {{ siteName }}. All prices are subject to change at the discretion of
                      {{ siteName }}.
                    </div>
                    <button
                    @click="
                      isModalVisible = true;
                      loadModalCalculator();
                    "
                      class="uk-width-auto uk-button uk-button-default uk-border-pill uk-text-danger uk-text-bold"
                      ><span uk-icon="icon: info; ratio: 0.9"></span> Finance Calculator</button
                    >
                  </div>
                  <div v-else class="uk-margin-small-top">
                    <div class="uk-text-small uk-text-bold uk-text-emphasis">CONTACT US</div>
                    <div class="uk-h2 uk-margin-remove uk-text-bold text-blue">P.O.A</div>
                  </div>
                </div>
                <div class="uk-margin-small-top">
                  <button
                  @click="
                    isModalVisible = true;
                    loadModalVisible();
                  "
                    class="uk-width-auto uk-button uk-button-primary uk-margin-small-top"
                    >Book a test drive / Enquire</button
                  >
               </div>
              </div>

            <div>
              <div class="uk-card uk-padding-small">
                <div>
                  <div v-if="variant.features">
                   <div class="uk-h4 uk-text-uppercase uk-margin-small-top space33">Key Features</div>
                   <div class="uk-text-left uk-text-small">
                    <ul class="v-features" v-html="formatBullet(variant.features)"></ul>
                   </div>
                  </div>
                  <div class="uk-width-1-1 uk-text-left">
                    <router-link
                    :to="'/vehicle/' + variant.model.value[0] + ''"
                    class="
                      uk-button
                      uk-button-text
                      uk-text-bold
                    "
                    >Discover more <span uk-icon="icon: chevron-right"></span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="uk-padding-small" v-if="variant.specification">

          <ul uk-accordion>
            <li class="uk-background-muted uk-padding-small">
                <a class="uk-accordion-title" href="#">FULL Specification <div class="uk-text-xsmall">{{variant.title}}</div> </a>
                <div class="uk-accordion-content">

                 <ul class="uk-list uk-list-striped uk-grid-small">
                   <li v-for="(item, index) in variant.specification" :key="item.id">
                    <div class="uk-margin-small-bottom">
                      <h5 class="uk-text-bold uk-text-uppercase uk-margin-small-top">{{item.specification_label}}</h5>
                    <div v-for="(item, index) in item.specification" :key="item.id">
                     <p class="uk-text-small uk-margin-small"><span v-if="item.label">{{item.label}}:</span> {{item.value}}</p>
                    </div>
                  </div>
                  </li>
                 </ul>


             </div>
           </li>
        </ul>
      </div>

      <YouTubeRelated :model="variant.model.displayValue[0] + ' ' + variant.variant.displayValue[0]" :title="variant.model.displayValue[0]" :key="$route.params.slug" />


        <div class="uk-padding-small">
          <div v-if="variant.disclaimer" class="uk-text-meta-xs uk-text-justify" v-html="variant.disclaimer"></div>

          <div v-if="variant.offer_disclaimer" class="uk-text-meta-xs uk-margin-small-top uk-text-justify" v-html="variant.offer_disclaimer"></div>
       </div>

        <OffersRelated :model="variant.model.value[0]" />

    </div>

    <variantEnquiry :itemid="variant.id" :rprice="changePrice || parseInt(variant.price) + paintPrice( variant.colours[0].paint_price)" :selectedColour="buttonColour || variant.colours[0].images"/>
  </div>
</template>
<script>
//import SlideshowThumbs from "./SlideshowThumbs";
import lazyLoadComponent from "@/utils/lazyLoad";
import BlockLoading from "@/components/utilities/loading";
import OffersRelated from "./OffersRelated.vue";
import variantEnquiry from "./variantEnquiry.vue";
export default {
  props: ['variant', 'footerVehicelImage','selectedColourName'],

  data() {
    return {
      isModalVisible: false,
      siteName: this.$store.state.site.name,
      buttonColour:"",
      changePrice: "",
      colourName: '',
      siteName: this.$store.state.site.name,
      address: this.$store.state.site.showroom_address
    };
  },
  metaInfo() {
    if (this.variant)
      return {
        title:
        this.variant.title + ' | ' + this.$store.state.site.name,
        meta: [
          {
            vmid: "description",
            name: "description",
            content: this.variant.title + ' | ' + this.$store.state.site.name + ' | ' + this.$store.state.site.departments.sales.address,
          },
        ],
      };
  },
  components: {
    //SlideshowThumbs,
    OffersRelated,
    variantEnquiry,
    YouTubeRelated: lazyLoadComponent({
      componentFactory: () =>
        import(/* webpackChunkName: "frontCarsalesDealerBrand" */ "@/components/search/CarSales/YouTubeRelated"),
      loading: BlockLoading,
    }),
    // ModalEnquiry: () => import("./variantEnquiry.vue"),
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        if(document.getElementById("variant-modal-enquire")){
            this.UIkit.modal("#variant-modal-enquire").$destroy(true);
          };
          this.emitColourImage(null, null)
      },
      immediate: true,
    },
  },
  methods: {
    formatBullet(value) {
      var myNewString =
        "<li>" +
        value.split("\r").join("</li><li>") +
        "</li>";
      return myNewString;
    },
    strippedHtml() {
      //console.log(string.replace(/<\/?[^>]+(>|$)/g, ""));
      return this.variant.offer.toString().replace(/\s/g, '').replace(/<\/?[^>]+>/ig, '');
    },
    emitColourImage(image, cName){
      this.$emit('colorchange',{image,cName})
    },
    paintPrice(value) {
      if (value) {
        return parseInt(value)
      } else {
        return parseInt(0)
      }
    },
    uniqColours(colours){
      return this.vLodash.uniqBy(colours, (colour) => {
        return colour.colour_name;
      })
    },
    loadModalVisible() {
        this.UIkit.modal("#variant-modal-enquire-"+this.variant.id).show();
        this.UIkit.switcher("#form-tab-"+this.variant.id).show(0);
    },
    loadModalCalculator(){
        this.UIkit.modal("#variant-modal-enquire-"+this.variant.id).show();
        this.UIkit.switcher("#form-tab-"+this.variant.id).show(1);
    },
    enlargeRotator() {
     this.UIkit.modal("#rototator-modal").show();
    },
    enlargeRemove() {
     this.UIkit.modal("#rototator-modal").$destroy(true);
    },
  },
  filters: {
    formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  },
};
</script>
<style>
.variant-top {
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
}
.rototator-modal .uk-modal-close-default{
  color:#fff;
  padding: 10px;
  background: #000;
}
.view-colours.variant-colours-items li.uk-active:after {
margin: -19px 0 0 -5px;
}
</style>
