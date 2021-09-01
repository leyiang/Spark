import AlertTemplate from "./index";
import {createApp} from "vue";

export default {
    install( Vue ) {
        Vue.config.globalProperties.$alert = () => {
            const app = createApp( AlertTemplate , {
                type: "success",
                content: "123",
            });
            const instance = app.mount( document.createElement("div")  );
            document.querySelector(".a-alert-container").appendChild( instance.$el );
        }
    }
}
