
export const exampleStore = {
    state: () => ({
        example: [],
    }),
    mutations: {
        MUT_EXAMPLE(state, payload) {
            state.example = payload;
        },
    },
    actions: {
        async a_exampleStore_example(context, payload) {

            context.commit('MUT_EXAMPLE', payload);

        },
    },
    getters: {}
}

export default exampleStore;