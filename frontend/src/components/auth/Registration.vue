<template>
    <div class="plane-parent plane-parent-registration">
        <transition name="slide-backdrop" v-if="closeSuccessDialog">
            <div class="backdrop" v-if="closeSuccessDialog"></div>
        </transition>
        <transition name="slide" v-if="closeSuccessDialog">
            <div class="modal" v-if="closeSuccessDialog">
                <div class="modal-header">
                    <h1 class="modal-title">Utworzono Konto!</h1>
                    <button class="modal-exit" @click="closeDialog">&#10006;</button>
                </div>
                <div class="modal-text">
                    <p>Utworzono nowe konto. Na maila wysłano hasło do konta.</p>
                </div>
            </div>
        </transition>
        <div class="plane plane-registration">
            <div class="plane-left">
                <img class="img-user" src="../../assets/images/grouper-256.png">
                <p class="p-registration">Rejestracja użytkownika</p>
            </div>
            <div class="registration-credentials">
                <label for="fullName" class="label">Imię i nazwisko</label>
                <input type="text" name="fullName" @input="getFullNameToEmail()" v-model="fullName" @change="checkEmail()" class="input input-registration" @blur="$v.fullName.$touch()">
                <label for="email" class="label">E-mail</label>
                <div class="input-with-checkbox">
                    <input :disabled="isEmail" @blur="$v.fullNameToEmail.$touch()" :value="fullNameToEmail" class="input input-registration input-highlight">
                    <input class="checkbox" :checked="isEmail" type="checkbox" disabled>
                </div>
                <label class="label" for="password">Hasło</label>
                <div class="div-pass">
                    <input disabled @input="$v.setPassword()" class="input reg-pass-input input-registration" type="password" v-model="setPassword">
                    <button class="gen-pass" @click="generatePassword">Generuj hasło</button>
                </div>
                <div class="div-select">
                    <label class="label" for="role">Rola</label>
                    <select class="select">
                        <option v-for="role in getRoleList" :value="roleChosen = role">{{ role }}</option>
                    </select>
                </div>
                <div class="div-select">
                    <label class="label" for="role">Oddział</label>
                    <select class="select">
                        <option v-for="department in getDepartmentList" :value="depId = department.depId">{{ department.depName }}</option>
                    </select>
                </div> 
                <button class="button" :disabled="$v.$invalid" @click="submit"><span class="span-arrow">Zarejestruj</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      role: [],
      roleChosen: "",
      department: [],
      depId: "",
      closeSuccessDialog: false
    };
  },
  validations: {
    fullNameToEmail: {
      required,
      email
    },
    fullName: {
      required
    },
    setPassword: {
      required,
      minLen: minLength(8)
    }
  },
  beforeCreate() {
    this.$store.dispatch("getRoleList");
    this.$store.dispatch("getDepartmentList");
  },
  methods: {
    checkEmail() {
      this.$store.dispatch("checkEmail", this.fullNameToEmail);
    },
    getFullNameToEmail() {
      this.$store.dispatch("fullNameToEmail", {
        name: this.fullName,
        email: this.email
      });
    },
    generatePassword() {
      this.$store.dispatch("generatePassword");
    },
    submit() {
      this.$store.dispatch("submitRegistration", {
        name: this.fullName,
        email: this.fullNameToEmail,
        password: this.setPassword,
        department: this.depId,
        role: this.roleChosen,
        openDialog: this.closeSuccessDialog
      });
    },
    closeDialog() {
      this.closeSuccessDialog = !this.closeSuccessDialog;
    }
  },
  computed: {
    getRoleList() {
      return this.$store.getters.roleList;
    },
    getDepartmentList() {
      return this.$store.getters.depList;
    },
    fullNameToEmail() {
      return this.$store.getters.prefixEmail;
    },
    hashedPassword() {
      return this.$store.getters.hashedPassword;
    },
    setPassword() {
      return this.$store.getters.password;
    },
    isEmail() {
      return this.$store.getters.isEmail;
    },
    openDialog() {
      return this.$store.getters.openDialog;
    }
  }
};
</script>