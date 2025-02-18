<template>
  <div class="body-404 uk-light" uk-height-viewport>
    <div class="bg-img-404"></div>

    <div class="uk-position-center-left uk-position-medium">
      <div class="uk-width-3-4@s">
        <h1 class="error-h1">404</h1>
        <h2 class="error-h2">Oops, the page you're looking for does not exist.</h2>
        <p>
          Sorry, but the page you’re looking for does not exist or has been deleted. "Nothing to see here!"
        </p>
        <router-link to="/" class="btn-404">
          RETURN HOME
        </router-link>
        <router-link to="/contact" class="btn-404">
          CONTACT US
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import MetaMixin from "@/mixins/meta";
export default {
  layout: 'empty',
  mixins: [MetaMixin],
  metaInfo: {
    title: "404 Not Found",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The requested page could not be found on our website.",
      },
    ],
  },
  methods: {
    // showModal(index) {
    //   this.$store.dispatch("globalSearchSwitch", {
    //     show: true,
    //     tab: index
    //   });
    // }
  }
}
</script>

<style>
.body-404 {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #000;
}

.bg-img-404 {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('/assets/images/404.gif') no-repeat center center fixed;
  background-size: cover;
  background-color: #000;
  opacity: 0.4;
  filter: alpha(opacity=50);
}


.error-h1 {
  font-size: 160px;
  margin-bottom: 0;
  margin-top: 0;
}

.error-h2 {
  margin-top: 0;
  max-width: 700px;
  font-size: 30px;
  width: 90%;
}

.btn-404 {
  display: inline-block;
  border: 1px solid #aaa;
  border-radius: 40px;
  padding: 15px 30px;
  margin-right: 15px;
  margin-bottom: 10px;
}

.btn-404:hover {
  color: #e2e2e2;
  background: rgba(255, 255, 255, 0.1);
}

@media only screen and (max-width: 480px) {
  .error-h1 {
    font-size: 120px;
  }
}
</style>
