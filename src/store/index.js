import { createStore } from "vuex";
import test from "./test";

export const store = new createStore({
  modules: {
    test,
  },
});
