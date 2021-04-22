import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import setting from "./modules/setting";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    app,
    setting
  },
  getters
});
