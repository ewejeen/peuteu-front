import { createStore } from "vuex";
import test from "./test";
import user from "./user";
import protein from "./protein";

import createPersistedState from "vuex-persistedstate";
import auth from "./auth";

export const store = new createStore({
  modules: {
    test,
    user,
    protein,
    auth
  },
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ]
});
