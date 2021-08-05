import { createApp } from 'vue'
import App from './App.vue'

import router from "./pages/router.js";
import ComponentLoader from "@/components/ComponentLoader";

createApp(App)
    .use( router )
    .use( ComponentLoader )
    .mount('#app');