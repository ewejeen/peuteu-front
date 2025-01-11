import { request } from "./index";

export const login = (payload) => {
  return request.post("/api/login", payload);
};

export const join = (payload) => {
  return request.post("/api/join", payload);
};

// 사용자 정보 조회
export const getUserInfo = (id) => {
  return request.get(`/api/user/${id}`);
};

// 사용자 정보 수정
export const updateUserInfo = (payload) => {
  return request.patch(`/api/user`, payload);
};
