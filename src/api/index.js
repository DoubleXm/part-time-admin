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
