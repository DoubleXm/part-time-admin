import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
    hide: true
  },
  {
    path: "/register",
    component: () => import("@/views/login/Register.vue"),
    hide: true
  },
  {
    path: "/",
    component: Layout,
    meta: { title: "dashboard" },
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "dashboard" }
      }
    ]
  },
  {
    path: "/error",
    component: Layout,
    meta: { title: "错误页面" },
    redirect: "/error/401",
    children: [
      {
        path: "/401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { title: "401" }
      },
      {
        path: "/404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { title: "404" }
      }
    ]
  },
  {
    path: "/part-time",
    component: Layout,
    meta: { title: "app管理" },
    redirect: "/part-time/user",
    children: [
      {
        path: "/user",
        component: () => import("@/views/part-time/User/index.vue"),
        meta: { title: "用户管理" }
      },
      {
        path: "/task",
        component: () => import("@/views/part-time/Task/index.vue"),
        meta: { title: "任务管理" }
      },
      {
        path: "/practice",
        component: () => import("@/views/part-time/Practice/index.vue"),
        meta: { title: "实习/兼职管理" }
      },
      {
        path: "/course",
        component: () => import("@/views/part-time/Course/index.vue"),
        meta: { title: "宝典管理" }
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
