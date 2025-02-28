export default {
  state: {
    isLoggedIn: null,
    accessToken: "",
    refreshToken: "",
  },
  getters: {
    getLoginStatus(state) {
      return state.isLoggedIn;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
  },
  mutations: {
    initLoginResult(state) {
      return (state.isLoggedIn = null);
    },
    updateLoginResult(state, result) {
      return (state.isLoggedIn = result);
    },
    setAccessToken(state, accessToken) {
      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
    setRefreshToken(state, refreshToken) {
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
    },
    logout(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoggedIn = null;
    },
  },
  actions: {},
};
