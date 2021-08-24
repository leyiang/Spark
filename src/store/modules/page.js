export default {
    namespaced: true,

    state() {
        return {
            search: {
                content: "",
                suggestion: false,
            },

            image: {
                list: [],
                active: null,
            }
        }
    },

    mutations: {
        updateImage( state, { type, value } ) {
            state.image[ type ] = value;
        },

        updateSearch( state, { type, value } ) {
            state.search[ type ] = value;
        }
    }
}
