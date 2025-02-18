<template>

  <div>
    <h1 class="title">Experience better with Hyundai.</h1>

    <h2 class="subtitle">
      Select your variant.
    </h2>
    <div class="uk-container uk-container-large">
      <div class="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid-small uk-grid" uk-height-match="target: > div  > div > .uk-card">
        <div v-for="plan in variants"
             :key="plan.node.id"
             @click="pickVariant(plan)"
             >
          <div>
            <div class="uk-card uk-card-default uk-padding-small uk-margin-small-bottom uk-text-center uk-border-rounded uk-flex"
             :class="{'uk-background-primary uk-light': selectedModel === plan.node.title}"
             >
              <div class="uk-width-1-1 uk-margin-auto-top uk-inline-clip">
                <div v-if="plan.node.variantBody.nodes[0]" class="uk-position-top" uk-padding-small>
                  {{plan.node.variantBody.nodes[0].name}}
                </div>
                <img class="uk-padding-small" :src="plan.node.featuredImage.node.sourceUrl">
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
        variants: []
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
      }
    }
  }

</script>
