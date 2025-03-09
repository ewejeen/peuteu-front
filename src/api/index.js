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
      const whitelist = ['/api/login', '/api/join', '/api/refresh'];

      if(!token && whitelist.indexOf(url) == -1) {
        return Promise.reject({
          response: { status: 401, message: "Unauthorized" }
        });
      }

      if (token) {
        config.headers.Authorization = "Bearer " + token;
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
    async function (error) {
      const originalRequest = error.config;

       // 401 에러 발생 시 -> `/api/refresh` 호출 후 재요청
      if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true; // 무한 반복 방지

        try {
          console.log('토큰 재발급 시도')
          const refreshResponse = await instance.post("/api/refresh", {}, { withCredentials: true });

          if(refreshResponse.status !== 200) {
            console.log('Refresh Token 없음 - 로그아웃')
            store.commit("logout");
            router.replace("/login");
            return Promise.reject(refreshResponse.response);
          }

          const newAccessToken = refreshResponse.data.accessToken;

          // 새 Access Token 저장
          store.commit("setAccessToken", newAccessToken);

          // 기존 요청에 새로운 Access Token 추가 후 재시도
          originalRequest.headers.Authorization = "Bearer " + newAccessToken;
          return instance(originalRequest);
        } catch (refreshError) {
          console.warn("Refresh Token도 만료됨 - 로그인 페이지로 이동");
          store.commit("logout");
          router.replace("/login");
          return Promise.reject(refreshError);
        }
      }

      // 403(권한 없음) 또는 Refresh Token 만료 시 -> 로그인 페이지로 이동
      if (error.response.status === 403) {
        console.warn("403 - 로그인 페이지로 이동합니다.");
        store.commit("logout");
        router.replace("/login");
      }

      return Promise.reject(error.response);
    }
  );
}

export const request = create(process.env.VUE_APP_API_URL);
