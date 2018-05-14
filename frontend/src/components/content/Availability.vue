<template>
<div>
    <div class="selectOptions">
        <div class="div-select">
            <label class="label" for="role">{{ $t("label.department") }}</label>
            <select class="select" v-model="selectedDepartment">
                <option v-for="department in departmentList" :key="department.depId" :value="selectedDepartment = department.depId">{{ department.depName }}</option>
            </select>
        </div>
            <div class="div-select" v-show="selectedDepartment != null">
            <label class="label" for="role">{{ $t("label.branch") }}</label>
            <select class="select" v-model="selectedBranch">
                <option>Fiori</option>
                <option>ABAP</option>
                <option>Consulting</option>
                <!-- <option v-for="branch in branchList" :key="branch.branchId" :value="selectedBranch = branch.branchId">{{ branch.branchName }}</option> -->
            </select>
        </div>
        <div class="div-select" v-show="selectedBranch != null">
            <label class="label" for="role">{{ $t("label.employee") }}</label>
            <select class="select" v-model="selectedUser">
                <option v-for="user in filteredUsers" :key="user.lastName">{{ user.firstName }} {{ user.lastName }}</option>
            </select>
        </div>
    </div>
    <div class="calendar" v-if="selectedUser != null">
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
            const usersList = this.$store.getters.usersList
            let filteredUsers = []

            for (let i=0; i<usersList.length; i++){
                if (usersList[i].section === this.selectedBranch && usersList[i].depName === this.selectedDepartment) {
                    filteredUsers.push(usersList[i])
                }
            }
            return filteredUsers
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
