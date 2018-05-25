const state = {
    delegationCostsList: {},
    currencyList: [
        {id: 'PLN'},
        {id: 'EUR'},
        {id: 'CHF'},
        {id: 'USD'}
    ],
    costTableData: [{
        docDate: null,
        company: null,
        docNo: null,
        payback: null,
        currency: null,
        costType: null,
        amount: null
    }],
    totalCosts: {
        payback: 0,
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
    },
    addCostRow({commit, getters}) {
        const costTableData = getters.getCostTableData
        costTableData.push({
            docDate: null,
            company: null,
            docNo: null,
            payback: null,
            currency: null,
            costType: null,
            amount: 0
        })
        commit('SET_COST_TABLE_DATA', costTableData)
    },
    removeCostRow({commit, getters, dispatch}, index) {
        const costTableData = getters.getCostTableData
        costTableData.splice(index, 1)
        commit('SET_COST_TABLE_DATA', costTableData)
        dispatch('updateTotalCosts')
    },
    updateTotalCosts({commit, getters}) {
        const costTableData = getters.getCostTableData,
            totalCosts = {
                payback: 0,
                accomodation: 0,
                travel: 0,
                others: 0,
                amount: 0
            }
        for(let i=0; i<costTableData.length; i++) {
            let amount = parseInt(costTableData[i].amount),
                type = costTableData[i].costType
            if(type === 'ACC') {
                totalCosts.accomodation = totalCosts.accomodation + amount
            } else if (type === 'TRV'){
                totalCosts.travel = totalCosts.travel + amount
            } else if  (type === 'OTH'){
                totalCosts.others = totalCosts.others + amount
            }
            if(costTableData[i].payback === true ) {
                totalCosts.payback = totalCosts.payback + amount
            }
            totalCosts.amount = totalCosts.amount + amount
        }
        commit('SET_TOTAL_COST_DATA', totalCosts)
    }
};

const getters = {
    getDelegationCostsList(state) {
        return state.delegationCostsList
    },
    getCurrencyList(state) {
        return state.currencyList
    },
    getCostTableData(state) {
        return state.costTableData
    },
    getTotalCosts(state) {
        return state.totalCosts
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}