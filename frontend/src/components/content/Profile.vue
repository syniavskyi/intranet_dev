<template>
<div class="plane-profile">
    <div class="profile-nav-and-content">
        <app-menu></app-menu>
        <div class="profile-content">
            <div class="profile-header">
                <div class="profile-header-title-and-menu">
                    <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="profile-header-menu">
                    <p class="profile-header-title">{{ $t("header.profile") }}</p>
                </div>
                <button class="profile-header-button" v-if="!editMode" @click="onEdit">{{ $t("button.editData") }}</button>
                <div v-if="editMode" class="header-button-save-reject">
                    <p class="profile-error profile-error-data" v-if="!saveChangesSuccess">{{ $t("message.saveChangesError") }}</p>
                    <button class="border-btn save-btn" @click="onSaveChanges" :disabled="disableSaveBtn">{{ $t("button.saveChanges") }}</button>
                    <button class="border-btn reject-btn" @click="onCancelEdit">{{ $t("button.cancel") }}</button>
                </div>
            </div>

            <h3 class="user-header-name">{{userData.firstName}} {{userData.lastName}}</h3>
            <div class="profile-tiles">
                <div class="profile-tile">
                    <!-- container for section -->
                    <div class="profile-tile-header">
                        <h2>{{ $t("header.contact") }}</h2>
                        <div class="tile-underscore"></div>
                    </div>
                    <div class="profile-tile-content">
                        <div class="profile-tile-inputs-section profile-inputs-sections-1">
                            <div class="profile-tile-inputs">
                                <div>
                                    <label class="label-profile">{{ $t("label.address") }}</label>
                                    <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.address">
                                </div>
                                <div>
                                    <label class="label-profile">{{ $t("label.email") }}</label>
                                    <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.email" @blur="$v.userData.email.$touch()">
                                    <div class="error-wrapper">
                                        <p class="profile-error profile-error-email" v-if="$v.userData.email.$invalid">{{ $t("message.emailValidation") }}</p>
                                    </div>
                                </div>
                                <div>
                                    <label class="label-profile">{{ $t("label.phone") }}</label>
                                    <input class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.phone" @input="phoneValidation">
                                    <div class="error-wrapper">
                                        <p class="profile-error profile-error-phone" v-if="invalidPhone">{{ $t("message.phoneValidation") }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-tile-inputs">
                                <div>
                                    <label class="label-profile">{{ $t("label.skype") }}</label>
                                    <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.skype">
                                </div>
                                <div>
                                    <label class="label-profile">{{ $t("label.slack") }}</label>
                                    <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.slack">
                                </div>
                            </div>
                        </div>
                        <div class="profile-user-header">
                            <div class="profile-user-img">
                                <img class="img-user-class" :src="userData.image" width="150px">
                                <p class="profile-error profile-error-image" v-if="photoUploadError">{{ $t("message.photoUploadError") }}</p>
                                <label for="change-user-image" class="change-user-img">{{ $t("button.changePhoto") }}
                                    <input accept="image/*" style="width: 1rem;" type="file" ref="photo" @change="handlePhotoUpload" id="change-user-image">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-tile">
                    <div class="profile-tile-header">
                        <div class="profile-tile-header-row">
                            <h2>{{ $t("header.employee") }}</h2>
                            <button class="profile-change-password">zmień hasło</button>
                        </div>
                        <div class="tile-underscore"></div>
                    </div>
                    <div class="profile-tile-content">
                        <div class="profile-tile-inputs-section">
                            <div class="profile-tile-inputs">
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.department") }}</label>
                                    <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.branch">
                                </div>
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.branch") }}</label>
                                    <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.section">
                                </div>
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.position") }}</label>
                                    <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.position">
                                </div>
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.project") }}</label>
                                    <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.currentProject">
                                </div>
                            </div>
                            <div class="profile-tile-inputs">
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.worktime") }}</label>
                                    <select v-model="userData.state" @change="checkFormFields" class="selectProfile" :class="editMode ? 'selectEdit' : 'selectDisabled'" :disabled="!editMode">
                                                <option value="Full">{{ $t("label.fulltime") }}</option>
                                                <option value="1/2">1/2</option>
                                                <option value="1/3">1/3</option>
                                                <option value="2/3">2/3</option>
                                                <option value="1/4">1/4</option>
                                                <option value="3/4">3/4</option>
                                                <option value="1/5">1/5</option>
                                                <option value="2/5">2/5</option>
                                                <option value="3/5">3/5</option>
                                                <option value="4/5">4/5</option>
                                            </select>
                                    <!-- <input  value="Pełny" class="inputDisabled inputProfile" :disabled="true" v-model="userData.worktime"> -->
                                </div>
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.employmentDate") }}</label>
                                    <masked-input mask="11.11.1111" @input="dateValidation" class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.employmentDate" />
                                    <!-- <v-date-picker :max-date="new Date()" v-if="projectEditMode" class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" is-expanded mode="single" v-model="userData.employmentDate">
                                                    <input value="userData.employmentDate" />
                                                </v-date-picker> -->
                                    <div class="error-wrapper">
                                        <p class="profile-error profile-error-date" v-if="invalidDate">{{ $t("message.dateValidation") }}</p>
                                    </div>
                                </div>
                                <div>
                                    <!-- container for single label + input/p -->
                                    <label class="label-profile">{{ $t("label.workExperience") }}</label>
                                    <input class="inputDisabled inputProfile" :disabld="true" v-model="userData.seniority">
                                </div>
                            </div>
                        </div>
                        <div class="side-content">
                            <p class="cv-title">{{ $t("label.cv") }}</p>
                            <div class="cv-buttons">
                                <div class="button-cv">
                                    <a>
                                        <span class="button-circle lang-circle">PL</span>
                                    </a>
                                    <div class="add-download">
                                        <p class="profile-error profile-error-upload-top" v-if="fileUploadError">{{ $t("message.fileUploadError") }}</p>
                                        <label class="add" for="add-docx-pl">+
                                            <input accept=".doc,.docx" id="add-docx-pl" type="file" class="add doc-add-pl" ref="file" @change="handleCvUpload">
                                        </label>

                                        <div class="docx">.docx</div>
                                        <a :href="userData.cv" class="download doc-download-pl">&#x21e3;</a>
                                    </div>
                                    <div class="add-download">
                                        <p v-show="false" class="profile-error profile-error-upload-bottom">{{ $t("message.fileUploadError") }}</p>
                                        <label for="add-pdf-pl" class="add">+
                                            <input id="add-pdf-pl" accept=".pdf" class="add pdf-add-pl" type="file">
                                        </label>

                                        <div class="pdf">.pdf</div>
                                        <a class="download pdf-add-pl">&#x21e3;</a>
                                    </div>
                                </div>
                                <div class="button-cv">
                                    <a>
                                        <span class="button-circle lang-circle">EN</span></a>
                                    <div class="add-download">
                                        <p v-show="false" class="profile-error profile-error-upload-top">{{ $t("message.fileUploadError") }}</p>
                                        <label class="add" for="add-docx-en">+
                                            <input accept=".doc,.docx" id="add-docx-en" class="add" type="file">
                                        </label>

                                        <div class="docx">.docx</div>
                                        <a class="download">&#x21e3;</a>
                                    </div>
                                    <div class="add-download">
                                        <p v-show="false" class="profile-error profile-error-upload-bottom">{{ $t("message.fileUploadError") }}</p>
                                        <label class="add" for="add-pdf-en">+
                                            <input id="add-pdf-en" accept=".pdf" class="add" type=file>
                                        </label>
                                        <div class="pdf">.pdf</div>
                                        <a class="download">&#x21e3;</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-tile">
                    <div class="profile-tile-header">
                        <div class="profile-tile-header-row">
                            <h2>{{ $t("header.experience") }}</h2>
                            <button class="profile-change-password" @click="editProjects" v-if="!projectEditMode">{{ $t("button.editProjects") }}</button>
                            <button class="profile-change-password" v-if="projectEditMode" @click="addRow">{{ $t("button.addProject") }}</button>
                            <button class="profile-change-password" v-if="projectEditMode" @click="finishEditing">{{ $t("button.finishEdit") }}</button>
                        </div>
                        <div class="tile-underscore"></div>
                    </div>
                    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
                    <div class="profile-tile-content" style="height: 500px">
                        <p class="profile-error" name="error" v-if="showProjectError">Wprowadzone dane w projekcie {{ errorProjectNo }} są niekompletne. Uzupełnij wszystkie pola. </p>
                         <p class="profile-error" name="error" v-if="invalidDates">W projekcie {{invalidDatePos}} data rozpoczęcia nie może być późniejsza niż data zakończenia </p>
                        <div class="profile-table-wrapper">
                            <div class="profile-table">
                                <div class="prof-thead">
                                    <div class="prof-thead-item">{{ $t("table.projectName") }}</div> 
                                    <div class="prof-thead-item">{{ $t("table.contractor") }}</div>
                                    <div class="prof-thead-item">{{ $t("table.duration") }}</div>
                                    <div class="prof-thead-item">{{ $t("table.Industry") }}</div>
                                    <div class="prof-thead-item">{{ $t("table.Modules") }}</div>
                                    <div class="prof-thead-item">{{ $t("table.Descr") }}</div>
                                    <div class="prof-thead-item">---</div>
                                </div>
                                <div class="prof-tbody">
                                  <div class="prof-tbody-row"  v-for="(exp, index) in experience" :key="index">
                                        <div class="prof-tbody-item">
                                            <div class="prof-tbody-item-title">{{ $t("table.projectName") }} </div>
                                            <div class="prof-tbody-item-txt"> 
                                                <input class="profile-table-input" v-model="experience[index].project" /> 
                                            </div>
                                        </div>
                                        <div class="prof-tbody-item">
                                            <div class="prof-tbody-item-title"> {{ $t("table.contractor") }}</div>
                                            <div class="prof-tbody-item-txt"> 
                                                <select class="profile-table-select profile-table-select-contractor" v-model="experience[index].contractor"> 
                                                    <option v-for="contractor in contractorsList" :key="contractor.id" :value="contractor.id"> {{ contractor.name }}</option>
                                                </select> 
                                            </div>
                                        </div>
                                        <div class="prof-tbody-item">
                                            <div class="prof-tbody-item-title">{{ $t("table.duration") }} </div>
                                            <div class="prof-tbody-item-txt">
                                                <p class="table-p">Rozpoczęcie</p>
                                                 <p v-if="!projectEditMode"> {{ formatDate(experience[index].startDate) }} </p>
                                                <v-date-picker popoverDirection="top" class="profile-table-date-picker" is-expanded mode="single" v-model="experience[index].startDate">
                                                    <input value="experience[index].startDate" />
                                                </v-date-picker>
                                                <p class="table-p">Zakończenie</p>
                                                <v-date-picker :id="index" popoverDirection="top" class="profile-table-date-picker" is-expanded mode="single" v-model="experience[index].endDate">
                                                    <input value="experience[index].endDate" />
                                                </v-date-picker>
                                                <input type="checkbox" @change="disableEndDateInput" id="checkbox" :name="index" v-model="experience[index].isCurrent" />
                                                <label for="checkbox">Obecnie</label> 
                                            </div>
                                        </div>
                                        <div class="prof-tbody-item">
                                            <div class="prof-tbody-item-title">{{ $t("table.Industry") }} </div>
                                            <div class="prof-tbody-item-txt"> 
                                                <select class="profile-table-select profile-table-select-industry" v-model="experience[index].industry"> 
                                                    <option v-for="industry in industryList" :key="industry.id" :value="industry.id"> {{ industry.name }}</option>
                                                </select> 
                                            </div>

                                                
                                                <v-date-picker :max-date="new Date()" v-if="projectEditMode" @input="validateDates(index)" class="profile-table-date-picker" is-expanded mode="single" v-model="experience[index].startDate">
                                                    <input  value="experience[index].startDate" />
                                                </v-date-picker>
                                                <p class="table-p">Zakończenie</p>
                                                <div name="endDateDiv" :id="index">
                                                <p v-if="!projectEditMode"> {{ formatDate(experience[index].endDate) }} </p>
                                                <v-date-picker :max-date="new Date()" v-if="projectEditMode" @input="validateDates(index)" class="profile-table-date-picker" is-expanded mode="single" v-model="experience[index].endDate">
                                                    <input value="experience[index].endDate" />
                                                </v-date-picker>
                                                </div>
                                                <input  :disabled="!projectEditMode" type="checkbox" @change="disableEndDateInput" id="checkbox" :name="index" v-model="experience[index].isCurrent" />
                                                <label for="checkbox">Obecnie</label>
                                            </div>
                                        </div>
                                        <div class="emp-tbody-row">
                                            <div class="emp-tbody-item-title">{{ $t("table.Industry") }} </div>
                                            <div> <select :disabled="!projectEditMode" class="profile-table-select profile-table-select-industry" v-model="experience[index].industry"> 
                                                <option v-for="industry in industryList" :key="industry.id" :value="industry.id"> {{ industry.name }}</option>
                                            </select> </div>

                                                <select class="profile-table-select profile-table-select-modules" @change="addModule" :id="index"> 
                                                    <option v-for="sapModule in modulesList" :key="sapModule.id" :value="sapModule.id"> {{ sapModule.name }}</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div class="prof-tbody-item">
                                            <div class="prof-tbody-item-title">{{ $t("table.projectName") }} </div>
                                            <div class="prof-tbody-item-txt"> 
                                                <textarea class="profile-table-textarea" v-model="experience[index].descr" /> 
                                            </div>
                                        </div>
                                        <div class="prof-tbody-item">
                                            <div class="prof-tbody-item-title">{{ $t("table.projectName") }} </div>
                                            <div class="prof-tbody-item-txt"> 
                                                <button class="profile-table-delete-btn" @click="removeRow(index)">X</button>
                                                <button class="profile-table-save-btn" @click="saveExp(index)">&#x2714;</button>
                                                <p class="profile-error" v-if="showProjectError">Wprowadzone dane są niekompletne. Uzupełnij wszystkie pola. </p>
                                            </div>
                                        </div>
                                    </div>
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
import moment from "moment"
import MaskedInput from 'vue-masked-input'
import {
    required,
    email
} from 'vuelidate/lib/validators'
import {
    mapGetters
} from 'vuex'
import Menu from '../Menu.vue'
export default {
    data() {
        return {
            editMode: false,
            _beforeEditingCache: null,
            file: '',
            photo: '',
            hasDataChanged: false,
            showNoChangesAlert: false,
            invalidPhone: false,
            invalidDate: false,
            disableSaveBtn: true,
            showEndInput: true,
            projectEditMode: false,
            invalidDates:false,
            invalidDatePos: null
            
        }
    },
    validations: {
        userData: {
            email: {
                required,
                email
            }
        }
    },
    components: {
        MaskedInput,
        'app-menu': Menu
    },
    beforeCreate() {
        if (this.$store.getters.isDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
        }
    },
    computed: {
        ...mapGetters({
            userData: 'userData',
            saveChangesSuccess: 'isSaveChangesSuccess',
            photoUploadError: 'isSavePhotoError',
            fileUploadError: 'isFileUploadError',
            contractorsList: 'contractorsList',
            industryList: "getIndustryList",
            modulesList: "getModulesList",
            experience: "getExperienceList",
            showProjectError: 'getShowProjectError',
            ifModuleExist: 'getModuleExist',
            errorProjectNo: 'getErrorProjectNo',
            beforeEditingProjects: 'getBeforeEditingProjects'
        })
    },
    methods: {
        onEdit() {
            this.showNoChangesAlert = false
            this.editMode = !this.editMode
            this._beforeEditingCache = Object.assign({}, this.userData)
        },
        onCancelEdit() {
            Object.assign(this.userData, this._beforeEditingCache)
            this._beforeEditingCache = null
            this.showNoChangesAlert = false
            this.editMode = !this.editMode
        },
        onSaveChanges() {
            this.showNoChangesAlert = false
            this.checkIfDataChanged()
            if (this.hasDataChanged === false) {
                this.showNoChangesAlert = true
            } else {
                this.$store.dispatch('saveContactData', this.userData)
                this.$store.dispatch('saveUserData', this.userData)
                this.editMode = !this.editMode
            }
            this.disableSaveBtn = true
        },
        checkIfDataChanged() {
            let currentData = Object.assign({}, this.userData)

            var currDataProps = Object.getOwnPropertyNames(currentData)
            var beforeDataProps = Object.getOwnPropertyNames(this._beforeEditingCache)

            for (var i = 0; i < beforeDataProps.length; i++) {
                var propName = beforeDataProps[i];
                if (currentData[propName] !== this._beforeEditingCache[propName]) {
                    this.hasDataChanged = true
                    return
                } else {
                    this.hasDataChanged = false
                }
            }
        },
        handlePhotoUpload() {
            this.photo = this.$refs.photo.files[0];
            this.disableSubmit = false
            let data = {
                file: this.photo,
                id: localStorage.getItem('id')
            }
            this.$store.dispatch('submitPhoto', data)
        },
        handleCvUpload() {
            this.file = this.$refs.file.files[0];
            let data = {
                file: this.file,
                id: localStorage.getItem('id')
            }
            this.$store.dispatch('submitCv', data)
        },
        phoneValidation(value) {
            const regex = new RegExp("^(?=.*[0-9])[- +()0-9]+$")
            if (regex.test(value.target.value)) {
                this.invalidPhone = false
            } else {
                this.invalidPhone = true
            }
            this.checkFormFields()
        },
        dateValidation(value) {
            const day = parseInt(value.slice(0, 2)),
                month = parseInt(value.slice(3, 5))

            if (day > 31 || month > 12) {
                this.invalidDate = true
                this.disableSaveBtn = true
            } else {
                this.invalidDate = false
            }
            this.checkFormFields()
        },
        checkFormFields() {
            if (this.invalidPhone || this.invalidDate || this.$v.userData.email.$invalid) {
                this.disableSaveBtn = true
            } else {
                this.checkIfDataChanged()
                if (this.hasDataChanged === true) {
                    this.disableSaveBtn = false
                } else {
                    this.disableSaveBtn = true
                }
            }
        },
        addRow() {
            this.$store.dispatch('addExpRow')
        },
        removeRow(index) {
            this.$store.dispatch('removeExpRow', index)
         },
        saveExp(index) {
            this.$store.dispatch('saveExpPosition', index)
        },
        addModule(value) {
            const data = {
                index: value.target.id,
                moduleId: value.target.value
            }
            this.$store.dispatch('addModule', data)
        },
        removeModule(value) {
            const data = {
                index: value.target.name,
                moduleId: value.target.value
            }
            this.$store.dispatch('removeModule', data)
        },
        disableEndDateInput(value) {
            const isCurrent = value.target.checked,
                index = value.target.name,
                input = document.getElementById(index)

            if (isCurrent){
                input.setAttribute("style", "opacity: 0")
                this.experience[index].endDate = null
            } else {
                input.setAttribute("style", "opacity: 1")
            }
        },
        finishEditing() {
            this.$store.commit('SET_PROJECT_ERROR', false)
            this.$store.commit('SET_EXP_LIST', this.beforeEditingProjects)
            this.projectEditMode = false
        },
        editProjects() {
            this.projectEditMode = true
            const beforeEditingCache = this.experience
           this.$store.commit('SET_BEFORE_EDITING_PROJECTS', beforeEditingCache)
        },
        formatDate(date) {
            if (date !== null && date !== undefined) {
                return moment(date).format('DD.MM.YYYY')
            } else {
                return "-"
            }
        },
        validateDates(index) {
            const startDate = this.experience[index].startDate,
                  endDate = this.experience[index].endDate,
                  isCurrent = this.experience[index].isCurrent 

            if (endDate && startDate && isCurrent === false) {
                const formatStartDate = moment(startDate).format('YYYY-MM-DD'),
                    formatEndDate = moment(endDate).format('YYYY-MM-DD')
            if (formatStartDate > formatEndDate) {
                this.invalidDates = true
                this.invalidDatePos = index + 1 
            } else {
                this.invalidDates = false
                this.invalidDatePos = null
            }
            }
        }
    }
}
</script>

<style>
.input {
    text-align: center;
}

.inputEdit {
    text-align: center;
}

.inputDisabled {
    text-align: center;
}

table {
    width: 95%;
    border-spacing: 0;
}

thead {
    width: 6rem;
    background-color: rgb(236, 236, 236);
}

thead td:first-child {
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
}

thead td:last-child {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

thead,
tbody {
    /* border: 1px solid rgb(230, 230, 230); */
    border-collapse: collapse;
    /* border-radius: 2px; */
}

tbody tr:nth-of-type(even) {
    background-color: rgb(236, 236, 236);
    border-radius: 1rem;
}

tr:nth-of-type(even) td:first-child {
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
}

tr:nth-of-type(even) td:last-child {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

thead td,
tbody td {
    /* border-bottom: 1px solid rgb(230, 230, 230); */
    text-align: center;
}

.table-p {
    padding: 0;
    margin: 0;
}

tbody td {
    /* border-right: 1px solid rgb(230, 230, 230); */
}

thead td:last-child,
tbody td:last-child {
    border-bottom: 0;
}

tbody td {
    width: 12rem;
    max-width: 12rem;
}

tbody,
tbody td {
    animation: slide-down 0.5s ease;
}

@keyframes slide-down {
    100% {
        transform: translateY(0rem);
        opacity: 1;
    }
    0% {
        transform: translateY(-8rem);
        opacity: 0;
    }
}

td textarea {
    max-height: 100%;
    max-width: 11rem;
}

@media (max-width: 82rem) {
    table {
        display: flex;
        position: relative;
        /* width: 19.5rem; */
        /* max-width: 19.5rem; */
        width: 90%;
        overflow-x: hidden;
    }
    th,
    tr,
    td {
        display: block;
    }
    thead {
        display: block;
        float: left;
    }
    thead tr {
        display: block;
    }
    thead td {
        height: 3rem;
        text-align: center;
        line-height: 1rem;
        vertical-align: middle;
    }
    tbody {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        min-width: 18rem;
        /* max-width: 15rem; */
    }
    tbody td {
        height: 3rem;
    }
    tbody tr {
        display: inline-block;
    }
    thead td:nth-child(3) {
        height: 9rem;
    }
    tbody td:nth-child(3) {
        height: 9rem;
    }
    thead td:nth-child(5) {
        height: 4rem;
    }
    .profile-table-td-module {
        /* height: 4rem; */
    }
}
</style>
