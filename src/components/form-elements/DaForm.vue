<template>
  <div class="uk-width-1-1 small-lead-form">
    <div class="uk-padding-small">
      <form>
        <fieldset
          v-for="(fieldset, name, i) in formControls"
          :key="i"
          class="uk-fieldset uk-grid-small uk-grid"
        >
          <div v-if="fieldset.description" class="uk-padding-small uk-margin-small-left uk-background-secondary uk-light">
            <p>{{ fieldset.description }}</p>
          </div>
          <div class="uk-width-1-1 uk-text-center">
            <p class="uk-heading-line uk-padding uk-padding-remove-bottom">
              <span class="uk-h3"> {{ fieldset.title }} </span>
            </p>
          </div>

          <div
            v-for="(control, i) in fieldset.fields"
            :key="i"
            class="uk-inline"
            :class="control.options.class"
          >
            <component
              :is="control.component"
              :options="control.options"
              v-model="fieldModels[control.options.name]"
              :ref="control.options.name"
            />
          </div>
        </fieldset>

        <div id="error-dialog" class="uk-flex-top" uk-modal tabindex="-1">
          <div class="uk-modal-dialog uk-modal-body uk-width-medium uk-margin-auto-vertical uk-border-rounded">
              <div class="uk-padding-small uk-text-center">
                <span uk-icon="icon: warning; ratio: 2" class="text-blue"></span>
                <h4 class="uk-h5 uk-margin-small-top">There was a problem with your submission. Errors have been highlighted.</h4>
                <button uk-toggle="target: #error-dialog" class="uk-width-1-1 uk-text-bold uk-button uk-button-primary tm-button-default">
                Continue
              </button>
              </div>
          </div>
      </div>

        <div v-if="!this.isFormValid" class="uk-alert-danger" uk-alert>
          <p>
            Please fix above errors.
          </p>
        </div>
      </form>

      <div class="uk-grid-small uk-margin-small-top uk-margin-medium-bottom" uk-grid>
        <div class="uk-margin-auto-left">
          <button
            type="button"
            class="uk-button uk-button-large border-radius-50 uk-width-1-1 uk-button-primary"
            @click="submitForm"
          >
            Send Enquiry
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DaInput from "@/components/form-elements/DaInput";
import DaEmail from "@/components/form-elements/DaEmail";
import DaPhone from "@/components/form-elements/DaPhone";
import DaTextArea from "@/components/form-elements/DaTextArea";
import DaSelect from "@/components/form-elements/DaSelect";
import DaSwitch from "@/components/form-elements/DaSwitch";
import DaImageUpload from "@/components/form-elements/DaImageUpload";
import DaChoice from "@/components/form-elements/DaChoice";

export default {
  name: "DaForm",
  components: {
    DaInput,
    DaEmail,
    DaPhone,
    DaSelect,
    DaSwitch,
    DaTextArea,
    DaImageUpload,
    DaChoice,
  },
  props: {
    formControls: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldModels: this.vModels(),
      isFormValid: true,
    };
  },

  methods: {
    submitForm() {
      this.$store.dispatch("setLoading", true);
      let allFields = [];
      this.vLodash.forEach(this.formControls, (fieldset) => {
        allFields = this.vLodash.concat(allFields, fieldset.fields);
      });

      let validatedFileds = {};
      this.vLodash.forEach(this.fieldModels, (value, key) => {
        const field = this.vLodash.filter(allFields, (field) => {
          return field.options.name === key;
        });

        if (field[0].options.required) {
          validatedFileds[key] = this.$refs[key][0].validate();
        }
      });
      this.isFormValid =
        Object.values(validatedFileds).reduce((m, o) => m + o) ===
        Object.keys(validatedFileds).length;
      if (this.isFormValid) {
        this.$emit("input", this.fieldModels);
      } else {
        this.isFormValid = false;
        this.$store.dispatch("setLoading", false);
      }
      if (this.validatedFileds = true) {
        this.UIkit.modal('#error-dialog').show();
      }
    },

    clearAll() {
      this.fieldModels = this.vModels();
      this.vLodash.forEach(this.formControls, (fieldset) => {
        this.vLodash.forEach(fieldset.fields, (field) => {
          if (field.component === "DaSelect") {
            this.$refs[field.options.name][0].clear();
          }
          if (field.component === "DaImageUpload") {
            this.$refs[field.options.name][0].clear();
          }
          if (field.component === "DaChoice") {
            this.$refs[field.options.name][0].clear();
          }
        });
      });
    },
    vModels() {
      let vModels = {};
      this.vLodash.forEach(this.formControls, (fieldset) => {
        this.vLodash.forEach(fieldset.fields, (field) => {
          vModels[field.options.name] = "";
        });
      });
      return vModels;
    },
  },
};
</script>
