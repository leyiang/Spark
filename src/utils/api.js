import Vue from "vue";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/spark/backend/public/api"
});

export default {
    install( app ) {
        app.config.globalProperties.$api = api;
    }
}
