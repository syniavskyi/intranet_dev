<template>
  <div class="profile-tile">
    <div class="profile-tile-header">
      <div class="profile-tile-header-row">
        <h2 class="profile-tile-title">{{ $t("header.projects") }}</h2>
        <div class="profile-table-buttons">
          <button class="profile-edit-experience" @click="editProjects" v-if="!projectEditMode">{{ $t("button.editProjects") }}</button>
          <button class="profile-edit-experience-e" v-if="projectEditMode" @click="addRow">{{ $t("button.addProject") }}</button>
          <button class="profile-edit-experience-e" v-if="projectEditMode" @click="finishEditing">{{ $t("button.finishEdit") }}</button>
        </div>
      </div>
      <div class="tile-underscore"></div>
    </div>
    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
    <div class="profile-tile-content">
      <p class="profile-error" name="error" v-if="showProjectError">Wprowadzone dane w projekcie {{ errorProjectNo }} są niekompletne. Uzupełnij wszystkie pola. </p>
      <p class="profile-error" name="error" v-if="invalidDates">W projekcie {{invalidDatePos}} data rozpoczęcia nie może być późniejsza niż data zakończenia </p>
      <div class="profile-table-wrapper">
        <div class="profile-table">
          <div class="prof-thead">
          <!-- class="prof-thead-item" -->
            <div class="prof-thead-item">Np.</div>
            <div class="prof-thead-item">{{ $t("table.projectName") }}</div>
            <div class="prof-thead-item">{{ $t("table.contractor") }}</div>
            <div class="prof-thead-item">{{ $t("table.duration") }}</div>
            <div class="prof-thead-item">{{ $t("table.Industry") }}</div>
            <div class="prof-thead-item">{{ $t("table.Modules") }}</div>
            <div class="prof-thead-item">{{ $t("table.Descr") }}</div>
            <div class="prof-thead-item">---</div>
          </div>
          <div class="prof-tbody">
            <div class="prof-tbody-row" v-for="(project, index) in userProjects" :key="index">
            <!-- class="prof-tbody-item" -->
              <div class="prof-tbody-item">
                <div class="prof-tbody-item-title">Np.</div>
                <!-- class="prof-tbody-item-txt" -->
                <div class="prof-tbody-item-txt">
                  <p class="table-p">{{index + 1}}</p>
                </div>
              </div>
              <div class="prof-tbody-item">
              <div class="prof-tbody-item-title">{{ $t("table.projectName") }} </div>
              <!-- class="prof-tbody-item-txt" -->
              <div class="prof-tbody-item-txt">
                <input :disabled="!projectEditMode" @input="checkFields" class="profile-table-input" v-model="userProjects[index].ProjectName" />
              </div>
            </div>
            <div class="prof-tbody-item">
              <div class="prof-tbody-item-title"> {{ $t("table.contractor") }}</div>
              <div class="prof-tbody-item-txt">
              <!-- <select :disabled="!projectEditMode" class="profile-table-select profile-table-select-contractor" v-model="userProjects[index].ContractorId"> 
              <option v-for="contractor in contractorsList" :key="contractor.id" :value="contractor.id"> {{ contractor.name }}</option>
              </select> -->
                <input :disabled="!projectEditMode" @input="checkFields" class="profile-table-input" v-model="userProjects[index].ContractorName" />
              </div>
            </div>
            <div class="prof-tbody-item">
              <div class="prof-tbody-item-title">{{ $t("table.duration") }} </div>
              <div class="prof-tbody-item-txt">
                <p class="table-p">Rozpoczęcie</p>
                <p class="table-p" v-if="!projectEditMode"> {{ formatDate(userProjects[index].StartDate) }} </p>
                <v-date-picker :max-date="userProjects[index].EndDate === null ? new Date() : userProjects[index].EndDate" popoverDirection="top" v-if="projectEditMode" @input="validateDates(index)" class="profile-table-date-picker" is-expanded mode="single" v-model="userProjects[index].StartDate">
                  <input value="userProjects[index].startDate" />
                </v-date-picker>
                <p class="table-p">Zakończenie</p>
                <div name="endDateDiv" :id="formatId(index)">
                  <p class="table-p" v-if="!projectEditMode"> {{ formatDate(userProjects[index].EndDate) }} </p>
                  <v-date-picker :max-date="new Date()" :min-date="userProjects[index].StartDate" popoverDirection="top" v-if="projectEditMode" @input="validateDates(index)" class="profile-table-date-picker" is-expanded mode="single" v-model="userProjects[index].EndDate">
                    <input value="userProjects[index].endDate" />
                  </v-date-picker>
                </div>
                <label class="checkbox-wrap">
                  <input :disabled="!projectEditMode" type="checkbox" @change="disableEndDateInput" :name="index" v-model="userProjects[index].isCurrent" />
                  <div class="checkbox-in"></div>
                  <p style="padding:0;margin:0;">Obecnie</p>
                </label>
              </div>
            </div>
            <div class="prof-tbody-item">
              <div class="prof-tbody-item-title">{{ $t("table.Industry") }} </div>
              <div class="prof-tbody-item-txt">
              <!-- :disabled="!projectEditMode" -->
                <div class="prof-table-btns industry">
                  <button :disabled="!projectEditMode" class="profile-table-industry-button" @click="removeIndustry" :name="index" v-for="industry in userProjects[index].Industries" :key="industry.id" :value="industry.id"> {{ formatIndustryName(industry.id) }}</button>
                </div>
                <select v-if="projectEditMode" class="profile-table-select profile-table-select-industry" @change="addIndustry" :id="index" >
                  <option disabled selected value>{{ $t("table.addIndustry") }}:</option>
                  <option v-for="industry in industryList" :key="industry.id" :value="industry.id"> {{ industry.name }}</option>
                </select>
              </div>
            </div>
            <div class="prof-tbody-item">
              <div class="prof-tbody-item-title"> {{ $t("table.Modules") }}</div>
              <div class="prof-tbody-item-txt profile-table-td-module">
                <div class="prof-table-btns sapModule">
                  <button :disabled="!projectEditMode" class="profile-table-module-button" @click="removeModule" :name="index" v-for="sapModule in userProjects[index].SapModules" :key="sapModule.id" :value="sapModule.id"> {{ sapModule.id }} </button>
                </div>
                <!-- <div id="addButtons"></div> -->
                <select v-if="projectEditMode" class="profile-table-select profile-table-select-modules" @change="addModule" :id="index">
                  <option disabled selected value>{{ $t("table.addModule") }}:</option>
                  <option v-for="sapModule in modulesList" :key="sapModule.id" :value="sapModule.id"> {{ sapModule.name }}</option>
                </select>
              </div>
            </div>
            <div class="prof-tbody-item">
              <div class="prof-tbody-item-title">{{ $t("table.Descr") }} </div>
              <div class="prof-tbody-item-txt">
                <textarea :disabled="!projectEditMode" @input="checkFields" class="profile-table-textarea" v-model="userProjects[index].Description" />
              </div>
            </div>
            <div class="prof-tbody-item">
              <div class="prof-tbody-item-title"> --- </div>
              <div class="prof-tbody-item-txt">
                <button v-if="projectEditMode" class="prof-tbtn" @click="removeRow(index)">USUŃ</button>
                <button v-if="projectEditMode" :disabled="true" class="prof-tbtn projSaveButton" @click="saveUserProject(index)">ZAPISZ</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      projectEditMode: false,
      invalidDates: false,
      invalidDatePos: null,
      showEndInput: true,
      _beforeEditingProjects: null
    };
  },
  computed: {
    ...mapGetters({
      showProjectError: "getShowProjectError",
      contractorsList: "contractorsList",
      industryList: "getIndustryList",
      modulesList: "getModulesList",
      userProjects: "getUserProjectsList",
      ifModuleExist: "getModuleExist",
      errorProjectNo: "getErrorProjectNo"
    })
  },

  methods: {
    ...mapActions({
      addRow: "addUserProjectsRow",
      removeRow: "removeUserProjectsRow"
    }),
    remove(index) {
      this._beforeEditingProjects.splice(index, 1);
      this.removeRow(index);
    },
    checkFields() {
      if (this.userProjects.length > 0) {
        for (let i = 0; i < this.userProjects.length; i++) {
          if (
            this.userProjects[i].ProjectName &&
            this.userProjects[i].ContractorName &&
            this.userProjects[i].Industries.length !== 0 &&
            this.userProjects[i].SapModules.length !== 0 &&
            this.userProjects[i].StartDate &&
            this.userProjects[i].Description &&
            (this.userProjects[i].EndDate !== null ||
              this.userProjects[i].isCurrent)
          ) {
            document.getElementsByClassName(
              "projSaveButton"
            )[i].disabled = false;
          } else {
            document.getElementsByClassName(
              "projSaveButton"
            )[i].disabled = true;
          }
        }
      }
    },
    saveUserProject(index) {
      this.$store.dispatch("saveUserProjectPosition", index);
      this._beforeEditingProjects = JSON.parse(
        JSON.stringify(this.userProjects)
      );
    },
    formatId(index) {
      return index + "p";
    },
    addModule(value) {
      const data = {
        index: value.target.id,
        moduleId: value.target.value
      };
      this.$store.dispatch("addModule", data);
      this.checkFields();
    },
    removeModule(value) {
      const data = {
        index: value.target.name,
        moduleId: value.target.value
      };
      this.$store.dispatch("removeModule", data);
      this.checkFields();
    },
    removeIndustry(value) {
      const data = {
        index: value.target.name,
        industryId: value.target.value
      };
      this.$store.dispatch("removeIndustry", data);
      this.checkFields();
    },
    addIndustry(value) {
      const data = {
        index: value.target.id,
        industryId: value.target.value
      };
      this.$store.dispatch("addIndustry", data);
      this.checkFields();
    },
    disableEndDateInput(value) {
      const isCurrent = value.target.checked,
        index = value.target.name,
        input = document.getElementById(index + "p");

      if (isCurrent) {
        input.setAttribute("style", "opacity: 0");
        this.userProjects[index].endDate = null;
      } else {
        input.setAttribute("style", "opacity: 1");
      }
    },
    finishEditing() {
      this.$store.commit("SET_PROJECT_ERROR", false);
      this.$store.commit("SET_USER_PROJECTS_LIST", this._beforeEditingProjects);
      this.projectEditMode = false;
    },
    editProjects() {
      this.projectEditMode = true;
      this._beforeEditingProjects = JSON.parse(
        JSON.stringify(this.userProjects)
      );
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("DD.MM.YYYY")
        : "-";
    },

    formatIndustryName(id) {
      for (let i = 0; i < this.industryList.length; i++) {
        if (id === this.industryList[i].id) {
          return this.industryList[i].name;
        }
      }
    },
    validateDates(index) {
      const startDate = this.userProjects[index].startDate,
        endDate = this.userProjects[index].endDate,
        isCurrent = this.userProjects[index].isCurrent;

      if (endDate && startDate && isCurrent === false) {
        const formatStartDate = moment(startDate).format("YYYY-MM-DD"),
          formatEndDate = moment(endDate).format("YYYY-MM-DD");

        this.invalidDates = formatStartDate > formatEndDate ? true : false;
        this.invalidDatePos =
          formatStartDate > formatEndDate ? index + 1 : null;
      }
      this.checkFields();
    }
  }
};
</script>