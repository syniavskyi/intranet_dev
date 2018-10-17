<template>
  <div class="plane-component" >
    <confirm-dialog v-if="showDialog">
     <template slot="modal-title">
       {{ $t("header.userRegisteredTitle") }}
     </template>
     <template slot="modal-text">
      <i18n path="message.userRegistered">
        <span place="fullname">{{Fullname}}</span>
        <span place="email">{{Email}}</span>
      </i18n>
     </template>
    </confirm-dialog>
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
              <input required type="text" class="cd-input" name="fullName" v-model="Fullname">
              <span class="cd-span"></span>
              <label for="Fullname" class="cd-label">{{ $t("label.fullName") }}</label>
            </div>
            <!-- was class cd-for-input-s -->
            <div class="cd-for-input">
              <input required type="text" class="cd-input" v-model="Email">
              <span class="cd-span"></span>
              <label for="Email" class="cd-label">{{ $t("label.email") }}</label>
            </div>
            <div class="cd-for-select">
              <select required class="cd-select" v-model="Role">
                <option v-for="Role in roleList" :value="Role.Value" :key="Role.Key">{{ Role.Key }}</option>
              </select>
              <label class="cd-slabel" for="Role">{{ $t("label.role") }}</label>
            </div>
            <div class="cd-for-select">
              <select required class="cd-select" v-model="DepartmentId">
                <option v-for="DepartmentId in departmentList" :key="DepartmentId.Key" :value="DepartmentId.Key">{{ DepartmentId.Value }}</option>
              </select>
              <label class="cd-slabel" for="DepartmentId">{{ $t("label.department") }}</label>
            </div>
            <div class="cd-for-select">
              <select required class="cd-select" v-model="Language">
                <option v-for="Language in cvLanguageList" :key="Language.id" :value="Language.id">{{ Language.description }}</option>
              </select>
              <label class="cd-slabel" for="Language">{{ $t("label.language") }}</label>
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
import Dialog from '../dialogs/ConfirmDialog'

export default {
  data() {
    return {
      Fullname: "",
      Email: "",
      Role: "",
      DepartmentId: "",
      showSuccessDialog: false,
      showFailDialog: false,
      isLoading: false,
      Language: ""
    };
  },
  validations: {
    Email: {
      required,
      email
    },
    Fullname: {
      required
    },
    DepartmentId: {
      required
    },
    Role: {
      required
    },
    Language: {
      required
    }
  },
  components: {
    "app-menu": Menu,
    "confirm-dialog": Dialog
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
        Fullname: this.Fullname,
        Email: this.Email,
        DepartmentId: this.DepartmentId,
        Role: this.Role,
        // openDialog: this.closeSuccessDialog,
        Language: this.Language
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
      cvLanguageList: "getCvLanguageList",
      showDialog: "getDisplayConfirmDialog"
    })
  }
};
</script>