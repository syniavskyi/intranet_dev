const state = {
    delegationCostsList: {}
};

const mutations = {
    SET_DELEG_COST_LIST(state, list){
        state.delegationCostsList = list
    }
};

const actions = {
    checkDelegationFields() {

    },
    addDelegationRow({commit, getters}) {
        const delegationCostsList = getters.getDelegationCostsList
        delegationCostsList.push({
            leavePlace: null,
            leaveDate: null,
            leaveHour: null,
            arrivalPlace: null,
            arrivalDate: null,
            arrivalHour:null,
            distance: null,
            cost: null
        })
        commit('SET_DELEG_COST_LIST', delegationCostsList)
    },
    removeDelegationRow({commit, getters}, index) {
        const delegationCostsList = getters.getDelegationCostsList
        delegationCostsList.splice(index, 1)
        commit('SET_DELEG_COST_LIST', delegationCostsList)
    }
};

const getters = {
    getDelegationCostsList(state) {
        return state.delegationCostsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}