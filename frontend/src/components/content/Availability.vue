<template>
<div>
    <div class="selectOptions">
        <div class="div-select">
            <label class="label" for="role">{{ $t("label.department") }}</label>
            <select class="selectProfile" v-model="selectedDepartment">
                <option v-for="department in departmentList" :key="department.depId" :value="selectedDepartment = department.depId">{{ department.depName }}</option>
            </select>
        </div>
            <div class="div-select" v-if="selectedDepartment != null">
            <label class="label" for="role">{{ $t("label.branch") }}</label>
            <select class="selectProfile" v-model="selectedBranch">
                <option v-for="section in sectionsList" :key="section.id" :value="section.id"> {{ section.name }}</option>

                <!-- <option v-for="branch in branchList" :key="branch.branchId" :value="selectedBranch = branch.branchId">{{ branch.branchName }}</option> -->
            </select>
        </div>
        <div class="div-select" v-if="selectedBranch != null">
            <label class="label" for="role">{{ $t("label.employee") }}</label>
            <select  class="selectProfile"  v-model="selectedUser" @change="loadUserProjects(selectedUser.id)">
                <option v-for="user in filteredUsers" :value="user" :key="user.id">{{ user.firstName }} {{ user.lastName }}</option>
            </select>
        </div>
    </div>
    <!-- <div class="calendar" v-if="selectedUser != null"> -->
      
     <div class="calendar"> 
        <v-calendar :attributes="attributes" mode='single' is-inline></v-calendar>
    </div>

    <div>
        <button v-if="selectedUser != null" @click="showEditDialog = true"> Edytuj </button>
        <button @click="showAddProjectDialog = true"> Dodaj projekt </button>
    </div>

    <div id="edit-project-dialog" v-if="showEditDialog">
        <h4>Edytuj projekty</h4>
        <label class="label-profile">Wybrany pracownik</label> 
        <p class="label-profile"> {{ selectedUser.firstName }} {{ selectedUser.lastName }}</p>
        <label class="label-profile">Projekty pracownika</label>
        <select class="selectProfile" v-model="projectToEdit">
            <option v-for="project in userProjectsList" :key="project.id" :value="project"> {{ project.projName }} </option>
        </select>
        <div v-if="projectToEdit.id != null">
            <label class="label-profile">Obłożenie</label> 
            <input v-model="projectToEdit.engag"/> <span>%</span>
            <label class="label-profile" >Termin zakończenia</label> 
            <input v-model="projectToEdit.endDate"/>
            <button @click="removeUserProject">Usuń projekt</button>
        </div>
        <button>Anuluj</button>
        <button @click="editProjectForUser">Zapisz</button>
    </div>
    <div id="add-project-dialog" v-if="showAddProjectDialog">
        <h4>Dodaj projekt</h4>
        <label class="label-profile">Pracownik</label>
        <select class="select" v-model="newProjectForUser.userId">
            <option v-for="user in usersList" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
        </select>
        <label class="label-profile">Contractor</label>
        <!-- <select class="selectProfile" v-model="newProjectForUser.contractorId">
            <option v-for="contractor in contractorsList" :key="contractor.id" :value="contractor.id"> {{ contractor.name }}</option>
        </select> -->
        <label class="label-profile">Projekt</label>
        <select class="selectProfile" v-model="newProjectForUser.projectId">
            <option v-for="project in projectsList" :key="project.id" :value="project.id"> {{ project.name }}</option>
        </select>
        <label class="label-profile" >Obłożenie</label> 
        <input v-model="newProjectForUser.engag"/> <span>%</span>
        <label class="label-profile">Termin</label> 
        <input v-model="newProjectForUser.startDate" />
        <input v-model="newProjectForUser.endDate" />
        <!-- <v-date-picker is-expanded mode="range">
            <input placeholder="Wybierz termin" v-model="newProjectForUser.dates"/>
        </v-date-picker> -->
        <button>Anuluj</button>
        <button @click="addNewProjectForUser">Dodaj</button>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '../../lang/lang'
import { required, number } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            showUsersCalendar: false,
            department: [],
            selectedDepartment: null,
            selectedBranch: null,
            showBranchSelect: true,
            selectedUser: null,
            showEditDialog: false,
            showAddProjectDialog: false,
            projectToEdit:{},
            newProjectForUser: {},
            projectList: [
                {
                    id: 1,
                    color: 'red',
                    dates: {
                         start: new Date(2018, 5, 1),
                         end: new Date(2018, 5, 31)
                    },
                    label: i18n.t('calendar.noProjectAssigned'),
                    engagement: '80%'
                }
            ]
            // attributes: [
            //     {
            //         key: 'low',
            //         highlight: { backgroundColor:  '#99FF99' },
            //         dates: {},
            //         popover: {
            //             label: i18n.t('calendar.noProjectAssigned')
            //         }
            //     }
            // ]
        }
    },
    validations: {
        newProject: {
            engagement: {
                required,
                number
            }
        } 
    },
    computed: {
        ...mapGetters({
            departmentList: 'depList',
            usersList: 'usersList',
            userProjectsList: 'userProjectsList',
            sectionsList: 'sectionsList',
            projectsList: 'projectsList'
        }),
        filteredUsers() {
            const usersList = this.usersList
            let filteredUsers = []

            for (let i=0; i<usersList.length; i++){
                if (usersList[i].section === this.selectedBranch.toString() && usersList[i].depName === this.selectedDepartment) {
                    filteredUsers.push(usersList[i])
                }
            }
            return filteredUsers
        },
        attributes() {
            return this.userProjectsList.map(t=>({
                key: 'userProjectsList.${t.id}',
                highlight: {
                    backgroundColor: t.color,
                    borderRadius: '20px'
                },
                dates: {
                    start: t.startDate,
                    end: t.endDate
                },
                popover: {
                    label: t.projName
                },
                customData: t
            }))
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
        loadUserProjects( userId ) {
            this.$store.dispatch('getUserProjects', userId)
        },
        addNewProjectForUser() {
            const data = {
                userId: this.newProjectForUser.userId,
                projName: this.newProjectForUser.projectId,
                engag: this.newProjectForUser.engag,
                endDate: this.newProjectForUser.endDate,
                startDate: this.newProjectForUser.startDate,
                // contractorName: this.newProjectForUser.contractorName
                contractorName: 'IBM'
            }
            this.$store.dispatch('addUserProject', data)
        },
        editProjectForUser() {
            const data = {
                userId: this.selectedUser.id,
                projectId: this.projectToEdit.id,
                projName: this.projectToEdit.projName,
                engag: this.projectToEdit.engag,
                endDate: this.projectToEdit.endDate,
                startDate: this.projectToEdit.startDate,
                contractorName: this.projectToEdit.contractorName
            }
            this.$store.dispatch('editUserProject', data)
        },
        removeUserProject() {
            const data = {
                projectId: this.projectToEdit.id,
                userId: this.selectedUser.id

            }
            this.$store.dispatch('removeUserProject', data)
        }

    }
}
</script>
<style>

</style>
