import { request } from "./index";

export const saveProtein = (payload) => {
  return request.post(`/api/protein`, payload);
};

export const updateProtein = (payload) => {
  return request.patch(`/api/protein`, payload);
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

export const getProteinStatByMonth = (payload) => {
  return request.get(`/api/protein-month-stat`, {
    params: payload,
  });
};

export const getProteinSumByDates = (payload) => {
  return request.get(`/api/protein-sum-by-dates`, {
    params: payload,
  });
};

export const getProteinIntakeList = () => {
  return request.get(`/api/protein-intake-list`);
};

// 목표 프로틴 섭취량 조회
export const getMyProteinTarget = () => {
  return request.get(`/api/protein-target`);
};

// 목표 프로틴 섭취량 수정
export const updateMyProteinTarget = (payload) => {
  return request.patch(`/api/protein-target`, payload);
};

// 섭취량 자동 계산
export const calculateMyTarget = () => {
  return request.get(`/api/calculate-my-target`);
};