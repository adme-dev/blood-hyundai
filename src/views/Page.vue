<template>
  <div v-if="page" class="uk-background-muted">
    <PageSchema />
    <div v-if="page.template">
      <div class="uk-grid-collapse uk-grid">
        <div class="uk-width-1-1">
          <div>
            <post-content :content="page.content.rendered" />
          </div>

          <div class="uk-background-muted">
            <div
              class="uk-container form-wrap"
              :class="[
                page.template == 'finance_form' || page.template == 'contact_form' || page.template == 'parts_form' || page.template == 'fleet_form' ? 'uk-container-large' : 'uk-container-xsmall',
              ]"
            >
              <component :is="dynamicComponent" :activeHoursTab="page.template" :id="page.template" class="uk-margin-large-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <post-content :content="page.content.rendered" />
    </div>
  </div>
</template>

<script>
const PageSchema = () => import('@/components/page-elements/PageSchema');
const PostContent = () => import('../components/content/PostContent');
import MetaMixin from "@/mixins/meta";
import { PageService } from "@/services";

const ComponentMapping = {
  contact_form: () => import("@/components/page-elements/ContactForm"),
  service_form: () => import("@/components/page-elements/ServiceForm"),
  fleet_form: () => import("@/components/page-elements/FleetForm"),
  finance_form: () => import("@/components/page-elements/FinanceForm"),
  parts_form: () => import("@/components/page-elements/ContactForm"),
};

export default {
  name: "page",
  mixins: [MetaMixin],

  components: { PageSchema, PostContent },
  data() {
    return {
      page: null,
    };
  },
  computed: {
    dynamicComponent() {
      const componentLoader = ComponentMapping[this.page.template];
      return componentLoader ? componentLoader : null;
    },
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        this.getPage(newValue.slug);
      },
      immediate: true,
    },
  },
  methods: {
    getPage(pageName) {
      const isPageExists = this.vLodash.findIndex(
        this.$store.state.viewedPages,
        (p) => p.name === pageName
      );

      if (isPageExists === -1) {
        PageService.getPageBySlug(pageName).then((data) => {
          if (data.error) {
            this.$router.push({ name: "notFound" });
          } else {
            const viewedPage = { name: pageName, data };
            this.$store.dispatch("setViewedPages", viewedPage);
            this.page = data;
          }
        });
      } else {
        const page = this.vLodash.find(this.$store.state.viewedPages, (p) => p.name === pageName);
        this.page = page.data;
      }
    },
  },
};
</script>
