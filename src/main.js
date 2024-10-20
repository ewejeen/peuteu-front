import { createApp } from "vue";
import App from "./App.vue";
import routers from "./router";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(vuetify).use(routers).use(store);
app.mount("#app");

app.provide("axios", axios);
