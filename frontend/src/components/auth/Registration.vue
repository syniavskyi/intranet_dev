<template>
  <div class="plane-component" >
    <div class="component-nav-and-content">
      <app-menu v-show="displayMenu"></app-menu>
      <div class="modal-overlay" v-show="displayMenuOverlay"></div>
      <div class="component-content">
        <div class="content-header">
          <div class="content-header-title-and-menu">
            <div @click="showMenu"  class="content-header-menu">&#9776;</div>
            <p class="content-header-title">{{ $t("header.registration") }}</p>
          </div>
        </div>
        <div class="reg-tile">
          <div class="registration-credentials">
            <div class="cd-for-input">
              <input required type="text" class="cd-input" name="fullName" v-model="fullName">
              <span class="cd-span"></span>
              <label for="fullName" class="cd-label">{{ $t("label.fullName") }}</label>
            </div>
            <!-- was class cd-for-input-s -->
            <div class="cd-for-input">
              <input required type="text" class="cd-input" v-model="mail">
              <span class="cd-span"></span>
              <label for="email" class="cd-label">{{ $t("label.email") }}</label>
            </div>
            <div class="cd-for-select">
              <select required class="cd-select" v-model="role">
                <option v-for="role in roleList" :value="role.Key" :key="role.Key">{{ role.Value }}</option>
              </select>
              <label class="cd-slabel" for="role">{{ $t("label.role") }}</label>
            </div>
            <div class="cd-for-select">
              <select required class="cd-select" v-model="department">
                <!-- v-model="department" -->
                <option v-for="department in departmentList" :key="department.Key" :value="department.Key">{{ department.Value }}</option>
              </select>
              <label class="cd-slabel" for="role">{{ $t("label.department") }}</label>
            </div>
            <div class="cd-for-select">
              <select required class="cd-select" v-model="mailLang">
                <option v-for="language in cvLanguageList" :key="language.id" :value="language.id">{{ language.description }}</option>
              </select>
              <label class="cd-slabel" for="role">{{ $t("label.language") }}</label>
            </div>
            <button class="button" :disabled="$v.$invalid" @click="submit">
              <span class="loading-icon"><img  src="../../assets/images/loading-white.png" v-show="isLoading"></span>
              <span class="span-arrow" v-show="!isLoading">{{ $t("button.register") }}</span>
            </button>
          </div>
        </div>
      </div>
      <!-- SUCCESS DIALOG -->
      <transition name="slide-backdrop" v-if="showSuccessDialog">
        <div class="backdrop" v-if="showSuccessDialog"></div>
      </transition>
      <transition name="slide" v-if="showSuccessDialog">
        <div class="modal" v-if="showSuccessDialog">
          <div class="modal-header">
            <h1 class="modal-title">{{ $t("header.accountCreated") }}</h1>
            <button class="modal-exit" @click="showSuccessDialog = false">&#10006;</button>
          </div>
          <div class="modal-text">
            <p>{{ $t("message.newAccountPassword") }}</p>
          </div>
        </div>
      </transition>
      <!-- END OF SUCCESS DIALOG -->
      <!-- FAILED DIALOG -->
      <transition name="slide-backdrop" v-if="showFailDialog">
        <div class="backdrop" v-if="showFailDialog"></div>
      </transition>
      <transition name="slide" v-if="showFailDialog">
        <div class="modal" v-if="showFailDialog">
          <div class="modal-header">
            <h1 class="modal-title">{{ $t("message.errorSendingMessage") }}</h1>
            <button class="modal-exit" @click="showFailDialog = false">&#10006;</button>
          </div>
          <div class="modal-text">
            <p>{{ $t("message.newAccountPassword") }}</p>
          </div>
        </div>
      </transition>
      <!-- END OF FAILED DIALOG -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
import i18n from "../../lang/lang";
import Menu from "../Menu.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fullName: "",
      mail: "",
      role: "",
      department: "",
      showSuccessDialog: false,
      showFailDialog: false,
      isLoading: false,
      mailLang: ""
    };
  },
  validations: {
    mail: {
      required,
      email
    },
    fullName: {
      required
    },
    department: {
      required
    },
    role: {
      required
    },
    mailLang: {
      required
    }
  },
  components: {
    "app-menu": Menu
  },
  watch: {
    isError(value) {
      if (value) {
        this.showSuccessDialog;
      } else {
        this.showFailDialog;
      }
    }
  },
  methods: {
    showMenu(event) {
      let obj = { window, event };
      this.$store.dispatch("setSideMenu", obj);
    },
    submit() {
      this.isLoading = true;
      this.$store.dispatch("submitRegistration", {
        name: this.fullName,
        email: this.mail,
        department: this.department,
        role: this.role,
        openDialog: this.closeSuccessDialog,
        mailLang: this.mailLang
      });
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters({
      displayMenu: "getShowMenu",
      displayMenuOverlay: "getShowMenuOverlay",
      isError: "getRegistrationError",
      roleList: "getRoleList",
      departmentList: "getDepartmentList",
      openDialog: "openDialog",
      openDialogFalse: "openFailedDialog",
      cvLanguageList: "getCvLanguageList"
    })
  }
};
</script>