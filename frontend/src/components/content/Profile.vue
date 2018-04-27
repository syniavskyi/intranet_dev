<template>
<div id="profile">
  <div class="plane-dashboard-parent">
            <div class="plane-dashboard"> 
                <div class="plane-dashboard-nav-and-content">
                    <div class="dashboard-content"> 
                      <h1>Profil</h1>
                      <button v-if="!editMode" @click="onEdit">Edytuj dane</button>
                      <button v-if="editMode" @click="onSaveChanges" :disabled="$v.$invalid">Zapisz zmiany</button>
                      <button v-if="editMode" @click="onCancelEdit"> Odrzuć zmiany</button>
                      <div>             
                        <h3> {{userData.firstName}} {{userData.lastName}} </h3>
                      </div>  

                      <h2>Dane kontaktowe</h2>
                      <div> 
                        <div>            
                          <label>Adres</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode"  v-model="userData.address"> 
                        </div>  
                        <div>           
                          <label>Email</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.email" @blur="$v.userData.email.$touch()"> 
                          <p class="login-error" v-if="$v.userData.email.$invalid" >Adres email posiada nieprawidłowy format lub nie jest wprowadzony.</p>
                        </div> 
                        <div>             
                          <label>Telefon</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.phone"  @blur="$v.userData.phone.$touch()"> 
                          <p class="login-error" v-if="$v.userData.phone.$invalid" >Podany numer telefonu posiada nieprawidłowy format lub nie jest wprowadzony.</p>
                        </div> 
                        <div>           
                          <label>Skype</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.skype"> 
                        </div> 
                        <div>        
                          <label>Slack</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.slack"> 
                        </div> 
                      </div>

                      <h2>Dane pracownika</h2>
                      <div>  
                        <div>           
                            <label>Oddział</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.departmentName"> 
                        </div> 
                        <div>           
                            <label>Dział</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.dzial"> 
                        </div> 
                        <div>         
                            <label>Pozycja</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.position"> 
                        </div> 
                        <div>            
                            <label>Aktualny projekt</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.project"> 
                        </div> 
                        <div>           
                            <label>Etat</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.worktime"> 
                        </div> 
                        <div>           
                            <label>Data zatrudnienia</label>
                            <input class="inputDisabled" :disabled="true"  v-model="userData.date"> 
                        </div> 
                        <div>          
                            <label>Staż pracy</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.time"> 
                        </div>
                        <div>        
                            <label>CV</label>
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
      _beforeEditingCache: null
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
    if (this.userData === undefined) {
      const username = localStorage.getItem('username')
      this.$store.dispatch('getUserData', username)
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
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
      this.$store.dispatch('saveUserData', this.userData)
      this.editMode = !this.editMode
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
