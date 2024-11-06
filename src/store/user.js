export default {
  state: {
    isLoggedIn: null,
    accessToken: "",
  },
  getters: {
    getLoginStatus(state) {
      return state.isLoggedIn;
    },
    getAccessToken(state) {
      return state.accessToken;
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
      console.log(accessToken);
      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
  },
  actions: {},
};
