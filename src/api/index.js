import request from "@/libs/request";

/**
 * 登 录
 * @param password
 * @param phone_number
 */
export function login(data) {
  return request({
    url: "/user/login",
    method: "POST",
    data
  });
}

/**
 * 宝典列表
 * @param limit
 * @param offset
 * @param order
 * @param sort
 */
export function getCourse(params) {
  return request({
    url: "/course",
    method: "GET",
    params
  });
}

// 获取用户列表
export function getUser(params) {
  return request({
    url: "/user/admin",
    method: "GET",
    params
  });
}

// 删除用户
export function delUser(id) {
  return request({
    url: "/user/admin/" + id,
    method: "DELETE"
  });
}

// 门任务列表
export function getDoor(params) {
  return request({
    url: "/door",
    method: "GET",
    params
  });
}
// 修改门任务
export function setDoor(data) {
  return request({
    url: "/door/admin",
    method: "PUT",
    data
  });
}
// 删除门任务
export function delDoor(params) {
  return request({
    url: "/door/admin",
    method: "DELETE",
    params
  });
}
// 添加门任务
export function addDoor(data) {
  return request({
    url: "/door/admin",
    method: "POST",
    data
  });
}

// 门任务提交列表
export function getDoorRecord(params) {
  return request({
    url: "/door/admin/submit",
    method: "GET",
    params
  });
}
// 门任务提交
export function addDoorRecord(data) {
  return request({
    url: "/door/submit",
    method: "POST",
    data
  });
}
// 门任务提交状态修改
export function setDoorRecord(data) {
  return request({
    url: "/door/admin/submit",
    method: "PUT",
    data
  });
}
// 们任务提交删除
export function delDoorRecord(params) {
  return request({
    url: "/door/admin/submit",
    method: "DELETE",
    params
  });
}

// 兼职实习
export function getPrictice(params) {
  return request({
    url: "/prictice",
    method: "GET",
    params
  });
}
// 分类列表
export function getCategoryList() {
  return request({
    url: "/prictice/classify",
    method: "GET"
  });
}
