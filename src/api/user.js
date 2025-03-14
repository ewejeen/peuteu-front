import { request } from "./index";

// 로그인
export const login = (payload) => {
  return request.post("/api/login", payload);
};

// 회원 가입
export const join = (payload) => {
  return request.post("/api/join", payload);
};

// 사용자 정보 조회
export const getUserInfo = () => {
  return request.get(`/api/user/me`);
};

// 사용자 정보 수정
export const updateUserInfo = (payload) => {
  return request.patch(`/api/user`, payload);
};

// 비밀번호 검증
export const validatePassword = (payload) => {
  return request.get("/api/user/password", {
    params: payload,
  });
};

// 로그아웃
export const logout = () => {
  return request.post("/api/logout", null);
};

// 이메일 중복 확인
export const checkEmail = (payload) => {
  return request.get("/api/user/check-email", {
    params: payload,
  });
};

// 닉네임 중복 확인
export const checkNickname = (payload) => {
  return request.get("/api/user/check-nickname", {
    params: payload,
  });
};