import { fetchNoAuthUrls } from "@/api/auth";

export default {
  state: {
    noAuthRequiredUrls: []
  },
  getters: {
    getNoAuthRequiredUrls(state) {
      return state.noAuthRequiredUrls;
    },
  },
  mutations: {
    setNoAuthRequiredUrls(state, noAuthRequiredUrls) {
      state.noAuthRequiredUrls = noAuthRequiredUrls;
    },
  },
  actions: {
    async fetchNoAuthUrls({commit}) {
      try {
        const response = await fetchNoAuthUrls();
        commit("setNoAuthRequiredUrls", response.data)
      } catch(error) {
        console.error("NoauthRequiredURL 로드 실패:", error);
      }
    }
  },
};
