<template>
<div id="profile">
  <div class="plane-dashboard-parent">
            <div class="plane-dashboard"> 
                <div class="plane-dashboard-nav-and-content">
                    <div class="dashboard-content"> 
                      <h1>{{ $t("header.profile") }}</h1>
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
                     <button @click="submitPhoto" :disabled="disableSubmit"> Dodaj zdjęcie </button>

                     <label>
                       <input type="file" id="cv" ref="file" @change="handleCvUpload"/>
                     </label>
                     <button @click="submitCv" > Dodaj Cv </button>
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
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.phone"  @blur="$v.userData.phone.$touch()"> 
                          <p class="login-error" v-if="$v.userData.phone.$invalid" >{{ $t("message.phoneValidation") }}</p>
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
                            <input class="inputDisabled" :disabled="true" v-model="userData.section"> 
                        </div> 
                        <div>         
                            <label>{{ $t("label.position") }}</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.position"> 
                        </div> 
                        <div>            
                            <label>{{ $t("label.project") }}</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.currentProject"> 
                        </div> 
                        <div>           
                            <label>{{ $t("label.worktime") }}</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.state"> 
                        </div> 
                        <div>           
                            <label>{{ $t("label.employmentDate") }}</label>
                            <input class="inputDisabled" :disabled="true"  v-model="userData.employmentDate"> 
                        </div> 
                        <div>          
                            <label>{{ $t("label.workExperience") }}</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.seniority"> 
                        </div>
                        <div>        
                            <label>{{ $t("label.cv") }}</label>
                            <p> link </p>
                        </div>  
                      </div>
                   </div>
                </div>
            </div> 
  </div>
</div>
</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  data() {
   return { 
      editMode: false,
      _beforeEditingCache: null,
      file: '',
      disableSubmit: true,
      photo: ''
  }
  },
  validations: {
    userData:{
      address: { required },
      email: { required, email },
      phone: { required },
      skype: { required },
      slack: { required }
    }
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
      this.editMode = !this.editMode
      this._beforeEditingCache = Object.assign({}, this.userData)
    },
    onCancelEdit() {
      Object.assign(this.userData, this._beforeEditingCache)
      this._beforeEditingCache = null
      this.editMode = !this.editMode
    },
    onSaveChanges() {
      this.$store.dispatch('saveContactData', this.userData)
      this.editMode = !this.editMode
    },
    handlePhotoUpload() {
      this.photo = this.$refs.photo.files[0];
      this.disableSubmit = false
    },
    submitPhoto(){
      let data  = {
        file: this.photo,
        id: localStorage.getItem('id')
      }
      this.$store.dispatch('submitPhoto', data)
      this.disableSubmit = true
    },
    handleCvUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitCv(){
      let data  = {
        file: this.file,
        id: localStorage.getItem('id')
      }
      this.$store.dispatch('submitCv', data)
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
