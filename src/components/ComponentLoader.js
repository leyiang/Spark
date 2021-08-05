import XHeader from "./XHeader";
import XDetail from "./XDetail";

export default {
    install( Vue ) {
        Vue.component("x-header", XHeader);
        Vue.component("x-detail", XDetail);
    }
}