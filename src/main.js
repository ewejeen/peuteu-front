import { createApp } from "vue";
import App from "./App.vue";
import routers from "./router";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { loadFonts } from "./plugins/webfontloader";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { setupCalendar, Calendar } from "v-calendar";
import "v-calendar/style.css";

loadFonts();

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(vuetify).use(routers).use(store).use(setupCalendar, {});
app.mount("#app");

app.provide("axios", axios);
app.component("VueDatePicker", VueDatePicker);
app.component("VCalendar", Calendar);
