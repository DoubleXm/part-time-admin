import storage from "store";
import { login } from "@/api";

const state = {
  token: storage.get("token"),
  userInfo: null
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, info) => {
    state.userInfo = info;
  }
};
const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(({ data }) => {
          commit("SET_TOKEN", data.token);
          commit("SET_USERINFO", data.info);
          storage.set("token", data.token);
          storage.set("userInfo", data.info);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    storage.remove("token");
    storage.remove("userInfo");
    commit("SET_TOKEN", "");
    commit("SET_USERINFO", "");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
