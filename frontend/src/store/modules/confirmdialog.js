const state = {
    isDialogOpen: false,
    confirmMessage: "wiadomość"
}

const getters = {
    getDisplayConfirmDialog(state) {
        return state.isDialogOpen;
    }
}

const mutations = {
    SET_DIALOG_CONFIRM(state, show) {
        state.isDialogOpen = show
    },
    SET_DIALOG_CONFIRM_MESSAGE(){
        state.confirmMessage = "Testuje wiadomość";
    }
}

export default {
    state,
    getters,
    mutations
}