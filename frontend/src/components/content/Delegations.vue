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
                                <input class="delegations-input" v-model="newDelegation.number" @input="checkNewDelegation" />
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.day") }}: </label>
                                <!-- <masked-input mask="11.11.1111" @input="dateValidation" v-model="newDelegation.createDate" /> -->
                                <v-date-picker class="delegations-input-date" @input="checkNewDelegation" v-model="newDelegation.createDate">
                                    <input value="newDelegation.createDate" />
                                </v-date-picker>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.forTime") }}: </label>
                                <v-date-picker class="delegations-input-date" @input="checkNewDelegation" is-expanded mode="range" v-model="newDelegation.dates">
                                    <input value="newDelegation.dates" />
                                </v-date-picker>
                            </div>
                        </div>
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.to") }}: </label>
                                <input class="delegations-input" v-model="newDelegation.destination" @input="checkNewDelegation" />
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.target") }}: </label>
                                <input class="delegations-input" v-model="newDelegation.purpose" @input="checkNewDelegation" />
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
                                <input class="delegations-input" v-model="newDelegation.licensePlateNo" @input="checkNewDelegation" />
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
                                    <div class="delegations-table-1">
                                        <div class="del-thead-1">
                                            <div class="del-table-row">
                                                <div class="del-thead-title">{{ $t("table.delegations.leave") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-table-item">{{ $t("table.delegations.place") }}</div>
                                                    <div class="del-table-item">{{ $t("table.delegations.date") }}</div>
                                                    <div class="del-table-item">{{ $t("table.delegations.time") }}</div>
                                                </div>
                                            </div>
                                            <div class="del-table-row">
                                                <div class="del-thead-title">{{ $t("table.delegations.arrival") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-table-item">{{ $t("table.delegations.place") }}</div>
                                                    <div class="del-table-item">{{ $t("table.delegations.date") }}</div>
                                                    <div class="del-table-item">{{ $t("table.delegations.time") }}</div>
                                                </div>
                                            </div>
                                            <div class="del-thead-col">{{ $t("table.delegations.distance") }}</div>
                                            <div class="del-thead-col">{{ $t("table.delegations.cost") }}</div>
                                            <div class="del-table-btns">przyciski</div>
                                        </div>
                                        <!-- first default row -->
                                        <div class="del-tbody-1">
                                            <div class="del-table-row">
                                                <div class="del-tbody-title">{{ $t("table.delegations.leave") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                                        <div class="del-tbody-item"> <select @change="checkDelegationTable" v-model="defaultCostsData.firstLeavePlace">
                                            <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                        </select></div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                                        <div class="del-tbody-item">{{ delegationStartDate}} </div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>    
                                                        <div class="del-tbody-item"> <masked-input mask="11:11" v-model="defaultCostsData.firstLeaveHour" @change="hourValidation" /> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="del-table-row">
                                                <div class="del-tbody-title">{{ $t("table.delegations.arrival") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                                        <div class="del-tbody-item">{{ newDelegation.destination}}</div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                                        <div class="del-tbody-item">{{ delegationStartDate }}</div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                                        <div class="del-tbody-item"><masked-input mask="11:11" v-model="defaultCostsData.firstArrivalHour" @change="hourValidation" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="del-tbody-cols">
                                                <div class="del-tbody-title">{{ $t("table.delegations.distance") }}</div>
                                                <div class="del-tbody-col"> <input type="number" @input="checkDelegationTable" min="0" v-model="defaultCostsData.firstDistance" /> </div>
                                            </div>
                                             <div class="del-tbody-cols">
                                                <div class="del-tbody-title">{{ $t("table.delegations.cost") }}</div>
                                                <div class="del-tbody-col"><input type="number" @input="checkDelegationTable" min="0" v-model="defaultCostsData.firstCost" /></div>
                                            </div>
                                             <div class="del-tbody-cols">
                                                <div class="del-tbody-title">przyciski</div>
                                                <div class="del-tbody-col"></div>
                                            </div>
                                        </div>
                                        <!-- second default row  -->
                                       
                                        <div class="del-tbody-1">
                                            <div class="del-table-row">
                                                <div class="del-tbody-title">{{ $t("table.delegations.leave") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                                        <div class="del-tbody-item"> {{ newDelegation.destination}}</div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                                        <div class="del-tbody-item">{{ delegationEndDate}} </div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>    
                                                        <div class="del-tbody-item"> <masked-input mask="11:11" v-model="defaultCostsData.secondLeaveHour" @change="hourValidation" /> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="del-table-row">
                                                <div class="del-tbody-title">{{ $t("table.delegations.arrival") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                                        <div class="del-tbody-item"> <select @change="checkDelegationTable" v-model="defaultCostsData.secondArrivalPlace">
                                                <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                            </select></div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                                        <div class="del-tbody-item">{{ delegationEndDate }}</div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                                        <div class="del-tbody-item"><masked-input mask="11:11" v-model="defaultCostsData.secondArrivalHour" @change="hourValidation" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="del-tbody-cols">
                                                <div class="del-tbody-title">{{ $t("table.delegations.distance") }}</div>
                                                <div class="del-tbody-col"> <input type="number" @input="checkDelegationTable" min="0" v-model="defaultCostsData.secondDistance" /> </div>
                                            </div>
                                             <div class="del-tbody-cols">
                                                <div class="del-tbody-title">{{ $t("table.delegations.cost") }}</div>
                                                <div class="del-tbody-col"><input type="number" @input="checkDelegationTable" min="0" v-model="defaultCostsData.secondCost" /></div>
                                            </div>
                                             <div class="del-tbody-cols">
                                                <div class="del-tbody-title">przyciski</div>
                                                <div class="del-tbody-col"></div>
                                            </div>
                                        </div>


                                        <!-- rows that are added -->
                                         <div class="del-tbody-1"  v-for="(cost, index) in customCosts" :key="index">
                                            <div class="del-table-row">
                                                <div class="del-tbody-title">{{ $t("table.delegations.leave") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                                        <div class="del-tbody-item"> <input @input="checkDelegationTable" v-model="customCosts[index].leavePlace" /></div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                                        <div class="del-tbody-item"> <v-date-picker @input="checkDelegationTable" mode="single" v-model="customCosts[index].leaveDate">
                                            <input value="customCosts[index].leaveDate" />
                                        </v-date-picker></div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>    
                                                        <div class="del-tbody-item"> <masked-input mask="11:11" v-model="customCosts[index].leaveHour" @change="hourValidation" /> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="del-table-row">
                                                <div class="del-tbody-title">{{ $t("table.delegations.arrival") }}</div>
                                                <div class="del-table-items">
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                                        <div class="del-tbody-item"> <input @input="checkDelegationTable" v-model="customCosts[index].arrivalPlace" /></div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                                        <div class="del-tbody-item"><v-date-picker @input="checkDelegationTable" mode="single" v-model="customCosts[index].arrivalDate">
                                            <input value="customCosts[index].arrivalDate" />
                                        </v-date-picker></div>
                                                    </div>
                                                    <div class="del-tbody-wrap">
                                                        <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                                        <div class="del-tbody-item"><masked-input mask="11:11" v-model="customCosts[index].arrivalHour" @change="hourValidation" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="del-tbody-cols">
                                                <div class="del-tbody-title">{{ $t("table.delegations.distance") }}</div>
                                                <div class="del-tbody-col"> <input type="number" @input="checkDelegationTable" min="0" v-model="customCosts[index].distance" /> </div>
                                            </div>
                                             <div class="del-tbody-cols">
                                                <div class="del-tbody-title">{{ $t("table.delegations.cost") }}</div>
                                                <div class="del-tbody-col"><input type="number" @input="checkDelegationTable" min="0" v-model="customCosts[index].cost" /></div>
                                            </div>
                                             <div class="del-tbody-cols">
                                                <div class="del-tbody-title">przyciski</div>
                                                <div class="del-tbody-col"><button @click="removeRow(index)"> X </button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                <button @click="addRow"> + </button>
                        <!--  -->
                        <p v-if="invalidHour"> {{ $t("message.hourValidation") }} </p>
                        <p v-if="invalidDate"> {{ $t("message.dateValidation") }} </p>
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
                                        <v-date-picker mode="single" @input="checkCostTable" v-model="costTableData[index].docDate">
                                            <input value="costTableData[index].docDate" />
                                        </v-date-picker>
                                    </td>
                                    <td><input @input="checkCostTable" v-model="costTableData[index].company" /></td>
                                    <td><input @input="checkCostTable" v-model="costTableData[index].docNo" /></td>
                                    <td><input type="checkbox" @change="updateTotalCosts" v-model="costTableData[index].payback" /></td>
                                    <td><select v-model="costTableData[index].currency" @change="updateTotalCosts">
                                            <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                        </select>
                                    </td>
                                    <!-- acc -accomodation, trv - travel - oth - others -->
                                    <td><input type="radio" @change="updateTotalCosts" value="ACC" v-model="costTableData[index].costType" />
                                        <input type="number" min="0" v-show="costTableData[index].costType === 'ACC'" @input="updateTotalCosts" v-model="costTableData[index].amount" />
                                    </td>
                                    <td><input type="radio" @change="updateTotalCosts" value="TRV" v-model="costTableData[index].costType" />
                                        <input type="number" min="0" v-show="costTableData[index].costType === 'TRV'" @input="updateTotalCosts" v-model="costTableData[index].amount" />
                                    </td>
                                    <td><input type="radio" @change="updateTotalCosts" value="OTH" v-model="costTableData[index].costType" />
                                        <input type="number" min="0" v-show="costTableData[index].costType === 'OTH'" @input="updateTotalCosts" v-model="costTableData[index].amount" />
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
                transport: null,
                licensePlateNo: null
            },
            invalidDate: false,
            invalidHour: false,
            showLicensePlateNo: false,
            defaultCostsData: {},
            // disableSaveBtn: true,
            fullExpences: [],
            newDelegationValidated: false,
            delegationTableValidated: false,
            costTableValidated: false
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
        disableSaveBtn() {
            if (this.newDelegationValidated && this.delegationTableValidated && this.costTableValidated) {
                return false
            } else {
                return true
            }
        },
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
        checkNewDelegation() {
            const data = this.newDelegation
            for (let key in data) {
                if (key === "licensePlateNo" && !this.showLicensePlateNo) {
                       this.newDelegationValidated = true
                } else {
                    if (!data[key]) {
                        this.newDelegationValidated = false
                        return
                    } else {
                        this.newDelegationValidated = true
                    }
                }
            }

        },
        checkDelegationTable() {
            this.prepareCostData()
            const expences = this.fullExpences
            for (let i = 0; i < expences.length; i++) {
                let arrayItem = expences[i]
                for (let key in arrayItem) {
                    if (!arrayItem[key] || arrayItem[key] === "__:__" || arrayItem[key] === "") {
                        this.delegationTableValidated = false
                        return
                    } else {
                        this.delegationTableValidated = true
                    }
                }
            }
        },
        checkCostTable() {
            const costs = this.costTableData

            for (let i = 0; i < costs.length; i++) {
                let arrayItem = costs[i]
                for (let key in arrayItem) {
                    if (key === "payback") {
                        this.costTableValidated = true
                    } else {
                        if (!arrayItem[key] || arrayItem[key] === "") {
                            this.costTableValidated = false
                            return
                        } else {
                            this.costTableValidated = true
                        }
                    }
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
            this.checkNewDelegation()
        },
        addRow() {
            this.$store.dispatch('addDelegationRow')
            this.delegationTableValidated = false
        },
        addCostRow() {
            this.$store.dispatch('addCostRow')
            this.costTableValidated = false
        },
        removeRow(index) {
            this.$store.dispatch('removeDelegationRow', index)
            this.checkDelegationTable()
        },
        removeCostRow(index) {
            this.$store.dispatch('removeCostRow', index)
            this.checkCostTable()
        },
        hourValidation(value) {
            const hours = parseInt(value.slice(0, 2)),
                minutes = parseInt(value.slice(3, 5))

            if (hours > 24 || minutes > 60 || value == "__:__") {
                this.invalidHour = true
                this.delegationTableValidated = false
            } else {
                this.delegationTableValidated = true
                this.invalidHour = false
                this.checkDelegationTable()
            }

        },
        updateTotalCosts() {
            this.$store.dispatch('updateTotalCosts')
            this.checkCostTable()
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

#delegationCostsTabletd,
td {
    width: 200px;
}
</style>
