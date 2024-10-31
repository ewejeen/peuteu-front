import { request } from "./index";

export const login = (payload) => {
  return request.post("/api/login", payload);
};

export const join = (payload) => {
  return request.post("/api/join", payload);
};
