import { request } from "./index";

export const saveProtein = (payload) => {
  return request.post(`/api/protein`, payload);
};
