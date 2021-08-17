import { createStore } from "vuex";

import EditModule from "./modules/edit";
import PageModule from "./modules/page";

export default createStore({
    state() {},
    mutations: {},
    modules: {
        edit: EditModule,
        page: PageModule
    }
});
