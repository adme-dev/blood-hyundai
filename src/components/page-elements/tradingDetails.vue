<template>
  <div>


    <div class="uk-grid-collapse uk-grid">
      <div>
        <div class="uk-text-medium uk-text-bold"> SALES</div>
        <div class="uk-panel">
          <a :href="Salesdirections" target="_blank" class="uk-link-text"> Get Directions</a>
        </div>
        <div class="uk-panel">
          <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneSales)}`" class="forcelink"> {{ PhoneSales }}</a>
        </div>

        <div class="uk-first-column">

          <div class="uk-margin-small-top"> Sales Trading Hours </div>

          <div class="uk-text-small">
            <span class="ft-xm">Monday – Friday: </span>
            <span v-if="Salestrading.monday[0].open">{{ GetTime(Salestrading.monday[0].open) }}</span>
            –
            <span v-if="Salestrading.friday[0].open">{{ GetTime(Salestrading.friday[0].close) }}</span>
          </div>

          <div class="uk-text-small">
            <span class="ft-xm">Saturday: </span>
            <span v-if="Salestrading.saturday[0].current.value != 'open'">
              {{ Salestrading.saturday[0].current.label }}</span>
            <span v-else>
              <span>{{ GetTime(Salestrading.saturday[0].open) }}</span>
              <span v-if="Salestrading.saturday[0].close"> - {{ GetTime(Salestrading.saturday[0].close) }}</span>
            </span>
          </div>

          <div class="uk-text-small">
            <span class="ft-xm">Sunday: </span>
            <span v-if="Salestrading.sunday[0].current.value != 'open'"> {{ Salestrading.sunday[0].current.label }}</span>
            <span v-else>
              <span>{{ GetTime(Salestrading.sunday[0].open) }}</span>
              <span v-if="Salestrading.sunday[0].close"> - {{ GetTime(Salestrading.sunday[0].close) }}</span>
            </span>
          </div>

        </div>
      </div>
    </div>



    <div class="uk-grid-collapse uk-margin-small-top uk-grid">
      <div>
        <div class="uk-text-medium uk-text-bold"> SERVICE & PARTS</div>
        <div class="uk-panel">
          <a :href="Servicedirections" target="_blank" class="uk-link-text"> Get Directions</a>
        </div>
        <div class="uk-panel">
          <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneService)}`" class="forcelink"> {{ PhoneService }}</a>
        </div>

        <div class="uk-first-column">

          <div class="uk-margin-small-top"> Service Trading Hours </div>

          <div class="uk-text-small">
            <span class="ft-xm">Monday – Friday: </span>
            <span v-if="Servicetrading.monday[0].open">{{ GetTime(Servicetrading.monday[0].open) }}</span>
            –
            <span v-if="Servicetrading.friday[0].open">{{ GetTime(Servicetrading.friday[0].close) }}</span>
          </div>

          <div class="uk-text-small">
            <span class="ft-xm">Saturday: </span>
            <span v-if="Servicetrading.saturday[0].current.value != 'open'">
              {{ Servicetrading.saturday[0].current.label }}</span>
            <span v-else>
              <span>{{ GetTime(Servicetrading.saturday[0].open) }}</span>
              <span v-if="Servicetrading.saturday[0].close"> - {{ GetTime(Servicetrading.saturday[0].close) }}</span>
            </span>
          </div>

          <div class="uk-text-small">
            <span class="ft-xm">Sunday: </span>
            <span v-if="Servicetrading.sunday[0].current.value != 'open'">
              {{ Servicetrading.sunday[0].current.label }}</span>
            <span v-else>
              <span>{{ GetTime(Servicetrading.sunday[0].open) }}</span>
              <span v-if="Servicetrading.sunday[0].close"> - {{ GetTime(Servicetrading.sunday[0].close) }}</span>
            </span>
          </div>


          <div class="uk-margin-small-top"> Parts Trading Hours </div>

          <div class="uk-text-small">
            <span class="ft-xm">Monday – Friday: </span>
            <span v-if="Partstrading.monday[0].open">{{ GetTime(Partstrading.monday[0].open) }}</span>
            –
            <span v-if="Partstrading.friday[0].open">{{ GetTime(Partstrading.friday[0].close) }}</span>
          </div>

          <div class="uk-text-small">
            <span class="ft-xm">Saturday: </span>
            <span v-if="Partstrading.saturday[0].current.value != 'open'">
              {{ Partstrading.saturday[0].current.label }}</span>
            <span v-else>
              <span>{{ GetTime(Partstrading.saturday[0].open) }}</span>
              <span v-if="Partstrading.saturday[0].close"> - {{ GetTime(Partstrading.saturday[0].close) }}</span>
            </span>
          </div>

          <div class="uk-text-small">
            <span class="ft-xm">Sunday: </span>
            <span v-if="Partstrading.sunday[0].current.value != 'open'"> {{ Partstrading.sunday[0].current.label }}</span>
            <span v-else>
              <span>{{ GetTime(Partstrading.sunday[0].open) }}</span>
              <span v-if="Partstrading.sunday[0].close"> - {{ GetTime(Partstrading.sunday[0].close) }}</span>
            </span>
          </div>



        </div>
      </div>
    </div>








  </div>
</template>
<script>
export default {
  name: "contact-details",
  props: ["classes"],
  data: function () {
    return {
      siteName: this.$store.state.site.name,
      description: this.$store.state.site.description,
      showroom_address: this.$store.state.site.showroom_address,
      SalesAddress: this.$store.state.site.departments.sales.address,
      PhoneSales: this.$store.state.site.departments.sales.phone,
      Salestrading: this.$store.state.site.departments.sales.trading,
      Salesdirections: this.$store.state.site.departments.sales.map_directions,

      ///converted to new car sales
      // UsedSalesAddress: this.$store.state.site.departments.sales.address,
      // UsedPhoneSales: this.$store.state.site.departments.sales.phone,
      // UsedSalestrading: this.$store.state.site.departments.sales.trading,
      // UsedSalesdirections: this.$store.state.site.departments.sales.map_directions,

      ServiceAddress: this.$store.state.site.departments.service.address,
      PhoneService: this.$store.state.site.departments.service.phone,
      Servicetrading: this.$store.state.site.departments.service.trading,
      Servicedirections: this.$store.state.site.departments.service.map_directions,

      PartsAddress: this.$store.state.site.departments.parts.address,
      PhoneParts: this.$store.state.site.departments.parts.phone,
      Partstrading: this.$store.state.site.departments.parts.trading,
      Partsdirections: this.$store.state.site.departments.parts.map_directions,

      lmct: this.$store.state.site.lmct,
    };
  },
  methods: {
    FormatPhone(phone) {
      return phone.replace(/[^A-Z0-9]+/gi, '');
    },
    GetTime(time) {
      var d = new Date(time);
      return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes().toString().replace(/^(\d)$/, '0$1') + ' ' + (d.getHours() >= 12 ? "pm" : "am");
    },
  }
};
</script>
<style>
.ft-xm {
  color: rgb(255 255 255 / 67%);
}</style>
