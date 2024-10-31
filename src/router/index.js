import { createWebHistory, createRouter } from "vue-router";
import UserHome from "@/pages/UserHome.vue";
import UserLogin from "@/pages/UserLogin.vue";
import ProteinHistory from "@/pages/ProteinHistory.vue";
import ProteinAnalysis from "@/pages/ProteinAnalysis.vue";
import UserProfile from "@/pages/UserProfile.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import LoginLayout from "@/layouts/LoginLayout.vue";
import UserJoin from "@/pages/UserJoin.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "UserHome",
        component: UserHome,
      },
      {
        path: "/history",
        name: "ProteinHistory",
        component: ProteinHistory,
      },
      {
        path: "/analysis",
        name: "ProteinAnalysis",
        component: ProteinAnalysis,
      },
      {
        path: "/profile",
        name: "UserProfile",
        component: UserProfile,
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

export default router;
