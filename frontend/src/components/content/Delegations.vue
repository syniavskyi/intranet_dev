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
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("table.delegations.currency") }}: </label>
                                <select v-model="newDelegation.currency" @change="checkNewDelegation">
                                    <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                </select>
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
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.totalDelegationAmount") }}: </label>
                                <p> {{ newDelegation.totalDelegationAmount}}</p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.advanceAmount") }}: </label>
                                <p> {{ totalCosts.advance}}</p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.totalReturnAmount") }}: </label>
                                <p> {{ newDelegation.totalReturnAmount}} </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <delegation-table></delegation-table>
                <advance-table></advance-table>
                <travel-costs-table></travel-costs-table>
                <accomodation-costs-table></accomodation-costs-table>
                <other-costs-table></other-costs-table>

                <!-- <button :disabled="disableSaveBtn" @click="save"> {{ $t("button.save") }} </button> -->

            </div>


        </div>
    </div>

</div>
<!-- </div> -->

<!-- </div> -->
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import Menu from '../Menu.vue'
import AccomodationCosts from '../tables/accomodationCosts'
import OtherCosts from '../tables/OtherCosts'
import TravelCosts from '../tables/TravelCosts'
import AdvanceTable from '../tables/AdvanceTable'
import DelegationTable from '../tables/DelegationTable'
export default {
    data() {
        return {
        }
    },
    components: {
        'app-menu': Menu,
        'accomodation-costs-table': AccomodationCosts,
        'other-costs-table': OtherCosts,
        'travel-costs-table': TravelCosts,
        'advance-table': AdvanceTable,
        'delegation-table': DelegationTable
    },
    beforeCreate() {
        if (this.$store.getters.isDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
        }
    },
    computed: {
        ...mapGetters({
            userData: 'userData',
            accCostValidated: 'getAccCostValidated',
            currencyList: 'getCurrencyList',
            totalCosts: 'getTotalCosts',
            newDelegation: 'getNewDelegation',
            newDelegationValidated: 'getNewDelegationValidated',
            delegationTableValidated: 'getDelegationTableValidated',
            dailyAllowance: 'getDailyAllowance'
        }),
        disableSaveBtn() {
            if (this.newDelegationValidated && this.delegationTableValidated && this.accCostValidated) {
                return false
            } else {
                return true
            }
        }
    },

    methods: {
        ...mapActions({
            checkNewDelegation: 'checkNewDelegation',
            countAllowance: 'countAllowance'
        })
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
