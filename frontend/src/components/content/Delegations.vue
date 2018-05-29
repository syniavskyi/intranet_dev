<template>
<div class="plane-delegations">
    <div class="delegations-nav-and-content">
        <app-menu></app-menu>
        <div class="delegations-content">
            <div class="delegations-header">
                <div class="delegations-header-title-and-menu">
                    <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="delegations-header-menu">
                    <p class="delegations-header-title">{{ $t("header.delegations") }}</p>
                </div>
            </div>
            <div class="delegations-tiles">
                <div class="delegations-tile delegations-inputs">
                    <div class="delegations-tile-header">
                        <div class="delegations-tile-title">{{userData.firstName}} {{userData.lastName}}
                        </div>
                        <div class="delegations-tile-underscore"></div>
                    </div>
                    <div class="delegations-tile-content delegations-tile-content-1">
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.number") }}: </label>
                                <input class="delegations-input" v-model="newDelegation.number" @input="checkFields" />
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.day") }}: </label>
                                <!-- <masked-input mask="11.11.1111" @input="dateValidation" v-model="newDelegation.createDate" /> -->
                                <v-date-picker class="delegations-input-date" @input="checkFields" v-model="newDelegation.createDate">
                                    <input value="newDelegation.createDate" />
                                </v-date-picker>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.forTime") }}: </label>
                                <v-date-picker class="delegations-input-date" @input="checkFields" is-expanded mode="range" v-model="newDelegation.dates">
                                    <input value="newDelegation.dates" />
                                </v-date-picker>
                            </div>
                        </div>
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.to") }}: </label>
                                <input class="delegations-input" v-model="newDelegation.destination" @input="checkFields" />
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.target") }}: </label>
                                <input class="delegations-input" v-model="newDelegation.purpose" @input="checkFields" />
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.transport") }}: </label>
                                <select class="delegations-select" v-model="newDelegation.transport" @change="checkSelectVal">
                                        <option value="LOT">LOT</option>
                                        <option value="PKP">PKP</option>
                                        <option value="companyCar">{{ $t("select.car.company") }}</option>
                                        <option value="privateCar">{{ $t("select.car.private") }}</option>
                                        <option value="other">{{ $t("select.others") }}</option>
                                    </select>
                            </div>
                            <div class="delegations-div-input" v-if="showLicensePlateNo">
                                <label class="delegations-label">{{ $t("label.registrationNo") }} </label>
                                <input class="delegations-input" v-model="newDelegation.licensePlateNo" @input="checkFields" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="delegations-tile">
                    <div class="delegations-tile-header">
                        <div class="delegations-tile-title">
                            {{ $t("header.travelExp") }}
                        </div>
                        <div class="delegations-tile-underscore"></div>
                    </div>

                    <div class="delegations-tile-content">
                        <button @click="addRow"> + </button>
                        <table class="table delegations-table-1" id="delegationCostsTable">
                            <thead>
                                <tr>
                                    <th colspan="3">{{ $t("table.delegations.leave") }}</th>
                                    <th colspan="3">{{ $t("table.delegations.arrival") }}</th>
                                    <th rowspan="2">{{ $t("table.delegations.distance") }}</th>
                                    <th rowspan="2">{{ $t("table.delegations.cost") }}</th>
                                </tr>
                                <tr>
                                    <th>{{ $t("table.delegations.place") }}</th>
                                    <th>{{ $t("table.delegations.date") }}</th>
                                    <th>{{ $t("table.delegations.time") }}</th>
                                    <th>{{ $t("table.delegations.place") }}</th>
                                    <th>{{ $t("table.delegations.date") }}</th>
                                    <th>{{ $t("table.delegations.time") }}</th>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select @change="checkFields" v-model="defaultCostsData.firstLeavePlace">
                                            <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                        </select>
                                    </td>
                                    <td> {{ delegationStartDate}} </td>
                                    <td>
                                        <masked-input mask="11:11" v-model="defaultCostsData.firstLeaveHour" @input="hourValidation" /> </td>
                                    <td> {{ newDelegation.destination}} </td>
                                    <td> {{ delegationStartDate }} </td>
                                    <td>
                                        <masked-input mask="11:11" v-model="defaultCostsData.firstArrivalHour" @input="hourValidation" /> </td>
                                    <td> <input type="number" @input="checkFields" min="0" v-model="defaultCostsData.firstDistance" /> </td>
                                    <td> <input type="number" @input="checkFields" min="0" v-model="defaultCostsData.firstCost" /> </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td> {{ newDelegation.destination}} </td>
                                    <td> {{ delegationEndDate }} </td>
                                    <td>
                                        <masked-input mask="11:11" @input="hourValidation" v-model="defaultCostsData.secondLeaveHour" /> </td>
                                    <td>
                                        <select @change="checkFields" v-model="defaultCostsData.secondArrivalPlace">
                                                <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                            </select>
                                    </td>
                                    <td> {{ delegationEndDate }} </td>
                                    <td>
                                        <masked-input mask="11:11" @input="hourValidation" v-model="defaultCostsData.secondArrivalHour" /> </td>
                                    <td> <input @input="checkFields" type="number" min="0" v-model="defaultCostsData.secondDistance" /> </td>
                                    <td> <input @input="checkFields" type="number" min="0" v-model="defaultCostsData.secondCost" /> </td>
                                    <td></td>
                                </tr>
                                <tr v-for="(cost, index) in customCosts" :key="index">
                                    <td> <input @input="checkFields" v-model="customCosts[index].leavePlace" /></td>
                                    <td>
                                        <v-date-picker @input="checkFields" mode="single" v-model="customCosts[index].leaveDate">
                                            <input value="customCosts[index].leaveDate" />
                                        </v-date-picker>
                                    </td>
                                    <td>
                                        <masked-input @input="hourValidation" mask="11:11" v-model="customCosts[index].leaveHour" /> </td>
                                    <td> <input @input="checkFields" v-model="customCosts[index].arrivalPlace" /> </td>
                                    <td>
                                        <v-date-picker @input="checkFields" mode="single" v-model="customCosts[index].arrivalDate">
                                            <input value="customCosts[index].arrivalDate" />
                                        </v-date-picker>
                                    </td>
                                    <td>
                                        <masked-input mask="11:11" @input="hourValidation" v-model="customCosts[index].arrivalHour" /> </td>
                                    <td> <input @input="checkFields" type="number" min="0" v-model="customCosts[index].distance" /> </td>
                                    <td> <input @input="checkFields" type="number" min="0" v-model="customCosts[index].cost" /> </td>
                                    <td> <button @click="removeRow(index)"> X </button></td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-if="invalidHour"> {{ $t("message.hourValidation") }} </p>
                        <p v-if="invalidDate"> {{ $t("message.dateValidation") }} </p>

                    </div>
                </div>
                <div class="delegations-tile">
                    <div class="delegations-tile-header">
                        <div class="delegations-tile-title">
                            {{ $t("header.costs") }}
                        </div>
                        <div class="delegations-tile-underscore"></div>
                    </div>
                    <div class="delegations-tile-content">

                        <button @click="addCostRow"> + </button>
                        <table>
                            <thead>
                                <tr>
                                    <td>{{ $t("table.delegations.docDate") }}</td>
                                    <td>{{ $t("table.delegations.company") }}</td>
                                    <td>{{ $t("table.delegations.docNo") }}</td>
                                    <td>{{ $t("table.delegations.return") }}?</td>
                                    <td>{{ $t("table.delegations.currency") }}</td>
                                    <td>{{ $t("table.delegations.accomodation") }}</td>
                                    <td>{{ $t("table.delegations.travel") }}</td>
                                    <td>{{ $t("table.delegations.others") }}</td>
                                    <td>{{ $t("table.delegations.amountPLN") }}</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cost, index) in costTableData" :key="index">
                                    <td>
                                        <v-date-picker mode="single" v-model="costTableData[index].docDate">
                                            <input value="costTableData[index].docDate" />
                                        </v-date-picker>
                                    </td>
                                    <td><input @input="checkFields" v-model="costTableData[index].company" /></td>
                                    <td><input @input="checkFields" v-model="costTableData[index].docNo" /></td>
                                    <td><input type="checkbox" @change="updateTotalCosts" v-model="costTableData[index].payback" /></td>
                                    <td><select v-model="costTableData[index].currency" @change="updateTotalCosts">
                                            <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                        </select>
                                    </td>
                                    <!-- acc -accomodation, trv - travel - oth - others -->
                                    <td><input type="radio" @change="updateTotalCosts" value="ACC" v-model="costTableData[index].costType" />
                                        <input type="number" min="0" v-show="costTableData[index].costType === 'ACC'" @change="updateTotalCosts" v-model="costTableData[index].amount" />
                                    </td>
                                    <td><input type="radio" @change="updateTotalCosts" value="TRV" v-model="costTableData[index].costType" />
                                        <input type="number" min="0" v-show="costTableData[index].costType === 'TRV'" @change="updateTotalCosts" v-model="costTableData[index].amount" />
                                    </td>
                                    <td><input type="radio" @change="updateTotalCosts" value="OTH" v-model="costTableData[index].costType" />
                                        <input type="number" min="0" v-show="costTableData[index].costType === 'OTH'" @change="updateTotalCosts" v-model="costTableData[index].amount" />
                                    </td>
                                    <td>
                                        <p>{{costTableData[index].totalAmount}} </p>
                                    </td>
                                    <td> <button @click="removeCostRow(index)"> X </button></td>
                                </tr>
                                <tr>
                                    <td colspan="2"> </td>
                                    <td> {{ $t("table.delegations.totalAmount") }} </td>
                                    <td>
                                        <p>{{ totalCosts.payback }}</p>
                                    </td>
                                    <td>---</td>
                                    <td>
                                        <p>{{ totalCosts.accomodation }}</p>
                                    </td>
                                    <td>
                                        <p>{{ totalCosts.travel }}</p>
                                    </td>
                                    <td>
                                        <p>{{ totalCosts.others }}</p>
                                    </td>
                                    <td><strong><p>{{ totalCosts.amount }}</p> </strong> </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <button :disabled="disableSaveBtn" @click="save"> {{ $t("button.save") }} </button>
                        <!--  -->
                        <!-- <table> 
                                <tr>
                                    <td colspan="2"> </td>
                                    <td> Razem PLN </td>
                                </tr>
                            </table> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- </div> -->
</template>

<script>
// import Menu from '../Menu.vue'
import MaskedInput from 'vue-masked-input'
import moment from "moment"
import {
    mapGetters
} from 'vuex'
import {
    required
} from 'vuelidate/lib/validators'
import Menu from '../Menu.vue'
export default {
    //defaultCostData are two first lines in travel expences table. 
    // customCosts are lines that can be added by user
    //costTableData is table for Costs
    // full expences are default costs connected with custom costs for saving and validation 
    data() {
        return {
            newDelegation: {
                number: null,
                createDate: null,
                destination: null,
                purpose: null,
                transport: null
            },
            invalidDate: false,
            invalidHour: false,
            showLicensePlateNo: false,
            defaultCostsData: {},
            disableSaveBtn: true,
            fullExpences: []
        }
    },
    // components: {
    //     'app-menu': Menu
    // },
    computed: {
        ...mapGetters({
            userData: 'userData',
            departmentList: 'depList',
            currencyList: 'getCurrencyList',
            costTableData: 'getCostTableData',
            totalCosts: 'getTotalCosts',
            customCosts: 'getDelegationCostsList'
        }),
        delegationStartDate() {
            if (this.newDelegation.dates) {
                return moment(this.newDelegation.dates.start).format("DD.MM.YYYY")
            } else {
                return null
            }
        },
        delegationEndDate() {
            if (this.newDelegation.dates) {
                return moment(this.newDelegation.dates.end).format("DD.MM.YYYY")
            } else {
                return null
            }
        }
    },
    components: {
        MaskedInput,
        'app-menu': Menu
    },
    beforeCreate() {
        if (this.$store.getters.isDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
        }
    },
    methods: {
        checkFields() {
            this.prepareCostData()
            const data = this.newDelegation,
                expences = this.fullExpences,
                costs = this.costTableData,
                props = Object.getOwnPropertyNames(expences[0])
            for (let key in data) {
                if (key === "licensePlateNo"){
                    this.disableSaveBtn = false
                } else {
                    if (!data[key]) {
                        this.disableSaveBtn = true
                        return
                    } else {
                        this.disableSaveBtn = false
                    }
                }
            }

            // expences.forEach(function(arrayItem) {
            //     for (let key1 in arrayItem) {
            //         if (!arrayItem[key1]) {
            //            this.disableSaveBtn = true
            //            return
            //         } else {
            //             this.disableSaveBtn = false
            //         }
            //     }
            // }.bind(this))
            if (this.disableSaveBtn === false) {
                expences.every(function(arrayItem) {
                    for (let key1 in arrayItem) {
                            if (!arrayItem[key1]) {
                                this.disableSaveBtn = true
                                return 
                            } else {
                                this.disableSaveBtn = false
                            }
                        }
                }.bind(this))
                if (this.disableSaveBtn === false){
                    costs.every((arrayItem) => {
                        for (let key2 in arrayItem) {
                            if (key2 === "payback") {
                                this.disableSaveBtn = false
                            } else {
                                if (!arrayItem[key2]) {
                                    this.disableSaveBtn = true
                                    return 
                                } else {
                                    this.disableSaveBtn = false
                                }
                            }
                        }
                    })
                }
            }
        },
        checkSelectVal() {
            const transport = this.newDelegation.transport
            if (transport === "companyCar" || transport === "privateCar") {
                this.showLicensePlateNo = true
            } else {
                this.showLicensePlateNo = false
            }
            this.$store.dispatch('checkDelegationFields')
        },
        addRow() {
            this.$store.dispatch('addDelegationRow')
            this.disableSaveBtn = true
            // this.checkFields()
        },
        addCostRow() {
            this.$store.dispatch('addCostRow')
            this.disableSaveBtn = true
        },
        removeRow(index) {
            this.$store.dispatch('removeDelegationRow', index)
            this.checkFields()
        },
        removeCostRow(index) {
            this.$store.dispatch('removeCostRow', index)
            this.checkFields()
        },
        hourValidation(value) {
            const hours = parseInt(value.slice(0, 2)),
                minutes = parseInt(value.slice(3, 5))

            if (hours > 24 || minutes > 60) {
                this.invalidHour = true
                this.disableSaveBtn = true
            } else {
                this.invalidHour = false
            }
            this.$store.dispatch('checkDelegationFields')
            this.checkFields()
        },
        updateTotalCosts() {
            this.$store.dispatch('updateTotalCosts')
            this.checkFields()
        },
        prepareCostData() {
            // const costs = this.customCosts.slice(0)
            const costs = []
            for (let i = 0; i < this.customCosts.length; i++) {
                costs[i] = Object.assign({}, this.customCosts[i])
            }
            const firstDefaultCost = {
                leavePlace: this.defaultCostsData.firstLeavePlace,
                leaveDate: this.newDelegation.dates.start,
                leaveHour: this.defaultCostsData.firstLeaveHour,
                arrivalPlace: this.newDelegation.destination,
                arrivalDate: this.newDelegation.dates.start,
                arrivalHour: this.defaultCostsData.firstArrivalHour,
                distance: this.defaultCostsData.firstDistance,
                cost: this.defaultCostsData.firstCost
            }
            const secondDefaultCost = {
                leavePlace: this.newDelegation.destination,
                leaveDate: this.newDelegation.dates.end,
                leaveHour: this.defaultCostsData.secondLeaveHour,
                arrivalPlace: this.defaultCostsData.secondArrivalPlace,
                arrivalDate: this.newDelegation.dates.end,
                arrivalHour: this.defaultCostsData.secondArrivalHour,
                distance: this.defaultCostsData.secondDistance,
                cost: this.defaultCostsData.secondCost
            }
            costs.push(firstDefaultCost)
            costs.push(secondDefaultCost)
            this.fullExpences = costs
        },
        save() {

        }
    }
}
</script>

<style>
table,
th,
td {
    border: 1px solid black;
}

td {
    width: 200px;
}
</style>
