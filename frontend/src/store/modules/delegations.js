const state = {
    delegationCostsList: [],
    // customCosts: [],
    currencyList: [
        {id: 'PLN'},
        {id: 'EUR'},
        {id: 'CHF'},
        {id: 'USD'}
    ],
    exchangeRates: [
        {id: 'PLN', rate: '1,00'},
        {id: 'EUR', rate: '4,12'},
        {id: 'CHF', rate: '3,12'},
        {id: 'USD', rate: '3,22'}
    ],
    
    totalCosts: {
        accPayback: 0,
        othPayback: 0,
        accomodation: 0,
        travel: 0,
        others: 0,
        amount: 0
    }
};

const mutations = {
    SET_DELEG_COST_LIST(state, list){
        state.delegationCostsList = list
    },
    SET_COST_TABLE_DATA(state, list){
        state.costTableData = list
    },
    SET_TOTAL_COST_DATA(state, list){
        state.totalCosts = list
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
    },
    getCurrencyList(state) {
        return state.currencyList
    },
    // getCostTableData(state) {
    //     return state.costTableData
    // },
    getTotalCosts(state) {
        return state.totalCosts
    },
    getExchangeRates(state) {
        return state.exchangeRates
    },
    
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