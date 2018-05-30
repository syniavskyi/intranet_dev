 <template>
    <div class="plane-delegations">
        <div class="delegations-nav-and-content">
            <app-menu></app-menu>
            <div class="delegations-content">
                <div class="delegations-header">
                   <div class="delegations-header-title-and-menu">
                        <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="delegations-header-menu">
                        <p class="delegations-header-title">Delegacje</p>
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
                                    <label class="delegations-label">Numer: </label>
                                    <input class="delegations-input" v-model="newDelegation.number" @input="checkFields"/>
                                </div>
                                <div class="delegations-div-input">
                                    <label class="delegations-label">Dnia: </label>
                                    <!-- <masked-input mask="11.11.1111" @input="dateValidation" v-model="newDelegation.createDate" /> -->
                                    <v-date-picker class="delegations-input-date" @input="checkFields"  v-model="newDelegation.createDate">
                                        <input value="newDelegation.createDate" />
                                    </v-date-picker>
                                </div>
                                <div class="delegations-div-input">
                                    <label class="delegations-label">Na czas: </label>
                                    <v-date-picker class="delegations-input-date" @input="checkFields" is-expanded mode="range" v-model="newDelegation.dates">
                                        <input value="newDelegation.dates" />
                                    </v-date-picker>
                                </div>
                            </div>
                            <div class="delegations-inputs-section">
                                <div class="delegations-div-input">
                                    <label class="delegations-label">Do: </label>
                                    <input class="delegations-input" v-model="newDelegation.destination" @input="checkFields"/>
                                </div>
                                <div class="delegations-div-input">
                                    <label class="delegations-label">W celu: </label>
                                    <input class="delegations-input" v-model="newDelegation.purpose" @input="checkFields"/>
                                </div>
                                <div class="delegations-div-input">
                                    <label class="delegations-label">Transport: </label>
                                    <select class="delegations-select" v-model="newDelegation.transport" @change="checkSelectVal">
                                        <option value="LOT">LOT</option>
                                        <option value="PKP">PKP</option>
                                        <option value="companyCar">samochód służbowy</option>
                                        <option value="privateCar">samochód prywatny</option>
                                        <option value="other">Inne</option>
                                    </select>
                                </div>
                                <div class="delegations-div-input" v-if="showLicensePlateNo">
                                    <label class="delegations-label">Numer rejestracyjny: </label>
                                    <input class="delegations-input" v-model="newDelegation.licensePlateNo" @input="checkFields"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delegations-tile">
                        <div class="delegations-tile-header">
                            <div class="delegations-tile-title">
                                Rachunek kosztów podróży
                            </div>
                            <div class="delegations-tile-underscore"></div>
                        </div>
                        
                        <div class="delegations-tile-content"> 
                            <button @click="addRow"> + </button>
                            <table class="table delegations-table-1" id="delegationCostsTable">
                            <thead >
                                <tr>
                                    <th colspan="3">Wyjazd</th>
                                    <th colspan="3">Przyjazd</th>
                                    <th rowspan="2">Odległość (km)</th>
                                    <th rowspan="2">Koszty przejazdu</th>
                                </tr>
                                <tr>
                                    <th>Miejscowość</th>
                                    <th>Data</th>
                                    <th>Godzina</th>
                                    <th>Miejscowość</th>
                                    <th>Data</th>
                                    <th>Godzina</th>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select v-model="defaultCostsData.firstLeavePlace">
                                            <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                        </select>
                                    </td>
                                        <td> {{ delegationStartDate}} </td>
                                        <td> <masked-input mask="11:11" v-model="defaultCostsData.firstLeaveHour" @input="hourValidation"/> </td>
                                        <td> {{ newDelegation.destination}} </td>
                                        <td> {{ delegationStartDate }} </td>
                                        <td> <masked-input mask="11:11" v-model="defaultCostsData.firstArrivalHour" @input="hourValidation"/> </td>
                                        <td> <input type="number" min="0" v-model="defaultCostsData.firstDistance"/> </td>
                                        <td> <input type="number" min="0" v-model="defaultCostsData.firstCost"/> </td>
                                        <td></td>
                                </tr>
                                    <tr>
                                    <td> {{ newDelegation.destination}} </td>
                                        <td> {{ delegationEndDate }} </td>
                                        <td> <masked-input mask="11:11" @input="hourValidation" v-model="defaultCostsData.secondLeaveHour"/> </td>
                                        <td> 
                                            <select v-model="defaultCostsData.secondArrivalPlace">
                                                <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                            </select> 
                                        </td>
                                        <td> {{ delegationEndDate }} </td>
                                        <td> <masked-input mask="11:11" @input="hourValidation" v-model="defaultCostsData.secondArrivalHour"/> </td>
                                        <td> <input type="number" min="0" v-model="defaultCostsData.secondDistance"/> </td>
                                        <td> <input type="number" min="0" v-model="defaultCostsData.secondCost"/> </td>
                                        <td></td>
                                </tr>
                                    <tr v-for="(cost, index) in customCosts" :key="index">
                                    <td> <input v-model="customCosts[index].leavePlace"/></td>
                                        <td> <masked-input @input="dateValidation" mask="11.11.1111" v-model="customCosts[index].leaveDate"/> </td>
                                        <td> <masked-input @input="hourValidation" mask="11:11" v-model="customCosts[index].leaveHour"/> </td>
                                        <td> <input  v-model="customCosts[index].arrivalPlace"/> </td>
                                        <td>  <masked-input v-model="customCosts[index].arrivalDate" @input="dateValidation"  mask="11.11.1111" /></td>
                                        <td> <masked-input mask="11:11" @input="hourValidation" v-model="customCosts[index].arrivalHour" /> </td>
                                        <td> <input type="number" min="0" v-model="customCosts[index].distance" /> </td>
                                        <td> <input type="number" min="0" v-model="customCosts[index].cost" /> </td>
                                        <td> <button @click="removeRow(index)"> X </button></td>
                                </tr>
                            </tbody>
                            </table>
                            <p v-if="invalidHour"> Wprowadzona godzina ma nieprawidłwy format. </p>
                            <p v-if="invalidDate"> Wprowadzona data ma nieprawidłwy format. </p>
                            <button  @click="save"> Zapisz </button>
                            <!-- :disabled="disableSaveBtn" -->
                        </div>
                    </div>
                    <div class="delegations-tile">
                        <div class="delegations-tile-header">
                            <div class="delegations-tile-title">
                                Koszty
                            </div>
                            <div class="delegations-tile-underscore"></div>
                        </div>
                        <div class="delegations-tile-content">
                            
                            <button @click="addCostRow"> + </button>
                            <table>
                            <thead>
                                <tr>
                                    <td>Data dokumentu</td>
                                    <td>Firma</td>
                                    <td>Numer dokumentu</td>
                                    <td>Zwrot?</td>
                                    <td>Waluta</td>
                                    <td>Nolegi</td>
                                    <td>Przejazdy</td>
                                    <td>Inne</td>
                                    <td>Kwota w PLN</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cost, index) in costTableData" :key="index">
                                    <td> <masked-input @input="dateValidation" mask="11.11.1111" v-model="costTableData[index].docDate"/> </td>
                                    <td><input v-model="costTableData[index].company"/></td>
                                    <td><input v-model="costTableData[index].docNo"/></td>
                                    <td><input type="checkbox"  @change="updateTotalCosts" v-model="costTableData[index].payback"/></td>
                                    <td><select v-model="costTableData[index].currency" @change="updateTotalCosts">
                                            <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                        </select>
                                    </td>
                                    <!-- acc -accomodation, trv - travel - oth - others -->
                                    <td><input type="radio"  @change="updateTotalCosts" value="ACC" v-model="costTableData[index].costType"/></td>
                                    <td><input type="radio"   @change="updateTotalCosts" value="TRV" v-model="costTableData[index].costType"/></td>
                                    <td><input type="radio"  @change="updateTotalCosts" value="OTH" v-model="costTableData[index].costType"/></td>
                                    <td><input type="number" @change="updateTotalCosts" min="0" v-model="costTableData[index].amount"/></td>
                                    <td> <button @click="removeCostRow(index)"> X </button></td>
                                </tr>
                                <tr>
                                    <td colspan="2"> </td>
                                    <td> Razem PLN </td>
                                    <td><p>{{ totalCosts.payback }}</p></td>
                                    <td>---</td>
                                    <td><p>{{ totalCosts.accomodation }}</p> </td>
                                    <td><p>{{ totalCosts.travel }}</p> </td>
                                    <td> <p>{{ totalCosts.others }}</p> </td>
                                    <td><strong><p>{{ totalCosts.amount }}</p> </strong> </td>
                                    <td></td>
                                </tr>
                            </tbody>
                            </table>
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
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Menu from '../Menu.vue'
export default {
    data(){
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
            disableSaveBtn: true
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
            if (this.newDelegation.dates){
            return moment(this.newDelegation.dates.start).format("DD.MM.YYYY")
            } else {
                return null
            }
        },
        delegationEndDate() {
            if (this.newDelegation.dates){
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
    //    const data = this.newDelegation,
    //          customData =  Object.assign({}, this.customCosts),
    //           props = Object.getOwnPropertyNames(customData[0])
    //    for (let key in data) {
    //        if (!data[key]) {
    //            this.disableSaveBtn = true
    //            return
    //        } else {
    //            this.disableSaveBtn = false
    //        }
    //    }
    //    for (let i=0; i< customData.length; i++){
    //        let propName = props[i];
    //        if (customData[propName] = null) {
    //            this.disableSaveBtn = true
    //            return
    //        } else {
    //            this.disableSaveBtn = false
    //        }
    //    }
    },
    checkSelectVal() {
    const transport = this.newDelegation.transport
       if ( transport === "companyCar" || transport === "privateCar") {
           this.showLicensePlateNo = true
       } else {
           this.showLicensePlateNo = false
       }
       this.$store.dispatch('checkDelegationFields')
    },
    addRow() {
        this.$store.dispatch('addDelegationRow')
    },
    addCostRow() {
        this.$store.dispatch('addCostRow')
    },
    removeRow(index) {
        this.$store.dispatch('removeDelegationRow', index)
    },
    removeCostRow(index) {
    this.$store.dispatch('removeCostRow', index)
    },
    dateValidation(value) {
            const day = parseInt(value.slice(0, 2)),
                month = parseInt(value.slice(3, 5))
                
            if (day > 31 || month > 12) {
                this.invalidDate = true
                this.disableSaveBtn = true
            } else {
                this.invalidDate = false
            }
            this.$store.dispatch('checkDelegationFields')
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
    },
    updateTotalCosts() {
        this.$store.dispatch('updateTotalCosts')
    },
    save() {
        // const costs = this.customCosts.slice(0)
        const costs = []
        for (let i=0; i< this.customCosts.length; i++)  {
            costs[i] = Object.assign({}, this.customCosts[i])
        }
        const firstDefaultCost = {
           leavePlace:  this.defaultCostsData.firstLeavePlace,
           leaveDate: this.newDelegation.dates.start,
           leaveHour: this.defaultCostsData.firstLeaveHour,
           arrivalPlace: this.newDelegation.destination,
           arrivalDate: this.newDelegation.dates.start,
           arrivalHour: this.defaultCostsData.firstArrivalHour,
           distance: this.defaultCostsData.firstDistance,
           cost: this.defaultCostsData.firstCost 
        }
        const secondDefaultCost = {
           leavePlace:  this.newDelegation.destination,
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
    }
    }
}
</script>

<style>
table, th, td {
    border: 1px solid black;
}

#delegationCostsTabletd,
td {
    width: 200px;
}

</style>
