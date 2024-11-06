import axios from "axios";
import { store } from "@/store/index";

function create(url) {
  const request = Object.assign({
    baseURL: url,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const instance = axios.create(request);
  registerInterceptor(instance);
  return instance;
}

function registerInterceptor(instance) {
  instance.interceptors.request.use(
    function (config) {
      if (store.getters.getAccessToken) {
        config.headers.Authorization = "Bearer " + store.getters.getAccessToken;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error.response);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error.response);
    }
  );
}

export const request = create(process.env.VUE_APP_API_URL);
