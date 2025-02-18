<template>

  <div>
    <h1 class="title">Experience better with Hyundai.</h1>

    <h2 class="subtitle">
      Select your Colour.
    </h2>
    <div class="uk-container uk-container-large">
      <div class="uk-grid-small uk-grid" uk-height-match="target: > div  > div > .uk-card">
        <div v-for="plan in variants.slice(index, 1)"
             :key="plan.node.id"
             @click="pickVariant(plan)"
             class="uk-width-expand"
             >
          <div class="uk-width-1-1">
            <div class="uk-padding-small uk-margin-small-bottom uk-text-center uk-border-rounded uk-flex"
             >
              <div class="uk-width-1-1 uk-margin-auto-top">

                <img class="uk-padding-small" :src="buttonColour || plan.node.featuredImage.node.sourceUrl">
                {{plan.node.vehicleVariantPrices.colours.colourName}}
                <div class="uk-h6 uk-margin-remove">
                  {{plan.node.title}}
                </div>
                <div v-if="plan.node.vehicleVariantPrices.driveAway" class="uk-text-bold">
                  Drive away from ${{parseFloat(plan.node.vehicleVariantPrices.driveAway).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-width-auto">
          <div>
            <ul class="uk-flex uk-flex-center uk-grid-collapse uk-child-width-1-1 uk-grid">
              <li
               v-for="(colours, index) in variants[0].node.vehicleVariantPrices.colours"
               :key="index"
               class="uk-margin-small-bottom"
               >
               <a href="#" class="uk-border-circle colours-items" @click.prevent="buttonColour = colours.images.sourceUrl">
                 <div class="uk-grid-small uk-grid">
                  <div><div class="uk-border-circle uk-background-center-center c-swatch" :style="{ 'background-image': 'url(' + colours.swatchColour.sourceUrl + ')' }"></div></div>
                  <div>{{colours.colourName}}</div>
                 </div>
              </a>
             </li>
            </ul>
          </div>
          <div class="uk-text-left features">
           <ul class="uk-list uk-list-square uk-list-collapse" v-html="formatBullet(variants[0].node.vehicleVariantPrices.features)"></ul>
          </div>
        </div>


      </div>
    </div>{{selectedModel}}
    <div v-if="selectedPlan" class="error">you should pick a plan to continue</div>
  </div>

</template>

<script>

  import { required } from 'vuelidate/lib/validators'

  export default {
    props: ['selectedModel'],
    data() {
      return {
        //stepSelectedModel: this.selectedModel,
        selectedPlan: null,
        variants: [],
        buttonColour:'',
      }
    },
    validations: {
      selectedPlan: {
        required
      }
    },
    watch: {
      selectedModel(newValue, oldValue) {
        //console.log(oldValue,newValue);
        this.variants = []
        this.getVariants(newValue).then(res => {
          this.variants = res
        })
        return newValue
      }
    },
    async mounted() {
      this.variants = await this.getVariants(this.selectedModel)
    },
    methods: {
      getVariants: async selectedModel => {
        const query = `query NewQuery {
                   allVariants(first: 1000, where: {search: "${selectedModel}"}) {
                     edges {
                       node {
                         id
                         title
                         featuredImage {
                           node {
                             sourceUrl
                           }
                         }
                         vehicleVariantPrices {
                           driveAway
                           colours {
                             images {
                               sourceUrl
                             }
                             colourName
                             paintPrice
                             swatchColour {
                               sourceUrl
                             }
                           }
                           features
                         }
                         variantBody {
                           nodes {
                             name
                           }
                         }
                       }
                     }
                    }
                  }`
        const fetchUrl = 'https://hyundai-2020.adus.com.au/graphql'
        //const fetchUrl = process.env.WORDPRESS_API_QL
        const fetchOptions = {
          method: 'POST',
          headers: {
            //"Authorization": `Bearer ${process.env.VUE_APP_QL_ACCESS_TOKEN}`,
            Authorization: 'Bearer EetBkyiBhepX:MhInrmRQ!?qnj>$sysHr&7:9{Sn0~bgGNh?hgGR)uFfRC',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query
          })
        }

        try {
          const response = await fetch(fetchUrl, fetchOptions).then(response => response.json())
          //console.log(response.data?.allVariants?.edges)
          return response.data?.allVariants?.edges
        } catch (error) {
          throw new Error('Could not receive the data!')
        }
      },
      pickVariant(plan) {
        this.selectedPlan = plan

        this.submitVariant()
      },
      submitVariant() {
        this.$emit('update', {
          data: {
            plan: this.selectedPlan
          },
          valid: !this.invalid
        })
      },
      formatBullet(value) {
        var myNewString =
          "<li>" +
          value.split("<br />").join("</li><li>") +
          "</li>";
        return myNewString;
      },
    }
  }

</script>
<style>
.colours-items, .colours-items .c-swatch {
    width: 25px;
    height: 25px;
}
</style>
