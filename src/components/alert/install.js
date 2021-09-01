import AlertTemplate from "./index";
import {createApp} from "vue";

export default {
    install( Vue ) {
        const container = () => {
            const p = document.createElement("div");
            p.className = "a-alert-container";

            document.body.appendChild(p);
            return p;
        }

        const show = (content, type) => {
            const app = createApp( AlertTemplate , { type, content });
            const instance = app.mount( document.createElement("div")  );
            const p = document.querySelector(".a-alert-container") || container();
            p.appendChild( instance.$el );
        }

        const message = {};

        [ "success", "fails", "info", "warning" ].forEach( type => {
            message[ type ] = ( content ) => show( content, type )
        });

        Vue.config.globalProperties.$message = message;
    }
}
