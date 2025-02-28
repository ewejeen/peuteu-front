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
      if (store.getters.getAccessToken) {
        config.headers.Authorization = "Bearer " + store.getters.getAccessToken;
      }
      if (store.getters.getRefreshToken) {
        config.headers.AuthorizationRefresh = "Bearer " + store.getters.getRefreshToken;
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
      
      console.log(error.status)
      if (error.status === 403) {
        console.warn("403 Forbidden - 로그인 페이지로 이동합니다.");
        store.commit("logout"); // Vuex에서 사용자 로그아웃 처리
        router.replace("/login");
        return ;
      }
      return Promise.reject(error.response);
    }
  );
}

export const request = create(process.env.VUE_APP_API_URL);
