import { createRateDate }  from '../../../utils'
import moment from 'moment'
import axios from 'axios'

const state = {
  advanceData: [{
    date: null,
    currency: null,
    amount: 0, // totalAmountInPln
    totalAmount: 0,
    currencyRate: 1,
    rateDate: null, //total  amount in delegation curr and rate for it
    totalAmountCurr: 0,
    delegationCurrRate: 1
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
    dispatch('updateAdvance')
    dispatch('checkAdvanceFields')
  },
  addAdvanceRow({getters,commit}) {
    const advanceData = getters.getAdvanceData
    advanceData.push({
      date: null,
      currency: null,
      amount: 0,
      totalAmount: 0,
      currencyRate: 1,
      rateDate: null,
      totalAmountCurr: 0,
      delegationCurrRate: 1
    })
    commit('SET_ADVANCE_VALIDATED', false)
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
        delegationRate = getters.getNewDelegation.currency,
        totalCostsInCurr = getters.getTotalCostsInCurr
    
    totalCosts.advance = 0
    totalCostsInCurr.advance = 0
 
        for(let i=0; i<advanceData.length; i++) {
            let amount = advanceData[i].amount,
                rate = parseFloat(advanceData[i].currencyRate).toFixed(2)
            
           amount = (amount === "") ? 0 : parseFloat(amount)
           
          advanceData[i].totalAmount = parseFloat(amount * rate)
          advanceData[i].totalAmountCurr = parseFloat(advanceData[i].totalAmount / advanceData[i].delegationCurrRate).toFixed(2)

          totalCosts.advance = totalCosts.advance + parseFloat(advanceData[i].totalAmount)
          totalCostsInCurr.advance = parseFloat(totalCostsInCurr.advance) + parseFloat(advanceData[i].totalAmountCurr)
        }
        dispatch('checkAdvanceFields')
  },
  getAdvanceRate({commit, dispatch, getters}, index) {
    let data = getters.getAdvanceData,
     rateDate = data[index].date,
     newDelegationCurr = getters.getNewDelegation.currency
          
    rateDate = createRateDate(rateDate)
    data[index].rateDate = rateDate
    if (data[index].date && data[index].currency && data[index].currency !== "PLN") { 
      const date = moment(rateDate).format('YYYY-MM-DD')
      const URL = 'http://api.nbp.pl/api/exchangerates/tables/a/' + date +'/'
      axios.get(URL).then(res => {
        let currRates = res.data[0].rates
        data[index].currencyRate = currRates.find(o => o.code === data[index].currency).mid
        data[index].delegationCurrRate = currRates.find(o => o.code === newDelegationCurr).mid
        dispatch('updateAdvance')
      }).catch(error => {
        alert(error)
        console.log(error)
      })  
    } else if (data[index].date && data[index].currency == "PLN"){
      data[index].currencyRate = 1 
      data[index].delegationCurrRate = 1
      dispatch('updateAdvance')
    } 
  },
  countAdvanceInCurr({commit, dispatch, getters}) {

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
