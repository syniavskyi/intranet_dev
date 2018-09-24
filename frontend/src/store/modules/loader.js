const state = {
    showLoader: false
}

const mutations = {
    SET_DISPLAY_LOADER({mutation}, show) {
        state.showLoader = show;
    }
}

const getters = {
    getDisplayLoader(state) {
        return state.showLoader
    }
}

export default {
    state,
    mutations,
    getters
}