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
        kilometers: 0
    }],
    transportList: [
        {id: "companyCar", name: "Auto służbowe"},
        {id: "privateCar", name: "Auto prywatne"},
        {id: "PKP", name: "PKP"},
        {id: "PKS", name: "PKS"},
        {id: "ship", name: "Statek/prom"},
        {id: "plane", name: "Samolot"},
        {id: "motocycle", name: "Motocykl prywatny"},
        {id: "moped", name: "Motorower prywatny"}
    ],
    ratesForTransport: [{
        carLess:  0.5214,
        carMore : 0.8358,
        motocycle : 0.2302,
        moped : 0.1382,
    }],
    costTravelValidated: false
};

const mutations = {
    SET_COST_TRAVEL_DATA(state, list){
        state.costTravelData = list
    },
    SET_TRV_COSTS_VALIDATED(state, isValidated){
        state.costTravelValidated = isValidated
    }
};

const actions = {
    addTravelCostRow({commit, getters}) {
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
            kilometers: null
        })
        commit('SET_COST_TRAVEL_DATA', costTravelData)
    },
    removeTravelCostRow({commit, getters, dispatch}, index) {
        const costTravelData = getters.getTravelCostData
        costTravelData.splice(index, 1)
        commit('SET_COST_TRAVEL_DATA', costTravelData)
        dispatch('updateTotalCosts')
    },
    countTravelCosts({getters, commit}) {
        const costTravelData = getters.getTravelCostData,
            totalCosts = getters.getTotalCosts,
            transportRates = getters.getRatesForTransport[0]
            
        totalCosts.travel = 0
        totalCosts.trvPayback = 0

        for(let i=0; i<costTravelData.length; i++) {
            let amount = costTravelData[i].amount,
                curr = costTravelData[i].currency,
                exchangeRates = getters.getExchangeRates,
                rate = null,
                totalAmount = null,
                transport = costTravelData[i].transport,
                 km = costTravelData[i].kilometers

           amount = (amount === "") ? 0 : parseFloat(amount)
           km = (km === "") ? 0 : parseFloat(km)

                    if (transport === "companyCar") {
                        costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.carMore).toFixed(2)
                    } else if (transport === "privateCar") {
                        if (costTravelData[i].engineCapacity === true ){
                            costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.carMore).toFixed(2)
                        } else {
                            costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.carLess).toFixed(2)
                        }
                    } else if (transport === "motocycle") {
                        costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.motocycle).toFixed(2)
                    } else if (transport === "moped") {
                        costTravelData[i].totalAmount = costTravelData[i].amount = (km * transportRates.moped).toFixed(2)
                    } else {

                        for (let i=0; i<exchangeRates.length; i++){
                            if (exchangeRates[i].id === curr) {
                                rate = parseFloat(exchangeRates[i].rate)
                            }
                        } 

                        costTravelData[i].totalAmount = amount * rate
            
                    }

           if(costTravelData[i].payback === true ) {
                totalCosts.trvPayback = totalCosts.trvPayback + parseFloat(costTravelData[i].totalAmount)
            }
            totalCosts.travel = totalCosts.travel + parseFloat(costTravelData[i].totalAmount)
        }
        commit('SET_COST_TRAVEL_DATA', costTravelData)
        commit('SET_TOTAL_COST_DATA', totalCosts)
    
    },
    checkTravelFields({getters, commit,dispatch}) {
        dispatch('countTravelCosts')
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
    }
};

const getters = {
    getTravelCostData(state) {
        return state.costTravelData
    },
    getTravelCostValidated(state) {
        return state.costTrvValidated
    },
    getTransportList(state){
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