import { createRateDate }  from '../../../utils'
import moment from 'moment'
import axios from 'axios'

const state = {
    costAccomodationData: [{
        docDate: null,
        company: null,
        docNo: null,
        payback: false,
        currency: 'PLN',
        amount: 0,
        totalAmount: 0,
        flatRate: false,
        flatRateDays: null,
        totalAmount: 0,
        currencyRate: 1,
        rateDate: null, //total  amount in delegation curr and rate for it
        totalAmountCurr: 0,
        delegationCurrRate: 1
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
            totalAmount: 0,
            flatRate: false,
            flatRateDays: null,
            totalAmount: 0,
            currencyRate: 1,
            rateDate: null, //total  amount in delegation curr and rate for it
            totalAmountCurr: 0,
            delegationCurrRate: 1
        })
        commit('SET_ACC_COSTS_VALIDATED', false)
    },
    removeAccCostRow({commit, getters, dispatch}, index) {
        const accCostData = getters.getAccomodationCostData
        accCostData.splice(index, 1)
        dispatch('countAccomodationCosts')
    },
    countAccomodationCosts({getters, commit, dispatch}) {
        const accCostData = getters.getAccomodationCostData,
        totalCosts = getters.getTotalCosts,
        totalCostsInCurr = getters.getTotalCostsInCurr
            
        totalCosts.accPayback = totalCosts.accomodation = totalCosts.totalPayback = 0
        totalCostsInCurr.accPayback = totalCostsInCurr.accomodation = totalCostsInCurr.totalPayback = 0

        for(let i=0; i<accCostData.length; i++) {
            let amount = accCostData[i].amount,
                rate = accCostData[i].currencyRate
            
           amount = (amount === "") ? 0 : parseFloat(amount)

           accCostData[i].totalAmount = amount * rate
           accCostData[i].totalAmountCurr = parseFloat(accCostData[i].totalAmount / accCostData[i].delegationCurrRate).toFixed(2)
            
            if(accCostData[i].payback === true ) {
                totalCosts.accPayback = totalCosts.accPayback + accCostData[i].totalAmount
                totalCostsInCurr.accPayback = totalCostsInCurr.accPayback + parseFloat(accCostData[i].totalAmountCurr)
            }
            totalCosts.accomodation = totalCosts.accomodation + accCostData[i].totalAmount
            totalCostsInCurr.accomodation = totalCostsInCurr.accomodation + parseFloat(accCostData[i].totalAmountCurr)

            totalCosts.totalPayback = totalCosts.trvPayback + totalCosts.accPayback + totalCosts.othPayback
            totalCostsInCurr.totalPayback = totalCostsInCurr.trvPayback + totalCostsInCurr.accPayback + totalCostsInCurr.othPayback
        }
        dispatch('checkAccomodationFields')
    
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
    },
    countAccFlatRate({commit,dispatch,getters}, index) {
        const costs = getters.getAccomodationCostData,
              dailyAll = getters.getDailyAllowance,
              delegationCurr = getters.getNewDelegation.currency
        
        costs[index].currency = delegationCurr
        costs[index].amount = 1.5 * costs[index].flatRateDays * dailyAll 
        costs[index].totalAmount = 1.5 * costs[index].flatRateDays * dailyAll 
    },
    getAccCostRate({commit, dispatch, getters}, index) {
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
            dispatch('countAccomodationCosts')
          }).catch(error => {
            alert(error)
          })  
        } else if (data[index].docDate && data[index].currency == "PLN"){
          data[index].currencyRate = data[index].delegationCurrRate = 1 
          dispatch('countAccomodationCosts')
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