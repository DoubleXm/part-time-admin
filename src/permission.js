import Nprogress from "nprogress";
import storage from "store";
import router from "./router";
import "nprogress/nprogress.css";

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  Nprogress.start();

  const hasToken = storage.get("token");

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      Nprogress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: "/login" });
      Nprogress.done();
    }
  }
});

router.afterEach(() => {
  Nprogress.done();
});
