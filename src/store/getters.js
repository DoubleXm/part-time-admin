const getters = {
  sidebar: state => state.app.sidebar,
  themeColor: state => state.setting.themeColor,
  hasLogo: state => state.setting.logo
};

export default getters;
