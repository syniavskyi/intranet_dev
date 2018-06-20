import { createRateDate }  from '../../../utils'
import moment from 'moment'
import axios from 'axios'

const state = {
    otherCostData: [{
        docDate: null,
        company: null,
        docNo: null,
        payback: false,
        currency: 'PLN',
        amount: 0,
        totalAmount: 0,
        currencyRate: 1,
        rateDate: null, //total  amount in delegation curr and rate for it
        totalAmountCurr: 0,
        delegationCurrRate: 1
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
            totalAmount: 0,
            currencyRate: 1,
            rateDate: null, //total  amount in delegation curr and rate for it
            totalAmountCurr: 0,
            delegationCurrRate: 1
        })
        commit('SET_OTHER_COSTS_VALIDATED', false)
    },
    removeOtherCostRow({commit, getters, dispatch}, index) {
        const otherCostData = getters.getOtherCostData
        otherCostData.splice(index, 1)
        dispatch('countOtherCosts')
        dispatch('checkOtherCostsFields')        
    },
    countOtherCosts({getters, commit, dispatch}) {
        const otherCostData = getters.getOtherCostData,
             totalCosts = getters.getTotalCosts,
             delegationRate = getters.getNewDelegation.currency,
             totalCostsInCurr = getters.getTotalCostsInCurr

        totalCosts.othPayback = totalCosts.others = totalCosts.totalPayback = 0
        totalCostsInCurr.othPayback = totalCostsInCurr.others = totalCostsInCurr.totalPayback = 0

        for(let i=0; i<otherCostData.length; i++) {
            let amount = otherCostData[i].amount,
                // rate = parseFloat(otherCostData[i].currencyRate).toFixed(2)
                rate = otherCostData[i].currencyRate
           amount = (amount === "") ? 0 : parseFloat(amount)

            otherCostData[i].totalAmount = parseFloat(amount * rate)
            otherCostData[i].totalAmountCurr = parseFloat(otherCostData[i].totalAmount / otherCostData[i].delegationCurrRate).toFixed(2)

            
           if(otherCostData[i].payback === true ) {
                totalCosts.othPayback = totalCosts.othPayback + parseFloat(otherCostData[i].totalAmount).toFixed(2)
                totalCostsInCurr.othPayback = totalCostsInCurr.othPayback + parseFloat(otherCostData[i].totalAmountCurr).toFixed(2)
            }
            totalCosts.others = totalCosts.others + otherCostData[i].totalAmount
            totalCostsInCurr.others = parseFloat(totalCostsInCurr.others) + parseFloat(otherCostData[i].totalAmountCurr).toFixed(2)
            
            totalCosts.totalPayback = totalCosts.trvPayback + totalCosts.accPayback + totalCosts.othPayback
            totalCostsInCurr.totalPayback = totalCostsInCurr.trvPayback + totalCostsInCurr.accPayback + totalCostsInCurr.othPayback
        }
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
    },
    getOtherCostRate({commit, dispatch, getters}, index) {
      let data = getters.getOtherCostData,
       rateDate = data[index].docDate,
       newDelegationCurr = getters.getNewDelegation.currency
            
      rateDate = createRateDate(rateDate)
      data[index].rateDate = rateDate
      if (data[index].docDate && data[index].currency && data[index].currency !== "PLN") { 
        const date = moment(rateDate).format('YYYY-MM-DD')
        const URL = 'http://api.nbp.pl/api/exchangerates/tables/a/' + date +'/'
        axios.get(URL).then(res => {
          let currRates = res.data[0].rates
          data[index].currencyRate = currRates.find(o => o.code === data[index].currency).mid
          data[index].delegationCurrRate = currRates.find(o => o.code === newDelegationCurr).mid
          dispatch('countOtherCosts')
        }).catch(error => {
          alert(error)
        })  
      } else if (data[index].docDate && data[index].currency == "PLN"){
        data[index].currencyRate = data[index].delegationCurrRate = 1 
        dispatch('countOtherCosts')
      } 
    },
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