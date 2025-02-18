<template>
  <div>
    <h1 class="title">Experience better with Hyundai.</h1>

    <h2 class="subtitle">
    View our popular models.
    </h2>
<div class="uk-container uk-container-large">
    <div class="uk-child-width-1-4 uk-grid-small uk-grid">
      <div
        v-for="plan in models"
        :key="plan.price"
        @click="pickPlan(plan)"
        :class="{'active-plan': selectedPlan === plan}"
        class=""
      >
      <div>
      <div class="uk-card uk-card-default uk-padding-small uk-margin-small-bottom uk-text-center uk-border-rounded">
        <div class="weight">
        <img :src="plan.node.featuredImage.node.sourceUrl">
        </div>
        <div class="description">
          <span class="title">
              {{plan.node.title}}
          </span>
          <span class="description">
              {{plan.description}}
          </span>
        </div>
        <div class="uk-hidden">
          <span class="dollar-sign">$</span>
          <span class="number">{{plan.price}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    <div v-if="selectedPlan" class="error">you should pick a plan to continue</div>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        selectedPlan: null,
        models: [],
      }
    },
    validations: {
      selectedPlan: {
        required
      }
    },
    async created() {
      this.models = await this.getModels();
    },
    methods: {
      getModels: async () => {
         const query = `query NewQuery {
          allVehicles(first:1000) {
            edges {
              node {
                id
                title
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                modelCat {
                  edges {
                    node {
                      slug
                      name
                    }
                  }
                }
                popularCat {
                  edges {
                    node {
                      name
                      slug
                    }
                  }
                }
                vehicleCat {
                  nodes {
                    slug
                    name
                  }
                }
              }
            }
          }
        }`;
        const fetchUrl = "https://hyundai-2020.adus.com.au/graphql";
        //const fetchUrl = process.env.WORDPRESS_API_QL
        const fetchOptions = {
          method: "POST",
          headers: {
             //"Authorization": `Bearer ${process.env.VUE_APP_QL_ACCESS_TOKEN}`,
             "Authorization": "Bearer EetBkyiBhepX:MhInrmRQ!?qnj>$sysHr&7:9{Sn0~bgGNh?hgGR)uFfRC",
             "Content-Type": "application/json"
           },
           body: JSON.stringify({
           query
         })
       };

       try {
         const response = await fetch(fetchUrl, fetchOptions).then(response =>
           response.json()
         );
         return response.data?.allVehicles?.edges;
       } catch (error) {
         throw new Error("Could not receive the data!");
       }
     },
      pickPlan (plan) {
        this.selectedPlan = plan

        this.submit()
      },
      submit() {
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
