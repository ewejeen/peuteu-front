export default {
  state: {
    nowProtein: 0,
  },
  getters: {
    getNowProtein(state) {
      return state.nowProtein;
    },
  },
  mutations: {
    updateProteinSum(state, amount) {
      return (state.nowProtein = amount);
    },
  },
  actions: {},
};
