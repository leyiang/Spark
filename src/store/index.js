import { createStore } from "vuex";
import Vec from "@/libs/Vec";

export default createStore({
    state() {
        return {
            crop: {
                pos: new Vec(40, 40),
                size: new Vec(100, 100),
            },

            tags: [],
        }
    },

    mutations: {
        setPosition( state, pos ) {
            state.crop.pos = pos;
        },

        setSize( state, size ) {
            state.crop.size = size;
        },

        addTag( state, tag ) {
            if( state.tags.includes(tag) ) return;
            state.tags.push(tag);
        },

        removeTag( state, tag ) {
            let { tags } = state;
            tags.splice( tags.indexOf(tag), 1 );
        }
    }
});
