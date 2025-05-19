<template>
<div>


      <div class="uk-grid-collapse uk-grid">
        <div>
          <div class="uk-text-medium uk-text-bold"> SALES</div>
          <div class="uk-panel">
            <a :href="Salesdirections" target="_blank" class="uk-link-text"> Get Directions</a>
          </div>
          <div class="uk-panel">
            <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneSales)}`" class="forcelink"> {{PhoneSales}}</a>
          </div>

          <div class="uk-first-column">

            <div class="uk-margin-small-top"> Sales Trading Hours </div>

            <div class="uk-text-xsmall">
              <span class="ft-xm">Monday – Friday: </span>
                <span v-if="Salestrading.monday[0].open">{{Salestrading.monday[0].open}}</span>
                –
                <span v-if="Salestrading.friday[0].open">{{Salestrading.friday[0].close}}</span>
            </div>


            <div class="uk-text-xsmall">
              <span class="ft-xm">Saturday: </span>
              <span v-if="Salestrading.saturday[0].current.value != 'open'"> {{Salestrading.saturday[0].current.label}}</span>
              <span v-else>
                <span>{{Salestrading.saturday[0].open}}</span>
                <span v-if="Salestrading.saturday[0].close"> - {{Salestrading.saturday[0].close}}</span>
              </span>
            </div>

            <div class="uk-text-xsmall">
              <span class="ft-xm">Sunday: </span>
              <span v-if="Salestrading.sunday[0].current.value != 'open'"> {{Salestrading.sunday[0].current.label}}</span>
              <span v-else>
                <span>{{Salestrading.sunday[0].open}}</span>
                <span v-if="Salestrading.sunday[0].close"> - {{Salestrading.sunday[0].close}}</span>
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
            <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneService)}`" class="forcelink"> {{PhoneService}}</a>
          </div>

          <div class="uk-first-column">

            <div class="uk-margin-small-top"> Service Trading Hours </div>

            <div class="uk-text-xsmall">
              <span class="ft-xm">Monday – Friday: </span>
                <span v-if="Servicetrading.monday[0].open">{{Servicetrading.monday[0].open}}</span>
                –
                <span v-if="Servicetrading.friday[0].open">{{Servicetrading.friday[0].close}}</span>
            </div>


            <div class="uk-text-xsmall">
              <span class="ft-xm">Saturday: </span>
              <span v-if="Servicetrading.saturday[0].current.value != 'open'"> {{Servicetrading.saturday[0].current.label}}</span>
              <span v-else>
                <span>{{Servicetrading.saturday[0].open}}</span>
                <span v-if="Servicetrading.saturday[0].close"> - {{Servicetrading.saturday[0].close}}</span>
              </span>
            </div>

            <div class="uk-text-xsmall">
              <span class="ft-xm">Sunday: </span>
              <span v-if="Servicetrading.sunday[0].current.value != 'open'"> {{Servicetrading.sunday[0].current.label}}</span>
              <span v-else>
                <span>{{Servicetrading.sunday[0].open}}</span>
                <span v-if="Servicetrading.sunday[0].close"> - {{Servicetrading.sunday[0].close}}</span>
              </span>
            </div>


            <div class="uk-margin-small-top"> Parts Trading Hours </div>

            <div class="uk-text-xsmall">
              <span class="ft-xm">Monday – Friday: </span>
                <span v-if="Partstrading.monday[0].open">{{Partstrading.monday[0].open}}</span>
                –
                <span v-if="Partstrading.friday[0].open">{{Partstrading.friday[0].close}}</span>
            </div>


            <div class="uk-text-xsmall">
              <span class="ft-xm">Saturday: </span>
              <span v-if="Partstrading.saturday[0].current.value != 'open'"> {{Partstrading.saturday[0].current.label}}</span>
              <span v-else>
                <span>{{Partstrading.saturday[0].open}}</span>
                <span v-if="Partstrading.saturday[0].close"> - {{Partstrading.saturday[0].close}}</span>
              </span>
            </div>

            <div class="uk-text-xsmall">
              <span class="ft-xm">Sunday: </span>
              <span v-if="Partstrading.sunday[0].current.value != 'open'"> {{Partstrading.sunday[0].current.label}}</span>
              <span v-else>
                <span>{{Partstrading.sunday[0].open}}</span>
                <span v-if="Partstrading.sunday[0].close"> - {{Partstrading.sunday[0].close}}</span>
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
  computed: {
    site() {
      return this.$store.state.site;
    },
    siteName() {
      return this.site.name;
    },
    description() {
      return this.site.description;
    },
    showroom_address() {
      return this.site.showroom_address;
    },
    SalesAddress() {
      return this.site.departments.sales.address;
    },
    PhoneSales() {
      return this.site.departments.sales.phone;
    },
    Salestrading() {
      return this.site.departments.sales.trading;
    },
    Salesdirections() {
      return this.site.departments.sales.map_directions;
    },
    ServiceAddress() {
      return this.site.departments.service.address;
    },
    PhoneService() {
      return this.site.departments.service.phone;
    },
    Servicetrading() {
      return this.site.departments.service.trading;
    },
    Servicedirections() {
      return this.site.departments.service.map_directions;
    },
    PartsAddress() {
      return this.site.departments.parts.address;
    },
    PhoneParts() {
      return this.site.departments.parts.phone;
    },
    Partstrading() {
      return this.site.departments.parts.trading;
    },
    Partsdirections() {
      return this.site.departments.parts.map_directions;
    },
    lmct() {
      return this.site.lmct;
    }
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
.ft-xm{
  color: rgb(255 255 255 / 67%);
}
</style>
