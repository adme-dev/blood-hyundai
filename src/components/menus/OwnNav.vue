<template>
  <div class="uk-flex uk-grid-collapse showroomnav uk-grid">
    <div class="uk-flex-last uk-flex-first@l uk-width-1-4@l uk-background-default menu-side-nav">
      <div class="uk-padding stickytop uk-margin-medium-top">
        <div class="uk-flex uk-text-muted uk-text-small uk-margin-medium-bottom space33">
          <div class="uk-margin-small-top">OWNERSHIP ESSENTIALS</div>
        </div>

        <ul class="uk-child-width-1-1 uk-margin-medium-bottom uk-grid-collapse uk-grid" uk-margin>
          <li class="uk-margin-small-top uk-first-column">
            <a
              @click="closeModel"
              href="https://www.toyota.com.au/mytoyota-home"
              rel="nofollow noreferrer"
              target="_blank"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >myToyota</a
            >
          </li>
          <li class="uk-margin-small-top uk-first-column">
            <router-link
              @click.native="closeModel"
              to="/service"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Servicing</router-link
            >
          </li>
          <li class="uk-margin-small-top uk-first-column">
            <a
              @click="closeModel"
              href="/warranty"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Warranty
            </a>
          </li>
          <li class="uk-margin-small-top uk-first-column uk-hidden">
            <a
              href="#global-search-modal"
              uk-toggle
              @click="closeModel"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Explore Accessories
            </a>
          </li>
          <li class="uk-margin-small-top uk-first-column">
            <a
              @click="closeModel"
              href="https://www.toyota.com.au/car-insurance"
              rel="nofollow noreferrer"
              target="_blank"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Insurance</a
            >
          </li>
          <li class="uk-margin-small-top uk-first-column">
            <a
              @click="closeModel"
              href="https://toyotafinanceonline.com.au/Login/TFLogin.aspx"
              rel="nofollow noreferrer"
              target="_blank"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Manage my finance
              <svg class="ts-svg-icon -stroke-replace" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 1H11M11 0V9M11 1L1 11" stroke="#333" stroke-width="2"></path>
              </svg>
            </a>
          </li>
          <li class="uk-margin-medium-top">
            <router-link
              @click.native="closeModel"
              to="/service"
              class="uk-button uk-button-secondary tm-button-default uk-text-left uk-light uk-text-capitalize uk-width-auto"
              >Book a Service
            </router-link>
          </li>
        </ul>

        <div class="uk-flex uk-text-muted uk-text-small uk-margin-medium-bottom space33">
          <div class="uk-margin-small-top">PARTS AND REPAIRS</div>
        </div>
        <ul class="uk-child-width-1-1 uk-margin-large-bottom uk-grid-collapse uk-grid" uk-margin>
          <li class="uk-margin-small-top uk-first-column">
            <router-link
              @click.native="closeModel"
              to="/parts"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Toyota Genuine Parts</router-link
            >
          </li>
          <li class="uk-margin-small-top uk-first-column">
            <router-link
              @click.native="closeModel"
              to="/service"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Accident repairs</router-link
            >
          </li>
          <li class="uk-margin-small-top uk-first-column">
            <a
              @click="closeModel"
              href="https://www.toyota.com.au/toyota-recalls"
              rel="nofollow noreferrer"
              target="_blank"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Safety Recalls and Service Campaigns
            </a>
          </li>
          <li class="uk-margin-small-top uk-first-column uk-hidden">
            <a
              href="#global-search-modal"
              uk-toggle
              @click="closeModel"
              class="uk-button uk-button-text uk-text-left uk-text-lead uk-text-capitalize uk-width-auto"
              >Vehicle payload
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="uk-width-expand@s uk-background-cover uk-background-bottom-center"
      style="background-image: url(/assets/images/own_service_web.jpg)"
    >
      <div class="showroom-menu uk-margin-medium-bottom">
        <div class="uk-padding uk-visible@l">
          <h3 class="uk-h1 uk-text-bold uk-margin-small-left uk-margin-small-bottom uk-visible@l">Toyota Genuine Servicing</h3>
          <div class="uk-margin-small-left uk-text-meta">Only the best for your Toyota</div>
          <a
            type="button"
            @click="closeModel"
            class="uk-margin-auto-left uk-position-top-right uk-position-medium"
            aria-expanded="true"
            ><svg width="35" height="35" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close">
              <path fill="none" stroke="#002c5f" stroke-width="1.5" d="M16,16 L4,4"></path>
              <path fill="none" stroke="#002c5f" stroke-width="1.5" d="M16,4 L4,16"></path></svg
          ></a>
          <router-link
            @click.native="closeModel"
            to="/service"
            class="
              uk-button uk-button-default
              tm-button-default
              uk-text-left uk-margin-medium-top uk-text-uppercase uk-width-auto
            "
            >Book a Service
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModel() {
      this.UIkit.drop("#own-nav-dropdown").hide();
    },
  },
};
</script>
