import variables from "@/styles/element-variables.scss";
import storage from "store";

const state = {
  themeColor: storage.get("theme-color") || variables.theme,
  logo: true
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (key in state) {
      state[key] = value;
      // 主题保留本地
      if (key === "themeColor") {
        storage.set("theme-color", value);
      }
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
