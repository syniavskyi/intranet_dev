 <template>
    <div>
        <h1>Delegacje</h1>
        <div>
            <label>Dotyczy: </label><p> {{userData.firstName}} {{userData.lastName}} </p>
        </div>
        <div>
            <label>Numer: </label><input v-model="newDelegation.number" @input="checkFields"/>
        </div>
        <div>
            <label>Dnia: </label>
            <!-- <masked-input mask="11.11.1111" @input="dateValidation" v-model="newDelegation.createDate" /> -->
            <v-date-picker @input="checkFields"  v-model="newDelegation.createDate">
                <input value="newDelegation.createDate" />
            </v-date-picker>
        </div>
        <div>
            <label>Na czas: </label>
            <v-date-picker @input="checkFields" is-expanded mode="range" v-model="newDelegation.dates">
                <input value="newDelegation.dates" />
            </v-date-picker>
        </div>
        <div>
            <label>Do: </label><input v-model="newDelegation.destination" @input="checkFields"/>
        </div>
         <div>
            <label>W celu: </label><input v-model="newDelegation.purpose" @input="checkFields"/>
        </div>
        <div>
            <label>Transport: </label>
            <select v-model="newDelegation.transport" @change="checkSelectVal">
                <option value="LOT">LOT</option>
                <option value="PKP">PKP</option>
                <option value="companyCar">samochód służbowy</option>
                <option value="privateCar">samochód prywatny</option>
                <option value="other">Inne</option>
            </select>
        </div>
        <div v-if="showLicensePlateNo">
            <label>Numer rejestracyjny: </label><input v-model="newDelegation.licensePlateNo" @input="checkFields"/>
        </div>
        <div>
            <h3>Rachunek kosztów podróży</h3> 
            <button @click="addRow"> + </button>
            <table class="table" id="delegationCostsTable">
               <thead>
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
                   </tr>
               </tbody>
            </table>
            <table class="table addedDelegationCostsTable" id="addedDelegationCostsTable">
               <tbody>
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
</template>

<script>
import MaskedInput from 'vue-masked-input'
import moment from "moment"
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
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
            selectedDepartment: null,
            customCosts: [],
            defaultCostsData: {},
            disableSaveBtn: true
        }
    },
    computed: {
        ...mapGetters({
            userData: 'userData',
            departmentList: 'depList',
            delegationCostList: 'getDelegationCostsList'
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
        MaskedInput
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
        this.customCosts.push({})
        // this.$store.dispatch('addDelegationRow')
    },
    removeRow(index) {
        this.customCosts.splice(index, 1)
        // this.$store.dispatch('removeDelegationRow', index)
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
    save() {
        const costs = this.customCosts.slice(0)
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

td {
    width: 200px;
}

</style>
