import { createStore } from "vuex";
import axios from "axios";

// state, getters, mutations, actions, modules
export default createStore({
  state: {
    counter: 2,
  },
  // mutation: state값 변경
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    },
  },
  // 서버에서 데이터 가져와서 수정하고 싶은 경우 (ajax 요청 등 서버 응답 시간 걸림)
  actions: {
    apiCallSample(state, value) {
      console.log(value);

      axios.get("https://codingapple1.github.io/vue/more0.json").then((res) => {
        console.log(res.data);
      });
    },
  },
  getters: {
    getTwoPowerCounter(state) {
      return state.counter ** 2;
    },
  },
});
