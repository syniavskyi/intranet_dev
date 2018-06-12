<template>
    <div class="delegations-tile">
        <div class="delegations-tile-header">
            <div class="delegations-tile-title">
                {{ $t("header.travelCosts") }}
            </div>
            <div class="delegations-tile-underscore"></div>
        </div>
        <div class="delegations-tile-content">

            <button @click="addCostRow"> + </button>
            <div class="delegations-table-wrapper">
                <div class="delegations-table-2">
                    <div class="del-thead-2">
                        <div class="del-thead-item-cost">{{ $t("table.delegations.docDate") }}</div>
                        <div class="del-thead-item-cost-w">{{ $t("table.delegations.company") }}</div>
                        <div class="del-thead-item-cost">{{ $t("table.delegations.docNo") }}</div>
                        <div class="del-thead-item-cost-s">{{ $t("table.delegations.return") }}?</div>
                        <div class="del-thead-item-cost-xw">{{ $t("table.delegations.transport") }}</div>
                        <div class="del-thead-item-cost">{{ $t("table.delegations.paymentType") }}</div>
                        <div class="del-thead-item-cost">{{ $t("table.delegations.kilometers") }}</div>
                        <div class="del-thead-item-cost-s">{{ $t("table.delegations.currency") }}</div>
                        <div class="del-thead-item-cost">{{ $t("table.delegations.amount") }}</div>
                        <div class="del-thead-item-cost">{{ $t("table.delegations.amountPLN") }}</div>
                        <div class="del-thead-item-cost">przyciski</div>
                    </div>
                    <div class="del-tbody-2" v-for="(cost, index) in travelCosts" :key="index">
                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.docDate") }}</div>
                            <div class="del-tbody2-item-txt">
                                <v-date-picker class="delegations-tinput-date" mode="single" @input="checkTravelFields" v-model="cost.docDate">
                                    <input value="otherCosts[index].docDate" />
                                </v-date-picker>
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>
                        <div class="del-tbody2-item-cost-w">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.company") }}</div>
                            <div class="del-tbody2-item-txt">
                                <input class="delegations-tinput" @input="checkTravelFields" v-model="cost.company" />
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>
                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.docNo") }}</div>
                            <div class="del-tbody2-item-txt">
                                <input class="delegations-tinput" @input="checkTravelFields" v-model="cost.docNo" />
                            </div>
                            <div class="del-tfoot2">{{ $t("table.delegations.amountPLN") }}</div>
                        </div>
                        <div class="del-tbody2-item-cost-s">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.return") }}?</div>
                            <div class="del-tbody2-item-txt">
                                <input type="checkbox" @change="updateTravelCosts" v-model="cost.payback" />
                            </div>
                            <div class="del-tfoot2-s">{{ totalCosts.trvPayback }}</div>
                        </div>
                        <div class="del-tbody2-item-cost-xw">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.transport") }}</div>
                            <div class="del-tbody2-item-txt">
                                <select class="delegations-tselect" :id="index" v-model="cost.transport" @change="checkTransportType">
                                    <option v-for="transport in transportList" :key="transport.id" :value="transport.id">{{ transport.name }}</option>
                                </select>
                                <p class="table-p">{{ $t("label.registrationNo") }}</p>
                                <input class="delegations-tinput" :disabled="!showCarData" @change="checkTravelFields" v-model="cost.licencePlateNo" />
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>

                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.paymentType") }}</div>
                            <div class="del-tbody2-item-txt">
                                <select :disabled="!showCarData" :id="index" class="delegations-tselect-s" v-model="cost.flatRate" @change="checkReturnType">
                                    <option disabled selected value></option>
                                    <option key="true" :value="true">{{ $t("table.delegations.flatRate") }}</option>
                                    <option key="false" :value="false">{{ $t("table.delegations.noFlatRate") }}</option>
                                </select>
                            <!-- </div>
                            <div class="del-tbody2-item-txt"> -->
                                <select class="delegations-tselect-s" :disabled="!showEngineCapacity" v-model="cost.engineCapacity" @change="checkTravelFields">
                                    <option disabled selected value></option>
                                    <!-- true is for more than 900 cm, false for less -->
                                    <option key="false" :value="false">{{ $t("label.capacityLess") }}<sup>3</sup></option>
                                    <option key="true" :value="true">{{ $t("label.capacityMore") }}<sup>3</sup></option>
                                </select>
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>
                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.kilometers") }}?</div>
                            <div class="del-tbody2-item-txt">
                                <input class="delegations-tinput-s" :disabled="hideKilometers" type="number" @change="checkTravelFields" v-model="cost.kilometers" />
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>
                        <div class="del-tbody2-item-cost-s">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.currency") }}</div>
                            <div class="del-tbody2-item-txt">
                                <select :disabled="hideAmount" class="delegations-tselect-s" v-model="travelCosts[index].currency" @change="updateTravelCosts">
                                    <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                </select>
                            </div>
                            <div class="del-tfoot2">---</div>
                        </div>
                        <!-- acc -accomodation, trv - travel - oth - others -->
                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.amount") }}</div>
                            <div class="del-tbody2-item-txt">
                                <input :disabled="hideAmount" class="delegations-tinput-s" type="number" min="0" @input="updateTravelCosts" v-model="cost.amount" />
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>

                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-title">{{ $t("table.delegations.amountPLN") }}</div>
                            <div class="del-tbody2-item-txt">{{cost.totalAmount}}</div>
                            <div class="del-tfoot2">
                                <p>{{totalCosts.travel }}</p>
                            </div>
                        </div>
                        <div class="del-tbody2-item-cost">
                            <div class="del-tbody2-item-txt">
                                <button @click="removeCostRow(index)"> X </button>
                            </div>
                            <div class="del-tfoot2"></div>
                        </div>
                    </div>
                </div>
                <div class="delegations-table-2 del-table-footer">
                    <div class="del-tbody-2">
                        <div class="del-tbody2-item-wfoot-cost"></div>
                        <div class="del-tbody2-item-cost">{{ $t("table.delegations.amountPLN") }}</div>
                        <div class="del-tbody2-item-cost-s">{{ totalCosts.trvPayback }}</div>
                        <div class="del-tbody2-item-cost-xw"></div>
                        <div class="del-tbody2-item-cost"></div>
                        <div class="del-tbody2-item-cost"></div>
                        <div class="del-tbody2-item-cost-s">---</div>
                        <div class="del-tbody2-item-cost"></div>
                        <div class="del-tbody2-item-cost">{{totalCosts.travel }}</div>
                        <div class="del-tbody2-item-cost"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            showCarData: false,
            showEngineCapacity: false,
            hideKilometers: false,
            hideAmount: false
        }
    },
    computed: {
        ...mapGetters({
            currencyList: 'getCurrencyList',
            travelCosts: 'getTravelCostData',
            totalCosts: 'getTotalCosts',
            transportList: "getTransportList"
        })
    },
    methods: {
        ...mapActions([
            'checkTravelFields'
        ]),
        addCostRow() {
            this.$store.dispatch('addTravelCostRow')
            this.$store.commit('SET_TRV_COSTS_VALIDATED', false)
        },
        removeCostRow(index) {
            this.$store.dispatch('removeTravelCostRow', index)
            this.checkTravelFields()
        },
        updateTravelCosts() {
            this.$store.dispatch('countTravelCosts')
            this.checkTravelFields()
        },
        checkTransportType(value) {
            const type = value.target.value,
                index = value.target.id
            this.showCarData = (type === "companyCar" || type === "privateCar") ? true : false
            this.hideAmount = (type === "companyCar" || type === "privateCar") ? true : false
            this.setFieldsVisibility(this.travelCosts[index].flatRate, index)
        },
        checkReturnType(value) {
            const type = value.target.value,
                index = value.target.id
            this.setFieldsVisibility(type, index)

        },

        setFieldsVisibility(type, index) {
            // type false  = not flat rate (kilometrówka), type  true = flat rate (ryczałt)
            const cost = this.travelCosts[index]

            if (type !== null) {
                if (cost.transport === "privateCar") {
                    this.showEngineCapacity = true
                    cost.engineCapacity = null
                } else if (cost.transport === "companyCar") {
                    cost.engineCapacity = true
                    this.showEngineCapacity = false
                }

        
                if (type === "false" || type === false) {
                    this.hideKilometers = false
                     this.updateTravelCosts()
                } else {
                    this.hideKilometers = true
                    cost.engineCapacity = null
                    cost.currency = null
                    cost.amount = 0
                    this.showEngineCapacity = false
                }
            }
        }

    }
}
</script>

