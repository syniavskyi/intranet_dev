<template>
    <div class="availability-tile ava-tile-3">
        <div class="availability-tile-header">
            <div class="ava-tile-header-title">
                            <!-- <h2>{{ $t("header.addProject") }}</h2> -->
                <h2>Zestawienie dyspozycyjności</h2>
                <div class="availability-tile-underscore"></div>
            </div>
        </div>
        <div class="availability-tile-content">
            <div class="ava-table-s" v-for="(avail, index) in userAvail" :key="index">
                <div class="ava-thead-s">
                    <div class="ava-ths-item">Rodzaj wpisu</div>
                    <div class="ava-ths-item">Od</div>
                    <div class="ava-ths-item">Do</div>
                    <div class="ava-ths-item">Status</div>
                </div>
                <div class="ava-tbody-s">
                    <div class="ava-tbs-item">
                        <div class="ava-tbs-ititle">Rodzaj wpisu</div>
                         <select v-if="!editMode" class="selectProfile selectDisabled" v-model="avail.TypeId">
                            <option v-for="type in availTypes" :key="type.Key" :value="type.Key">{{type.Value}}</option>
                        </select>
                    </div>
                    <div class="ava-tbs-item">
                        <div class="ava-tbs-ititle">Od</div>
                        <v-date-picker class="prof-input-date" popoverDirection="top" @input="validateDates(index)" is-expanded mode="single" v-model="avail.DateStart">
                            <input value="avail.DateStart" />
                        </v-date-picker>
                    </div>
                    <div class="ava-tbs-item">
                        <div class="ava-tbs-ititle">Do</div>
                        <div class="ava-tbs-itxt">{{avail.DateEnd}}</div>
                    </div>
                    <div class="ava-tbs-item">
                        <div class="ava-tbs-ititle">Status</div>
                         <select class="selectProfile selectDisabled" v-model="avail.StatusId">
                            <option v-for="status in availStatus" :key="status.Key" :value="status.Key">{{status.Value}}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>                
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            userAvail: 'getUserAvail',
            availTypes: 'getAvailType',
            availStatus: 'getAvailStatus'
        })
    },
    methods: {
        formatAvailType(type){
            for(let i =0; i<this.availTypes.length; i++){
                if (this.availTypes[i].Key === type) {
                    return this.availTypes[i].Value
                }
            }
        },
        formatAvailStatus(status){
            for(let i =0; i<this.availStatus.length; i++){
                if (this.availStatus[i].Key === status) {
                    return this.availStatus[i].Value
                }
            }
        },
        validateDates(index) {
            // const startDate = this.userExperience[index].DateStart,
            //     endDate = this.userExperience[index].DateEnd,
            //     isCurrent = this.userExperience[index].isCurrent;

            // if (endDate && startDate && isCurrent === false) {
            //     const formatStartDate = moment(startDate).format("YYYY-MM-DD"),
            //     formatEndDate = moment(endDate).format("YYYY-MM-DD");

            //     this.invalidDates = formatStartDate > formatEndDate ? true : false;
            // }
            // this.checkFields(index);
        },
    }
}
</script>

