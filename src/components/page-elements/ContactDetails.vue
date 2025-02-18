<template>
<div class="uk-margin-medium uk-margin-medium-top">
  <hr>
  <div class="uk-container">
    <div class="uk-grid-large uk-flex uk-flex-middle uk-grid" uk-grid>
      <div class="uk-width-1-2@m uk-first-column">


        <h2 class="uk-h1 uk-width-large uk-margin-auto-right@m uk-margin-remove-left@m uk-margin-auto uk-text-left@m uk-text-center">
          <div class="uk-text-meta">LMCT: {{lmct}}</div>
          {{siteName}} Departments
        </h2>
        <div class="uk-panel uk-margin uk-width-large@s uk-margin-auto-right@m uk-margin-remove-left@m uk-margin-auto uk-text-left@m uk-text-center">
        <div v-html="description"></div>
        </div>


      </div>

      <div class="uk-width-1-2@m">

        <div uk-accordion class="uk-width-xlarge uk-margin-auto-left@m uk-margin-remove-right@m uk-margin-auto uk-accordion">
          <div class="el-item">

            <a class="uk-text-bold uk-accordion-title" :class="classes" href="#" aria-expanded="false">General Enquiry</a>

            <div class="uk-accordion-content uk-margin-remove-first-child">

              <div class="uk-panel uk-margin-small-left">

                <div class="el-item uk-panel uk-margin-small-left">

                  <div class="uk-child-width-expand uk-grid" uk-grid>
                    <div class="uk-margin-remove-first-child">
                      <h3 class="el-title uk-h5 uk-margin-small-top uk-margin-remove-bottom">
                        <div vlass="uk-text-bold"><span uk-icon="location"></span> {{SalesAddress}}</div>
                      </h3>
                      <div class="uk-panel uk-margin-top">
                        <a :href="Salesdirections" target="_blank" class="uk-link-text"><span uk-icon="forward"></span> Get Directions</a>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneSales)}`" class="forcelink"><span uk-icon="receiver" class="uk-text-secondary"></span> {{PhoneSales}}</a>
                      </div>

                      <div class="uk-first-column">

                        <p class="uk-margin-top"><span uk-icon="clock"></span> Trading Hours </p>

                        <ul class="uk-list uk-list-collapse uk-margin-small-top">

                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Monday – Friday</div>
                              <div>
                                <span v-if="Salestrading.monday[0].open">{{GetTime(Salestrading.monday[0].open)}}</span>
                                –
                                <span v-if="Salestrading.friday[0].open">{{GetTime(Salestrading.friday[0].close)}}</span>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Saturday</div>
                              <div>
                                <span v-if="Salestrading.saturday[0].current.value != 'open'"> {{Salestrading.saturday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Salestrading.saturday[0].open)}}</span>
                                  –
                                  <span v-if="Salestrading.saturday[0].close">{{GetTime(Salestrading.saturday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Sunday</div>
                              <div>
                                <span v-if="Salestrading.sunday[0].current.value != 'open'"> {{Salestrading.sunday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Salestrading.sunday[0].open)}}</span>
                                  –
                                  <span v-if="Salestrading.sunday[0].close">{{GetTime(Salestrading.sunday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>

                        </ul>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="el-item">

            <a class="uk-text-bold uk-accordion-title" :class="classes" href="#" aria-expanded="false">Showroom Enquiry</a>

            <div class="uk-accordion-content uk-margin-remove-first-child">

              <div class="uk-panel uk-margin-small-left">

                <div class="el-item uk-panel uk-margin-small-left">

                  <div class="uk-child-width-expand uk-grid" uk-grid>
                    <div class="uk-margin-remove-first-child">
                      <h3 class="el-title uk-h5 uk-margin-small-top uk-margin-remove-bottom">
                        <div vlass="uk-text-bold"><span uk-icon="location"></span> {{SalesAddress}}</div>
                      </h3>
                      <div class="uk-panel uk-margin-top">
                        <a :href="Salesdirections" target="_blank" class="uk-link-text"><span uk-icon="forward"></span> Get Directions</a>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneSales)}`" class="forcelink"><span uk-icon="receiver" class="uk-text-secondary"></span> {{PhoneSales}}</a>
                      </div>

                      <div class="uk-first-column">

                        <p class="uk-margin-top"><span uk-icon="clock"></span> Trading Hours </p>

                        <ul class="uk-list uk-list-collapse uk-margin-small-top">
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Monday – Friday</div>
                              <div>
                                <span v-if="Salestrading.monday[0].open">{{GetTime(Salestrading.monday[0].open)}}</span>
                                –
                                <span v-if="Salestrading.friday[0].open">{{GetTime(Salestrading.friday[0].close)}}</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Saturday</div>
                              <div>
                                <span v-if="Salestrading.saturday[0].current.value != 'open'"> {{Salestrading.saturday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Salestrading.saturday[0].open)}}</span>
                                  –
                                  <span v-if="Salestrading.saturday[0].close">{{GetTime(Salestrading.saturday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Sunday</div>
                              <div>
                                <span v-if="Salestrading.sunday[0].current.value != 'open'"> {{Salestrading.sunday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Salestrading.sunday[0].open)}}</span>
                                  –
                                  <span v-if="Salestrading.sunday[0].close">{{GetTime(Salestrading.sunday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <div class="el-item">

            <a class="uk-text-bold uk-accordion-title" :class="classes" href="#" aria-expanded="false">Used Cars Enquiry</a>

            <div class="uk-accordion-content uk-margin-remove-first-child">

              <div class="uk-panel uk-margin-small-left">

                <div class="el-item uk-panel uk-margin-small-left">

                  <div class="uk-child-width-expand uk-grid" uk-grid>
                    <div class="uk-margin-remove-first-child">
                      <h3 class="el-title uk-h5 uk-margin-small-top uk-margin-remove-bottom">
                        <div vlass="uk-text-bold"><span uk-icon="location"></span> {{UsedSalesAddress}}</div>
                      </h3>
                      <div class="uk-panel uk-margin-top">
                        <a :href="UsedSalesdirections" target="_blank" class="uk-link-text"><span uk-icon="forward"></span> Get Directions</a>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a itemprop="telephone" :href="`tel:${FormatPhone(UsedPhoneSales)}`" class="forcelink"><span uk-icon="receiver" class="uk-text-secondary"></span> {{PhoneSales}}</a>
                      </div>
                      <div class="uk-panel uk-margin-top"><a href="#" @click.prevent="showModal(0)" class="uk-text-secondary" aria-expanded="false">
                        <span uk-icon="search" class="uk-icon">
                      </span> Search Our Stock</a>
                    </div>
                      <div class="uk-first-column">

                        <p class="uk-margin-top"><span uk-icon="clock"></span> Trading Hours </p>

                        <ul class="uk-list uk-list-collapse uk-margin-small-top">
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Monday – Friday</div>
                              <div>
                                <span v-if="UsedSalestrading.monday[0].open">{{GetTime(UsedSalestrading.monday[0].open)}}</span>
                                –
                                <span v-if="UsedSalestrading.friday[0].open">{{GetTime(UsedSalestrading.friday[0].close)}}</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Saturday</div>
                              <div>
                                <span v-if="UsedSalestrading.saturday[0].current.value != 'open'"> {{UsedSalestrading.saturday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(UsedSalestrading.saturday[0].open)}}</span>
                                  –
                                  <span v-if="UsedSalestrading.saturday[0].close">{{GetTime(UsedSalestrading.saturday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Sunday</div>
                              <div>
                                <span v-if="UsedSalestrading.sunday[0].current.value != 'open'"> {{UsedSalestrading.sunday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(UsedSalestrading.sunday[0].open)}}</span>
                                  –
                                  <span v-if="UsedSalestrading.sunday[0].close">{{GetTime(UsedSalestrading.sunday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="el-item">

            <a class="uk-text-bold uk-accordion-title" :class="classes" href="#" aria-expanded="false">Service Enquiry</a>

            <div class="uk-accordion-content uk-margin-remove-first-child">

              <div class="uk-panel uk-margin-small-left">

                <div class="el-item uk-panel uk-margin-small-left">

                  <div class="uk-child-width-expand uk-grid" uk-grid>
                    <div class="uk-margin-remove-first-child">
                      <h3 class="el-title uk-h5 uk-margin-small-top uk-margin-remove-bottom">
                        <div vlass="uk-text-bold"><span uk-icon="location"></span> {{ServiceAddress}}</div>
                      </h3>
                      <div class="uk-panel uk-margin-top">
                        <router-link to="/service" title="Book a service">
                          <span uk-icon="cog" class="uk-text-secondary"></span> Book a service
                        </router-link>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a :href="Servicedirections" target="_blank" class="uk-link-text"><span uk-icon="forward"></span> Get Directions</a>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneService)}`" class="forcelink"><span uk-icon="receiver" class="uk-text-secondary"></span> {{PhoneService}}</a>
                      </div>

                      <div class="uk-first-column">

                        <p class="uk-margin-top"><span uk-icon="clock"></span> Trading Hours </p>

                        <ul class="uk-list uk-list-collapse uk-margin-small-top">
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Monday – Friday</div>
                              <div>
                                <span v-if="Servicetrading.monday[0].open">{{GetTime(Servicetrading.monday[0].open)}}</span>
                                –
                                <span v-if="Servicetrading.friday[0].open">{{GetTime(Servicetrading.friday[0].close)}}</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Saturday</div>
                              <div>
                                <span v-if="Servicetrading.saturday[0].current.value != 'open'"> {{Servicetrading.saturday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Servicetrading.saturday[0].open)}}</span>
                                  –
                                  <span v-if="Servicetrading.saturday[0].close">{{GetTime(Servicetrading.saturday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Sunday</div>
                              <div>
                                <span v-if="Servicetrading.sunday[0].current.value != 'open'"> {{Servicetrading.sunday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Servicetrading.sunday[0].open)}}</span>
                                  –
                                  <span v-if="Servicetrading.sunday[0].close">{{GetTime(Servicetrading.sunday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <div class="el-item">

            <a class="uk-text-bold uk-accordion-title" :class="classes" href="#" aria-expanded="false">Parts Enquiry</a>

            <div class="uk-accordion-content uk-margin-remove-first-child">

              <div class="uk-panel uk-margin-small-left">

                <div class="el-item uk-panel uk-margin-small-left">

                  <div class="uk-child-width-expand uk-grid" uk-grid>
                    <div class="uk-margin-remove-first-child">
                      <h3 class="el-title uk-h5 uk-margin-small-top uk-margin-remove-bottom">
                        <div vlass="uk-text-bold"><span uk-icon="location"></span> {{PartsAddress}}</div>
                      </h3>
                      <div class="uk-panel uk-margin-top">
                        <router-link to="/parts" title="Book a service">
                          <span uk-icon="cog" class="uk-text-secondary"></span> Parts Enquiry
                        </router-link>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a :href="Partsdirections" target="_blank" class="uk-link-text"><span uk-icon="forward"></span> Get Directions</a>
                      </div>
                      <div class="uk-panel uk-margin-top">
                        <a itemprop="telephone" :href="`tel:${FormatPhone(PhoneParts)}`" class="forcelink"><span uk-icon="receiver" class="uk-text-secondary"></span> {{PhoneParts}}</a>
                      </div>

                      <div class="uk-first-column">

                        <p class="uk-margin-top"><span uk-icon="clock"></span> Trading Hours </p>

                        <ul class="uk-list uk-list-collapse uk-margin-small-top">
                          <li>

                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Monday – Friday</div>
                              <div>
                                <span v-if="Partstrading.monday[0].open">{{GetTime(Partstrading.monday[0].open)}}</span>
                                –
                                <span v-if="Partstrading.friday[0].open">{{GetTime(Partstrading.friday[0].close)}}</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Saturday</div>
                              <div>
                                <span v-if="Partstrading.saturday[0].current.value != 'open'"> {{Partstrading.saturday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Partstrading.saturday[0].open)}}</span>
                                  –
                                  <span v-if="Partstrading.saturday[0].close">{{GetTime(Partstrading.saturday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="uk-child-width-expand uk-grid-small uk-grid" uk-grid>
                              <div class="uk-first-column">Sunday</div>
                              <div>
                                <span v-if="Partstrading.sunday[0].current.value != 'open'"> {{Partstrading.sunday[0].current.label}}</span>
                                <span v-else>
                                  <span>{{GetTime(Partstrading.sunday[0].open)}}</span>
                                  –
                                  <span v-if="Partstrading.sunday[0].close">{{GetTime(Partstrading.sunday[0].close)}}</span>
                                </span>
                              </div>
                            </div>
                          </li>

                        </ul>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  </div>
  <hr>
</div>
</template>
<script>
export default {
  name: "contact-details",
  props: ["classes"],
  data: function() {
    return {
      siteName: this.$store.state.site.name,
      description: this.$store.state.site.description,
      showroom_address: this.$store.state.site.showroom_address,
      SalesAddress: this.$store.state.site.departments.sales.address,
      PhoneSales: this.$store.state.site.departments.sales.phone,
      Salestrading: this.$store.state.site.departments.sales.trading,
      Salesdirections: this.$store.state.site.departments.sales.map_directions,

      ///converted to new car sales
      UsedSalesAddress: this.$store.state.site.departments.sales.address,
      UsedPhoneSales: this.$store.state.site.departments.sales.phone,
      UsedSalestrading: this.$store.state.site.departments.sales.trading,
      UsedSalesdirections: this.$store.state.site.departments.sales.map_directions,

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
    showModal(index) {
      this.$store.dispatch("globalSearchSwitch", {
        show: true,
        tab: index
      });
    },
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
.el-item.uk-open .uk-accordion-title{
  background-color: #fff;
  box-shadow: 0px -7px 8px rgb(0 0 0 / 8%)
}
.el-item.uk-open .uk-accordion-content{
  margin-top: 0;
  background-color: #fff;
  box-shadow: 0px 7px 8px rgb(0 0 0 / 8%);
}
</style>
