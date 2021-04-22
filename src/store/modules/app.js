import storage from "store";

const state = {
  local: storage.get("local") || navigator.language,
  sidebar: {
    opened: !!+storage.get("sidebarStatus") || true
  }
};
const mutations = {
  SET_LOCAL: (state, local) => {
    state.local = local;
    storage.set("local", local);
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    const opened = storage.get("sidebarStatus");
    if (opened) {
      storage.set("sidebarStatus", true);
    } else {
      storage.set("sidebarStatus", false);
    }
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
