import { request } from "./index";

export const test1 = (payload) => {
  return request.post(`/api/test-post`, payload);
};

export const test2 = (code) => {
  return request.get(`/api/test-get`, {
    params: {
      code: code,
    },
  });
};

export const test3 = (model) => {
  const res = request.get(`/api/test-get-model`, {
    params: model,
  });
  return res;
};
