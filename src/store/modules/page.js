export default {
    namespaced: true,

    state() {
        return {
            search: {
                content: "",
                suggestion: false,
            },

            spark: {
                list: [],
                active: null,
            }
        }
    },

    mutations: {
        updateSpark( state, { type, value } ) {
            state.spark[ type ] = value;
        },

        updateSearch( state, { type, value } ) {
            state.search[ type ] = value;
        }
    }
}
