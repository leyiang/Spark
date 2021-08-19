export default {
    namespaced: true,

    state() {
        return {
            search: {
                content: "123123a",
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