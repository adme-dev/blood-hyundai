<template>
  <div>
    <h1 class="title">Delivery details</h1>

    <h2 class="subtitle">
      Where should we send your freshly roasted coffee beans?
    </h2>

    <form class="form" @input="submit">
      <div class="form-group">
        <label class="form-label" for="delivery_name">Name</label>
        <input v-model="form.recipient" type="text" placeholder="Recipients Name" class="form-control" id="delivery_name">
        <div v-if="form.recipient" class="error">field is required</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="address">Address</label>
        <textarea v-model="form.address" placeholder="London Street 470978 New England" rows="3" class="form-control" id="address"></textarea>
        <div v-if="form.address" class="error">field is required</div>
      </div>
    </form>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  export default {
    props: {
      wizardData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        form: {
          address: null,
          recipient: this.wizardData.name
        }
      }
    },
    activated() {
      this.form.recipient = this.wizardData.name
    },
    validations: {
      form: {
        address: {
          required
        },
        recipient: {
          required
        }
      }
    },
    methods: {
      submit() {
          this.$emit('update', {
            data: {
              address: this.form.address,
              recipient: this.form.recipient,
            },
            valid: !this.$invalid
           })
      }
    }
  }
</script>

<style scoped>

</style>
