<template>
<div id="profile">
  <div class="plane-dashboard-parent">
            <div class="plane-dashboard"> 
                <div class="plane-dashboard-nav-and-content">
                    <div class="dashboard-content"> 
                      <h1>{{ $t("header.profile") }}</h1>
                      
                       <p class="login-error" v-if="showNoChangesAlert" >{{ $t("message.noChanges") }}</p>
                      <button v-if="!editMode" @click="onEdit">{{ $t("button.editData") }}</button>
                      <button v-if="editMode" @click="onSaveChanges" :disabled="$v.$invalid">{{ $t("button.saveChanges") }}</button>
                      <button v-if="editMode" @click="onCancelEdit"> {{ $t("button.cancel") }}</button>
                      <p class="login-error" v-show="!saveChangesSuccess" >{{ $t("message.saveChangesError") }}</p>
                      <div>             
                        <h3> {{userData.firstName}} {{userData.lastName}} </h3>
                      </div>  
                     <img :src ="userData.image"/>
                     <label>
                       <input type="file" id="photo" ref="photo" @change="handlePhotoUpload"/>
                     </label>
                     <!-- <button @click="submitPhoto" :disabled="disableSubmit"> Dodaj zdjęcie </button> -->

                     <label>
                       <input type="file" id="cv" ref="file" @change="handleCvUpload"/>
                     </label>
                     <!-- <button @click="submitCv" > Dodaj Cv </button> -->
                      <h2>{{ $t("header.contact") }}</h2>
                    <div> 
                        <div>            
                          <label>{{ $t("label.address") }}</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode"  v-model="userData.address"> 
                        </div>  
                        <div>           
                          <label>{{ $t("label.email") }}</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.email" @blur="$v.userData.email.$touch()"> 
                          <p class="login-error" v-if="$v.userData.email.$invalid" >{{ $t("message.emailValidation") }}</p>
                        </div> 
                        <div>             
                          <label>{{ $t("label.phone") }}</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.phone"  @input="phoneValidation"> 
                          <p class="login-error" v-if="invalidPhone" >{{ $t("message.phoneValidation") }}</p>
                        </div> 
                        <div>           
                          <label>{{ $t("label.skype") }}</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.skype"> 
                        </div> 
                        <div>        
                          <label>{{ $t("label.slack") }}</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.slack"> 
                        </div> 
                      </div>

                      <h2>{{ $t("header.employee") }}</h2>
                      <div>  
                        <div>           
                            <label>{{ $t("label.department") }}</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.branch"> 
                        </div> 
                        <div>           
                            <label>{{ $t("label.branch") }}</label>
                            <input class="inputDisabled" :disabled="true"  v-model="userData.section"> 
                        </div> 
                        <div>         
                            <label>{{ $t("label.position") }}</label>
                            <input class="inputDisabled" :disabled="true"  v-model="userData.position"> 
                        </div> 
                        <div>            
                            <label>{{ $t("label.project") }}</label>
                            <input class="inputDisabled" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode"  v-model="userData.currentProject"> 
                        </div> 
                        <div>           
                            <label>{{ $t("label.worktime") }}</label>
                            <!-- <input class="inputDisabled" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode"  v-model="userData.state">  -->
                            <select v-model="userData.state" :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode">
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
                        </div> 
                        <div>           
                            <label>{{ $t("label.employmentDate") }}</label>
                            <masked-input mask="11.11.1111"  :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode"   v-model="userData.employmentDate"/> 
                        </div> 
                        <div>          
                            <label>{{ $t("label.workExperience") }}</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.seniority"> 
                        </div>
                        <div>        
                            <label>{{ $t("label.cv") }}</label>
                            <a :href="userData.cv"> link </a>
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
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  data() {
   return { 
      editMode: false,
      _beforeEditingCache: null,
      file: '',
      photo: '',
      hasDataChanged: false,
      showNoChangesAlert: false,
      invalidPhone: false
  }
  },
  validations: {
    userData:{
     email: { required, email }
    }
  },
  components: { 
    MaskedInput 
  },
  beforeCreate() {
    if (this.contactData === undefined) {
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
      this.hasDataChanged = false
      let currentData = Object.assign({}, this.userData)
      
      var currDataProps = Object.getOwnPropertyNames(currentData)
      var beforeDataProps = Object.getOwnPropertyNames(this._beforeEditingCache)
      
      for (var i = 0; i < beforeDataProps.length; i++) {
        var propName = beforeDataProps[i];
        if (currentData[propName] !== this._beforeEditingCache[propName]) {
          this.hasDataChanged = true
          this.$store.dispatch('saveContactData', this.userData)
          this.$store.dispatch('saveUserData', this.userData)
          this.editMode = !this.editMode
          return
        }
      }
     if(this.hasDataChanged === false) {
       this.showNoChangesAlert = true
     }

    },
    handlePhotoUpload() {
      this.photo = this.$refs.photo.files[0];
      this.disableSubmit = false
            let data  = {
        file: this.photo,
        id: localStorage.getItem('id')
      }
      this.$store.dispatch('submitPhoto', data)
    },
    handleCvUpload() {
      this.file = this.$refs.file.files[0];
      let data  = {
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
