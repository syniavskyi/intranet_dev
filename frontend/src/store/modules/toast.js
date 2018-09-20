const state = {
    showToast: false,
    timeoutRunning: false
}

const actions = {
    displayToast({dispatch}, time) {
        state.showToast = true
        if (!time) time = 4000
        if (!state.timeoutRunning) {
            setTimeout(() => { state.showToast = false
                               state.timeoutRunning = false;
                            }, time)
            state.timeoutRunning = true
        }
    }
}

const getters = {
    getDisplayToast(state) {
        return state.showToast
    }
}

export default {
    state,
    actions,
    getters
}