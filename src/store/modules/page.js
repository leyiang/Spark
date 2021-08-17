export default {
    namespaced: true,

    state() {
        return {
            image: {
                list: [],
                active: null,
            }
        }
    },

    mutations: {
        updateImage( state, { type, value } ) {
            state.image[ type ] = value;
        }
    }
}
