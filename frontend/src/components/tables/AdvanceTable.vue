<template>
<div class="delegations-tile">
    <div class="delegations-tile-header">
        <div class="delegations-tile-title">
            {{ $t("header.advance") }}
        </div>
        <div class="delegations-tile-underscore"></div>
    </div>
    <div class="delegations-tile-content">

        <button @click="addAdvanceRow"> + </button>
        <div class="delegations-table-wrapper">
            <div class="delegations-table-2">
                <div class="del-thead-2">
                    <div class="del-thead-item-cost">{{ $t("table.delegations.advanceDate") }}</div>
                    <div class="del-thead-item-cost">{{ $t("table.delegations.advanceCurrency") }}</div>
                    <div class="del-thead-item-cost">{{ $t("table.delegations.advanceAmount") }}</div>
                    <div class="del-thead-item-cost">{{ $t("table.delegations.totalAmount") }}</div>
                    <div class="del-thead-item-cost">przyciski</div>
                </div>
                <div class="del-tbody-2" v-for="(advance, index) in advanceData" :key="index">
                    <div class="del-tbody2-item-cost">
                        <div class="del-tbody2-item-title">{{ $t("table.delegations.advanceDate") }}</div>
                        <div class="del-tbody2-item-txt">
                            <v-date-picker class="delegations-tinput-date" mode="single" @input="checkAdvanceFields" v-model="advance.date">
                                <input value="otherCosts[index].docDate" />
                            </v-date-picker>
                        </div>
                        <div class="del-tfoot2"></div>
                    </div>
                    <div class="del-tbody2-item-scost">
                        <div class="del-tbody2-item-title">{{ $t("table.delegations.currency") }}</div>
                        <div class="del-tbody2-item-txt">
                            <select class="delegations-tselect-s" v-model="advance.currency" @change="updateAdvance">
                                <option v-for="currency in currencyList" :key="currency.id" :value="currency.id">{{ currency.id }}</option>
                             </select>
                        </div>
                        <div class="del-tfoot2">{{ $t("table.delegations.amountPLN") }}</div>
                    </div>
                    <div class="del-tbody2-item-cost">
                        <div class="del-tbody2-item-title">{{ $t("table.delegations.advanceAmount") }}</div>
                        <div class="del-tbody2-item-txt">
                            <input class="delegations-tinput" type="number" min="0" @input="updateAdvance" v-model="advance.amount" /></div>
                    </div>
                    <div class="del-tfoot2"></div>
                    <div class="del-tbody2-item-cost">
                        <div class="del-tbody2-item-title">{{ $t("table.delegations.totalAmount") }}</div>
                        <div class="del-tbody2-item-txt">
                            {{advance.totalAmount}}
                        </div>
                    </div>
                    <div class="del-tfoot2">{{totalCosts.advance }}</div>
                    <div class="del-tbody2-item-scost">
                        <div class="del-tbody2-item-txt"><button @click="removeAdvanceRow(index)"> X </button></div>
                        <div class="del-tfoot2"></div>
                    </div>
                </div>

            </div>
        </div>
        <div class="delegations-table-2 del-table-footer">
            <div class="del-tbody-2">
                <div class="del-tbody2-item-wfoot-cost"></div>
                <div class="del-tbody2-item-cost">{{ $t("table.delegations.amountPLN") }}</div>
                <div class="del-tbody2-item-cost-s">{{totalCosts.advance }}</div>
                <div class="del-tbody2-item-cost-s"></div>
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

        }
    },
    computed: {
        ...mapGetters({
            currencyList: 'getCurrencyList',
            advanceData: 'getAdvanceData',
            totalCosts: 'getTotalCosts'
        })
    },
    methods: {
        ...mapActions([
            'checkAdvanceFields',
            'updateAdvance',
            'removeAdvanceRow'
        ]),
        addAdvanceRow() {
            this.$store.dispatch('addAdvanceRow')
            this.$store.commit('SET_ADVANCE_VALIDATED', false)
        }
    }
}
</script>
