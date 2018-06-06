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
    costTableData: [{
        docDate: null,
        company: null,
        docNo: null,
        payback: false,
        currency: 'PLN',
        costType: null,
        amount: 0,
        totalAmount: 0
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
            payback: false,
            currency: 'PLN',
            costType: null,
            amount: 0,
            totalAmount: 0
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
            let type = costTableData[i].costType,
                amount = costTableData[i].amount,
                curr = costTableData[i].currency,
                exchangeRates = getters.getExchangeRates,
                rate = null,
                totalAmount = null;
            
            //to prevent amount became NaN 
            if (amount === ""){
                amount = 0
            } else {
                amount = parseFloat(amount)
            }

            for (let i=0; i<exchangeRates.length; i++){
                if (exchangeRates[i].id === curr) {
                    rate = parseFloat(exchangeRates[i].rate)
                }
            } 

            costTableData[i].totalAmount = amount * rate

            if(type === 'ACC') {
                totalCosts.accomodation = totalCosts.accomodation + costTableData[i].totalAmount
            } else if (type === 'TRV'){
                totalCosts.travel = totalCosts.travel + costTableData[i].totalAmount
            } else if  (type === 'OTH'){
                totalCosts.others = totalCosts.others + costTableData[i].totalAmount
            }
            if(costTableData[i].payback === true ) {
                totalCosts.payback = totalCosts.payback + costTableData[i].totalAmount
            }
            totalCosts.amount = totalCosts.amount + costTableData[i].totalAmount
        }
        commit('SET_COST_TABLE_DATA', costTableData)
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