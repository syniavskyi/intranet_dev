<template>
<div class="plane-profile">
    <div class="profile-nav-and-content">
        <div class="profile-content">
            <div class="profile-header">
                <div class="profile-header-title-and-menu">
                    <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="profile-header-menu">
                    <p class="profile-header-title">{{ $t("header.profile") }}</p>
                </div>
                <button class="profile-header-button" v-if="!editMode" @click="onEdit">{{ $t("button.editData") }}</button>
                <div v-if="editMode" class="header-button-save-reject">
                    <button class="border-btn save-btn" @click="onSaveChanges" :disabled="disableSaveBtn">{{ $t("button.saveChanges") }}</button>
                    <button class="border-btn reject-btn" @click="onCancelEdit">{{ $t("button.cancel") }}</button>
                </div>
            </div>
            <p class="login-error" v-if="showNoChangesAlert">{{ $t("message.noChanges") }}</p>
            <p class="login-error" v-show="!saveChangesSuccess">{{ $t("message.saveChangesError") }}</p>
            <h3 class="user-header-name">{{userData.firstName}} {{userData.lastName}}</h3>
            <div class="profile-tiles">
                <div class="profile-tile">
                    <!-- container for section -->
                    <div class="profile-tile-header">
                        <h2>{{ $t("header.contact") }}</h2>
                        <div class="tile-underscore"></div>
                    </div>
                    <div class="profile-tile-content">
                        <div class="profile-tile-inputs-section">
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
                                <!--                                        <div class="overlay">-->
                                <img class="img-user-class" :src="userData.image" width="100px">
                                
                                <label for="change-user-image" class="change-user-img profile-header-button">{{ $t("button.changePhoto") }}
                                    <input style="width: 1rem;" accept="image/*" type="file" ref="photo" @change="handlePhotoUpload" id="change-user-image">
                                </label>
                                
                               <!--                                        </div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-tile">
                    <div class="profile-tile-header">
                        <h2>{{ $t("header.employee") }}</h2>
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
                                    <select v-model="userData.state" @change="checkFormFields" class="inputProfile" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode">
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
                                    <div class="error-wrapper">
                                        <p class="profile-error profile-error-email" v-if="invalidDate">{{ $t("message.dateValidation") }}</p>
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

                                      
                                        <label class="add" for="add-docx-pl">+
                                            <input accept=".doc,.docx" id="add-docx-pl" type="file" class="add doc-add-pl" ref="file" @change="handleCvUpload">
                                        </label>

                                        <div class="docx">.docx</div>
                                        <a :href="userData.cv" class="download doc-dowload-pl">&#x21e3;</a>
                                    </div>
                                    <div class="add-download">


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


                                        <label class="add" for="add-docx-en">+
                                            <input accept=".doc,.docx" id="add-docx-en" class="add" type="file">
                                        </label>

                                        <div class="docx">.docx</div>
                                        <a href class="download">&#x21e3;</a>
                                    </div>
                                    <div class="add-download">



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
        </div>
    </div>
</div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
import {
    required,
    email
} from 'vuelidate/lib/validators'
import {
    mapGetters
} from 'vuex'
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
            disableSaveBtn: true
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
        MaskedInput
    },
    beforeCreate() {
        if (this.userData === undefined) {
            const token = localStorage.getItem('token')
            this.$store.dispatch('getUsername', token)
        }
    },
    computed: {
        ...mapGetters({
            userData: 'userData',
            saveChangesSuccess: 'isSaveChangesSuccess'
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
                month = parseInt(value.slice(3, 5)),
                year = parseInt(value.slice(6, 10)),
                currYear = (new Date()).getFullYear()

            if (day > 31 || month > 12 || year > currYear) {
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
                if (this.hasDataChanged === true ) {
                this.disableSaveBtn = false
                } else {
                    this.disableSaveBtn = true
                }
            }
        }
    }
}
</script>

<style>
#profile {
    width: 75%;
}

.input {
    text-align: center;
}

.inputEdit {
    text-align: center;
}

.inputDisabled {
    text-align: center;
}

</style>
