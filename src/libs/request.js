import axios from "axios";
import storage from "store";
import { Message } from "element-ui";
import router from "@/router";

const exceptionCode = [
  { code: 401, message: "token失效" },
  { code: 500, message: "服务器错误" },
  { code: 403, message: "没有权限访问" },
  { code: 404, message: "请求资源不存在" },
  { code: 412, message: "用户不存在" }
];

const serives = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://192.168.50.89:8080",
  timeout: 10000
});

serives.interceptors.request.use(
  config => {
    const token = storage.get("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

serives.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message) || "Error");
    } else {
      return res;
    }
  },
  error => {
    console.log("response err: ", error);
    exceptionCode.forEach(item => {
      if (String(error).includes(`${item.code}`)) {
        // token 过期
        if (String(error).includes("412")) {
          router.push("/login");
        }
        Message({
          message: item.message,
          type: "error",
          center: true
        });
        return Promise.reject(new Error(item.message) || "Error");
      }
    });
  }
);

export default serives;
