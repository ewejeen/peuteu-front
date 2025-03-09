import { createWebHistory, createRouter } from "vue-router";
import { store } from "@/store/index";
import UserHome from "@/pages/UserHome.vue";
import UserLogin from "@/pages/UserLogin.vue";
import ProteinHistory from "@/pages/ProteinHistory.vue";
import ProteinAnalysis from "@/pages/ProteinAnalysis.vue";
import UserProfile from "@/pages/UserProfile.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import LoginLayout from "@/layouts/LoginLayout.vue";
import UserJoin from "@/pages/UserJoin.vue";
import UserInfo from "@/pages/UserInfo.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "UserHome",
        component: UserHome,
        meta: { requiresAuth: true },
      },
      {
        path: "/history",
        name: "ProteinHistory",
        component: ProteinHistory,
        meta: { requiresAuth: true },
      },
      {
        path: "/analysis",
        name: "ProteinAnalysis",
        component: ProteinAnalysis,
        meta: { requiresAuth: true },
      },
      {
        path: "/profile",
        name: "UserProfile",
        component: UserProfile,
        meta: { requiresAuth: true },
      },
      {
        path: "/user-info",
        name: "UserInfo",
        component: UserInfo,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: LoginLayout,
    children: [
      {
        path: "",
        name: "UserLogin",
        component: UserLogin,
      },
    ],
  },
  {
    path: "/join",
    component: LoginLayout,
    children: [
      {
        path: "",
        name: "UserJoin",
        component: UserJoin,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 사용자 로그인 상태 확인 함수 (JWT 토큰 여부)
function isAuthenticated() {
  return !!store.getters.getAccessToken;
}

// 로그인 체크: 인증 필요한 페이지(requiresAuth: true)에 접근 시 로그인 여부 확인
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next(); // 로그인되어 있거나 인증이 필요 없는 페이지면 그대로 진행
  }
});


export default router;
