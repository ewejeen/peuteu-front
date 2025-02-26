import { createStore } from "vuex";
import test from "./test";
import user from "./user";
import protein from "./protein";

import createPersistedState from "vuex-persistedstate";

export const store = new createStore({
  modules: {
    test,
    user,
    protein,
  },
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ]
});
