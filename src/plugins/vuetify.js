// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { VCalendar } from "vuetify/labs/VCalendar";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  components: {
    VCalendar,
  },
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
});
