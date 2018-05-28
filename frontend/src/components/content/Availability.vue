<template>
<div class="plane-availability">
    <div class="availability-nav-and-content">
        <app-menu></app-menu>
        <div class="availability-content">
            <div class="availability-header">
                <div class="avaiability-header-title-and-menu">
                    <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="availability-header-menu">
                    <p class="availability-header-title">{{ $t("header.availability") }}</p>
                </div>
            </div>
            <div class="availability-tiles">
                <div class="availability-tile ava-tile-1">
                    <div class="availability-tile-header">
                        <div class="ava-tile-header-title">
                            <h2 v-if="selectedUser === null" >{{ $t("header.selectEmployee") }}</h2>
                            <h2 class="ava-selected-user-h2" v-else-if="selectedUser !== null">{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h2>
                            <div class="availability-tile-underscore"></div>
                        </div>
                        <button class="ava-button ava-button-edit" v-if="selectedUser != null" @click="showEditDialog = true">{{ $t("button.editProjects") }}</button>
                    </div>
                    <div class="availability-tile-content">
                        <div class="availability-select-options">
                            <div class="ava-div-select">
                                <label class="ava-select-label">{{ $t("label.department") }}</label>
                                <select class="ava-select" v-model="selectedDepartment">
                                    <option v-for="department in departmentList" :key="department.depId" :value="department.depId">{{ department.depName }}</option>
                                </select>
                            </div>
                            <div class="ava-div-select" v-if="selectedDepartment != null">
                                <label class="ava-select-label">{{ $t("label.branch") }}</label>
                                <select class="ava-select" v-model="selectedBranch">
                                    <option v-for="section in sectionsList" :key="section.id" :value="section.id"> {{ section.name }}</option>
                                    <!-- <option v-for="branch in branchList" :key="branch.branchId" :value="selectedBranch = branch.branchId">{{ branch.branchName }}</option> -->
                                </select>
                            </div>
                            <div class="ava-div-select" v-if="selectedBranch != null">
                                <label class="ava-select-label">{{ $t("label.employee") }}</label>
                                <select class="ava-select" v-model="selectedUser" @change="loadUserProjects(selectedUser.id)">
                                    <option v-for="user in filteredUsers" :value="user" :key="user.id">{{ user.firstName }} {{ user.lastName }}</option>
                                </select>
                            </div>
                            
                        </div>
                        <!-- <div class="calendar" v-if="selectedUser != null"> -->
                        <div class="ava-calendar">
                            <v-calendar class="availability-calendar" :theme-styles="themeStyles" v-if="selectedUser != null" :attributes="attributes" mode='single' is-inline></v-calendar>
                        </div>
                        <div id="ava-edit-project-dialog" v-if="showEditDialog">
                            <div class="ava-edit-1">
                                <div class="ava-div-select">
                                    <label class="ava-select-label">{{ $t("label.emplProjects") }}</label>
                                    <select @change="onEdit" class="ava-select" v-model="projectToEdit">
                                        <option v-for="project in userProjectsList" :key="project.projId" :value="project"> {{ project.projName }} </option>
                                    </select>
                                </div>
                                <div class="ava-div-buttons">
                                    <button class="ava-button" @click="onCancelEdit">{{ $t("button.cancel") }}</button>
                                    <button class="ava-button" :disabled="disableSaveEditProject" @click="editProjectForUser">{{ $t("button.save") }}</button>
                                     <p v-if="editError">{{ $t("message.editProjectError") }}</p>
                                </div>
                            </div>
                            <div class="ava-edit-2 ava-edit-project-to-edit" v-if="projectToEdit.id != null">
                                <div class="ava-div-input"> 
                                    <label class="ava-input-label">{{ $t("label.engag") }}</label>
                                    <input class="ava-input-range-perc" type="number" max="100" min="0" @input="validateEditEngag(projectToEdit.engag)" v-model="projectToEdit.engag"/><span class="ava-perc-span">%</span>
                                </div>
                                <div class="ava-div-input">
                                    <label class="ava-input-label">{{ $t("label.startDate") }}</label>
                                    <v-date-picker class="ava-input-range" v-model="projectToEdit.startDate" mode="single">
                                        <input value="projectToEdit.startDate" />
                                    </v-date-picker>
                                </div>
                                <div class="ava-div-input">
                                    <label class="ava-input-label">{{ $t("label.endDate") }}</label>
                                    <v-date-picker class="ava-input-range" v-model="projectToEdit.endDate" mode="single">
                                        <input  value="projectToEdit.endDate" />
                                    </v-date-picker>
                                </div>
                                <div class="ava-div-buttons">
                                    <button class="ava-button" @click="removeUserProject">{{ $t("button.removeProject") }}</button>
                                     <p v-if="removeError">{{ $t("message.removeProjectError") }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="availability-tile ava-tile-2">
                    <div class="availability-tile-header">
                        <div class="ava-tile-header-title">
                            <h2>{{ $t("header.addProject") }}t</h2>
                            <div class="availability-tile-underscore"></div>
                        </div>
                        <!-- <button class="ava-button ava-button-add" @click="showAddProjectDialog = true"> Dodaj projekt </button> -->
                    </div>
                    <div class="availability-tile-content">
                        <div id="add-project-dialog">
                            <div class="ava-add-1"> 
                                <div class="ava-div-select">
                                    <label class="ava-select-label">{{ $t("label.employee") }}</label>
                                    <select class="ava-select" @change="setProjectsToCheck(newProjectForUser.userId)" v-model="newProjectForUser.userId">
                                        <option v-for="user in usersList" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
                                    </select>
                                </div>
                                <div class="ava-div-select">
                                    <label class="ava-select-label">{{ $t("label.contractor") }}</label>
                                    <select class="ava-select" @change="removeSelectedProject" v-model="newProjectForUser.contractorId">
                                        <option v-for="contractor in contractorsList" :key="contractor.id" :value="contractor.id"> {{ contractor.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="ava-add-2">
                                <div class="ava-div-select">
                                    <label class="ava-select-label">{{ $t("label.project") }}</label>
                                    <select id="ava-select-add-project" class="ava-select" @change="validateNewProject" v-model="newProjectForUser.projectId">
                                        <option v-for="project in filteredProjects" :key="project.id" :value="project.id"> {{ project.name }}</option>
                                    </select>
                                    <p class="ava-error" v-if="projectExist">{{ $t("message.projectExistError") }}</p>
                                </div>
                                <div class="ava-div-input">
                                    <label class="ava-input-label">{{ $t("label.engag") }}</label>
                                    <input class="ava-input-range-perc" v-model="newProjectForUser.engag" @input="validateNewEngag(newProjectForUser.engag)" type="number" min="0" max="100" /><span class="ava-perc-span">%</span>
                                </div>
                            </div>
                            <div class="ava-add-3">
                                <div class="ava-div-input">
                                    <label class="ava-input-label">{{ $t("label.dates") }}</label>
                                    <v-date-picker class="ava-input-range-wide" @input="validateNewProject" popoverDirection="top" is-expanded mode="range" v-model="newProjectForUser.dates">
                                        <input class="ava-input-range-wide" value="newProjectForUser.dates" />
                                    </v-date-picker>
                                </div>
                                <div class="ava-div-buttons">
                                    <button class="ava-button" @click="onCancelCreate">{{ $t("button.cancel") }}</button>
                                    <button class="ava-button" :disabled="disableSaveNewProject" @click="addNewProjectForUser">{{ $t("button.addProject") }}</button>
                                    <p v-if="addingError">{{ $t("message.addProjectError") }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
import Menu from '../Menu.vue'

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
            projectToEdit: {},
            newProjectForUser: {
                userId: null,
                projectId: null,
                contractorId: null,
                engag: null
            }
        }
    },
    components: {
        'app-menu': Menu
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
            userProjectsToCheckList: 'userProjectsToCheckList',
            addingError: "getAddingError",
            removeError: "getRemoveError",
            editError: "getEditError"

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
                    label: t.projName + ' (' + t.engag + '%)' 
                },
                customData: t
            }))
        },
        themeStyles() {
            return {
                dayCell: {
                    backgroundColor: '#cff09e',
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
            this.$store.commit('SET_USER_ID', userId)
            this.$store.dispatch('getUserProjects', userId)
            this.projectToEdit = {}
        },
        setProjectsToCheck(userId) {
            this.$store.commit('SET_USER_ID_FOR_NEW_PROJ', userId)
            this.removeNewProjectData(userId)     
            this.$store.dispatch('getUserProjectsToCheck', userId)   
        },
        addNewProjectForUser() {
            this.$store.dispatch('addUserProject', this.newProjectForUser)
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
            this.projectToEdit = {}
        },
        onCancelCreate() {
            this.newProjectForUser = {}
            this.$store.commit('SET_PROJECT_EXIST',false)
            this.$store.commit('SET_DISABLE_SAVE_NEW',true)
        },
        editProjectForUser() {
            this.projectToEdit.userId = this.selectedUser.id
            this.$store.dispatch('editUserProject', this.projectToEdit)
            this.projectToEdit = {}
        },
        removeUserProject() {
            const data = {
                projectId: this.projectToEdit.id,
                userId: this.selectedUser.id
            }
            this.$store.dispatch('removeUserProject', data)

            // if (this.newProjectForUser.userId === this.selectedUser.id){
            //         this.$store.dispatch('getUserProjectsToCheck', this.newProjectForUser.userId)  
            //     }
            this.projectToEdit = {}
        },
        validateNewEngag(engag) {
            if (engag < 0) this.newProjectForUser.engag = null;
            if (engag > 100) this.newProjectForUser.engag = 100;
            this.validateNewProject()
        },
        removeNewProjectData(userId){
            this.newProjectForUser = {
                userId: userId,
                projectId: null,
                contractorId: null,
                engag: null
            }
            this.$store.commit('SET_PROJECT_EXIST',false)
            this.$store.commit('SET_DISABLE_SAVE_NEW',true)
        },
        removeSelectedProject(){
            const userId = this.newProjectForUser.userId,
                  contractorId = this.newProjectForUser.contractorId
            
            this.newProjectForUser = {
                userId: userId,
                projectId: null,
                contractorId: contractorId,
                engag: null
            }
            this.$store.commit('SET_PROJECT_EXIST',false)
            this.$store.commit('SET_DISABLE_SAVE_NEW',true)
        },
        validateNewProject() {
           const currProjects = this.userProjectsToCheckList,
                projectId = this.newProjectForUser.projectId
             if (currProjects.length != 0) {
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
            }else {
                this.$store.commit('SET_PROJECT_EXIST',false)
                this.$store.dispatch('validateNewProject', this.newProjectForUser)
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
