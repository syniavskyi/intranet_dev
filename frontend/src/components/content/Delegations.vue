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
                        <div class="delegations-tile-title"> 
                            <p  v-show="showUsername">{{userData.firstName}} {{userData.lastName}}</p>
                            <select v-if="!showUsername" class="ava-select" v-model="newDelegation.userId" @change="setUsername">
                                <option v-for="user in usersList" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
                            </select> 
                        </div>
                        <div class="delegations-tile-underscore"></div>
                    </div>
                    <div class="delegations-tile-content delegations-tile-content-1">
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.delegationNo") }}: </label>
                                <p> {{ setDelegationNo() }} </p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.day") }}: </label>
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
                                <p class="delegations-input">{{dailyAllowance}} PLN </p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.totalAllowance") }}: </label>
                                <p class="delegations-input">{{newDelegation.totalAllowance}} {{newDelegation.currency}} </p>
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
                                <p> {{ totalCosts.amount}}  {{newDelegation.currency}}</p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.advanceAmount") }}: </label>
                                <p> {{ totalCosts.advance}}  {{newDelegation.currency}}</p>
                            </div>
                            <div class="delegations-div-input">
                                <label class="delegations-label">{{ $t("label.totalReturnAmount") }}: </label>
                                <p> {{ totalCosts.totalPayback}}  {{newDelegation.currency}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <delegation-table></delegation-table>
                <advance-table></advance-table>
                <travel-costs-table></travel-costs-table>
                <accomodation-costs-table></accomodation-costs-table>
                <other-costs-table></other-costs-table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from "moment"
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
            showUsername: true,
            delegationUsername: null
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
    created(){
const role = localStorage.getItem('role')
        if (role === 'ROLE_ADMIN') {
            this.showUsername = false
        } else {
            this.newDelegation.userId = localStorage.getItem('id')
            this.delegationUsername = localStorage.getItem('name')
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
            dailyAllowance: 'getDailyAllowance',
            usersList: 'usersList'
        }),
        disableSaveBtn() {
            return (this.newDelegationValidated && this.delegationTableValidated && this.accCostValidated) ? false : true
        }
    },
    methods: {
        ...mapActions({
            checkNewDelegation: 'checkNewDelegation',
            countAllowance: 'countAllowance'
        }),
        setDelegationNo(){
            if (this.newDelegation.dates && this.delegationUsername) {
            const date = this.newDelegation.dates.start,
                year = moment(date).format('YYYY'),
                month = moment(date).format('MM'),
                username = this.delegationUsername
            
            return username + '/' + year + '/' + month
            } else {
                return null
            }
        },
        setUsername(){
            const users = this.usersList,
                    selectedId = this.newDelegation.userId
            for (let i=0; i <users.length; i ++) {
                let user = users[i]
                if (selectedId == user.id) {
                    this.delegationUsername = (user.username).toUpperCase()
                    return
                }
            }
            
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
