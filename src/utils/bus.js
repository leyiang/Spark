import EventBus from "@/libs/EventBus";

export default {
    install( app ) {
        app.config.globalProperties.$event = new EventBus;
    }
}
