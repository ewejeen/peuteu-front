import { request } from "./index";

export const fetchNoAuthUrls = () => {
  const result = request.get(`/api/no-auth-required-urls`);
  return result;
};