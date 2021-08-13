import { createStore } from "vuex";
import Vec from "@/libs/Vec";

export default createStore({
    state() {
        return {
            crop: {
                pos: new Vec(40, 40),
                size: new Vec(100, 100),
            }
        }
    },

    mutations: {
        setPosition( state, pos ) {
            state.crop.pos = pos;
        },

        setSize( state, size ) {
            state.crop.size = size;
        }
    }
});
