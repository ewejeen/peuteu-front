export default {
  state: {
    isLoggedIn: "",
  },
  getters: {
    getLoginStatus(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    initLoginResult(state) {
      return (state.isLoggedIn = "");
    },
    updateLoginResult(state, payload) {
      return (state.isLoggedIn = payload);
    },
  },
  actions: {},
};
