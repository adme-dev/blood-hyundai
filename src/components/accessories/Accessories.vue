<template>
  <div v-if="accessories" class="uk-margin-medium-top">
    <div class="uk-h3 uk-text-bold">
      Choose your accessories
      <span v-if="cart.length" class="uk-float-right"
        ><span uk-icon="icon: cart"></span
        ><span class="uk-badge uk-margin-small-bottom uk-background-secondary">{{ cart.length }}</span></span
      >
    </div>

    <div v-if="cart.length" class="uk-width-1-1 checkout">
      <div class="uk-width-1-1">
        <ul class="uk-list uk-list-divider uk-margin-remove-bottom">
          <li v-for="(item, id) in cart" :key="id" class="uk-visible-toggle">
            <article>
              <div class="uk-grid-small uk-text-left" uk-grid>
                <div class="uk-width-auto">
                  <div
                    class="uk-background-cover uk-margin-small-right cart-image"
                    :style="{ backgroundImage: `url(${item.image})` }"
                  >
                    <canvas width="80px" height="60px"></canvas>
                  </div>
                </div>
                <div class="uk-width-expand">
                  <div class="uk-text-meta uk-text-secondary">{{ item.modal }}</div>
                  <div v-html="item.title"></div>
                  <div>
                    <div class="uk-text-emphasis">
                      <span class="uk-text-bold">{{ (item.price * item.quantity) | currency }}</span
                      ><sup>A1</sup>
                    </div>
                  </div>
                </div>
                <span
                  class="uk-badge uk-background-muted uk-text-danger uuk-position-relative uk-position-z-index"
                  href="#"
                  @click="sub(item)"
                  uk-icon="icon: close; ratio: .75"
                  uk-tooltip="Remove"
                ></span>
              </div>
            </article>
          </li>
          <li class="text-blue uk-h4 uk-margin-remove-bottom">
            Total: <b>{{ total | currency }}</b>
          </li>
        </ul>
      </div>
      <div class="uk-text-meta-xs">
        <sup>A1</sup>There may be a delay to any pricing updates displaying correctly on our materials. Always obtain confirmation
        on updated pricing from {{ siteName }}. All prices are subject to change at the discretion of {{ siteName }}.
      </div>
    </div>

    <div id="select-accessorie" class="uk-margin-remove-bottom">
      <div class="uk-accordion-content uk-margin-remove-top">
        <ul uk-accordion>
          <li
            v-for="(item, index) in groupedAccessories"
            :key="index"
            class="box-shadow-top uk-margin-remove-top accessorie-select"
          >
            <a class="uk-accordion-title uk-card uk-padding-small uk-text-capitalize" href="#" v-html="index"></a>
            <div class="uk-accordion-content">
              <ul class="uk-list uk-margin-remove">
                <li v-for="(cat, index) in item" :key="index">
                  <div class="uk-link-reset" @click="getAccessorie(cat.id)">
                    <div class="uk-grid-collapse selected_accessorie uk-grid">
                      <div class="uk-width-auto">
                        <img :data-src="'' + cat.image + ''" class="uk-padding-small width-xsmall" data-uk-img />
                      </div>
                      <div class="uk-width-expand uk-flex uk-flex-middle uk-text-left">
                        <div class="uk-padding-small">
                          <div class="uk-text-small uk-text-light">{{ cat.title }}</div>
                          <div v-if="cat.price" class="uk-width-1-1">
                            <b>{{ cat.price | currency }}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div id="modal-accessories" class="uk-flex-top" data-uk-modal>
      <div class="uk-modal-dialog uk-background-secondary uk-light uk-margin-auto-vertical uk-width-3-4@l">
        <div class="uk-modal-close-default uk-padding-small" type="button">
          <svg width="16" height="16" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon">
            <line fill="none" stroke="#eb0a1e" stroke-width="5" x1="1" y1="1" x2="13" y2="13"></line>
            <line fill="none" stroke="#eb0a1e" stroke-width="5" x1="13" y1="1" x2="1" y2="13"></line>
          </svg>
        </div>
        <div id="modal-body-accessories" class="uk-width-1-1">
          <div class="uk-grid-collapse uk-grid-match uk-child-width-1-2@l" uk-grid>
            <div>
              <div class="uk-cover-container">
                <canvas height="300" class="uk-visible@l"></canvas>
                <canvas height="400" class="uk-hidden@l"></canvas>
                <img src="/files/accessorie_default.jpg" :data-src="accessorie.image" uk-cover data-uk-img />
              </div>
            </div>
            <div>
              <div class="uk-padding-small">
                <div class="uk-width-1-1 uk-width-expand@m uk-text-left uk-padding uk-position-relative">
                  <div class="uk-text-muted uk-margin-remove uk-text-uppercase uk-h5" v-html="accessorie.category"></div>
                  <div>
                    <h3 class="uk-h2 uk-text-bold uk-margin-small-top title">
                      {{ accessorie.title }}
                    </h3>
                  </div>
                  <div v-if="accessorie.price" class="uk-width-1-1">
                    <b>{{ accessorie.price | currency }}</b
                    ><sup>*</sup>
                  </div>
                  <p class="uk-text-muted uk-text-light" v-html="accessorie.description"></p>
                  <div class="uk-text-muted uk-margin-medium-bottom">SKU: {{ accessorie.part_no }}</div>
                  <div class="uk-margin-auto-top">
                    <button
                      class="uk-light uk-button uk-button-default btm-red tm-button-default uk-text-bold"
                      @click="addItem(accessorie)"
                    >
                      Add to Enquiry
                    </button>
                  </div>
                  <div class="uk-text-meta-xs uk-margin-medium-top">
                    <sup>*</sup>There may be a delay to any pricing updates displaying correctly on our materials. Always obtain
                    confirmation on updated pricing from {{ siteName }}. All prices are subject to change at the discretion of
                    {{ siteName }}.
                  </div>
                  <div class="uk-text-meta-xs uk-margin-small-top">
                    Image shown is representative of the actual part and may not be exact. The recommended price of the
                    accessories shown includes recommended fitment cost. Note that fitment pricing may differ between dealers and
                    this may affect the final fitted accessory price. Fitting of some accessories may impact the installation of
                    other accessories. Contact your Toyota dealer for further information.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AccessoriesService } from "@/services";
export default {
  name: "accessories",
  props: {
    accessories: {
      type: [Array],
    },
  },
  data() {
    return {
      accessorie: [],
      cart: [],
      total: 0,
      clicked: false,
      siteName: this.$store.state.site.name,
    };
  },
  computed: {
    groupedAccessories() {
      var items = {};

      if (!this.vLodash.isEmpty(this.accessories)) {
        this.accessories.forEach((item) => {
          if (items[item.category] == undefined) {
            items[item.category] = [];
            items[item.category].push({
              title: item.title,
              image: item.image,
              category: item.category,
              price: item.price,
              id: item.id,
            });
          } else {
            items[item.category].push({
              title: item.title,
              image: item.image,
              category: item.category,
              price: item.price,
              id: item.id,
            });
          }
        });
      }

      return items;
    },
  },
  methods: {
    getAccessorie: function (id) {
      var vm = this;
      document.body.classList.add("is-loading");

      AccessoriesService.getAccessoryById(id).then((data) => {
        vm.accessorie = data;

        this.UIkit.modal("#modal-accessories").show();

        document.body.classList.remove("is-loading");
      });
    },
    addItem(accessorie) {
      this.UIkit.modal("#modal-accessories").hide();
      // Increment total price
      this.total += parseFloat(accessorie.price);
      let inCart = false;

      this.cart.push({
        id: accessorie.id,
        image: accessorie.image,
        title: accessorie.title,
        price: accessorie.price,
        quantity: 1,
      });

      let accessorieStorage = JSON.parse(sessionStorage.getItem("accessories")) || [];
      accessorieStorage.push({
        id: accessorie.id,
        image: accessorie.image,
        title: accessorie.title,
        price: accessorie.price,
        quantity: 1,
      });
      sessionStorage.setItem("accessories", JSON.stringify(accessorieStorage));
    },
    add(item) {
      this.total += parseFloat(item.price);
      item.quantity++;
    },
    sub(item) {
      const items = JSON.parse(sessionStorage.getItem("accessories"));
      const filtered = items.filter((item_) => item_.id !== item.id);
      sessionStorage.setItem("accessories", JSON.stringify(filtered));
      this.total -= parseFloat(item.price);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);

            break;
          }
        }
      }
    },
  },
  filters: {
    currency(price) {
      return "$" + price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
};
</script>
<style lang="scss" scoped>
.width-xsmall {
  width: 120px;
}
.width-xxsmall {
  width: 80px;
}
.uk-accordion-content .selected_accessorie:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
.btm-red {
  color: #fff;
  border: 4px solid #eb0a1e;
  background-color: #eb0a1e;
}
.text-xsmeta {
  font-size: 0.675rem;
  line-height: 1.4;
  color: #999;
}
</style>
