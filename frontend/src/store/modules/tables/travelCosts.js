import { createRateDate }  from '../../../utils'
import moment from 'moment'
import axios from 'axios'

const state = {
  costTravelData: [{
    docDate: null,
    company: null,
    docNo: null,
    payback: false,
    currency: 'PLN',
    amount: 0,
    totalAmount: 0,
    transport: null,
    licensePlateNo: null,
    flatRate: null,
    engineCapacity: null,
    kilometers: 0,
    currencyRate: 1,
    rateDate: null, //total  amount in delegation curr and rate for it
    totalAmountCurr: 0,
    delegationCurrRate: 1
  }],
  transportList: [{
      id: "companyCar",
      name: "Auto służbowe"
    },
    {
      id: "privateCar",
      name: "Auto prywatne"
    },
    {
      id: "PKP",
      name: "PKP"
    },
    {
      id: "PKS",
      name: "PKS"
    },
    {
      id: "ship",
      name: "Statek/prom"
    },
    {
      id: "plane",
      name: "Samolot"
    },
    {
      id: "motocycle",
      name: "Motocykl prywatny"
    },
    {
      id: "moped",
      name: "Motorower prywatny"
    }
  ],
  ratesForTransport: [{
    carLess: 0.5214,
    carMore: 0.8358,
    motocycle: 0.2302,
    moped: 0.1382,
  }],
  costTravelValidated: false
};

const mutations = {
  SET_COST_TRAVEL_DATA(state, list) {
    state.costTravelData = list
  },
  SET_TRV_COSTS_VALIDATED(state, isValidated) {
    state.costTravelValidated = isValidated
  }
};

const actions = {
  addTravelCostRow({
    commit,
    getters
  }) {
    const costTravelData = getters.getTravelCostData
    costTravelData.push({
      docDate: null,
      company: null,
      docNo: null,
      payback: false,
      currency: 'PLN',
      amount: 0,
      totalAmount: 0,
      transport: null,
      licensePlateNo: null,
      flatRate: null,
      engineCapacity: null,
      kilometers: null,
      currencyRate: 1,
      rateDate: null, 
      totalAmountCurr: 0,
      delegationCurrRate: 1
    })
    commit('SET_COST_TRAVEL_DATA', costTravelData)
    commit('SET_TRV_COSTS_VALIDATED', false)
  },
  removeTravelCostRow({
    commit,
    getters,
    dispatch
  }, index) {
    const costTravelData = getters.getTravelCostData
    costTravelData.splice(index, 1)
    commit('SET_COST_TRAVEL_DATA', costTravelData)
    dispatch('updateTotalCosts')
  },
  countTravelCosts({
    getters,
    commit,
    dispatch
  }) {
    const costTravelData = getters.getTravelCostData,
      totalCosts = getters.getTotalCosts,
      transportRates = getters.getRatesForTransport[0],
      delegationRate = getters.getNewDelegation.currency,
      totalCostsInCurr = getters.getTotalCostsInCurr

    totalCosts.travel = totalCosts.trvPayback =  totalCosts.totalPayback = totalCostsInCurr.travel = totalCostsInCurr.trvPayback = totalCostsInCurr.totalPayback = 0
    
    for (let i = 0; i < costTravelData.length; i++) {
      let amount = costTravelData[i].amount,
        flatRateAmount = null,
        rate = parseFloat(costTravelData[i].currencyRate).toFixed(2),
        transport = costTravelData[i].transport,
        km = costTravelData[i].kilometers

      amount = (amount === "") ? 0 : parseFloat(amount)
      km = (km === "") ? 0 : parseFloat(km)

      if (transport === "companyCar") {
        costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.carMore * rate).toFixed(2)
      } else if (transport === "privateCar") {
        if (costTravelData[i].engineCapacity === true) {
          costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.carMore * rate).toFixed(2)
        } else if (costTravelData[i].engineCapacity === false) {
          costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.carLess * rate).toFixed(2)
        } else {
            costTravelData[i].totalAmount = costTravelData[i].amount = 0
        }
      } else if (transport === "motocycle") {
        costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.motocycle * rate).toFixed(2)
      } else if (transport === "moped") {
        costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.moped * rate).toFixed(2)
      } else {
        costTravelData[i].totalAmount = (amount * rate).toFixed(2)
      }

      costTravelData[i].totalAmountCurr = parseFloat(costTravelData[i].totalAmount / costTravelData[i].delegationCurrRate).toFixed(2)

      if (costTravelData[i].payback === true) {
        totalCosts.trvPayback = totalCosts.trvPayback + parseFloat(costTravelData[i].totalAmount).toFixed(2)
        totalCostsInCurr.trvPayback = totalCostsInCurr.trvPayback + parseFloat(costTravelData[i].totalAmountCurr)
      } 
      totalCosts.totalPayback = totalCosts.trvPayback + totalCosts.accPayback + totalCosts.othPayback
      totalCostsInCurr.totalPayback = totalCostsInCurr.trvPayback + totalCostsInCurr.accPayback + totalCostsInCurr.othPayback
      
      totalCosts.travel = totalCosts.travel + parseFloat(costTravelData[i].totalAmount).toFixed(2)
      totalCostsInCurr.travel = totalCostsInCurr.travel + parseFloat(costTravelData[i].totalAmountCurr)
    }
    dispatch('checkTravelFields')
  },
  checkTravelFields({
    getters,
    commit,
    dispatch
  }) {
    const costs = getters.getTravelCostData
    for (let i = 0; i < costs.length; i++) {
      let arrayItem = costs[i]
      for (let key in arrayItem) {
        if (key === "payback") {
          commit('SET_TRV_COSTS_VALIDATED', true)
        } else {
          if (!arrayItem[key] || arrayItem[key] === "") {
            commit('SET_TRV_COSTS_VALIDATED', false)
            return
          } else {
            commit('SET_TRV_COSTS_VALIDATED', true)
          }
        }
      }
    }
  },
  getTravelRate({commit, dispatch, getters}, index) {
    let data = getters.getTravelCostData,
     rateDate = data[index].docDate,
     newDelegationCurr = getters.getNewDelegation.currency
          
    rateDate = createRateDate(rateDate)
    data[index].rateDate = rateDate
    if (data[index].rateDate && data[index].currency && data[index].currency !== "PLN") { 
      const date = moment(rateDate).format('YYYY-MM-DD')
      const URL = 'http://api.nbp.pl/api/exchangerates/tables/a/' + date +'/'
       axios.get(URL).then(res => {
        let currRates = res.data[0].rates
        data[index].currencyRate = currRates.find(o => o.code === data[index].currency).mid
        data[index].delegationCurrRate = currRates.find(o => o.code === newDelegationCurr).mid
       dispatch('countTravelCosts')
      }).catch(error => {
        alert(error)
        console.log(error)
      })  
    } else if (data[index].rateDate && data[index].currency == "PLN"){
      data[index].currencyRate = 1 
      data[index].delegationCurrRate = 1
      dispatch('countTravelCosts')
    } 
  },
};

const getters = {
  getTravelCostData(state) {
    return state.costTravelData
  },
  getTravelCostValidated(state) {
    return state.costTrvValidated
  },
  getTransportList(state) {
    return state.transportList
  },
  getRatesForTransport(state) {
    return state.ratesForTransport
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
