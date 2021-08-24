import Vec from "@/libs/Vec";

export default {
    namespaced: true,

    state() {
        return {
            crop: {
                pos: new Vec(0, 0),
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

        updateTag( state, { type, value }) {
            const { tags } = state;
            if( type === "add" ) {
                if( tags.includes( value ) ) return;
                tags.push( value );
            } else if ( type === "delete" ) {
                tags.splice( tags.indexOf( value ), 1 );
            }
        },

        updateImage( state, image ) {
            state.image = image;
        },
    }
}
