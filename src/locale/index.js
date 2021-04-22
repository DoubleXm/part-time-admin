import Vue from "vue";
import VueI18n from "vue-i18n";
import storage from "store";
import customZhCn from "./lang/zh-CN";
import customUsEn from "./lang/en-US";

import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import ElementLocale from "element-ui/lib/locale";

Vue.use(VueI18n);

// 自动根据系统浏览器语言设置语言
const navLang = navigator.language;
const localLang = navLang === "zh-CN" || navLang === "en-US" ? navLang : false;
let lang = localLang || storage.get("local") || "zh-CN";

Vue.config.lang = lang;

// Vue.locale = () => { };
const messages = {
  "zh-CN": Object.assign(zhLocale, customZhCn),
  "en-US": Object.assign(enLocale, customUsEn)
};
const i18n = new VueI18n({
  locale: lang,
  messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
