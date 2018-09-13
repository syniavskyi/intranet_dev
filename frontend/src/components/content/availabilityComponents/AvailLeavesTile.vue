<template>

 <div class="availability-tile ava-tile-2">
                        <div class="availability-tile-header">
                            <div class="ava-tile-header-title">
                                <h2>Dodaj wpis dla użytkownika {{formattedUsername}} </h2>
                                <div class="availability-tile-underscore"></div>
                            </div>
                            <!-- <button class="ava-button ava-button-add" @click="showAddProjectDialog = true"> Dodaj projekt </button> -->
                        </div>
                        <div class="availability-tile-content">
                            <div id="add-project-dialog">
                                <div class="ava-add-1">
                                    <p v-if="newLeave.TypeId === null">Aby dodać wpis, Wybierz jego rodzaj po lewej stronie</p>
                                    <p v-if="newLeave.TypeId !== null">Rodzaj wpisu: {{formattedType}}</p>
                                    <div class="ava-div-select-cool">
                                        <v-date-picker required class="ava-input-range-wide" popoverDirection="top" is-expanded mode="range" v-model="selectedDates" @change="checkFields">
                                            <input class="ava-input-range-wide" value="selectedDates"/>
                                        </v-date-picker>
                                        <label class="ava-input-label-cool">{{ $t("label.dates") }}</label>
                                    </div>
                                    <div class="ava-div-select-cool">
                                        <select required class="ava-select-cool" v-model="newLeave.StatusId" @change="checkFields">
                                            <option v-for="status in availStatusList" :key="status.Key" :value="status.Key">{{ status.Value }}</option>
                                             <!-- <option v-for="branch in branchList" :key="branch.branchId" :value="selectedBranch = branch.branchId">{{ branch.branchName }}</option> -->
                                        </select>
                                        <label class="ava-select-label-cool">Status</label>
                                    </div>
                                </div>
                                <div class="ava-add-2">
                                    <div class="ava-div-input-cool" v-if="newLeave.TypeId == 'OT'">
                                        <textarea class="ava-textarea" required maxlength="50" @change="checkFields"/>
                                        <label class="ava-select-label-cool">Uwagi</label>
                                    </div>
                                    <div class="ava-div-buttons">
                                        <button class="ava-button" >{{ $t("button.cancel") }}</button>
                                        <button :disabled="disableAddNew" class="ava-button ava-button-edit" @click="addNewLeave" >Dodaj wpis</button>
                                    </div>
                                </div>

                            </div>
                        </div>
  </div>    
</template>
<script>
import { mapGetters } from 'vuex';
let utils = require('../../../utils')
export default {
    props: ['selected-type', 'selected-user'],
    data() {
        return {
            selectedDates: null,
            disableAddNew: true
        }
    },
    computed: {
        ...mapGetters({
            newLeave: 'getNewLeaveForUser',
            availStatusList: 'getAvailStatus',
            usersList: 'usersList',
            availTypesList: 'getAvailType'
        }),
        formattedUsername() {
            const userId = this.selectedUser
            for (let i = 0; i < this.usersList.length; i++){
                if (this.usersList[i].UserAlias === userId) {
                     return this.usersList[i].Fullname
                }
            }
        },
        formattedType() {
            const typeId = this.newLeave.TypeId
            for (let i = 0; i < this.availTypesList.length; i++){
                if (this.availTypesList[i].Key === typeId) {
                     return this.availTypesList[i].Value
                }
            }
        }
    },
    watch: {
        selectedDates(value){
            this.newLeave.DateStart = utils.formatDateForBackend(value.start)
            this.newLeave.DateEnd = utils.formatDateForBackend(value.end)
        },
        selectedType(value){
            if (value){
                this.checkFields()
            } else {
                this.disableAddNew = true
            }
        }
    },
    methods: {
        checkFields() {
            let obj = this.newLeave
            for (let key in obj) {
                if (!obj[key]){
                    this.disableAddNew = true
                    return
                } else {
                    this.disableAddNew = false
                }
            }
        },
        addNewLeave() {
            console.log(this.newLeave)
        }
    }
};
</script>

