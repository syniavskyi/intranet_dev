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
                                <label class="delegations-label">{{ $t("label.delegationNo") }}: </label>
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
                                <v-date-picker class="delegations-input-date" @input="countAllowance" is-expanded mode="range" v-model="newDelegation.dates">
                                    <input value="newDelegation.dates" />
                                </v-date-picker>
                            </div>
                        </div>
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.hoursInDelegation") }}: </label>
                                <p class="delegations-input">{{ newDelegation.hours }}</p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.dailyAllowance") }}: </label>
                                <p class="delegations-input">{{dailyAllowance}} zł </p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.totalAllowance") }}: </label>
                                <p class="delegations-input">{{newDelegation.totalAllowance}} zł </p>
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
                                <div class="del-table-btns">przyciski</div>
                            </div>
                            <!-- first default row -->
                            <div class="del-tbody-1">
                                <div class="del-table-row">
                                    <div class="del-tbody-title">{{ $t("table.delegations.leave") }}</div>
                                    <div class="del-table-items">
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                            <div class="del-tbody-item"> 
                                                <select class="delegations-tselect" @change="checkDelegationTable" v-model="defaultCostsData.firstLeavePlace">
                                                    <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                            <div class="del-tbody-item">{{ delegationStartDate}} </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-time" type="time" v-model="defaultCostsData.firstLeaveHour" @change="countAllowance" /> </div>
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
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-time" type="time" v-model="defaultCostsData.firstArrivalHour" @change="countAllowance" />
                                            </div>
                                        </div>
                                    </div>
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
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-time" type="time" v-model="defaultCostsData.secondLeaveHour" @change="countAllowance" /> </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="del-table-row">
                                    <div class="del-tbody-title">{{ $t("table.delegations.arrival") }}</div>
                                    <div class="del-table-items">
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                            <div class="del-tbody-item"> 
                                                <select class="delegations-tselect" @change="checkDelegationTable" v-model="defaultCostsData.secondArrivalPlace">
                                                    <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                            <div class="del-tbody-item">{{ delegationEndDate }}</div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-time" type="time" v-model="defaultCostsData.secondArrivalHour" @change="countAllowance" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="del-tbody-cols">
                                    <div class="del-tbody-title">przyciski</div>
                                    <div class="del-tbody-col"></div>
                                </div>
                            </div>


                            <!-- rows that are added -->
                            <div class="del-tbody-1" v-for="(cost, index) in customCosts" :key="index">
                                <div class="del-table-row">
                                    <div class="del-tbody-title">{{ $t("table.delegations.leave") }}</div>
                                    <div class="del-table-items">
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-w" @input="checkDelegationTable" v-model="customCosts[index].leavePlace" />
                                            </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                            <div class="del-tbody-item">
                                                <v-date-picker class="delegations-tinput-date" @input="checkDelegationTable" mode="single" v-model="customCosts[index].leaveDate">
                                                    <input value="customCosts[index].leaveDate" />
                                                </v-date-picker>
                                            </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-time" type="time" v-model="customCosts[index].leaveHour" @change="checkDelegationTable" /> </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="del-table-row">
                                    <div class="del-tbody-title">{{ $t("table.delegations.arrival") }}</div>
                                    <div class="del-table-items">
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.place") }}</div>
                                            <div class="del-tbody-item"> 
                                                <input class="delegations-tinput-w" @input="checkDelegationTable" v-model="customCosts[index].arrivalPlace"/>  
                                            </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.date") }}</div>
                                            <div class="del-tbody-item">
                                                <v-date-picker class="delegations-tinput-date" @input="checkDelegationTable" mode="single" v-model="customCosts[index].arrivalDate">
                                                    <input value="customCosts[index].arrivalDate" />
                                                </v-date-picker>
                                            </div>
                                        </div>
                                        <div class="del-tbody-wrap">
                                            <div class="del-tbody-title">{{ $t("table.delegations.time") }}</div>
                                            <div class="del-tbody-item">
                                                <input class="delegations-tinput-time" type="time" v-model="customCosts[index].arrivalHour" @change="checkDelegationTable" />
                                            </div>
                                        </div>
                                    </div>
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

                <travel-costs-table></travel-costs-table>
                <accomodation-costs-table></accomodation-costs-table>
                <other-costs-table></other-costs-table>
                
                <button :disabled="disableSaveBtn" @click="save"> {{ $t("button.save") }} </button>
             
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
import AccomodationCosts from '../tables/AccomodationCosts'
import OtherCosts from '../tables/OtherCosts'
import TravelCosts from '../tables/TravelCosts'
export default {
    data() {
        return {
            newDelegation: {
                number: null,
                createDate: null,
                destination: null,
                purpose: null,
                hours: 0,
                totalAllowance: 0
            },
            invalidDate: false,
            dailyAllowance: 30.00,
            invalidHour: false,
            showLicensePlateNo: false,
            defaultCostsData: {},
            // disableSaveBtn: true,
            fullExpences: [],
            newDelegationValidated: false,
            delegationTableValidated: false
            
        }
    },
    computed: {
        ...mapGetters({
            userData: 'userData',
            departmentList: 'depList',
            customCosts: 'getDelegationCostsList',
            accCostValidated: 'getAccCostValidated'
        }),
        disableSaveBtn() {
            if (this.newDelegationValidated && this.delegationTableValidated && this.accCostValidated) {
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
        'app-menu': Menu,
        'accomodation-costs-table': AccomodationCosts,
        'other-costs-table': OtherCosts,
        'travel-costs-table': TravelCosts
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
                if (!data[key]) {
                        this.newDelegationValidated = false
                        return
                    } else {
                        this.newDelegationValidated = true
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
       
        checkSelectVal() {
            const transport = this.newDelegation.transport
            this.showLicensePlateNo = (transport === "companyCar" || transport === "privateCar") ? true : false
            this.checkNewDelegation()
        },
        addRow() {
            this.$store.dispatch('addDelegationRow')
            this.delegationTableValidated = false
        },
        
        removeRow(index) {
            this.$store.dispatch('removeDelegationRow', index)
            this.checkDelegationTable()
        },
        prepareCostData() {
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
                arrivalHour: this.defaultCostsData.firstArrivalHour
            }
            const secondDefaultCost = {
                leavePlace: this.newDelegation.destination,
                leaveDate: this.newDelegation.dates.end,
                leaveHour: this.defaultCostsData.secondLeaveHour,
                arrivalPlace: this.defaultCostsData.secondArrivalPlace,
                arrivalDate: this.newDelegation.dates.end,
                arrivalHour: this.defaultCostsData.secondArrivalHour
            }
            costs.push(firstDefaultCost)
            costs.push(secondDefaultCost)
            this.fullExpences = costs
        },
        save() {},
        countAllowance() {
            const startDate = this.newDelegation.dates.start,
                endDate = this.newDelegation.dates.end,
                startHour = this.defaultCostsData.firstLeaveHour,
                endHour = this.defaultCostsData.secondArrivalHour,
                dailyAll = this.dailyAllowance
            
            let allowance,
                totalDays,
                remainder

            startDate.setHours(startHour.slice(0, 2), startHour.slice(3, 5), 0, 0)
            endDate.setHours(endHour.slice(0, 2), endHour.slice(3, 5), 0, 0)

            const totalHours = Math.ceil(Math.abs(endDate - startDate) / 36e5)

            if (totalHours <= 8) {
                allowance = 0
            } else {
                if (totalHours <= 12) {
                    allowance = dailyAll * 0.5
                } else {
                        totalDays = Math.floor(totalHours / 24)
                        remainder = totalHours % 24
                    if (remainder === 0) {
                        allowance = totalDays * dailyAll
                    } else if (remainder <= 8) {
                        allowance = (totalDays + 0.5) * dailyAll
                    } else {
                        allowance = (totalDays + 1) * dailyAll
                    }
                }
            }
            this.newDelegation.hours = totalHours
            this.newDelegation.totalAllowance = allowance

            this.checkNewDelegation()
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
