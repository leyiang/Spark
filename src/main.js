import { createApp } from 'vue'
import App from './App.vue'
import api from "./utils/api"
import bus from "./utils/bus"
import global from "./utils/global"

import router from "./pages/router.js";
import ComponentLoader from "@/components/ComponentLoader";

createApp(App)
    .use( api )
    .use( bus )
    .use( global )
    .use( router )
    .use( ComponentLoader )
    .mount('#app');
