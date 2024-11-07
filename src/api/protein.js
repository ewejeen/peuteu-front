import { request } from "./index";

export const saveProtein = (payload) => {
  return request.post(`/api/protein`, payload);
};

export const getProteinList = (payload) => {
  return request.get(`/api/protein`, {
    params: payload,
  });
};

export const getNowProteinSum = () => {
  return request.get(`/api/protein-sum`);
};

export const deleteProtein = (id) => {
  return request.delete(`/api/protein`, {
    params: {
      proteinId: id,
    },
  });
};
