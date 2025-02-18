<template>
  <div>
    <a href="#" @click.prevent='sub' class="uk-padding-small" uk-icon="chevron-down"></a>
    <b>{{ result }}</b>
    <a href="#" @click.prevent='add' class="uk-padding-small" uk-icon="chevron-up"></a>
  </div>
</template>
<script>
export default {
  name: "counter",
  data: function () {
    return {
      result: 1
    };
  },
  props: ['value'],
  methods: {
    emitResult () {
      this.$emit('input', this.result)
    },
    add () {
      this.result += 1
      this.emitResult()
    },
    sub () {
      if(this.result <= 1) {
        return;
      } else {
        this.result -= 1
      }
      this.emitResult()
    }
  }
};
</script>
