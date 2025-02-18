<template>

  <div v-if="page" class="uk-background-muted multi-form">
    <PageSchema />
    <div>
      <post-content :content="page.content.rendered" />
    </div>

    <ContactDetails :classes="'uk-padding-small uk-background-default uk-box-shadow-small'" v-if="['/contact', '/contact-us'].indexOf($route.fullPath) > -1"/>



    <div class="contact-form uk-padding-small">
      <div class="uk-text-center uk-margin-medium-top">
        <div class="uk-h1 uk-margin-remove">Contact {{ siteName }}</div>
      </div>

      <div class="uk-container uk-flex uk-flex-center uk-margin-auto uk-margin-auto multiform uk-list uk-text-secondary uk-subnav-pill uk-margin-medium-top uk-grid-collapse uuk-child-width-expand"><sliding-tabs
    v-model="activeTab"
    :tabs="tabs"
  /></div>

  <ul class="uk-grid-collapse uk-margin-auto uk-flex uk-flex-center uk-container uk-container-large uk-grid">

          <li v-show="activeTab === 0" class="uk-width-1-1"><ContactForm id="sales" activeHoursTab="contact_form" formType="contact"/></li>
          <li v-show="activeTab === 1" class="uk-width-1-1"><ContactForm id="parts" activeHoursTab="parts_form" formType="parts"/></li>
      <li v-show="activeTab === 2" class="uk-width-1-1@l">
        <div class="uk-width-1-2@l uk-padding uk-margin-auto uk-text-center"><h3>Do you need assistance in sourcing car finance? Our friendly team at {{siteName}} can help you find the best solution to suit your needs and budget.</h3></div>
        <FinanceForm id="finance"/>
      </li>
      <li v-show="activeTab === 3" class="uk-width-3-5@l"><ServiceForm id="service"/></li>
        <li v-show="activeTab === 4" class="uk-width-1-1"><ContactForm id="general" activeHoursTab="contact_form" formType="contact"/></li>
      </ul>


    </div>
  </div>
</template>
<script>
import MetaMixin from "@/mixins/meta";
import { PageService } from "@/services";
const PageSchema = () => import("@/components/page-elements/PageSchema");
const PostContent = () => import("@/components/content/PostContent");
const ContactDetails = () => import("@/components/page-elements/ContactDetails");
const ContactForm = () => import("@/components/page-elements/ContactForm");
const FinanceForm = () => import("@/components/page-elements/FinanceForm");
const ServiceForm = () => import("@/components/page-elements/ServiceForm");
import SlidingTabs from '@/components/SlidingTabs.vue'

export default {
  name: "TabContactForms",
  components: { ContactForm, FinanceForm, ServiceForm },
  mixins: [MetaMixin],

  components: { PostContent, PageSchema, ContactForm, ServiceForm, FinanceForm, SlidingTabs, ContactDetails },
  data() {
    return {
      page: null,
      siteName: this.$store.state.site.name,
      activeTab: 0,
      tabs: ['Sales', 'Parts', 'Finance', 'Service', 'General']
    };
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        //console.log("newValue", newValue);
        this.getPage(newValue.slug);
      },
      immediate: true,
    },
  },
  methods: {
    getPage() {
      PageService.getPageBySlug(this.$store.state.site.pages["contact"]).then((data) => {
        this.page = data;
      });
    },
  },
};
</script>
<style scoped>
.multi-form .trading-title {
  display: none;
}
</style>
