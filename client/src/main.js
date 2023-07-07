import "./assets/main.css";

import { createApp } from "vue";
import store from "./stores";
import App from "./App.vue";
import router from "./router";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// interceptor
import setupInterceptors from "./services/setupInterceptors";
setupInterceptors(store);

const vuetify = createVuetify({
  components,
  directives,
});

const options = {
  // You can set your default options here
  position: POSITION.RIGHT,
};

const app = createApp(App);

app.use(vuetify);
app.use(Toast, options);
app.use(store);
app.use(router);

app.mount("#app");
