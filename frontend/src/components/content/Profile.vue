<template>
<div id="profile">
  <div class="plane-dashboard-parent">
            <div class="plane-dashboard"> 
                <div class="plane-dashboard-nav-and-content">
                    <div class="dashboard-content"> 
                      <h1>Profil</h1>
                      <button v-if="!editMode" @click="editMode = !editMode">Edytuj dane</button>
                      <button v-else @click="editMode = !editMode" :disabled="$v.$invalid">Zapisz zmiany</button>
                      
                      <div>   <!-- container for single label + input/p -->           
                        <h3> {{userData.firstName}} {{userData.lastName}} </h3>
                      </div>  

                      <h2>Dane kontaktowe</h2>
                      <div>  <!-- container for section -->
                        <div>   <!-- container for single label + input/p -->           
                          <label>Adres</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode"  v-model="userData.address"> 
                        </div>  
                        <div>   <!-- container for single label + input/p -->           
                          <label>Email</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.email" @blur="$v.userData.email.$touch()"> 
                          <p class="login-error" v-if="$v.userData.email.$invalid" >Adres email posiada nieprawidłowy format lub nie jest wprowadzony.</p>
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                          <label>Telefon</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.phone"  @blur="$v.userData.phone.$touch()"> 
                          <p class="login-error" v-if="$v.userData.phone.$invalid" >Podany numer telefonu posiada nieprawidłowy format lub nie jest wprowadzony.</p>
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                          <label>Skype</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.skype"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                          <label>Slack</label>
                          <input :class="editMode ? 'inputEdit' : 'inputDisabled'" :disabled="!editMode" v-model="userData.slack"> 
                        </div> 
                      </div>

                      <h2>Dane pracownika</h2>
                      <div>  <!-- container for section -->
                        <div>   <!-- container for single label + input/p -->           
                            <label>Oddział</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.departmentName"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                            <label>Dział</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.dzial"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                            <label>Pozycja</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.position"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                            <label>Aktualny projekt</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.project"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                            <label>Etat</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.worktime"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                            <label>Data zatrudnienia</label>
                            <input class="inputDisabled" :disabled="true"  v-model="userData.date"> 
                        </div> 
                        <div>   <!-- container for single label + input/p -->           
                            <label>Staż pracy</label>
                            <input class="inputDisabled" :disabled="true" v-model="userData.time"> 
                        </div>
                        <div>   <!-- container for single label + input/p -->           
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
import {mapGetters} from 'vuex'
export default {
  data() {
   return { 
      editMode: false
    }
  },
  validations: {
    userData:{
      address: {
        required
      },
       email: {
        required,
        email
      },
      phone: {
        required,
        numeric
      },
      skype: {
        required
      },
      slack: {
        required
      }
    }
  },
  beforeCreate() {
    const username = localStorage.getItem('username')
    this.$store.dispatch('getUserData', username)
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
    
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
  
}

.inputDisabled {

}
</style>
