<template>
  <div class="uk-card uk-background-default border-radius-10">
    <div class="uk-padding-remove">
      <img
        v-if="this.item.photos[0].Url"
        :data-src="this.item.photos[0].Url"
        lazy="load"
        data-uk-img
      />
      <img v-else data-src="/comingsoon.jpg" lazy="load" data-uk-img />
    </div>

    <div class="uk-grid-small uk-padding-small uk-padding-remove-bottom uk-grid">
      <div class="uk-width-expand uk-text-left">
        <div class="uk-text-small">{{ item.condition.displayValue[0] }}</div>
        <h4 class="uk-h5 uk-margin-remove uk-text-truncate uk-text-bold title-items">
          {{ item.year.displayValue[0] }} {{ item.make.displayValue[0] }}
          {{ item.model.displayValue[0] }}
        </h4>
        <div class="uk-text-small uk-text-secondary uk-text-light">
          {{ item.title }}
        </div>
      </div>

      <div class="uk-text-center">
        <div v-if="item.price">
          <h3 class="uk-h4 uk-margin-remove uk-text-bold">
            ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}<sup>*</sup>
          </h3>
          <div class="uk-text-small">DRIVE AWAY</div>
        </div>
        <div v-else>
          <h3 class="uk-margin-remove uk-text-bold">P.O.A</h3>
          <div class="uk-text-small">Contact Us.</div>
        </div>
      </div>

      <div class="uk-grid-small uk-width-1-1 uk-margin-medium spec-items uk-grid">
        <div class="uk-width-expand uk-text-left">
          <div>
            <span class="uk-text-meta"></span>
            {{ item.body.displayValue[0] }}
          </div>
          <div>
            <span class="uk-text-meta"></span>
            {{ item.transmission.displayValue[0] }}
          </div>
          <div>
            <span class="uk-text-meta"></span>
            {{ item.drivetrain.displayValue[0] }}
          </div>
        </div>

        <div class="uk-width-expand uk-text-left">
          <div>
            <span class="uk-text-meta"></span>
            {{ item.engine.displayValue[0] }}
            {{ item.fuel.displayValue[0] }}
          </div>
          <div v-if="item.rego">
            <div><span class="uk-text-meta"></span> Registered</div>
          </div>
          <div v-else>
            <div><span class="uk-text-meta"></span> Unregistered</div>
          </div>

          <div v-if="item.kms">
            <div><span class="uk-text-meta"></span> {{ item.kms }} km</div>
          </div>
          <div v-else>
            <div><span class="uk-text-meta"></span> 0 km</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "single-item",
  props: ["item"],
};
</script>
