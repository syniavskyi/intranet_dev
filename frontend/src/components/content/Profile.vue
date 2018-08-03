<template>
<div class="plane-profile">
    <div class="profile-nav-and-content">
        <app-menu></app-menu>
        <!-- <leave-page-dialog v-if="showLeavePageDialog" @action-selected="leavePage" @close="showLeavePageDialog = false"></leave-page-dialog> -->
        <div class="profile-content">
            <div class="profile-header">
                <div class="profile-header-title-and-menu">
                    <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="profile-header-menu">
                    <p class="profile-header-title">{{ $t("header.profile") }}</p>
                </div>
                <div v-if="!editMode" class="prof-input-lang"> 
                    <select required class="selectLang">
                        <option>PL</option>
                        <option>EN</option>
                        <option>DE</option>
                        <option>RU</option>
                    </select>
                    <label class="label-select-lang">język</label>
                </div>
                <button class="profile-header-button" v-if="!editMode" @click="onEdit">{{ $t("button.editData") }}</button>
                <div v-if="editMode" class="header-button-save-reject">
                    <p class="profile-error profile-error-data" v-if="!saveChangesSuccess">{{ $t("message.saveChangesError") }}</p>
                    <button class="border-btn save-btn" @click="onSaveChanges" :disabled="disableSaveBtn">{{ $t("button.saveChanges") }}</button>
                    <button class="border-btn reject-btn" @click="onCancelEdit">{{ $t("button.cancel") }}</button>
                </div>
            </div>

            <h3 class="prof-user-header-name">{{userData.Fullname}}</h3>
            <div class="profile-tiles">
            <div class="profile-tiles-row-wrap">
                <div class="profile-tiles-row">
                    <div class="profile-tile-1-3">
                        <div class="profile-tile-header">
                            <h2 class="prof-tile-h2">{{ $t("header.contact") }}</h2>
                            <div class="tile-underscore"></div>
                        </div>
                        <div class="profile-tile-content">
                            <!-- <div class="profile-tile-inputs-section profile-inputs-sections-1"> -->
                                <div class="profile-tile-inputs">
                                    <div class="prof-input">
                                        <!-- <input required v-if="editMode" class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.address"> -->
                                        <input required v-if="editMode" @input="checkFormFields" class="inputProfile inputEdit" v-model="userData.address">
                                        <input v-if="!editMode" disabled class="inputProfile inputDisabled" v-model="userData.address">
                                        <span class="prof-div-bar"></span>
                                        <label class="label-profile">{{ $t("label.address") }}</label>
                                    </div>
                                    <div class="prof-input">
                                        <!-- <input required class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.email" @blur="$v.userData.email.$touch()"> -->
                                        <input required v-if="editMode" class="inputEdit inputProfile" @input="checkFormFields"  v-model="userData.Email" @blur="$v.userData.Email.$touch()">
                                        <input v-if="!editMode" disabled type="text" class="inputDisabled inputProfile " v-model="userData.Email">
                                        <span class="prof-div-bar"></span>
                                        <label class="label-profile">{{ $t("label.email") }}</label>
                                        <!-- <div class="error-wrapper">
                                            <p class="profile-error profile-error-email" v-if="$v.userData.email.$invalid">{{ $t("message.emailValidation") }}</p>
                                        </div> -->
                                        <p class="prof-error" v-if="$v.userData.Email.$invalid">{{ $t("message.emailValidation") }}</p>
                                    </div>
                                    <div class="prof-input">
                                        <!-- <input class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.phone" @input="phoneValidation"> -->
                                        <input required v-if="editMode" class="inputEdit inputProfile" v-model="userData.Telephone" @input="phoneValidation">
                                        <input v-if="!editMode" disabled class="inputDisabled inputProfile" v-model="userData.Telephone">
                                        <span class="prof-div-bar"></span>
                                        <label class="label-profile">{{ $t("label.phone") }}</label>
                                        <!-- <div class="error-wrapper">
                                            <p class="profile-error profile-error-phone" v-if="invalidPhone">{{ $t("message.phoneValidation") }}</p>
                                        </div> -->
                                        <p class="prof-error" v-if="invalidPhone">{{ $t("message.phoneValidation") }}</p>
                                    </div>
                                </div>
                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="profile-tile-1-3">
                        <div class="profile-tile-header">
                            <h2 class="prof-tile-h2">Komunikatory</h2>
                            <div class="tile-underscore"></div>
                        </div>
                        <div class="profile-tile-content">
                            <div class="profile-tile-inputs">
                                <div class="prof-input-m">
                                    <!-- <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.skype"> -->
                                    <input required v-if="editMode" class="inputProfile inputEdit" @input="checkFormFields" v-model="userData.SkypeId">
                                    <input v-if="!editMode" disabled class="inputProfile inputDisabled" v-model="userData.SkypeId">
                                    <span class="prof-div-bar"></span>
                                    <label class="label-profile">{{ $t("label.skype") }}</label>
                                    <img class="prof-comm-img" src="../../assets/images/comm/grey/skype.png"/>
                                </div>
                                <div class="prof-input-m">
                                    <!-- <input class="inputProfile" @input="checkFormFields" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.slack"> -->
                                    <input required v-if="editMode" class="inputProfile inputEdit" @input="checkFormFields" v-model="userData.SlackId">
                                    <input disabled v-if="!editMode" class="inputProfile inputDisabled" v-model="userData.SlackId">
                                    <span class="prof-div-bar"></span>
                                    <label class="label-profile">{{ $t("label.slack") }}</label>
                                    <img class="prof-comm-img" src="../../assets/images/comm/grey/slack.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-tile-1-3-emp">
                        <div class="profile-tile-header">
                            <!-- <div class="tile-underscore"></div> -->
                        </div>
                        <div class="profile-tile-content">
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
                </div>
                <div class="profile-tiles-row">
                    <div class="profile-tile-1-2">
                        <div class="profile-tile-header">
                            <div class="profile-tile-header-row">
                                <h2 class="prof-tile-h2">{{ $t("header.employee") }}</h2>
                                <button class="profile-change-password">zmień hasło</button>
                            </div>
                            <div class="tile-underscore"></div>
                        </div>
                        <div class="profile-tile-content">
                            <div class="profile-tile-inputs-section">
                                <div class="profile-tile-inputs">
                                    <div class="prof-input-s">
                                        <!-- <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.branch"> -->
                                        <input disabled class="inputDisabled inputProfile" v-model="userData.DepartmentName">
                                        <label class="label-profile">{{ $t("label.department") }}</label>
                                    </div>
                                    <div class="prof-input-s">
                                        <!-- <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.section"> -->
                                        <input disabled class="inputProfile inputDisabled" v-model="userData.SectionName">
                                        <label class="label-profile">{{ $t("label.branch") }}</label>
                                    </div>
                                    <div class="prof-input-s">
                                        <!-- <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.position"> -->
                                        <input disabled class="inputProfile inputDisabled" v-model="userData.JobPosition">
                                        <label class="label-profile">{{ $t("label.position") }}</label>
                                    </div>
                                    <div class="prof-input-s">
                                        <input v-if="editMode" required class="inputProfile inputEdit" @input="checkFormFields" v-model="userData.CurrentProject">
                                        <input disabled v-if="!editMode" class="inputDisabled inputProfile" v-model="userData.CurrentProject">
                                        <span class="prof-div-bar"></span>
                                        <label class="label-profile">{{ $t("label.project") }}</label>
                                    </div>
                                </div>
                                <div class="profile-tile-inputs">
                                    <div class="prof-input-s">
                                        <!-- <select v-model="userData.state" @change="checkFormFields" class="selectProfile" :class="editMode ? 'selectEdit' : 'selectDisabled'" :disabled="!editMode"> -->
                                        <select required v-if="editMode" v-model="userData.WorkTime" @change="checkFormFields" class="selectProfile selectEdit" >
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
                                        <!-- <p v-if="!editMode" class="inputDisabled">{{ userData.state }}</p> -->
                                        <select disabled v-if="!editMode" v-model="userData.WorkTime" @change="checkFormFields" class="selectProfile selectDisabled"></select>
                                        <label class="label-profile">{{ $t("label.worktime") }}</label>
                                    </div>
                                    <div class="prof-input-s">
                                        <!-- <masked-input mask="11.11.1111" @input="dateValidation" class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.employmentDate" /> -->
                                        <masked-input required v-if="editMode" mask="11.11.1111" @input="dateValidation" class="inputProfile inputEdit" v-model="userData.EmploymentDate" />
                                        <!-- <v-date-picker :max-date="new Date()" v-if="projectEditMode" class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" is-expanded mode="single" v-model="userData.employmentDate">
                                                <input value="userData.employmentDate" />
                                            </v-date-picker> -->
                                        <!-- <p v-if="!editMode" class="inputDisabled">{{userData.employmentDate}}</p> -->
                                        <input disabled v-if="!editMode" class="inputProfile inputDisabled" v-model="userData.EmploymentDate">
                                        <span class="prof-div-bar"></span>
                                        <label class="label-profile">{{ $t("label.employmentDate") }}</label>
                                        <!-- <div class="error-wrapper">
                                            <p class="profile-error profile-error-date" v-if="invalidDate">{{ $t("message.dateValidation") }}</p>
                                        </div> -->
                                        <p class="prof-error" v-if="invalidDate">{{ $t("message.dateValidation") }}</p>
                                    </div>
                                    <div class="prof-input-s">
                                        <!-- <input class="inputDisabled inputProfile" :disabled="true" v-model="userData.seniority"> -->
                                        <input required v-if="editMode" :disabled="true" class="inputDisabled inputProfile" v-model="userData.WorkExperience">
                                        <!-- <p v-if="!editMode" class="inputDisabled">{{userData.WorkExperience}}</p> -->
                                        <input disabled class="inputProfile inputDisabled" v-if="!editMode">
                                        <label class="label-profile">{{ $t("label.workExperience") }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-tile-1-2">
                        <div class="profile-tile-header">
                            <div class="profile-tile-header-row">
                                <h2 class="prof-tile-h2">{{ $t("label.cv") }}</h2>
                                <button class="profile-edit-experience-e" @click="showSelectCv = true">Generuj CV</button>
                            </div>
                            <div class="tile-underscore"></div>
                            
                        </div>
                        <div class="profile-tile-content">
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
                                            <span class="button-circle lang-circle">EN</span>
                                        </a>
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
                </div>
                <user-education-component></user-education-component>
                <user-experience-component></user-experience-component>
                <user-projects-component></user-projects-component>
                <select-cv-content v-show="showSelectCv"></select-cv-content>
                <div v-show="showSelectCv" class="modal-overlay"></div>    
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from "moment";
import MaskedInput from "vue-masked-input";

import { required, email } from "vuelidate/lib/validators";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import { mapGetters, mapActions } from "vuex";

import Menu from "../Menu.vue";
import LeavePageDialog from "../dialogs/LeavePageDialog";
import UserProjects from "./profileComponents/UserProjects";
import UserEducation from "./profileComponents/UserEducation";
import UserExperience from "./profileComponents/UserExperience";
import SelectCvContent from "./profileComponents/SelectCvContent";
export default {
  data() {
    return {
      editMode: false,
      _beforeEditingCache: null,
      file: "",
      photo: "",
      hasDataChanged: false,
      showNoChangesAlert: false,
      invalidPhone: false,
      invalidDate: false,
      disableSaveBtn: true,
      showLeavePageDialog: false,
      routeToGo: null,
      showSelectCv: false
    };
  },
  validations: {
    userData: {
      Email: {
        required,
        email
      }
    }
  },
  components: {
    MaskedInput,
    "app-menu": Menu,
    "leave-page-dialog": LeavePageDialog,
    "user-projects-component": UserProjects,
    "user-experience-component": UserExperience,
    "user-education-component": UserEducation,
    "select-cv-content": SelectCvContent
  },
  beforeCreate() {
    if (this.$store.getters.isDataLoaded === false) {
      this.$store.dispatch("loadData");
    }
  },
  computed: {
    ...mapGetters({
      userData: "getUserInfo",
      saveChangesSuccess: "isSaveChangesSuccess",
      photoUploadError: "isSavePhotoError",
      fileUploadError: "isFileUploadError"
    })
  },
  // beforeRouteLeave (to, from , next) {
  // this.showLeavePageDialog = true
  //     this.routeToGo = to.name
  // },
  methods: {
    onEdit() {
      this.showNoChangesAlert = false;
      this.editMode = !this.editMode;
      this._beforeEditingCache = Object.assign({}, this.userData);
    },
    onCancelEdit() {
      Object.assign(this.userData, this._beforeEditingCache);
      this._beforeEditingCache = null;
      this.showNoChangesAlert = false;
      this.editMode = !this.editMode;
    },
    onSaveChanges() {
      this.showNoChangesAlert = false;
      this.checkIfDataChanged();
      if (this.hasDataChanged === false) {
        this.showNoChangesAlert = true;
      } else {
        this.$store.dispatch("saveContactData", this.userData);
        this.$store.dispatch("saveUserData", this.userData);
        this.editMode = !this.editMode;
      }
      this.disableSaveBtn = true;
    },
    checkIfDataChanged() {
      let currentData = Object.assign({}, this.userData),
        currDataProps = Object.getOwnPropertyNames(currentData),
        beforeDataProps = Object.getOwnPropertyNames(this._beforeEditingCache);

      for (let i = 0; i < beforeDataProps.length; i++) {
        let propName = beforeDataProps[i];
        if (currentData[propName] !== this._beforeEditingCache[propName]) {
          this.hasDataChanged = true;
          return;
        } else {
          this.hasDataChanged = false;
        }
      }
    },
    handlePhotoUpload() {
      this.photo = this.$refs.photo.files[0];
      this.disableSubmit = false;
      let data = {
        file: this.photo,
        id: localStorage.getItem("id")
      };
      this.$store.dispatch("submitPhoto", data);
    },
    handleCvUpload() {
      this.file = this.$refs.file.files[0];
      let data = {
        file: this.file,
        id: localStorage.getItem("id")
      };
      this.$store.dispatch("submitCv", data);
    },
    phoneValidation(value) {
      const regex = new RegExp("^(?=.*[0-9])[- +()0-9]+$");
      this.invalidPhone = regex.test(value.target.value) ? false : true;
      this.checkFormFields();
    },
    dateValidation(value) {
      const day = parseInt(value.slice(0, 2)),
        month = parseInt(value.slice(3, 5));

      this.invalidDate = day > 31 || month > 12 ? true : false;
      this.disableSaveBtn = day > 31 || month > 12 ? true : false;

      this.checkFormFields();
    },
    checkFormFields() {
      if (
        this.invalidPhone ||
        this.invalidDate ||
        this.$v.userData.Email.$invalid
      ) {
        this.disableSaveBtn = true;
      } else {
        this.checkIfDataChanged();
        this.disableSaveBtn = this.hasDataChanged === true ? false : true;
      }
    },
    generateCV(){

    }


    // leavePage() {
    //     if (this._beforeEditingProjects){
    //         this.$store.commit('SET_EXP_LIST', this._beforeEditingProjects)
    //     }
    //     if (this._beforeEditingCache) {
    //         Object.assign(this.userData, this._beforeEditingCache)
    //     }
    //     this.$router.push({name: this.routeToGo})
    // }
  }
};
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

.table-p {
  padding: 0;
  margin: 0;
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
</style>
