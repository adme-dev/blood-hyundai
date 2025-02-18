<template>
  <div class="uk-background-muted">
    <div v-if="page"><post-content :content="page.content.rendered" /></div>
    <div class="uk-container uk-container-small">
      <div class="service-form uk-margin-large-bottom uk-padding-small">
        <div class="uk-text-center uk-margin-medium-top">
          <div class="uk-h1 uk-margin-remove">Sell my car today</div>
          <div class="uk-h2 uk-margin-remove">Enter Your Details Below and we'll Contact You Back Shortly</div>
        </div>
        <DaForm :formControls="formControls" @input="onChange" ref="daform" />
      </div>
    </div>
  </div>
</template>
<script>
import PostContent from "@/components/content/PostContent";
import DaForm from "@/components/form-elements/DaForm";
import formSchema from "@/config/forms/sellMyCar";
import axios from "axios";
import MetaMixin from "@/mixins/meta";
import { PageService } from "@/services";
export default {
  name: "sell-my-car",
  mixins: [MetaMixin],
  components: {
    PostContent,
    DaForm,
  },
  data() {
    return {
      page: null,
      formControls: formSchema,
    };
  },
  mounted() {
    this.getPage();
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
      PageService.getPageBySlug(this.$store.state.site.pages["sell-my-car"]).then((data) => {
        this.page = data;
      });
    },
    onChange(formData) {
      for (const [key, value] of Object.entries(formData)) {
        if (key.includes("choice")) {
          for (const [subkey, value] of Object.entries(formData[key])) {
            formData[subkey] = value;
          }
        }
      }
      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/newform`, { payload: formData, formId: 9 })
        .then((response) => {
          this.$store.dispatch("setLoading", false);
          const vm = this;
          this.UIkit.modal
            .alert(
              `<div class="uk-alert-success" uk-alert>
                  <p>
                    Thank you for your submission! One of our team members will get back to you ASAP.
                  </p>
                </div>`
            )
            .then(function () {
              vm.$refs.daform.clearAll();
            });
        })
        .catch((error) => {
          this.UIkit.modal.alert(
            `<div class="uk-alert-danger" uk-alert>
                  <p>
                    Something went wrong. please try again later.
                  </p>
                </div>`
          );
          this.$store.dispatch("setLoading", false);
        });
    },
  },
};
</script>
<style lang="css" scoped>
.small-lead-form .uk-form-icon {
  left: 0;
}
</style>
