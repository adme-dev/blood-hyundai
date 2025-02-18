<script>
//import TextBlock from '@/components/content/TextBlock';
import ContactForm from "./ContactForm";
import ServiceForm from "./ServiceForm";

export default {
  name: "ContentBlocks",
  components: {
    ServiceForm,
    ContactForm,
  },
  // props: {
  //   templates: Array | Boolean
  // },
  props: {
    templates: {
      type: Object,
      default: "",
    },
  },
  methods: {
    getComponentName(layout) {
      switch (layout) {
        case "service_form":
          return "service-form";

        case "contact_form":
          return "contact-form";
      }
    },
  },
};
</script>

<template>
  <div class="content-blocks" v-if="templates">
    <component v-bind:is="getComponentName(this.templates)" />
  </div>
</template>

<style lang="scss"></style>
