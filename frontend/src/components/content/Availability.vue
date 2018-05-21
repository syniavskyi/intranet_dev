<template>
<div>
    <div class="selectOptions">
        <div class="div-select">
            <label class="label" for="role">{{ $t("label.department") }}</label>
            <select class="selectProfile" v-model="selectedDepartment">
                <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
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
            <select class="selectProfile" v-model="selectedUser" @change="loadUserProjects(selectedUser.id)">
                <option v-for="user in filteredUsers" :value="user" :key="user.id">{{ user.firstName }} {{ user.lastName }}</option>
            </select>
        </div>
    </div>
    <!-- <div class="calendar" v-if="selectedUser != null"> -->

    <div class="calendar">
        <v-calendar :theme-styles="themeStyles" v-if="selectedUser != null" :attributes="attributes" mode='single' is-inline></v-calendar>
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
        <select @change="onEdit" class="selectProfile" v-model="projectToEdit">
            <option v-for="project in userProjectsList" :key="project.projId" :value="project"> {{ project.projName }} </option>
        </select><br/>
        <div v-if="projectToEdit.id != null">
            <label class="label-profile">Obłożenie</label>
            <input type="number" max="100" min="0" @input="validateEditEngag(projectToEdit.engag)" v-model="projectToEdit.engag" /> <span>%</span><br/>
            <label class="label-profile">Termin rozpoczęcia</label>
            <v-date-picker v-model="projectToEdit.startDate" mode="single">
                <input  value="projectToEdit.startDate" />
            </v-date-picker> <br/>
            <label class="label-profile">Termin zakończenia</label>
            <v-date-picker v-model="projectToEdit.endDate" mode="single">
                <input value="projectToEdit.endDate" />
            </v-date-picker>
            <button @click="removeUserProject">Usuń projekt</button>
        </div>
        <button @click="onCancelEdit">Anuluj</button>
        <button :disabled="disableSaveEditProject" @click="editProjectForUser">Zapisz</button>
    </div>
    <div id="add-project-dialog" v-if="showAddProjectDialog">
        <h4>Dodaj projekt</h4>
        <label class="label-profile">Pracownik</label>
        <select @change="setProjectsToCheck(newProjectForUser.userId)" class="select" v-model="newProjectForUser.userId">
            <option v-for="user in usersList" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
        </select><br/>
        <label class="label-profile">Kontrahent</label>
        <select @change="removeSelectedProject" class="selectProfile" v-model="newProjectForUser.contractorId">
            <option v-for="contractor in contractorsList" :key="contractor.id" :value="contractor.id"> {{ contractor.name }}</option>
        </select><br/>
        <label class="label-profile">Projekt</label>
        <select @change="validateNewProject" class="selectProfile" v-model="newProjectForUser.projectId">
            <option v-for="project in filteredProjects" :key="project.id" :value="project.id"> {{ project.name }}</option>
        </select><br/>
        <p v-if="projectExist"> Taki projekt już jest przypisany </p>
        <div class="project-data">
            <label class="label-profile">Obłożenie</label>
            <input v-model="newProjectForUser.engag" @input="validateNewEngag(newProjectForUser.engag)" type="number" min="0" max="100" /><span>%</span><br/>
            <v-date-picker is-expanded mode="range" v-model="newProjectForUser.dates">
                <input value="newProjectForUser.dates" />
            </v-date-picker>
            <button @click="onCancelCreate">Anuluj</button>
            <button :disabled="disableSaveNewProject" @click="addNewProjectForUser">Dodaj</button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import moment from "moment";
import i18n from '../../lang/lang'
import {
    required,
    number,
    between
} from 'vuelidate/lib/validators'

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
            projectToEdit: {},
            newProjectForUser: {}
        }
    },
    computed: {
        ...mapGetters({
            departmentList: 'depList',
            usersList: 'usersList',
            userProjectsList: 'userProjectsList',
            sectionsList: 'sectionsList',
            projectsList: 'projectsList',
            contractorsList: 'contractorsList',
            disableSaveNewProject: 'getDisableSaveNewProject',
            disableSaveEditProject: 'getDisableSaveEditProject',
            beforeEditingCache: 'getBeforeEditingCache',
            hasDataChanged: 'getHasDataChanged',
            projectExist: 'getProjectExist',
            userProjectsToCheckList: 'userProjectsToCheckList'
        }),
        filteredUsers() {
            const usersList = this.usersList
            let filteredUsers = []

            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].section === this.selectedBranch.toString() && usersList[i].depName === this.selectedDepartment) {
                    filteredUsers.push(usersList[i])
                }
            }
            return filteredUsers
        },
        filteredProjects() {
            const projectsList = this.projectsList
            let filteredProjects = []

            for (let i = 0; i < projectsList.length; i++) {
                if (projectsList[i].contractorId === this.newProjectForUser.contractorId) {
                    filteredProjects.push(projectsList[i])
                }
            }
            return filteredProjects
        },
        attributes() {
            return this.userProjectsList.map(t => ({
                key: t.id,
                highlight: {
                    backgroundColor: t.color,
                    borderRadius: '0px',
                    height: '100%'
                },
                order: t.order,
                dates: {
                    start: t.startDate,
                    end: t.endDate
                },
                popover: {
                    label: t.projName
                },
                customData: t
            }))
        },
        themeStyles() {
            return {
                dayCell: {
                    backgroundColor: '#CCFF99',

                },
                dayCellNotInMonth: {
                    opacity: 0
                }
            }
        }
    },
    beforeCreate() {
        if (this.showMenu === false) {
            this.$store.commit('DISPLAY_MENU', true)
        }

        if (localStorage.getItem('role') === 'leader') {
            this.showBranchSelect = false
        }
        if (this.$store.getters.isDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
        }

    },
    methods: {
        loadUserProjects(userId) {
            this.$store.dispatch('getUserProjects', userId)
        },
        setProjectsToCheck(userId) {
             this.$store.dispatch('getUserProjectsToCheck', userId)
            this.validateNewProject()
        },
        addNewProjectForUser() {
            this.$store.dispatch('addUserProject', this.newProjectForUser)
            this.showAddProjectDialog = false
            this.newProjectForUser = {}
        },
        onEdit() {
            const beforeEditingCache = Object.assign({}, this.projectToEdit)
            this.$store.commit('SET_BEFORE_EDIT_CACHE', beforeEditingCache)
            this.validateEditProject()
        },
        onCancelEdit() {
            Object.assign(this.projectToEdit, this.beforeEditingCache)
            this.$store.commit('SET_BEFORE_EDIT_CACHE', null)
            this.showEditDialog = false
            this.projectToEdit = {}
        },
        onCancelCreate() {
            this.showAddProjectDialog = false
            this.newProjectForUser = {}
        },
        editProjectForUser() {
            this.projectToEdit.userId = this.selectedUser.id
            this.$store.dispatch('editUserProject', this.projectToEdit)
            this.showEditDialog = false
        },
        removeUserProject() {
            const data = {
                projectId: this.projectToEdit.id,
                userId: this.selectedUser.id
            }
            this.$store.dispatch('removeUserProject', data)
            this.showEditDialog = false
            this.projectToEdit = {}
        },
        validateNewEngag(engag) {
            if (engag < 0) this.newProjectForUser.engag = null;
            if (engag > 100) this.newProjectForUser.engag = 100;
            this.validateNewProject()
        },
        removeSelectedProject(){
            this.newProjectForUser.projectId = null
            this.validateNewProject()
        },
        validateNewProject() {
           const currProjects = this.userProjectsToCheckList,
                projectId = this.newProjectForUser.projectId
            for (var i = 0; i < currProjects.length; i++) {
                if (projectId === currProjects[i].projId) {
                    this.$store.commit('SET_PROJECT_EXIST',true)
                    this.$store.commit('SET_DISABLE_SAVE_NEW',true)
                    return
                } else {
                    this.$store.commit('SET_PROJECT_EXIST',false)
                    this.$store.dispatch('validateNewProject', this.newProjectForUser)
                }
            }
        },
        validateEditEngag(engag) {
            if (engag < 0) this.projectToEdit.engag = null;
            if (engag > 100) this.projectToEdit.engag = 100;
            this.validateEditProject()
        },
        validateEditProject() {
            this.$store.dispatch('validateEditProject', this.projectToEdit)
        }
    }
}
</script>
<style>

</style>
