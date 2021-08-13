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
            image: null,
        }
    },

    mutations: {
        updateCrop( state, { type, value }) {
            if( ! Object.keys( state.crop ).includes(type) ) return;
            state.crop[ type ] = value;
        },

        updateTag( state, { type, tag }) {
            const { tags } = state;
            if( type === "add" ) {
                if( tags.includes(tag) ) return;
                tags.push(tag);
            } else if ( type === "delete" ) {
                tags.splice( tags.indexOf(tag), 1 );
            }
        },

        updateImage( state, { type, value } ) {
            if( type === "object" ) {
                return state.image = value;
            }

            if( ! state.image ) state.image = {};
            state.image[ type ] = value;
        }
    }
});
