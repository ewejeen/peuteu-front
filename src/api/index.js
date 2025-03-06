import axios from "axios";
import { store } from "@/store/index";
import router from "@/router";

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
      const token = store.getters.getAccessToken;
      const url = config.url;
      const whitelist = ['/api/login', '/api/join'];

      if(!token && whitelist.indexOf(url) == -1) {
        return Promise.reject({
          response: { status: 401, message: "Unauthorized" }
        });
      }

      config.headers.Authorization = "Bearer " + store.getters.getAccessToken;
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
      if (error.status === 403) {
        console.warn("403 Forbidden - 로그인 페이지로 이동합니다.");

        store.commit("logout");
        router.replace("/login");
        return Promise.reject(error);
      }
      
      return Promise.reject(error.response);
    }
  );
}

export const request = create(process.env.VUE_APP_API_URL);
