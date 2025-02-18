<template>
    <div class="variant-price-footer uk-background-muted uk-box-shadow-small">
        <div class="uk-container uk-margin-auto variant-price-footer">
            <div class="uk-text-left uk-width-1-1 uk-grid">
            <div class="uk-width-expand@m">
                <div>
                <img v-if="vehicleImage" :src="vehicleImage" :alt="grade" class="uk-width-small" />
                </div>
            </div>
            <div class="uk-width-expand@m">
                <div>
                <div>{{ title }}</div>
                <div>{{ grade }}</div>
                </div>
            </div>
            <div class="uk-width-expand@m">
                <div>
                <div>{{ transmission }}</div>
                <div>{{ grade }}</div>
                </div>
            </div>
            <div class="uk-width-expand@m">
                <div>
                <p class="uk-margin-remove uk-text-light">Full Driveaway</p>
                <h3 class="uk-h3 uk-margin-remove uk-text-bold">
                    ${{ price }}
                </h3>
                <a href="#modal-calculator" uk-toggle>Calculate Finance</a>
                </div>
            </div>
            <div class="uk-width-auto@m uk-flex uk-flex-middle">
                <button class="uk-button uk-button-primary" uk-toggle="target: #modal-test-drive">Take a test drive</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["vehicleImage", "title", "grade", "transmission", "price"],
};
</script>
<style scoped>
.variant-price-footer {
  bottom: 0;

  position: sticky;
  position: -webkit-sticky;
  border-top: 1px solid #e9e9e9;
  background: #f5f6f7;
  z-index: 8;
}
</style>
