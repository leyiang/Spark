import XHeader from "./XHeader";
import XDetail from "./XDetail";
import ATagSelector from "@/components/ATagSelector";

export default {
    install( Vue ) {
        Vue.component("x-header", XHeader);
        Vue.component("x-detail", XDetail);
        Vue.component("a-tag-selector", ATagSelector);
    }
}
