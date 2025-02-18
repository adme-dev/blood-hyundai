<template>
  <div>
    <div class="uk-text-center">
      <p class="uk-h4">Book a Test Drive</p>
      <p>
        <span class="uk-text-light">{{ vehicle }} </span>
      </p>
    </div>
    <div v-if="!isSubmitted">
      <p class="uk-text-center">
        Fill out this form and a dealer will be in contact with you to book your test drive.
      </p>
      <DaForm :formControls="formControls" @input="onChange" ref="daform" />
    </div>

    <div
      v-if="submitMessage"
      class="uk-alert"
      :class="{
        'uk-alert-success': isSubmitted && !hasErrors,
        'uk-alert-danger': isSubmitted && hasErrors,
      }"
      uk-alert
    >
      <p>{{ submitMessage }}</p>
    </div>
  </div>
</template>
<script>
import DaForm from "@/components/form-elements/DaForm";
import formSchema from "@/config/forms/testDrive";
import axios from "axios";
export default {
  name: "TestDrive",
  components: {
    DaForm,
  },
  props: ["vehicle", "selection"],
  data() {
    return {
      formControls: formSchema,
      isSubmitted: false,
      hasErrors: false,
      submitMessage: "",
    };
  },

  mounted() {
    console.log("mounted", JSON.stringify(this.selection));
  },
  methods: {
    onChange(formData) {
      for (const [key, value] of Object.entries(formData)) {
        if (key.includes("choice")) {
          for (const [subkey, value] of Object.entries(formData[key])) {
            formData[subkey] = value;
          }
        }
      }
      formData["input_5"] = JSON.stringify(this.selection);

      axios
        .post(`${process.env.VUE_APP_PUBLIC_API_URL}/newform`, { payload: formData, formId: 19 })
        .then((response) => {
          this.submitMessage =
            "Thank you for your submission. One of our agent will get back ASAP.";
        })
        .catch((error) => {
          this.hasErrors = true;
          this.submitMessage = "Something went wrong. please try again later.";
        })
        .then(() => {
          this.isSubmitted = true;
          this.$store.dispatch("setLoading", false);
          this.$refs.daform.clearAll();
        });
    },
  },
};
</script>
