import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import VueClipboard from "vue-clipboard2";
import i18n from "./locale";
// 重置样式
import "normalize.css/normalize.css";
// global css
import "@/styles/index.scss";
// auth controller
import "./permission";

Vue.config.productionTip = false;
Vue.use(VueClipboard);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
