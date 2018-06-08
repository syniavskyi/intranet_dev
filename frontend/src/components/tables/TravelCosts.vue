<template>

    <div>
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
                                    <div class="del-thead-item">{{ $t("table.delegations.docDate") }}</div>
                                    <div class="del-thead-item">{{ $t("table.delegations.company") }}</div>
                                    <div class="del-thead-item">{{ $t("table.delegations.docNo") }}</div>
                                    <div class="del-thead-item">{{ $t("table.delegations.return") }}?</div>
                                    <div class="del-thead-item">{{ $t("table.delegations.currency") }}</div>
                                    <div class="del-thead-item">{{ $t("table.delegations.amount") }}</div>
                                    <div class="del-thead-item">{{ $t("table.delegations.amountPLN") }}</div>
                                    <div class="del-thead-item">przyciski</div>
                                </div>
                                <div class="del-tbody-2" v-for="(cost, index) in travelCosts" :key="index">
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.docDate") }}</div>
                                        <div class="del-tbody2-item-txt">
                                            <v-date-picker class="delegations-tinput-date" mode="single" @input="checkTravelCostsFields" v-model="cost.docDate">
                                                <input value="otherCosts[index].docDate" />
                                            </v-date-picker>
                                        </div>
                                        <div class="del-tfoot2"></div>
                                    </div>
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.company") }}</div>
                                        <div class="del-tbody2-item-txt">
                                            <input class="delegations-tinput" @input="checkTravelCostsFields" v-model="cost.company" />
                                        </div>
                                        <div class="del-tfoot2"></div>
                                    </div>
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.docNo") }}</div>
                                        <div class="del-tbody2-item-txt">
                                            <input class="delegations-tinput" v-model="cost.docNo" /> 
                                        </div>
                                        <div class="del-tfoot2">{{ $t("table.delegations.amountPLN") }}</div>
                                    </div>
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.return") }}?</div>
                                        <div class="del-tbody2-item-txt">
                                            <input type="checkbox" @change="updateTravelCosts" v-model="cost.payback" />
                                        </div>
                                        <div class="del-tfoot2">{{ totalCosts.trvPayback }}</div>
                                    </div>
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.currency") }}</div>
                                        <div class="del-tbody2-item-txt">
                                            <select class="delegations-tselect-s" v-model="travelCosts[index].currency" @change="updateTravelCosts">
                                                <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                                            </select>
                                        </div>
                                        <div class="del-tfoot2">---</div>
                                    </div>
                                    <!-- acc -accomodation, trv - travel - oth - others -->
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.amount") }}</div>
                                        <div class="del-tbody2-item-txt">
                                             <input class="delegations-tinput" type="number" min="0" @input="updateTravelCosts" v-model="cost.amount" /></div>
                                        <div class="del-tfoot2"></div>
                                    </div>
                                    
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-title">{{ $t("table.delegations.amountPLN") }}</div>
                                        <div class="del-tbody2-item-txt">{{cost.totalAmount}}</div>
                                        <div class="del-tfoot2">
                                            <p>{{totalCosts.travel }}</p>
                                        </div>
                                    </div>
                                    <div class="del-tbody2-item">
                                        <div class="del-tbody2-item-txt"><button @click="removeCostRow(index)"> X </button></div>
                                        <div class="del-tfoot2"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="delegations-table-2 del-table-footer">
                                <div class="del-tbody-2">
                                    <div class="del-tbody2-item-w"></div>
                                    <div class="del-tbody2-item">{{ $t("table.delegations.amountPLN") }}</div>
                                    <div class="del-tbody2-item">{{ totalCosts.trvPayback }}</div>
                                    <div class="del-tbody2-item">---</div>
                                    <div class="del-tbody2-item"></div>
                                    <div class="del-tbody2-item">{{totalCosts.travel }}</div>
                                    <div class="del-tbody2-item"></div>
                                </div>
                            </div>
                        </div>
    </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
           
        }
    },
    computed: {
        ...mapGetters({
            currencyList: 'getCurrencyList',
            travelCosts: 'getTravelCostData',
            totalCosts: 'getTotalCosts'
        })
    },
    methods: {
        ...mapActions([
            'checkTravelCostsFields'
        ]),
        addCostRow() {
            this.$store.dispatch('addTravelCostRow')
            this.$store.commit('SET_TRV_COSTS_VALIDATED', false)
        },
        removeCostRow(index) {
            this.$store.dispatch('removeTravelCostRow', index)
            this.checkTravelCostsFields()
        },
        updateTravelCosts() {
             this.$store.dispatch('countTravelCosts')
            this.checkTravelCostsFields()
        }

    }
}
</script>