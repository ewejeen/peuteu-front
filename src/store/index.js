import { createStore } from "vuex";
import test from "./test";
import user from "./user";

export const store = new createStore({
  modules: {
    test,
    user,
  },
});
