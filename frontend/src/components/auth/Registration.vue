<template>
    <div class="plane-parent plane-parent-registration">
        <div class="plane plane-registration">
            <div class="plane-left">
                <img class="img-user" src="../../assets/images/grouper-256.png">
                <p class="p-registration">Rejestracja użytkownika</p>
            </div>
            <div class="registration-credentials">
                <label for="fullName" class="label">Imię i nazwisko</label>
                <input type="text" name="fullName" v-model="fullName" @change="checkEmail()" class="input">
                <label for="email" class="label">E-mail</label>
                <input disabled="false" v-model="fullNameToEmail" class="input">
                <label class="label" for="password">Hasło</label>
                <div class="div-pass">
                    <input class="input reg-pass-input" type="password">
                    <button class="gen-pass">Generuj hasło</button>
                    <!-- <input class="gen-pass" value="Generuj Hasło">  -->
                </div>
                <div class="div-select">
                    <label class="label" for="role">Rola</label>
                    <select class="select">
                        <option :key="role" v-for="role in getRoleList">{{ role }}</option>
                    </select>
                </div>
                <div class="div-select">
                    <label class="label" for="role">Oddział</label>
                    <select class="select" >
                        <option>Wrocław</option>
                        <option>Dąbrowa Górnicza</option>
                    </select>
                </div> 
                <button class="button"><span class="span-arrow">Zarejestruj</span></button>
            </div>
        <!-- <button class="button"><span>Zarejestruj</span></button> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      role: [ ],
      emails: [ ]
    };
  },
  beforeCreate() {
      this.$store.dispatch('getRoleList');
  },
  methods: {
    checkEmail() {
        this.$store.dispatch('checkEmail', this.email);
    },
    getFullNameToEmail() {
        this.$store.dispatch('fullNameToEmail', {name: this.fullName, email: this.email});
        // return this.fullNameToEmail;
    }
  },
  computed: {
    getRoleList() {
        return this.$store.getters.roleList;
    },
    fullNameToEmail() {
        // this.getFullNameToEmail;
        return this.$store.getters.prefixEmail;
        // this.$store.dispatch('fullNameToEmail', this.fullName, this.email)
        // var sEmail = this.fullName.replace(" ", ".").toLowerCase(),
        //     sDomain = "@btech.pl",
        //     sReturnEmail;

        // this.fullName === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);
        // this.email = sReturnEmail;

        // return sReturnEmail;
    },
    generatePassword() {

    }
  }
};
</script>