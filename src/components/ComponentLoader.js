import XHeader from "./XHeader";
import XDetail from "./XDetail";
import ATagSelector from "./ATagSelector";
import AnAlertInstaller from "./alert/install";

export default {
    install( Vue ) {
        Vue.component("x-header", XHeader);
        Vue.component("x-detail", XDetail);
        Vue.component("a-tag-selector", ATagSelector);

        Vue.use( AnAlertInstaller );
    }
}
