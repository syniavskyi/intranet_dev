<template>
  <div class="plane-parent plane-parent-registration">
    <transition name="slide-backdrop" v-if="closeSuccessDialog">
      <div class="backdrop" v-if="closeSuccessDialog"></div>
    </transition>
    <transition name="slide" v-if="closeSuccessDialog">
      <div class="modal" v-if="closeSuccessDialog">
        <div class="modal-header">
          <h1 class="modal-title">{{ $t("header.accountCreated") }}</h1>
          <button class="modal-exit" @click="closeDialog">&#10006;</button>
        </div>
        <div class="modal-text">
          <p>{{ $t("message.newAccountPassword") }}</p>
        </div>
      </div>
    </transition>
    <div class="plane plane-registration">
      <div class="plane-left">
        <img class="img-user" src="../../assets/images/grouper-256.png">
        <p class="p-registration">{{ $t("header.userRegister") }}</p>
      </div>
      <div class="registration-credentials">
        <label for="fullName" class="label">{{ $t("label.fullName") }}</label>
        <input type="text" name="fullName" @input="getFullNameToEmail()" v-model="fullName" @change="checkEmail()" class="input input-registration" @blur="$v.fullName.$touch()">
        <label for="email" class="label">{{ $t("label.email") }}</label>
        <div class="input-with-checkbox">
          <input :disabled="isEmail" @blur="$v.fullNameToEmail.$touch()" :value="fullNameToEmail" @change="checkEmail($event.target.value)" class="input input-registration input-highlight">
          <input class="checkbox" :checked="isEmail" type="checkbox" disabled>
        </div>
                <!-- <label class="label" for="password">Hasło</label>
                <div class="div-pass">
                    <input disabled @input="$v.setPassword()" class="input reg-pass-input input-registration" type="password" v-model="setPassword">
                    <button class="gen-pass" @click="generatePassword">Generuj hasło</button>
                </div> -->
        <div class="div-select">
          <label class="label" for="role">{{ $t("label.role") }}</label>
          <select class="select">
            <option v-for="role in getRoleList" :value="roleChosen = role">{{ role }}</option>
          </select>
        </div>
        <div class="div-select">
          <label class="label" for="role">{{ $t("label.department") }}</label>
          <select class="select">
            <option v-for="department in getDepartmentList" :value="depId = department.depId">{{ department.depName }}</option>
          </select>
        </div>
        <button class="button" :disabled="$v.$invalid" @click="submit"><span class="span-arrow">{{ $t("button.register") }}</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, email } from "vuelidate/lib/validators";
import i18n from '../../lang/lang'

export default {
  data() {
    return {
      fullName: "",
      email: "",
      mail: '',
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
    }
    // ,
    // setPassword: {
    //   required,
    //   minLen: minLength(8)
    // }
  },
  beforeCreate() {
    this.$store.dispatch("getRoleList");
    this.$store.dispatch("getDepartmentList");
    this.$store.commit('DISPLAY_MENU', false);
  },
  methods: {
    checkEmail(value) {
      this.mail = value;
      this.$store.dispatch("checkEmail", {
        fullNameToEmail: this.fullNameToEmail,
        mail: this.mail
      });
    },
    getFullNameToEmail() {
      this.$store.dispatch("fullNameToEmail", {
        name: this.fullName,
        email: this.email,
        isEmail: this.isEmail
      });
    },
    // generatePassword() {
    //   this.$store.dispatch("generatePassword");
    // },
    submit() {
      this.$store.dispatch("submitRegistration", {
        name: this.fullName,
        email: this.mail,
        password: this.setPassword,
        department: this.depId,
        role: this.roleChosen,
        openDialog: this.closeSuccessDialog
      });
      this.$store.dispatch("generatePassword");
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
    },
    setMail() {
      return this.$store.getters.setMail;
    }
  }
};
</script>