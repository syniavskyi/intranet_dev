<template>
                   <!-- for adding new project -->
                    <div class="availability-tile ava-tile-2">
                        <div class="availability-tile-header">
                            <div class="ava-tile-header-title">
                                <h2>{{ $t("header.addProject") }}</h2>
                                <div class="availability-tile-underscore"></div>
                            </div>
                            <!-- <button class="ava-button ava-button-add" @click="showAddProjectDialog = true"> Dodaj projekt </button> -->
                        </div>
                        <div class="availability-tile-content">
                            <div id="add-project-dialog">
                                <div class="ava-add-1">
                                    <div class="ava-div-select-cool">
                                        <select required class="ava-select-cool" @change="removeSelectedProject" v-model="newProjectForUser.contractorId">
                                            <option v-for="contractor in contractorsList" :key="contractor.ContractorId" :value="contractor.ContractorId"> {{ contractor.ContractorName }}</option>
                                        </select>
                                        <label class="ava-select-label-cool">{{ $t("label.contractor") }}</label>
                                    </div>
                                </div>
                                <div class="ava-add-2">
                                    <div class="ava-div-input-cool">
                                        <select required class="ava-select-cool" @change="validateNewProject" v-model="newProjectForUser.projectId">
                                            <option v-for="project in filteredProjects" :key="project.ProjectId" :value="project.ProjectId"> {{ project.ProjectName }}</option>
                                        </select>
                                        <label class="ava-select-label-cool">{{ $t("label.project") }}</label>
                                    </div>
                                    <div class="ava-div-input-cool">
                                        <input required class="ava-input-range-perc" v-model="newProjectForUser.engag" @input="validateNewEngag(newProjectForUser.engag)" type="number" min="0" max="100" /><span class="ava-perc-span">%</span>
                                        <span class="ava-div-bar"></span>
                                        <label class="ava-input-label-cool">{{ $t("label.engag") }}</label>
                                    </div>

                                </div>
                                <div class="ava-add-3">
                                    <div class="ava-div-select-cool">
                                        <v-date-picker required class="ava-input-range-wide" @input="validateNewProject" popoverDirection="top" is-expanded mode="range" v-model="newProjectForUser.dates">
                                            <input class="ava-input-range-wide" value="newProjectForUser.dates" />
                                        </v-date-picker>
                                        <label class="ava-input-label-cool">{{ $t("label.dates") }}</label>
                                    </div>
                                    <div class="ava-div-input-cool">
                                        <textarea class="ava-textarea" required maxlength="50" @change="validateNewProject" v-model="newProjectForUser.notes" />
                                        <label class="ava-select-label-cool">Uwagi</label>
                                    </div>
                                    <div class="ava-div-buttons">
                                        <button class="ava-button" @click="onCancelCreate">{{ $t("button.cancel") }}</button>
                                        <button class="ava-button ava-button-edit" :disabled="disableSaveNewProject" @click="addNewProjectForUser">{{ $t("button.addProject") }}</button>
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
            newProjectForUser: 'getNewProjectForUser',
            disableSaveNewProject: 'getDisableSaveNewProject',
            projectsList: 'projectsList',
            contractorsList: 'contractorsList'
        }),
        filteredProjects() {
            const projectsList = this.projectsList
            let filteredProjects = []

            for (let i = 0; i < projectsList.length; i++) {
                if (projectsList[i].ContractorId === this.newProjectForUser.contractorId) {
                    filteredProjects.push(projectsList[i])
                }
            }
            return filteredProjects
        },
    },
    methods: {
        ...mapActions({
            addNewProjectForUser: 'addUserProject',
            validateNewProject: 'validateNewProject'
        }),
        removeSelectedProject() {
            const userId = this.newProjectForUser.userId,
                contractorId = this.newProjectForUser.contractorId,
                newProjectForUser = {
                    userId: userId,
                    projectId: null,
                    contractorId: contractorId,
                    engag: null,
                    notes: null,
                    statusId: null
                }

            this.$store.commit('SET_NEW_PROJECT_FOR_USER', newProjectForUser)
        },
        onCancelCreate() {
            this.$store.commit('SET_DISABLE_SAVE_NEW', true)
            this.$store.commit('SET_NEW_PROJECT_FOR USER', {})
        },
    }
};
</script>

