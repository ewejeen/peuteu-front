import { createApp } from "vue";
import App from "./App.vue";
import routers from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(vuetify).use(routers).mount("#app");
