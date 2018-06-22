<template>
<div class="plane-delegations" refs="delegationContent" id="delegation-content">
    <div class="delegations-nav-and-content">
        <app-menu></app-menu>
        <div class="delegations-content" >
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
                            <div class="delegations-div-cool-head">
                                <select required v-if="!showUsername" class="delegations-select-cool" v-model="newDelegation.userId" @change="setUsername">
                                    <option v-for="user in usersList" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
                                </select> 
                                <label class="delegations-label-cool-select">Wybierz pracownika</label>
                            </div>
                        </div>
                        <div class="delegations-tile-underscore"></div>
                        <button @click="generatePdf">GENERUJ PDF</button>
                    </div>
                    <div class="delegations-tile-content delegations-tile-content-1">
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-cool">    
                                <p class="del-p-cool"> {{ setDelegationNo() }} </p>
                                <label class="delegations-label-cool">{{ $t("label.delegationNo") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <v-date-picker class="delegations-input-date" @input="checkNewDelegation" v-model="newDelegation.createDate">
                                    <input value="newDelegation.createDate" />
                                </v-date-picker>
                                <label class="delegations-label-cool-select">{{ $t("label.day") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <v-date-picker class="delegations-input-date" @input="countAllowance" is-expanded mode="range" v-model="newDelegation.dates">
                                    <input value="newDelegation.dates" />
                                </v-date-picker>
                                <label class="delegations-label-cool-select">{{ $t("label.forTime") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <select required class="delegations-select-cool" v-model="newDelegation.currency" @change="checkNewDelegation">
                                    <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                </select>
                                <label class="delegations-label-cool-select">{{ $t("table.delegations.currency") }} </label>
                            </div>
                        </div>
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-cool">
                                <p class="del-p-cool">{{ newDelegation.hours }}</p>
                                <label class="delegations-label-cool">{{ $t("label.hoursInDelegation") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <p class="del-p-cool">{{dailyAllowance}} PLN </p>
                                <label class="delegations-label-cool">{{ $t("label.dailyAllowance") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <p class="del-p-cool">{{newDelegation.totalAllowance}} {{newDelegation.currency}} </p>
                                <label class="delegations-label-cool">{{ $t("label.totalAllowance") }}: </label>
                            </div>
                        </div>
                        <div class="delegations-inputs-section">
                            <div class="delegations-div-cool">
                                <input required class="delegations-input-cool" v-model="newDelegation.destination" @input="checkNewDelegation" />
                                <span class="delegations-div-bar"></span>
                                <label class="delegations-label-cool">{{ $t("label.to") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <input required class="delegations-input-cool" v-model="newDelegation.purpose" @input="checkNewDelegation" />
                                <span class="delegations-div-bar"></span>
                                <label class="delegations-label-cool">{{ $t("label.target") }} </label>
                            </div>
                            <div class="delegations-div-cool">
                                <p class="del-p-cool"> {{ totalCostsInCurr.amount}}  {{newDelegation.currency}}</p>
                                <label class="delegations-label-cool">{{ $t("label.totalDelegationAmount") }}: </label>
                            </div>
                            <div class="delegations-div-cool">
                                <p class="del-p-cool"> {{ totalCostsInCurr.advance}}  {{newDelegation.currency}}</p>
                                <label class="delegations-label-cool">{{ $t("label.advanceAmount") }}: </label>
                            </div>
                            <div class="delegations-div-cool">
                                <p class="del-p-cool"> {{ totalCostsInCurr.totalPayback}}  {{newDelegation.currency}}</p>
                                <label class="delegations-label-cool">{{ $t("label.totalReturnAmount") }}: </label>
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
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
window.html2canvas = html2canvas


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
            usersList: 'usersList',
            totalCostsInCurr: 'getTotalCostsInCurr',
            advanceData: 'getAdvanceData'
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
                username = this.delegationUsername,
                number = username + '/' + year + '/' + month
            
            this.newDelegation.number = number
            return number
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
        },

         generatePdf() {
           const source = document.body.getElementsByClassName('delegations-content')[0]
           html2canvas(source).then(canvas => {
                 let pdf = new jsPDF('p', 'pt', 'letter');

            for (let i = 0; i < source.clientHeight/980; i++) {
                let srcImg  = canvas

                window.onePageCanvas = document.createElement("canvas")
                onePageCanvas.setAttribute('width', 900)
                onePageCanvas.setAttribute('height', 980)
                let ctx = onePageCanvas.getContext('2d')
                
                ctx.drawImage(srcImg, 0, 980*i,900,980,0,0,900,980)

                let canvasDataURL = onePageCanvas.toDataURL("image/png", 1),
                    width         = onePageCanvas.width,
                    height        = onePageCanvas.clientHeight
                
                if (i > 0) {
                    pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                }

                pdf.setPage(i+1); //! now we declare that we're working on that page
                pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62)); //! now we add content to that page!
            }
            pdf.save(this.newDelegation.number + '.pdf'); //! after the for loop is finished running, we save the pdf.
            })
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
