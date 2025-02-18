import Vue from "vue";

import _ from "lodash";
Object.defineProperty(Vue.prototype, "vLodash", { value: _ });

import VueMeta from "vue-meta";
Vue.use(VueMeta);

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);
Vue.mixin({
  data: function() {
    return {
      get UIkit() {
        return UIkit;
      },
    };
  },
});

import DriveAgentUI from "driveagent-ui/src/main";
import "driveagent-ui/dist/driveagent-ui.css";
Vue.use(DriveAgentUI)

import axios from "axios";
axios.interceptors.request.use(function(config) {
  config.headers.Authorization = `token ${process.env.VUE_APP_JWT}`;
  return config;
});

const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

Vue.config.productionTip = false;

import { initVue } from "./services";
initVue(params);
