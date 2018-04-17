<template>
    <div class="plane-parent plane-parent-registration">
        <div class="plane plane-registration">
            <div class="plane-left">
                <img class="img-user" src="../../assets/images/grouper-256.png">
                <p class="p-registration">Rejestracja użytkownika</p>
            </div>
            <div class="registration-credentials">
                <label for="fullName" class="label">Imię i nazwisko</label>
                <input type="text" name="fullName" @input="getFullNameToEmail()" v-model="fullName" @change="checkEmail()" class="input input-registration">
                <label for="email" class="label">E-mail</label>
                <div class="input-with-checkbox">
                    <input disabled v-model="fullNameToEmail" class="input input-registration input-highlight">
                    <input class="checkbox" :checked="isEmail" type="checkbox" disabled>
                </div>
                <label class="label" for="password">Hasło</label>
                <div class="div-pass">
                    <input disabled class="input reg-pass-input input-registration" type="password" v-model="setPassword">
                    <button class="gen-pass" @click="generatePassword">Generuj hasło</button>
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
      role: [ ]
    };
  },
  beforeCreate() {
      this.$store.dispatch('getRoleList');
  },
  methods: {
    checkEmail() {
        this.$store.dispatch('checkEmail', this.fullNameToEmail);
    },
    getFullNameToEmail() {
        this.$store.dispatch('fullNameToEmail', {name: this.fullName, email: this.email});
    },
    generatePassword() {
        this.$store.dispatch('generatePassword');
    }
  },
  computed: {
    getRoleList() {
        return this.$store.getters.roleList;
    },
    fullNameToEmail() {
        return this.$store.getters.prefixEmail;
    },
    setPassword() {
        return this.$store.getters.password;
    },
    isEmail() {
        return this.$store.getters.isEmail;
    }
  }
};
</script>