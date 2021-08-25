import Vec from "@/libs/Vec";

export default {
    namespaced: true,

    state() {
        return {
            crop: {
                pos: new Vec(0, 0),
                size: new Vec(100, 100),
            },

            image: null,
        }
    },

    mutations: {
        updateCrop( state, { type, value }) {
            if( ! Object.keys( state.crop ).includes(type) ) return;
            state.crop[ type ] = value;
        },

        updateImage( state, image ) {
            state.image = image;
        },
    }
}
