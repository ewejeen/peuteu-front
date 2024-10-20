export default {
  state: {
    test1Items: "",
    test2Items: "",
    test3Items: "",
  },
  getters: {
    getItems1(state) {
      return state.test1Items;
    },
    getItems2(state) {
      return state.test2Items;
    },
    getItems3(state) {
      return state.test3Items;
    },
  },
  mutations: {
    updateItems1(state, payload) {
      return (state.test1Items = payload);
    },
    updateItems2(state, payload) {
      return (state.test2Items = payload);
    },
    updateItems3(state, payload) {
      return (state.test3Items = payload);
    },
  },
  actions: {},
};
