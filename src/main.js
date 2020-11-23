import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";

const app = createApp(App);

app.component("p-button", Button);

app.use(router);
app.mount("#app");
