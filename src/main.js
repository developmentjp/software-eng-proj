import { createApp } from "vue";
import App from "./App.vue";
// import AppNew from "./AppNew.vue";

import router from "./router";

// import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/themes/md-dark-deeppurple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";

import VueScrollTo from "vue-scrollto";
const app = createApp(App);

app.component("p-button", Button);
app.use(VueScrollTo);
app.use(router);
app.mount("#app");
