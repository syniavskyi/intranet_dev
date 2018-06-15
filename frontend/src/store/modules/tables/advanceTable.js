const state = {
  advanceData: [{
    date: null,
    currency: null,
    amount: 0,
    totalAmount: 0
  }],
  advanceTableValidated: false
};

const mutations = {
  SET_ADVANCE_DATA(state, list) {
    state.advanceData = list
  },
  SET_ADVANCE_VALIDATED(state, isValidated) {
    state.advanceTableValidated = isValidated
  }
};

const actions = {
  removeAdvanceRow({
    commit,
    getters,
    dispatch
  }, index) {
    const advanceData = getters.getAdvanceData
    advanceData.splice(index, 1)
    commit('SET_ADVANCE_DATA', advanceData)
    dispatch('updateAdvance')
    dispatch('checkAdvanceFields')
  },
  checkAdvanceFields({
    getters,
    commit
  }) {
    const advances = getters.getAdvanceData
    for (let i = 0; i < advances.length; i++) {
      let arrayItem = advances[i]
      for (let key in arrayItem) {
        if (!arrayItem[key] || arrayItem[key] === "") {
          commit('SET_ADVANCE_VALIDATED', false)
          return
        } else {
          commit('SET_ADVANCE_VALIDATED', true)
        }
      }

    }
  },
  updateAdvance({getters, commit, dispatch}) {
    const advanceData = getters.getAdvanceData,
        totalCosts = getters.getTotalCosts,
        exchangeRates = getters.getExchangeRates
    
    totalCosts.advance = 0
 
        for(let i=0; i<advanceData.length; i++) {
            let amount = advanceData[i].amount,
                curr = advanceData[i].currency,
                
                rate = null,
                totalAmount = null;
            
           amount = (amount === "") ? 0 : parseFloat(amount)

            for (let i=0; i<exchangeRates.length; i++){
                if (exchangeRates[i].id === curr) {
                    rate = parseFloat(exchangeRates[i].rate)
                }
            } 

            advanceData[i].totalAmount = amount * rate
            totalCosts.advance = totalCosts.advance + advanceData[i].totalAmount
        }
        commit('SET_ADVANCE_DATA', advanceData)
        commit('SET_TOTAL_COST_DATA', totalCosts)
        dispatch('checkAdvanceFields')
  }
};

const getters = {
  getAdvanceData(state) {
    return state.advanceData
  },
  getAdvanceValidated(state) {
    return state.advanceTableValidated
  }
};


export default {
  state,
  mutations,
  actions,
  getters
}
