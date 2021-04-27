import request from "@/libs/request";

/**
 * 登 录
 * @param password
 * @param phone_number
 */
export function login(data) {
  return request({
    url: "api/user/login",
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
    url: "api/course",
    method: "GET",
    params
  });
}

// 获取用户列表
export function getUser(params) {
  return request({
    url: "api/user/admin",
    method: "GET",
    params
  });
}

// 删除用户
export function delUser(id) {
  return request({
    url: "api/user/admin/" + id,
    method: "DELETE"
  });
}

// 门任务列表
export function getDoor(params) {
  return request({
    url: "api/door",
    method: "GET",
    params
  });
}
// 修改门任务
export function setDoor(data) {
  return request({
    url: "api/door/admin",
    method: "PUT",
    data
  });
}
// 删除门任务
export function delDoor(params) {
  return request({
    url: "api/door/admin",
    method: "DELETE",
    params
  });
}
// 添加门任务
export function addDoor(data) {
  return request({
    url: "api/door/admin",
    method: "POST",
    data
  });
}

// 门任务提交列表
export function getDoorRecord(params) {
  return request({
    url: "api/door/admin/submit",
    method: "GET",
    params
  });
}
// 门任务提交
export function addDoorRecord(data) {
  return request({
    url: "api/door/submit",
    method: "POST",
    data
  });
}
// 门任务提交状态修改
export function setDoorRecord(data) {
  return request({
    url: "api/door/admin/submit",
    method: "PUT",
    data
  });
}
// 们任务提交删除
export function delDoorRecord(params) {
  return request({
    url: "api/door/admin/submit",
    method: "DELETE",
    params
  });
}