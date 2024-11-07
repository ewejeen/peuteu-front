import { createStore } from "vuex";
import test from "./test";
import user from "./user";
import protein from "./protein";

export const store = new createStore({
  modules: {
    test,
    user,
    protein,
  },
});
