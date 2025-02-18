<template>
  <div
    class="dropbox uk-flex uk-flex-middle uk-flex-center uk-text-center"
    :class="{ 'uk-danger': !isValid, 'uk-text-danger': !isValid }"
  >
    <input
      type="file"
      :name="options.name"
      @change="filesChange($event.target.name, $event.target.files)"
      accept="image/*"
      class="input-file"
      :ref="`${options.name}ref`"
    />
    <p v-if="!preview">
      {{ options.label }}
    </p>
    <div
      v-if="preview"
      class="image-preview uk-background-cover uk-light uk-flex uk-flex-bottom uk-flex-center"
      :data-src="imageUrl"
      uk-img
    >
      <span class="uk-icon-button" :uk-icon="options.icon" @click="resetImageField"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isValid: true,
      preview: false,
      imageUrl: "",
      isRequired: this.options.required,
    };
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async filesChange(fieldName, files) {
      const [image] = files;
      this.preview = true;
      this.isValid = true;
      this.imageUrl = URL.createObjectURL(image);

      const endcodedImage = await this.encodeImage(image);

      this.$emit("input", endcodedImage);
    },
    resetImageField() {
      this.$refs[`${this.options.name}ref`].value = "";
      this.preview = false;
      this.imageUrl = "";
    },
    encodeImage(image) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    },
    validate() {
      return !this.imageUrl && this.isRequired ? (this.isValid = false) : (this.isValid = true);
    },
    clear() {
      this.resetImageField();
    },
  },
};
</script>
<style lang="scss">
.dropbox {
  background: #eee;
  border: 1px solid #eee;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 290px;
  max-width: 100%;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 290px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #fff;
}
.dropbox.uk-danger {
  border-color: #ed0000;
}
.image-preview {
  width: 100%;
  height: 290px;
  position: relative;
}
.image-preview .uk-icon-button {
  color: #fff;
  background-color: #666 !important;
  margin-bottom: 10px;
}
.image-preview .uk-icon-button:hover {
  border: 2px solid #fff;
}
</style>
