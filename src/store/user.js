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
    getLoginResult(state, payload) {
      return (state.isLoggedIn = payload);
    },
  },
  actions: {},
};
