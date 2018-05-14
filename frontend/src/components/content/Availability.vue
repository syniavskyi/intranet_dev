<template>
<div>
    <div class="selectOptions">
        <div class="div-select">
            <label class="label" for="role">{{ $t("label.department") }}</label>
            <select class="select" v-model="selectedDepartment">
                <option v-for="department in departmentList" :key="department.depId">{{ department.depName }}</option>
            </select>
        </div>
            <div class="div-select" v-if="showBranchSelect">
            <label class="label" for="role">{{ $t("label.branch") }}</label>
            <select class="select" v-model="selectedBranch">
                <option>Fiori</option>
                <option>ABAP</option>
                <option>Consulting</option>
                <!-- <option v-for="branch in branchList" :key="branch.branchId" :value="selectedBranch = branch.branchId">{{ branch.branchName }}</option> -->
            </select>
        </div>
        <div class="div-select">
            <label class="label" for="role">{{ $t("label.employee") }}</label>
            <select class="select" v-model="selectedUser">
                <option v-for="user in filteredUsers" :key="user.userId">{{ user.userName }}</option>
            </select>
        </div>
    </div>
    <div class="calendar" v-if="showUsersCalendar">
        <v-date-picker mode='single' is-inline></v-date-picker>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            showUsersCalendar: false,
            department: [],
            selectedDepartment: null,
            selectedBranch: null,
            showBranchSelect: true,
            selectedUser: null
        }
    },
    computed: {
        ...mapGetters({
            departmentList: 'depList',
            usersList: 'usersList'
        }),
        filteredUsers() {

        }
    },
    beforeCreate() {
        if (this.showMenu === false) {
            this.$store.commit('DISPLAY_MENU', true)
        }
           
        if (localStorage.getItem('role') === 'leader') {
            this.showBranchSelect = false
        }
        if (this.$store.getters.idDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
        }

    },
    created() {

    },
    methods: {

    }
}
</script>
<style>

</style>
