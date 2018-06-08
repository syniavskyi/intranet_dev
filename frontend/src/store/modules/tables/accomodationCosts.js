const state = {
    costAccomodationData: [{
        docDate: null,
        company: null,
        docNo: null,
        payback: false,
        currency: 'PLN',
        amount: 0,
        totalAmount: 0
    }],
    costAccValidated: false
};

const mutations = {
    SET_COST_ACCOMODATION_DATA(state, list){
        state.costAccomodationData = list
    },
    SET_ACC_COSTS_VALIDATED(state, isValidated){
        state.costAccValidated = isValidated
    }
};

const actions = {
    addAccCostRow({commit, getters}) {
        const accCostData = getters.getAccomodationCostData
        accCostData.push({
            docDate: null,
            company: null,
            docNo: null,
            payback: false,
            currency: 'PLN',
            amount: 0,
            totalAmount: 0
        })
        commit('SET_COST_ACCOMODATION_DATA', accCostData)
    },
    removeAccCostRow({commit, getters, dispatch}, index) {
        const accCostData = getters.getAccomodationCostData
        accCostData.splice(index, 1)
        commit('SET_COST_ACCOMODATION_DATA', accCostData)
        dispatch('updateTotalCosts')
    },
    countAccomodationCosts({getters, commit}) {
        const accCostData = getters.getAccomodationCostData,
        totalCosts = getters.getTotalCosts
            totalCosts.accomodation = 0
            totalCosts.accPayback = 0

        for(let i=0; i<accCostData.length; i++) {
            let amount = accCostData[i].amount,
                curr = accCostData[i].currency,
                exchangeRates = getters.getExchangeRates,
                rate = null,
                totalAmount = null;
            
           amount = (amount === "") ? 0 : parseFloat(amount)

            for (let i=0; i<exchangeRates.length; i++){
                if (exchangeRates[i].id === curr) {
                    rate = parseFloat(exchangeRates[i].rate)
                }
            } 

            accCostData[i].totalAmount = amount * rate
            
            
           if(accCostData[i].payback === true ) {
                totalCosts.accPayback = totalCosts.accPayback + accCostData[i].totalAmount
            }
            totalCosts.accomodation = totalCosts.accomodation + accCostData[i].totalAmount
        }
        commit('SET_COST_ACCOMODATION_DATA', accCostData)
        commit('SET_TOTAL_COST_DATA', totalCosts)
    
    },
    checkAccomodationFields({getters, commit}) {
        const costs = getters.getAccomodationCostData
            for (let i = 0; i < costs.length; i++) {
                let arrayItem = costs[i]
                for (let key in arrayItem) {
                    if (key === "payback") {
                        commit('SET_ACC_COSTS_VALIDATED', true)
                    } else {
                        if (!arrayItem[key] || arrayItem[key] === "") {
                            commit('SET_ACC_COSTS_VALIDATED', false)
                            return
                        } else {
                            commit('SET_ACC_COSTS_VALIDATED', true)
                        }
                    }
                }
            }
    }
};

const getters = {
    getAccomodationCostData(state) {
        return state.costAccomodationData
    },
    getAccCostValidated(state) {
        return state.costAccValidated
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}