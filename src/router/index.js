import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/login",
    component: () => import("@/views/user/Login.vue"),
    hide: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "icon-dashboard" }
      }
    ]
  },
  {
    path: "/error",
    component: Layout,
    meta: { title: "错误页面", icon: "icon-yichang" },
    children: [
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { title: "401", icon: "icon-icon-test" }
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { title: "404", icon: "icon-icon-test1" }
      }
    ]
  },
  {
    path: "/part-time",
    component: Layout,
    meta: { title: "app管理", icon: "icon-app" },
    children: [
      {
        path: "/user",
        component: () => import("@/views/part-time/User/index.vue"),
        meta: { title: "用户管理", icon: "icon-yonghuguanli" }
      },
      {
        path: "/task",
        component: () => import("@/views/part-time/Task/index.vue"),
        meta: { title: "任务管理", icon: "icon-renwuguanli" }
      },
      {
        path: "/practice",
        component: () => import("@/views/part-time/Practice/index.vue"),
        meta: { title: "实习/兼职管理", icon: "icon-jianzhiguanli" }
      },
      {
        path: "/course",
        component: () => import("@/views/part-time/Course/index.vue"),
        meta: { title: "宝典管理", icon: "icon-shujiguanli" }
      }
    ]
  },
  {
    path: "*",
    hide: true,
    component: () => import("@/views/error-page/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
