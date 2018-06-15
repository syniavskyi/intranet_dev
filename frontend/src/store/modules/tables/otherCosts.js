const state = {
    otherCostData: [{
        docDate: null,
        company: null,
        docNo: null,
        payback: false,
        currency: 'PLN',
        amount: 0,
        totalAmount: 0
    }],
    costOtherValidated: false
};

const mutations = {
    SET_OTHER_COST_DATA(state, list){
        state.otherCostData = list
    },
    SET_OTHER_COSTS_VALIDATED(state, isValidated){
        state.costOtherValidated = isValidated
    }
};

const actions = {
    addOtherCostRow({commit, getters}) {
        const otherCostData = getters.getOtherCostData
        otherCostData.push({
            docDate: null,
            company: null,
            docNo: null,
            payback: false,
            currency: 'PLN',
            amount: 0,
            totalAmount: 0
        })
        commit('SET_OTHER_COST_DATA', otherCostData)
        commit('SET_OTHER_COSTS_VALIDATED', false)
    },
    removeOtherCostRow({commit, getters, dispatch}, index) {
        const otherCostData = getters.getOtherCostData
        otherCostData.splice(index, 1)
        commit('SET_OTHER_COST_DATA', otherCostData)
        dispatch('countOtherCosts')
        dispatch('checkOtherCostsFields')        
    },
    countOtherCosts({getters, commit, dispatch}) {
        const otherCostData = getters.getOtherCostData,
             totalCosts = getters.getTotalCosts
        totalCosts.othPayback = 0
        totalCosts.others = 0
        totalCosts.totalPayback = 0
        for(let i=0; i<otherCostData.length; i++) {
            let amount = otherCostData[i].amount,
                curr = otherCostData[i].currency,
                exchangeRates = getters.getExchangeRates,
                rate = null,
                totalAmount = null;
            
           amount = (amount === "") ? 0 : parseFloat(amount)

            for (let i=0; i<exchangeRates.length; i++){
                if (exchangeRates[i].id === curr) {
                    rate = parseFloat(exchangeRates[i].rate)
                }
            } 

            otherCostData[i].totalAmount = amount * rate
            
            otherCostData[i].allOtherCosts = otherCostData[i].allOtherCosts + otherCostData[i].totalAmount

           if(otherCostData[i].payback === true ) {
                totalCosts.othPayback = totalCosts.othPayback + otherCostData[i].totalAmount
            }
            totalCosts.others = totalCosts.others + otherCostData[i].totalAmount
            totalCosts.totalPayback = totalCosts.trvPayback + totalCosts.accPayback + totalCosts.othPayback
        }
        commit('SET_OTHER_COST_DATA', otherCostData)
        commit('SET_TOTAL_COST_DATA', totalCosts)
        dispatch('checkOtherCostsFields')
    
    },
    checkOtherCostsFields({getters, commit}) {
        const costs = getters.getOtherCostData
            for (let i = 0; i < costs.length; i++) {
                let arrayItem = costs[i]
                for (let key in arrayItem) {
                    if (key === "payback") {
                        commit('SET_OTHER_COSTS_VALIDATED', true)
                    } else {
                        if (!arrayItem[key] || arrayItem[key] === "") {
                            commit('SET_OTHER_COSTS_VALIDATED', false)
                            return
                        } else {
                            commit('SET_OTHER_COSTS_VALIDATED', true)
                        }
                    }
                }
            }
    }
};

const getters = {
    getOtherCostData(state) {
        return state.otherCostData
    },
    getOtherCostValidated(state) {
        return state.costOtherValidated
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}