import axios from 'axios'
import router from '@/router/index.js'

const state = {
    buttonState: false
}

const mutations = {
    CHECK_LIST(state, data) {
        state.buttonState = data;
    }
}

const actions = {
    checkList({commit}, data) {
        var bState = false;

        for(var i = 0; i < data.listOfDoc.length; i++) {
            if(data.listOfDoc[i].checked) {
                bState = false;
            } else {
                return commit('CHECK_LIST', true)
            }
            commit('CHECK_LIST', bState);
        }
    }
}

const getters = {
    returnCheckList(state) {
        return state.buttonState;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}