<template>
  <div class="uk-card stickytop">
    <div class="uk-card-header uk-text-center">
      <h3 class="uk-card-title">{{ model}} Price</h3>
      <hr />

      <div class="uk-child-width-1-3@m" uk-grid>
        <div>
          <h3 class="uk-card-title uk-margin-remove">{{grade  }}</h3>
        </div>
        <div>
          <p class="uk-margin-remove uk-text-light">Full Driveaway</p>
          <h3 class="uk-h3 uk-margin-remove uk-text-bold">
            ${{ price }}
          </h3>
          <a href="#modal-calculator" uk-toggle>Calculate Finance</a>
        </div>
        <div>
          <button class="uk-button uk-button-primary" uk-toggle="target: #modal-test-drive">Take a test drive</button>
        </div>
      </div>

      <hr />
    </div>
    <div class="uk-card-body">
      <img v-if="image" :src="image" :alt="model" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["model", "grade", "price", "image"],
};
</script>
<style scoped>
.stickytop {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
</style>
