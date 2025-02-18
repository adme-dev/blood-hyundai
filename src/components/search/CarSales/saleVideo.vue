<template>
<div class="uk-grid-small uk-margin-medium uk-flex uk-flex-middle uk-grid">

  <div class="uk-width-2-5@s">
   <div v-html="$store.state.site.promotional[0].carsales.carsalespromovid"></div>
  </div>

  <div class="uk-width-expand@s uk-text-center uk-margin-small">
    <div>
     <div class="uk-h3 uk-text-bold uk-text-primary uk-margin-remove"><b>Join us Friday, 14/10 to Sunday, 16/10 for our HUGE 3 Day Used Car Sale</b></div>
     <div class="uk-h5 uk-text-bold uk-text-muted uk-margin-remove">Ferntree Gully Automotive is over stocked & set to clear the lot.</div>
     <div></div>
     <div class="uk-h4 uk-text-bold uk-margin-remove">150+ quality pre-owned vehicles in stock ready for immediate delivery.</div>
     <div class="uk-h5 uk-text-bold uk-text-muted uk-margin-remove">Get down to Ferntree Gully Automotive this weekend to <div><b>secure a great deal</b>.</div></div>
    </div>
  </div>
 <hr class="uk-width-1-1 uk-margin-small-top">
</div>
</template>

<script>
export default {
  name: "Certified",
};
</script>

<style scoped>
.uk-slider-container {
  padding: 4px;
}
</style>
